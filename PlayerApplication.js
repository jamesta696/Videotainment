class PlayerApplication extends Application{
	constructor(el){
		super(el);
		this.id = getParameterByName("id");
	}

	onLoad(){
		super.onLoad();	
		this.videoTitleTab = this.element.querySelector(".video-title");
		this.videoInfoContainer = this.element.querySelector(".mobile-padding");
		this.playerContainer = this.element.querySelector("#player");
		this.playerContainer.innerHTML = "";
		this.relatedVideosContainer = this.element.querySelector(".column-video-right");
		this.relatedVideosContainer.innerHTML = "";
		const video = new VideoPlayer();
		this.playerContainer.appendChild(video.element);
		this.channelLink = this.element.querySelector(".channel-link");
		this.videoDescription = this.element.querySelector(".videoDesc");
	}

	onApiLoaded(){
		super.onApiLoaded();
		this.onCreateVideoDetailsRequest();
		this.onGetRelatedVideos();
	}

	onCreateVideoDetailsRequest(){
		const request = gapi.client.youtube.videos.list({
			id: this.id,
			part: "snippet,contentDetails,statistics"
		});
		request.execute(response =>  {
			const results = response.result;
			console.log(results);
			this.onPopulateVideoInfo(results);
		});	
	}

	onPopulateVideoInfo(res){
		this.videoTitleTab.innerHTML = `${res.items[0].snippet.title} | Videotainment`;
		this.videoDescription.innerHTML = res.items[0].snippet.description;

		const titleDiv = this.element.querySelector(".f-22");
			  titleDiv.innerHTML = res.items[0].snippet.title;

		let viewCount = this.element.querySelector(".f-17");
			viewCount = (res.items[0].statistics.viewCount == undefined) ? viewCount.innerHTML = "" : 
			viewCount.innerHTML = res.items[0].statistics.viewCount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + " views";
			
		const channelTitle = this.element.querySelector(".f-18");
			  channelTitle.innerHTML = res.items[0].snippet.channelTitle;

		this.onChannelInfo(res);
		this.onFormatLinks(res);
		this.onFormatVideoTags(res);
	}

	onFormatLinks(res){
		//URLs starting with http://, https://, or ftp://
		const replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
		//URLs starting with "www." (without // before it, or it'd re-link the ones done above).
		const replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;

		if (this.videoDescription.innerHTML.includes("http")){
			this.videoDescription.innerHTML = res.items[0].snippet.description.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');
		}else{
			this.videoDescription.innerHTML = res.items[0].snippet.description.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');
		}
	}

	onFormatVideoTags(res){
		let videoTags = this.element.querySelector(".videoTags");
		let tagLinks = "";	
		for (let i in res.items[0].snippet.tags){
			tagLinks = tagLinks + `<a href="/results.html?keyword=${res.items[0].snippet.tags[i]}">${res.items[0].snippet.tags[i]}</a>, `;
		}
			videoTags = (res.items[0].snippet.tags == undefined) ? videoTags.innerHTML = "" : 
			videoTags.innerHTML = tagLinks;
	}

	onChannelInfo(res){
		const request = gapi.client.youtube.channels.list({
			id: res.items[0].snippet.channelId,
			part: "snippet,contentDetails,statistics"
		});
		request.execute(response => {
			const results = response.result;
			console.log(results);
			let channelThumbNail = this.element.querySelector(".image-round");
			channelThumbNail.setAttribute("src", results.items[0].snippet.thumbnails.high.url);
			this.channelLink.href = `/channel.html?id=${results.items[0].id}`;
		});	
	}

	onGetRelatedVideos(){
		const request = gapi.client.youtube.search.list({
            part: "snippet",
			type: "video",
			relatedToVideoId: this.id,
            maxResults: 10
		}); 
		request.execute(response =>  {
			const results = response.result;
			console.log(results);
			this.onPopulateRelatedVideos(results.items);
		});
	}

	onPopulateRelatedVideos(items){
		for (let item of items){
			const video = new VideoItem(item);
			video.id = item.id.videoId;
			video.onLinkRedirect(item);
			this.relatedVideosContainer.appendChild(video.element);
		}
	}
}



