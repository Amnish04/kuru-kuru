import { Handlers } from "$fresh/server.ts";
import Counter from "../islands/CounterCard.tsx";
import { CSS, render } from "$gfm";
import { getGlobalStatistics, setGlobalStatistics } from "../shared/db.ts";

// TODO: This is hardcoded for now, but /assets/audio contains an N amount of files per language
// and we want to randomly play one of them when the mascot is squished
const kuruAudio: string[] = [];
const mdData = await Deno.readTextFile("README.md");

// iterate inside ../static/assets/audio/ja/ and add all files to the array
for (const f of Deno.readDirSync("static/assets/audio/ja/")) {
  if (f.isDirectory) continue;
  // replace file paths with /assets/audio/ja/filename.mp3
  kuruAudio.push(`/assets/audio/ja/${f.name}`);
}

export const handler: Handlers = {
  GET: async (req, ctx) => {
    const accept = req.headers.get("accept");

    if (accept?.includes("text/event-stream")) {
      const bc = new BroadcastChannel("global-count");
      const body = new ReadableStream({
        start(controller) {
          bc.addEventListener("message", async () => {
            try {
              const data = await getGlobalStatistics();
              const chunk = `data: ${
                JSON.stringify({ globalCount: data })
              }\n\n`;
              controller.enqueue(new TextEncoder().encode(chunk));
            } catch (e) {
              console.error(
                `[${new Date()}] Error while getting global statistics: ${e}`,
              );
            }
          });
          console.log(
            `[${new Date()}] Opened statistics stream for ${
              JSON.stringify(ctx.remoteAddr)
            }`,
          );
        },
        cancel() {
          bc.close();
          console.log(
            `[${new Date()}] Closed statistics stream for ${
              JSON.stringify(ctx.remoteAddr)
            }`,
          );
        },
      });
      return new Response(body, {
        headers: {
          "Content-Type": "text/event-stream",
        },
      });
    }
    const data = await getGlobalStatistics();
    const res = await ctx.render({ globalCount: data });
    return res;
  },
  POST: async (req, ctx) => {
    const body = await req.json();
    await setGlobalStatistics(body.data);

    const bc = new BroadcastChannel("global-count");
    bc.postMessage(new TextEncoder().encode(getGlobalStatistics().toString()));

    return new Response("", {
      status: 200,
      statusText: "OK",
    });
  },
};

export default function Home(
  { data: { globalCount } }: { data: { globalCount: number } },
) {
  // added a pseudo-div here so I can nest another div inside it smh
  return (
    <div>
      <div class="px-4 py-8 mx-auto bg-[#9d88d3]" id="mascot-tgt">
        <div class="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 class="text-4xl text-white font-bold z-10">
            Welcome to herta kuru (v2?)
          </h1>
          <p class="my-4 text-white z-10">
            The website for Herta, the <del>annoying</del>{" "}
            cutest genius Honkai: Star Rail character out there.
          </p>
          <Counter
            globalCount={globalCount}
            audioFiles={kuruAudio}
          />
        </div>
      </div>
      <div class="px-4 py-8 mx-auto bg-white items-center justify-center">
        <style dangerouslySetInnerHTML={{__html: CSS}}/>
        <div class="markdown-body" dangerouslySetInnerHTML={{ __html: render(mdData) }}>
        </div>
      </div>
    </div>
  );
}
