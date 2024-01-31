import { parseFeed } from "https://deno.land/x/rss/mod.ts";
import * as cheerio from "https://esm.sh/cheerio@1.0.0-rc.12";

const resp = await fetch(
  "https://www.youtube.com/feeds/videos.xml?channel_id=UCaO_vLpj164um5maEsCuEbw",
);
const xml = await resp.text();
const feed = await parseFeed(xml);

const talks = [];
for (const entry of feed.entries) {
  console.log(entry);

  //const $ = cheerio.load(entry.content.value)
  talks.push({
    url: entry.links[0].href,
    title: entry.title.value,
    img: entry["media:group"]["media:thumbnail"].url.replace(
      "hqdefault",
      "maxresdefault",
    ),
    date: entry.published,
  });
}

//console.log(articles)
await Deno.writeTextFile("./src/talks.json", JSON.stringify(talks, null, 2));
console.log(`File ./src/talks.json saved`);
