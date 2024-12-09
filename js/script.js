/**
 * Sets the display property of an element to either "flex" or "none" to show
 * or hide it.
 * @param {string} elementId - The id of the element to be shown or hidden.
 * @param {boolean} show - If false, the element will be hidden, otherwise it will be shown.
 */
function toggleDisplay(elementId, show) {
  const displayStyle = show ? "flex" : "none";
  document.getElementById(elementId).style.display = displayStyle;
}

/**
 * Hides the game canvas and shows the game over screen.
 * Also clears all active intervals and pauses the background music.
 */
function gameOver() {
  toggleDisplay("canvas", false);
  toggleDisplay("gameover", true);
  clearAllIntervals();
  bg_music.pause();
}

/**
 * Clears all currently active intervals.
 *
 * This is a naive implementation that clears intervals 1 to 9998.
 * It is not guaranteed to work if there are more than 9998 active intervals.
 * However, it is unlikely that there are that many active intervals.
 */
function clearAllIntervals() {
  for (let i = 1; i < 9999; i++) {
    clearInterval(i);
  }
}

/**
 * Hides the game canvas and shows the win screen.
 * Also clears all active intervals and pauses the background music.
 */
function winScreen() {
  endGame();
  toggleDisplay("canvas", false);
  toggleDisplay("win", true);
  toggleDisplay("startscreen", false);
  bg_music.pause();
}

/**
 * Initializes the game by setting up the level and world, and displays the game canvas.
 * It hides the start screen, game over screen, instructions, and policy elements.
 * Also, it sets up the background music to loop with a specified volume and starts playing it.
 */
function startGame() {
  initLevel();
  init();
  toggleDisplay("startscreen", false);
  toggleDisplay("canvas", true);
  toggleDisplay("gameover", false);
  toggleDisplay("instruction2", false);
  toggleDisplay("policyid", false);
  bg_music.loop = true;
  bg_music.volume = 0.01;
  bg_music.play();
}

/**
 * Hides the win and game over screens, and shows the game canvas.
 * Also, it calls the endGame() function to reset the game.
 */
function restartGame() {
  toggleDisplay("win", false);
  toggleDisplay("gameover", false);
  toggleDisplay("canvas", true);
  endGame();
  startGame();
}

/**
 * Navigates to the start menu by hiding the game over, canvas, and win screens,
 * and displaying the start screen, instruction button, sound button, and policy button.
 * Calls the endGame() function to reset the game state.
 */
function goToStartMenu() {
  toggleDisplay("gameover", false);
  toggleDisplay("startscreen", true);
  toggleDisplay("canvas", false);
  toggleDisplay("win", false);
  toggleDisplay("instruction2", true);
  toggleDisplay("soundid", true);
  toggleDisplay("policyid", true);
  endGame();
}

/**
 * Checks if the device is in portrait mode, and if so, displays a warning.
 * If not, hides the warning.
 */
function checkOrientation() {
  const warning = document.getElementById("orientation-warning");
  if (window.matchMedia("(orientation: portrait)").matches) {
    warning.style.display = "flex";
  } else {
    warning.style.display = "none";
  }
}

/**
 * Shows the instructions screen by hiding the start screen and policy elements,
 * and displaying the instruction element.
 */
function showInstructions() {
  toggleDisplay("startscreen", false);
  toggleDisplay("instructionid", true);
  toggleDisplay("impressum", false);
}

/**
 * Hides the instructions screen by displaying the start screen and hiding the instruction element.
 */
function hideInstructions() {
  toggleDisplay("startscreen", true);
  toggleDisplay("instructionid", false);
}

/**
 * Shows the impressum (policy) screen by hiding the start screen and instruction element,
 * and displaying the impressum element.
 */
function showpolicy() {
  toggleDisplay("startscreen", false);
  toggleDisplay("instructionid", false);
  document.getElementById("impressum").style.display = "block";
}

/**
 * Hides the impressum (policy) screen by displaying the start screen and hiding the impressum element.
 */
function hidepolicy() {
  toggleDisplay("startscreen", true);
  document.getElementById("impressum").style.display = "none";
}

window.addEventListener("resize", checkOrientation);
window.addEventListener("orientationchange", checkOrientation);
window.onload = checkOrientation;
