// script starts
"use strict";
var expect = chai.expect;
let currentSum = 0;

function sum(x, y) {
    return x + y;
}

function cyfry(napis) {
    let digitArray = Array.from(napis);
    digitArray = digitArray.map(digit => parseInt(digit));
    digitArray = digitArray.filter(digit => isNaN(digit) == false);
    let oddDigitSum = 0;
    let evenDigitSum = 0;
    for (let digit of digitArray) {
        if (digit % 2 == 0) {
            evenDigitSum += digit;
        } else {
            oddDigitSum += digit;
        }
    }
    return [oddDigitSum, evenDigitSum];
}

function litery(napis) {
    let letterArray = Array.from(napis);
    let largeLetterArray = letterArray.filter(letter => letterCheck(letter, 65, 90));
    let smallLetterArray = letterArray.filter(letter => letterCheck(letter, 97, 122));
    return [smallLetterArray.length, largeLetterArray.length];
}

// checking whether given character is a small or big letter using ASCII code
function letterCheck(letter, number1, number2) {
    if ((number1 <= letter.charCodeAt()) && (letter.charCodeAt() <= number2)) {
        return true;
    }
    return false;
}

function suma(napis) {
    napis = parseInt(napis);
    if (isNaN(napis) == false) {
        currentSum += napis;
    }
    return currentSum;
}

// getting data from prompt
function getData() {
    let input = window.prompt("Wczytaj napis");
    while (input != null) {
        console.log("\t[" + cyfry(input) + "]\t[" + litery(input) + "]\t[" + suma(input) + "]");
        input = window.prompt("Wczytaj napis");
    }
}
// script ends

// testing starts
describe('The sum() function', function () {
    it('Returns 4 for 2+2', function () {
        expect(sum(2, 2)).to.equal(4);
    });
    it('Returns 0 for -2+2', function () {
        expect(sum(-2, 2)).to.equal(0);
    });
});

describe("ONLY DIGITS", function () {
    it('cyfry("1234") = [4, 6]', function () {
        expect(cyfry("1234")).to.eql([4, 6]);
    });
    it('litery("1234") = [0, 0]', function () {
        expect(litery("1234")).to.eql([0, 0]);
    });
    it('suma("1234") = 1234', function () {
        expect(suma("1234")).to.equal(1234);
    });
});

describe("ONLY LETTERS", function () {
    it('cyfry("abcd") = [0, 0]', function () {
        expect(cyfry("abcd")).to.eqls([0, 0]);
    });
    it('litery("abcd") = [4, 0]', function () {
        expect(litery("abcd")).to.eql([4, 0]);
    });
    it('suma("abcd") = 0', function () {
        expect(suma("abcd")).to.equal(1234);
    });
});

describe("LETTERS THEN NUMBERS", function () {
    it('cyfry("abcd1234") = [4, 6]', function () {
        expect(cyfry("abcd1234")).to.eql([4, 6]);
    });
    it('litery("abcd1234") = [4, 0]', function () {
        expect(litery("abcd1234")).to.eql([4, 0]);
    });
    it('suma("abcd1234") = 0', function () {
        expect(suma("abcd1234")).to.equal(1234);
    });
});

describe("DIGITS THEN LETTERS", function () {
    it('cyfry("1234abcd") = [4, 6]', function () {
        expect(cyfry("1234abcd")).to.eql([4, 6]);
    });
    it('litery("1234abcd") = [4, 0]', function () {
        expect(litery("1234abcd")).to.eql([4, 0]);
    });
    it('suma("1234abcd") = 1234', function () {
        expect(suma("1234abcd")).to.equal(2468);
    });
});

describe("EMPTY STRING", function () {
    it('cyfry("") = 0', function () {
        expect(cyfry("")).to.eql([0, 0]);
    });
    it('litery("") = [0, 0]', function () {
        expect(litery("")).to.eql([0, 0]);
    });
    it('suma("") = 0', function () {
        expect(suma("")).to.equal(2468);
    });
});
// testing ends
