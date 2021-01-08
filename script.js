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
    operate(operatorString, numberOneString, numberTwoString);
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
    if (divisor === 0) {
        outputField.value = "Wait a minu... 💀"
        numberOneString = "";
        numberTwoString = "";
        operatorString = "";
        result = null;
        return;
    }
    return dividend / divisor;
}

function getRemainder(dividend, divisor) {
    return dividend % divisor;
}

// TODO: Implement root and factorial
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

function operate(opString, numOneString, numTwoString) {
    if (opString === "!" || opString === "√") {
        const numberOne = parseFloat(numOneString);

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

    const numberOne = parseFloat(numOneString);
    const numberTwo = parseFloat(numTwoString);

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
    if (numberOneString !== "" && numberTwoString !== "" && operatorString !== "") {
        operate(operatorString, numberOneString, numberTwoString);
    } else if (numberOneString !== "" && (operatorString === "!" || operatorString === "√")) {
        operate(operatorString, numberOneString, "");
    }

    if (numberOneString !== "") {
        operatorString = e.target.value;
    }
    displayCalculation();
}