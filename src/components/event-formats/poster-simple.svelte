<script>
    export let event;
    export let image;
    export let tools;
</script>

<div id="img-poster-simple" class="aspect-[2/3] w-[760px] h-[1140px] relative bg-black overflow-hidden text-white">
    <img src="/logo.svg" class="absolute top-10 left-10 w-1/3 z-20" />

    {#if event.type === 'summit'}
        <img src="/gen-img/summit-title.svg" class="absolute top-28 left-0 w-full z-20" />
        <div class="absolute top-36 left-0 h-64 w-full z-10" style="background: linear-gradient(black, transparent);"></div>
        <div class="absolute top-36 left-[-70px] w-[900px] h-[900px] -z-0" style="background-image: url({image}); background-size: 100% 100%; background-position: center;"></div>
        <div class="absolute bottom-[6em] left-0 h-48 w-full z-10" style="background: linear-gradient(transparent, black);"></div>

        <div class="absolute bottom-24 left-10 right-10 uppercase text-4xl z-20">
            <div class="flex justify-center">
                <div class="border-2 border-white py-2 px-4 border-r-0 inline-block bg-black">
                    {tools.dateFormat(event.date)}
                </div>
                <div class="border-2 border-white py-2 px-4 bg-black">
                    {event.city}, {event.country}
                </div>
            </div>
        </div>

    {:else}
        <div class="absolute top-28 left-0 h-32 w-full z-10" style="background: linear-gradient(black, transparent);"></div>
        <div class="absolute top-28 left-[-70px] w-[900px] h-[900px] -z-0" style="background-image: url({image}); background-size: 100% 100%; background-position: center;"></div>
        <div class="absolute bottom-[7em] left-0 h-48 w-full z-10" style="background: linear-gradient(transparent, black);"></div>

        <div class="absolute bottom-10 left-10 uppercase text-3xl z-20">
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
    {/if}



</div>