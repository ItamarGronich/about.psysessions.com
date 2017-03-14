import locale from './locale.js';


export default class Language {

  constructor() {
    // Store the current language. Default to true;
    this.currentLanguage = 'he';
    this.languageMenu = document.body.querySelector('.Language');

    this.assignClass();

    this.languageMenu.addEventListener('change', e => {
      setTimeout(() => {

        switch (e.target.value.toLowerCase()) {
          case 'en':
            this.currentLanguage = 'en';
            break;
          case 'עבר':
            this.currentLanguage = 'he';
            break;
        }

        this.translate();
        this.assignClass();
      }, 100);
    });
  }

  translate() {
    this
      .getAllTranslateables()
      .forEach(e => e.textContent = this.getTranslation(e.dataset.t)[this.currentLanguage]);
  }

  assignClass() {
    let body = document.querySelector('body');
    switch (this.currentLanguage) {
      case 'en':
        body.className = '';
        break;
      case 'he':
        body.className = 'Rtl';
        break;
    }
  }

  getTranslation(namespace) {
    return namespace
      .split('.')
      .reduce((locale, namespace) => locale[namespace], locale)
  }

  getAllTranslateables() {
    return document
      .body
      .querySelectorAll('[data-t]');
  }
}
