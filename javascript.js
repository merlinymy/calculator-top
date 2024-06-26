let a = "0";
let b;
let opt;
let optArr = [];

let displaySpan = document.querySelector(".display span");
let numNodeArr = document.querySelectorAll(".num");
let func2NodeArr = document.querySelectorAll(".func-2");

let numArr = [...numNodeArr];
let func2Arr = [...func2NodeArr];

numNodeArr.forEach((div) => {
    div.addEventListener("click", () => {
        displayValue(div);
    })
})

func2Arr.forEach((div) => {
    div.addEventListener("click", () => {
        updateColor(div, "func-2-clicked");
    });

})



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
        let prev = optArr.shift();
        prev.classList.remove(styleClass);
        prev.id = "hover";
        
        optArr.push(div);
    }
    div.classList.add("func-2-clicked");
    div.id = "";
}

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
    // console.log(`inside displayValue(): value of a is ${a}`);
    displaySpan.textContent = addComma(a);;
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