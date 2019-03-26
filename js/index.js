$(function(){
    // console.log(returnCitySN.cname);
    //获取jsonp的地址信息并输出到页面上
    $('#local_place').html(returnCitySN.cname);
    // $.ajax({
    //     type:'get',
    //     url:'http://pv.sohu.com/cityjson',
    //     data:{},
    //     success:function(returnCitySN){
    //         console.log(returnCitySN);
    //     }
    // })

    $('#tittle_img').click(function(){
        window.location.href='http://47.112.204.27:894/index.html';//主页点击跳转
    });

    // console.log();
    //设置placeholder的显示和隐藏
    $('#s_inpt').focus(function(){
        $('#s_inpt').attr('placeholder','');
    });
    $('#s_inpt').blur(function(){
        $('#s_inpt').attr('placeholder','医护星尖锐克忧');
    });

    // $('#goods').hover(function(){
    //     console.log('true');
    //     $('#goodsul .glis:eq(0) .biglists').css('display','block');
    // },function(){
    //     console.log('false');
    //     $('#goodsul .glis .biglists').css('display','none');
    // })


    // var imgul=document.getElementById('imgul');
    var lbt=document.getElementById('lbt');
    var backimg=lbt.getElementsByClassName('backimg');
    var imgul=document.getElementById('lbt_img');
    var banImgs=imgul.getElementsByTagName('img');
    var uldood=document.getElementById('dodul');
    var assdod=uldood.getElementsByTagName('a');
    var banleft=document.getElementById('banleft');
    var banright=document.getElementById('banright');
    // console.log(backimg);

    //淡入淡出轮播图功能————————————————————————————————————————————————————————————————
    var nowthis=0;//当前图片的下标，要想获得当前时间，就要在外面存
    var nowIndex=2;//当前图片的z-index的值，与nowthis初始值不一样
    var time5s=null;
    //定时器
    
    time5s=setInterval(ntrtime,4000);

    //设置nowthis及nowindex和判断每次循环
    function ntrtime() {
        nowthis++
        if (nowthis >= banImgs.length) {//判断图片的一次循环
            nowthis = 0
            for (let i = 0; i < banImgs.length; i++) {//遍历完成
                backimg[i].style.zIndex = 1;
                banImgs[i].style.zIndex = 1;
                // banImgs[i].style.backgroundColor='rgba(255,255,255,0)';
                banImgs[i].style.opacity = 0;
                backimg[i].style.opacity = 0;
                // console.log(i);
            }

            nowIndex = 1;
        }
        
        baImg(backimg);
        thisImg(banImgs);
    }
    // console.log(backimg);
    function thisImg(banImgs) {//当前图片的函数(使用之前要定义nowthis,执行之后nowindex自增1)
        
        banImgs[nowthis].style.zIndex = (nowIndex)++;
        // banImgs[nowthis].style.backgroundColor='rgba(255,255,255,0.9)';
        // banImgs.style.opacity=1;
        for (let j = 0; j < banImgs.length; j++) {
            // console.log(j);
            banImgs[j].style.opacity = 0;
        }
        // banImgs[nowthis].style.opacity=.6;
        banImgs[nowthis].style.opacity = 1;
        // console.log(nowthis);

        //小圆点状态实时获取
        for(let n=0;n<banImgs.length;n++){
            assdod[n].className='dodclear';
            // console.log(assdod[n]);
        }
        assdod[nowthis].className='dodactive';
    }

    function baImg(backimg) {//定义背景颜色部分函数(使用之前要定义nowthis,执行之后nowindex自增1)
        
        // backimg[nowthis].style.zIndex = (nowIndex)++;
        // banImgs[nowthis].style.backgroundColor='rgba(255,255,255,0.9)';
        // banImgs.style.opacity=1;
        for (let j = 0; j < backimg.length; j++) {
            // console.log(j);
            backimg[j].style.opacity = 0;
        }
        // banImgs[nowthis].style.opacity=.6;
        backimg[nowthis].style.opacity = 1;
        // console.log(nowthis);
    }

    //点击上一张图片
    banleft.onclick = function () {
        nowthis--;
        if (nowthis < 0) {
            nowthis = banImgs.length - 1;
        }
        // console.log(nowthis);
        thisImg(banImgs);
        baImg(backimg);
        // banImgs[nowthis].style.zIndex=4;
        // banImgs[nowthis].style.opacity=1;
        // console.log(banImgs[nowthis]);
    }
    //点击下一张图片
    banright.onclick=function(){
        ntrtime()
        // console.log(nowthis);
    }

    //鼠标滑动取消定时器
    imgul.onmouseover=function(){
        clearInterval(time5s);
    }
    //鼠标滑动重设定时器
    imgul.onmouseout=function(){
        clearInterval(time5s);
        time5s=setInterval(ntrtime,3000);
    }

    //点击底下小圆点
    for(let k=0;k<banImgs.length;k++){
        
        // console.log(assdod[k]);
        assdod[k].onclick=function(){
            //排他
            for(let m=0;m<banImgs.length;m++){
                assdod[m].className='dodclear';
                // console.log(this);
            }
            //添加样式
            this.className='dodactive';
            
            // 点击当前图片不执行
            if(nowthis==k){
                return;
            }

            //控制当前图片
            nowthis=k;

            thisImg(banImgs);
            baImg(backimg);
        }  
    }


    //全国分店的翻页功能————————————————————————————————
    $nowpage=1;//当前页码
    $maxpagenon=$('#ap_lbts .pl').length/18;//计算最大页码（未取整）
    $maxpage=Math.ceil($maxpagenon);//最大页码
    // console.log($maxpage);
    

    
    //true显示图一,false显示图二
    $istrue=true;//由于底部每页轮播图的个数只有两个，故只需要设一个开关判断
    function istrueimg() {

        $('#lowouter .inner_img').each(function (i) {//遍历所有图片
            // console.log(i);
            $thisimg = $('#lowouter .inner_img').eq(i).css('display');//当前显示的图片组

            if ($thisimg == 'block') {//判断当前显示的图片组
                // console.log($('#lowouter .inner_img').eq(i).children('.doubleimg:eq(0)'));
                //执行显示的图片组中具体显示哪张图片的判断
                if ($istrue == true) {
                    $('#lowouter .inner_img').eq(i).children('.doubleimg:eq(0)').css('opacity', 1);
                    $('#lowouter .inner_img').eq(i).children('.doubleimg:eq(1)').css('opacity', 0);
                    $istrue = false;
                } else {
                    $('#lowouter .inner_img').eq(i).children('.doubleimg:eq(0)').css('opacity', 0);
                    $('#lowouter .inner_img').eq(i).children('.doubleimg:eq(1)').css('opacity', 1);
                    $istrue = true;
                }
            }

        });
    }

    //全国服务网点的点击事件及全国分店底部的轮播图功能
    $('#ap_lbts').on('click','.pl',function(){
        // console.log($(this).index());
        // console.log($('#lowouter .inner_img .doubleimg:eq(0)'));
        $(this).addClass('plin').siblings().removeClass('plin');//图标点击时的样式

        $('#lowouter .inner_img').eq($(this).index()).css('display','block').siblings().css('display','none');
        istrueimg();
        $('#phones .phoneslists').eq($(this).index()).css('display','block').siblings().css('display','none');
        //显示和按钮相同下标的图片组
    });

    $('#low_prev').click(function(){
        // $istrue=true;
        istrueimg();
    });
    $('#low_next').click(function(){
        // $istrue=false;
        istrueimg();
    });

    $('#ap_prev').click(function(){//点击页码-1,并对其进行限制
        $nowpage--;
        if($nowpage<=1){//最大最小页码限制
            $nowpage=1;
            $('#ap_prev').css('background-position','-419px -2px');//左右图标变化
        }else{
            $('#ap_prev').css('background-position','-461px -2px');//左右图标变化
        }

        if($nowpage>=$maxpage){//最大最小页码限制
            $nowpage=$maxpage;
            $('#ap_next').css('background-position','-440px -2px');//左右图标变化
            // console.log();
        }else{
            $('#ap_next').css('background-position','-482px -2px');//左右图标变化
        }

        //由当前页码判断当前显示的内容，即改变内容父元素的top值
        $('#ap_lbts').css('top',($nowpage-1)*-168);
    });

    $('#ap_next').click(function(){//点击页码+1,并对其进行限制
        $nowpage++;
        if($nowpage>=$maxpage){//最大最小页码限制
            $nowpage=$maxpage;
            $('#ap_next').css('background-position','-440px -2px');//左右图标变化
            // console.log();
        }else{
            $('#ap_next').css('background-position','-482px -2px');//左右图标变化
        }

        if($nowpage<=1){//最大最小页码限制
            $nowpage=1;
            $('#ap_prev').css('background-position','-419px -2px');//左右图标变化
        }else{
            $('#ap_prev').css('background-position','-461px -2px');//左右图标变化
        }

        //由当前页码判断当前显示的内容，即改变内容父元素的top值
        $('#ap_lbts').css('top',($nowpage-1)*-168);
    });

    if($nowpage<=1){
        $('#ap_prev').css('background-position','-419px -2px');//左右图标变化（初始化）
    }

    //由当前页码判断当前显示的内容，即改变内容父元素的top值(初始化)
    $('#ap_lbts').css('top',($nowpage-1)*-168);











    //使用插件无论如何都有bug(QAQ)
    //封装限时抢购栏的轮播图插件,第一个参数表示当前li,第二个参数表示当前轮播图组的下标
    //函数中所有的事件之前都要用unbind('click')解绑否则就会导致事件累加执行，导致严重的bug
    function lbt_amimate(li_num, lbt_num) {

        var truin = true;
        if (truin) {
            truin = false;

            //下方索引点初始化
            // console.log(li_num);
            $('.uldod:eq(' + li_num + ')').html("");
            //生成索引点
            $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').each(function (i) {
                // console.log($('.uldod:eq('+li_num+')').html());
                $('.uldod:eq(' + li_num + ')').append(`<li class=dods data-id='${i}'></li>`);
                // console.log($('.uldod:eq('+li_num+')').html());
                $('.uldod:eq(' + li_num + ') li:eq(0)').addClass('dods').siblings().removeClass('dods');
            });

            var iW = $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').innerWidth();
            // console.log(iW);
            // var timer = null;//当前时间图片的索引
            var imgIndex = 0;//设置当前图片的索引
            // timer = setInterval(function () { autoplay() }, 3000);

            //开始把图片都放到左边,第一张显示
            $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').css({ 'left': iW }).first().css({ 'left': 0 });

            //图片自行运动的函数
            // function autoplay() {

            //     $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').eq(imgIndex).animate({ 'left': -iW }, 800, 'swing');//旧图挪走

            //     imgIndex++;//定时器执行一次自增1,自增之后旧图变为新图

            //     // console.log(imgIndex);
            //     //下标到最大值后归零
            //     if (imgIndex >= $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').length) {
            //         imgIndex = 0;
            //     }
            //     $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').eq(imgIndex).css({ 'left': iW }).animate({ left: 0 }, 800, 'swing');//新图先瞬移到右边,然后移入可视区
            //     dod();

            // }
            // autoplay();

            // console.log($(imgIndex));
            //当前小点高亮显示
            function dod() {
                // console.log(imgIndex);
                //imgIndex的点高亮并做非空
                $('.uldod:eq(' + li_num + ') li').eq(imgIndex).addClass('dods').siblings().removeClass('dods');
            }
            // console.log($('.uldod li').attr('data-id'))
            //对下方小点进行事件委托
            $('.uldod:eq(' + li_num + ')').unbind('click').on('click', 'li', function (e) {
                //data-id相当于获取当前点击的点的下标,并将其存进thisId中
                e.preventDefault();//清除浏览器默认行为
                thisId = $(this).attr('data-id');
                // console.log(thisId);
                //原本的图片以怎样的方式移出
                if (thisId > imgIndex) {//点击小点的下标大于当前图片的下标
                    $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').eq(imgIndex).animate({ 'left': -iW }, 500, 'swing');//原来的图向左缓慢移出
                    $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').eq(thisId).css({ 'left': iW });//当前图片瞬移到右边准备移入
                }
                else if (thisId < imgIndex) {//点击小点的下标小于当前图片-的下标
                    $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').eq(imgIndex).animate({ 'left': iW }, 500, 'swing');//原来的图向右缓慢移出
                    $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').eq(thisId).css({ 'left': -iW });//当前图片瞬移到左边准备移入
                }
                //当前图片移动到可视区域
                $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').eq(thisId).animate({ 'left': 0 }, 500, 'swing');
                //imgIndex也一起变化
                imgIndex = thisId;
                dod();
                // console.log(imgIndex);
            });

            //鼠标移入暂停定时器
            // $('#banner').hover(function () {
            //     clearInterval(timer);
            // }, function () {
            //     timer = setInterval(function () { autoplay() }, 3000);
            // });

            //左右点击切换
            $('#newgoods_lbt .lot-prev:eq(' + li_num + ')').unbind('click').click(function (e) {
                e.preventDefault();//清除浏览器默认行为
                $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').eq(imgIndex).stop().animate({ 'left': iW }, 500, 'swing');//旧图挪走
                imgIndex--;
                if (imgIndex < 0) {
                    imgIndex = $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').length - 1;
                }
                $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').eq(imgIndex).css({ 'left': -iW }).animate({ 'left': 0 }, 500, 'swing');//新图先瞬移到右边,然后移入可视区
                dod();
                // console.log(imgIndex);
            });

            $('#newgoods_lbt .lot-next:eq(' + li_num + ')').unbind('click').click(function (e) {
                e.preventDefault();//清除浏览器默认行为
                $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').eq(imgIndex).stop().animate({ 'left': -iW }, 500, 'swing');//旧图挪走
                imgIndex++;
                if (imgIndex >= $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').length) {
                    imgIndex = 0;
                }
                $('.lbts:eq(' + li_num + ') .lot_list:eq(' + lbt_num + ') .bits').eq(imgIndex).css({ 'left': iW }).animate({ 'left': 0 }, 500, 'swing');//新图先瞬移到右边,然后移入可视区
                dod();
            });
            // console.log(imgIndex);
            // return null;
        }

    }



    

    //向四个复合轮播图板块循环添加事件
    for (let i = 0; i < $("#newgoods_lbt .lbts").length; i++) {
        // console.log(i);
        var truth = true;
        if (truth) {
            truth = false;
            lbt_amimate(i, 0);//初始化
            $("#newgoods_lbt .lbts_lists:eq(" + i + ") li:eq(0)").addClass('lb_color');//初始化
            $("#newgoods_lbt .lotsof_lbt:eq(" + i + ") .lot_list:eq(0)").eq($(this).index()).css('display', 'block').siblings().css('display', 'none');//轮播图初始化
            //事件委托
            $("#newgoods_lbt .lbts_lists:eq(" + i + ")").on('click', 'li', function (e) {
                // var truth = true;
                // if (truth) {
                //     truth = false;
                // console.log(e);
                e.preventDefault();//清除浏览器默认行为
                // console.log($(this).index());
                $(this).addClass('lb_color').siblings().removeClass('lb_color');
                //点击索引显示相应的轮播图组
                $("#newgoods_lbt .lotsof_lbt:eq(" + i + ") .lot_list").eq($(this).index()).css('display', 'block').siblings().css('display', 'none');

                // $(this).preventDefault();

                //该板块轮播图功能过于复杂，使用任何插件都会出bug
                // lbt_amimate(0,$(this).index());

                lbt_amimate(i, $(this).index());
                // console.log($(this).index());
                
            });
        }
    }


    var newgoods_lbt=document.getElementById('newgoods_lbt');
    newgoods_lbt.onmousedown=function(ev){
        var ev = ev || window.event;
        ev.returnValue = false;
        ev.preventDefault();
        return false;
    }

    //主页主要内容的渲染——————————————————————————————————————————
    //每个版块都可以通过页码获取相应的数据
    for(let j=0;j<$('.boy_content').length;j++){
        // console.log(j)

        $.ajax({
            type: 'get',
            url: 'api/indexgoods.php',
            data: {
                goods: 'boy',
                pages:j+1,
                nums:$('.boy_content:eq(0) .boy_lists').length
            },
            success: function ($str) {
                var $arr=JSON.parse($str);
                // console.log(j);
                for($i=0;$i<($arr.data).length;$i++){
                    // console.log($('.boy_content:eq('+(($arr.pages)-1)+')'));
                    
                    $('.boy_content:eq('+(($arr.pages)-1)+') .boy_lists')
                    .eq($i).html(` <img src="../images/${$arr.data[$i].img}" alt="" class="boy_listimg">
                    <a href="javascript:void(0)" class="boy_names">${$arr.data[$i].name}</a>
                    <p class="boy_price">￥${$arr.data[$i].price}</p>`);
                }
            }
        });
    }

    //回到顶部功能————————————————————————————————————————
    
    $('#rsuck .rlis:last-child').click(function(){
        window.scrollTo(0,0);
    })

    var rsuck=document.getElementById('rsuck');
    rsuck.onmousedown = function (ev) {
        var ev = ev || window.event;
        ev.returnValue = false;
        ev.preventDefault();
        return false;
    }
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

    //点击注销清空登录状态
    $('#top_right .rightli:eq(3) a').click(function(){
        window.localStorage.username='';
        window.location.reload;
    });

    //点击跳到列表页
    $('.boy_content li').click(function(){
        location.href='http://47.112.204.27:894/html/goodslists.html';
    });
});