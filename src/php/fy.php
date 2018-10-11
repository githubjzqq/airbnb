<?php
    //连接数据库
    error_reporting(E_ALL ^ E_DEPRECATED);
    $db=mysql_connect("localhost","root","root");
    mysql_select_db("aby",$db);
    mysql_query("set names utf8");

    //查询评价表中的数据
    $sql()
?>