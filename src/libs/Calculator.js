import OperationsEnum from "../constants/OperationsEnum";
import {
  add,
  subtract,
  multiply,
  divide,
  percentage,
  changeSign,
} from "./mathOperations";
import { isDigit, isOperation, containDecimalPoint, removeZero } from "./utils";

class CalculateCore {
  number = "";
  previousInput = null;
  previousNumber = null;
  previousOperation = null;
  repeatNumber = null;
  repeatOperation = null;
  clearable = false;

  /**
   *
   * @param {string} input
   */
  calculate(input) {
    if (isDigit(input)) {
      return this.handleDigitInput(input);
    }

    if (isOperation(input)) {
      return this.handleOperationInput(input);
    }

    return "Error";
  }

  /**
   * Handle and process all digit inputs including
   * @param {string|number} input
   */
  handleDigitInput(input) {
    this.clearable = true;

    if (isOperation(this.previousInput)) {
      this.number = "";
    }

    if (input === "." && containDecimalPoint(this.number)) {
      return this.number;
    }

    if (input === "." && this.number === "") {
      this.number = "0.";
      return this.number;
    }

    this.number += input;
    this.previousInput = input;

    return removeZero(this.number);
  }

  updatePreviousStatus(number, input) {
    this.previousNumber = number;
    this.previousInput = input;
    this.previousOperation = input;
  }

  /**
   * Handle all operation other than digit inputs.
   * @param {string} input
   */
  handleOperationInput(input) {
    if (
      [
        OperationsEnum.addition,
        OperationsEnum.subtraction,
        OperationsEnum.multiplication,
        OperationsEnum.division,
      ].includes(input)
    ) {
      return this.handleBasicMathOperation(input);
    }

    if (input === OperationsEnum.percentage) {
      return this.handlePercentageOperation();
    }

    if (input === OperationsEnum.sign) {
      return this.handleSignOperation();
    }

    if (input === OperationsEnum.allClear) {
      return this.handleAllClearOperation();
    }

    if (input === OperationsEnum.clear) {
      return this.handleClearOperation();
    }

    if (input === OperationsEnum.equal) {
      return this.handleEqualOperation(input);
    }
  }

  /**
   * Only handle basic +, -, /, x operations
   * @param {string} input
   */
  handleBasicMathOperation(input) {
    this.repeatNumber = null;
    this.repeatOperation = null;

    if (this.previousNumber == null) {
      this.updatePreviousStatus(this.number, input);
      return this.number;
    }

    const temp = this.previousInput;
    this.previousInput = input;

    if (
      temp === this.previousInput &&
      this.previousOperation === OperationsEnum.equal &&
      temp === "="
    ) {
      this.updatePreviousStatus(this.number, input);
      return this.number;
    }

    this.number = this.handlerArithmeticOperations(
      this.previousOperation,
      this.previousNumber,
      this.number
    );

    this.updatePreviousStatus(this.number, input);

    return this.number;
  }

  handlerArithmeticOperations(operation, numberA, numberB) {
    let result = "Error";
    if (operation === OperationsEnum.addition) {
      result = add(numberA, numberB);
    }

    if (operation === OperationsEnum.subtraction) {
      result = subtract(numberA, numberB);
    }

    if (operation === OperationsEnum.multiplication) {
      result = multiply(numberA, numberB);
    }

    if (operation === OperationsEnum.division) {
      result = divide(numberA, numberB);
    }
    return result;
  }

  handlePercentageOperation() {
    if (this.number === "") {
      this.number = "0";
    }

    this.number = percentage(this.number);

    return this.number;
  }

  handleSignOperation() {
    if (this.number === "") {
      this.number = "0";
    }
    this.number = changeSign(this.number);
    return this.number;
  }

  handleAllClearOperation() {
    return this.allClear();
  }

  handleClearOperation() {
    return this.clear();
  }

  /**
   * Paramter operation is one of add, subtract, multiply or divide
   * @param {Function} operation Arithmetic operator
   */
  perform(operation) {
    if (this.repeatNumber !== null) {
      this.number = operation(this.number, this.repeatNumber);
    } else {
      this.repeatNumber = this.number;
      this.number = operation(this.previousNumber, this.number);
    }
  }

  handleEqualOperation(input) {
    if (this.previousNumber == null) {
      this.updatePreviousStatus(this.number, input);

      return this.number;
    }
    this.previousInput = input;
    let temp = this.number;

    if (
      this.previousOperation !== OperationsEnum.equal &&
      input === OperationsEnum.equal
    ) {
      if (this.previousOperation === OperationsEnum.addition) {
        this.perform(add);
      }
      if (this.previousOperation === OperationsEnum.subtraction) {
        this.perform(subtract);
      }
      if (this.previousOperation === OperationsEnum.multiplication) {
        this.perform(multiply);
      }
      if (this.previousOperation === OperationsEnum.division) {
        this.perform(divide);
      }

      this.repeatNumber = temp;
      this.repeatOperation = this.previousOperation;
      this.previousInput = input;
      this.previousOperation = input;

      return this.number;
    }

    this.number = this.handlerArithmeticOperations(
      this.previousOperation,
      this.number,
      this.repeatNumber
    );

    this.updatePreviousStatus(temp, input);

    return this.number;
  }

  clear() {
    this.previousInput = null;
    this.previousNumber = null;
    this.previousOperation = null;
    this.repeatNumber = null;
    this.repeatOperation = null;
    this.clearable = false;

    return this.number;
  }

  allClear() {
    this.number = "";
    this.previousInput = null;
    this.previousNumber = null;
    this.previousOperation = null;
    this.repeatNumber = null;
    this.repeatOperation = null;
    this.clearable = false;

    return "0";
  }
}

export default CalculateCore;
