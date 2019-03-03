//SFX and Music
var sounds = true;

var meow = new Audio('assets/sounds/meow1.mp3');
meow.volume = 0.2;

var eating = new Audio('assets/sounds/eat.mp3');
eating.volume = 0.05;

$('.sounds-option').click(function () {
  if (sounds) {
    sounds = false
    $(this).css({
      'border-color': '#F11A2B'
    });
    $(this).removeClass('fal fa-volume-up');
    $(this).addClass('fa fa-volume-off');
    $('.msc').removeClass('mscOn');
    $('.msc').addClass('mscOff');
    meow.volume = 0;
    eating.volume = 0;
    ostMain.volume = 0;

  } else {
    sounds = true;
    $(this).css({
      'border-color': '#6BD042'
    });
    $(this).removeClass('fa fa-volume-off');
    $(this).addClass('fal fa-volume-up');
    $('.msc').removeClass('mscOff');
    $('.msc').addClass('mscOn');
    meow.volume = 0.2;
    eating.volume = 0.05;
    ostMain.volume = 0.5;
  }
});

//OST
var ostMain = new Audio('assets/music/Main.mp3');
ostMain.loop = true;
ostMain.volume = 0.5;

