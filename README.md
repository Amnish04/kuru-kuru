## Herta Kuru (v2)!

[Visit the Site](https://herta.deno.dev/) | [Check who's visiting it too!](https://takeback.bysourfruit.com/tracked/kuru-kuru.deno.dev) | [Open in CodeSandbox](https://githubbox.com/sr229/kuru-kuru)

This is a proof-of-concept implementation of [duiqt/herta_kuru](https://github.com/duiqt/herta_kuru) with a global statistics feed, this time, it's a little more secure!

### Background

Around a while ago, the original website's global statistics screen had been removed due to network abuse. I started investigating ways to reimplement this (embarassingly I made a PR that just adds a single useless line in the API), so I spent a few more weeks
finding a way to implement it, until I got bored, and then I picked it up again.

The new system I implemented works using the following:

- Using `BroadcastChannel`s and `WebSocket`s - we can send mutation events to update the counter, so this is practically realtime.
- No API is actually exposed to the user, so no one can just take the statistics endpoint and just spam it, because the statistics server is also the website.
- POSTing to the API is delayed by 5000ms (5s) before its submitted to the API in the frontend. While the provider does allow this, its due diligence to only submit it when there's inactivity.

### Usage

Make sure to install Deno: https://deno.land/manual/getting_started/installation

Then start the project:

```
deno task start
```

This will watch the project directory and restart as necessary.

### Credits

Original website by [@duiqt](https://github.com/duiqt/herta_kuru), All Rights Reserved. Kuru-kuru gif is by [@Seseren_kr](https://twitter.com/Seseren_kr). All rights Reserved.

Uses some assets from Honkai Star Rail. Copyright Cognosphere, All Rights Reserved. This website is not affiliated with Cognosphere/miHoYo.
