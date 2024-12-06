let canvas;
let world;
let keyboard = new Keyboard();
let soundMuted = false;
const originalPlay = Audio.prototype.play;
let bg_music = new Audio('audio/bg_music.mp3');


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

Audio.prototype.play = function () {
  if (!soundMuted) {
    return originalPlay.call(this);
  }
};

function endGame() {
  world.gameOver = true;
  bg_music.pause();
  clearAllIntervals();
  // startGame();
}

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

function initBody() {
  document.getElementById("canvas").style.display = "none";
  bg_music.pause();
  soundMuted = JSON.parse(localStorage.getItem("soundMuted")) || false;
  const soundIcon = document.getElementById("soundid");
  if (soundMuted) {
    soundIcon.src = "img/icons/soundoff.png";
  } else {
    soundIcon.src = "img/icons/soundon.png";
  }
}
