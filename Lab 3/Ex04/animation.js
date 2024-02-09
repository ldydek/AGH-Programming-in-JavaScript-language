let timeInterval = 2000;
let cards = document.querySelectorAll('.card');
let isPaused = false;

function changeSingleCardPosition(index) {
    let newPosition
    if ((index == 1) || (index == 2)) {
        newPosition = randomNumberGenerator(-20, 20) + "%";
    }
    else {
        newPosition = randomNumberGenerator(-50, 50) + "%";
    }
    console.log(newPosition);
    cards[index].style.left = newPosition;
}

function randomNumberGenerator(min, max) {
    let randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
    return randomNumber;
}

function changeAllPositions() {
    if (!isPaused) {
        let index = randomNumberGenerator(0, cards.length - 1);
        console.log(index);
        changeSingleCardPosition(index);
    }
}

function stopInterval() {
    clearInterval(interval);
}

const backgroundFilter = document.querySelector('.background-filter');

function pauseAnimation() {
    backgroundFilter.style.animationPlayState = 'paused';
    setTimeout(() => {
        backgroundFilter.style.animationPlayState = 'running';
    }, 5000);
}

setInterval(pauseAnimation, 10000);

const interval = setInterval(changeAllPositions, timeInterval);

window.addEventListener("scroll", stopInterval);
window.addEventListener("keypress", stopInterval);
window.addEventListener("mousedown", stopInterval);
window.addEventListener("mousemove", stopInterval);
