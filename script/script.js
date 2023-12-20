const btnEncrypt = document.querySelector('.encrypt');
const btnDecrypt = document.querySelector('.decrypt');
const consoleArea = document.querySelector('.console');
let textArea = document.querySelector('#text-area');
let keyA = document.querySelector('#key-a');
let keyB = document.querySelector('#key-b');

const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

let count = 1;
let inverseNum;
let encryption = '';
let decryption = '';

textArea.addEventListener('input', function (event) {
  event.target.value = event.target.value.toUpperCase().replace(' ', '');
});

keyA.addEventListener('input', function () {
  while ((+keyA.value * count) % 26 !== 1) {
    count++;
  }

  inverseNum = count;
});

btnEncrypt.addEventListener('click', function () {
  if (keyA.value !== '' && keyB.value !== '' && textArea.value !== '') { 
    encrypt(textArea.value);
  } else {
    consoleArea.innerHTML += `Can't encrypt the message, because keys or message being empty. Fix, then try again.<br>`
  }
});

btnDecrypt.addEventListener('click', function () {
  if(keyA.value !== '' && keyB.value !== '' && textArea.value !== '') { 
    decrypt(encryption);
  } else {
    consoleArea.innerHTML += `Can't decrypt the message, because keys or message being empty. Fix, then try again.<br>`
  }
});

const textAreaValue = textArea.value;

function encrypt(textAreaValue) {
  if (+keyB.value > 25 || +keyB.value < 0) {
    consoleArea.innerHTML += `Key B can be only from 0 to 25. Fix, then try again.<br>`
    keyB.value = '';
    return;
  }

  encryption = '';  
  let arr = [];

  consoleArea.innerHTML += `<b>Entered text is:</b> ${textArea.value}<br>`;

  if (+keyA.value === 1) {
    for (let i = 0; i < textArea.value.length; i++) {
      for (let j = 0; j < alphabet.length; j++) {
        if (textArea.value[i] === alphabet[j]) {
          arr.push(j + 1);
        }
      }
    }
  } else {
    for (let i = 0; i < textArea.value.length; i++) {
      for (let j = 0; j < alphabet.length; j++) {
        if (textArea.value[i] === alphabet[j]) {
          arr.push((+keyA.value * j + +keyB.value) % 26);
        }
      }
    }
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      if (arr[i] === j) {
        encryption += alphabet[j];
      }
    }
  }

  consoleArea.innerHTML += `<b>Encryption is:</b> ${encryption}<br>`;
}

function decrypt(textAreaValue) {
  if (+keyB.value > 25 || +keyB.value < 0) {
    consoleArea.innerHTML += `Key B can be only from 0 to 25. Fix, then try again.<br>`
    keyB.value = '';
    return;
  }

  decryption = '';
  let arr = [];

  if (+keyA.value === 1) {
    for (let i = 0; i < textArea.value.length; i++) {
      for (let j = 0; j < alphabet.length; j++) {
        if (textArea.value[i] === alphabet[j]) {
          arr.push(j - 1);
        }
      }
    }
  } else {
    for (let i = 0; i < textArea.value.length; i++) {
      for (let j = 0; j < alphabet.length; j++) {
        if (textArea.value[i] === alphabet[j]) {
          arr.push((inverseNum * (j + 26 - +keyB.value)) % 26);
        }
      }
    }
  }

  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < alphabet.length; j++) {
      if (arr[i] === j) {
        decryption += alphabet[j];
      }
    }
  }

  consoleArea.innerHTML += `<b>Decryption is:</b> ${decryption}<br>`;
}

// Clear all
const btnClearAll = document.getElementById('btn-clear-all');

btnClearAll.addEventListener('click', () => {
  keyA.value = '';
  keyB.value = '';
  textArea.value = '';
  consoleArea.innerHTML = '';
});

