import createElement from '../utils/createElement.js';

export default function videoElement() {
  /**
   *  <video class="video" id="video-bg" autoplay muted loop playsinline>
      <source src="./assets/space-video.mp4" type="video/mp4" />
    </video>
   */
  const videoEl = createElement('video', {
    class: 'video',
    autoplay: '',
    muted: '',
    loop: '',
    playsinline: '',
  });
  const sourceEl = createElement('source', {
    src: './assets/space-video.mp4',
    type: 'video/mp4',
  });

  videoEl.append(sourceEl);

  return videoEl;
}
