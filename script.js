// Variables

let operatorString = "";
let numberOneString = "";
let numberTwoString = "";

let result = null;


// DOM Manipulation

const outputField = document.querySelector("#outputField");

document.querySelectorAll(".number").forEach(element => {
    element.addEventListener("click", inputNumber);
});

document.querySelectorAll(".operator").forEach(element => {
    element.addEventListener("click", inputOperatorString);
});

document.getElementById("equals").addEventListener("click", (e) => {
    const numberOne = parseFloat(numberOneString);
    const numberTwo = parseFloat(numberTwoString);
    operate(operatorString, numberOne, numberTwo);
});

document.getElementById("reset").addEventListener("click", reset);

document.getElementById("period").addEventListener("click", addPeriod);

function reset() {
    outputField.value = "";
    numberOneString = "";
    numberTwoString = "";
    operatorString = "";
    result = null;
}

function addPeriod() {
    if (numberOneString !== "" && numberTwoString === "" && operatorString === "") {
        if (numberOneString.match(/[.]/)) return;
        numberOneString += ".";
        displayCalculation();
    } else if (numberOneString !== "" && numberTwoString !== "" && operatorString !== "") {
        if (numberTwoString.match(/[.]/)) return;
        numberTwoString += ".";
        displayCalculation();
    }
}

function displayCalculation() {
    if (operatorString === "!") {
        outputField.value = `${numberOneString}${operatorString}`;
    } else if (operatorString === "√") {
        outputField.value = `${operatorString}${numberOneString}`;
    } else {
        outputField.value = `${numberOneString} ${operatorString} ${numberTwoString}`;
    }
}

function displayResult() {
    outputField.value = `${result}`;
}


// Calculation Logic

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
    if (!checkDivisorValidity(divisor)) return;
    return dividend / divisor;
}

function getRemainder(dividend, divisor) {
    if (!checkDivisorValidity(divisor)) return;
    return dividend % divisor;
}

function checkDivisorValidity(divisor) {
    if (divisor === 0) {
        outputField.value = "Wait a minu... 💀"
        numberOneString = "";
        numberTwoString = "";
        operatorString = "";
        result = null;
        return false;
    }
    return true;
}

function takeRoot(radicand) {
    return Math.sqrt(radicand);
}

function factorial(number) {
    if (number <= 1) {
        return 1;
    }

    let factorial = 1;
    for (let i = 2; i <= number; i++) {
        factorial *= i;
    }
    return factorial;
}

function operate(opString, numberOne, numberTwo) {
    if (opString === "!" || opString === "√") {

        if (opString === "!") {
            result = factorial(numberOne);
        } else if (opString === "√") {
            result = takeRoot(numberOne);
        }

        displayResult();

        numberOneString = result;
        numberTwoString = "";
        operatorString = "";

        console.log(`Operator reset, current value: ${operatorString}`);

        return;
    }

    if (numberOneString === "" || numberTwoString === "" || opString === "") return;

    let calculationResult;

    switch (opString) {
        case "+":
            calculationResult = add(numberOne, numberTwo);
            break;
        case "-":
            calculationResult = subtract(numberOne, numberTwo);
            break;
        case "x":
            calculationResult = multiply(numberOne, numberTwo);
            break;
        case "÷":
            calculationResult = divide(numberOne, numberTwo);
            if (numberTwo === 0) return;
            break;
        case "%":
            calculationResult = getRemainder(numberOne, numberTwo);
            if (numberTwo === 0) return;
            break;
        default:
            return `Unknown operator: ${opString}`;
    }

    result = calculationResult;

    displayResult();

    numberOneString = result;
    numberTwoString = "";
    operatorString = "";

    console.log(`Operator reset, current value: ${operatorString}`);
}

function inputNumber(e) {
    console.log();
    if (operatorString === "") {
        numberOneString += e.target.value;
    } else if (numberOneString !== "" && operatorString !== "") {
        numberTwoString += e.target.value;
    }
    displayCalculation();
}

function inputOperatorString(e) {
    // The calculation should be executed when all parts necessary for calculation are available
    if (numberOneString !== "" && numberTwoString !== "" && operatorString !== "") {
        // two numbers and the operator
        const numberOne = parseFloat(numberOneString);
        const numberTwo = parseFloat(numberTwoString);
        operate(operatorString, numberOne, numberTwo);
    } else if (numberOneString !== "" && (operatorString === "!" || operatorString === "√")) {
        // only one number, but the operator is either a factorial or square root
        const numberOne = parseFloat(numberOneString);
        operate(operatorString, numberOne, null);
    }

    if (numberOneString !== "") {
        operatorString = e.target.value;
    }
    displayCalculation();
}