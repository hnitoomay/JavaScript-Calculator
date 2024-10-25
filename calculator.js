// class Calculator {
//     constructor(dataCalculation, dataResult) {
//         this.dataCalculation = dataCalculation;
//         this.dataResult = dataResult;
//         this.initialState();  // Initialize the calculator state
//     }

//     // Reset everything
//     initialState() {
//         this.firstOutput = '';   // For the current number input
//         this.secondOutput = '';  // For the stored number (after operator is pressed)
//         this.operation = undefined;  // Current operation (like +, -, *, ÷)
//         this.result = '';  // Final result to be displayed
//     }

//     // Add the clicked number to the current input
//     appendNumber(number) {
//         if (number === '.' && this.firstOutput.includes('.')) return; // Prevent multiple dots
//         this.firstOutput = this.firstOutput.toString() + number.toString(); // Append number to firstOutput
//     }

//     // Handle when an operator is clicked
//     chooseOperation(operation) {
//         if (this.firstOutput === '') return;  // Don't allow operators if there's no input
//         if (this.secondOutput !== '') {
//             this.calculating();  // Calculate if there's already a secondOutput (means a previous number is stored)
//         }
//         this.operation = operation;  // Store the chosen operator
//         this.secondOutput = this.firstOutput;  // Move firstOutput to secondOutput for the next step
//         this.firstOutput = '';  // Clear firstOutput to allow entering a new number
//     }

//     // Perform the calculation
//     calculating() {
//         let result;
//         const first = parseFloat(this.secondOutput);
//         const second = parseFloat(this.firstOutput);
//         if (isNaN(first) || isNaN(second)) return;  // Ensure both numbers are valid

//         // Perform the calculation based on the operation
//         switch (this.operation) {
//             case '+':
//                 result = first + second;
//                 break;
//             case '-':
//                 result = first - second;
//                 break;
//             case '*':
//                 result = first * second;
//                 break;
//             case '÷':
//                 result = first / second;
//                 break;
//             default:
//                 return;
//         }

//         this.firstOutput = result.toString();  // Store the result in firstOutput
//         this.operation = undefined;  // Clear the operation
//         this.secondOutput = '';  // Clear the secondOutput
//         this.result = result;  // Store the result for display
//     }

//     // Update the display for both calculation and result
//     updateDisplay() {
//         this.dataCalculation.innerText = this.firstOutput || '0';  // Show the current input or 0 if empty
//         this.dataResult.innerText = this.result;  // Show the final result
//     }
// }
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
        this.calculationString = '';  // Store the full sequence of numbers and operators
        this.result = '';  // Final result to be displayed
    }

    // Add the clicked number/operator to the current input
    appendToCalculation(value) {
        //if (value === '.' && this.calculationString.includes('.')) return;
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
    // Perform the calculation when "=" is clicked
// calculateResult() {
//     // Calculate and assign the result to the class property `this.result`
//     this.result = this.calculateExpression(this.calculationString);  // Assign the returned value to `this.result`

// }


    //Update the display for both calculation and result
    updateDisplay() {
        this.dataCalculation.innerText = this.calculationString || '0';  // Show the calculation sequence or 0 if empty
        this.dataResult.innerText = this.result;  // Show the final result
    }

    // Delete the last character (either a number or operator)
    deleteLast() {
        // Remove the last character from the calculation string
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
        calculator.appendToCalculation(button.innerText);  
        calculator.updateDisplay();  
    });
});

// Handle operator buttons
dataOperator.forEach(button => {
    button.addEventListener('click', function() {
        calculator.appendToCalculation(button.innerText);  
        calculator.updateDisplay();  
    });
});

// Handle the equal button
dataEqual.addEventListener('click', function() {
    calculator.calculateExpression(calculator.calculationString);  // Perform the calculation
    calculator.updateDisplay();  // Update the display with the result
});

// Handle the "AC" (clear) button
dataAllClear.addEventListener('click', function() {
    calculator.initialState();  // Clear everything
    calculator.updateDisplay();  // Reset the display
});

dataDelete.addEventListener('click', function() {
    calculator.deleteLast();  
});
//    button.innerText = '1'.
//    calculator.appendNumber('1') is called.
//    Inside appendNumber(), number = '1', and this.firstOutput becomes '1'.