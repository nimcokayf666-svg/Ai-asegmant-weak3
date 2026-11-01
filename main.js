let display = document.getElementById('display');
let currentInput = '0';
let shouldResetDisplay = false;

function updateDisplay() {
  display.innerText = currentInput;
}

function appendNumber(number) {
  if (currentInput === '0' || shouldResetDisplay) {
    currentInput = number;
    shouldResetDisplay = false;
  } else {
    // Prevent multiple decimals in the current operand
    const parts = currentInput.split(/[\+\-\×\÷]/);
    const lastPart = parts[parts.length - 1];
    if (number === '.' && lastPart.includes('.')) return;
    
    currentInput += number;
  }
  updateDisplay();
}

function appendOperator(operator) {
  const lastChar = currentInput.slice(-1);
  if (['+', '-', '×', '÷', '%'].includes(lastChar)) {
    currentInput = currentInput.slice(0, -1) + operator;
  } else {
    currentInput += operator;
  }
  shouldResetDisplay = false;
  updateDisplay();
}

function clearDisplay() {
  currentInput = '0';
  updateDisplay();
}

function deleteLast() {
  if (currentInput.length === 1 || shouldResetDisplay) {
    currentInput = '0';
    shouldResetDisplay = false;
  } else {
    currentInput = currentInput.slice(0, -1);
  }
  updateDisplay();
}

function calculate() {
  try {
    // Replace visual operators with standard JavaScript math operators
    let expression = currentInput
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/%/g, '/100');

    let result = eval(expression);

    // Round to avoid floating point precision issues (e.g., 0.1 + 0.2)
    if (!Number.isInteger(result)) {
      result = parseFloat(result.toFixed(8));
    }

    currentInput = result.toString();
    shouldResetDisplay = true;
  } catch (error) {
    currentInput = 'Error';
    shouldResetDisplay = true;
  }
  updateDisplay();
}