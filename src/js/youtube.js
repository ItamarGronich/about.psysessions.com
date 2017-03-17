export default class Youtube {

  constructor() {

    // Get videos array.
    this.videos =
      Array
        .from(document.querySelectorAll('.Youtube'))
        .filter(video => video.dataset.videoId);
  }

  generateImages() {
    this.videos.forEach(video => {
      const img = new Image();
      img.addEventListener('load', () => video.appendChild(img));
      img.src = `https://img.youtube.com/vi/${video.dataset.videoId}/sddefault.jpg`
    });

    return this;
  }

  attachListener() {
    document.addEventListener('click', e => this.loadVideo(this.videos.filter(vid => e.target === vid)));
    return this;
  }

  loadVideo(video) {
    video.forEach(
      vid =>
        vid
          .appendChild(document.createElement('iframe')
          .setAttribute('src', `${window.location.protocol}://www.youtube.com/embed/${video.dataset[0]}/?wmode=transparent&autoplay=0&theme=dark&controls=1&autohide=0&loop=0&showinfo=0&rel=0&playlist=false&enablejsapi=0`))
    );
  }

  playVideo() {

  }
}