<hr>
<div class="news">
    <h1>Новости:</h1>
    <div class="container_news">
    <?php
    

    if(isset($_COOKIE['tag_search'])){
        $tag = $_COOKIE['tag_search'];

        $query_news = mysqli_query($db, "SELECT * FROM news WHERE tags_news LIKE '%$tag%'");

        while($res = mysqli_fetch_array($query_news)){
            echo
             "<div class='article' style='background:#406FCD;'>
                <h2> {$res['title']} </h2>
                <div class='tags_news'> {$res['tags_news']} </div>
                <img class='img_news' src='{$res['image']}'>
                <div class='text_news'> {$res['text']} </div><br><br>";
                if(isset($_COOKIE['login_admin'])){
                    echo "<input class='del_art' id='{$res['id_news']}' type='button' value='УДАЛИ МЕНЯ НАХУЙ'>";
                }
             echo "</div>";
        }

    }
    else{
        $query_news = mysqli_query($db, "SELECT * FROM news");

        while($res = mysqli_fetch_array($query_news)){
            echo
             "<div class='article' style='background:#406FCD;'>
                <h2> {$res['title']} </h2>
                <div class='tags_news'> {$res['tags_news']} </div>
                <img class='img_news' src='{$res['image']}'>
                <div class='text_news'> {$res['text']} </div><br><br>";
                if(isset($_COOKIE['login_admin'])){
                    echo "<input class='del_art' id='{$res['id_news']}' type='button' value='УДАЛИ МЕНЯ НАХУЙ'>";
                }
             echo "</div>";
        }
    }
 
    ?>
    </div>
</div>
