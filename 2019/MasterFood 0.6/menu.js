//Main menu

//Press start
$('.startGame').click(function () {
  $('#menu').hide();
  eating.play();
  meow.play();
  ostMain.play();
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
  if (game.pause == false) pauseActivated();
  else if (game.pause) pauseDisabled();
});

function pauseActivated() {
  $('.game-pause').removeClass('pause');
  $('.game-pause').addClass('play');
  $('.game-menu').slideDown();
  $('.game-menu').css({
    'display': 'grid'
  });
  game.pause = true;
}

function pauseDisabled() {
  $('.game-pause').removeClass('play');
  $('.game-pause').addClass('pause');
  $('.game-menu').slideUp();
  game.pause = false;
}
//SFX and Music in game
$('.msc').click(function () {
  if (sounds) {
    $(this).removeClass('mscOn');
    $(this).addClass('mscOff');
    sounds = false;
    meow.volume = 0;
    eating.volume = 0;

    ostMain.volume = 0;

  } else {
    $(this).removeClass('mscOff');
    $(this).addClass('mscOn');
    sounds = true;
    meow.volume = 0.2;
    eating.volume = 0.05;
    ostMain.volume = 0.5;
  }
});
$('.backMenu').click(function () {
  location.reload();
});

$('.replay').click(function () {
  game.restartGame();
});