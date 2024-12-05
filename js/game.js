let canvas;
let world;
let keyboard = new Keyboard();
let soundMuted = false;
bg_chicken = new Audio("audio/bg_chikens.mp3");
bg_music = new Audio("audio/bg_music.mp3");
const originalPlay = Audio.prototype.play;

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
}

function startGame() {}

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

function init() {
  canvas = document.getElementById("canvas");
  world = new World(canvas, keyboard);
  bg_music.loop = true;
  bg_music.volume = 0.01;

  if (!soundMuted) {
    bg_music.play();
  }
}

function endGame() {
  world.gameOver = true;
  bg_music.pause();
  clearAllIntervals();
  startGame();
}

function mute() {
  const soundIcon = document.getElementById("soundid");
  const startscreen = document.getElementById("startscreen");
  soundMuted = !soundMuted;
  localStorage.setItem("soundMuted", JSON.stringify(soundMuted));
  if (soundMuted) {
    bg_music.pause();
    soundIcon.src = "img/icons/soundoff.png";
  } else {
    if (startscreen.style.display !== "flex") {
      bg_music.play();
    }
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
