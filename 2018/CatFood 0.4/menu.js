//Press start
var meow = new Audio('assets/sounds/meow1.mp3');
meow.volume = 0.2;

var eat = new Audio('assets/sounds/eat.mp3');
eat.volume = 0.05;

$('.startGame').click(function() {
  $('.container-fluid').removeClass('h-100');
  $('#menu').hide();
  meow.play();
  $('#game').fadeIn(1000);
});

