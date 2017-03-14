import Menu from './menu.js';
import Language from './language.js';


// HTML fully parsed. Dom now safely editable.
document.addEventListener('DOMContentLoaded', () => {

  // Enable language support. Translate page.
  new Language().translate();

  // Initiate Menu.
  new Menu();

});

// Fire when window loads. Page fully loaded.
window.onload = () => {

};
