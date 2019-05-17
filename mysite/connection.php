<?php 

$db = mysqli_connect('localhost','root','','mysite'); //подключениек к бд

if($db == false){
    echo 'Не удалось подключиться к бд';
    echo mysqli_connect_error();
    exit();
}