let mainContainer = document.querySelector(".main-container");
let flexContainer = document.querySelector(".flex-container");
let leftColumn = document.querySelector(".left-column");
let rightColumn = document.querySelector(".right-column");
let azure = document.querySelectorAll(".azure");
let headings = document.querySelectorAll('h1');

let index = 0;
let main = document.querySelector('main');
let paragraphs = ["Natenczas Wojski chwycił na taśmie przypięty" +
    "Swój róg bawoli, długi, cętkowany, kręty" +
    "Jak wąż boa, oburączcdo ust go przycisnął," +
    "Wzdął policzki jak banię, w oczach krwią zabłysnął," +
    "Zasunął wpół powieki, wciągnął wgłąb pół brzucha" +
    "I do płuc wysłał z niego cały zapas ducha," +
    "I zagrał: róg jak wicher, wirowatym dechem" +
    "Niesie w puszczę muzykę i podwaja echem.",
"Umilkli strzelcy, stali szczwacze zadziwieni" +
"Mocą, czystością, dziwną harmoniją pieni." +
"Starzec cały kunszt, którym niegdyś w lasach słynął," +
"Jeszcze raz przed uszami myśliwców rozwinął;" +
"Napełnił wnet, ożywił knieje i dąbrowy," +
"Jakby psiarnię w nie wpuścił i rozpoczął łowy.",
"Bo w graniu była łowów historyja krótka:" +
"Zrazu odzew dźwięczący, rześki: to pobudka;" +
"Potem jęki po jękach skomlą: to psów granie;" +
"A gdzieniegdzie ton twardszy jak grzmot: to strzelanie."];

const setButton = document.querySelector("#set");
const deleteButton = document.querySelector("#delete");
const addButton = document.querySelector('#add');
setButton.addEventListener('click', setStyles);
deleteButton.addEventListener('click', removeStyles);
addButton.addEventListener('click', addParagraph);

deleteButton.disabled = true;
removeStyles();

function setStyles() {
    mainContainer.classList.add('main-container');
    flexContainer.classList.add('flex-container');
    leftColumn.classList.add('left-column');
    rightColumn.classList.add('right-column');
    for (let item of azure) {
        item.classList.add('azure');
    }
    for (let item of headings) {
        item.classList.add('h1');
    }
    setButton.disabled = true;
    deleteButton.disabled = false;
}

function removeStyles() {
    mainContainer.classList.remove('main-container');
    flexContainer.classList.remove('flex-container');
    leftColumn.classList.remove('left-column');
    rightColumn.classList.remove('right-column');
    for (let item of azure) {
        item.classList.remove('azure');
    }
    for (let item of headings) {
        item.classList.remove('h1');
    }
    setButton.disabled = false;
    deleteButton.disabled = true;
}

function addParagraph() {
    const newParagraph = document.createElement('p');
    const textNode = document.createTextNode(paragraphs[index]);
    newParagraph.appendChild(textNode);
    main.appendChild(newParagraph);
    index++;
    if (index == paragraphs.length) {
        addButton.disabled = true;
    }
}