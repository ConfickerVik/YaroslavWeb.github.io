<?php 

include('connection.php');

?>

<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Blog</title>
</head>

<body>
    <?php 

    if(isset($_COOKIE['login_admin']) == false && isset($_COOKIE['login_4mo']) == false){
        include('templates/form.php');
    }

    if(isset($_COOKIE['login_admin']) || isset($_COOKIE['login_4mo'])){ 
        include('templates/tags.php');
        include('templates/news.php');
    }

    if(isset($_COOKIE['login_admin'])){
        include('templates/admin.php');
    }
    
    ?>

    <script src="assets/libs/jquery-3.4.1.min.js"></script>\
    <script src="del_article.js"></script>
    <script src="auth.js"></script>
    <script src="search_tag.js"></script>
    
</body>

</html>