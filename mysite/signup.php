<?php 

include('connection.php');

$login = $_POST['username'];
$password = $_POST['password'];

$add_user = mysqli_query($db,
"INSERT INTO users (user_id, username, password, access) VALUES (NULL, '$login', '$password', '2');");


echo 'Вы успешно зарегестрированы'. $login .'!';
