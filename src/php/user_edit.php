<?php
    error_reporting(E_ALL ^ E_DEPRECATED);
    $db=mysql_connect("localhost","root","root");
    mysql_select_db("aby",$db);
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