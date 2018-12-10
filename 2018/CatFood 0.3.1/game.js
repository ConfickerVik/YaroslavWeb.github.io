var game = {

  display_game: document.createElement("canvas").getContext("2d"),
  display_main: document.querySelector("canvas").getContext("2d"),
  time: 0,

  sprites: {
    background: undefined,
    catSprite: undefined
  },

  start: function () {
    //BACkGORUND ASSETS
    this.sprites.background = new Image();
    this.sprites.background.src = "assets/sprites/background.jpg";

    //CAT ASSETS
    for (var i = 0, m = 3; i < m; i++) {
      cat.sprites[i] = [];
      for (var j = 0, n = 9; j < n; j++) {
        cat.sprites[i][j] = 0;
      }
    }
    for (var i = 0; i < 9; i++) {
      cat.sprites[0][i] = new Image();
      cat.sprites[0][i].src = 'assets/sprites/cat/stand/Idle(' + i + ').png';
    }
    for (var i = 0; i < 8; i++) {
      cat.sprites[1][i] = new Image();
      cat.sprites[2][i] = new Image();
      cat.sprites[1][i].src = 'assets/sprites/cat/run/left/Run(' + i + ').png';
      cat.sprites[2][i].src = 'assets/sprites/cat/run/right/Run(' + i + ').png';
    }


    this.run();
  },

  render: function () {
    this.display_main.drawImage(this.display_game.canvas, 0, 0, this.display_game.canvas.width, this.display_game.canvas.height, 0, 0, this.display_main.canvas.width, this.display_main.canvas.height);
    this.display_game.drawImage(this.sprites.background, 0, 0, game.display_game.canvas.width, game.display_game.canvas.height);

    //sprites
    this.display_game.drawImage(cat.sprites[cat.anim0][cat.anim1], cat.x, cat.y, cat.width, cat.height);
  },

  resize: function () {
    game.display_main.canvas.width = Math.floor(document.documentElement.clientWidth - 16);
    if (game.display_main.canvas.width > document.documentElement.clientHeight) {
      game.display_main.canvas.width = Math.floor(document.documentElement.clientHeight);
    };
    game.display_main.canvas.height = Math.floor(game.display_main.canvas.width * 0.65);

    game.game_output_ratio = game.display_game.canvas.width / game.display_main.canvas.width;
  },

  run: function () {
    this.physics();
    this.render();
    window.requestAnimationFrame(function () {
      game.run();
    });
  },

  physics: function () {
    this.time++;
    //IDLE
    if (inputState.RIGHT == false && inputState.LEFT == false) {
      cat.anim0 = 0;
      if (this.time % 6 == 0) {
        cat.anim1++;
        if (cat.anim1 == 9)
          cat.anim1 = 0
      }
    }
    //MOVE LEFT
    if (inputState.LEFT) {
      if (cat.anim1 < 9 && cat.anim1 > 6) {cat.anim1 = 0;}

      cat.anim0 = 1;
      cat.velocity_x -= 0.5;
      if (this.time % 4 == 0) {
        cat.anim1++;
        if (cat.anim1 == 7)
          cat.anim1 = 0
      }
    }

    //MOVE RIGHT
    if (inputState.RIGHT) {
      if (cat.anim1 < 9 && cat.anim1 > 6) {cat.anim1 = 0;}

      cat.anim0 = 2;
      cat.velocity_x += 0.5;
      if (this.time % 4 == 0) {
        cat.anim1++;
        if (cat.anim1 == 7)
          cat.anim1 = 0
      }
    }

    // simulate friction:
    cat.velocity_x *= 0.9;
    cat.x += cat.velocity_x;

    //behind the screen
    if (cat.x > 780)
      cat.x = -70;
    if (cat.x < -70)
      cat.x = 780;
  }
};
window.addEventListener("load", function () {
  game.resize();
  $('.startGame').click(function () {
    game.start();
  });
});
window.addEventListener("resize", game.resize);


//canvas width and height
game.display_game.canvas.height = 600;
game.display_game.canvas.width = 800;
//canvas width and height


//Character and Items
cat = {
  x: 10,
  y: 420,
  width: 95,
  height: 110,
  sliding: true,
  velocity_x: 0,
  anim0: 0,
  anim1: 0,
  sprites: []
}
//Character and Items

//KEYBOARD CONTROLLER
var inputState = {
  RIGHT: false,
  LEFT: false
}

var setKeyState = function (keyCode, isPressed) {
  switch (keyCode) {
    case 39:
    case 68:
      inputState.RIGHT = isPressed;
      break;
    case 37:
    case 65:
      inputState.LEFT = isPressed;
      break;
  }
};
var keydownHandler = (e) => {
  setKeyState(e.which, true);
};
var keyupHandler = (e) => {
  setKeyState(e.which, false);
};

document.addEventListener('keydown', keydownHandler);
document.addEventListener('keyup', keyupHandler);
//KEYBOARD CONTROLLER