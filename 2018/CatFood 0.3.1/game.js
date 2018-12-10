var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  //canvas and game  width and height
  WIDTH = 800,
  HEIGHT = 600,
  CANVAS_WIDTH = 800,
  CANVAS_HEIGHT = 600;
//canvas and game  width and height

var resizeCanvas = function () {
  CANVAS_WIDTH = window.innerWidth - 32;
  CANVAS_HEIGHT = window.innerHeight - 4;

var ratio = 16/9
  if (CANVAS_HEIGHT < CANVAS_WIDTH)
    CANVAS_WIDTH = CANVAS_HEIGHT * ratio
  else
    CANVAS_HEIGHT = CANVAS_WIDTH / ratio

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  canvas.style.width = '' + CANVAS_WIDTH + 'px';
  canvas.style.height = '' + CANVAS_HEIGHT + 'px';
}

var game = {

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
    ctx.drawImage(this.sprites.background, 0, 0, WIDTH, HEIGHT);

    //sprites
    ctx.drawImage(cat.sprites[cat.anim0][cat.anim1], cat.x, cat.y, cat.width, cat.height);
  },


  run: function () {
    resizeCanvas();
    this.physics();
    this.render();
    window.requestAnimationFrame(function () {
      game.run();
    });
  },

  physics: function () {
    this.time++;
    //button presses
    if (inputState.RIGHT) moveRight();
    else if (inputState.LEFT) moveLeft();
    else stand();
    //Cat idle
    function stand() {
      if (game.time % 6 == 0) {
        cat.anim0 = 0;
        cat.anim1++;
        if (cat.anim1 == 9)
          cat.anim1 = 0
      }
    }
    //CAT move left
    function moveLeft() {
      if (cat.anim1 < 9 && cat.anim1 > 6) {
        cat.anim1 = 0;
      }
      cat.anim0 = 1;
      cat.velocity_x -= 0.5;
      if (game.time % 5 == 0) {
        cat.anim1++;
        if (cat.anim1 == 7)
          cat.anim1 = 0
      }
    }
    //CAT move right
    function moveRight() {
      if (cat.anim1 < 9 && cat.anim1 > 6) {
        cat.anim1 = 0;
      }
      cat.anim0 = 2;
      cat.velocity_x += 0.5;
      if (game.time % 5 == 0) {
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
  $('.startGame').click(function () {
    game.start();
  });
});
window.addEventListener("resize", function(){
  resizeCanvas();
});





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