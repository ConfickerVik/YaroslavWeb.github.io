//Main menu

//SFX and Music in menu
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
  }
});


//Press start
$('.startGame').click(function () {
  $('#menu').hide();
  eating.play();
  meow.play();
  $('#game').fadeIn(1000);
  $('#game').css({
    'display': 'grid',
  });

});

//Alert
if (device.ios()) alert(`Если вы зашли через сафири, то советуем перейти на другой браузер, для более удобной игры.`);


//Game menu
//GAME PAUSE MENU
$('.game-pause').click(function () {
  if (game.pause == false) {
    $(this).removeClass('pause');
    $(this).addClass('play');
    $('.game-menu').slideDown();
    $('.game-menu').css({
      'display':'grid'
    });
    game.pause = true;
  } else if (game.pause) {
    $(this).removeClass('play');
    $(this).addClass('pause');
    $('.game-menu').slideUp();
    game.pause = false;
  };
});

//SFX and Music in game
$('.msc').click(function () {
  if (sounds) {
      $(this).removeClass('mscOn');
      $(this).addClass('mscOff');
      sounds = false;
      meow.volume = 0;
      eating.volume = 0;
  } else {
      $(this).removeClass('mscOff');
      $(this).addClass('mscOn');
      sounds = true;
      meow.volume = 0.2;
      eating.volume = 0.05;
  }
});
$('.backMenu').click( function(){
  location.reload()
});

$('.replay').click(function(){
  game.restart();
});


