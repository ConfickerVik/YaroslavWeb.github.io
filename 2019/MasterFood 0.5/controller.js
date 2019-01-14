//MOBILE CONTROLLER
var button1=false,
    button2=false,
    button3=false;

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
/*
var el = document.getElementById('game');

// create a simple instance
// by default, it only adds horizontal recognizers
var el = new Hammer(el);

// let the pan gesture support all directions.
// this will block the vertical scrolling on a touch-device while on the element
mc.get('pan').set({ direction: Hammer.DIRECTION_ALL });

// listen to events...
mc.on("panup pandown tap press", function(ev) {
    if(ev.type == 'tap' || ev.type == 'press'){
      if()
      button1 = true;

      button2 = true;
    }
});*/

//MOBILE CONTROLLER


//KEYBOARD CONTROLLER
var inputState = {
  RIGHT: false,
  LEFT: false,
  JUMP:false,
  SLIDE:false
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