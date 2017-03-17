export default class Youtube {


  /**
   * Get videos, attach listeners and generate images.
   */
  constructor() {

    // Get videos array.
    this.videos =
      Array
        .from(document.querySelectorAll('.Youtube'))
        .filter(video => video.dataset.videoId);

    // Attaches an event listener to the DOM root.
    this.attachListener();

    // Generate img thumbs.
    this.generateImages();


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
  }

  /**
   * Generate thumbnails for un-played videos.
   */
  generateImages() {
    this.videos.forEach(video => {
      const img = new Image();

      // Append image when it finished loading.
      img.addEventListener('load', () => video.appendChild(img));
      img.src = `${this.protocol}://img.youtube.com/vi/${video.dataset.videoId}/sddefault.jpg`
    })
  }


  /**
   * Attaches a listener to the DOM root that fires the load video on videos that have been clicked.
   */
  attachListener() {
    document.addEventListener('click', e => this.loadVideo(this.videos.filter(vid => e.target === vid)));
  }

  /**
   * Load the video iframe with all the necessary options.
   * @param {Element} video - HTML element of that the iframe will be embedded in.
   */
  loadVideo(video) {
    video.forEach(
      vid => {
        const
          iframe   = document.createElement('iframe'),
          videoId  = iframe.dataset.videoId;

        // Set video source.
        iframe.setAttribute('src', `${this.protocol}://${this.domain}/${videoId}?${this.params.join('&')}`);

        // Set height and width.
        ['height', 'width'].forEach( att => iframe.setAttribute( att, '100%'));

        // Allow full screen.
        iframe.setAttribute('allowfullscreen', '');

        // No frame border.
        iframe.setAttribute('frameborder', '0');

        vid
        // Append iframe to html element.
          .appendChild(iframe);
      });
  }
}