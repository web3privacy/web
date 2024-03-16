<script>
    import { afterUpdate, onMount } from "svelte";
    import { writable } from "svelte/store";

    export let event;
    export let image;
    export let tools;
    export let imgSrc;

</script>

<div id="img-wide-square" class="aspect-[4/3] h-[400px] relative bg-black text-white overflow-hidden">

    <img src="/logo.svg" class="absolute top-8 left-8 w-1/3 z-20" />

    <div class="flex items-end justify-end w-full h-full">
        <div class="absolute top-0 h-full {imgSrc.ratio > 1 ? 'w-2/3' : 'w-2/6'} left-1/12 z-10" style="background: linear-gradient(to left, transparent, black); left: {imgSrc.ratio > 1 ? '0px' : '130px'};"></div>

        <div class="h-full {imgSrc.ratio > 1.3 ? 'w-full' : 'w-5/6'} justify-end flex">
            <img src={imgSrc.src} class="h-full object-cover" />
        </div>
    </div>

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
</div>