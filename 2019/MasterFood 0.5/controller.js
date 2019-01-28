//MOBILE CONTROLLER
var button1 = false,//влево
  button2 = false,//вправо
  button3 = false,//прыжок
  button4 = false;//скольжение

/*
var el = document.getElementsByTagName('body')[0];

el.addEventListener("touchstart", handle, false);
el.addEventListener("touchend", handleEnd, false);
el.addEventListener("touchmove", handle, false);

function handle(e) {
  button2 = !(button1 = (window.innerWidth / 2) < e.changedTouches[0].pageX);
};

function handleEnd(e) {

  var touches = e.changedTouches;

}; */

  var el = document.getElementsByTagName('body')[0],
  swipedir,
  startY,
  distY;

  el.addEventListener('touchstart', function(e){
      button2 = !(button1 = (window.innerWidth / 2) < e.changedTouches[0].pageX);
      swipedir = 'none'
      distY = 0
      startY = e.changedTouches[0].pageY
  }, false)

  el.addEventListener('touchmove', function(e){
    button2 = !(button1 = (window.innerWidth / 2) < e.changedTouches[0].pageX);
  }, false)

  el.addEventListener('touchend', function(e){
      var touchobj = e.changedTouches[0];

      if (window.innerWidth / 2 < e.changedTouches[0].pageX) {
        button1 = false;
        button2 = false;
      }
      if (window.innerWidth / 2 > e.changedTouches[0].pageX) {
        button2 = false;
        button1 = false;
      }

      distY = e.changedTouches[0].pageY - startY;
      if(distY < 0 && distY <= 40){
        button3=true;
        setTimeout(function(){
          button3 = false;
        }, 300)
      };

      if(distY > 0 && distY >= 30){
        if(game.cat.slidingTimer == true){
          button4=true;
          setTimeout(function(){
            button4 = false;
          }, 10)
        }
      }
  }, false)


//USAGE:






//MOBILE CONTROLLER


//KEYBOARD CONTROLLER
var inputState = {
  RIGHT: false,
  LEFT: false,
  JUMP: false,
  SLIDE: false,
  ENTER: false
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
    case 87:
    case 32:
    case 38:
      inputState.JUMP = isPressed;
      break;
    case 83:
    case 40:
      inputState.SLIDE = isPressed;
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