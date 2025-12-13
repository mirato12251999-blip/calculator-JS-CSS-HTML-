const display = document.getElementsByClassName("keyboards")[0];
var standardkeys = [];
let operations;
let num1 = 0, num2 = 0;

/**
 * application: display the keys on the screen
 * dev: ToBBi
 * date:2025.12.01
 */

window.onload = () => {
    fetch("../json/standardkeys.json")
        .then(response => response.json())
        .then(keys => {
            standardkeys = keys;

            const chunkSize = 4;

            // Split keys into groups of 4
            const rows = [];
            for (let i = 0; i < keys.length; i += chunkSize) {
                rows.push(keys.slice(i, i + chunkSize));
            }

            // Build HTML safely
            const result = rows
                .map(row => {
                    const items = row
                        .map(item =>
                            `<div onclick="displayOrOperate('${item.type}', '${item.value}')">${item.value}</div>`
                        ).join("");

                    return `<div>${items}</div>`;
                })
                .join("");

            display.innerHTML = result;

            // Adjust width of the final row (if it has fewer than 4 items)
            const lastRow = display.lastChild;
            const count = lastRow.childNodes.length;

            if (count < 4) {
                const w = 100 / count;
                lastRow.childNodes.forEach(el => {
                    el.style.width = `${w}%`;
                });
            }
        })
        .catch(error => console.error("Error loading JSON:", error));
};


/**
 * application: display numbers in the input field
 * dev: ToBBi
 * date: 2025.12.01
 */

function displayOrOperate(type, value) {
    if (type === "number") {
        num1 = 10 * num1 + Number(value);
        document.getElementsByClassName("number")[0].value = num1;
    }

    else if (type === "delete") deleteNumber(value);

    else {
        operationKeyPush(value);
    }
}

/**
 * application: calculate two numbers according to the operator 
 * or push the operators in the operator num1 named "operations"
 * dev: ToBBi
 * date: 2025.12.02
 */

function operationKeyPush(operator) {
    if (!!operations) {
        num2 = num1;
        calculate(operator);
    }

    else {
        num1 = num1;
        operations = operator;
    }

    num1 = 0;
}

function calculate(operator) {
    switch (operations) {
        case "+": {
            num1 = num1 + num2;
            break;
        }

        case "-": {
            num1 = num1 - num2;
            break;
        }

        case "*": {
            num1 = num1 * num2;
            break;
        }

        case "/": {
            num1 = num1 / num2;
            break;
        }

    }

    document.getElementsByClassName("number")[0].value = num1;
    operations = operator === "=" ? "" : operator;
}

/**
 * application: delete or change the number in the input field
 * dev: ToBBi
 * date: 2025.12.02
 */

function deleteNumber(value) {
    switch (value) {
        case "C": {
            num1 = num2 = 0;
            operations = "";
            num1 = 0;
        }
            break;

        case "CE": {
            num1 = 0
        }
            break;

        default: {
            num1 = Math.floor(num1 / 10);
        }
            break;
    }

    document.getElementsByClassName("number")[0].value = num1;
}

function resetCalculator() {
    num1 = num2 = 0;
    operations = "";
    num1 = 0;
    document.getElementsByClassName("number")[0].value = "";
}