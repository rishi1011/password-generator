const resultEl = document.getElementById('result');
const lengthEl = document.getElementById('length');
const uppercaseEl = document.getElementById('uppercase-letters');
const lowercaseEl = document.getElementById('lowercase-letters');
const symbolsEl = document.getElementById('symbols');
const numbersEl = document.getElementById('numbers');

const generateBtn = document.getElementById('generate');
const clipboardBtn = document.getElementById('clipboard');

const randomFunc = {
    lower: getRandomLower,
    upper: getRandomUpper,
    number: getRandomNumber,
    symbol: getRandomSymbol
}

generateBtn.addEventListener('click', updatePasswordToResult);

clipboardBtn.addEventListener('click', () => {
    if (resultEl.innerText === '') return;
    navigator.clipboard.writeText(resultEl.innerText);
})

function updatePasswordToResult() {
    const hasUpper = uppercaseEl.checked;
    const hasLower = lowercaseEl.checked;
    const hasSymbols = symbolsEl.checked;
    const hasNumbers = numbersEl.checked;
    const length = lengthEl.value; 

    resultEl.innerText = generatePassword(hasUpper, hasLower, hasSymbols, hasNumbers, length);
}

function generatePassword(upper, lower, symbol, number, length) {
    let generatedPassword = '';

    const typeCount = upper + lower + symbol + number;

    if (typeCount === 0) return '';

    const typesArr = [{ lower }, { upper }, { symbol }, { number }].filter(item => Object.values(item)[0]);

    for (let i = 0; i < length - typeCount; i++){
        let idx = Math.floor(Math.random() * typesArr.length);

        let obj = typesArr[idx];

        generatedPassword += randomFunc[Object.keys(obj)[0]]();
    }

    for (let i = 0; i < typeCount; i++){
        let idx = Math.floor(Math.random() * generatedPassword.length);

        let obj = typesArr[i];

        generatedPassword = generatedPassword.slice(0, idx) +
            randomFunc[Object.keys(obj)[0]]() + 
            generatedPassword.slice(idx);

    }

    return generatedPassword;
}

function getRandomLower() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 97);
}

function getRandomUpper() {
    return String.fromCharCode(Math.floor(Math.random() * 26) + 65);
}

function getRandomNumber() {
    return String.fromCharCode(Math.floor(Math.random() * 10) + 48);
}

function getRandomSymbol() {
    let symbols = '!@#$%^&*(){}[]?/,.<>:;=+-';

    return symbols[Math.floor(Math.random() * symbols.length)];
}


lengthEl.addEventListener('change', (e) => {
    if (e.target.value > 20) {
        e.target.value = 20;
    } else {
        e.target.value = 5
    }
}); 

