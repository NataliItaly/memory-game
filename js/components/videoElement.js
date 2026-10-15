import createElement from '../utils/createElement.js';

export default function videoElement() {
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
