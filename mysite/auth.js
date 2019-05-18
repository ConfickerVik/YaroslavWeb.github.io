$('.send_info').click(function(){

    var login_form = $('.login_form').serialize();
    
    $.ajax({
        url: 'login.php',
        type: 'POST',
        data: login_form, // переменная которую передаём
        success: function(msg){
            if(msg == '1'){
                location.reload();
            }
            else {
                $('.alert').html('Такой пользователь не найден!');
            }
        } //функция после выполениня запроса
    });

});


$('.reg').click(function(){

    var signup_form = $('.signup_form').serialize();

    $.ajax({
        url: 'signup.php',
        type: 'POST',
        data: signup_form, // переменная которую передаём
        success: function(msg){
            $('.alert').html(msg);
            $('.signup_form').remove();
        }
    });

});

$('.exit').click(function(){
    $.ajax({
        url: 'logout.php',
        type:'POST',
        success:function(msg){
            location.reload();
        }
        
    });

});