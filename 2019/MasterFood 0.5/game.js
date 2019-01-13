//DISPLAY settings
var canvas = document.getElementById('canvas'),
  ctx = canvas.getContext('2d'),
  //canvas and game  width and height
  WIDTH = 1280,
  HEIGHT = 720,
  CANVAS_WIDTH = 1280,
  CANVAS_HEIGHT = 720;
//canvas and game  width and height

var resizeCanvas = function () {
  CANVAS_WIDTH = window.innerWidth - 48;
  CANVAS_HEIGHT = window.innerHeight - 5;

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

//BACkGORUND ASSETS


var game = {

  time: 0,
  score: 0,
  background: undefined,
  item: [],
  goodfood: [],
  badfood: [],

  cat: {
    x: 10,
    y: 475,
    width: 160,
    height: 160,
    jumping: false,
    health: {
      img: [],
      hp: 0
    },
    velocity_x: 0,
    velocity_y: 0,
    anim0: 0,
    anim1: 0,
    state: []
  },

  start: function () {

    this.background = new Image();
    this.background.src = "assets/sprites/background.png";

    $('.score').html(game.score);

    //CAT ASSETS
    for (var i = 0, m = 4; i < m; i++) {
      game.cat.state[i] = [];
    }
    for (var i = 0; i < 9; i++) {
      game.cat.state[0][i] = new Image();
      game.cat.state[0][i].src = 'assets/sprites/cat0/stand/Idle(' + i + ').png';
    }
    for (var i = 0; i < 8; i++) {
      game.cat.state[1][i] = new Image(); //run left
      game.cat.state[2][i] = new Image(); //run right
     // game.cat.state[3][i] = new Image(); //jump right
      game.cat.state[1][i].src = 'assets/sprites/cat0/run/left/Run(' + i + ').png';
      game.cat.state[2][i].src = 'assets/sprites/cat0/run/right/Run(' + i + ').png';
      //game.cat.state[3][i].src = 'assets/sprites/cat0/jump/Jump (' + i + ').png';
    }
    //CAT ASSETS
    //FOOD ASSETS
    for (var i = 0; i <= 6; i++) {
      this.item[i] = new Image();
      this.item[i].src = 'assets/sprites/food/food' + i + '.png';
    }
    //FOOD ASSETS

    //HitPoints ASSETS
    for (var i = 0; i <= 4; i++) {
      this.cat.health.img[i] = new Image();
      this.cat.health.img[i].src = 'assets/sprites/HitPoint/HP' + i + '.png';
    }
    //HitPoints ASSETS

  },

  render: function () {
    //draw background

    ctx.drawImage(this.background, 0, 0, WIDTH, HEIGHT);

    //draw cat
    ctx.drawImage(game.cat.state[game.cat.anim0][game.cat.anim1], game.cat.x, game.cat.y, game.cat.width, game.cat.height);

    //draw HP
    ctx.drawImage(game.cat.health.img[game.cat.health.hp], 10, 625, 100, 100);

    //draw food
    for (i in game.goodfood) {
      ctx.drawImage(game.goodfood[i].img, game.goodfood[i].x, game.goodfood[i].y, 35, 40);
    }
    for (i in game.badfood) {
      ctx.drawImage(game.badfood[i].img, game.badfood[i].x, game.badfood[i].y, 35, 45);
    }
    //ctx.fillRect(0, 0, WIDTH, HEIGHT)
    //ctx.fillStyle = "rgb(25,100,0, 0.1)"
  },

  updatePlayer: function () {
    //CAT CONFIGURATION
    //button presses
    if (inputState.RIGHT || button1) moveRight();
    else if (inputState.LEFT || button2) moveLeft();
    else stand();
    
    if(inputState.JUMP && game.cat.jumping == false) jump();

  /* Jump animation
    if(game.cat.jumping){
      if (game.cat.anim1 >= 7) {
        game.cat.anim1 = 0;
      }
      game.cat.anim0 = 3;

      if(game.time % 8 == 0){
        game.cat.anim1++;
      }
    }*/

    //Cat jump
    function jump() {
      game.cat.velocity_y = -30;
      //game.cat.anim1 = 0;
      game.cat.jumping = true;
    }

    //Cat idle
    function stand() {
      if (game.time % 8 == 0) {
        game.cat.anim0 = 0;
        game.cat.anim1++;
        if (game.cat.anim1 == 9)
          game.cat.anim1 = 0
      }
    }

    //CAT move left
    function moveLeft() {
      game.cat.velocity_x -= 0.6;

      if (game.cat.anim1 >= 7) {
        game.cat.anim1 = 0;
      }
      game.cat.anim0 = 1;
      if (game.time % 4 == 0) {
        game.cat.anim1++;
        if (game.cat.anim1 == 7)
          game.cat.anim1 = 0
      }
    }
    //CAT move right
    function moveRight() {
      game.cat.velocity_x += 0.6;

      if (game.cat.anim1 >= 7) {
        game.cat.anim1 = 0;
      }
      game.cat.anim0 = 2;
      if (game.time % 4 == 0) {
        game.cat.anim1++;
        if (game.cat.anim1 == 7)
          game.cat.anim1 = 0
      }
    }

    // simulate friction:
    game.cat.velocity_x *= 0.91;
    game.cat.x += game.cat.velocity_x;

    game.cat.velocity_y *= 0.9;
    game.cat.y += game.cat.velocity_y;
    //gravity
    if (game.cat.y + game.cat.height > 640) {
      game.cat.y = 640 - game.cat.height;
      game.cat.jumping = false;
    }
    game.cat.velocity_y += 1.4;

    //behind the screen
    if (game.cat.x > 1250)
      game.cat.x = -110;
    if (game.cat.x < -110)
      game.cat.x = 1250;
    //CAT CONFIGURATION

  },
  updateItems: function () {
    //FOOD
    if (game.time % 90 == 0) { //good FOOD
      game.goodfood.push({
        x: getRandomInt(20, 1240),
        y: -50,
        img: game.item[getRandomInt(0, 4)],
        dmg: 0
      });
    }
    if (game.time % 360 == 0) { //bad Food
      game.badfood.push({
        x: getRandomInt(20, 1240),
        y: -50,
        img: game.item[getRandomInt(4, 7)],
        dmg: 1
      });
    }

    //interaction
    for (i in game.goodfood) {
      game.goodfood[i].y += 2;
      //border
      if (game.goodfood[i].y >= 710) game.goodfood.splice(i, 1);

      if (Math.abs(game.goodfood[i].x - game.cat.x - 45) < 50 && Math.abs(game.goodfood[i].y - game.cat.y - 40) < 30) {
        game.goodfood.splice(i, 1);
        game.score++;
        $('.score').html(game.score);
        if (Sounds) eating.play();
      }
    }
    for (i in game.badfood) {
      game.badfood[i].y += 2;
      //border
      if (game.badfood[i].y >= 710) game.badfood.splice(i, 1);

      if (Math.abs(game.badfood[i].x - game.cat.x - 45) < 50 && Math.abs(game.badfood[i].y - game.cat.y - 40) < 30) {
        game.badfood.splice(i, 1);
        game.cat.health.hp++;
        if (game.cat.health.hp == 4) {
          game.cat.health.hp = 0;
          game.score = 0;
          $('.score').html(game.score);
        }
        if (Sounds) meow.play();
      }
    }
    //FOOD
  },
  update: function () {
    this.time++;
    game.updatePlayer();
    game.updateItems();
  },

  run: function () {
    // game loop
    let last = performance.now(),
      step = 1 / 60, // update should be called 60 times per second
      dt = 0,
      now;

    let frame = () => {
      now = performance.now();
      dt += (now - last) / 1000;
      while (dt > step) {
        dt = dt - step;
        this.update(step);
      }
      last = now;

      this.render();
      requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
  }
};
window.addEventListener("load", function () {
  game.start();
  $('.startGame').click(function () {
    game.run();
    resizeCanvas();
  });
});
window.addEventListener("resize", function () {
  resizeCanvas();
});

//RANDOM NUMBER GENERATOR
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//RANDOM NUMBER GENERATOR




