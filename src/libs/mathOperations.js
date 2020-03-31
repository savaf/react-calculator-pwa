export const add = (numberA, numberB) =>
  (parseFloat(numberA) + parseFloat(numberB)).toString();

export const subtract = (numberA, numberB) =>
  (parseFloat(numberA) - parseFloat(numberB)).toString();

export const multiply = (numberA, numberB) =>
  (parseFloat(numberA) * parseFloat(numberB)).toString();

export const divide = (numberA, numberB) =>
  (parseFloat(numberA) / parseFloat(numberB)).toString();

export const percentage = (number) => (parseFloat(number) / 100).toString();

export const changeSign = (number) => {
  return parseFloat(number) === 0 ? "0" : (parseFloat(number) * -1).toString();
};
