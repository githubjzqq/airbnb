<?php
    error_reporting(E_ALL ^ E_DEPRECATED);
    $db=mysql_connect("localhost","root","");
    mysql_select_db("airbnb",$db);
    mysql_query("set names utf8");
    
    $phoneNmb=$_POST['phoneNmb'];
    $pwd=$_POST['pwd'];

    $spl2='SELECT `userid`, `username`, `usersex`, `userage`, `usertel`, `useraddress`, `useremail`, `userheadimg` FROM `aby_user` WHERE (`usertel`='$phoneNmb')';
    $sql1='SELECT * FROM `aby_user`';
    $data = mysql_query($sql1);
    $result=mysql_fetch_array($data);
    $output=json_encode($result);
    print_r($output);
 ?>
