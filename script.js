
let amountOfMoneyInJarElem = document.getElementById('amount_money_in_jar');
let inputMoneyField = document.getElementById('amountofMoneyToSend');
let inputMoneyFieldContainer = document.getElementsByClassName("money-input-block")[0];

window.onload = function () {
    if (localStorage.getItem("current_money") == null) {
        localStorage.setItem("current_money", "0 ₴");
    }
    amountOfMoneyInJarElem.textContent = localStorage.getItem("current_money");
    calculateRangeOfFilledJar();
    putCursorAfterText();
}
function calculateRangeOfFilledJar() {
    let target = document.getElementById('target-sum');

    let targetValidValue = parseInt(target.textContent.substring(0, target.textContent.length-1).replace(/ /g, ''))/2;
    document.getElementsByClassName("jar-middle")[0].textContent = targetValidValue;
    document.getElementsByClassName("jar-goal")[0].textContent = targetValidValue*2;
}

function putCursorAfterText() {
    let contentEditableDiv = document.querySelector('.money-input-contenteditable');
    contentEditableDiv.focus();
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
    let sum = parseInt(amountOfMoneyInJar) + parseInt(inputMoneyField.textContent);
    amountOfMoneyInJarElem.textContent = sum + " ₴";
    localStorage.setItem("current_money", amountOfMoneyInJarElem.textContent);

    let targetVal = parseInt(document.getElementById('target-sum').textContent.replace(/₴/g, '').replace(/ /g, ''));

    if (sum <= (targetVal * 33) / 100) {
        document.getElementsByClassName("glass")[0].src = "https://send.monobank.ua/img/jar/uah_33.png"
    } else if (sum >= (targetVal * 50) / 100 && sum < targetVal) {
        document.getElementsByClassName("glass")[0].src = "https://send.monobank.ua/img/jar/uah_50.png"
    } else if (sum >= targetVal) {
        document.getElementsByClassName("glass")[0].src = "https://send.monobank.ua/img/jar/uah_100.png"

    }
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

inputMoneyField.addEventListener('keydown', function(event) {
    const regx = /^\d+(\.\d{1,2})?$/;

    if (event.key === 'Backspace') {
        if (inputMoneyField.textContent == "0"){
            event.preventDefault();
        } else if (inputMoneyField.textContent.length == 1) {
            chnageTextInput("0");
            event.preventDefault();
        }
    } else if (!regx.test(event.key)) {
        event.preventDefault();
    }
})

function keepMaterialInput(event) {
    
    let parentDiv = event.parentElement;
    let labelElement = parentDiv.querySelector('.labelInput');
    let inputValue = event.value.trim();
    
    if (inputValue === '') {
        labelElement.classList.remove('keep-material');
    } else {
        labelElement.classList.add('keep-material');
    }
}

function chnageTextInput(newValue) {
    inputMoneyField.textContent = newValue;
    putCursorAfterText();
}

function changeMoney() {
    let currValue = inputMoneyField.textContent;

    if (currValue.charAt(0) == "0") {
        chnageTextInput(currValue.substring(1, currValue.length));
    }
    if (currValue > 29999) {
        chnageTextInput("29999");
    }
    if(currValue < 10) {
        inputMoneyFieldContainer.classList.add("incorrect");
        document.getElementsByClassName("money-input-subtitle")[0].classList.remove("hidden");
    } else {
        inputMoneyFieldContainer.classList.remove("empty");
        inputMoneyFieldContainer.classList.remove("incorrect");
        document.getElementsByClassName("money-input-subtitle")[0].classList.add("hidden");    
    }

}

