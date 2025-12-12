const display = document.getElementsByClassName("keyboards")[0];
var standardkeys = [];
let operations;
let num1, num2;
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


/**
 * application: display numbers in the input field
 * dev: ToBBi
 * date: 2025.12.01
 */

function displayOrOperate(type, value) {
    if (type === "number") {
        temp = 10 * temp + Number(value);
        document.getElementsByClassName("number")[0].value = temp;
    }

    else if (type === "delete") deleteNumber(value);

    else {
        operationKeyPush(value);
    }
}

/**
 * application: calculate two numbers according to the operator 
 * or push the operators in the operator temp named "operations"
 * dev: ToBBi
 * date: 2025.12.02
 */

function operationKeyPush(operator) {
    if (!!operations) {
        num2 = temp;
        calculate(operator);
    }

    else {
        num1 = temp;
        operations = operator;
    }

    temp = 0;
    document.getElementsByClassName("number")[0].value = "";
}

function calculate(operator) {
    switch (operations) {

    }
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
            temp = 0;
        }
            break;

        case "CE": {
            temp = 0
        }
            break;

        default: {
            temp = Math.floor(temp / 10);
        }

            break;
    }

    document.getElementsByClassName("number")[0].value = temp;
}