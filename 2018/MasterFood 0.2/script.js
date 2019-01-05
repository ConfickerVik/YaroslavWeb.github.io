//Press start
var Start = $('.startGame');
var music = document.getElementById('music');

$(Start).click(function() {
  document.getElementById('meowStart').play();
  music.play();
  music.volume = 0.1;
  $('.rowStart').removeClass('h-100');
  $('#Game').fadeIn(4000, function() {});
  $('.startScreen').hide();
  
});

