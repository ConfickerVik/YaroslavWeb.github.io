<?php 
    $query_tags = mysqli_query($db, 'SELECT * FROM tags');
?>
<div class="exit">ВЫЙТИ</div>
<hr>
<div class="tags">
    <h1>ТЕГИ:</h1>
    <div class="container_tags">
    <ul>
    <?php 
        while($res = mysqli_fetch_array($query_tags)){
            echo "<li id='{$res['tag']}' class='tag' style='cursor:pointer;'>";
            echo  "{$res['tag']}"; 
            echo "</li>";
        }
    ?>
    </ul>

    </div>
</div>