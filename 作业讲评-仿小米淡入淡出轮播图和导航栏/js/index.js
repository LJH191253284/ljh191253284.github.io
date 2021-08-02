// $可以作为变量名
// var $ = 10;
// console.log( $ );

/* function $(){
    console.log("我是$函数");
}
$(); */

// 封装一个根据CSS选择器获取DOM对象的方法
// 如果DOM对象只能获取一个,那么我们就返回单个对象
// 如果DOM对象获取多个,那么我们就返回多个对象
function $(cssSelector) {
    // document.querySelectorAll获取所有符合CSS选择器的元素,不管获取到多少个,得到的都是一个伪数组
    var objs = document.querySelectorAll(cssSelector);

    // 根据伪数组长度,返回一个对象或者一整个伪数组
    if (objs.length == 1) { // 判断长度是否为1
        return objs[0]; // 如果长度为1,则返回下标为1的元素
    } else {
        return objs; // 如果长度不为1,返回整个数组
    }
}


// 封装一个goto函数
function goto(currentIndex) {
    // 排他
    for (var i = 0; i < dotLis.length; i++) {
        dotLis[i].classList.remove("active");
        bannerImgLis[i].classList.remove("active");
    }

    // 高亮指定索引号的小圆点
    dotLis[currentIndex].classList.add("active");
    bannerImgLis[currentIndex].classList.add("active");
}

// 定义全局变量dotLis和bannerImgLis
var dotLis = null;
var bannerImgLis = null;

// 定义一个全局变量num
var num = 0;

// 页面加载完成事件
window.onload = function () {
    // 页面加载完成以后,我们再获取DOM对象
    dotLis = $(".dot ol li");
    bannerImgLis = $(".banner_imgs ul li");

    // 右侧按钮点击事件
    $(".arrow_right").onclick = function () {
        num++;
        num = num % dotLis.length; // 边界处理
        goto(num);
    }

    // 左侧按钮点击事件
    $(".arrow_left").onclick = function () {
        num--;
        if (num == -1) { // 边界判断
            num = dotLis.length - 1;
        }
        goto(num);
    }

    // 给指示器里面每个小圆点绑定鼠标点击事件
    for (var i = 0; i < dotLis.length; i++) {
        dotLis[i].onclick = function () {
            // 获取自定义属性
            var currentLiIndex = this.getAttribute("data-index");

            goto(currentLiIndex);

            // 把currentLiIndex赋值给num变量,为了方便左右箭头触发事件的时候,不错乱
            num = currentLiIndex
        }
    }

    // 自动轮播
    var timer = window.setInterval(function () {
        // 手动触发事件
        $(".arrow_right").click();
    }, 2000);

    // 鼠标移上.banner以后停止定时器
    $(".banner").onmouseover = function () {
        window.clearInterval(timer);
    }

    // 鼠标移上.banner以后重新开启定时器
    $(".banner").onmouseout = function () {
        window.clearInterval(timer);
        timer = window.setInterval(function () {
            // 手动触发事件
            $(".arrow_right").click();
        }, 2000);
    }

    // 根据数据动态生成左侧导航栏
    var datas = [
        ["Redmi 9", "腾讯黑鲨游戏手机3", "Redmi 8A", "小米移动 电话卡"],
        ["小米电视 大师 65英寸OLED", "小米电视5 75英寸", "全面屏电视Pro 55英寸", "小米电视4A 58英寸"],
        ["RedmiBook 13", "显示器"],
        ["冰箱", "微波炉", "电磁炉", "插线板"],
        ["手环5NFC", "滑板车", "无线车充"],
        ["打印机", "摄像机", "小爱音箱"],
        ["移动电源", "手机壳"],
        ["洗手机", "体脂称", "婴儿推车"],
        ["小爱音箱Art", "Redmi音箱", "蓝牙音箱"],
        ["小背包", "床垫", "驱蚊器"]
    ];

    // 定义一个字符串变量
    var htmlStr = ``;
    // 遍历二维数组
    for (var i = 0; i < datas.length; i++) {
        htmlStr += `<div class="item">`;
        for (var j = 0; j < datas[i].length; j++) {
            htmlStr += `<ul>
            <li><a href="#"><img src="images/nav_imgs/${datas[i][j]}.png"/>${datas[i][j]}</a></li>
            <li><a href="#"><img src="images/nav_imgs/${datas[i][j]}.png"/>${datas[i][j]}</a></li>
            <li><a href="#"><img src="images/nav_imgs/${datas[i][j]}.png"/>${datas[i][j]}</a></li>
            <li><a href="#"><img src="images/nav_imgs/${datas[i][j]}.png"/>${datas[i][j]}</a></li>
            <li><a href="#"><img src="images/nav_imgs/${datas[i][j]}.png"/>${datas[i][j]}</a></li>
            <li><a href="#"><img src="images/nav_imgs/${datas[i][j]}.png"/>${datas[i][j]}</a></li>
        </ul>`;
        }
        htmlStr += `</div>`;
    }
    $(".nav_detail").innerHTML = htmlStr;
    4



    // 鼠标移上.nav_box显示.nav_detail
    $(".nav_box").onmouseover = function () {
        $(".nav_detail").style.display = "block";
    }
    // 鼠标移出.nav_box隐藏.nav_detail
    $(".nav_box").onmouseout = function () {
        $(".nav_detail").style.display = "none";
    }


    // 获取.nav里面所有li
    var navLis = $(".nav ul li");
    // 获取.nav_detail里面所有.item
    var navDetailItems = $(".nav_detail .item");
    for (var i = 0; i < navLis.length; i++) {
        // 设置自定义属性
        navLis[i].setAttribute("data-index", i);
        // 绑定鼠标移上事件
        navLis[i].onmouseover = function () {
            var currentIndex = this.getAttribute("data-index");

            // 隐藏所有.nav_detail .item
            for (var j = 0; j < navDetailItems.length; j++) {
                navDetailItems[j].style.display = "none";
            }
            // 再显示当前li索引号对应的.item
            navDetailItems[currentIndex].style.display = "block";
        }
    }
}