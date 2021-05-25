import {numbers} from "./homework-1.js";
import {functions} from "./homework-2.js";
import {objects} from "./homework-3.js";
import {scrollTop as buttonUp, showModal as modalWindow} from "./homework-4.js";
import {checkingForms} from "./homework-5.js";

document.addEventListener("DOMContentLoaded", () => {

  // Function of the button to top.
  buttonUp('button-up', '--visible', 1500);

  // Functions for the modal windows.
  modalWindow('header__sign', 'intake', '--active', 'intake__close');
  modalWindow('header__registration', 'registration', '--active', 'registration__close');
  modalWindow('footer__button', 'message', '--active', 'message__close');

  // Function for the forms checking.
  checkingForms('registration');

})
