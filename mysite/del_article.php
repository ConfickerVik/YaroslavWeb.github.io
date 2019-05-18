<?php 
include('connection.php');

$id_del_art = $_POST['del_id'];

$del_art = mysqli_query($db, "DELETE FROM news WHERE news.id_news = '$id_del_art'");