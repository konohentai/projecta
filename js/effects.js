function getid(id) {
	return document.getElementById(id);
}

function getCookie(key) {
	var str = document.cookie; //name=lemon; age=18; price=88; like=男
	var arr = str.split('; '); //['name=lemon','age=18','price=88','like=男']
	for(var value of arr) {
		var arr2 = value.split('='); //['name','lemon'] ['age',18]
		if(key == arr2[0]) {
			return arr2[1];
		}
	}
}

//lists:列表的所有元素，  mains内容项的所有元素  ， clickMove判断以何种事件进行选项卡(实参填字符串mouseover/click)
function tab(lists,mains,clickMove,oldclass,newclass){
    // console.log(clickMove);
    if (clickMove == 'mouseover') {
        for (let i = 0; i < lists.length; i++) {

            lists[i].onmouseover = function () {

                for (var j = 0; j < lists.length; j++) {
                    lists[j].className = oldclass;//样式循环清空
                    mains[j].style.display = 'none'
                }
                this.className = oldclass+' '+newclass;
                mains[i].style.display = 'block';
                // console.log(mains[i]);
            }
        }
    }
    else if(clickMove == 'click'){
        for (let i = 0; i < lists.length; i++) {

            lists[i].onclick = function () {

                for (let j = 0; j < lists.length; j++) {
                    lists[j].className = oldclass;//样式循环清空
                    mains[j].style.display = 'none'
                }
                this.className = oldclass+' '+newclass;
                mains[i].style.display = 'block';
                // console.log(mains[i]);
            }
        }
    }
    
}


function tab02(lists,mains,clickMove,oldclass,newclass){
    // console.log(clickMove);
    if (clickMove == 'mouseover') {
        for (let i = 0; i < lists.length; i++) {

            lists[i].onmouseover = function () {

                for (let j = 0; j < lists.length; j++) {
                    lists[j].className = oldclass;//样式循环清空
                    mains[j].style.display = 'none'
                }
                this.className = oldclass+' '+newclass;
                mains[i].style.display = 'block';
                // console.log(mains[i]);
            }
        }
    }
    else if(clickMove == 'click'){
        for (let i = 0; i < lists.length; i++) {

            lists[i].onclick = function () {

                for (var j = 0; j < lists.length; j++) {
                    lists[j].className = oldclass;//样式循环清空
                    mains[j].style.display = 'none'
                }
                this.className = oldclass+' '+newclass;
                mains[i].style.display = 'block';
                // console.log(mains[i]);
            }
        }
    }
    
}



//外面是点击，里面是滑动的三级选项卡  h2:标题大按钮  menu：h2下拉出的ul  a：二级菜单的每一项li b：三级内容
//typeA:外面点击，里面滑动，typeB反之
function tri_tab(h2,menu,a,b,type) {

    if(type=='typeA'){
        var show = true;
        menu.style.display = 'none';
        h2.onclick = function () {
            menu.style.display = show ? 'none' : 'block';
            show = !show
            //     ib.style.display='none';
        }
    
        for (let i = 0; i < a.length; i++) {
            // a[i].index = i;
            a[i].onmouseover = function () {
                // a[this.index].className='ia active';
                for (var j = 0; j < a.length; j++) {
                    a[j].className = 'ia';
                    b[j].style.display = 'none';
                }
                // console.log(this.index);
                this.className = 'ia active';
                b[i].style.display = 'block';
            }
            a[i].onmouseout = function () {
                a[i].className = 'ia';
                b[i].style.display = 'none';
            }
        }
    }

    if(type=='typeB'){
        menu.style.display='none';
        h2.onmouseover=function(){
            menu.style.display='block';
            for(let k = 0; k < a.length; k++){
                a[k].className='ia';
                b[k].style.display = 'none';
            }
        }
        h2.onmouseout=function(){
            menu.style.display='none';
            
        }
        menu.onmouseover=function(){
            menu.style.display='block';
            // for(let k = 0; k < a.length; k++){
            //     a[k].className='ia';
            //     b[k].style.display = 'none';
            // }
        }
        menu.onmouseout=function(){
            menu.style.display='none';
            // for(let k = 0; k < a.length; k++){
            //     a[k].className='ia';
            //     b[k].style.display = 'none';
            // }
            // console.log('true');
        }
        for(let i=0;i<a.length;i++){
            // a[i].index=i;console.log(i);
            a[i].onclick=function(){
                for(var j = 0; j < a.length; j++) {
                    a[j].className='ia';
                    b[j].style.display = 'none';
                    }
                    this.className='ia active';
                    b[i].style.display='block';
                }

            }
    }
}

function siTop(box1, box2) {//吸顶菜单
    //box1:顶部盒子 box2：吸顶盒子 active：吸顶盒子
    window.onscroll = function () {
        var winScrollY = window.scrollY;
        var theight = box1.offsetHeight;
        // var top=box2.offsetTop
        console.log(winScrollY);
        console.log(theight);

        if (winScrollY >= theight) {
            // box2.className = active;
            box2.style.position = 'fixed';
            box2.style.top = 0;
        } else {
            box2.style.position = 'static';
            // box2.className = '';
            // box2.style.position='relative';
        }
    }
}


//倒计时广告
//son:图片大盒子 ses图片中需要定时器的文字 res:定时器的秒数
function thetimes(son, ses, res) {

    function times() {

        res--;

        if (res > 0) {
            // console.log(res);
            ses.innerHTML = `${res}秒后关闭`;
            // return res;

            xx.onclick = function () {//点击关闭窗口
                son.style.display = 'none';
                clearInterval(thistime);
            }

        } else {
            son.style.display = 'none';
            clearInterval(thistime);
        }
    }
    // times();
    ses.innerHTML = `${res}秒后关闭`;
    // console.log();
    var thistime = setInterval(times, 1000);
}


//封装图片小遮罩 lis:需要放入遮罩的元素（伪数组）（遮罩是lis第一个子元素）
function liShadow(lis){
    for(var i=0;i<lis.length;i++){
        lis[i].onmouseover=function(){
            // console.log(this.children[0]);
            this.children[0].style.bottom=0;
        }
        lis[i].onmouseout=function(){
            // console.log(this.children[0]);
            this.children[0].style.bottom='-50px';
        }
    }
}

//ajax
function ajax(type, url, data, fn) {//fn:接收接口传出的值
    var xhr = new XMLHttpRequest();

    if (type.toLowerCase() == 'get') {
        if (data) {
            //如果是get方式并且有数据
            url = url + '?' + data;
        }
        xhr.open(type, url, true);
        xhr.send(null);
    } else {
        //post方式
        xhr.open(type, url, true);
        //请求头设置
        xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
        xhr.send(data);
    }

    // xhr.open('post', url, true);
    // xhr.setRequestHeader('content-type', 'application/x-www-form-urlencoded');
    // xhr.send(data);//向PHP发送数据

    xhr.onreadystatechange = function () {//接收数据
        if (xhr.readyState == 4 && xhr.status == 200) {//数据传输成功并正确
            if(fn){
                fn(xhr.responseText);
            }
        }
    }
}

/*
 	毫秒转：年月日时分秒
 */
function setTimes(timer) {
	var time = new Date(timer);
	var year = time.getFullYear();//年
	var mon = toDb(time.getMonth() + 1);//0 
	var day = toDb(time.getDate());//24
	var hour = toDb(time.getHours());//时
	var min = toDb(time.getMinutes());//分
	var sec = toDb(time.getSeconds());//秒

	return {
		secs: sec,
		mins: min,
		hours: hour,
		days: day,
		mons: mon,
		years: year
	}

}

function startMove(obj, json, fnend) {

	clearInterval(obj.timer); //防止定时器叠加
	obj.timer = setInterval(function() {

		var istrue = true;

		//1.获取属性名，获取键名：属性名->初始值
		for(var key in json) { //key:键名   json[key] :键值
			//			console.log(key); //width heigth opacity
			var cur = 0; //存初始值

			if(key == 'opacity') { //初始值
				cur = getStyle(obj, key) * 100; //透明度
			} else {
				cur = parseInt(getStyle(obj, key)); // 300px  300  width heigth borderwidth px为单位的

			}

			//2.根据初始值和目标值，进行判断确定speed方向，变形：缓冲运动
			//距离越大，速度越大,下面的公式具备方向
			var speed = (json[key] - cur) / 6; //出现小数
			speed = speed > 0 ? Math.ceil(speed) : Math.floor(speed); //不要小数部分，没有这句话或晃动

			if(cur != json[key]) { //width 200 heigth 400
				istrue = false; //如果没有达到目标值，开关false
			} else {
				istrue = true; //true true
			}

			//3、运动
			if(key == 'opacity') {
				obj.style.opacity = (cur + speed) / 100;
				obj.style.filter = 'alpha(opacity:' + (cur + speed) + ')';
			} else {
				obj.style[key] = cur + speed + 'px'; //针对普通属性 left  top height 
			}

		}

		//4.回调函数:准备一个开关,确保以上json所有的属性都已经达到目标值,才能调用这个回调函数
		if(istrue) { //如果为true,证明以上属性都达到目标值了
			clearInterval(obj.timer);
			if(fnend) {
				fnend();
			}
		}

	}, 30); //obj.timer 每个对象都有自己定时器

}