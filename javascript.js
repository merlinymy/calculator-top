// displayValue and update Value should be two functions

let a = "0";
let b;
let opt;
let optArr = [];

let displaySpan = document.querySelector(".display span");
let numNodeArr = document.querySelectorAll(".num");
let func2NodeArr = document.querySelectorAll(".func-2");
let equalsBtn = document.querySelector(".equals");

let numArr = [...numNodeArr];
let func2Arr = [...func2NodeArr];

equalsBtn.addEventListener("click", () => {
    if (a && b && opt) {
        let res = calculate(a, b, opt);
        a = res;
        b = null;
        displayValue(res);
        removeHighlight("func-2-clicked");
    }
});

numNodeArr.forEach((div) => {
    div.addEventListener("click", () => {
        if (!opt) {
            updateAValue(div);
            displayValue(a);
        } else {
            updateBValue(div);
            displayValue(b);
        }
    })
})

func2Arr.forEach((div) => {
    div.addEventListener("click", () => {
        updateColor(div, "func-2-clicked");
        if (a && b && opt) {
            let res = calculate(a, b, opt);
            a = res;
            b = null;
            displayValue(res);
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
    } else {
        a += value;
    }
}

function updateBValue(div) {
    let value = div.children[0].textContent;
    // console.log(`inside updateBValue ${b}`);
    if (value === "\u2022") {
        if (!b.includes(".")) {
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
    prev.classList.remove(styleClass);
    prev.id = "hover";
}

function addComma(v) {
    // split by "." and add comma to the integer part
    [int, decimal] = v.split(".");
    let counter = 0;
    let intWithComma = [];
    for (let i = int.length - 1; i >= 0; i--) {
        counter++;
        if (counter === 4) {
            counter = 1;
            intWithComma.unshift(",");
            intWithComma.unshift(int[i]);
        } else {
            intWithComma.unshift(int[i]);
        }
    }
    return decimal !== undefined ? intWithComma.join("").concat(".").concat(decimal) : intWithComma.join("");
}


function calculate(a, b, opt) {
    // console.log(`inside calculate, a value is ${a}`);
    // console.log(`inside calculate, b value is ${b}`);
    // console.log(`inside calculate, operator is ${typeof opt.charCodeAt(0)}`);
    // opt = updateOpt(opt);
    switch(opt.charCodeAt(0)) {
        case 43:
            return add(a, b).toString(10);
        case 8722:
            return subtract(a, b).toString(10);
        case 215:
            return multiply(a, b).toString(10);
        case 247:
            return divide(a, b).toString(10);
    }
}

// function updateOpt(opt) {
//     let newOpt;
//     if opt === ""
// }

function add(a, b) {
    a = Number.parseFloat(a);
    b = Number.parseFloat(b);
    return a + b;
}

function subtract(a, b) {
    a = Number.parseFloat(a);
    b = Number.parseFloat(b);
    return a - b;
}

function multiply(a, b) {
    a = Number.parseFloat(a);
    b = Number.parseFloat(b);
    return a * b;
}

function divide(a, b) {
    a = Number.parseFloat(a);
    b = Number.parseFloat(b);
    return a / b;
}