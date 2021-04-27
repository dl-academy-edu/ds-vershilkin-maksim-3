export function numbers(max) {

  // Homework task №1.

  // let n = prompt(`Задача №1. Введите любое число от 1 до ${max}.`);
  //
  // while (isNaN(n) || (n > max)) {
  //   alert("Вы ввели некорректные данные!");
  //   n = prompt(`Введите, пожалуйста, число от 1 до ${max}.`);
  // }
  //
  // console.log("Homework task №1.");
  // for (let i = 1; i < n; i++) {
  //   (i % 4) ? console.log(i) : "";
  // }

  // Homework task №2.

  let f = prompt(`Задача №2. Введите любое целое число.`);

  while (isNaN(f) || (f % 1) ) {
    alert("Вы ввели некорректные данные!");
    f = prompt(`Введите, пожалуйста, любое целое число.`);
  }

  let factorial = 1;

  while(f > 1) {
    factorial *= f;
    f--;
  }

  alert(`Факториалом данного числа является: ${factorial}.`);

  // Homework task №3.

}
