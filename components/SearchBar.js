class SearchBar {
	constructor(searchComponent){
		
		this.element = searchComponent;
		this.searchBtn = document.querySelector(".searchBtn");
		this.searchBtn.addEventListener("click", (e) => this.onRedirect(e), false);
		this.input = this.element.querySelector("#searchField");
	}
	
	onRedirect(e){
		var keyword = this.input.value;
		e.preventDefault();
		location.href = `results.html?keyword=${keyword}`;
	}
	
}


