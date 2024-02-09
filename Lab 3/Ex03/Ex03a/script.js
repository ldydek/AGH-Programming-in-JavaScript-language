const startButton = document.querySelector('#start');
const stopButton = document.querySelector('#stop');
const resultMain = document.querySelector('#result_main');
const input = document.querySelector("#iterations_main")
const iterationsMainBtutton = document.querySelector('#iterations_main_btn');
const iterationsWorkerButton = document.querySelector('#iterations_worker_btn');
const form = document.querySelector('#form');
let i = 0;

startButton.addEventListener('click', startAnimation);
stopButton.addEventListener('click', stopAnimation);
form.addEventListener('submit', () => {
    event.preventDefault();
})
iterationsMainBtutton.addEventListener('click', function () {
    const number = input.value;
    resultMain.value = calculatePrimes(number);
});
iterationsWorkerButton.addEventListener('click', sendMessage);

// utworzenie wątku roboczego
const worker = new Worker('worker.js');

// wysyłanie wiadomości do wątku roboczego
function sendMessage() {
    const iterations = document.querySelector("#iterations_worker").value;
    worker.postMessage(iterations);
}

// odbieranie wyniku od wątku roboczego
worker.onmessage = function (message) {
    var result = message.data;

    // wyświetlenie wyników
    document.querySelector('#result_worker').textContent = result;
};

function startAnimation() {
    startButton.disabled = true;
    stopButton.disabled = false;
    animation = window.requestAnimationFrame(step);
}

function step() {
    document.forms[0].counter.value = i++;
    animation = window.requestAnimationFrame(step);
}

function stopAnimation() {
    startButton.disabled = false;
    stopButton.disabled = true;
    window.cancelAnimationFrame(animation)
}

function calculatePrimes(number) {
    const iterations = number || 50;
    var primes = [];
    for (var i = 0; i < iterations; i++) {
        var candidate = i * (1000000000 * Math.random());
        var isPrime = true;
        for (var c = 2; c <= Math.sqrt(candidate); ++c) {
            if (candidate % c === 0) {
                // not prime
                isPrime = false;
                break;
            }
        }
        if (isPrime) {
            primes.push(candidate);
        }
    }
    return primes;
}