import { MediaPlayerPlugin } from './../MediaPlayer';
import { MediaPlayer } from '../MediaPlayer';

export interface AutoPauseConfig {
  threshold: number;
}

export class AutoPause implements MediaPlayerPlugin {
  private player: MediaPlayer | undefined;

  constructor(private config: AutoPauseConfig = { threshold: 0.25 }) {
    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  run(player: MediaPlayer) {
    this.player = player;
    const observer = new IntersectionObserver(this.handleIntersection, this.config);
    observer.observe(this.player.media);

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  private handleIntersection(entries: IntersectionObserverEntry[]) {
    const entry = entries[0];
    console.log('handleIntersection', entry);

    const isVisible = entry.intersectionRatio >= this.config.threshold;
    console.log({ intersectionRatio: entry.intersectionRatio, isVisible, threshold: this.config.threshold });
    if (isVisible) {
      this.player!.play();
    } else {
      this.player!.pause();
    }
  }

  private handleVisibilityChange() {
    console.log(document.visibilityState);
    const isVisible = document.visibilityState === 'visible';
    if (isVisible) {
      this.player!.play();
    } else {
      this.player!.pause();
    }
  }
}
