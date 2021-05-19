export function checkingForms(formClass) {

  // document.body.addEventListener('click', (e) => {
  //   console.log(e.target)
  // });

  const form = document.querySelector(`.${formClass}`);

  // Function for the data collection.
  function getData(form) {

    let data = {};
    const inputs = form.querySelectorAll('input');

    // Putting data into the object.
    for (const input of inputs) {

      switch (input.type) {

        case 'radio':
          if (input.checked) {
            data[input.name] = input.value;
          };
          break;

        case 'checkbox':
          if (!data[input.name]) {
            data[input.name] = [];
          };
          if (input.checked) {
            input.value = 'yes';
            data[input.name].push(input.value);
          } else {
            input.value = 'no';
            data[input.name].push(input.value);
          };
          break;

        case 'file':
          data[input.name] = input.files;
          break;

        default:
          data[input.name] = input.value;
      }

      data[input.name] = input.value;

    }

    // Textareas.
    const textareas = form.querySelectorAll('textarea');

    for (const textarea of textareas) {
      data[textarea.name] = textarea.value;
    }

    return data;

  };

  form.addEventListener('submit', (e) => {

    e.preventDefault();
    const data = getData(form);
    console.log(data);

  })

  form.addEventListener('submit', (e) => {

    e.preventDefault();


  })

  function setErrorMessage() {

    e.preventDefault();

  }

};
