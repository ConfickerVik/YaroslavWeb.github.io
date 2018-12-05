//Press start
var meow = new Audio('assets/sounds/meow1.mp3');
meow.volume = 0.5;

$('.startGame').click(function() {
  $('.container-fluid').removeClass('h-100');
  $('#menu').hide();
  $('#game').fadeIn(1000);
});

