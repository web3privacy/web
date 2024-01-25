const response = await fetch("https://data.web3privacy.info/")
const data = await response.json()
await Deno.writeTextFile("./src/core.json", JSON.stringify(data, null, 2))
console.log(`File ./src/core.json saved`)