var game = {

  display_game: document.createElement("canvas").getContext("2d"),
  display_main: document.querySelector("canvas").getContext("2d"),

  sprites: {
    background: undefined
  },

  start: function () {
    this.sprites.background = new Image();
    this.sprites.background.src = "assets/sprites/background.jpg";

    this.sprites.cat = new Image();
    this.sprites.cat.src = "assets/sprites/cat/stand/Idle(0).png";

    this.run();
  },

  render: function () {
    this.display_main.drawImage(this.display_game.canvas, 0, 0, this.display_game.canvas.width, this.display_game.canvas.height, 0, 0, this.display_main.canvas.width, this.display_main.canvas.height);
    this.display_game.drawImage(this.sprites.background, 0, 0, game.display_game.canvas.width, game.display_game.canvas.height);

    //sprites
    this.display_game.drawImage(this.sprites.cat, cat.x, cat.y, cat.width, cat.height);
  },


  renderButtons: function (buttons) {
    var button, index;

    this.display_game.fillStyle = "rgb(214,86,43,0)";
    this.display_game.fillRect(0, 0, this.display_game.canvas.width, this.display_game.canvas.height);

    for (index = buttons.length - 1; index > -1; --index) {

      button = buttons[index];

      this.display_game.fillStyle = button.color;
      this.display_game.fillRect(button.x, button.y, button.width, button.height);
    }
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

    if (inputState.LEFT) {
      cat.velocity_x -= 0.5;
    }

    if (inputState.RIGHT) {
      cat.velocity_x += 0.5;
    }

    // simulate friction:
    cat.velocity_x *= 0.9;
    cat.x += cat.velocity_x;
    if (cat.x < -80) {
      cat.x = this.display_game.canvas.width;
    } else if (cat.x > this.display_game.canvas.width) {
      cat.x = -80;
    }
  }
};
window.addEventListener("load", function () {
  game.start();
  game.resize();
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
  velocity_x: 0
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