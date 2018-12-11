//DISPLAY settings
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

  var ratio = 16 / 9
  if (CANVAS_HEIGHT < CANVAS_WIDTH)
    CANVAS_WIDTH = CANVAS_HEIGHT * ratio
  else
    CANVAS_HEIGHT = CANVAS_WIDTH / ratio

  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  canvas.style.width = '' + CANVAS_WIDTH + 'px';
  canvas.style.height = '' + CANVAS_HEIGHT + 'px';

  bounding_rectangle = canvas.getBoundingClientRect();
};
//DISPLAY settings

//MUSIC AND SOUNDS
var eat = new Audio('assets/sounds/eat.mp3');
eat.volume = 0.01;
//BACkGORUND ASSETS


var game = {

  time: 0,
  score: 0,
  background: undefined,
  item: [], //food
  food: [],

  start: function () {

    this.background = new Image();
    this.background.src = "assets/sprites/background.jpg";

    $('.score').html(game.score);

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
    //CAT ASSETS
    //FOOD ASSETS
    for (var i = 1; i <= 5; i++) {
      this.item[i] = new Image();
      this.item[i].src = 'assets/sprites/food/food' + i + '.png';
    }
    //FOOD ASSETS

    
    this.run();
  },

  render: function () {
    //draw background
    ctx.drawImage(this.background, 0, 0, WIDTH, HEIGHT);

    //draw cat
    ctx.drawImage(cat.sprites[cat.anim0][cat.anim1], cat.x, cat.y, cat.width, cat.height);

    //draw food
    for (i in game.food) {
      ctx.drawImage(game.food[i].img, game.food[i].x, game.food[i].y, 25, 33);
    }
  },

  update: function () {
    this.time++;
    //CAT CONFIGURATION
    //button presses
    if (inputState.RIGHT || button1) moveRight();
    else if (inputState.LEFT || button2) moveLeft();
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
    //CAT CONFIGURATION

    //FOOD
    if (game.time % 60 == 0) {
      game.food.push({
        x: getRandomInt(20, 760),
        y: -100,
        img: game.item[getRandomInt(1, 6)]
      });
    }

    //interaction
    for (i in game.food) {
      game.food[i].y += 2;
      //border
      if (game.food[i].y >= 600) game.food.splice(i, 1);

      if (Math.abs(cat.x + 50 - (game.food[i].x + 12)) < 45 && Math.abs(cat.y + 40 - game.food[i].y) < 40) {
        game.food[i].del = 1;
      }
      if (game.food[i].del == 1) {
        game.food.splice(i, 1);
        game.score++;
        $('.score').html(game.score);
        eat.play();
      }
    }
    //FOOD
  },

  run: function () {
    this.update();
    this.render();
    window.requestAnimationFrame(function () {
      game.run();
    });
  }
};
window.addEventListener("load", function () {
  $('.startGame').click(function () {
    game.start();
    resizeCanvas();
  });
});
window.addEventListener("resize", function () {
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

//MOBILE CONTROLLER
var button1, button2;

var el = document.getElementsByTagName('body')[0];

  el.addEventListener("touchstart", handler, false);
  el.addEventListener("touchend", handleEnd, false);
  el.addEventListener("touchmove", handler, false);

function handler(e) {
    button2 = !(button1 = (window.innerWidth / 2) < e.changedTouches[0].pageX);
};
function handleEnd(e) {
  var touches = e.changedTouches;
  if (window.innerWidth / 2 < touches[0].pageX)
    button1 = false;
  button2 = false;
  if (window.innerWidth / 2 > touches[0].pageX) {
    button2 = false;
    button1 = false
  }
};
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

//RANDOM NUMBER GENERATOR
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//RANDOM NUMBER GENERATOR