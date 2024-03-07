<script>

import core from '../core.json';
import { dateFormat } from '../lib/events.js';
import { marked } from 'marked';
import { onMount } from 'svelte';
import { writable } from 'svelte/store';

import Square from './event-formats/square.svelte';
import WideSquare from './event-formats/wide-square.svelte';
import Wide from './event-formats/wide.svelte';
import SquareSpeaker from './event-formats/square-speaker.svelte';
import Poster from './event-formats/poster.svelte';
import PosterSimple from './event-formats/poster-simple.svelte';

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

/*const events = {
    s23prg: { image: 'summit01' },
    m24buc: { image: 'bucharest01' },
    m24ath: { image: 'athens01' },
    m24ams: { image: 'amsterdam01' },
    m24tll: { image: 'tallinn01' },
    m24opo: { image: 'porto01' },
    m24ber: { image: 'berlin02' },
    s24prg: { image: 'summit02' },
    m24lju: { image: 'ljubljana01' },
    m24bcn: { image: 'barcelona01' },
    m24cph: { image: 'copenhagen01' },
    m24rom: { image: 'rome01' },
    s24brn: { image: 'brno01' },
}*/

let searchParams = null

//let eventSelected = core.events[0].id;
const eventSelected = writable('');
const speakerSelected = writable('alona-shevchenko');
const imageSelected = writable('');

onMount(() => {
    searchParams = new URL(document.location).searchParams;

    const id = searchParams.get('id');
    if (id) {
        eventSelected.set(id);
    }
    const speaker = searchParams.get('speaker');
    if (speaker) {
        speakerSelected.set(speaker);
    }
    const img = searchParams.get('img');
    if (img) {
        imageSelected.set(img);
    }
});

eventSelected.subscribe((id, next) => {
    const event = core.events.find(e => e.id === id);
    if (!event) {
        return;
    }
    if (event.speakers?.length > 0) {
        speakerSelected.set(event.speakers[0]);
    }
    if (event.design?.image) {
        imageSelected.set(event.design.image);
    }
    return next
})

function getImageUrl(img) {
    return `/gen-img/events/${img}.png`
}

$: image = $imageSelected ? getImageUrl($imageSelected) : '';
$: event = core.events.find(e => e.id === $eventSelected);
$: speaker = core.people.find(p => p.id === $speakerSelected);

const tools = {
    dateFormat
}

let imagesSrc = import.meta.glob("../../public/gen-img/events/*.png");
const images = [];
for (const path in imagesSrc) {
    const splitted = path.split('/')
    images.push(splitted[splitted.length-1].split('.')[0])
}

</script>


<div class="w-full p-10">
    <div>
        <div>
            Event:
            <select bind:value={$eventSelected} class="text-black">
                <option value="">---</option>
                {#each core.events as e}
                    <option value={e.id}>[{e.id}] {e.type} {e.city} - {dateFormat(e.date)}</option>
                {/each}
            </select>
        </div>
        <!--div>
            Image:
            <select bind:value={imageSelected} class="text-black">
                {#each Object.keys(images) as image}
                    <option value={image}>{image}</option>
                {/each}
            </select>
        </div-->
    </div>
</div>

{#if !$eventSelected}
<div class="w-full px-10">
    Please select event.

    <div class="mt-10 flex flex-wrap gap-4 mb-20">
        {#each core.events as event}
            <div>
                <div class="mb-2 text-[#909090]">{event.id} [{event.design?.image || '-'}]</div>
                <div class="w-[380px] h-[570px] relative">
                    <div class="scale-50 absolute -left-[172px] -top-[285px] bg-red-200 {!event.design?.image ? 'opacity-50' : ''}" style="margin-left: -1rem;">
                        <a href="/gen/event?id={event.id}"><PosterSimple {event} image={getImageUrl(event.design?.image)} {tools} /></a>
                    </div>
                </div>
            </div>
        {/each}
    </div>
</div>
{:else}
<div class="px-10 py-4">
    <a href="/gen/event" class="underline hover:no-underline">Back to events overview</a>
</div>
<div class="px-10 py-4">
    Image:
    <select bind:value={$imageSelected} class="text-black">
        <option value="">---</option>
        {#each images as img}
            <option value={img}>{img} {#if event.design?.image && event.design.image === img}[fixed]{/if}</option>
        {/each}
    </select>
</div>
<div class="w-full flex flex-wrap gap-10 p-10">

    <div>
        <div class="mb-4 text-xl text-[#909090]">Square (1:1)</div>

        <div class="w-[404px]">
           <Square {event} {image} {tools} />
        </div>
    </div>

    <div>
        <div class="mb-4 text-xl text-[#909090]">Wide-square (4:3)</div>

        <div class="h-[404px]">
            <WideSquare {event} {image} {tools} />
        </div>
    </div>

    <div>
        <div class="mb-4 text-xl text-[#909090]">Wide (16:9)</div>

        <div class="h-[404px]">
            <Wide {event} {image} {tools} />
        </div>
    </div>

    <div>
        <div class="mb-4 text-xl text-[#909090]">Square (speaker) (1:1)</div>
        <div class="my-4">
            Speaker: 
            <select bind:value={$speakerSelected} class="text-black">
                {#if event.speakers}
                    {#each event.speakers as sp}
                        <option value={sp}>{sp}</option>
                    {/each}
                {/if}
            </select>
        </div>

        <div class="w-[404px]">
            <SquareSpeaker {speaker} {event} {image} {tools} />
        </div>
    </div>

    <div>
        <div class="mb-4 text-xl text-[#909090]">Poster (3:2)</div>
        
        <div class="w-[764px]">
            <Poster {topics} {event} {image} {tools} />
        </div>
    </div>

    <div>
        <div class="mb-4 text-xl text-[#909090]">Poster (simple) (3:2)</div>
        
        <div class="w-[764px]">
            <PosterSimple {event} {image} {tools} />
        </div>
    </div>
</div>
{/if}