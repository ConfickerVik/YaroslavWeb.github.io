var game = {

  dispay_game: document.createElement("canvas").getContext("2d"),
  display_main: document.querySelector("canvas").getContext("2d"),

  sprites: {
    background: undefined,
    cat: undefined
  },


  start: function () {
    this.sprites.background = new Image();
    this.sprites.background.src = "assets/sprites/background.jpg";

    this.sprites.cat = new Image();
    this.sprites.cat.src = "assets/sprites/cat/stand/Idle(0).png";

    this.run();
  },


  render: function () {
    this.display_main.drawImage(this.dispay_game.canvas, 0, 0, this.dispay_game.canvas.width, this.dispay_game.canvas.height, 0, 0, this.display_main.canvas.width, this.display_main.canvas.height);
    this.dispay_game.drawImage(this.sprites.background, 0, 0, game.dispay_game.canvas.width, game.dispay_game.canvas.height);

    //sprites
    this.dispay_game.drawImage(this.sprites.cat, 10, 415, 95, 115);
  },
  resize: function () {
    game.display_main.canvas.width = Math.floor(document.documentElement.clientWidth - 32);
    if (game.display_main.canvas.width > document.documentElement.clientHeight) {
      game.display_main.canvas.width = Math.floor(document.documentElement.clientHeight);
    };
    game.display_main.canvas.height = Math.floor(game.display_main.canvas.width * 0.625);
  },

  run: function () {
    this.resize();
    this.render();

    window.requestAnimationFrame(function () {
      game.run();
    });
  }
};

window.addEventListener("load", function () {
  game.start();
});

game.dispay_game.canvas.height = 600;
game.dispay_game.canvas.width = 800;




Button = function (x, y, width, height, color) {

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

var Controller = {


    buttons: [

      new Button(0, 160, 120, 120, "#f09000"),
      new Button(380, 160, 120, 120, "#0090f0"),
      new Button(520, 160, 120, 120, "#0090f0")

    ],

    testButtons: function (target_touches) {

      var button, index0, index1, touch;

      for (index0 = this.buttons.length - 1; index0 > -1; --index0) {

        button = this.buttons[index0];
        button.active = false;

        for (index1 = target_touches.length - 1; index1 > -1; --index1) {

          touch = target_touches[index1];

          if (button.containsPoint((touch.clientX - display.bounding_rectangle.left) * display.buffer_output_ratio, (touch.clientY - display.bounding_rectangle.top) * display.buffer_output_ratio)) {

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