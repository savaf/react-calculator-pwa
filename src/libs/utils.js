import OperationsEnum from "../constants/OperationsEnum";

export const isDigit = (input) => !isNaN(input) || input === ".";

export const isOperation = (input) =>
  Object.values(OperationsEnum).includes(input);

export const containDecimalPoint = (number) => String(number).includes(".");

export const removeZero = (number) => {
  if (number.length > 1 && number[0] === "0" && number[1] !== ".") {
    return removeZero(number.substr(1, number.length));
  }
  return number;
};
