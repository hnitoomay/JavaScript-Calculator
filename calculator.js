
class Calculator {
    constructor(dataCalculation, dataResult) {
        this.dataCalculation = dataCalculation;
        this.dataResult = dataResult;
        this.initialState();  // Initialize the calculator state
        this.nameDisplayed = false;
    }

    toggleName() {
        if (this.nameDisplayed) {
            this.dataCalculation.innerHTML = '';  // Clear the div to hide the name
        } else {
            this.dataCalculation.innerHTML = '<i class="bi bi-suit-heart-fill"></i> Hnit Oo May <i class="bi bi-suit-heart-fill"></i>';  // Display the name
        }
        this.nameDisplayed = !this.nameDisplayed;  // Toggle the state
    }

    // Reset everything
    initialState() {
        this.calculationString = '';  
        this.result = ''; 
    }

    // Add the clicked number/operator to the current input
    appendToCalculation(value) {
        
        this.calculationString += value.toString();  // Append numbers and operators to the string
       
    }

    // Perform the calculation when "=" is clicked
     calculateExpression(expression) {
        try {
            // Replace division symbol and evaluate using safer methods
            let sanitizedExpression = expression.replace(/÷/g, '/');
            // Use a custom parser or safe evaluation method
            let resulto = new Function('return ' + sanitizedExpression)();
            this.result = isFinite(resulto) ? resulto : 'Error';  // Check for Infinity
        } catch (e) {
            this.result = 'Error';
        }
        
    }


    //Update the display for both calculation and result
    updateDisplay() {
        this.dataCalculation.innerText = this.calculationString || '0';  // Show the calculation sequence or 0 if empty
        this.dataResult.innerText = this.result;  // Show the final result
    }

  
    deleteLast() {
        
        this.calculationString = this.calculationString.slice(0, -1);
        this.updateDisplay();  // Update the display after deleting
    }
}

let clickMeBtn = document.querySelector('.clickMe');
let dataNumber = document.querySelectorAll('[data-number]');
let dataOperator = document.querySelectorAll('[data-operator]');
let dataAllClear = document.querySelector('[dataClear]');
let dataDelete = document.querySelector('[dataDelete]');
let dataEqual = document.querySelector('[data-equals]');
let dataCalculation = document.querySelector('[data-calculation]');
let dataResult = document.querySelector('[data-result]');

let calculator = new Calculator(dataCalculation, dataResult); //(instance of class)


clickMeBtn.addEventListener('click', function() {
        calculator.toggleName();
    })

// Handle number buttons
dataNumber.forEach(button => {
    button.addEventListener('click', function() {
        calculator.appendToCalculation(button.innerText);  // Add the clicked number
        calculator.updateDisplay();  // Update the display
    });
});

// Handle operator buttons
dataOperator.forEach(button => {
    button.addEventListener('click', function() {
        calculator.appendToCalculation(button.innerText);  // Add the clicked operator
        calculator.updateDisplay();  
    });
});

// Handle the equal button
dataEqual.addEventListener('click', function() {
    calculator.calculateExpression(calculator.calculationString);  // Perform the calculation
    calculator.updateDisplay();  
});

// Handle the "AC" (clear) button
dataAllClear.addEventListener('click', function() {
    calculator.initialState();  // Clear everything
    calculator.updateDisplay();  // Reset the display
});

dataDelete.addEventListener('click', function() {
    calculator.deleteLast();  // Call the deleteLast method when the delete button is clicked
});
//    button.innerText = '1'.
//    calculator.appendNumber('1') is called.
//    Inside appendNumber(), number = '1', and this.firstOutput becomes '1'.
