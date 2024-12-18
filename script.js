"use strict";

//constants

const main = document.querySelector("main");
const rock1 = document.querySelector(".rock1");
const paper1 = document.querySelector(".paper1");
const scissors1 = document.querySelector(".scissors1");
const rock2 = document.querySelector(".rock2");
const paper2 = document.querySelector(".paper2");
const scissors2 = document.querySelector(".scissors2");
const score0nmb = document.querySelector(".score--0");
const score1nmb = document.querySelector(".score--1");
const player1Name = document.querySelector(".score-p1");
const player2Name = document.querySelector(".score-p2");

// Scores container constants
const scoresCont = document.querySelector(".scores");
const title = document.querySelector(".dynamic-title");
const playerScore1 = document.querySelector(".player-score1");
const playerScore2 = document.querySelector(".player-score2");

// Buttons

const nextBtn = document.querySelector(".next");
const startBtn = document.querySelector(".start");

// Colors

const pink = "#ff0274";
const green = "#0aff02";
const white = "#fff";
const black = "#000";

// Shaking and winner constants

const shake1 = document.querySelector(".shake1");
const shake2 = document.querySelector(".shake2");
const vsShake = document.querySelector(".vs-shake");
const vsResult = document.querySelector(".vs-result");
const shake1Img = document.querySelector(".shake1 img");
const shake2Img = document.querySelector(".shake2 img");
const winner1 = document.querySelector(".winner1");
const winner2 = document.querySelector(".winner2");
const winner1Img = document.querySelector(".winner1 img");
const winner2Img = document.querySelector(".winner2 img");

//Start page

const startContainer = document.querySelector(".game-start");

const rockImg = document.querySelector(".rock");
const paperImg = document.querySelector(".paper");
const scissorsImg = document.querySelector(".scissors");

// Let's

let name1, name2;

let activePlayer, gameState, score0, score1, choice1, choice2;

let rockChoice1 = "rock";
let rockChoice2 = "rock";
let paperChoice1 = "paper";
let paperChoice2 = "paper";
let scissorsChoice1 = "scissors";
let scissorsChoice2 = "scissors";

// Functions

startBtn.addEventListener("click", function () {
  name1 = document.getElementById("player1").value;
  name2 = document.getElementById("player2").value;

  console.log(name1, name2);

  if (!name1 || !name2) {
    alert("Both players need to write a name");
    return;
  }

  player1Name.textContent = document.getElementById("player1").value;
  player2Name.textContent = document.getElementById("player2").value;
  hideOptions(rockImg, paperImg, scissorsImg, startContainer);
  removeFlex(startContainer);
  showOptions(main);
  startReset();
});

function startReset() {
  activePlayer = 0;
  gameState = true;
  choice1 = 0;
  choice2 = 0;
  score0 = 0;
  score1 = 0;
  score0nmb.textContent = score0;
  score1nmb.textContent = score1;
  title.textContent = `${name1}'s Turn!`;
}

function switchPlayer() {
  if (activePlayer === 0) {
    activePlayer = 1;
    hideOptions(rock1, paper1, scissors1);
    title.textContent = `${name2}'s Turn!`;
  } else {
    activePlayer = 0;
    showOptions(rock1, paper1, scissors1);
    title.textContent = `${name1}'s Turn!`;
  }
}

function hideOptions(...elements) {
  elements.forEach((el) => {
    el.classList.add("hidden");
  });
}

function showOptions(...elements) {
  elements.forEach((el) => {
    el.classList.remove("hidden");
  });
}

function removeFlex(...elements) {
  elements.forEach((el) => {
    el.classList.remove("flex");
  });
}

rock1.addEventListener("click", function () {
  choice1 = rockChoice1;
  console.log(choice1);
  switchPlayer();
});

paper1.addEventListener("click", function () {
  choice1 = paperChoice1;
  console.log(choice1);
  switchPlayer();
});

scissors1.addEventListener("click", function () {
  choice1 = scissorsChoice1;
  console.log(choice1);
  switchPlayer();
});

rock2.addEventListener("click", function () {
  choice2 = rockChoice2;
  console.log(choice2);
  switchPlayer();
  whoWins();
});

paper2.addEventListener("click", function () {
  choice2 = paperChoice2;
  console.log(choice2);
  switchPlayer();
  whoWins();
});

scissors2.addEventListener("click", function () {
  choice2 = scissorsChoice2;
  console.log(choice2);
  switchPlayer();
  whoWins();
});

////////////////////////////////////////////////////////////

// SET BOTH IMAGES TO ROCK FOR THE SHAKING

// function setInitialImages() {
//   shake1Img.src = "images/rock.png";
//   shake2Img.src = "images/rock.png";
// }

function pictureChange() {
  hideOptions(shake1, shake2, vsShake);
  console.log(choice1, choice2);
  if (choice1 === rockChoice1) {
    console.log("Rock");
    winner1Img.src = "images/rock.png";
  } else if (choice1 === paperChoice1) {
    console.log("Paper chosen");
    winner1Img.src = "images/paper.png";
  } else if (choice1 === scissorsChoice1) {
    winner1Img.src = "images/scissors.png";
  }
  if (choice2 === rockChoice2) {
    winner2Img.src = "images/rock.png";
  } else if (choice2 === paperChoice2) {
    winner2Img.src = "images/paper.png";
  } else if (choice2 === scissorsChoice2) {
    winner2Img.src = "images/scissors.png";
  }

  showOptions(winner1, winner2, vsResult);
}

function applyAnimation(element, animation1) {
  element.classList.remove(animation1);
  element.offsetWidth;
  element.classList.add(animation1);
}

// SHOW ACTUAL CHOICES

function winnerAnim() {
  shake1Img.classList.add("animate");
  shake2Img.classList.add("animate");

  title.classList.add("fade-in-down");

  playerScore1.classList.add("fade-in-slow");
  playerScore2.classList.add("fade-in-slow");
  nextBtn.classList.add("fade-in-up");

  winner1.classList.add("fade-in-fast");
  winner2.classList.add("fade-in-fast");

  applyAnimation(title, "fade-in-down");
  applyAnimation(playerScore1, "fade-in-slow");
  applyAnimation(playerScore2, "fade-in-slow");
  applyAnimation(nextBtn, "fade-in-up");

  shake1Img.addEventListener("animationend", () => {
    pictureChange();
  });
}

function whoWins() {
  if (choice1 === choice2) {
    console.log("Draw!");
    title.textContent = "Draw!";
    hideOptions(rock1, paper1, scissors1);
    hideOptions(rock2, paper2, scissors2);
    showOptions(shake1, shake2, vsShake, nextBtn);
    winnerAnim();
  } else if (
    //Rock1 beats scissors
    (choice1 === rockChoice1 && choice2 === scissorsChoice2) ||
    //Scissors1 beat paper
    (choice1 === scissorsChoice1 && choice2 === paperChoice2) ||
    //Paper1 beats rock
    (choice1 === paperChoice1 && choice2 === rockChoice2)
  ) {
    console.log("Player 1 wins");
    score0++;
    score0nmb.textContent = score0;
    title.textContent = `${name1} wins!`;
    hideOptions(rock1, paper1, scissors1);
    hideOptions(rock2, paper2, scissors2);
    showOptions(shake1, shake2, vsShake, nextBtn);
    winnerAnim();
  } else if (
    //Rock2 beats scissors
    (choice2 === rockChoice2 && choice1 === scissorsChoice1) ||
    //Scissors2 beat paper
    (choice2 === scissorsChoice2 && choice1 === paperChoice1) ||
    //Paper2 beats rock
    (choice2 === paperChoice2 && choice1 === rockChoice1)
  ) {
    console.log("Player 2 wins");
    score1++;
    score1nmb.textContent = score1;
    title.textContent = `${name2} wins!`;
    hideOptions(rock1, paper1, scissors1);
    hideOptions(rock2, paper2, scissors2);
    showOptions(shake1, shake2, vsShake, nextBtn);
    winnerAnim();
  }
}
// Buttons

nextBtn.addEventListener("click", function () {
  hideOptions(shake1, shake2, vsShake, winner1, winner2, vsResult, nextBtn);
  showOptions(rock1, paper1, scissors1, rock2, paper2, scissors2);
  title.textContent = `${name1}'s Turn`;
  choice1 = 0;
  choice2 = 0;
  // applyAnimation(scoresCont, "fade-in-down");
});
