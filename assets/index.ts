import { MediaPlayer } from './MediaPlayer';
import { AutoPlay } from './plugins/AutoPlay';
import { AutoPause } from './plugins/AutoPause';
import { AdsPlugin } from './plugins/Ads';

const video = document.querySelector('video');
const playButton = document.getElementById('playButton');
const muteButton = document.getElementById('muteButton');

const player = new MediaPlayer({ el: video, plugins: [new AutoPlay(), new AutoPause(), new AdsPlugin()] });

playButton.addEventListener('click', () => player.toggle());
muteButton.addEventListener('click', () => player.toggleMute());

if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').catch(console.error);
}
