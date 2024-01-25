import YAML from 'npm:yaml'

const response = await fetch("https://data.web3privacy.info/")
const data = await response.json()
await Deno.writeTextFile("./src/events.json", JSON.stringify(data.events, null, 2))
console.log(`File ./src/events.json saved`)