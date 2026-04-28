const independent = {
    base: {
        short: 'E',
        long: 'T'
    },
    E: {
        short: 'I',
        long: 'A'
    },
    I: {
        short: 'S',
        long: 'U',
    },
    U: {
        short: 'F',
        long: null
    },
    F: null,
    S: {
        short: 'H',
        long: 'V'
    },
    H: null,
    V: null,
    A: {
        short: 'R',
        long: 'W'
    },
    R: {
        short: 'L',
        long: null
    },
    L: null,
    W: {
        short: 'P',
        long: 'J'
    },
    P: null,
    J: null,
    T: {
        short: 'N',
        long: 'M'
    },
    N: {
        short: 'D',
        long: 'K'
    },
    D: {
        short: 'B',
        long: 'X'
    },
    B: null,
    X: null,
    K: {
        short: 'C',
        long: 'Y'
    },
    C: null,
    Y: null,
    M: {
        short: 'G',
        long: 'O'
    },
    G: {
        short: 'Z',
        long: 'Q'
    },
    Z: null,
    Q: null,
    O: null
}

function findIndependentHelper(queue, lastLetter = "base") {
    if (queue.size() == 0) return lastLetter;
    if (queue.size() != 0 && lastLetter == null) return null;
    return findIndependent(queue, independent[queue.dequeue()])
}

const iStateLabel = document.querySelector('[data-i-state]');
const iShortBtn = document.querySelector('[data-i-short]');
const iLongBtn = document.querySelector('[data-i-long]');
const iResetBtn = document.querySelector('[data-i-reset]');
const iSubmitBtn = document.querySelector('[data-i-submit]');

var lastLetter = "base";

function findIndependent(action) {
    const dex = independent[lastLetter];
    if (dex == null) {
        invalid();
        return;
    }
    const result = dex[action];
    if (action == null) {
        invalid();
        return;
    }
    lastLetter = result;
    iStateLabel.textContent = result;
}

function short() {
    findIndependent("short");
}

function long() {
    findIndependent("long");
}

function reset() {
    lastLetter = "base";
    iStateLabel.textContent = "";
}

function submit() {
    if (lastLetter == "base") return;

    notebook.textContent = notebook.textContent + lastLetter;

    reset();
}

function invalid() {
    reset();
    iStateLabel.textContent = "Invalid";
    iShortBtn.disabled = true;
    iLongBtn.disabled = true;
    iResetBtn.disabled = true;
    iSubmitBtn.disabled = true;
    setTimeout(() => {
        iStateLabel.textContent = "";
        iShortBtn.disabled = false;
        iLongBtn.disabled = false;
        iResetBtn.disabled = false;
        iSubmitBtn.disabled = false;
    }, 500);
}

iShortBtn.addEventListener('click', short);
iLongBtn.addEventListener('click', long);
iResetBtn.addEventListener('click', reset);
iSubmitBtn.addEventListener('click', submit);
