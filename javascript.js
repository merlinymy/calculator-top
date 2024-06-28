// TODO: next step is to realize func-1 buttons

// BUGS: after the result returned by "equals"
// clicking "." won't register "0."


let a = "0";
let b;
let opt;
let optArr = [];
let hasPrevRes = false;
let previousB;
let previousOpt;
let decimalCount = 0;
let enteringNum;
let displayedValue = 0;
let inputingA = true;
let inputingB = false;
let optHolderForClearBtn;
let isANeg = false; //default is positive
let isBNeg = false;
let isEqualBtnPressed = false;

let displaySpan = document.querySelector(".display span");
let numNodeArr = document.querySelectorAll(".num");
let func2NodeArr = document.querySelectorAll(".func-2");
let equalsBtn = document.querySelector(".equals");
let clearBtn = document.querySelector(".clear");
let backBtn = document.querySelector(".delete");
let percentBtn = document.querySelector(".percent");
let posNegBtn = document.querySelector(".pos-neg");

let numArr = [...numNodeArr];
let func2Arr = [...func2NodeArr];

posNegBtn.addEventListener("click", () => {

    if (inputingA) {
        isANeg = !isANeg;
        a = (a * -1).toString();
        if (a === "0" || isEqualBtnPressed) {
            displayValue("-0");
        } else {
            displayValue(a);
        }
    } else if (inputingB) {
        isBNeg = !isBNeg;
        b = ((b || 0) * -1).toString();
        if (b === "0" || b === undefined || b === null) {
            displayValue("-0");
        } else {
            displayValue(b);
        }
    }

    isEqualBtnPressed = false;
});

percentBtn.addEventListener("click", () => {
    isEqualBtnPressed = false;
    if (inputingA) {
        a = (a / 100).toString();
        displayValue(a);
    } else if (inputingB) {
        b = (b / 100).toString();
        displayValue(b); 
    }
});

backBtn.addEventListener("click", () => {
    isEqualBtnPressed = false;
    if (inputingA) {
        if (a.length === 1 || (a.length === 2 && a.at(0) === '-')) {
            a = "0";
        } else {
            a = a.slice(0, a.length - 1);
        }
        displayValue(a);
    } else if (inputingB) {
        if (b.length === 1 || (a.length === 2 && a.at(0) === '-')) {
            b = "0";
            updateColor(optHolderForClearBtn);
        } else {
            b = b.slice(0, b.length - 1);
        }
        displayValue(b); 
    }
});

clearBtn.addEventListener("click", () => {
    if (clearBtn.children[0].textContent === "C") {
        if (inputingA) {
            a = "0";
            displayValue(a);
            isANeg = false;
        } else if (inputingB) {
            b = "0";
            displayValue(b);
            isBNeg = false;
            updateColor(optHolderForClearBtn);
        }
        clearBtn.children[0].textContent = "AC"
    } else {
        a = "0";
        b = null;
        opt = null;
        isANeg = false;
        isBNeg = false;
        displayValue(a);
        removeHighlight("func-2-clicked");
    }
});

equalsBtn.addEventListener("click", () => {
    let res;
    if (a && b && opt) {
        res = calculate(a, b, opt, decimalCount);
        previousB = b;
        previousOpt = opt;
    } else if (a && hasPrevRes) {
        res = calculate(a, previousB, previousOpt, decimalCount);
    } else if (a && !hasPrevRes) {
        return;
    } 
    a = res;
    b = null;
    opt = null;
    displayValue(res);
    hasPrevRes = true;
    inputingB = false;
    inputingA = true;
    isANeg = false;
    isBNeg = false;
    isEqualBtnPressed = true;
    removeHighlight("func-2-clicked");
    // can only AC after equals.
    clearBtn.children[0].textContent = "AC";
});

numNodeArr.forEach((div) => {
    div.addEventListener("click", () => {
        isEqualBtnPressed = false;
        optHolderForClearBtn = removeHighlight("func-2-clicked") || optHolderForClearBtn;
        clearBtn.children[0].textContent = "C";
        if (!opt) {
            inputingA = true;
            updateAValue(div);
            displayValue(a);
            console.log(`value of the first operand is ${a}`);
        } else {
            inputingB = true;
            updateBValue(div);
            displayValue(b);
            console.log(`value of the sec operand is ${b}`);
        }
    })
})

func2Arr.forEach((div) => {
    div.addEventListener("click", () => {
        isEqualBtnPressed = false;
        inputingA = false;
        isANeg = false;
        inputingB = true;
        updateColor(div, "func-2-clicked");
        // console.log(`inside button a is ${a}, b is ${b}, opt is ${opt}`)
        if (a && b && opt) {
            inputingB = false;
            let res = calculate(a, b, opt, decimalCount);
            a = res;
            b = null;
            displayValue(res);
            // console.log(a, b, opt);
        }
        opt = div.children[0].textContent;
        // console.log(opt.charCodeAt(0));
    });
})

function updateAValue(div) {
    let value = div.children[0].textContent;

    if (value === "\u2022") {
        if (hasPrevRes) { // for start a new calculation with decimal after equals is pressed
            a = "0.";
            hasPrevRes = false;
        }
        if (!a.includes(".")) {
            a += ".";
        }
    } else if (a === "0") {
        a = value;
    } else if (hasPrevRes) {
        a = value;
        hasPrevRes = false;
    } else {
        a += value;
    }
    if (isANeg && a.at(0) !== "-") {
        a = "-" + a;
    }
}

function updateBValue(div) {
    let value = div.children[0].textContent;
    if (value === "\u2022") {
        if (b === undefined || b=== null) {
            b = "0.";
        }
        else if (!b.includes(".")) {
            b += ".";
        }
    } else if (b === undefined || b === null || b === "0") {
        b = value;
    } else {
        b += value;
    }
    if (isBNeg && b.at(0) !== "-") {
        b = "-" + b;
    }
}

function displayValue(num) {
    displaySpan.textContent = addComma(num);
}

// working on operator.
// only on operator can be selected at a time.
// store the operator in var opt.
// user can change their minds and update the operator
// update b is opt is updated.
// only cal calculate after a, b and opt is populated.

function updateColor(div, styleClass) {
    if(optArr.length === 0) {
        optArr.push(div);
    } else {
        removeHighlight("func-2-clicked");
        optArr.push(div);
    }
    div.classList.add("func-2-clicked");
    div.id = "";
}

function removeHighlight(styleClass) {
    let prev = optArr.shift();
    if (prev !== undefined) {
        prev.classList.remove(styleClass);
        prev.id = "hover";
    }
    return prev;
}

function addComma(v) {
    console.log(v);
    let intWithComma = [];
    // split by "." and add comma to the integer part
    [int, decimal] = v.split(".");

    // decimal length for rounding
    if (decimal !== undefined) {
        decimalCount = Math.max(decimalCount, decimal.length || 0);

    }
    // console.log(decimalCount + "decimalCount: inside addComma/preprocessing");
        let counter = 0;
        for (let i = int.length - 1; i >= 0; i--) {
            counter++;
            if (counter === 4 && int[i] === '-') {
                intWithComma.unshift(int[i]);
                counter = 3;
            } else if (counter === 4) {
                counter = 1;
                intWithComma.unshift(",");
                intWithComma.unshift(int[i]);
            } else {
                intWithComma.unshift(int[i]);
            }
        }
        console.log(intWithComma);
    
    
    return decimal !== undefined ? intWithComma.join("").concat(".").concat(decimal) : intWithComma.join("");
}


function calculate(a, b, opt, decimalCount) {
    // console.log(`inside calculate, a value is ${a}`);
    // console.log(`inside calculate, b value is ${b}`);
    // console.log(`inside calculate, operator is ${typeof opt.charCodeAt(0)}`);
    // opt = updateOpt(opt);
    let round = Math.pow(10, decimalCount);
    switch(opt.charCodeAt(0)) {
        case 43:
            return add(a, b).toString();
        case 8722:
            return subtract(a, b).toString();
        case 215:
            return multiply(a, b).toString();
        case 247:
            return divide(a, b).toString();
    }
}

// function updateOpt(opt) {
//     let newOpt;
//     if opt === ""
// }

function getRoundingDecimal(a, b, operation) {
    let aDecimal = a.split(".")[1] || "0";
    let bDecimal = b.split(".")[1] || "0";

    if (operation === "add" || operation === "minus") {
        return Math.max(aDecimal.toString().length, bDecimal.toString().length);
    } else if (operation === "multiply") {
        return aDecimal.length + bDecimal.length;
    }
}

function add(a, b) {
    let roundingDecimal = getRoundingDecimal(a, b, "add");
    console.log(`inside add function. The rounding decimal is ${roundingDecimal}`);
    a = Number.parseFloat(a);
    b = Number.parseFloat(b);
    return Math.round((a + b) * Math.pow(10, roundingDecimal)) /  Math.pow(10, roundingDecimal);
}

function subtract(a, b) {
    let roundingDecimal = getRoundingDecimal(a, b, "minus");
    a = Number.parseFloat(a);
    b = Number.parseFloat(b);
    return Math.round((a - b) * Math.pow(10, roundingDecimal)) /  Math.pow(10, roundingDecimal);
}

function multiply(a, b) {
    let roundingDecimal = getRoundingDecimal(a, b, "multiply");
    a = Number.parseFloat(a);
    b = Number.parseFloat(b);
    return Math.round((a * b) * Math.pow(10, roundingDecimal)) /  Math.pow(10, roundingDecimal);
}

function divide(a, b) {
    a = Number.parseFloat(a);
    b = Number.parseFloat(b);
    return handleDivision(a, b);
}

function handleDivision(a, b) {
    let dumbRes = a / b;
    let roundedRes = Math.round((a/b) * Math.pow(10,15)) / Math.pow(10,15);
    if (Math.abs(roundedRes - dumbRes) < Number.EPSILON * 100) {
        return roundedRes;
    }
    return dumbRes;
}