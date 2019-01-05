//Game
var canvas = document.getElementById('canvas'),
    context = canvas.getContext('2d');

function resize() {
    $("#canvas").outerHeight($(window).height() - $("#canvas").offset().top - Math.abs($("#canvas").outerHeight(true) - $("#canvas").outerHeight() - 70));
}
$(document).ready(function () {
    resize();
    $(window).on("resize", function () {
        resize();
    });
});
canvas.width = 800;
canvas.height = 600;
//get assets background
var bg = new Image();
bg.src = 'assets/images/bg/bg.jpg';


var food = [];
var timer = 0;
var cat = {
    x: 10,
    y: 430,
    direction: 0
};
var kot = [];


//get assets item
var item = [];
for (var i = 1; i <= 5; i++) {
    item[i] = new Image();
    item[i].src = 'assets/images/food/food' + i + '.png';
}

//get assets cat
var catimg = [];
for (var i = 0, m = 3; i < m; i++) {
    catimg[i] = [];
    for (var j = 0, n = 9; j < n; j++) {
        catimg[i][j] = 0;
    }
}
for (var i = 0; i < 9; i++) {
    catimg[0][i] = new Image();
    catimg[0][i].src = 'assets/images/cat/stand/Idle(' + i + ').png';
}
for (var i = 0; i < 8; i++) {
    catimg[1][i] = new Image();
    catimg[2][i] = new Image();
    catimg[1][i].src = 'assets/images/cat/run/right/Run(' + i + ').png';
    catimg[2][i].src = 'assets/images/cat/run/left/Run(' + i + ').png';
}

//animation controlers
var anim1 = 0;
var anim2 = 0;
var controler = 0;

//score player
var score = 0;
$('.points').html(score);

var eat = document.getElementById('eat');
eat.volume = 0.1;

function update(step) {
    timer++;
    if (timer % 60 == 0) {
        food.push({
            x: getRandomInt(20, 760),
            y: -300,
            img: item[getRandomInt(1, 6)],
            del: 0
        });
    }
    //еда
    for (i in food) {
        food[i].y += 2;
        //border
        if (food[i].y >= 600) food.splice(i, 1);

        if (Math.abs(cat.x + 50 - (food[i].x + 12)) < 45 && Math.abs(cat.y + 40 - food[i].y) < 40) {
            food[i].del = 1;
        }
        if (food[i].del == 1) {
            food.splice(i, 1);
            score++;
            $('.points').html(score);
            eat.play();
        }
    }

    //движение
    if (inputState.RIGHT) catMoveRight();
    else if (inputState.LEFT) catMoveLeft();
    else catStand();

    window.onkeyup = function () {
        controler = 0;
    };

};

function render() {
    context.drawImage(bg, 0, 0, canvas.width, canvas.height);

    context.drawImage(catimg[anim1][anim2], cat.x, cat.y, 100, 100);

    for (i in food) {
        context.drawImage(food[i].img, food[i].x, food[i].y, 25, 33);
    }
}

//cat state

function catStand() {
    if (timer % 6 == 0 && controler == 0) {
        anim1 = 0;
        anim2++;
        if (anim2 == 9) anim2 = 0;
        if (cat.direction > 0) {
            setTimeout(function () {
                cat.x += 2
            }, 50)
            setTimeout(function () {
                cat.x += 1;
                cat.direction = 0;
            }, 100)
        }
        if (cat.direction < 0) {
            setTimeout(function () {
                cat.x -= 2
            }, 50)
            setTimeout(function () {
                cat.x -= 1;
                cat.direction = 0;
            }, 100)
        }
    }
}

function catMoveRight() {
    controler = 1;
    anim1 = 1;
    if (anim2 < 9 && anim2 > 7) anim2 = 0;
    if (anim2 == 7) anim2 = 0;
    if (timer % 4 == 0) anim2++;
    if (cat.x <= 770) {

        cat.direction = 3;
        cat.x += cat.direction;

    } else cat.x = -55;
}

function catMoveLeft() {
    controler = 1;
    anim1 = 2;
    if (anim2 < 9 && anim2 > 7) anim2 = 0;
    if (timer % 4 == 0) anim2++;
    if (anim2 == 7) anim2 = 0;
    if (cat.x >= -55) {

        cat.direction = -3;
        cat.x += cat.direction;

    } else cat.x = 770;
}


//random
function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

//mobile controller


function deviceOrientationListener(event) {
    if (timer % 6 == 0 && controler == 0) {
        anim1 = 0;
        anim2++;
        if (anim2 == 9) anim2 = 0;
    }
    //вправо
    if (event.gamma > 20) {
        controler = 1;
        if (anim2 < 9 && anim2 > 7) anim2 = 0;
        if (anim2 == 7) anim2 = 0;
        if (cat.x <= 720) {
            cat.x += 6;
            anim1 = 1;
            anim2++;
        } else controler = 0;
    }
    //влево
    if (event.gamma < -20) {
        controler = 1;
        if (anim2 < 9 && anim2 > 7) anim2 = 0;
        if (anim2 == 7) anim2 = 0;
        if (cat.x >= 0) {
            cat.x -= 6;
            anim1 = 2;
            anim2++;
        } else controler = 0;
    } else {
        controler = 0;
    }

}

if (window.DeviceOrientationEvent) {
    window.addEventListener("deviceorientation", deviceOrientationListener);
} else {
    alert("Ваш браузер не поддерживает данную функцию");
}

//engine
//start game loop
$(Start).click(function () {
    // game loop
    var last = performance.now(),
        step = 1 / 60,
        // update should be called 60 times per second
        dt = 0,
        now = void 0;

    var frame = function frame() {
        now = performance.now();
        dt = dt + (now - last) / 1000;
        while (dt > step) {
            dt = dt - step;
            update(step);
        }
        last = now;

        render(dt);
        requestAnimationFrame(frame);
    };
    requestAnimationFrame(frame);
})

//Controller
let inputState = {
    RIGHT: false,
    LEFT: false
}

let setKeyState = function (keyCode, isPressed) {
    switch (keyCode) {
        case 68:
            inputState.RIGHT = isPressed;
            break;
        case 65:
            inputState.LEFT = isPressed;
            break;
    }
};
let keydownHandler = (e) => {
    setKeyState(e.which, true);
};
let keyupHandler = (e) => {
    setKeyState(e.which, false);
};

document.addEventListener('keydown', keydownHandler);
document.addEventListener('keyup', keyupHandler);