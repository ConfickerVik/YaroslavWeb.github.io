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