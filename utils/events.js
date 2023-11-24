import YAML from 'npm:yaml'

const response = await fetch("https://raw.githubusercontent.com/web3privacy/events/main/events/events.yaml")
const events = YAML.parse(await response.text())
await Deno.writeTextFile("./src/events.json", JSON.stringify(events, null, 2))
console.log(`File ./src/events.json saved`)