function add(addendOne, addendTwo) {
    return addendOne + addendTwo;
}

function subtract(minuend, subtrahend) {
    return minuend - subtrahend;
}

function multiply(factorOne, factorTwo) {
    return factorOne * factorTwo;
}

function divide(dividend, divisor) {
    return dividend / divisor;
}

function operate(operator, numberOne, numberTwo) {
    switch (operator) {
        case "+":
            return add(numberOne, numberTwo);
            break;
        case "-":
            return subtract(numberOne, numberTwo);
            break;
        case "*":
            return multiply(numberOne, numberTwo);
            break;
        case "/":
            return divide(numberOne, numberTwo);
            break;
        default:
            return `Unknown operator: ${operator}`;

    }
}