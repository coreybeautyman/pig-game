'use strict';
// buttons
const btnReset = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const targetScore = document.querySelector('.set-target-score');
const btnHowTo = document.querySelector('.btn--howto');
const closeModal = document.querySelector('.close-modal');
const modalBlur = document.querySelector('.overlay');

// How to Modal
const modal = document.querySelector('.modal');

// player 1
const player0El = document.querySelector('.player--0');
const score0El = document.getElementById('score--0');
const current0El = document.getElementById('current--0');
const wins0El = document.getElementById('wins--0');
const name0El = document.getElementById('name--0');

// player 2
const player1El = document.querySelector('.player--1');
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--1');
const wins1El = document.getElementById('wins--1');
const name1El = document.getElementById('name--1');

// dice
const diceEl = document.querySelector('.dice');

let score, playing, activePlayer, currentScore, setScoreNum, wins;

resetGame();

function activePlayerFunc() {
  if (wins[0] === 0 && wins[1] === 0) {
    activePlayer = 0;
    player0El.classList.add('player--active');
  } else {
    switchPlayer();
  }
}

// after playing resets game but not wins
function init() {
  score0El.textContent = 0;
  current0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;
  activePlayerFunc();
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  score = [0, 0];
  currentScore = 0;
  playing = true;
  diceEl.classList.add('hidden');
  btnRoll.removeEventListener('click', init);
  document.removeEventListener('keyup', wonGameSpace);
  btnRoll.addEventListener('click', diceRoll);
  document.addEventListener('keyup', isSpace);
}

// full reset
function resetGame() {
  wins0El.textContent = 0;
  wins1El.textContent = 0;
  wins = [0, 0];
  name0El.textContent = 'Player 1';
  name1El.textContent = 'Player 2';
  init();
}

// roll dice
function diceRoll() {
  if (playing) {
    // dice Func
    let dice = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // game Func
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`score--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`score--${activePlayer}`).textContent =
        currentScore;
      switchPlayer();
    }
  }
}

// hold Func
function hold() {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`current--${activePlayer}`).textContent =
      score[activePlayer];
    currentScore = 0;
    document.getElementById(`score--${activePlayer}`).textContent = 0;

    if (score[activePlayer] >= setScoreNum) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      wins[activePlayer]++;
      document.getElementById(`wins--${activePlayer}`).textContent =
        wins[activePlayer];
      playing = false;
      btnRoll.addEventListener('click', init);
      document.addEventListener('keyup', wonGameSpace);
    } else {
      switchPlayer();
    }
  }
}

function switchPlayer() {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function setScore() {
  setScoreNum = Number(targetScore.value);
}
function isSpace(e) {
  if (e.code === 'Space') {
    diceRoll();
  }
}
function wonGameSpace(e) {
  if (e.code === 'Space') {
    init();
  }
}

function isEnter(e) {
  if (e.code === 'Enter') {
    hold();
  }
}

function modalShowFunc() {
  modal.classList.remove('hidden');
  modalBlur.classList.remove('hidden');
  modalBlur.addEventListener('click', modalCloseFunc);
}
function modalCloseFunc() {
  modal.classList.add('hidden');
  modalBlur.classList.add('hidden');
}

btnHold.addEventListener('click', hold);
document.addEventListener('keydown', isEnter);
btnRoll.addEventListener('click', diceRoll);
document.addEventListener('keyup', isSpace);
btnReset.addEventListener('click', resetGame);
targetScore.addEventListener('click', setScore);
targetScore.addEventListener('keyup', setScore);
btnHowTo.addEventListener('click', modalShowFunc);
closeModal.addEventListener('click', modalCloseFunc);

//
//
//
//
//
//
//
//
//
//
//

/* WORKING GAME 2 CURRENT AND SCORE WRONG WAY AROUND
// buttons
const btnReset = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const targetScore = document.querySelector('.set-target-score');

// player 1
const player0El = document.querySelector('.player--0');
const score0El = document.getElementById('score--0');
const current0El = document.getElementById('current--0');
const wins0El = document.getElementById('wins--0');
const name0El = document.getElementById('name--0');

// player 2
const player1El = document.querySelector('.player--1');
const score1El = document.getElementById('score--1');
const current1El = document.getElementById('current--1');
const wins1El = document.getElementById('wins--1');
const name1El = document.getElementById('name--1');

// dice
const diceEl = document.querySelector('.dice');

let score, playing, activePlayer, currentScore, setScoreNum, wins;

resetGame();

function activePlayerFunc() {
  if (wins[0] === 0 && wins[1] === 0) {
    activePlayer = 0;
    player0El.classList.add('player--active');
  } else {
    switchPlayer();
  }
}

// after playing resets game but not wins
function init() {
  score0El.textContent = 0;
  current0El.textContent = 0;
  score1El.textContent = 0;
  current1El.textContent = 0;
  activePlayerFunc();
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.remove('player--active');
  player1El.classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.add('player--active');
  score = [0, 0];
  currentScore = 0;
  playing = true;
  diceEl.classList.add('hidden');
  btnRoll.removeEventListener('click', init);
  document.removeEventListener('keydown', wonGameSpace);
  btnRoll.addEventListener('click', diceRoll);
  document.addEventListener('keydown', isSpace);
}

// full reset
function resetGame() {
  wins0El.textContent = 0;
  wins1El.textContent = 0;
  wins = [0, 0];
  name0El.textContent = 'Player 1';
  name1El.textContent = 'Player 2';
  init();
}

// roll dice
function diceRoll() {
  if (playing) {
    // dice Func
    let dice = Math.floor(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    // game Func
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      switchPlayer();
    }
  }
}

// hold Func
function hold() {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent = 0;

    if (score[activePlayer] >= setScoreNum) {
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      wins[activePlayer]++;
      document.getElementById(`wins--${activePlayer}`).textContent =
        wins[activePlayer];
      playing = false;
      btnRoll.addEventListener('click', init);
      document.addEventListener('keydown', wonGameSpace);
    } else {
      switchPlayer();
    }
  }
}

function switchPlayer() {
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  activePlayer = activePlayer === 0 ? 1 : 0;
}

function setScore() {
  setScoreNum = Number(targetScore.value);
}
function isSpace(e) {
  if (e.code === 'Space') {
    diceRoll();
  }
}
function wonGameSpace(e) {
  if (e.code === 'Space') {
    init();
  }
}

function isEnter(e) {
  if (e.code === 'Enter') {
    hold();
  }
}

btnHold.addEventListener('click', hold);
document.addEventListener('keydown', isEnter);
btnRoll.addEventListener('click', diceRoll);
document.addEventListener('keydown', isSpace);
btnReset.addEventListener('click', resetGame);
targetScore.addEventListener('click', setScore);
targetScore.addEventListener('keyup', setScore);
*/

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/*  WORKING GAME
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const setScore = document.querySelector('.set-target-score');
resetActivePlayer();
// starting conditions
function resetActivePlayer() {
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
}

let scores, currentScore, activePlayer, playing, setScoreInt;

let wins = [0, 0];

function activePlayerFunc() {
  if (wins[0] !== 0 || wins[1] !== 0) {
    switchPlayer();
  } else {
    activePlayer = 0;
    resetActivePlayer();
  }
}

init();
function init() {
  scores = [0, 0];
  currentScore = 0;
  activePlayerFunc();
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  btnRoll.removeEventListener('click', init);
  btnRoll.addEventListener('click', diceRoll);
  btnNew.addEventListener('click', resetWins);
}

function playerSetScore() {
  setScoreInt = Number(setScore.value);
  return setScoreInt;
}

function switchPlayer() {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
}

//  rolling dice function
btnRoll.addEventListener('click', diceRoll);

function diceRoll() {
  if (playing) {
    // generate a random dice number
    const dice = Math.trunc(Math.random() * 6) + 1;

    // display number
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    // check if number is a 1.
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      // if true switch player
      switchPlayer();
    }
  }
}

function resetWins() {
  wins = [0, 0];
  document.getElementById(`wins--0`).textContent = 0;
  document.getElementById(`wins--1`).textContent = 0;
  document.getElementById(`name--0`).textContent = 'Player 1';
  document.getElementById(`name--1`).textContent = 'Player 2';
  init();
}

btnHold.addEventListener('click', function () {
  if (playing) {
    // add current players score to total score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    // check to see if score is 100
    if (scores[activePlayer] >= setScoreInt) {
      // if true player wins game
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      wins[activePlayer]++;
      document.getElementById(`wins--${activePlayer}`).textContent =
        wins[activePlayer];
      playing = false;
      diceEl.classList.add('hidden');
      document.getElementById(`current--${activePlayer}`).textContent = 0;
      btnRoll.addEventListener('click', init);
      btnNew.addEventListener('click', resetWins);
    } else {
      // else switch player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', resetWins);
setScore.addEventListener('keyup', playerSetScore);
setScore.addEventListener('click', playerSetScore);
*/
