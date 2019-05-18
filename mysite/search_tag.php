<?php 

include('connection.php');

$tag = $_POST['name_tag'];

setcookie('tag_search', $tag, time()+5);