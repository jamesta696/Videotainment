class Application {
	constructor(el){
		window.init = this.init.bind(this);
		this.element = el;
		document.addEventListener("DOMContentLoaded", (e) => this.onLoad(e), false);
		this.element.addEventListener("apiloaded", (e) => this.onApiLoaded(e), false);
		
	}
	onLoad(e){
		const searchComponent = document.querySelector(".search-container");
		this.searchBar = new SearchBar(searchComponent);
	}

	onApiLoaded(){
		//console.log("ApiLoaded fired. Override this in subclasses to handle youtube requests.")
	}

	init(){
		gapi.client.setApiKey(Config.KEY);
		gapi.client.load("youtube", "v3", () => {
            let event = new CustomEvent('apiloaded', {
                bubbles: true, 
                detail: {}
            });
            this.element.dispatchEvent(event); 
        });
	}
}


