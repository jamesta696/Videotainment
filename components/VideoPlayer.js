class VideoPlayer {
    constructor(data){
        this.id = getParameterByName("id");
        this.element = this.getElement(data);
		this.element.addEventListener("click", (e) => this.onCreateIframe(e), false);
        this.onCreateVideoThumbnail();
    }

    getElement(data){
        var html = `
            <div class="youtube" data-embed="${this.id}"> 
                <div class="play-button"></div> 
            </div> 
        `;
        return html.toHtmlElement();
	}

    onCreateIframe(e){
        if(e.target){
			var iframe = document.createElement("iframe");
			iframe.setAttribute( "frameborder", "0");
			iframe.setAttribute( "allowfullscreen", "");
			iframe.setAttribute( "src", "https://www.youtube.com/embed/"+`${this.id}`+"?rel=0&showinfo=0&autoplay=1");
	
			this.innerHTML = "";
			this.youtube = this.element.querySelector(".youtube");
			this.youtube.appendChild(iframe);
			}else{
				return;
            }
            
			let playButton = document.querySelector(".play-button");	
			if (playButton){
				playButton.classList.remove("play-button");
            }
    }

    onCreateVideoThumbnail(e){	
		var thumbnailSource = "https://i.ytimg.com/vi/"+`${this.id}`+"/sddefault.jpg";
		var image = new Image();
		image.src = thumbnailSource;
		image.style.width = "100%";
		image.addEventListener( "load", (e) => {
			this.youtube = this.element.querySelector(".youtube");
			this.youtube.appendChild(image);
		});
	}
}