


if(device.mobile()){
    var $ = document; // shortcut
var cssId = 'myCss';  // you could encode the css path itself to generate id..
    var head  = $.getElementsByTagName('head')[0];
    var link  = $.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://yaroslavweb.github.io/Niece%20BDay/style.css';
    link.media = 'all';
    head.appendChild(link);

}
else{
    var $ = document; // shortcut
var cssId = 'myCss';  // you could encode the css path itself to generate id..
    var head  = $.getElementsByTagName('head')[0];
    var link  = $.createElement('link');
    link.id   = cssId;
    link.rel  = 'stylesheet';
    link.type = 'text/css';
    link.href = 'https://yaroslavweb.github.io/Niece%20BDay/style2.css';
    link.media = 'all';
    head.appendChild(link);

}


var s1 = new Audio('s1.mp3');
var s2 = new Audio('s2.mp3');
var s3 = new Audio('s3.mp3');
var s4 = new Audio('s4.mp3');
var s5 = new Audio('s5.mp3');
var s6 = new Audio('s6.mp3');
var s7 = new Audio('s7.mp3');

s1.volume = 0.5;
s2.volume = 0.5;
s3.volume = 0.5;
s4.volume = 0.5;
s5.volume = 0.5;
s6.volume = 0.5;
s7.volume = 0.5;

$('#b1').click(function(){
    $('#b1').slideUp();
    s1.play();
});

$('#b2').click(function(){
    $('#b2').slideUp();
    s2.play();
});

$('#b3').click(function(){
    $('#b3').slideUp();
    s3.play();
});

$('#b4').click(function(){
    $('#b4').slideUp();
    s4.play();
});

$('#b5').click(function(){
    $('#b5').slideUp();
    s5.play();
});


$('#b6').click(function(){
    $('#b6').slideUp();
    s6.play();
});

$('#b7').click(function(){
    $('#b7').slideUp();
    s7.play();
});

$('#b8').click(function(){
    $('#b8').slideUp();
    s1.play();
});

$('#b9').click(function(){
    $('#b9').slideUp();
    s2.play();
});

$('#b10').click(function(){
    $('#b10').slideUp();
    s3.play();
});

$('#b11').click(function(){
    $('#b11').slideUp();
    s4.play();
});

$('#b12').click(function(){
    $('#b12').slideUp();
    s5.play();
});


$('#b13').click(function(){
    $('#b13').slideUp();
    s6.play();
});

$('#b14').click(function(){
    $('#b14').slideUp();
    s7.play();
});
$('#b15').click(function(){
    $('#b15').slideUp();
    s1.play();
});

