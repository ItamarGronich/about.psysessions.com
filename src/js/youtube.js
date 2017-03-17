export default class Youtube {

  constructor() {

    // Get videos array.
    this.videos =
      Array
        .from(document.querySelectorAll('.Youtube'))
        .filter(video => video.dataset.videoId);

    this.attachListener();
    this.generateImages();
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
  }

  loadVideo(video) {
    video.forEach(
      vid => {
        const
          iframe   = document.createElement('iframe'),
          videoId  = iframe.dataset.videoId,
          protocol = window.location.protocol,
          domain   = 'www.youtube.com/embed',
          params   = [
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

        // Set video source.
        iframe.setAttribute('src', `${protocol}://${domain}/${videoId}?${params.join('&')}`);

        // Set height and width.
        ['height', 'width'].forEach( att => iframe.setAttribute( att, '100%'));

        // Allow full screen.
        iframe.setAttribute('allowfullscreen', '');

        // No frame border.
        iframe.setAttribute('frameborder', '0');

        vid
          .appendChild(iframe);
      });
  }
}