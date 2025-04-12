document.querySelectorAll(".btn").forEach((button) => {
  button.addEventListener("click", () => {
    let number = parseInt(button.textContent);
    handleNumber(number);
  });
});

document.querySelectorAll(".operator").forEach((button) => {
  button.addEventListener("click", () => {
    let operator = button.textContent;
    handleOperator(operator);
  });
});

document.querySelector(".equal").addEventListener("click", handleEqual);
document.querySelector(".clear").addEventListener("click", handleClear);
document.querySelector(".decimal").addEventListener("click", handleDecimal);

let display = document.getElementById("display");

let firstNumber = null;
let secondNumber = null;
let currentOperator = null;
let resetScreen = false;
let lastCalculation = false;

function plus(a, b) {
  return a + b;
}

function minus(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  if (b !== 0) {
    return a / b;
  }
  return "Д1аваль цигар";
}

function persent(a, b) {
  return (a * b) / 100;
}

function operate(operator, num1, num2) {
  let result;
  switch (operator) {
    case "+":
      result = plus(num1, num2);
      break;
    case "-":
      result = minus(num1, num2);
      break;
    case "x":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
    case "%":
      result = persent(num1, num2);
      break;
  }
  return parseFloat(result.toFixed(8));
}

function updateDisplay(value) {
  display.value = value;
}

function handleNumber(number) {
  if (resetScreen || display.value === "0") {
    display.value = number.toString();
    resetScreen = false;
  } else {
    display.value += number.toString();
  }

  if (currentOperator === null) {
    firstNumber = parseFloat(display.value);
  } else {
    secondNumber = parseFloat(display.value);
  }
}

function handleOperator(operator) {
  if (lastCalculation) {
    firstNumber = parseFloat(display.value);
    lastCalculation = false;
  }

  if (currentOperator !== null && secondNumber !== null) {
    const result = operate(currentOperator, firstNumber, secondNumber);
    display.value = result.toString();
    firstNumber = result;
    secondNumber = null;
  } else if (firstNumber === null) {
    firstNumber = parseFloat(display.value);
  }

  currentOperator = operator;
  resetScreen = true;
}

function handleEqual() {
  if (currentOperator === null || (secondNumber === null && !resetScreen)) {
    return;
  }

  if (secondNumber === null && resetScreen) {
    secondNumber = firstNumber;
  }

  const result = operate(currentOperator, firstNumber, secondNumber);
  display.value = result.toString();
  firstNumber = result;
  currentOperator = null;
  resetScreen = true;
  lastCalculation = true;
}

function handleClear() {
  firstNumber = null;
  secondNumber = null;
  currentOperator = null;
  display.value = "0"; 
  resetScreen = false;
  lastCalculation = false;
}

function handleDecimal() {
  if (resetScreen) {
    display.value = "0.";
    resetScreen = false;
    return;
  }
  
  if (display.value.includes(".")) return;
  
  display.value += ".";
}