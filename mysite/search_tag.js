$('.tag').click(function(){
    var tag = this.id;

    $.ajax({
        url:'search_tag.php',
        type:'POST',
        data: {
            'name_tag': tag
        },
        success: function(){
            location.reload();
        }

    });
    
});