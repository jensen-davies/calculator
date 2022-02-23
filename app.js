const buttons = document.querySelectorAll('.number, .operation');
const numbers = document.querySelectorAll('.number');
const display = document.querySelector('#display');
const clearButton = document.querySelector('#clear');
const equals = document.querySelector('#equals');
const operators = document.querySelectorAll('.operation');

let num1 = '';
let num2 = '';
let nums = [];
let op = '';
let opDisplay = '';
let calc;
let expression = '';

function operate(operation,a,b){
  switch (operation) {
    case 'add':
      return a+b;
      break;
    case 'subtract':
      return a-b;
      break;
    case 'multiply':
      return a*b;
      break;
    case 'divide':
      return (b === 0) ? alert('Division by 0 error, stahp') : (a/b).toPrecision(3)
      break;
    case 'exponent':
      return a**b;
      break;
    case 'modulo':
      return a%b;
  }
}

clearButton.addEventListener('click', () => {
  display.textContent = '';
  expression = '';
  num1 = 0;
  num2 = 0;
  op = '';
  nums = [];
});

operators.forEach(operator => operator.addEventListener('click', () => {
  if (parseExpression(expression).length == 2) {
    eval();
    expression += ` ${operator.classList[1]} `
    op = operator.classList[1];
    console.log(nums);
    console.log(expression);
    return;
  }
  op = operator.classList[1];
  expression += ` ${op} `;
  console.log(nums);
  console.log(`${expression}`);
  display.textContent ='';
}));

numbers.forEach(number => number.addEventListener('click', () => {
  display.textContent += number.textContent;
  expression += number.textContent;
  console.log(expression);
}));

equals.addEventListener('click', eval);

function eval() {
  nums = parseExpression(expression);
  num1 = nums[0];
  num2 = nums[1];
  nums = []
  nums[0] = operate(op,num1,num2);
  expression = `${nums[0]}`;
  return display.textContent = nums[0];
};

function isNumber(op) {
  const opList = ['multiply','add','subtract','divide','modulo','exponent'];
  return !opList.includes(op)
}

function parseExpression(ex) {
  nums = ex.split(' ');
  nums = nums.filter(isNumber).map(elt => +elt);
  return nums 
}
