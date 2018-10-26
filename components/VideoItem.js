class VideoItem {
    constructor(data){
        this.element = this.getElement(data);
        // this.element.addEventListener("click", (e) => this.onVideoRedirect(e), false);
        this.videoThumb = this.element.querySelector(".img-in-placeholder");
        this.videoTitle = this.element.querySelector(".search-title a");
        this.videoThumb.addEventListener("click", (e) => this.onVideoRedirect(e), false);
        this.videoTitle.addEventListener("click", (e) => this.onVideoRedirect(e), false);
        this.element.addEventListener("click", (e) => this.onVideoItemChannelRedirect(e), false);
        this.element.classList.add("VideoItem");
        this.data = data;
        
    }

    onVideoRedirect(e){
        if(e.target === this.videoThumb || this.videoTitle){
            e.preventDefault(e);
            e.stopPropagation(e);
            location.href = `player.html?id=${this.id}`;
        }
    }

    onVideoItemChannelRedirect(e, data){
        let channel = this.element.querySelector(".search-subtitle a");
        if(e.target === channel){
            location.href = `/channel.html?id=${this.data.snippet.channelId}`;
        }
    }


    getElement(data){
        var html = `
        <div class="row row-search">
                <div class="search-column-left">
                    <div class="placeholder-16-9-320">
                        <div class="img-in-placeholder"><a href="/player.html?id=${data.id.videoId}"><img src="${data.snippet.thumbnails.high.url}"></a></div>
                        <div class="duration">${data.snippet.duration || ""}</div>
                    </div>
                </div>
                <div class="search-column-right">
                    <h3 class="search-title padding-top-0 line-clamp-2-search"><a href="">${data.snippet.title}</a></h3>
                    <p class="search-subtitle"><a href="/channel.html?id=${data.snippet.channelId}">${data.snippet.channelTitle}</a></p>
                    <p class="search-views"></p>
                    <p class="search-desc line-clamp-3">${data.snippet.description}</p>
                </div>
        </div>`;
        return html.toHtmlElement();
    }

    setViewCount(data){
        let viewCountContainer = this.element.querySelector(".VideoItem .search-views");
            viewCountContainer = (data.statistics.viewCount == undefined) ? viewCountContainer.innerHTML = "" : 
            viewCountContainer.innerHTML = data.statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " views";
    }

    setDate(data){
        let dateContainer = this.element.querySelector(".VideoItem .search-views");
            dateContainer.innerHTML = data.snippet.publishedAt;
        var date = new Date(dateContainer.innerHTML);
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var dt = date.getDate();
        if (dt < 10) {
            dt = '0' + dt;
          }
        if (month < 10) {
            month = '0' + month;
        }
        dateContainer.innerHTML = month + '-' + dt + '-' + year;
    }

    onLinkRedirect(data){
        let aLink = this.element.querySelector(".img-in-placeholder a");
        let titleAlink = this.element.querySelector("h3.search-title a");
        if(location.href.includes("results") || location.href.includes("player")){
            aLink.href = `/player.html?id=${data.id.videoId}`;
            titleAlink.href = `/player.html?id=${data.id.videoId}`;
        }else{
            aLink.href = `/player.html?id=${data.id}`;
            titleAlink.href = `/player.html?id=${data.id}`;
        }
    }

    onChannelRedirect(data){
        let aLink = this.element.querySelector(".img-in-placeholder a");
            aLink.href = `/player.html?id=${data.contentDetails.videoId}`;
    }
}