function generateRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function getInnerText(id) {
  return document.getElementById(id).innerText;
}

function setInnerText(id, value) {
  document.getElementById(id).innerText = value;
}
function addClass(id, className) {
  document.getElementById(id).classList.add(className);
}
function removeClass(id, className) {
  document.getElementById(id).classList.remove(className);
}
function removeBg() {
  const currLetter = getInnerText("displayLetter").toLowerCase();
  removeClass(currLetter, "bg-yellow-400");
}

function startGame() {
  // display random Letter
  const alphaStr = "abcdefghijklmnopqrstuvwxyz/";
  const alphArr = alphaStr.split("");
  const letterToShow = alphArr[generateRandomNum(0, alphArr.length - 1)];
  if (letterToShow === "/") {
    setInnerText("displayLetter", letterToShow);
  } else {
    setInnerText("displayLetter", letterToShow.toUpperCase());
  }
  //  change corresponding bg of key from Keyboard
  addClass(letterToShow, "bg-yellow-400");
}

function play() {
  addClass("home", "hidden");
  removeClass("playground", "hidden");
  startGame();
}
function playAgain() {
  removeBg();
  addClass("scoreSection", "hidden");
  removeClass("playground", "hidden");
  startGame();
}

function gameOver(score) {
  setInnerText("finalScore", score);
  setInnerText("scoreCount", 0);
  setInnerText("lifeCount", 2);
  addClass("playground", "hidden");
  removeClass("scoreSection", "hidden");
}

document.addEventListener("keyup", (event) => {
  console.log(event.key);
  const hasClass = document.getElementById("home").classList.contains("hidden");
  if (!hasClass && event.key === "Enter") {
    play();
  }
  const getLetter = getInnerText("displayLetter");
  let score = getInnerText("scoreCount");
  let life = parseInt(getInnerText("lifeCount"));
  if (event.key === "Escape") {
    gameOver(score);
  } else if (event.key === getLetter.toLowerCase()) {
    score++;
    setInnerText("scoreCount", score);
    removeBg();
    startGame();
  } else {
    life--;
    setInnerText("lifeCount", life);
    removeBg();
    if (life < 1) {
      gameOver(score);
    }
    startGame();
  }
});
