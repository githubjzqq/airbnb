<?php
    error_reporting(E_ALL ^ E_DEPRECATED);
    $db=mysql_connect("localhost","root","root");
    mysql_select_db("aby",$db);
    mysql_query("set names utf8");
    
    $sql="SELECT * FROM `aby_pic` WHERE 1";
    $data=mysql_query($sql);
    $res = array();
    while($arr=mysql_fetch_assoc($data))  //循环读出每一条数据
    {   
        array_push($res,$arr);        
    }
    $result=json_encode($res);
    echo $result;  
 ?>