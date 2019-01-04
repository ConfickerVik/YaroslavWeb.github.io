if(device.ios())alert(`Если вы зашли через сафири, то советуем перейти на другой браузер, для более удобной игры.`);

//Press start

var meow = new Audio('assets/sounds/meow1.mp3');
meow.volume = 0.2;

var eating = new Audio('assets/sounds/eat.mp3');
eating.volume = 0.2;

$('.startGame').click(function() {
  $('.container-fluid').removeClass('h-100');
  $('#menu').hide();
  eating.play();
  meow.play();
  $('#game').fadeIn(1000);
});




