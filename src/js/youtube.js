export default class Youtube {

  constructor() {

    // Get videos array.
    this.videos =
      Array
        .from(document.querySelectorAll('.Youtube'))
        .filter(video => video.dataset.videoId);
  }

  init() {
    this.videos.forEach(video => {
      const img = new Image();
      img.addEventListener('load', () => video.appendChild(img));
      img.src = `https://img.youtube.com/vi/${video.dataset.videoId}/sddefault.jpg`
    })
  }

  loadVideo() {

  }

  playVideo() {

  }
}