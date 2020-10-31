import { MediaPlayer, MediaPlayerPlugin } from './../../MediaPlayer';
import { Ad, Ads } from './Ads';

export class AdsPlugin implements MediaPlayerPlugin {
  private player: MediaPlayer | undefined;
  private media: HTMLMediaElement | undefined;
  private currentAd: Ad | undefined;
  private adsContainer: HTMLElement;

  constructor(private ads: Ads = Ads.getInstance()) {
    this.handleTimeUpdate = this.handleTimeUpdate.bind(this);
    this.adsContainer = document.createElement('div');
  }

  run(player: MediaPlayer) {
    this.player = player;
    this.player.container!.appendChild(this.adsContainer);
    this.media = player.media;
    this.media.addEventListener('timeupdate', this.handleTimeUpdate);
  }

  private handleTimeUpdate() {
    const currentTime = Math.floor(this.media!.currentTime);
    if (currentTime % 30 === 0) {
      this.renderAd();
    }
  }

  private renderAd() {
    if (this.currentAd) {
      return;
    }

    const ad = this.ads.getAd();
    this.currentAd = ad;
    this.adsContainer.innerHTML = `
      <div class="ads">
        <a class="ads__link" href="${this.currentAd!.url}" target="_blank">
          <img class="ads__img" src="${this.currentAd!.imageUrl}" />
          <div class="ads__info">
            <h5 class="ads__title">${this.currentAd!.title}</h5>
            <p class="ads__body">${this.currentAd!.body}</p>
          </div>
        </a>
      </div>
    `;

    setTimeout(() => {
      this.currentAd = undefined;
      this.adsContainer.innerHTML = '';
    }, 10000);
  }
}
