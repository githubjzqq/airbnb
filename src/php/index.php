
<?php
    error_reporting(E_ALL ^ E_DEPRECATED);
    $db=mysql_connect("localhost","root","root");
    mysql_select_db("aby",$db);
    mysql_query("set names utf8");
    //查询语句房屋与用户关联表
    $sql="SELECT * from aby_houseinfo,aby_user WHERE aby_user.userid=aby_houseinfo.userid
    -- and aby_houseinfo.   ='杭州'";

    //查询评论个数
    // $sql1="SELECT aby_houseinfo.houseid,count(*) AS pjcount from aby_houseinfo,aby_pj WHERE aby_pj.houseid=aby_houseinfo.houseid GROUP by aby_houseinfo.houseid"
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
