export interface MediaPlayerPlugin {
  run: (player: MediaPlayer) => void;
}

export interface MediaPlayerConfig {
  el: HTMLVideoElement;
  plugins: MediaPlayerPlugin[];
}

export class MediaPlayer {
  media: HTMLMediaElement;
  private plugins: MediaPlayerPlugin[];
  container: HTMLElement;

  constructor(config: MediaPlayerConfig) {
    this.media = config.el;
    this.plugins = config.plugins || [];
    this.initPlayer();
    this.initPlugins();
  }

  initPlayer() {
    this.container = document.createElement('div');
    this.container.style.position = 'relative';
    this.media.parentNode.insertBefore(this.container, this.media);
    this.container.appendChild(this.media);
  }

  get muted() {
    return this.media.muted;
  }

  set muted(value) {
    this.media.muted = value;
  }

  private initPlugins() {
    this.plugins.forEach((plugin) => {
      plugin.run(this);
    });
  }

  play() {
    console.log('play');
    this.media.play();
  }

  pause() {
    console.log('pause');
    this.media.pause();
  }

  mute() {
    console.log('mute');
    this.media.muted = true;
  }

  unmute() {
    this.media.muted = false;
  }

  toggleMute() {
    this.media.muted = !this.media.muted;
  }

  toggle() {
    if (this.media.paused) {
      this.play();
    } else {
      this.pause();
    }
  }
}
