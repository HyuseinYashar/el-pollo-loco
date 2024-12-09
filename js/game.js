let canvas;
let world;
let keyboard = new Keyboard();
let soundMuted = false;
const originalPlay = Audio.prototype.play;
let bg_music = new Audio("audio/bg_music.mp3");

/**
 * Initializes the game by setting up mobile controls and getting references to the HTML canvas
 * element and the World instance.
 */
function init() {
  keyboard.mobileControl();
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

document.addEventListener("keydown", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = true;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = true;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = true;
  }
  if (e.keyCode == 38) {
    keyboard.UP = true;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = true;
  }
  if (e.keyCode == 68) {
    keyboard.D = true;
  }
});
document.addEventListener("keyup", (e) => {
  if (e.keyCode == 39) {
    keyboard.RIGHT = false;
  }
  if (e.keyCode == 37) {
    keyboard.LEFT = false;
  }
  if (e.keyCode == 40) {
    keyboard.DOWN = false;
  }
  if (e.keyCode == 38) {
    keyboard.UP = false;
  }
  if (e.keyCode == 32) {
    keyboard.SPACE = false;
  }
  if (e.keyCode == 68) {
    keyboard.D = false;
  }
});

/**
 * Overwrites the default Audio.prototype.play function to not play the audio if the sound is muted.
 * @this Audio
 * @returns {void}
 */
Audio.prototype.play = function () {
  if (!soundMuted) {
    return originalPlay.call(this);
  }
};

/**
 * Ends the game by setting the gameOver flag to true, pausing the background music,
 * and clearing all active intervals. This function effectively halts the game state.
 */
function endGame() {
  world.gameOver = true;
  try {
    bg_music.pause();
  } catch (error) {console.log(error);
  }
  clearAllIntervals();
  // startGame();
}

/**
 * Toggles the sound on or off. If the sound is muted, the sound icon in the footer will be
 * replaced with the muted icon. If the sound is not muted, the sound icon in the footer will
 * be replaced with the normal icon. The state of the sound is stored in local storage.
 */
function mute() {
  const soundIcon = document.getElementById("soundid");
  soundMuted = !soundMuted;
  localStorage.setItem("soundMuted", JSON.stringify(soundMuted));
  if (soundMuted) {
    soundIcon.src = "img/icons/soundoff.png";
  } else {
    soundIcon.src = "img/icons/soundon.png";
  }
}

/**
 * Initializes the game body by hiding the canvas, pausing the background music,
 * and setting the sound icon in the footer to the correct state based on the
 * value stored in local storage. If the sound is muted, the sound icon in the footer
 * will be replaced with the muted icon. If the sound is not muted, the sound icon
 * in the footer will be replaced with the normal icon.
 */
function initBody() {
  document.getElementById("canvas").style.display = "none";
  try {
    bg_music.pause();
  } catch (error) {console.log(error);
  }
  soundMuted = JSON.parse(localStorage.getItem("soundMuted")) || false;
  const soundIcon = document.getElementById("soundid");
  if (soundMuted) {
    soundIcon.src = "img/icons/soundoff.png";
  } else {
    soundIcon.src = "img/icons/soundon.png";
  }
}
