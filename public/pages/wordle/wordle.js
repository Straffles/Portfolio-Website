import { answers, words } from './dictionary.js';

let row = 0;
let column = 0;

var word_list = words;
var answer_list = answers;

//join word list and answer list
word_list = word_list.concat(answer_list);

//pick random answer from answer list
let answer = answer_list[Math.floor(Math.random() * answer_list.length)].toUpperCase();

console.log(answer);

//draw box
function draw_box(container, row, column, letter = '') {
    const box = document.createElement('div');
    box.className = 'box';
    box.id = `box ${row}-${column}`;
    box.innerText = letter;

    container.appendChild(box);
    return box;
}

//draw grid
function draw_grid(container) {
    const grid = document.createElement('div');
    grid.className = 'grid';

    for (let r = 0; r < 6; r++) {
        for (let c = 0; c < 5; c++) {
            draw_box(grid, r, c);
        }
    }
    container.appendChild(grid);
}

//listen for keyboard events
function key_log() {
        document.addEventListener('keyup', keyboard);
}

function end_key_log() {
    document.removeEventListener('keyup', keyboard);
}

//process keyboard events
function keyboard(x) {
        if ('KeyA' <= x.code && x.code <= 'keyZ') {
            if (column < 5) {
                let current_box = document.getElementById(
                    'box ' + row.toString() + '-' + column.toString()
                );
                if (current_box.innerHTML == '') {
                    current_box.innerHTML = x.code[3];
                    column += 1;
                }
            }
        } else if (x.code == 'Backspace' && 0 < column && column <= 5) {
            column -= 1;
            let current_box = document.getElementById(
                'box ' + row.toString() + '-' + column.toString()
            );
            current_box.innerText = '';
        } else if (x.code == 'Enter') {
            if (column == 5) {
                if (get_current_word() == answer) {
                    highlight_positions();
                    end_key_log();
                    setTimeout(() => {
                        end_game(true);
                    }, 2200);
                }
                else if (is_valid() == true) {
                    highlight_positions();
                    row += 1;
                    column = 0;
                    if (row == 6) {
                        end_key_log();
                        setTimeout(() => {
                            end_game(false);
                        }, 2200);
                    }
                }
                else if (is_valid() == false) {
                    alert('Not in word list');
                }
            }
            else if (column < 5) {
                alert('Not enough letters');
            }
        }
    };


//get word from current row
function get_current_word() {
    let word = '';

    for (let column = 0; column < 5; column++) {
        let current_box = document.getElementById(
            'box ' + row.toString() + '-' + column.toString()
        );
        let letter = current_box.innerText;
        word += letter;
    }
    return word;
}

//check to see if user's guess is in word list
function is_valid() {
    let word = get_current_word().toLowerCase();

    if (word_list.includes(word)) {
        return true;
    } else if (!word_list.includes(word)) {
        return false;
    }
}

//check for letter positions and highlight
function highlight_positions() {
    const animation_duration = 500;

    let correct = 0;
    let letterCount = {};
    for (let i = 0; i < answer.length; i++) {
        let letter = answer[i];
        if (letterCount[letter]) {
            letterCount[letter] += 1;
        } else letterCount[letter] = 1;
    }

    for (let column = 0; column < 5; column++) {
        let current_box = document.getElementById(
            'box ' + row.toString() + '-' + column.toString()
        );
        let letter = current_box.innerText;

    setTimeout(() => {
        if (answer[column] == letter) {
            current_box.classList.add('correct');
            correct += 1;
            letterCount[letter] -= 1;
        } else if (!current_box.classList.contains('correct')) {
            if (answer.includes(letter) && letterCount[letter] > 0) {
                current_box.classList.add('present');
                letterCount[letter] -= 1;
            } else {
                current_box.classList.add('absent');
            }
        }
    }, ((column + 1) * animation_duration) / 2);
    current_box.classList.add('animate');
    current_box.style.animationDelay = `${(column * animation_duration) / 2}ms`;
    }
}

const restartBtn = document.getElementById('restart');
const popup = document.getElementById('popup');
const popupTitle = document.getElementById('popup-title')


function end_game(state) {
    if (state == true) {
        popup.classList.add('open')
    } else if (state == false) {
        popupTitle.innerHTML = 'Try Again!'
        popup.classList.add('open')
    }
}

window.onload = function () {
    const game = document.getElementById('game');
    draw_grid(game);
    key_log();
};

restartBtn.addEventListener('click', () => {
    popup.classList.remove('open');
    location.reload();
});

