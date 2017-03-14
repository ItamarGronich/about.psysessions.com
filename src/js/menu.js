export default class Menu {

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
