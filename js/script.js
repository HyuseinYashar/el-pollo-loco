function toggleDisplay(elementId, show) {
  const displayStyle = show ? "flex" : "none";
  document.getElementById(elementId).style.display = displayStyle;
}

function gameOver() {
  toggleDisplay("canvas", false);
  toggleDisplay("gameover", true);
  clearAllIntervals();
  bg_music.pause();
}

function clearAllIntervals() {
    for (let i = 1; i < 9999; i++) {
        clearInterval(i);
    }
}

function winScreen() {
  endGame();
  toggleDisplay("canvas", false);
  toggleDisplay("win", true);
  toggleDisplay("startscreen", false);
  bg_music.pause();
}

function startGame() {
  initLevel();
  init();
  toggleDisplay("startscreen", false);
  toggleDisplay("canvas", true);
  toggleDisplay("gameover", false);
  toggleDisplay("instruction2", false);
  toggleDisplay("policyid", false);
  bg_music.loop = true;
  bg_music.volume = 0.1;
  bg_music.play();
}

function restartGame() {
  toggleDisplay("win", false);
  toggleDisplay("gameover", false);
  toggleDisplay("canvas", true);
  endGame();
}

function goToStartMenu() {
  toggleDisplay("gameover", false);
  toggleDisplay("startscreen", true);
  toggleDisplay("canvas", false);
  toggleDisplay("win", false);
  toggleDisplay("instruction2", true);
  toggleDisplay("policyid", true);
}

function checkOrientation() {
  const warning = document.getElementById("orientation-warning");
  if (window.matchMedia("(orientation: portrait)").matches) {
    warning.style.display = "flex";
  } else {
    warning.style.display = "none";
  }
}

function showInstructions() {
  toggleDisplay("startscreen", false);
  toggleDisplay("instructionid", true);
  toggleDisplay("impressum", false);
}

function hideInstructions() {
  toggleDisplay("startscreen", true);
  toggleDisplay("instructionid", false);
}

function showpolicy() {
  toggleDisplay("startscreen", false);
  toggleDisplay("instructionid", false);
  document.getElementById("impressum").style.display = "block";
}

function hidepolicy() {
  toggleDisplay("startscreen", true);
  document.getElementById("impressum").style.display = "none";
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
window.onload = checkOrientation;
