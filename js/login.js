$(function(){

    //登录选项卡功能————————————————————————————————————————————————————————————————————————————————
    $('#tab .doublelist:eq(0)').css('color','#72a8ee').children('.little_blue').css('display','block');//初始化
    $('#tab .doublelist:eq(1)').css('color','#000').children('.little_blue').css('display','none');
    $('#content_body .login').eq(1).css('display','none')
    $('#tab .doublelist').on('click',function(){
        // console.log($(this).index());
        $(this).css('color','#72a8ee').children('.little_blue').css('display','block');
        $(this).siblings().css('color','#000').children('.little_blue').css('display','none');
        $('#content_body .login').eq($(this).index()).css('display','block').siblings().css('display','none');
    });

    //显示正确与错误信息的函数
    //参数一表示当前是第几步
    //参数二表示当前第几步的第几个input
    //参数三表示想要输入的错误内容
    function phone_false2(num,nam,tex){
        $('.login:eq('+num+') .inp_tex:eq('+nam+')').css('border','1px solid #ff9a91');
        $('.login:eq('+num+') .error_tex:eq('+nam+')').css('display','block');
        $('.login:eq('+num+') .error_tex:eq('+nam+')').html(tex);
        // $('.login:eq('+num+') .phone_yesimg:eq('+nam+')').css('display','none');
    }
    function phone_falsetyper(num,nam,tex){
        $('.login:eq('+num+') .phone_falseborer:eq('+nam+')').css('border','1px solid #ff9a91');
        $('.login:eq('+num+') .error_tex:eq('+nam+')').css('display','block');
        $('.login:eq('+num+') .error_tex:eq('+nam+')').html(tex);
        // $('.login:eq('+num+') .phone_yesimg:eq('+nam+')').css('display','none');
    }
    //验证正确所出现的样式
    function phone_true2(num,nam){
        $('.login:eq('+num+') .inp_tex:eq('+nam+')').css('border','1px solid #ddd');
        $('.login:eq('+num+') .error_tex:eq('+nam+')').css('display','none');
        // $('.login:eq('+num+') .error_tex:eq('+nam+')').html(tex);
        // $('.login:eq('+num+') .phone_yesimg:eq('+nam+')').css('display','none');
    }
    function phone_truetyper(num,nam){
        $('.login:eq('+num+') .phone_falseborer:eq('+nam+')').css('border','1px solid #ddd');
        $('.login:eq('+num+') .error_tex:eq('+nam+')').css('display','none');
    }

    //placehol的显示隐藏功能
    function placehole(ele,val) {
        ele.on('focus', function () {
            ele.attr('placeholder', '');
        });
        ele.on('blur', function () {
            ele.attr('placeholder', val);
        });
    }

    //判断是否输入手机号
    placehole($('.login:eq(0) .inp_tex:eq(0)'),'请输入手机号');
    placehole($('.login:eq(0) .inp_tex:eq(1)'),'请输入密码');

    $('.login:eq(0) .inp_tex:eq(0)').on('blur',function(){
        // console.log('true');
        if($('.login:eq(0) .inp_tex:eq(0)').val()==''){
            phone_false2(0,0,'请输入手机号');
        }else{
            phone_true2(0,0);
        }
    });

    //提交时做出的判断
    $('.login:eq(0) .login_btn').click(function () {
        //输入账号的非空判断
        if ($('.login:eq(0) .inp_tex:eq(0)').val() == '') {
            phone_false2(0, 0, '请输入手机号');
        } else {
            phone_true2(0, 0);

            //输入密码的非空判断
            if ($('.login:eq(0) .inp_tex:eq(1)').val() == '') {
                phone_false2(0, 1, '请输入密码');
            } else {
                phone_true2(0, 1);

                //账号密码与服务器中的数据进行判断
                $.ajax({
                    type:'post',
                    url:'../api/indexgoods.php',
                    data:{
                        goods:'loginx',
                        phone:$('.login:eq(0) .inp_tex:eq(0)').val(),
                        password:$('.login:eq(0) .inp_tex:eq(1)').val(),
                    },
                    success:function(str){
                        // console.log(str);
                        if(str=='true'){//成功跳转
                            //判断当前的登录状态
                            if(window.localStorage.username){
                                alert('您当前是登录状态,不需要再登录');
                                window.location.href='http://47.112.204.27:894/index.html';
                            }else{
                                window.localStorage.username=$('.login:eq(0) .inp_tex:eq(0)').val();
                                alert('登录成功');
                                window.location.href='http://47.112.204.27:894/index.html';
                            }
                            
                        }else{
                            phone_false2(0, 1, '账号或密码错误');
                        }
                    }
                });
            }
        }
    });



    //B模块功能————————————————————————————————————————————————————————
    $('.loginb .phone_falseborer:eq(2)').css('display','none');

    var clicktrue=false;
    //封装ajax
    function login_rg(truth){
        $.ajax({
            type: 'post',
            url: '../api/indexgoods.php',
            data: {
                goods: 'reg1',
                phone: $('.loginb .phone_falseborer:eq(0) .phone_text').val(),
            },
            success: function (str) {
                console.log(str);
                if(str=='false'){//若服务器有数据则下一步
                    $('.phone_yesimg:eq(0)').css('display','block');
                    phone_truetyper(1, 0);
                    // truth;
                    // console.log(truth);
                    // isblock(truth);
                    
                    //点击事件专属的代码(通过是否有参数判断)
                    if(truth=='true'){
                        alert('可以进行短信验证');
                        $('.loginb .phone_falseborer:eq(1)').css('display','none');
                        $('.loginb .phone_falseborer:eq(2)').css('display','block');
                        clicktrue=true;
                    }
                }else{
                    phone_false('手机号码不存在，请先注册!');
                }
            }
        });
    }

    //手机号码onblur判断
    $('.loginb .phone_falseborer:eq(0) .phone_text:eq(0)').on('blur',function(){
        clicktrue=false;
        if($('.loginb .phone_falseborer:eq(0) .phone_text').val()){
            phone_truetyper(1, 0);
            var phone_reg=/^1(3|4|5|7|8)\d{9}$/;
            if(phone_reg.test($('.loginb .phone_falseborer:eq(0) .phone_text:eq(0)').val())){
                // console.log(true);
                phone_truetyper(1, 0);
                login_rg();
                
            }else{
                phone_falsetyper(1, 0, '手机号码格式不正确');
            }
        }else{
            phone_falsetyper(1, 0, '请输入手机号码');
        }
    })

    //号码点击判断
    $('.loginb .phone_falseborer:eq(1)').click(function(){
        clicktrue=false;
        if($('.loginb .phone_falseborer:eq(0) .phone_text').val()){
            phone_truetyper(1, 0);
            var phone_reg=/^1(3|4|5|7|8)\d{9}$/;
            if(phone_reg.test($('.loginb .phone_falseborer:eq(0) .phone_text:eq(0)').val())){
                // console.log(true);
                phone_truetyper(1, 0);
                login_rg('true');
                
            }else{
                phone_falsetyper(1, 0, '手机号码格式不正确');
            }
        }else{
            phone_falsetyper(1, 0, '请输入手机号码');
        }
    });


    var ysmistrue=false;//设置当前是否可以进行验证的开关
    //验证码定时功能——————————————————————————————————————
    $('#yzm_yes').on('click','a',function () {
        ysmistrue=true;
        var nowtime = 120;//定时器的时间
        $('#yzm_yes').html(+nowtime + 's后重新发送');//初始化
        $('#yzm_yes a').css('display', 'none');


        var r = parseInt(Math.random() * 256);//随机到的颜色
        var g = parseInt(Math.random() * 256);
        var b = parseInt(Math.random() * 256);
        var word = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
        var sb = [];
        for (var i = 0; i < 6; i++) {
            var num = parseInt(Math.random() * 10);
            sb.push(word[num]);
            // String(sb)
            var str = sb.join('');//最终生成的6位验证码
            
        }
        //渲染验证码
        $('.loginb .phone_word:eq(1)').css({background:'rgb('+r+','+g+','+b+')',color:'rgb('+b+','+r+','+g+')'}).html(str);
        // console.log(str);

        //设置定时器并显示剩余时间
        var yzmtimer = setInterval(function () {
            nowtime--;
            // console.log(nowtime);
            $('#yzm_yes').html(+nowtime + 's后重新发送');

            if (nowtime < 0) {
                //倒计时完毕后初始化
                // $('#yzm_yes a').css('display', 'inline');
                ysmistrue=false;
                $('#yzm_yes').html('<a href="javascript:void(0)">发送短信</a>');
                clearInterval(yzmtimer);
                $('.phone_word:eq(1)').css({background:'#fff',color:'#4e4e4e'}).html('手机验证码');
            }
        }, 1000);


        $('.loginb .login_btn').click(function(){
            if(clicktrue&&ysmistrue){
                //判断当前登录状态
                if(window.localStorage.username){
                    alert('您当前是登录状态,不需要再登录');
                    window.location.href='http://47.112.204.27:894/index.html';
                }else{
                    window.localStorage.username=$('.loginb .phone_falseborer:eq(0) .phone_text').val();
                    alert('登录成功!');
                    window.location.href='http://47.112.204.27:894/index.html';
                }
                
            }else{
                alert('验证失败');
            }
        });
    });
});