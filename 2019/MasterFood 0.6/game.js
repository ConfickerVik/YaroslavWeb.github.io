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
  CANVAS_WIDTH = window.innerWidth - 64;
  CANVAS_HEIGHT = window.innerHeight - 16;

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

var game = {
  pause: false,
  time: 0,
  score: 0,
  bestScore:0,
  score_x: 1190,
  background: undefined,
  item: [],
  goodfood: [],
  badfood: [],
  menu: [],

  cat: {
    x: 10,
    y: 475,
    width: 160,
    height: 160,
    jumping: false,
    slidingLeft: false,
    slidingRight: false,
    slidingTimer: true,
    slidingColisionY: 65,
    lastMoveRight: true,
    lastMoveLeft: false,
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
    for (var i = 0, m = 5; i < m; i++) {
      game.cat.state[i] = [];
    }
    for (var i = 0; i < 9; i++) {
      game.cat.state[0][i] = new Image();
      game.cat.state[0][i].src = 'assets/sprites/cat0/stand/Idle(' + i + ').png';
    }
    for (var i = 0; i < 8; i++) {
      game.cat.state[1][i] = new Image(); //run left
      game.cat.state[2][i] = new Image(); //run right
      game.cat.state[3][i] = new Image(); //slide left
      game.cat.state[4][i] = new Image(); //slide right

      game.cat.state[1][i].src = 'assets/sprites/cat0/run/left/Run(' + i + ').png';
      game.cat.state[2][i].src = 'assets/sprites/cat0/run/right/Run(' + i + ').png';
      game.cat.state[3][i].src = 'assets/sprites/cat0/slide/Left/Slide (' + i + ').png';
      game.cat.state[4][i].src = 'assets/sprites/cat0/slide/Right/Slide (' + i + ').png';
    }
    //CAT ASSETS

    //FOOD ASSETS
    for (var i = 0; i <= 6; i++) {
      game.item[i] = new Image();
      game.item[i].src = 'assets/sprites/food/food' + i + '.png';
    }

    //HitPoints ASSETS
    for (var i = 0; i <= 4; i++) {
      game.cat.health.img[i] = new Image();
      game.cat.health.img[i].src = 'assets/sprites/HitPoint/HP' + i + '.png';
    }

  },

  restart: function(){
    game.score = 0;
  },

  render: function () {
    //draw background
    ctx.drawImage(game.background, 0, 0, WIDTH, HEIGHT);

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

    //render score
    ctx.font = "120px Bahnschrift";
    ctx.fillStyle = 'rgb(240, 248, 255, 0.85)';
    ctx.fillText(game.score, game.score_x, 100);

  },

  updatePlayer: function () {

    //Cat CONFIGURATION

    //Button presses
    if (inputState.RIGHT || button1) moveRight();
    else if (inputState.LEFT || button2) moveLeft();
    else stand();

    if ((inputState.JUMP || button3) && game.cat.jumping == false && game.cat.slidingLeft == false && game.cat.slidingRight == false) jump();
    if ((inputState.SLIDE && inputState.LEFT && game.cat.slidingLeft == false && game.cat.slidingTimer) || (button5 && game.cat.lastMoveLeft)) slideLeft();
    if ((inputState.SLIDE && game.cat.slidingRight == false && game.cat.slidingTimer) || (button4 && game.cat.lastMoveRight)) slideRight();

    //Cat slide
    function slideLeft() {
      game.cat.velocity_x = -35;
      game.cat.slidingLeft = true;
      game.cat.slidingTimer = false;
    };

    function slideRight() {
      game.cat.velocity_x = 35;
      game.cat.slidingRight = true;
      game.cat.slidingTimer = false;
    };

    if (game.cat.slidingLeft) {
      if (game.cat.anim1 >= 7) {
        game.cat.anim1 = 0;
      }
      game.cat.anim0 = 3;
      if (game.time % 5 == 0) game.cat.anim1++;
    };

    if (game.cat.slidingRight) {
      if (game.cat.anim1 >= 7) {
        game.cat.anim1 = 0;
      }
      game.cat.anim0 = 4;
      if (game.time % 5 == 0) game.cat.anim1++;
    };

    if (game.cat.velocity_x > -2 && game.cat.slidingLeft == true) {
      game.cat.slidingLeft = false;
      setTimeout(slideTimerTrue, 2000);
    };

    if (game.cat.velocity_x < 2 && game.cat.slidingRight == true) {
      game.cat.slidingRight = false;
      setTimeout(slideTimerTrue, 2000);
    };

    function slideTimerTrue() {
      game.cat.slidingTimer = true;
    }
    //Cat jump
    function jump() {
      game.cat.velocity_y = -30;
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
      if (game.cat.slidingLeft == false) {
        game.cat.velocity_x -= 0.6;
        game.cat.lastMoveRight = false;
        game.cat.lastMoveLeft = true;

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
    }
    //CAT move right
    function moveRight() {
      if (game.cat.slidingRight == false) {
        game.cat.velocity_x += 0.6;
        game.cat.lastMoveLeft = false;
        game.cat.lastMoveRight = true;

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
    if (game.time % 60 == 0) { //good FOOD
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

      if(game.cat.slidingRight || game.cat.slidingLeft) game.cat.slidingColisionY = 30;
      else game.cat.slidingColisionY = 65;

      if (Math.abs(game.goodfood[i].x - game.cat.x - 55) < 60 && Math.abs(game.goodfood[i].y - game.cat.y - 70) < game.cat.slidingColisionY) {
        game.goodfood.splice(i, 1);
        game.score++;
        
        if (sounds) eating.play();
      }
    }
    for (i in game.badfood) {
      game.badfood[i].y += 2;
      //border
      if (game.badfood[i].y >= 710) game.badfood.splice(i, 1);

      if (Math.abs(game.badfood[i].x - game.cat.x - 55) < 60 && Math.abs(game.badfood[i].y - game.cat.y - 70) < game.cat.slidingColisionY) {
        game.badfood.splice(i, 1);
        game.cat.health.hp++;
        if (game.cat.health.hp == 4) {
          game.cat.health.hp = 0;
          game.score = 0;
        }
        if (sounds) meow.play();
      }
    }
    //FOOD
  },
  updateScore: function () {
      if(game.score >= 0 && game.score < 10) game.score_x = 1190;
      if(game.score >= 10 && game.score < 99) game.score_x = 1150;
      if(game.score >= 100 && game.score < 999) game.score_x = 1090;
      if(game.score >= 1000 && game.score < 9999) game.score_x = 1050;
      if(game.score >= 10000 && game.score < 99999) game.score_x = 900;

  },
  update: function () {
    if (game.pause == false) {
      this.time++;
      game.updatePlayer();
      game.updateItems();
      game.updateScore();
    }
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
    $('#game').css({
      'width': CANVAS_WIDTH,
      'height': CANVAS_HEIGHT
    });
  });
});
window.addEventListener("resize", function () {
  resizeCanvas();
  $('#game').css({
    'width': CANVAS_WIDTH,
    'height': CANVAS_HEIGHT
  });
});

//RANDOM NUMBER GENERATOR
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}
//RANDOM NUMBER GENERATOR