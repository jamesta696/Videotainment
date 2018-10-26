class ChannelApplication extends Application{
    constructor(el){
        super(el);
        this.id = getParameterByName("id");
    }

    onLoad(){
        super.onLoad();
        this.channelTitle = this.element.querySelector(".channel-title");
        this.channelVideosContainer = this.element.querySelector(".row-1190");
        this.channelVideosContainer.innerHTML = "";
        this.thumbNailContainer = this.element.querySelector(".image-channel");
        this.channelName = this.element.querySelector(".channel");
        this.channelName.innerHTML = "";
        this.channelBanner = this.element.querySelector(".channel-banner");
        this.channelVideoCount = this.element.querySelector(".subtitle-channel");
    }

    onApiLoaded(e){
        super.onApiLoaded();
        this.onGetChannelDetailsRequest();
    }

    onGetChannelDetailsRequest(){
        const request = gapi.client.youtube.channels.list({
			id: this.id,
            part: "snippet,contentDetails,statistics,brandingSettings"
		});
		request.execute(response =>  {
			const results = response.result;
			console.log(results);
            this.onGetChannelPlaylistVideosRequest(results);
            this.onSetChannelDetails(results);
        });
    }

    onSetChannelDetails(results){
        this.channelTitle.innerHTML = `Channel - ${results.items[0].brandingSettings.channel.title} | Videotainment`;
        this.channelBanner.src = results.items[0].brandingSettings.image.bannerTabletExtraHdImageUrl;
        this.thumbNailContainer.src = results.items[0].snippet.thumbnails.high.url;
        this.channelName.innerHTML = results.items[0].snippet.title;
        this.channelVideoCount.innerHTML = results.items[0].statistics.videoCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " Videos";
    }

    onGetChannelPlaylistVideosRequest(results){
        const request = gapi.client.youtube.playlistItems.list({
            maxResults: 20,
            part: "snippet,contentDetails",
            playlistId: results.items[0].contentDetails.relatedPlaylists.uploads
		});
		request.execute(response =>  {
			const results = response.result;
			console.log(results);
			this.onCreateChannelPlaylistVideos(results.items);
		});	
    }

    onCreateChannelPlaylistVideos(items){   
        for(let item of items){
            const video = new VideoItem(item);
            video.id = item.contentDetails.videoId;
            video.onChannelRedirect(item);
            this.channelVideosContainer.appendChild(video.element);
        }
    }
}