//Menu

//SFX and Music
var Sounds = true;
var meow = new Audio('assets/sounds/meow1.mp3');
meow.volume = 0.2;

var eating = new Audio('assets/sounds/eat.mp3');
eating.volume = 0.1;

$('.sounds-option').click(function () {
  if (Sounds) {
    Sounds = false
    $(this).css({
      'border-color': '#F11A2B'
    });
    $(this).removeClass('fal fa-volume-up');
    $(this).addClass('fa fa-volume-off');
    meow.volume = 0;
    eating.volume = 0;

  } else {
    Sounds = true;
    $(this).css({
      'border-color': '#6BD042'
    });
    $(this).removeClass('fa fa-volume-off');
    $(this).addClass('fal fa-volume-up');
    meow.volume = 0.2;
    eating.volume = 0.2;
  }

});
//Press start

$('.startGame').click(function () {
  $('.container-fluid').removeClass('h-100');
  $('#menu').hide();
  eating.play();
  meow.play();
  $('#game').fadeIn(1000);
});

//Alert
if (device.ios()) alert(`Если вы зашли через сафири, то советуем перейти на другой браузер, для более удобной игры.`);

//IOS ZOOM

document.addEventListener('touchmove', function (event) {
  if (event.scale !== 1) { event.preventDefault(); }
}, false);

var lastTouchEnd = 0;
document.addEventListener('touchend', function (event) {
  var now = (new Date()).getTime();
  if (now - lastTouchEnd <= 300) {
    event.preventDefault();
  }
  lastTouchEnd = now;
}, false);