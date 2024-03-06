<script>

import core from '../core.json';
import { dateFormat } from '../lib/events.js';

const topics = [
    'identity',
    'network states',
    'fullstack privacy',
    'private messaging',
    'r&d: ZK, MPC, THE',
    'on-chain privacy',
    'regulation vs. privacy',
    'lunarpunk vs. solarpunk',
    'human rights daos',
    'privacy activism',
]

const img = 'meetup01';
const images = {
    meetup01: {},
    summit01: {}
}

let imageSelected = Object.keys(images)[0]
let eventSelected = core.events[0].id

$: image = `/gen-img/events/${imageSelected}.png`;
$: event = core.events.find(e => e.id === eventSelected);

</script>


<div class="w-full p-10">
    <div>
        <div>
            Event:
            <select bind:value={eventSelected} class="text-black">
                {#each core.events as e}
                    <option value={e.id}>{e.type} {e.city}</option>
                {/each}
            </select>
        </div>
        <div>
            Image:
            <select bind:value={imageSelected} class="text-black">
                {#each Object.keys(images) as image}
                    <option value={image}>{image}</option>
                {/each}
            </select>
        </div>
    </div>
</div>
<div class="w-full flex flex-wrap gap-10 p-10">
    <div>
        <div class="mb-4 text-xl text-green-500">Poster (3:2)</div>
        
        <div class="w-[764px] border-2 border-green-500">
            <div id="img-poster" class="aspect-[2/3] w-[760px] h-[1140px] relative bg-black">
                <img src="/logo.svg" class="absolute top-10 left-10 w-1/3 z-20" />

                <div class="absolute top-20 left-0 h-36 w-full z-10" style="background: linear-gradient(black, transparent);"></div>
                <img src={image} class="absolute top-20 left-0 -z-0" />
                <div class="absolute bottom-[18.5rem] left-0 h-36 w-full z-10" style="background: linear-gradient(transparent, black);"></div>

                <div class="absolute bottom-80 left-10 uppercase text-2xl z-20">
                    <div class="flex">
                        <div class="border-2 border-white py-2 px-4 border-r-0 inline-block bg-black">
                            {dateFormat(event.date)}
                        </div>
                        <div class="border-2 border-white py-2 px-4 bg-black">
                            {event.city}, {event.country}
                        </div>
                    </div>
                    <div class="flex">
                        <div class="border-2 border-white py-2 px-4 bg-white text-black">
                            {event.type}
                        </div>  
                    </div>
                </div>
                <div class="absolute left-10 right-10 bottom-28 uppercase text-lg flex flex-wrap gap-3">
                    {#each topics as topic}
                        <div><span class="inline-block w-2 h-2 bg-white"></span> {topic}</div>
                    {/each}
                </div>
                <div class="absolute left-10 bottom-10 bg-white text-black text-sm uppercase py-1.5 px-3">
                    summit2024.web3privacy.info
                </div>
            </div>
        </div>
    </div>
    <div>
        <div class="mb-4 text-xl text-green-500">Square (1:1)</div>

        <div class="w-[404px] border-2 border-green-500 overflow-hidden">
            <div id="img-square" class="aspect-square w-[400px] relative bg-black">
                <img src="/logo.svg" class="absolute top-8 left-8 w-1/2 z-20" />

                <div class="absolute top-0 left-0 h-36 w-full z-10" style="background: linear-gradient(black, transparent);"></div>
                <div class="absolute top-0 left-0 h-full w-1/2 z-10" style="background: linear-gradient(to left, transparent, black);"></div>
                <img src={image} class="absolute top-0 left-0 -z-0" />

                <div class="absolute bottom-8 left-8 uppercase z-20">
                    <div class="flex">
                        <div class="border-2 border-white py-1 px-2 border-r-0 inline-block bg-black">
                            {dateFormat(event.date)}
                        </div>
                        <div class="border-2 border-white py-1 px-2 bg-black">
                            {event.city}, {event.country}
                        </div>
                    </div>
                    <div class="flex">
                        <div class="border-2 border-white py-1 px-2 bg-white text-black">
                            Meetup
                        </div>  
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>