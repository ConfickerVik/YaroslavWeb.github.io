<?php 

include('connection.php');

$article_img = $_FILES['img_article']['name'];
$img_folder = "assets/images/". basename($article_img);

$article_title = $_POST['title_article'];
$article_text = $_POST['text_article'];
$article_tags = $_POST['tags_article'];

$tags = explode(',', $article_tags);

foreach($tags as $tag){
    $add_tag = mysqli_query($db, "INSERT IGNORE INTO tags (tag) VALUES ('$tag')");
}

$add_article = mysqli_query($db, "INSERT INTO news (id_news, title, text, tags_news, image)
VALUES (NULL, '$article_title', '$article_text', '$article_tags', '$img_folder')");

header('Location: http://localhost/mysite/');
?>