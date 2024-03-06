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
    'netw./event-formats/square.svelterivacy',
    'private messaging',
    'r&d: ZK, MPC, THE',
    'on-chain privacy',
    'regulation vs. privacy',
    'lunarpunk vs. solarpunk',
    'human rights daos',
    'privacy activism',
]

const events = {
    m24ath: { image: 'athens01' },
    m24buc: { image: 'meetup02' },
    m24ams: { image: 'amsterdam01' },
    m24ber: { image: 'berlin01' },
    s24prg: { image: 'summit01' },
    m24opo: { image: 'porto01' },
    m24rom: { image: 'rome01' },
    s24brn: { image: 'brno01' },
}

let searchParams = null

//let eventSelected = core.events[0].id;
const eventSelected = writable('');
const speakerSelected = writable('alona-shevchenko');

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
});

eventSelected.subscribe((id, next) => {
    const event = core.events.find(e => e.id === id);
    if (!event) {
        return;
    }
    if (event.speakers?.length > 0) {
        speakerSelected.set(event.speakers[0]);
    }
    return next
})

function getImage(eId) {
    return `/gen-img/events/${events[eId]?.image}.png`
}

$: image = getImage($eventSelected);
$: event = core.events.find(e => e.id === $eventSelected);
$: speaker = core.people.find(p => p.id === $speakerSelected);

const tools = {
    dateFormat
}

</script>


<div class="w-full p-10">
    <div>
        <div>
            Event:
            <select bind:value={$eventSelected} class="text-black">
                <option value="">---</option>
                {#each Object.keys(events).map(eId => core.events.find(e => e.id === eId)) as e}
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
<div class="w-full p-10">
    Please select event.

    <div class="mt-10 flex flex-wrap gap-4">
        {#each Object.keys(events).map(eId => core.events.find(e => e.id === eId)) as event}
            <div class="w-[380px] h-[570px] relative">
                <div class="scale-50 absolute -left-[160px] -top-[285px] bg-red-200" style="margin-left: -1rem;">
                    <a href="/gen/event?id={event.id}"><PosterSimple {event} image={getImage(event.id)} {tools} /></a>
                </div>
            </div>
        {/each}
    </div>
</div>
{:else}
<div class="px-10 py-4">
    <a href="/gen/event" class="underline hover:no-underline">Back to overview</a>
</div>
<div class="w-full flex flex-wrap gap-10 p-10">

    <div>
        <div class="mb-4 text-xl text-green-500">Square (1:1)</div>

        <div class="w-[404px] border-2 border-green-500 overflow-hidden">
           <Square {event} {image} {tools} />
        </div>
    </div>

    <div>
        <div class="mb-4 text-xl text-green-500">Wide-square (4:3)</div>

        <div class="h-[404px] border-2 border-green-500 overflow-hidden">
            <WideSquare {event} {image} {tools} />
        </div>
    </div>

    <div>
        <div class="mb-4 text-xl text-green-500">Wide (16:9)</div>

        <Wide {event} {image} {tools} />
    </div>

    <div>
        <div class="mb-4 text-xl text-green-500">Square (speaker) (1:1)</div>
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

        <div class="w-[404px] border-2 border-green-500">
            <SquareSpeaker {speaker} {event} {image} {tools} />
        </div>
    </div>

    <div>
        <div class="mb-4 text-xl text-green-500">Poster (3:2)</div>
        
        <div class="w-[764px] border-2 border-green-500">
            <Poster {topics} {event} {image} {tools} />
        </div>
    </div>

    <div>
        <div class="mb-4 text-xl text-green-500">Poster (simple) (3:2)</div>
        
        <div class="w-[764px] border-2 border-green-500">
            <PosterSimple {event} {image} {tools} />
        </div>
    </div>
</div>
{/if}