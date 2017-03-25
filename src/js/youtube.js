import Utils from './utils';

export default class Youtube {


  /**
   * Get videos, attach listeners and generate images.
   */
  constructor() {

    // Connection protocol. HTTP: | HTTPS:
    this.protocol = window.location.protocol;
    this.domain   = 'www.youtube.com/embed';
    this.params   = [
      'wmode=transparent',
      'autoplay=1',
      'theme=dark',
      'controls=1',
      'autohide=0',
      'loop=0',
      'showinfo=0',
      'rel=0',
      'playlist=false',
      'enablejsapi=0'
    ];

    // Get videos array.
    this.videos =
      Array
        .from(document.querySelectorAll('.Youtube'))
        .filter(video => video.dataset.videoId);

    // Attaches an event listener to the DOM root.
    this.attachListener();

    // Generate img thumbs.
    this.generateImages();
  }

  /**
   * Generate thumbnails for un-played videos.
   *
   * Attach the video thumbnail as background image.
   */
  generateImages() {
    this.videos.forEach(video => video.style.background = `url(${this.protocol}//img.youtube.com/vi/${video.dataset.videoId}/sddefault.jpg) center/cover no-repeat`)
  }


  /**
   * Attaches a listener to the DOM root that fires the loadVideo() function on videos that have been clicked.
   */
  attachListener() {
    document.addEventListener('click', e => this.loadVideo(this.videos.filter(vid => e.target === vid)));
  }

  /**
   * Load the video iframe with all the necessary options.
   * @param {Element[]} videos - HTML element of that the iframe will be embedded in.
   */
  loadVideo(videos) {
    videos.forEach(
      vid =>
        vid

        // Append iframe to html element.
          .appendChild(
            Utils.htmlSetAttibutes(document.createElement('iframe'), {
              src: `${this.protocol}//${this.domain}/${vid.dataset.videoId}?${this.params.join('&')}`,
              height: '100%',
              width: '100%',
              allowfullscreen: '',
              frameborder: '0',
            })
          )
          .parentNode
          .classList.add('embedded')
      );
  }
}