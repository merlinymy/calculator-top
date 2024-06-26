// TODO: next step is to realize func-1 buttons

// BUGS: after the result returned by "equals",
// a new number entered appends to the result, 

// 3 + . 
// javascript.js:85 Uncaught TypeError: Cannot read properties of undefined (reading 'includes')
// at updateBValue (javascript.js:85:16)/
// at HTMLButtonElement.<anonymous> (javascript.js:42:13)
//
// should act like 3 + 0.0000  


let a = "0";
let b;
let opt;
let optArr = [];
let hasPreviousRes = false;
let previousB;
let previousOpt;
let decimalCount = 0;

let displaySpan = document.querySelector(".display span");
let numNodeArr = document.querySelectorAll(".num");
let func2NodeArr = document.querySelectorAll(".func-2");
let equalsBtn = document.querySelector(".equals");

let numArr = [...numNodeArr];
let func2Arr = [...func2NodeArr];

equalsBtn.addEventListener("click", () => {
    let res;
    if (a && b && opt) {
        res = calculate(a, b, opt, decimalCount);
        previousB = b;
        previousOpt = opt;
    } else if (a && hasPreviousRes) {
        res = calculate(a, previousB, previousOpt, decimalCount);
    } else if (a && !hasPreviousRes) {
        return;
    } 
    a = res;
    b = null;
    opt = null;
    displayValue(res);
    hasPreviousRes = true;
    removeHighlight("func-2-clicked");
});

numNodeArr.forEach((div) => {
    div.addEventListener("click", () => {
        removeHighlight("func-2-clicked");
        if (!opt) {
            updateAValue(div);
            displayValue(a);
            console.log(`value of the first operand is ${a}`);
        } else {
            updateBValue(div);
            displayValue(b);
            console.log(`value of the sec operand is ${b}`);
        }
    })
})

func2Arr.forEach((div) => {
    div.addEventListener("click", () => {
        updateColor(div, "func-2-clicked");
        console.log(`inside button a is ${a}, b is ${b}, opt is ${opt}`)
        if (a && b && opt) {
            let res = calculate(a, b, opt, decimalCount);
            a = res;
            b = null;
            displayValue(res);
            console.log(a, b, opt);
        }
        opt = div.children[0].textContent;
        // console.log(opt.charCodeAt(0));
    });
})

function updateAValue(div) {
    let value = div.children[0].textContent;
    if (value === "\u2022") {
        if (!a.includes(".")) {
            a += ".";
        } else {
            return;
        }
    } else if (a === "0") {
        a = value;
    } else if (hasPreviousRes) {
        a = value;
        hasPreviousRes = false;
    } else {
        a += value;
    }
}

function updateBValue(div) {
    let value = div.children[0].textContent;
    if (value === 0) {
        return;
    }
    // console.log(`inside updateBValue ${b}`);
    if (value === "\u2022") {
        if (b === undefined || b=== null) {
            b = "0.";
        }
        else if (!b.includes(".")) {
            b += ".";
        } else {
            return;
        }
    } else if (b === undefined || b === null) {
        b = value;
    } else {
        b += value;
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
}

function addComma(v) {
    console.log(v);
    let intWithComma = [];
    // split by "." and add comma to the integer part
    [int, decimal] = v.split(".");
    console.log(typeof decimal + " here!!!!!inside addComma/preprocessing");
    // console.log(decimal.length + "decimal length: inside addComma/preprocessing");
    // decimalCount = 0;

    // decimal length for rounding
    if (decimal === undefined) {
        console.log("here!!!");

    } else {
        decimalCount = Math.max(decimalCount, decimal.length || 0);
    }
    console.log(decimalCount + "decimalCount: inside addComma/preprocessing");

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
    let [aInt,aDecimal] = a.split(".");
    let [bInt,bDecimal] = b.split(".");
    if (operation === "add" || operation === "minus") {
        return Math.max(aDecimal, bDecimal);
    } else if (operation === "multiply") {
        return aDecimal + bDecimal;
    } else {

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