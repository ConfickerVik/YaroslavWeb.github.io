<?php

include('connection.php');

$username = $_POST['username'];
$password = $_POST['pas'];

$check_user = mysqli_query($db, "SELECT * FROM users WHERE username = '$username' AND password = '$password'");

$check_access = mysqli_query($db, "SELECT * FROM users WHERE username = '$username' AND password = '$password' AND access = 1");


if(mysqli_num_rows($check_user)){
    
    if(mysqli_num_rows($check_access)){
        echo '1';
        setcookie("login_admin", $username, time()+360);
    }
    else {
        echo '1';
        setcookie("login_4mo", $username, time()+360);
    }
}

else{
    echo '0';
}



