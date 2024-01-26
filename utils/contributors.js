import "https://deno.land/std@0.206.0/dotenv/load.ts";

const contributorRepos = [

	// main repos
	"web3privacy/web3privacy",
	"web3privacy/data",
	"web3privacy/docs",
	"web3privacy/web",
	"web3privacy/brand",

	// events workgroup
	"web3privacy/events",

	// explorer
	"web3privacy/explorer",
	"web3privacy/explorer-data",
	"web3privacy/explorer-app",

	// old - deprecated
	"web3privacy/w3ps1",
    "web3privacy/grants",
	"web3privacy/old-website",
	"web3privacy/web3privacy-app-old",

]

async function getContributors () {
	const output = [];
	for (const cr of contributorRepos) {
		const response = await fetch(`https://api.github.com/repos/${cr}/contributors`, {
            //headers: {
            //    "Authorization": `Token ${Deno.env.get('GITHUB_TOKEN')}`
            //}
        });
		const arr = await response.json();
		for (const item of arr) {
			if (item.login === "github-actions[bot]") {
				continue;
			}

            const found = output.find(i => i.login === item.login)
			if (!found) {
				output.push(item)
			} else {
                found.contributions += item.contributions
            }
		}
	}
	return output.sort((x, y) => y.contributions > x.contributions ? 1 : -1);
}

const contributors = await getContributors()
await Deno.writeTextFile("./src/contributors.json", JSON.stringify(contributors, null, 2))
console.log(`File ./src/contributors.json saved`)
