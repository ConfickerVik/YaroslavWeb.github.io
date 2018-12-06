var game = {

  display_game: document.getElementById("canvas-game").getContext("2d"),
  display_main: document.getElementById("canvas-main").getContext("2d"),

  sprites: {
    background: undefined
  },

  start: function () {
    this.sprites.background = new Image();
    this.sprites.background.src = "assets/sprites/background.jpg";

    this.sprites.cat = new Image();
    this.sprites.cat.src = "assets/sprites/cat/stand/Idle(0).png";

    this.run();
    this.resize();
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
    game.display_main.canvas.height = Math.floor(game.display_main.canvas.width * 0.75);

    game.bounding_rectangle = game.display_main.canvas.getBoundingClientRect();

    game.game_output_ratio = game.display_game.canvas.width / game.display_main.canvas.width;
  },

  run: function () {
    this.physics();
    this.render();
    if (device.mobile() || device.tablet()) {
      this.renderButtons(controller.buttons);
    }
    window.requestAnimationFrame(function () {
      game.run();
    });
  },

  physics: function () {

    if (controller.buttons[0].active || inputState.LEFT) {
      cat.velocity_x -= 0.5;
    }

    if (controller.buttons[1].active || inputState.RIGHT) {
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

//MOBILE CONTROLLER
var Button = function (x, y, width, height, color) {

  this.active = false;
  this.color = color;
  this.height = height;
  this.width = width;
  this.x = x;
  this.y = y;

}

Button.prototype = {

  containsPoint: function (x, y) {

    if (x < this.x || x > this.x + this.width || y < this.y || y > this.y + this.width) {

      return false;

    }
    return true;

  }

};
var controller = {

  buttons: [
    new Button(0, 0, 390, 600, "rgb(214,86,43, 0)"), //left
    new Button(410, 0, 390, 600, "rgb(214,86,43, 0)") //right
  ],


  testButtons: function (target_touches) {

    var button, index0, index1, touch;

    for (index0 = this.buttons.length - 1; index0 > -1; --index0) {

      button = this.buttons[index0];
      button.active = false;

      for (index1 = target_touches.length - 1; index1 > -1; --index1) {

        touch = target_touches[index1];

        if (button.containsPoint((touch.clientX - game.bounding_rectangle.left) * game.game_output_ratio, (touch.clientY - game.bounding_rectangle.top) * game.buffer_output_ratio)) {

          button.active = true;
          break;
        }
      }
    }
  },

  touchEnd: function (event) {

    event.preventDefault();
    controller.testButtons(event.targetTouches);

  },

  touchMove: function (event) {

    event.preventDefault();
    controller.testButtons(event.targetTouches);

  },

  touchStart: function (event) {

    event.preventDefault();
    controller.testButtons(event.targetTouches);

  }

};

game.display_main.canvas.addEventListener("touchend", controller.touchEnd, {
  passive: false
});
game.display_main.canvas.addEventListener("touchmove", controller.touchMove, {
  passive: false
});
game.display_main.canvas.addEventListener("touchstart", controller.touchStart, {
  passive: false
});

//MOBILE CONTROLLER

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