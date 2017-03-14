import Menu from './menu.js';
import Language from './language.js';


document.addEventListener('DOMContentLoaded', () => {

  // HTML fully parsed. Dom now safely editable.

  // Enable language support. Translate page.
  new Language().translate();

  // Initiate Menu.
  new Menu();

});

// Fire when window loads
window.onload = () => {

  // Page fully loaded.

};
