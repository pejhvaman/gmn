"use strict";

const resetBtn = document.querySelector(".reset-btn"),
  secretBox = document.querySelector(".secret-num"),
  inputLabel = document.querySelector(".input-label"),
  guessInput = document.getElementById("guess-num-input"),
  checkBtn = document.querySelector(".guess-btn"),
  statusMsgEl = document.querySelector(".status-msg"),
  scoreEl = document.querySelector(".score-num"),
  highscoreEl = document.querySelector(".highscore-num");

const max = 20,
  min = 1,
  scoreLimit = 20;

let score = scoreLimit,
  highscore = 0,
  secretNum;

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const init = function () {
  secretNum = randInt(min, max);
  secretBox.textContent = "?"; //temp
  //   console.log(secretNum);
  secretBox.classList.remove("success");
  inputLabel.textContent = "Write a number";
  inputLabel.classList.add("hidden");
  guessInput.value = "";
  guessInput.focus();
  statusMsgEl.textContent = `🔶 Start guessing a number between ${min} to ${max}...`;
  setTimeout(() => {
    statusMsgEl.classList.remove("anim");
  }, 1000);
  scoreEl.textContent = scoreLimit;
  highscoreEl.textContent = highscore;
  document.body.style.background = "var(--primary-gradient)";
};
init();

const showLabelErr = function (errMsg) {
  inputLabel.textContent = errMsg;
  inputLabel.classList.add("mistake");
  inputLabel.classList.remove("hidden");
  inputLabel.classList.add("anim");
  guessInput.value = "";
};

const showStatusMsg = function (msg) {
  setTimeout(() => {
    statusMsgEl.classList.remove("anim");
  }, 1000);
  statusMsgEl.textContent = msg;
  guessInput.value = "";
};

const runGame = function (e) {
  e.preventDefault();
  //init the err label
  inputLabel.classList.add("hidden");
  inputLabel.classList.remove("anim");
  //animation for msg
  statusMsgEl.classList.add("anim");
  //validation input
  const val = +guessInput.value;
  if (!val) return showLabelErr("Write a number ...");
  if (val < min || val > max)
    return showLabelErr(`Write a number between ${min} to ${max}`);
  //check score
  if (score < 2) {
    scoreEl.textContent = 0;
    return showStatusMsg("🔄 Start over...");
  }

  if (val === secretNum) {
    showStatusMsg(`🟢 Correct...!
          Reset the game to play again.`);
    secretBox.textContent = secretNum;
    secretBox.classList.add("success");

    highscore = score > highscore ? score : highscore;
    score = 20;
    highscoreEl.textContent = highscore;
    console.log(highscore);
    document.body.style.background = "var(--secondary-gradient)";
  }

  if (val !== secretNum) {
    const isHigh = val > secretNum;
    showStatusMsg(`${isHigh ? "🔺" : "🔻"}  To ${isHigh ? "high" : "low"}...`);
    score--;
    scoreEl.textContent = score;
  }
};

checkBtn.addEventListener("click", runGame);

resetBtn.addEventListener("click", init);
