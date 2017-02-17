class Menu {

  constructor() {
    this.state =  false;
    this.el = document.querySelector('.Menu');

    // Attach handle menu event to menu.
    this.el.onclick = () => {
      this.state = !this.state;

      setTimeout(() => {
        switch (this.state) {
          case true:
            this.menuOpen();
            break;
          case false:
            this.menuClose();
            break;
        }
      }, 100);

    }
  }

  // Open menu.
  menuOpen() {
    this.el.className = 'Menu isOpen';
  }

  // Close menu.
  menuClose() {
    this.el.className = 'Menu';
  }
}

new Menu();

class Language {

  constructor() {
    // Store the current language. Default to true;
    this.currentLanguage = 'he';
    this.languageMenu = document.body.querySelector('.Language');

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
      }, 100);
    });
  }
}

new Language();
export default null;