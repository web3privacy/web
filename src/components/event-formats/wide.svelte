<script>
    export let event;
    export let image;
    export let tools;
</script>



<div id="img-wide" class="aspect-video h-[400px] relative bg-black overflow-hidden text-white">

    <img src="/logo.svg" class="absolute top-8 left-8 w-1/4 z-20" />

    <!--div class="flex items-end justify-end w-full h-full">
        <div class="absolute top-0 h-full {image.ratio > 1 && event.type !== 'summit' ? 'w-2/3' : 'w-2/6'} left-1/12 z-10" style="background: linear-gradient(to left, transparent, black); left: {image.ratio > 1 ? '0px' : '130px'};"></div>

        <div class="h-full {image.ratio > 1.3 ? 'w-full' : 'w-5/6'} justify-end flex">
            <img src={image.src} class="h-full object-cover" style="{image.calcObjOffsets('wide')}" />
        </div>
    </div-->

    <div class="absolute left-0 top-0 h-full w-64 z-10" style="background: linear-gradient(to left, transparent, black);"></div>
    <img src={image.src} class="absolute right-0 h-full w-full object-cover" style="{image.calcObjOffsets('wide')}" />

    {#if event.type === 'summit'}
        <img src="/gen-img/summit-title3.svg" class="absolute -bottom-1.5 left-0 w-full z-20" />
        <div class="absolute top-0 left-0 h-44 w-full z-10" style="background: linear-gradient(black, transparent);"></div>
        <div class="absolute bottom-0 left-0 h-32 w-full z-10" style="background: linear-gradient(transparent, black);"></div>
        <div class="absolute right-0 top-0 h-full w-44 z-10" style="background: linear-gradient(to right, transparent, black);"></div>

        <div class="absolute top-5 right-8 uppercase text-[2.4rem] z-20 font-kyiv text-right">
            <div>
                {tools.dateFormat(event.date, "dd/MM/yyyy")}
            </div>
            <div class="-mt-1">
                {event.city}
            </div>
        </div>
    {:else}
        <div class="absolute bottom-8 left-8 uppercase z-20 text-xl">
            <div class="flex">
                <div class="border-2 border-white py-1 px-2 inline-block bg-black">
                    {tools.dateFormat(event.date)}
                </div>
            </div>
            <div class="flex" style="margin-top: -2px;">
                <div class="border-2 border-white py-1 px-2 bg-black">
                    {event.city}, {event.country}
                </div>
            </div>
            <div class="flex" style="margin-top: -2px;">
                <div class="border-2 border-white py-1 px-2 bg-white text-black uppercase">
                    {event.type}
                </div>  
            </div>
        </div>
    {/if}
</div>
