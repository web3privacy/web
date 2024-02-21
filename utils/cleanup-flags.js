import { join } from "https://deno.land/std@0.216.0/path/join.ts";

const src = JSON.parse(await Deno.readTextFile("./src/core.json"));
const usedFlags = [...new Set(src.events.map((e) => e.country + ".svg"))];

console.log(usedFlags);

const flagDir = "./dist/flags";
for await (const f of Deno.readDir(flagDir)) {
  if (f.isDirectory || !usedFlags.includes(f.name)) {
    await Deno.remove(join(flagDir, f.name), { recursive: true });
  }
}
