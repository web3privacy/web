import { parseFeed } from "https://deno.land/x/rss/mod.ts";
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";

const resp = await fetch("https://lu.ma/web3privacy");
const html = await resp.text();
const $ = cheerio.load(html);

const dataRaw = $("script#__NEXT_DATA__").text();
const data = JSON.parse(dataRaw);
const calendar = data.props.pageProps.initialData.data.calendar;

const items = data.props.pageProps.initialData.data.featured_items;

const output = [];
for (const item of items) {
  const evt = item.event;
  output.push({
    url: evt.url,
    name: evt.name,
    period: [evt.start_at, evt.end_at],
    coverUrl: evt.cover_url,
    guestCount: item.guest_count,
    /*guests: item.featured_guests.map((fg) => ({
      name: fg.name,
      avatarUrl: fg.avatar_url,
    })),*/
  });
  //console.log(item);
}

await Deno.writeTextFile(
  "./src/events-ext.json",
  JSON.stringify(output, null, 2),
);
console.log(`File ./src/events-ext.json saved`);
