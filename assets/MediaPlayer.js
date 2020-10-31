export function MediaPlayer(config) {
  this.media = config.el;
  this.plugins = config.plugins || [];
  this._initPlugins();
}

MediaPlayer.prototype._initPlugins = function () {
  const player = {
    play: () => this.play(),
    pause: () => this.pause(),
    media: this.media,
    get muted() {
      return this.media.muted;
    },
    set muted(value) {
      this.media.muted = value;
    },
  };

  this.plugins.forEach((plugin) => {
    plugin.run(player);
  });
};

MediaPlayer.prototype.play = function () {
  console.log('play');
  this.media.play();
};

MediaPlayer.prototype.pause = function () {
  console.log('pause');
  this.media.pause();
};

MediaPlayer.prototype.mute = function () {
  console.log('mute');
  this.media.muted = true;
};

MediaPlayer.prototype.unmute = function () {
  this.media.muted = false;
};

MediaPlayer.prototype.toggleMute = function () {
  this.media.muted = !this.media.muted;
};

MediaPlayer.prototype.toggle = function () {
  if (this.media.paused) {
    this.play();
  } else {
    this.pause();
  }
};
