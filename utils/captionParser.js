export function parseAndWrapCaptions(caption) {
    return caption.replace(/\[([^\]]+)\]\((https?:\/\/[^\)]+)\)/g, (match,text, content) => {
        // Split the content by spaces to identify potential URLs
        const parts = content.split(' ');
        const url = parts.find(part => part.startsWith('https://'));

        console.log(content)
        if (url) {
            // If a URL is found, wrap the content in an anchor tag using the first URL
            return `<a href="${url}"
            target="_blank"
            class="text-white underline"
            style="text-underline-offset: 4px;"
            >${text}</a>`;
        } else {
            // If no URL, join the parts with a comma
            return content.split(' ').join(', ');
        }
    });
}
