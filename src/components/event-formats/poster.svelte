<script>
    export let event;
    export let image;
    export let tools;
    export let topics;
</script>

<div id="img-poster" class="aspect-[1/1.414] w-[760px] relative bg-black text-white overflow-hidden">
    <img src="/logo.svg" class="absolute top-10 left-10 w-1/3 z-20" />

    <div class="absolute top-20 left-0 h-36 w-full z-10" style="background: linear-gradient(black, transparent);"></div>
    <img src={image.src} class="absolute top-20 left-0 -z-0 object-cover" style="{image.ratio > 1 ? 'height: 760px;' : ''} {image.calcObjOffsets('poster')}" />
    <div class="absolute bottom-[14rem] left-0 h-64 w-full z-10" style="background: linear-gradient(transparent, black);"></div>

    <div class="absolute bottom-80 left-10 uppercase text-3xl z-20">
        <div class="flex">
            <div class="border-2 border-white py-2 px-4 border-r-0 inline-block bg-black">
                {tools.dateFormat(event.date)}
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
    <div class="absolute left-10 right-10 bottom-28 uppercase text-lg flex flex-wrap gap-3 z-20">
        {#each topics as topic}
            <div><span class="inline-block w-2 h-2 bg-white"></span> {topic}</div>
        {/each}
    </div>
    <div class="absolute left-10 bottom-10 bg-white text-black text-sm uppercase py-1.5 px-3">
        web3privacy.info/events
    </div>
</div>