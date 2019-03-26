$(function(){
    //placehol的显示隐藏功能
    function placehole(ele,val) {
        ele.on('focus', function () {
            ele.attr('placeholder', '');
        });
        ele.on('blur', function () {
            ele.attr('placeholder', val);
        });
    }
    placehole($('.phone_text:eq(0)'),'请输入手机号码');
    placehole($('.phone_text:eq(1)'),'请输入验证码');
    placehole($('.phone_text:eq(2)'),'请输入密码');
    placehole($('.phone_text:eq(3)'),'请输入密码');
    $('.reg_box:eq(0) .phone_falseborer:eq(2)').css('display','none');

//验证当前手机号是否可以注册(数据库中有没有与之相同的信息)
    $('.reg_box:eq(0) .phone_text:eq(0)').on('change', function () {
        phone_ajax();
    });
    var clicktrue=false;//判断是否进入短信验证状态的开关
    //通过点击事件执行的验证功能
    $('.reg_box:eq(0) .phone_falseborer:eq(1)').on('click',function(){
        if($('.reg_box:eq(0) .phone_text:eq(0)').val()==''){
            phone_false('请输入手机号码!');
        }else{
            phone_ajax('true');
        }
        
    })

    //封装验证错误时显示的样式，参数代表错误时显示的字
    function phone_false(tex){
        $('.reg_box:eq(0) .phone_falseborer:eq(0)').css('border','1px solid #ff9a91');
        $('.reg_box:eq(0) .phone_false1').css('display','block');
        $('.reg_box:eq(0) .phone_false1').html(tex);
        $('.phone_yesimg:eq(0)').css('display','none');
    }

    //封装手机验证的ajax
    function phone_ajax(truth){
        var phone_reg = /^1(3|4|5|7|8)\d{9}$/;//手机号正则
        if (phone_reg.test($('.reg_box:eq(0) .phone_text:eq(0)').val())) {//判断正则
            // console.log(true);
            $.ajax({
                type: 'post',
                url: '../api/indexgoods.php',
                data: {
                    goods: 'reg1',
                    phone: $('.reg_box:eq(0) .phone_text:eq(0)').val(),
                },
                success: function (str) {
                    // console.log(str);
                    if(str=='true'){//若服务器不存在相应样式则可以注册并添加相应样式
                        $('.phone_yesimg:eq(0)').css('display','block');
                        $('.reg_box:eq(0) .phone_falseborer:eq(0)').css('border','1px solid #dddddd');
                        $('.reg_box:eq(0) .phone_false1').css('display','none');
                        // truth;
                        // console.log(truth);
                        // isblock(truth);
                        
                        //点击事件专属的代码(通过是否有参数判断)
                        if(truth=='true'){
                            alert('可以进行短信验证');
                            $('.reg_box:eq(0) .phone_falseborer:eq(1)').css('display','none');
                            $('.reg_box:eq(0) .phone_falseborer:eq(2)').css('display','block');
                            clicktrue=true;
                        }
                    }else{
                        phone_false('该号码已存在!');
                    }
                }
            });
        } else {
            phone_false('手机号码格式错误!');
        }
    }


    
    
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
        $('.reg_box:eq(0) .phone_word:eq(1)').css({background:'rgb('+r+','+g+','+b+')',color:'rgb('+b+','+r+','+g+')'}).html(str);
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
                $('.reg_box:eq(0) .phone_word:eq(1)').css({background:'#fff',color:'#4e4e4e'}).html('手机验证码');
            }
        }, 1000);
    });

    //第一步的确认按钮
    $('.reg_box:eq(0) .next_btn').click(function(){
        if($('.reg_box:eq(0) .phone_text:eq(0)').val()==''){
            phone_false('请输入手机号码!');
        }else{
            phone_ajax();
        }
        if(clicktrue&&ysmistrue){
            //判断验证码是否验证正确
            if($('.reg_box:eq(0) .phone_text:eq(1)').val()==$('.reg_box:eq(0) .phone_word:eq(1)').html()){
                $('.reg_box:eq(0)').css('display','none');
                $('.reg_box:eq(1)').css('display','block');
                $('#content .content_img').css('background-position','0px -83px');
            }else{
                alert('验证错误');
            }
            // console.log($('.reg_box:eq(0) .phone_text:eq(1)').val());
        }
    });

    //显示正确与错误信息的函数
    //参数一表示当前是第几步
    //参数二表示当前第几步的第几个input
    //参数三表示想要输入的错误内容
    function phone_false2(num,nam,tex){
        $('.reg_box:eq('+num+') .phone_falseborer:eq('+nam+')').css('border','1px solid #ff9a91');
        $('.reg_box:eq('+num+') .phone_false1:eq('+nam+')').css('display','block');
        $('.reg_box:eq('+num+') .phone_false1:eq('+nam+')').html(tex);
        $('.reg_box:eq('+num+') .phone_yesimg:eq('+nam+')').css('display','none');
    }

    var istruea=false;
    var istrueb=false;

    //密码验证功能1
    function b2true1(){
        if(reg2.test($('.phone_text:eq(2)').val())){
            
            if(reg3.test($('.phone_text:eq(2)').val())){
                $('.reg_box:eq(1) .phone_yesimg:eq(0)').css('display','block');
                $('.reg_box:eq(1) .phone_falseborer:eq(0)').css('border','1px solid #dddddd');
                $('.reg_box:eq(1) .phone_false1:eq(0)').css('display','none');
                istruea=true;
            }else{
                phone_false2(1,0,'密码必须要有英文');
                istruea=false;
            }
        }else{
            phone_false2(1,0,'密码必须是8-16位的英文或数字');
            istruea=false;
        }
    }

    //确认密码验证功能
    function b2true2(){
        if($('.phone_text:eq(3)').val()==$('.phone_text:eq(2)').val()){
            $('.reg_box:eq(1) .phone_yesimg:eq(1)').css('display','block');
            $('.reg_box:eq(1) .phone_falseborer:eq(1)').css('border','1px solid #dddddd');
            $('.reg_box:eq(1) .phone_false1:eq(1)').css('display','none');
            istrueb=true;
        }else{
            phone_false2(1,1,'验证错误');
            istrueb=false;
        }
    }

    
    var reg2=/^\w{8,16}$/;//判断长度是否正确
    var reg3=/^.*[A-Za-z]+.*$/;//判断是否有英文
    //密码的验证————————————————————————————————————————————————————
    $('.phone_text:eq(2)').on('change',function(){
        // console.log('true');
        b2true1();
    });

    $('.phone_text:eq(3)').on('change',function(){
        b2true2()
    })

    $('.reg_box:eq(1) .next_btn').click(function(){
        b2true1();
        b2true2();
        if(istruea&&istrueb){//两个开关同时验证则输入数据库
            $.ajax({
                type:'post',
                url:'../api/indexgoods.php',
                data:{
                    goods:'reg_true',
                    phone:$('.reg_box:eq(0) .phone_text:eq(0)').val(),
                    password:$('.reg_box:eq(1) .phone_text:eq(0)').val()
                },
                success:function(str){
                    // console.log(str);
                    if(str=='true'){
                        var location=window.localStorage;
                        alert('注册成功!');
                        location.username=$('.reg_box:eq(0) .phone_text:eq(0)').val();
                        $('.reg_box:eq(1)').css('display','none');
                        $('#true_box').css('display','block');
                        $('.content_img').css('display','none');
                    }else{
                        alert('非法操作，请重新注册');
                        window.location.reload();
                    }
                }
            });
        }
    });

    //跳转回主页
    $('#true_box .goshop').click(function(){
        window.location.href='http://47.112.204.27:894/index.html';
    })
});