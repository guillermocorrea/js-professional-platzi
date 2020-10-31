import { MediaPlayer, MediaPlayerPlugin } from '../MediaPlayer';

export class AutoPlay implements MediaPlayerPlugin {
  run(player: MediaPlayer) {
    if (!player.muted) {
      player.muted = true;
    }
    player.play();
  }
}
