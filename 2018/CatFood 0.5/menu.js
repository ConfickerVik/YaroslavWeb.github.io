//Press start
document.addEventListener('touchmove', function(e) {e.preventDefault();}, true);

var meow = new Audio('assets/sounds/meow1.mp3');
meow.volume = 0.2;

var eating = new Audio('assets/sounds/eat.mp3');
eating.volume = 0.1;

$('.startGame').click(function() {
  $('.container-fluid').removeClass('h-100');
  $('#menu').hide();
  meow.play();
  $('#game').fadeIn(1000);
});

