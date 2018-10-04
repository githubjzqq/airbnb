<?php
    error_reporting(E_ALL ^ E_DEPRECATED);
    $db=mysql_connect("localhost","root","");
    mysql_select_db("airbnb",$db);
    mysql_query("set names utf8");
    
    $sql1='SELECT * FROM `aby_user`';
    $data = mysql_query($sql1);
 ?>
