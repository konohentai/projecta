<?php
    $servername='localhost';
    $username='root';
    $passname='';
    $dbname='baiji';

    $conn=new mysqli($servername,$username,$passname,$dbname);

    if($conn->connect_error){
        die('出错原因是：'.$conn->connect_error);
    }
    // else{
    //     die('连接成功');
    // }
?>