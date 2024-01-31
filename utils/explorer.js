const resp = await fetch("https://explorer-data.web3privacy.info/");
const data = await resp.json();

const respContribs = await fetch(
  `https://api.github.com/repos/web3privacy/explorer-data/contributors`,
);
const respContribsData = await respContribs.json();

const explorer = {
  projects: data.projects.length,
  contributors: respContribsData.length,
};

await Deno.writeTextFile(
  "./src/explorer.json",
  JSON.stringify(explorer, null, 2),
);
console.log(`File ./src/explorer.json saved`);
