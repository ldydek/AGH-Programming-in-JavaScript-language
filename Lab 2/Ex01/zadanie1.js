let button = document.querySelector("#button");
button.onclick = eventHandler;

function displayWindowPrompt() {
    for (let i = 0; i < 4; i++) {
        let person = window.prompt();
        console.log(person + ": " + typeof person);
    }
}

function eventHandler() {
    const loginForm = document.forms['addition'].elements;
    let firstElement = loginForm[0].value;
    let secondElement = loginForm[1].value;
    console.log(firstElement + ": " + typeof firstElement);
    console.log(secondElement + ": " + typeof secondElement);
}

displayWindowPrompt();