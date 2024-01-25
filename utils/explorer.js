

const resp = await fetch("https://explorer-data.web3privacy.info/");
const data = await resp.json();

const explorer = {
    projects: data.projects.length
}

await Deno.writeTextFile("./src/explorer.json", JSON.stringify(explorer, null, 2))
console.log(`File ./src/explorer.json saved`)