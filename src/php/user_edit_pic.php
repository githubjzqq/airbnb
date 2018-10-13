<?php
    error_reporting(E_ALL ^ E_DEPRECATED);
    $db=mysql_connect("localhost","root","root");
    mysql_select_db("airbnb",$db);
    mysql_query("set names utf8");
    $path=$_POST['path'];
    $id=$_POST['userid'];

    mysql_query("UPDATE `aby_user` SET `userheadimg` = '$path' WHERE (`aby_user`.`userid` = '$id')"); 
 ?>