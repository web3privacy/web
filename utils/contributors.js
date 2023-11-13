import "https://deno.land/std@0.206.0/dotenv/load.ts";

const contributorRepos = [
	"web3privacy/web3privacy",
	"web3privacy/data",
	"web3privacy/events",
	"web3privacy/w3ps1",
    "web3privacy/grants",
    "web3privacy/website",
	//"web3privacy/w3pn-web",
]

async function getContributors () {
	const output = [];
	for (const cr of contributorRepos) {
		const response = await fetch(`https://api.github.com/repos/${cr}/contributors`, {
            headers: {
                "Authorization": `Token ${Deno.env.get('GITHUB_TOKEN')}`
            }
        });
		const arr = await response.json();
		//console.log(arr)
		for (const item of arr) {
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
