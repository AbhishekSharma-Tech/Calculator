class Claculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement
        this.currentOperandTextElement = currentOperandTextElement
        this.clear()        //call claer func as soon as page reload to clear all previous inputs
    }

    // to clear all the elements from display
    clear() {
        this.currentOperand = ''        //clear all the current operand
        this.previousOperand = ''       //clear all the previous operand
        this.operation = undefined      //set operation to undefined because no operation is selected at start 
    }

    // to delete element by element
    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1)       //every time dlt pressed current one convert to string and current value change by changing curr value from start to 2nd last number: (0, -1): select number from start to 2nd last
    }

    // to add elements in the screen after every key press
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return     //to add single period '.' in our input-number
        this.currentOperand = this.currentOperand.toString() + number.toString()        //convert to string so we can append our numbers & append numbers
    }

    // choose operation to be done according to the operation choosed by the user
    chooseOperation(operation) {
        if (this.currentOperand === '')
        return      //if we don't have 2nd operand: do not execute
        if (this.previousOperand !== '') {
            this.compute()      //if we have something computed in prev & have some num in current and click operation button then do prev operation & set the operation symbol in display to new one
        }
        this.operation = operation      //set the operation: to know what operation to perform
        this.previousOperand = this.currentOperand      //after chosing opeartion copy current operand value to previous one
        this.currentOperand = ''        //and clear out our current operand for entering 2nd number
    }

    // calculate the final value based on the number & operation selected
    compute() {
        let computation     //variable for result
        const prev = parseFloat(this.previousOperand)       //converting our input string to number for computation
        const current = parseFloat(this.currentOperand)
        if (isNaN(prev) || isNaN(current))      //if not a num in prev or in current cancel operation
        return
        //switch case for performing computation according to select operation key
        switch (this.operation) {
            case '+':
                computation = prev + current
                break
            case '-':
                computation = prev - current
                break
            case '*':
                computation = prev * current
                break
            case '÷':
                computation = prev / current
                break
            case '%':
                computation = (prev / current) * 100
                break
            default:
                return
        }
        this.currentOperand = computation       //set current operand to result
        this.operation = undefined      //none of the opeartion selected
        this.previousOperand = ''   //prev one become empty
    }


    // Update the values inside the display
    updateDisplay() {
        this.currentOperandTextElement.innerText = this.currentOperand
        if(this.operation != null) {        //if there is some operation selected then in prev operand display 1st num & the operand as well
            this.previousOperandTextElement.innerText = 
                `${this.previousOperand} ${this.operation}`
        }
        else {
            this.previousOperandTextElement.innerText = ''
        }
    }
}


//========== Variable Declaration ==========
const numberButtons = document.querySelectorAll('[data-number]')        // variable for number button that matches string
const operationButtons = document.querySelectorAll('[data-operation]')  // variable for operation button that matches string
const equalsButton = document.querySelector('[data-equals]')            // variable for equal button that matches string
const deleteButton = document.querySelector('[data-delete]')            // variable for delete button that matches string
const allClearButton = document.querySelector('[data-all-clear]')       // variable for clear-all button that matches string
const previousOperandTextElement = document.querySelector('[data-previous-operand]')    // variable for input text that matches string
const currentOperandTextElement = document.querySelector('[data-current-operand]')      // variable for input text button that matches string
// Previous Operand is 1st number & operation key
// Current Operand is 2nd number



// Create Object for class Calculator
const calculator = new Claculator(previousOperandTextElement, currentOperandTextElement)


numberButtons.forEach(button => {       //forEach: we want to loop over all the number buttons
    button.addEventListener('click', () => {        //on pressing the key
        calculator.appendNumber(button.innerText)       //add the number whatever inside that pressed key
        calculator.updateDisplay()      //also update the display on every click
    })
})


//Same stuff what we do for our number buttons
operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText)
        calculator.updateDisplay()
    })
})


//Equal button work
equalsButton.addEventListener('click', button => {
    calculator.compute()        //compute func to get ans 
    calculator.updateDisplay()
})


//All Clear button work
allClearButton.addEventListener('click', button => {
    calculator.clear()
    calculator.updateDisplay()
})


//Delete Button work
deleteButton.addEventListener('click', button => {
    calculator.delete()
    calculator.updateDisplay()
})