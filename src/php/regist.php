<?php
    error_reporting(E_ALL ^ E_DEPRECATED);
    $db=mysql_connect("localhost","root","");
    mysql_select_db("airbnb",$db);
    mysql_query("set names utf8");
    
    $phoneNmb=$_POST['phoneNmb'];
    $pwd=$_POST['pwd'];

    $sql1="SELECT * FROM `aby_user` WHERE (`usertel`='$phoneNmb')";
    $data = mysql_query($sql1);
    $result1=mysql_fetch_array($data);
    if($result1){
        $output=json_encode($result1);
        print_r($output);
    }else{
        $sql2="INSERT INTO `aby_user` (`userid`,`user_password`,`username`,`usersex`,`userage`,`usertel`, `useraddress`, `useremail`, `userheadimg`) VALUES (NULL, '$pwd',NULL, NULL, NULL,'$phoneNmb', NULL, NULL, NULL)";
        $data1=mysql_query($sql2);
    }
 ?>
