<script>
    export let event;
    export let image;
    export let tools;
</script>


<div class="h-[404px] border-2 border-green-500 overflow-hidden">
    <div id="img-wide" class="aspect-video h-[400px] relative bg-black">

        <img src="/logo.svg" class="absolute top-8 left-8 w-1/4 z-20" />

        <div class="absolute top-0 left-48 h-full w-1/3 z-10" style="background: linear-gradient(to left, transparent, black);"></div>
        <img src={image} class="absolute top-0 left-48 -z-0 w-[33rem]" />

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
</div>