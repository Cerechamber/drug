export default class VideoPlayer {
	constructor(triggers, overlay) {
		this.btns = document.querySelectorAll(triggers);
		this.overlay = document.querySelector(overlay);
		this.close = this.overlay.querySelector('.overlay__close');
	}

	createPlayer(url) {
		this.player = new YT.Player('frame', {
          height: '100%',
          width: '100%',
          videoId: `${url}`,
          events: {
            'onStateChange': this.onPlayerStateChange
          }
        });
        console.log(this.player);
        this.overlay.style.display = 'flex';
	}

	bindTriggers() {
      this.btns.forEach((btn, i) => {

          btn.addEventListener('click', () => {
            if (!btn.closest('.module__video-item') || btn.closest('.module__video-item').getAttribute('data-disabled') != 'true') {
              this.activeBtn = btn;
            if (document.querySelector('iframe#frame')) {
               this.overlay.style.display = 'flex';
               if (this.path != btn.getAttribute('data-url')) {
                 this.path = btn.getAttribute('data-url');
                 this.player.loadVideoById({videoId:this.path});
               }
            } else {
              this.path = btn.getAttribute('data-url');
              this.createPlayer(this.path);
            }
          }

          });
		});
	}

	bindCloseBtn() {
		this.close.addEventListener('click', () => {
          this.overlay.style.display = 'none';
          this.player.stopVideo();
		});
	}



	init() {
	  if (this.btns.length > 0) {
      const tag = document.createElement('script');
      tag.src = "https://www.youtube.com/iframe_api";
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

      this.bindTriggers();
      this.bindCloseBtn();
    }
	}
}
