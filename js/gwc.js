$(function () {
    $('#local_place').html(returnCitySN.cname);
    // console.log(returnCitySN.cname);

    $('#tittle_img').click(function () {
        window.location.href = 'http://47.112.204.27:894/index.html';//主页点击跳转
    });

    //设置placeholder的显示和隐藏
    $('#s_inpt').focus(function () {
        $('#s_inpt').attr('placeholder', '');
    });
    $('#s_inpt').blur(function () {
        $('#s_inpt').attr('placeholder', '医护星尖锐克忧');
    });

    //回到顶部功能————————————————————————————————————————

    $('#rsuck .rlis:last-child').click(function () {
        window.scrollTo(0, 0);
    });

    //检测当前登录状态的功能——————————————————————————————————————————————
    // console.log(window.localStorage.username);
    if (window.localStorage.username) {
        $('#top_right .rightli:eq(0)').css('display', 'none');
        $('#top_right .rightli:eq(1)').css('display', 'none');
        $('#top_right .rightli:eq(2)').css('display', 'block');
        $('#top_right .rightli:eq(3)').css('display', 'block');
        $('#top_right .rightli:eq(2)').html('尊敬的' + window.localStorage.username + ',欢迎您');
    } else {
        $('#top_right .rightli:eq(0)').css('display', 'block');
        $('#top_right .rightli:eq(1)').css('display', 'block');
        $('#top_right .rightli:eq(2)').css('display', 'none');
        $('#top_right .rightli:eq(3)').css('display', 'none');
        alert('请登录');
        window.location.href='http://47.112.204.27:894/html/login.html';
    }

    //点击注销清空登录状态——————————————————————————————————————————————————————————
    $('#top_right .rightli:eq(3) a').click(function () {
        window.localStorage.username = '';
        window.location.reload;
    });

    //购物车功能——————————————————————————————————————————————————
    // $('#cart').mousedown(function(ev){//清除浏览器默认行为
    //     ev.preventDefault();
    // });


    $.ajax({
        type:'get',
        url:'../api/indexgoods.php',
        data:{
            goods:'gwc_inner',
            username:window.localStorage.username,
        },
        success:function(str){
            
            var str1= str.slice(0,-1);//截掉最后的&
            
            var arr= str1.split('&');//截成数组

            console.log(arr);
            for(var i=0;i<arr.length;i++){
                // var strsli=arr[i].concat('');//切成字符串之后再截取
                var arrsli=arr[i].split(',');
                console.log(arr[i]);
                if (arr[i]) {
                    $('#cart').append(`
                    <li class="goods">
                        <p class="good_check"><input type="checkbox" name="good" value="" /></p>
                        <p class="good_name">${arrsli[0]}</p>
                        <p class="good_price">￥&nbsp;${arrsli[3]}</p>
                        <p class="num">
                            <span class="cutnum">-</span>
                            <input class="nownum" type="text" value="${arrsli[2]}" />
                            <span class="addnum">+</span>
                        </p>
                        <p class="good_total">￥&nbsp;${arrsli[3]*arrsli[2]}</p>
                        <p class="good_del">
                            <a href="javascript:;">删除</a>
                        </p>
                        <div class="data">
                            <p class="spec">${arrsli[4]}</p>
                            <p class="shop">${arrsli[1]}</p>
                        </div>
                    </li>
                `);
                }
                
            }


            function mul(num){//计算相乘后的价格的函数
                var preval = num.parent().prev().text().slice(2);//切割包头不包尾
                var dk=num.parent().children('.nownum').val();
                // console.log(dk);
                num.parent().next().html('￥&nbsp;'+(preval*dk).toFixed(2));//保留两位小数
            }
        
            $('#cart').on('mousedown','.addnum',function(ev){//点击数量加一
                ev.preventDefault();
                // console.log(val);
                var val= $(this).prev().val()*1;//获取前一个元素的值转为数字
                val++;//获取前一个元素的值自增1
                if(val>=999){//限定最小值
                    val=999;
                }
                $(this).prev().val(val);//执行(不这么写会报错)
                // console.log($(this));
                mul($(this));
                all_ns()
            });
        
            $('#cart').on('mousedown','.cutnum',function(ev){//点击数量减一
                ev.preventDefault();
                // console.log(val);
                var val= $(this).next().val()*1;//获取前一个元素的值转为数字
                val--;//获取前一个元素的值自增1
                if(val<=1){//限定最小值
                    val=1;
                }
                $(this).next().val(val);//执行(不这么写会报错)
                mul($(this));
                all_ns()
            });
        
            //手动输入数据
            $('#cart').on('keyup','.nownum',function(){
                
                var val= $(this).val();
                if(val<=1){
                    $(this).val(1);
                }else if(val>=999){
                    $(this).val(999);
                }
                // console.log($(this).val());
        
                mul($(this));
                all_ns();
                // console.log($(this).val());
            });
            

            //通过下标删数据的函数（数据库）
            function ajax_del(ind){
                arr.splice(ind,1);//删除数据中指定位置的数据
                
                var strout=arr.join('&')+'&';
                console.log(strout);

                $.ajax({//发送截取后的数据到数据库
                    type:'get',
                    url:'../api/indexgoods.php',
                    data:{
                        goods:'change_gwc',
                        gwcdata:strout,
                        username:window.localStorage.username,
                    },
                    success:function(str){
                        console.log(str);
                    }
                });
            }
            //删除当行
            $('#cart .good_del').click(function(){
                // console.log(arr[($(this).parent().index())-1]);
                // console.log($(this).parent().index());
                
                ajax_del(($(this).parent().index())-1);

                var istrue=confirm('删否？');
                if(istrue){
                    $(this).parent().remove();
                }
                
                empty_del();
                all_ns();
                
            })
        
            //无数据则底部隐藏函数
            function empty_del(){
                // console.log($('#cart .goods').size());
                if($('#cart .goods').size()<=0){//判断是否有数据
                    $('#del').css('display','none');
                    $('#empty_box').css('display','block')
                }else{
                    $('#del').css('display','block');
                    $('#empty_box').css('display','none')
                }
            }
            empty_del();
        
            //全选全不选
            $('#allchecked input').on('click',function(){
                if($('#allchecked input').prop('checked')){//全选功能
                    // console.log('true');
                    $('.good_check input').prop('checked',true);
                }else{//全不选功能
                    $('.good_check input').prop('checked',false);
                }
                all_ns()
            })
        
            //当前是否全选的判断(作用于全选框)
            $('#cart .good_check input').on('click',function(){
                // console.log($('#cart .good_check input:checked').size());//选中状态框的长度
                var isall=$('#cart .good_check input:checked').size();
                if(isall==$('#cart .good_check input').size()){//判断是否全选
                    $('#allchecked input').prop('checked',true);
                }else{
                    $('#allchecked input').prop('checked',false);
                }
                all_ns();
            });
        
        
            var arrs=[];//总下标初始化
            //计算底部总数量与总价格
            function all_ns(){
                arrs=[];//总下标初始化
                var goods_num=0;//商品数量初始化
                var price=0;//价格初始化
                
                $('.good_check input').each(function(i,item){
                    if($('.good_check input').eq(i).prop('checked')){//获取勾选元素的下标
                        arrs.push(i);
                        // console.log(i);
                    }
                });
        
                // console.log(arr);
                arrs.forEach(function(item){//遍历数组，从数组中取出数据
                    // console.log(item);
                    goods_num+=$('.nownum').eq(item).val()*1//商品总数
                    price+=$('.good_total').eq(item).text().slice(2)*1;
                });
                // console.log(price);
                $('#allnum').html('已选 <span>'+goods_num+'</span> 件商品');
                $('#totalprice').html('总计（不含运费）：<span>￥'+price.toFixed(2)+'</span>');
                
                //隔行变色
                $('#cart .goods').css('background-color','#fff');
                for(var i=($('#cart .goods').length)-1;i>=0;i--){
                    // console.log(i);
                    if(i%2==0){
                        $('#cart .goods').eq(i).css('background-color','#eee');
                    }
                }
                // $('#cart .goods').each(function(i){
                    
                // });
            }
            all_ns();
        
            $('#delall').click(function(){
                // console.log(arr);
                for(var i=arrs.length-1;i>=0;i--){//反向才没bug
                    $('#cart .goods').eq(arrs[i]).remove();
                    console.log(arrs[i]);
                    ajax_del(arrs[i]);//从数据库中删除
                }
                all_ns();
                empty_del();
            });

        }
    });
    
});