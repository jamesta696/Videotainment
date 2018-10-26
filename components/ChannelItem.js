class ChannelItem{
    constructor(data){
        this.element = this.getElement(data);
        this.element.addEventListener("click", (e) => this.onChannelRedirect(e), false);
        this.element.classList.add("ChannelItem");
        this.data = data;
    }

    onChannelRedirect(e){
        e.preventDefault(e);
        e.stopPropagation(e);
        location.href = `/channel.html?id=${this.id}`;
    }

    getElement(data){
        var html = `  
        <div class="column-in-channels channel-no-0" style="width: 142px; height:142px;">
            <div class="card-channel">
                <a href="/channel.html?id=${data.snippet.channelId}">
                    <div class="channel-image" style="background-image: url(${data.snippet.thumbnails.high.url})"></div>
                </a>
                <h3 class="card-title"><a href="/channel.html?id=${data.snippet.channelId}">${data.snippet.channelTitle}</a></h3>
                <p><span class="small silver">&nbsp;</span></p>
                <div class="buffer-15"></div>
            </div>
        </div>
        `;
        return html.toHtmlElement();
    }

    setChannelDetails(data){
        let thumbNailContainer = this.element.querySelector(".image-round .image-channel");
            thumbNailContainer.src = data.items[0].snippet.thumbnails.default.url;
    }
}