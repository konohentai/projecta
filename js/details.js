$(function () {
    $('#local_place').html(returnCitySN.cname);

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
    })

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
    }

    //点击注销清空登录状态——————————————————————————————————————————————————————————
    $('#top_right .rightli:eq(3) a').click(function () {
        window.localStorage.username = '';
        window.location.reload;
    });

    //获取从列表页传过来的id名
    var thisid = location.search.slice(4);

    //在数据库中查找id
    $.ajax({
        type: 'get',
        url: '../api/indexgoods.php',
        data: {
            goods: 'search_id',
            thisid: thisid,
        },
        success: function (str) {
            var arr = JSON.parse(str);
            
            var imgarr=arr[0].full_images.split('&');// 把一整条图片的数据切割成单个的
            var spec=arr[0].spec.split('&');//切割规格
            // console.log(spec);
            
            $('#content_a').html(`<div id="glass" data-id="${arr[0].id}">
                <div id="boss">
                    <ul id="imgbox">
                        
                        <div id="shadow"></div>
                    </ul>
                    
                    <ul id="ul">
                        
                    </ul>
                </div>
                <div class="prev lr">&lt;</div>
                <div id="box2">

                </div>
                <div class="next lr">&gt;</div>
                <div class="paking">温馨提示：部分商品包装更换频繁，如货品与图片不完全一致，请以商品实物为准。</div>
            </div>
            <div id="middle_text">
                <h1 class="middle_tittle">
                    <span class="middle_rx"></span>
                    ${arr[0]. big_name}
                </h1>
                <div class="middle_pri">
                    <div class="middle_hyj">会员价</div>
                    <div class="middle_price"><span>￥</span>${arr[0].price}</div>
                </div>
                <div class="middle_message">
                    <div class="middle_messagename">
                        <div class="middle_key">通 用 名 ：</div>
                        <div class="middle_keyass">${arr[0]. common_name}</div>
                    </div>
                    <div class="middle_messagename">
                        <div class="middle_key">厂    家 ：</div>
                        <div class="middle_keyass">${arr[0]. facture}</div>
                    </div>
                    <div class="middle_messagename">
                        <div class="middle_key">批准文号 </div>
                        <div class="middle_keyass">${arr[0]. app_num}</div>
                    </div>
                    <div class="middle_messagename middle_type">
                        <div class="middle_key mkt">规　　格 ： </div>
                        <div class="middle_keyass middle_keylist">
                            
                        </div>
                    </div>
                </div>
                <div id="middle_submit">
                    <div class="middle_key mkt">附近门店</div>
                    <div class="middle_keyass msubmit ">
                        <div class="msubmit_text">广州越秀店</div>
                        <span class="msubmit_downarrow"></span>
                        <ul class="msubmit_ul">
                            <li class="msubmit_lis">广州秀越店</li>
                            <li class="msubmit_lis">广州海珠店</li>
                            <li class="msubmit_lis">广州荔湾店</li>
                            <li class="msubmit_lis">北京海淀店</li>
                            <li class="msubmit_lis">北京朝阳店</li>
                            <li class="msubmit_lis">成都青羊店</li>
                            <li class="msubmit_lis">成都武侯店</li>
                            <li class="msubmit_lis">上海徐昌店</li>
                            <li class="msubmit_lis">上海浦东店</li>
                            <li class="msubmit_lis">上海静安店</li>
                            <li class="msubmit_lis">济南店</li>
                            <li class="msubmit_lis">杭州店</li>
                            <li class="msubmit_lis">西安店</li>
                            <li class="msubmit_lis">南京店</li>
                            <li class="msubmit_lis">昆明店</li>
                            <li class="msubmit_lis">武汉雪松店</li>
                            <li class="msubmit_lis">天津店</li>
                            <li class="msubmit_lis">无锡店</li>
                            <li class="msubmit_lis">重庆店</li>
                            <li class="msubmit_lis">福州店</li>
                            <li class="msubmit_lis">南宁店</li>
                            <li class="msubmit_lis">沈阳店</li>
                            <li class="msubmit_lis">深圳店</li>
                            <li class="msubmit_lis">湛江店</li>
                            <li class="msubmit_lis">中山店</li>
                            <li class="msubmit_lis">厦门店</li>
                            <li class="msubmit_lis">佛山店</li>
                            <li class="msubmit_lis">汕头店</li>
                            <li class="msubmit_lis">哈尔滨店</li>
                            <li class="msubmit_lis">合肥店</li>
                            <li class="msubmit_lis">吉林店</li>
                            <li class="msubmit_lis">长沙店</li>
                            <li class="msubmit_lis">大连店</li>
                            <li class="msubmit_lis">青岛店</li>
                            <li class="msubmit_lis">苏州吴中</li>
                            <li class="msubmit_lis">苏州互益</li>
                            <li class="msubmit_lis">茂名店</li>
                        </ul>
                    </div>
                </div>
                <div id="middle_num">
                    <div class="middle_key mkt">数　　量</div>
                    <div class="middle_keyass">
                        <div class="mnum_box">
                            <input type="text" name="" id="mnum_goods" value="1">
                            <a href="javascript:;" class="mnum_add"></a>
                            <a href="javascript:;" class="mnum_reduce"></a>
                        </div>
                        <a href="javascript:;" class="mnum_btn">加入购物车</a>
                        <p class="mnum_inline">在售</p>
                    </div>
                </div>
                <p class="this_medicine">本品为处方药，您成功预定后，展示药品的药店会根据处方审核结果主动与您联系。 （如需协助请拨打 <span>400-168-0606</span>）</p>
                <div id="three">
                    <a href="javascript:;" class="three_box">
                        <span class="three_img"></span>
                        正品保证
                    </a>
                    <a href="javascript:;" class="three_box">
                        <span class="three_img"></span>
                        提供发票
                    </a>
                    <a href="javascript:;" class="three_box">
                        <span class="three_img"></span>
                        隐私包装

                    </a>
                </div>
            </div>`);

            //渲染放大镜（循环添加）
            for(var i=0;i<imgarr.length;i++){
                $('#imgbox').append("<img src='../images/"+imgarr[i]+"' alt='' class='img'>")
                $('#ul').append("<img src='../images/"+imgarr[i]+"' alt='' class='smg'>")
                $('#box2').append("<img src='../images/"+imgarr[i]+"' alt='' class='bmg'>")
            }
            $('#imgbox .img:eq(0)').css('display','block');

            //渲染规格
            for(var j=0;j<spec.length;j++){
                // console.log($('.middle_keylist'));
                $('.middle_keylist').append('<li class="middle_item">'+spec[j]+'<span class="mitem_img"></span></li>');
            }

            // console.log($('#navi .avi:eq(3)').html());
            $('#navi .avi:eq(3)').html(arr[0].name);

            //抖动地狱
            var body = document.getElementsByTagName('body')[0];
            var content_a = document.getElementById('content_a');
            var content_body = document.getElementsByClassName('content_body')[0];
            //放大镜插件（自家用）—————————————————————————————————————————————————————————————
            var imgbox = document.getElementById('imgbox');
            var bigimgs = document.getElementsByClassName('img');
            var smimgs = document.getElementsByClassName('smg');
            var box2 = document.getElementById('box2');
            var fuckimg = document.getElementsByClassName('bmg');

            var thisimg = 0;//当前图片下标/

            //基本的选项卡
            for (let i = 0; i < smimgs.length; i++) {
                smimgs[i].onmouseover = function () {
                    for (var j = 0; j < smimgs.length; j++) {
                        smimgs[j].className = 'smg';//样式循环清空
                        bigimgs[j].style.display = 'none'
                        fuckimg[j].style.display = 'none'

                    }
                    this.className = 'smg active';
                    bigimgs[i].style.display = 'block';
                    fuckimg[i].style.display = 'block';
                    // console.log(mains[i]);
                    thisimg = i;//将下标传出去
                }
            }

            var shadow = document.getElementById('shadow');//遮罩

            //封装遮罩滑动的函数 参数:window.scrollY
            function move(wcy, wcx) {
                imgbox.onmousemove = function (ev) {
                    shadow.style.display = 'block';//鼠标移入显示
                    box2.style.display = 'block';

                    var outerleft = Math.floor(body.offsetWidth - content_a.offsetWidth) / 2;//判断缩放（盒子与页面最左边的距离）
                    if (Math.floor(content_body.offsetLeft) <= 0) {
                        outerleft = 0;
                    }


                    var ix = Math.floor(ev.clientX - shadow.parentNode.offsetLeft - (shadow.offsetWidth / 2) - Math.ceil(outerleft - wcx));
                    var iy = Math.floor(ev.clientY - shadow.parentNode.offsetTop - (shadow.offsetHeight / 2) + Math.ceil(wcy - content_body.offsetTop));//不加wcy滚动时就会出现偏差
                    // console.log(ev.clientX);
                    // console.log(iy)



                    if (ix <= 0) {
                        ix = 0;
                    } else if (ix >= Math.floor(shadow.parentNode.offsetWidth - shadow.offsetWidth - 2)) {
                        ix = Math.floor(shadow.parentNode.offsetWidth - shadow.offsetWidth - 2)
                    }
                    if (iy <= 0) {
                        iy = 0;
                    } else if (iy >= Math.floor(shadow.parentNode.offsetHeight - shadow.offsetHeight - 2)) {
                        iy = Math.floor(shadow.parentNode.offsetHeight - shadow.offsetHeight - 2);
                    }
                    // console.log(shadow.parentNode.offsetHeight);
                    // console.log(iy);

                    shadow.style.left = ix + 'px';
                    shadow.style.top = iy + 'px';

                    //放大镜主要内容
                    var bily = Math.round(box2.offsetWidth / shadow.offsetWidth);//获取缩放比例
                    // console.log(bily);
                    for (var i = 0; i < fuckimg.length; i++) {
                        // console.log(i);//获取图片的所有下标
                        fuckimg[i].style.left = -(ix * bily) + 'px';
                        fuckimg[i].style.top = -(iy * bily) + 'px';

                        // imgbox.onmouseout=function(){
                        //     shadow.style.display='none';
                        //     fuckimg[i].sty
                        // }
                    }
                    imgbox.onmouseout = function () {//鼠标移出隐藏
                        shadow.style.display = 'none';
                        box2.style.display = 'none';
                    }
                }
            }

            move(Math.floor(window.scrollY), Math.floor(window.scrollX));

            //页面有滚动条时的状况
            window.onscroll = function () {
                // console.log(window.scrollY);
                var wcy = Math.floor(window.scrollY)//获取滚动距离
                var wcx = Math.floor(window.scrollX);
                move(wcy, wcx);
            }

            //左右点击
            var prev = document.getElementsByClassName('prev')[0];
            var next = document.getElementsByClassName('next')[0];
            smimgs[0].className = 'smg active';

            prev.onmousedown = function (ev) {
                ev.preventDefault();
                if (thisimg <= 0) {//判断下标最大最小值
                    thisimg = 0;
                } else {
                    thisimg--;
                }
                for (var j = 0; j < smimgs.length; j++) {
                    smimgs[j].className = 'smg';//样式循环清空
                    bigimgs[j].style.display = 'none'
                    fuckimg[j].style.display = 'none'
                }
                smimgs[thisimg].className = 'smg active';
                bigimgs[thisimg].style.display = 'block';
                fuckimg[thisimg].style.display = 'block';
            }

            next.onmousedown = function (ev) {
                ev.preventDefault();

                thisimg++;
                if (thisimg >= smimgs.length) {//判断下标最大最小值
                    thisimg = smimgs.length - 1;
                }
                // console.log(smimgs.length);
                // console.log(thisimg);
                for (var j = 0; j < smimgs.length; j++) {
                    smimgs[j].className = 'smg';//样式循环清空
                    bigimgs[j].style.display = 'none'
                    fuckimg[j].style.display = 'none'
                }
                smimgs[thisimg].className = 'smg active';
                bigimgs[thisimg].style.display = 'block';
                fuckimg[thisimg].style.display = 'block';
            }

            //产品规格列表点击当前项高亮的功能
            $('#middle_text .middle_item:eq(0)').addClass('now_item');//初始化
            $('#middle_text .middle_item:eq(0) span').css('display', 'block');

            $('#middle_text').on('click', '.middle_item', function () {
                // console.log($(this));
                $(this).addClass('now_item').siblings().removeClass('now_item');
                $(this).children().css('display', 'block').parent().siblings().children().css('display', 'none');
            });

            //点击列表获得地址
            $('.msubmit_text').html('广州秀越店');
            $(".msubmit_ul").on('click', '.msubmit_lis', function () {
                // console.log($(this).html());
                $('.msubmit_text').html($(this).html());
            });

            //选择数量
            $('.mnum_add').on('click', function () {//数量+1
                var num = $('#mnum_goods').val() * 1;
                if (num >= 999) {
                    num = 999;
                } else {
                    num++;
                }

                // console.log($('#mnum_goods').val());
                $('#mnum_goods').val(num);
            });

            $('.mnum_reduce').on('click', function () {//数量-1
                var num = $('#mnum_goods').val() * 1;
                if (num <= 1) {
                    num = 1;
                } else {
                    num--;
                }
                // console.log($('#mnum_goods').val());
                $('#mnum_goods').val(num);
            });

            //手动输入数量
            $('#mnum_goods').on('keyup', function () {
                // console.log($(this).val());
                var num = $(this).val();
                if (num <= 1) {
                    $(this).val(1);
                } else if (num > 999) {
                    $(this).val(999);
                }
            });
            console.log(arr[0].name);
            //购物车
            $('.mnum_btn').click(function () {
                // console.log($('.msubmit_text').text());
                $.ajax({
                    type: 'get',
                    url: '../api/indexgoods.php',
                    data: {
                        goods: 'to_gwc',
                        username: window.localStorage.username,
                        gwc_data: arr[0].name + ',' + $('.msubmit_text').text() + ',' + $('#mnum_goods').val()+ ',' +arr[0].price+ ',' +$('.middle_keylist .now_item').text() + '&',
                    },
                    success: function (str) {
                        // console.log(str);
                        
                        if(window.localStorage.username){//检测登录状态
                            if (str == 'true') {//检测数据是否导入成功
                                alert('添加成功');
                                var istrue = confirm('是否进入购物车页面？');
                                if (istrue) {
                                    location.href = 'http://47.112.204.27:894/html/gwc.html';
                                }
                            }else{
                                alert('添加失败');
                            }
                        }else{
                            alert('请先登录');
                            var islogin=confirm('是否进入登录页？');
                            if(islogin){
                                location.href='http://47.112.204.27:894/html/login.html';
                            }
                        }
                    }
                });
            });
        }
    });
});