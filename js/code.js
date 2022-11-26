// Getting Current/Previous operand from D0M
const previousOperand = document.querySelector('[data-previous-operand]');
const currentOperand = document.querySelector('[data-current-operand]');
// Getting the Buttons from the DOM
const allClearButton = document.querySelector('[data-all-clear]');
const deleteButton = document.querySelector('[data-delete]');
const operationButtons = document.querySelectorAll('[data-operation]');
const numberButtons = document.querySelectorAll('[data-number]');
const decimalButton = document.querySelector('[data-decimal]');
const equalsButton = document.querySelector('[data-equals]');
// Creating Calculation memory variable, which will have the value of the previous calculation by default
let Memory = previousOperand.textContent;
let decimalAllowed = true

// Clearing 2 Displays and the memory when 'AC' button clicked
allClearButton.addEventListener('click', () => {
  previousOperand.textContent = ''
  currentOperand.textContent = ''
 Memory = ''
  decimalAllowed = true
})
//For each number/operation button, add an event listener, so that when clicked, it adds its symbol/number to the memory string, and updates 'current' display
numberButtons.forEach((button) => {
  button.addEventListener('click', () => {
    Memory += `${button.textContent}`
    displayCurrent()
  })
})
decimalButton.addEventListener('click', () => {
  if (decimalAllowed ) {
    Memory += `${decimal.textContent}`
    displayCurrent()
    decimalAllowed = false
  }
})
// Removes last character from memory string then updating the display when clicking 'Delete'
deleteButton.addEventListener('click', () => {
  if (Memory[Memory.length-1] == '.') {
    decimalAllowed = true
  }
 Memory = Memory.slice(0, -1)
  displayCurrent()
})

operationButtons.forEach((button) => {
  button.addEventListener('click', () => {
    Memory += `${button.textContent}`
    displayCurrent()
    decimalAllowed = true
  })
})


equalsButton.addEventListener('click', () => {
  // Replace all Special Characters in memory string, with characters that JS can calculate with.
  let expression = Memory.replaceAll('%', '**(1/2)').replaceAll('^', '**').replaceAll('×', '*').replaceAll('÷', '/').replaceAll('x', '')
  // Evaluating the expression from the memory
 try{
   let result = eval(expression) 
   // Setting previous operation on the display to the current operand
   previousOperand.textContent = currentOperand.textContent
   // Changing current Operand on display to the result of the calculation, and saving it to the memory
   currentOperand.textContent = result
  Memory =  result.toString()
   if (currentOperand.textContent.includes('.')) {
     decimalAllowed = false
   } else decimalAllowed = true

 } catch(e) {
    console.log(e);
    previousOperand.textContent = currentOperand.textContent
    currentOperand.textContent = 'Invalid Input'
 }
})
//Updates Current Operand Display
function displayCurrent() {
  currentOperand.textContent = Memory.replaceAll('××', '^').replaceAll('x', '')
}
