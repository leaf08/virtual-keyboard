const enChar = ['`~', '1!', '2@', '3#', '4$', '5%', '6^', '7&', '8*', '9(', '0)', '-_', '=+', 'Backspace', 
'Tab', 'q', 'w', 'e', 'r', 't', 'y', 'u', 'i', 'o', 'p', '[{', ']}', '\\|', 'Delete', 
'CapsLock', 'a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l', ';:', '\'"', 'Enter', 
'Shift L', 'z', 'x', 'c', 'v', 'b', 'n', 'm', ',<', '.>', '/?', 'Up ', 'Shift R', 
'Ctrl L', 'Alt L', 'Space', 'Alt R', 'Left', 'Down', 'Right', 'Ctrl R', ];

const ruChar = ['ё', '1!', '2"', '3№', '4;', '5%', '6:', '7?', '8*', '9(', '0)', '-_', '=+', 'Backspace',
'Tab', 'й', 'ц', 'у', 'к', 'е', 'н', 'г', 'ш', 'щ', 'з', 'х', 'ъ', '\\/', 'Delete', 
'CapsLock', 'ф', 'ы', 'в', 'а', 'п', 'р', 'о', 'л', 'д', 'ж', 'э', 'Enter', 
'Shift L', 'я', 'ч', 'с', 'м', 'и', 'т', 'ь', 'б', 'ю', '.,', 'Up ', 'Shift R', 
'Ctrl L', 'Alt L', 'Space', 'Alt R', 'Left', 'Down', 'Right', 'Ctrl R', ];

let keyCode = [];
keyCode['Backquote'] = '`';
keyCode['Minus'] = '-';
keyCode['Equal'] = '=';
keyCode['BracketLeft'] = '[';
keyCode['BracketRight'] = ']';
keyCode['Backslash'] = '\\';
keyCode['Semicolon'] = ';';
keyCode['Quote'] = '\'';
keyCode['Comma'] = ',';
keyCode['Period'] = '.';
keyCode['Slash'] = '/';
keyCode['Backspace'] = 'Backspace';
keyCode['Tab'] = 'Tab';
keyCode['Delete'] = 'Delete';
keyCode['CapsLock'] = 'CapsLock';
keyCode['Enter'] = 'Enter';
keyCode['ShiftLeft'] = 'Shift L';
keyCode['CtrlLeft'] = 'Ctrl L';
keyCode['AltLeft'] = 'Alt L';
keyCode['ShiftRight'] = 'Shift R';
keyCode['CtrlRight'] = 'Ctrl R';
keyCode['AltRight'] = 'Alt R';
keyCode['Space'] = 'Space';
keyCode['ArrowUp'] = 'Up ';
keyCode['ArrowLeft'] = 'Left';
keyCode['ArrowDown'] = 'Down';
keyCode['ArrowRight'] = 'Right';

const doc = document;
let textarea = addKey('textarea', 'textarea', undefined, 'textarea');
let keyBoard = addKey('div', 'keyboard', undefined, 'keyboard');

let str;
let className;
let isCase;
let char;
for(i = 0; i < 63; i++) {
    isCase = false;
    char = enChar[i];
    if(+enChar[i][0] || enChar[i][0] == 0) {
        className = 'Digit' + enChar[i][0];
        char = enChar[i][0];
    }
    if(enChar[i].length == 1) {
        isCase = true;
        className = 'Key' + enChar[i].toUpperCase();
        char = enChar[i][0];
    }
    if(enChar[i].length > 1) {
        for(k in keyCode) {
            if(keyCode[k] == enChar[i][0] || enChar[i] == keyCode[k]) {
                // console.log(k + ' ** ' + keyCode[k] + ' ** ' + enChar[i]);
                className = k;
            }
        }
    }
    key = addKey('span', 'key ' + className, keyBoard);
    lang = addKey('span', 'en', key);
    caseDown = addKey('span', 'caseDown', lang);
    caseUp = addKey('span', 'caseUp hidden', lang);
    if(enChar[i].length == 2) {
        char = enChar[i][0];
    }
    text = addText(char, caseDown, false);
    if(enChar[i].length == 2) {
        char = enChar[i][1];
    }
    text = addText(char, caseUp, isCase);

    char = ruChar[i];
    if(+ruChar[i][0] || ruChar[i][0] == 0) {
        className = 'Digit' + ruChar[i][0];
        char = ruChar[i][0];
    }
    if(ruChar[i].length == 1) {
        isCase = true;
        className = 'Key' + ruChar[i].toUpperCase();
        char = ruChar[i][0];
    }
    if(ruChar[i].length > 1) {
        for(k in keyCode) {
            if(keyCode[k] == ruChar[i][0] || ruChar[i] == keyCode[k]) {
                // console.log(k + ' ** ' + keyCode[k] + ' ** ' + ruChar[i]);
                className = k;
            }
        }
    }
    lang = addKey('span', 'ru hidden', key);
    caseDown = addKey('span', 'caseDown hidden', lang);
    caseUp = addKey('span', 'caseUp hidden', lang);
    if(ruChar[i].length == 2) {
        char = ruChar[i][0];
    }
    text = addText(char, caseDown, false);
    if(ruChar[i].length == 2) {
        char = ruChar[i][1];
    }
    text = addText(char, caseUp, false);
}

let desc = addKey('p', 'desc');
addText('Клавиатура создана в операционной системе Windows', desc);
lang = addKey('p', 'lang');
addText('Для переключения языка комбинация: левыe ctrl + alt', lang);

doc.addEventListener('keydown', function(event) {
    event.preventDefault()
    console.log(event.key, event.code);
    if(event.key.length == 1) textarea.value += event.key;
    if(event.key == 'Tab') textarea.value += '  ';
    if(event.key == 'Enter') textarea.value += '\n';

    // let elem = document.querySelector(event.code);
    let elem = doc.getElementsByClassName(event.code);
    console.log(elem.classList);
    // elem.classList.add('active');
});

function addKey(tag, className, parent, id) {
    let block = doc.createElement(tag);
    block.className = className;
    if(id !== undefined) block.id = id;
    if(parent == undefined) parent = doc.body;
    parent.append(block);
    return block;
}

function addText(char, parent, isCase) {
    if(isCase) char = char.toUpperCase();
    let text = doc.createTextNode(char);
    parent.append(text);
}
