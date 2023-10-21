import { AppProps } from "$fresh/server.ts";
import Footer from "../islands/Footer.tsx";

export default function App({ Component }: AppProps) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="description" content="The website for Herta, the cutest genius Honkai: Star Rail character out there."/>
        <meta name="keywords" content="Kuru2, Kuru Kuru, Kuru Kuru herta, kuru kuru herta hsr, kuru kuru herta star rail, herta honkai star rail, herta, herta hsr, star rail herta"/>
        <meta name="canonical" content="https://kuru-kuru.deno.dev"/>        
        <script src='https://takeback.bysourfruit.com/api/kit/7NHKHAQY12LGE1WUP9Z806' />
        <title>Kuru kuru~!</title>
      </head>
      <body>
        <Component />
      </body>
      <Footer />
    </html>
  );
}
