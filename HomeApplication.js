class HomeApplication extends Application {
	constructor(el){
		super(el);
		this.id = getParameterByName("id");
		this.channelId = getParameterByName("channelId");
	}

	onLoad(){
		super.onLoad();	
		this.popularVideosContainer = this.element.querySelector(".popular-container");
		this.popularVideosContainer.innerHTML = "";
		this.autosAndVehiclesContainer = this.element.querySelector(".autos-vehicles");
		this.autosAndVehiclesContainer.innerHTML = "";
		this.gamingContainer = this.element.querySelector(".gaming");
		this.gamingContainer.innerHTML = "";
		this.channelContainer = this.element.querySelector(".channel-container");
		this.channelContainer.innerHTML = "";
	}
	
	//After Data API is loaded, run these functions
	onApiLoaded(e){
		super.onApiLoaded();	
		this.onGetPopularVideos();
		this.onGetAutosandVehiclesVideos();
		this.onGetGamingVideos();
		this.onSearchChannelsList();
	}

	// Videos list API call to get the most trending latest videos and create them followed by this.onCreatePopularVideos();
	onGetPopularVideos(){
		const request = gapi.client.youtube.videos.list({
			chart: "mostPopular",
			regionCode: "US",
			part: "snippet,contentDetails,statistics",
			videoCategoryId: "",
			maxResults: 12
		});
		request.execute(response => {
			const results = response.result;
			console.log(results);
			this.onCreatePopularVideos(results.items);
		});	
	}

	onCreatePopularVideos(items){
		for(let item of items){
			let video = new VideoItem(item);
			video.setViewCount(item);
			video.onLinkRedirect(item);
			video.id = item.id;
			this.popularVideosContainer.appendChild(video.element);		
		}
	}

	// Videos list API call to get the most trending latest videos related to Autos and Vehicles and create them - this.onCreateAutosandVehiclesVideos();
	onGetAutosandVehiclesVideos(){
		const request = gapi.client.youtube.videos.list({
			chart: "mostPopular",
			regionCode: "US",
			part: "snippet,contentDetails,statistics",
			videoCategoryId: "2",
			maxResults: 12
		});
		request.execute(response => {
			const results = response.result;
			console.log(results);
			this.onCreateAutosandVehiclesVideos(results.items);
		});	
	}

	onCreateAutosandVehiclesVideos(items){
		for(let item of items){
			let video = new VideoItem(item);
			video.setViewCount(item);
			video.onLinkRedirect(item);
			video.id = item.id;
			this.autosAndVehiclesContainer.appendChild(video.element);
		}
	}

	// Videos list API call to get the most trending latest videos related to Gaming and create them - this.onCreateGamingVideos();
	onGetGamingVideos(){
		const request = gapi.client.youtube.videos.list({
			chart: "mostPopular",
			regionCode: "US",
			part: "snippet,contentDetails,statistics",
			videoCategoryId: "20",
			maxResults: 12
		});
		request.execute(response => {
			const results = response.result;
			console.log(results);
			this.onCreateGamingVideos(results.items);
		});	
	}

	onCreateGamingVideos(items){
		for(let item of items){
			let video = new VideoItem(item);
			video.setViewCount(item);
			video.onLinkRedirect(item);
			video.id = item.id;
			this.gamingContainer.appendChild(video.element);
		}
	}

	// Search list API call to get channels upon rating and inject them into the specified HTML element container - this.onCreateChannels();
	onSearchChannelsList(){
		const request = gapi.client.youtube.search.list({
			part: "snippet",
			type: "channel",
			maxResults: 48,
			regionCode: "US",
			order: "rating"
		});
		request.execute(response => {
			const results = response.result;
			console.log(results);
			this.onCreateChannels(results.items);
		});		
	}

	onCreateChannels(items){
		for(let item of items){
			let channel = new ChannelItem(item);
				channel.id = item.id.channelId;
			this.channelContainer.appendChild(channel.element);
		}
	}
}
