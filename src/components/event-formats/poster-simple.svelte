<script>
    export let event;
    export let image;
    export let tools;
</script>

<div id="img-poster-simple" class="aspect-[1/1.414] w-[760px] relative bg-black overflow-hidden text-white">
    <img src="/logo.svg" class="absolute top-10 left-10 w-1/3 z-20" />

    {#if event.type === 'summit'}
        <img src="/gen-img/summit-title3.svg" class="absolute top-28 left-0 w-full z-20" />
        <div class="absolute top-14 left-0 h-64 w-full z-10" style="background: linear-gradient(black, transparent);"></div>
        <div class="absolute top-14 left-[-70px] w-[900px] h-[1020px] -z-0" style="background-image: url({image.src}); background-size: cover; background-position: center; {image.calcBgOffsets('poster-simple')}"></div>
        <div class="absolute bottom-0 left-0 h-[30rem] w-full z-10" style="background: linear-gradient(transparent, black);"></div>

        <div class="absolute bottom-10 left-10 right-10 uppercase text-[5.5rem] z-20 font-kyiv">
            <div>
                {tools.dateFormat(event.date, "dd/MM/yyyy")}
            </div>
            <div class="-mt-8">
                {event.city}
            </div>
        </div>

    {:else}
        <div class="absolute top-28 left-0 h-32 w-full z-10" style="background: linear-gradient(black, transparent);"></div>
        <div class="absolute top-28 left-[-70px] w-[900px] h-[900px] -z-0" style="background-image: url({image.src}); background-size: cover; background-position: center; {image.calcBgOffsets('poster-simple')}"></div>
        <div class="absolute bottom-[3.5em] left-0 h-48 w-full z-10" style="background: linear-gradient(transparent, black);"></div>

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