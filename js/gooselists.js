$(function(){
    $('#local_place').html(returnCitySN.cname);

    $('#tittle_img').click(function(){
        window.location.href='http://47.112.204.27:894/index.html';//主页点击跳转
    });

    //设置placeholder的显示和隐藏
    $('#s_inpt').focus(function(){
        $('#s_inpt').attr('placeholder','');
    });
    $('#s_inpt').blur(function(){
        $('#s_inpt').attr('placeholder','医护星尖锐克忧');
    });

    //回到顶部功能————————————————————————————————————————
    
    $('#rsuck .rlis:last-child').click(function(){
        window.scrollTo(0,0);
    })

    //检测当前登录状态的功能——————————————————————————————————————————————
    // console.log(window.localStorage.username);
    if(window.localStorage.username){
        $('#top_right .rightli:eq(0)').css('display','none');
        $('#top_right .rightli:eq(1)').css('display','none');
        $('#top_right .rightli:eq(2)').css('display','block');
        $('#top_right .rightli:eq(3)').css('display','block');
        $('#top_right .rightli:eq(2)').html('尊敬的'+window.localStorage.username+',欢迎您');
    }else{
        $('#top_right .rightli:eq(0)').css('display','block');
        $('#top_right .rightli:eq(1)').css('display','block');
        $('#top_right .rightli:eq(2)').css('display','none');
        $('#top_right .rightli:eq(3)').css('display','none');
    }

    //点击注销清空登录状态——————————————————————————————————————————————————————————
    $('#top_right .rightli:eq(3) a').click(function(){
        window.localStorage.username='';
        window.location.reload;
    });

    //左侧多级选项卡功能————————————————————————————————————————————————
    $('#ltab').on('click','.taba_box',function(){//外层选项卡的显示与隐藏
        // console.log($(this).html());
        // e.preventDefault();
        // window.event.returnValue == false;
        //显示隐藏
        $(this).next().toggle();
        if($(this).next().css('display')=='block'){
            $(this).children('.taba_img').css('background-position','-113px -70px');
        }else{
            $(this).children('.taba_img').css('background-position','-95px -70px');
        }
    });


    $('#ltab').on('click','.tabb_box',function(){//里层选项卡的显示与隐藏
        // console.log($(this).html());
        $(this).next().toggle();
        if($(this).next().css('display')=='block'){
            $(this).children('.tabb_img').css('background-position','-79px -70px');
        }else{
            $(this).children('.tabb_img').css('background-position','-63px -70px');
        }
    });


    //清除浏览器默认样式
    var ltab=document.getElementById('ltab');
    var rsuck=document.getElementById('rsuck');
    // var taba_box=ltab.getElementsByClassName('taba_box');
    // console.log(taba[0]);
    ltab.onmousedown = function (ev) {
        var ev = ev || window.event;
        ev.returnValue = false;
        ev.preventDefault();
        return false;
    }
    rsuck.onmousedown = function (ev) {
        var ev = ev || window.event;
        ev.returnValue = false;
        ev.preventDefault();
        return false;
    }

    //全国连锁的选项卡功能——————————————————————————————————————————
    $('#chain_ul .chain_lis').mouseover(function(){
        //添加样式
        $(this).css({'background-color':'#7ebcff','color':'#fff'}).siblings().css({'background-color':'#f1f1f1','color':'#666'});
        //显示相应的选项卡
        $('#chain_btul .chain_btlis').eq($(this).index()).css('display','block').siblings().css('display','none');
    });

    //数据渲染功能——————————————————————————————————————————————————————————————————————

    var nowpage=1;//当前页（初始化）
    var maxnum=8;//一页显示多少数据
    var istrue1='true'
    var istrue2='true'//判断正序和倒序的开关

    function data_inner(sort,istrue){//根据参数决定排序方式,升序与降序
        $.ajax({
            type:'get',
            url:'../api/indexgoods.php',
            data:{
                goods:'goodslists',
                nowpage:nowpage,
                maxnum:maxnum,
                sort:sort,//排序方式
                istrue:istrue//正序倒序判断参数
            },
            success:function(str){
                
                var arr=JSON.parse(str);
                
                //渲染数据(渲染之前先初始化)
                nowpage>=arr.maxpage?nowpage=arr.maxpage:nowpage;
                // console.log(nowpage);

                $('#data_ul').html('');
                for (var i = 0; i < arr.maxnum; i++) {
                    // console.log(arr.data[i]);
                    if (arr.data[i]) {//取得到数据则渲染（消除报错）

                        //若价格不存在则显示'特价中'
                        (arr.data[i].price)==0?arr.data[i].price='特价中':arr.data[i].price;
                        
                        $('#data_ul').append(
                            `<li class="data_background">
                                <div class="data_lists">
                                    <div class="data_consult">
                                        <i class="consult_img"></i>
                                            在线咨询
                                    </div>
                                    <img src="../images/${arr.data[i].imgurl}" alt="" class="data_img" data-id="${arr.data[i].id}">
                                    <div class="data_texbox">
                                        <a href="javascript:;" class="data_tittle">${arr.data[i].name}</a>
                                        <span class="data_price">￥${arr.data[i].price}</span>
                                        <span class="data_issale">在售</span>
                                    </div>
                                    <div class="data_btnbox">
                                        <input type="button" name="" id="" class="data_btn" value="查看详情">
                                        <input type="button" name="" id="" class="data_btn" value="在线咨询">
                                    </div>
                                </div>
                                <div class="bottom"></div>
                            </li>`);
                    }
                }

                    //点击获取 该项在数据库中的id名并将其传到详情页中
                    $('#data_ul').on('click','.data_img',function(){
                        // console.log($(this).attr('data-id'));
                        window.open('http://47.112.204.27:894/html/details.html?id='+$(this).attr('data-id'));
                    });
                    $('#data_ul').on('click','.data_btn',function(){
                        // console.log($(this).attr('data-id'));
                        window.open('http://47.112.204.27:894/html/details.html?id='+$(this).parent().prev().prev().attr('data-id'));
                    });
    
                //渲染页码等杂项
                $('.page_box').html('');
                for(var j=0;j<arr.maxpage;j++){
                    $('.page_box').append('<a href="javascript:;" class="next_page page_num">'+(j+1)+'</a>');
                }
                $('.page_ul .list_sum span').html(arr.maxgoods);
                $('.page_ul .now_page').html(arr.nowpage);
                $('.page_ul .sum_page').html(arr.maxpage);
                $('#sum_to .sum_text span:eq(0)').html(arr.maxgoods);

                $('.page_ul .page_num').click(function(){//单击页码
                    // console.log($(this).html());
                    nowpage=$(this).html();
                    data_inner(sort,istrue);
                });
                // console.log($('.page_ul .page_num').eq(nowpage-1).html())
                //当前页高亮
                $('.page_ul .page_num').eq(nowpage-1).css({'background-color':'#7ebcff','color':'#fff'}).siblings().css({'background-color':'#fff','color':'#555'});

                $('.page_ul .last_page').unbind().click(function(){//最后一页
                    // console.log($(this));
                    nowpage=arr.maxpage;
                    data_inner(sort,istrue);
                });

                $('.page_ul .nextp').unbind().click(function(){//点击下一页翻页（需要解绑）
                    if(nowpage>=arr.maxpage){
                        nowpage=arr.maxpage;
                        $('.page_ul .now_page').html(arr.nowpage);
                    }else{
                        nowpage++;
                    }
                    data_inner(sort,istrue);
                });

                $('.to_page .page_true').unbind().click(function(){//根据输入内容进行页码判断
                    // console.log($(this).prev().val());
                    if(!($(this).prev().val())||!parseInt($(this).prev().val())){
                        window.location.reload();
                    }
                    else if($(this).prev().val()>=arr.maxpage){
                        nowpage=arr.maxpage;
                        $('.to_page .now_page').html(arr.nowpage);
                    }else{
                        nowpage=($(this).prev().val());
                    }
                    data_inner(sort,istrue);
                });


            }
        });
    }
    data_inner('','true');//初始化
    
    $('#sort_ul .sort_lis:eq(1) a').css({'background':'url(../images/pxar.gif) right 1px no-repeat','color':'#ff5c4d'});//初始化
    $('#sort_ul .sort_lis:eq(0) a').click(function(){//点击按价格排序
        //添加样式
        $(this).css({'background':'url(../images/pxar.gif) right 1px no-repeat','color':'#ff5c4d'}).parent().siblings().children().css({'background':'url(images/pxa.gif) right 1px no-repeat','color':'#555'});
        //开关自反
        istrue1=='true'?istrue1='false':istrue1='true';
        data_inner('sort_price',istrue1);
        // console.log(istrue1);
    });
    
    $('#sort_ul .sort_lis:eq(1) a').click(function(){//点击按时间排序
        $(this).css({'background':'url(../images/pxar.gif) right 1px no-repeat','color':'#ff5c4d'}).parent().siblings().children().css({'background':'url(images/pxa.gif) right 1px no-repeat','color':'#555'});
        istrue2=='true'?istrue2='false':istrue2='true';
        data_inner('',istrue2);
        // console.log(istrue2);
    });
});