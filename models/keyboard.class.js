class Keyboard {
  LEFT = false;
  RIGHT = false;
  SPACE = false;
  UP = false;
  DOWN = false;
  D = false;

  mobileControl() {
    document.getElementById("leftbtn").addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        this.LEFT = true;
      },
      { passive: false }
    );

    document.getElementById("leftbtn").addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        this.LEFT = false;
      },
      { passive: false }
    );

    document.getElementById("rightbtn").addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        this.RIGHT = true;
      },
      { passive: false }
    );

    document.getElementById("rightbtn").addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        this.RIGHT = false;
      },
      { passive: false }
    );

    document.getElementById("jumpbtn").addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        this.SPACE = true;
      },
      { passive: false }
    );

    document.getElementById("jumpbtn").addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        this.SPACE = false;
      },
      { passive: false }
    );

    document.getElementById("throwbtn").addEventListener(
      "touchstart",
      (e) => {
        e.preventDefault();
        this.D = true;
      },
      { passive: false }
    );

    document.getElementById("throwbtn").addEventListener(
      "touchend",
      (e) => {
        e.preventDefault();
        this.D = false;
      },
      { passive: false }
    );
  }
}
