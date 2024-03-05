
let amountOfMoneyInJarElem = document.getElementById('amount_money_in_jar');
let inputMoneyField = document.getElementById('amountofMoneyToSend');


window.onload = function () {
    if (localStorage.getItem("current_money").length == 0) {
        localStorage.setItem("current_money", "0 ₴");
    }
    amountOfMoneyInJarElem.textContent = localStorage.getItem("current_money");

    localStorage.setItem("current_money", amountOfMoneyInJarElem.textContent);

    let contentEditableDiv = document.querySelector('.money-input-contenteditable');
    contentEditableDiv.focus();

    // Position the cursor after the text
    let range = document.createRange();
    let selection = window.getSelection();
    range.setStart(contentEditableDiv.firstChild, contentEditableDiv.textContent.length);
    range.collapse(true);
    selection.removeAllRanges();
    selection.addRange(range);
}

function unfoldSection() {
    document.getElementById('manual-pan-trigger').classList.add("hidden");
    document.getElementById('manual-pan').classList.remove("hidden");
}

function sendMoney() {
    
    let amountOfMoneyInJar = amountOfMoneyInJarElem.textContent.substring(0, amountOfMoneyInJarElem.textContent.length - 1);
    amountOfMoneyInJarElem.textContent = parseInt(amountOfMoneyInJar) + parseInt(inputMoneyField.textContent) + " ₴";
    localStorage.setItem("current_money", amountOfMoneyInJarElem.textContent);
}

function setNewValueToInputField(newVal) {
    if (!isNaN(newVal)) {
        inputMoneyField.textContent = parseInt(inputMoneyField.textContent) + parseInt(newVal);
    }
}

function addTemplateMoney(elem) {
    let validValue = elem.textContent.substring(1,elem.textContent.length-1).replace(/ /g, '');
    setNewValueToInputField(validValue);
}
