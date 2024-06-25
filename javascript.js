let a = "0";
let b;
let opt;

let displaySpan = document.querySelector(".display span");
let numNodeArr = document.querySelectorAll(".num");
let numArr = [...numNodeArr];
numNodeArr.forEach((div) => {
    div.addEventListener("click", () => {
        displayValue(div);
    })
})

function displayValue(div) {
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
    console.log(`inside displayValue(): value of a is ${a}`);
    displaySpan.textContent = addComma(a);;
}

function addComma(v) {
    // split by "." and add comma to the integer part
    // if int part length > 3
    // use a counter to keep track the digit
    // from right to left
    [int, decimal] = v.split(".");
    console.log(`inside addComma(): value of a is ${int}`);
    console.log(`inside addComma(): value of decimal is ${decimal}`);

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
    switch(opt) {
        case "+":
            return add(a, b);
        case "-":
            return subtract(a, b);
        case "*":
            return multiply(a, b);
        case "/":
            return divide(a, b);
    }
}

function add(a, b) {
    return a + b;
}

function subtract(a, b) {
    return a - b;
}

function multiply(a, b) {
    return a * b;
}

function divide(a, b) {
    return a / b;
}