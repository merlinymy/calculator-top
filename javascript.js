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
    displaySpan.textContent = a;
}

function addComma(v) {
    // add a comma after the leading digit
    // when there are 4, 7, 10, 13, 16, etc digits
    let length

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