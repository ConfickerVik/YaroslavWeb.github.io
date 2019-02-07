//GAME PAUSE MENU
$('.game-pause').click(function () {
    if (game.pause == false) {
      $(this).removeClass('pause');
      $(this).addClass('play');
      $('.game-menu').slideDown();
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

