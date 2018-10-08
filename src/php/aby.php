
<?php
    error_reporting(E_ALL ^ E_DEPRECATED);
    $db=mysql_connect("localhost","root","root");
    mysql_select_db("abytext",$db);
    mysql_query("set names utf8");
    $sql="SELECT * from aby_houseinfo,aby_user WHERE aby_houseinfo.uname=aby_user.uname 
    -- and aby_houseinfo.houseposition='杭州'";
    $data=mysql_query($sql);
    $res = array();
    while($arr=mysql_fetch_assoc($data))  //循环读出每一条数据
    {   
        array_push($res,$arr);        
    }
    // print_r($res)
    $result=json_encode($res);
    echo $result; 
    // print_r($res);
 ?>
