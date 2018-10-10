<?php
    error_reporting(E_ALL ^ E_DEPRECATED);
    $db=mysql_connect("localhost","root","");
    mysql_select_db("airbnb",$db);
    mysql_query("set names utf8");
    
    $phoneNmb=$_POST['phoneNmb'];
    $pwd=$_POST['pwd'];

    $sql1="SELECT * FROM `aby_user` WHERE (`usertel`='$phoneNmb')";//检查用户名是否存在；
    $sql2="SELECT * FROM `aby_user` WHERE (`usertel`='$phoneNmb' AND `user_password`='$pwd')";
    $data1 = mysql_query($sql1);
    $data2 = mysql_query($sql2);
    $result1=mysql_fetch_assoc($data1);
    $result2=mysql_fetch_assoc($data2);
    
    if($result1){
        if($result2){
            $output=json_encode($result1);
            print_r($output);
        }else{
            echo('{"1":"pwd_error"}');
        }
    };
 ?>