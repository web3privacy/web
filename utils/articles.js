import { parseFeed } from "jsr:@mikaelporttila/rss/1.1.1/mod.ts";
import * as cheerio from "https://esm.sh/cheerio@1.0.0";

const resp = await fetch(
  "https://mirror.xyz/0x0f1F3DAf416B74DB3DE55Eb4D7513a80F4841073/feed/atom",
);
const xml = await resp.text();
const feed = await parseFeed(xml);

const articles = [];
for (const entry of feed.entries) {
  //console.log(entry)

  const $ = cheerio.load(entry.content.value);
  articles.push({
    url: entry.id,
    title: entry.title.value,
    img: $("img").attr("src"),
    date: entry.updated,
  });
}

//console.log(articles)
await Deno.writeTextFile(
  "./src/articles.json",
  JSON.stringify(articles, null, 2),
);
console.log(`File ./src/articles.json saved`);
