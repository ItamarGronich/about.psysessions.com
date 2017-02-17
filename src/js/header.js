class Header {

  constructor() {
    this.Menu = {
      state: false,
      el: document.querySelector('.Menu')
    };

    console.log(this.Menu.el);
    

    // Attach handle menu event to menu.
    this.Menu.el.onclick = () => {
      this.Menu.state = !this.Menu.state;

      switch (this.Menu.state) {
        case true:
          this.menuOpen();
          break;
        case false:
          this.menuClose();
          break;
      }
    }
  }

  menuOpen() {
    this.Menu.el.className = 'Menu isOpen';
  }

  menuClose() {
    this.Menu.el.className = 'Menu';
  }
}

const header = new Header();

export default null;