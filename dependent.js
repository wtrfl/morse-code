const dependent = {
    short: {
        value: 'E',
        short: {
            value: 'I',
            short: {
                value: 'S',
                short: 'H',
                long: 'V'
            },
            long: {
                value: 'U',
                short: 'F',
                long: null
            }
        },
        long: {
            value: 'A',
            short: {
                value: 'R',
                short: 'L',
                long: null
            },
            long: {
                value: 'W',
                short: 'P',
                long: 'J'
            }
        }
    },
    long: {
        value: 'T',
        short: {
            value: 'N',
            short: {
                value: 'D',
                short: 'B',
                long: 'X'
            },
            long: {
                value: 'K',
                short: 'C',
                long: 'Y'
            }
        },
        long: {
            value: 'M',
            short: {
                value: 'G',
                short: 'Z',
                long: 'Q'
            },
            long: 'O'
        }
    }
}

function findDependent(arr) {
    if (arr.length == 0) return null;

    let current = dependent[arr[0]];
    for (let i = 1; i < arr.length; i++) {
        current = current[arr[i]];

        if (current === null) return null;

        if (typeof current === "string") {
            if (i != arr.length-1) return null;
        }
    }

    if (typeof current === "string") {
        return current;
    } else {
        return current.value;
    }
}

const notebook = document.querySelector('[data-notebook]');

const stateLabel = document.querySelector('[data-d-state]');
const shortBtn = document.querySelector('[data-d-short]');
const longBtn = document.querySelector('[data-d-long]');
const resetBtn = document.querySelector('[data-d-reset]');
const submitBtn = document.querySelector('[data-d-submit]');

var state = [];

function short() {
    state.push("short");
    stateLabel.textContent = stateLabel.textContent + "*";
}

function long() {
    state.push("long");
    stateLabel.textContent = stateLabel.textContent + "-";
}

function reset() {
    state = [];
    stateLabel.textContent = "";
}

function submit() {
    if (state.length == 0) return;

    const result = findDependent(state);

    reset();

    if (result === null) {
        invalid();
        return;
    }

    notebook.textContent = notebook.textContent + result;
}

function invalid() {
    stateLabel.textContent = "Invalid";
    shortBtn.disabled = true;
    longBtn.disabled = true;
    resetBtn.disabled = true;
    submitBtn.disabled = true;
    setTimeout(() => {
        stateLabel.textContent = "";
        shortBtn.disabled = false;
        longBtn.disabled = false;
        resetBtn.disabled = false;
        submitBtn.disabled = false;
    }, 500);
}

shortBtn.addEventListener('click', short);
longBtn.addEventListener('click', long);
resetBtn.addEventListener('click', reset);
submitBtn.addEventListener('click', submit);