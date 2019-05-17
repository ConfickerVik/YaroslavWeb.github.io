<!DOCTYPE html>
<html>

<head>
    <meta charset="UTF-8">
    <title>Blog</title>

</head>

<body>
    <?php 

    if(isset($_COOKIE['login_admin']) || isset($_COOKIE['login_4mo'])){ 
        echo "<div class='tags'>ТЕГИ</div>";
        echo "<div class='news'>НОВОСТИ</div>";
    }
    else if(isset($_COOKIE['login_admin'])){
        echo "<div class='admin_panel'>АДМИНКА</div>";
    }
    else include('form.php');
    ?>

    <script src="jquery-3.4.1.min.js"></script>
    <script src="auth.js"></script>

</body>

</html>