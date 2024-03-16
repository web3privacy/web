<script>
    import { marked } from 'marked';

    export let event;
    export let image;
    export let tools;
    export let speaker;
</script>


<div id="img-square-speaker" class="aspect-square w-[400px] relative bg-black text-white overflow-hidden">
    <img src="/logo.svg" class="absolute top-6 left-6 w-2/6 z-20" />

    <img src={image.src} class="-z-10 opacity-40 h-full object-cover blur-sm" style="{image.calcObjOffsets('square')}" />

    <div class="absolute right-6 top-6 text-right uppercase text-sm">
        {tools.dateFormat(event.date)}<br/>
        {event.type} {event.city}   
    </div>

    <div class="absolute top-[5.5rem] w-full">
        <div class="flex justify-center items-center w-full">
            <div class="relative w-[200px]">
                <img src={speaker.imageUrl} class="w-full border-2 border-white aspect-square object-cover"  />
                {#if speaker.refs?.twitter || speaker.refs?.bsky}
                    <div class="absolute bottom-0 left-0 text-xs">
                        <div class="bg-white text-black py-1 px-2">
                            @{speaker.refs?.twitter || speaker.refs?.bsky}
                        </div>
                    </div>
                {/if}
            </div>
        </div>
        <div class="flex w-full justify-center" style="margin-top: -2px;">
            <div class="flex {speaker.name.length < 19 ? 'w-[200px] justify-start' : 'justify-center'}">
                <div class="border-2 border-white py-1 px-2 bg-black uppercase">
                    {speaker.name}
                </div>
            </div>
        </div>
    </div>

    <div class="absolute bottom-6 text-xs w-full text-center px-6">
        {@html marked.parseInline(speaker.caption)}
    </div>
</div>