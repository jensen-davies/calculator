let prevNum = '';
let num = '';
let op = '';
let laterOp = false;
let toCalc = [];
const display = document.querySelector('#display');
const numpad = document.querySelector('#numpad');

function operate(operation,a,b){
  a = +a, b = +b;
  switch (operation) {
    case 'add':
      return prevNum = a+b;
      break;
    case 'subtract':
      return prevNum = a-b;
      break;
    case 'multiply':
      return prevNum = a*b;
      break;
    case 'divide':
      if (b === 0) {
        alert('Division by 0 error');
        return;
      } else {
        return prevNum = (a%b === 0) ? (a/b) : (a/b).toPrecision(3);
      }
      break;
    case 'exponent':
      return prevNum = a**b;
      break;
    case 'modulo':
      return prevNum = a%b;
  }
}

function updateDisplay(input) {
  display.textContent = input;
}

function clearDisplay() {
  display.textContent = '';
  num = '';
  prevNum = '';
  op = '';
  laterOp = false;
}

function getValue() {
  return display.textContent;
}

function appendDigit(digit) {
  if (num === '0') {
    num = digit;
  } else {
    num += digit;
  }
}

function operatorClicked(operator) {
  console.log(operator);
  prevNum = num;
  op = operator;
  num = '';
}

numpad.addEventListener('click', (event) => {
  let target = event.target;

  if (target.id === 'clear') {
    clearDisplay();
  }

  if (target.classList.contains('number')) {
    //appends selected value to num
    appendDigit(target.textContent);
    //adds selected value to display
    updateDisplay(num);
  }

  if (target.classList.contains('operation')) {
    if (!laterOp) {
      operatorClicked(target.classList[1]);
      laterOp = true;
    } else {
      operate(op,prevNum,num);
      updateDisplay(prevNum);
      op = target.classList[1];
      num = '';
    }
  }
    
  if (target.id === 'equals') {
    if (laterOp) {
      operate(op,prevNum,num);
      op = '';
    }
    updateDisplay(prevNum);
  }
});


