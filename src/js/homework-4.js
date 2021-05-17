export {scrollTop, showModal}

function scrollTop(buttonClass, modifierName, heightIndicator = (document.body.clientHeight * 0.2)) {

  // Static variables.
  const modifier = modifierName;

  // Objects declaration.
  const svgObject = {
    class: `${buttonClass}__svg`,
    viewBox: '0 0 24 14',
  };

  const pathObject =  {
    class: `${buttonClass}__path`,
    d: 'M1.36146 10.5181C0.775672 11.1038 0.775672 12.0536 1.36146 12.6394C1.94725 13.2252 2.89699 13.2252 3.48278 12.6394L12.0011 4.12106L20.5194 12.6394C21.1052 13.2252 22.055 13.2252 22.6408 12.6394C23.2265 12.0536 23.2265 11.1039 22.6408 10.5181L13.1447 1.02198C13.1194 0.99251 13.0929 0.963786 13.065 0.935885C12.7701 0.641037 12.383 0.494599 11.9966 0.496565C11.6132 0.496899 11.2298 0.643344 10.9373 0.935903C10.9094 0.963724 10.8829 0.992364 10.8578 1.02175L1.36146 10.5181Z'
  };

  // Settings of the button's attributes.
  let button = document.createElement('button');
  button.classList.add(`${buttonClass}`);
  button.setAttribute('type', 'button');
  button.setAttribute('name', 'up');

  button.textContent = 'Вверх';

  // Rendering the svg path.
  button.innerHTML = `<svg class = "${svgObject['class']}">
                        <path class = "${pathObject['class']}" d = "${pathObject['d']}" />
                      </svg>`;

  document.body.appendChild(button);

  // Conditions for the button appearance.
  window.addEventListener('scroll', () => {

    if (window.pageYOffset > heightIndicator) {
      button.classList.add(`${buttonClass}${modifier}`);
      button.addEventListener('click', toTop);
    } else {
      button.classList.remove(`${buttonClass}${modifier}`);
      button.removeEventListener('click', toTop);
    }
  });

  // Dynamic function.
  function toTop(e) {
    window.scroll({
      top: 0,
      behavior: 'smooth'
    });
  }

}

function showModal(elementClass, modalClass, modalModifier, closeClass) {

  // Static variables.
  const mainButton = document.querySelector(`.${elementClass}`);
  const form = document.querySelector(`.${modalClass}`);
  const formModifier = document.querySelector(`.${modalModifier}`);
  const closeButton = document.querySelector(`.${closeClass}`);

  // Main function.
  mainButton.addEventListener('click', function(e) {

    form.style.top = `${window.pageYOffset}px`;
    form.classList.add(`${modalClass}${modalModifier}`);
    document.body.style.overflow = 'hidden';

    closeButton.addEventListener('click', hideModal);
    window.addEventListener('keydown', hideEscModal);

    // Close button event listener.
    function hideModal(e) {

      form.classList.remove(`${modalClass}${modalModifier}`);
      document.body.style.overflow = '';
      closeButton.removeEventListener('click', hideModal);

    }

    // Esc button event listener.
    function hideEscModal(e) {

      if (e.keyCode == 27 ) {

        form.classList.remove(`${modalClass}${modalModifier}`);
        document.body.style.overflow = '';
        closeButton.removeEventListener('click', hideModal);

      } else {
        return;
      }

    }

  })

}
