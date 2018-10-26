class ResultsApplication extends Application{
	constructor(el){
		super(el);
		this.keyword = getParameterByName("keyword");
	}

	onLoad(){
		super.onLoad();
		this.resultsTitleTab = this.element.querySelector(".results-title");
		this.container = this.element.querySelector(".column-search-left");
		this.container.innerHTML = "";
	}

	onApiLoaded(e){
		super.onApiLoaded();
		this.onRequestResults(e)
	}

	onRequestResults(e){
		const request = gapi.client.youtube.search.list({
            part: "snippet",
			type: "video",
            q: encodeURIComponent(this.keyword).replace(/%20/g, "+"),
            maxResults: 50
		}); 
		request.execute(response =>  {
			const results = response.result;
			console.log(results);
			this.onCreateResultsVideos(results.items);
			this.resultsTitleTab.innerHTML = `Searched For: "${this.keyword}" | Videotainment`;
		})
	}

	onCreateResultsVideos(items){
		for(let item of items){
			const video = new VideoItem(item);
			video.id = item.id.videoId;	
			video.setDate(item);
			video.onLinkRedirect(item);
			this.container.appendChild(video.element);	
		}
	}
}
