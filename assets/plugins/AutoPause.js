export class AutoPause {
  constructor() {
    this.handleIntersection = this.handleIntersection.bind(this);
    this.handleVisibilityChange = this.handleVisibilityChange.bind(this);
  }

  run(player, config = { threshold: 0.25 }) {
    this.config = config;
    this.player = player;
    const observer = new IntersectionObserver(this.handleIntersection, this.config);
    observer.observe(this.player.media);

    document.addEventListener('visibilitychange', this.handleVisibilityChange);
  }

  handleIntersection(entries) {
    const entry = entries[0];
    console.log('handleIntersection', entry);

    const isVisible = entry.intersectionRatio >= this.config.threshold;
    console.log({ intersectionRatio: entry.intersectionRatio, isVisible, threshold: this.config.threshold });
    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }

  handleVisibilityChange() {
    console.log(document.visibilityState);
    const isVisible = document.visibilityState === 'visible';
    if (isVisible) {
      this.player.play();
    } else {
      this.player.pause();
    }
  }
}
