<?php
    error_reporting(E_ALL ^ E_DEPRECATED);
    $db=mysql_connect("localhost","root","");
    mysql_select_db("airbnb",$db);
    mysql_query("set names utf8");
    $phoneNmb=$_POST['phoneNmb'];
    $name=$_POST['name'];
    $sex=$_POST['sex'];
    $email=$_POST['email'];
    $address=$_POST['address'];
    $intro=$_POST['intro'];
    $school=$_POST['school'];
    $work=$_POST['work'];
    $birth=$_POST['birth'];
    $id=$_POST['id'];
    // echo($id);
    // echo($name);
    // user_password: "Zzz123123"
    // useraddress: "浙江省江干区九堡镇九和路"
    // userage: "21"
    // userbirth: "{"year":"1997","mouth":"9","day":"20"}"
    // useremail: "1506747508@qq.com"
    // userheadimg: "../images/public/mario.JPG"
    // userid: "66"
    // userintro: "一个会打篮球的程序员"
    // username: "Mario"
    // userschool: "华东理工大学"
    // usersex: "1"
    // usertel: "15715577153"
    // userwork: "前端工程师"

    mysql_query("UPDATE `aby_user` SET `username` = '$name' WHERE (`aby_user`.`userid` = '$id')");
    mysql_query("UPDATE `aby_user` SET `usertel` = '$phoneNmb' WHERE (`aby_user`.`userid` = '$id')");
    mysql_query("UPDATE `aby_user` SET `useraddress` = '$address' WHERE (`aby_user`.`userid` = '$id')");
    mysql_query("UPDATE `aby_user` SET `userbirth` = '$birth' WHERE (`aby_user`.`userid` = '$id')");
    mysql_query("UPDATE `aby_user` SET `useremail` = '$email' WHERE (`aby_user`.`userid` = '$id')");
    mysql_query("UPDATE `aby_user` SET `userintro` = '$intro' WHERE (`aby_user`.`userid` = '$id')");
    mysql_query("UPDATE `aby_user` SET `userschool` = '$school' WHERE (`aby_user`.`userid` = '$id')");
    mysql_query("UPDATE `aby_user` SET `usersex` = '$sex' WHERE (`aby_user`.`userid` = '$id')");
    mysql_query("UPDATE `aby_user` SET `userwork` = '$work' WHERE (`aby_user`.`userid` = '$id')");

    $sql1="SELECT * FROM `aby_user` WHERE (`userid`='$id')";
    $data = mysql_query($sql1);
    $result1=mysql_fetch_assoc($data);
    $output=json_encode($result1);
    print_r($output);
 ?>