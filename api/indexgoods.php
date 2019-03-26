<?php
    include 'conn.php';

    //通过$goods的值来判断当前功能
    $goods=isset($_GET['goods'])?$_GET['goods']:$_POST['goods'];
    
    // echo $goods;
    //主页渲染模块
    if($goods=='boy'){
        $pages=isset($_GET['pages'])?$_GET['pages']:'';
        $nums=isset($_GET['nums'])?$_GET['nums']:'';

        $sql="SELECT * FROM homegoods";
        $res=$conn->query($sql);
        $arr=$res->fetch_all(MYSQLI_ASSOC);
        $listarr=array_slice($arr,($pages-1)*$nums,$nums);
        $datas=array(
            'data'=>$listarr,
            'pages'=>$pages,
            'nums'=>$nums
        );
        // print_r($arr);
        echo json_encode($datas,JSON_UNESCAPED_UNICODE);
    }

    //注册页功能1
    if($goods=='reg1'){
        $phone=isset($_POST['phone'])?$_POST['phone']:'';

        $sql="SELECT * FROM user WHERE phone='$phone'";
        $res=$conn->query($sql);
        // $arr=$res->fetch_all(MYSQLI_ASSOC);
        // print_r($res);
        if($res->num_rows){
            echo 'false';
        }else{
            echo 'true';
        }
        // echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }

    //注册的数据导入数据库功能
    if($goods=='reg_true'){
        $pho=isset($_POST['phone'])?$_POST['phone']:'';
        $password=isset($_POST['password'])?$_POST['password']:'';
        $sql="INSERT INTO user(phone,password) VALUES('$pho','$password')";
        $res=$conn->query($sql);
        if($res){
            echo 'true';
        }else{
            echo 'false';
        }
    }

    //登录判断
    if($goods=='loginx'){
        $phone=isset($_POST['phone'])?$_POST['phone']:'';
        $password=isset($_POST['password'])?$_POST['password']:'';

        $sql="SELECT * FROM user WHERE phone='$phone' AND password='$password'";
        $res=$conn->query($sql);
        // $arr=$res->fetch_all(MYSQLI_ASSOC);
        // print_r($res);
        if($res->num_rows){
            echo 'true';
        }else{
            echo 'false';
        }
    }

    //列表页根据页码渲染数据
    if($goods=='goodslists'){
        $nowpage=isset($_GET['nowpage'])?$_GET['nowpage']:'';//当前页
        $maxnum=isset($_GET['maxnum'])?$_GET['maxnum']:'';//每页数据量
        $sort=isset($_GET['sort'])?$_GET['sort']:'';//排序方式
        $istrue=isset($_GET['istrue'])?$_GET['istrue']:'';//排序方式
        //转化$istrue为mysql语句(正序倒序)
        if($istrue=='true'){
            $istrue='DESC';//降序
        }else{
            $istrue='ASC';//升序
        }
        // echo $istrue;

        if($sort=='sort_price'){
            $sql="SELECT *FROM goodslists ORDER BY price $istrue";
        }else{
            $sql="SELECT *FROM goodslists ORDER BY id $istrue";
        }

        // $sql="SELECT *FROM goodslists";
        $res=$conn->query($sql);
        // echo($sql);
        $arr=$res->fetch_all(MYSQL_ASSOC);

        $arrsli=array_slice($arr,($nowpage-1)*$maxnum,$maxnum);
        // print_r(ceil(count($arr)/$maxnum));
        
        $arrdata=array(
            'data'=>$arrsli,//传出的数据
            'maxpage'=>ceil(count($arr)/$maxnum),//页码最大值
            'nowpage'=>$nowpage,
            'maxnum'=>$maxnum,
            'maxgoods'=>count($arr)
        );
        echo json_encode($arrdata,JSON_UNESCAPED_UNICODE);
    }

    //详情页的接口
    if($goods=='search_id'){
        $thisid=isset($_GET['thisid'])?$_GET['thisid']:'0';
        // echo $thisid;
        $sql="SELECT * FROM goodslists WHERE id='$thisid'";
        $res=$conn->query($sql);
        $arr=$res->fetch_all(MYSQL_ASSOC);
        // print_r($arr);
        echo json_encode($arr,JSON_UNESCAPED_UNICODE);
    }

    //详情页的购物车数据传到数据库
    if($goods=='to_gwc'){
        $username=isset($_GET['username'])?$_GET['username']:'0';
        $gwc_data=isset($_GET['gwc_data'])?$_GET['gwc_data']:'0';

        //查询当前用户的数据
        $sql="SELECT * FROM user WHERE phone='$username'";
        $res=$conn->query($sql);
        $arr=$res->fetch_all(MYSQL_ASSOC);

        //取出用户原来购物车的数据
        $joins=$arr[0]['gwc'];
        // print_r($arr[0]['gwc']);
        
        //原本的数据与新数据拼接加入数据库(原本没数据则直接加)
        if($joins){
            $sql2="UPDATE user SET gwc='$gwc_data$joins' WHERE phone='$username'";
            $reg=$conn->query($sql2);
            if($reg){
                echo 'true';
            }else{
                echo 'false';
            }
        }else{
            $sql2="UPDATE user SET gwc='$gwc_data' WHERE phone='$username'";
            $reg=$conn->query($sql2);
            if($reg){
                echo 'true';
            }else{
                echo 'false';
            }
        }
    }

    //购物车接收数据
    if($goods=='gwc_inner'){
        $username=isset($_GET['username'])?$_GET['username']:'0';
        // echo $username;
        $sql="SELECT * FROM user WHERE phone='$username'";
        $res=$conn->query($sql);
        $arr=$res->fetch_all(MYSQL_ASSOC);
        echo($arr[0]['gwc']);//直接取出用户购物车的数据
    }

    //修改购物车中的数据
    if($goods=='change_gwc'){
        $gwcdata=isset($_GET['gwcdata'])?$_GET['gwcdata']:'0';
        $username=isset($_GET['username'])?$_GET['username']:'0';
        // echo $gwcdata;

        $sql="UPDATE user SET gwc='$gwcdata' WHERE phone='$username'";
        $res=$conn->query($sql);
        if($res){
            echo 'true';
        }else{
            echo 'false';
        }
    }
?>