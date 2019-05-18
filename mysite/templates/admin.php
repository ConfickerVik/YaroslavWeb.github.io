<div class="admin">
    <h1>Админка</h1>
    <form method='POST' action='add_article.php' class="add_article" enctype = 'multipart/form-data'>
        <input name='title_article' type="text" placeholder='Заголовок'><br>
        <input name='tags_article' type="text" placeholder='Тэги'><br>
        <textarea name="text_article" id="" cols="30" rows="10" placeholder='Текст статьи'></textarea><br>
        <input name='img_article' type="file"><br>
        <input name='upload' type="submit" value='ОПУБЛИКОВАТЬ'>
    </form>
</div>  