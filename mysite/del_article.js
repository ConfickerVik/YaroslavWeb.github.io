$('.del_art').click(function(){
    var id = this.id;

    $.ajax({
        url:'del_article.php',
        type: 'POST',
        data: {
            'del_id' : id
        },
        success: function(){
            location.reload();
        }
    });
});

