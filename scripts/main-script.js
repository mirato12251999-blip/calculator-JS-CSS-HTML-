const display = document.getElementsByClassName("keyboards")[0];
var standardkeys = [];
let operations;
let num1 = 0, num2 = 0;
let temp = 0;

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


function displayOrOperate(type, value) {
    switch (type) {
        case "number": {
            if (!!operations) {
                num1 = temp;
            }
            temp = Number(value) + 10 * temp;
            updateDisplay(temp);
        }
            break;
        case "operation": {
            if (!!operations) {
                calculate(num1, temp, operations);
            } else {
                num1 = temp;
                operations = value;
                temp = 0;
            }
        }
            break;
        case "equal": {
            if (!!operations) {
                calculate(num1, temp, operations);
                operations = null;
            }
        }
            break;
        default:
            console.error("Unknown type:", type);
    }
}

function updateDisplay(value) {
    console.log("Update Display:", value);
    const displayElement = document.getElementsByClassName("number")[0];
    displayElement.value = value;
}

function calculate(n1, n2, operation) {
    let result = 0;
    switch (operation) {
        case "+":
            result = n1 + n2;
            break;
        case "-":
            result = n1 - n2;
            break;
        case "*":
            result = n1 * n2;
            break;
        case "/":
            result = n1 / n2;
            break;
        default:
            console.error("Unknown operation:", operation);
            return;
    }
    temp = result;
    updateDisplay(result);
    num1 = 0;
    operations = null;
    temp = 0;
}