// projects count
const resp = await fetch(
  "https://raw.githubusercontent.com/web3privacy/web3privacy/main/README.md",
);
const text = await resp.text();
const [_, count] = text.match(/([\d\+]+) privacy projects/);

// contributors
const response = await fetch(
  `https://api.github.com/repos/web3privacy/web3privacy/contributors`,
);
const repoContributors = await response.json();

// stars
const respRepo = await fetch(
  "https://api.github.com/repos/web3privacy/web3privacy",
);
const repo = await respRepo.json();

const data = {
  count,
  contributors: repoContributors.length,
  stars: repo.stargazers_count,
};

await Deno.writeTextFile(
  "./src/db-repo.json",
  JSON.stringify(data, null, 2),
);
console.log(`File ./src/db-repo.json saved`);
