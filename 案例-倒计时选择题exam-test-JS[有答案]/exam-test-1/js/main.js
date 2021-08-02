; (function () {
    // 获取元素
    var startButton = document.getElementById("startButton");
    var timeBox = document.getElementById("timeBox");
    var firstElement = document.getElementById("firstElement");
    var secondElement = document.getElementById("secondElement");
    var thirdElement = document.getElementById("thirdElement");
    var submitButton = document.getElementById("submitButton");
    // 记录答案 
    var answerFirst =  [];
    var answerSecond = [];
    var answerThird =  [];
    // 倒计时
    var seconds = 7200;
    // 定时器变量
    var timer = null;
    // 渲染数据的代码块
    function renderFirst (data) {
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += '<li>'
            str += '<p>' + (i + 1) + '. ' + data[i].question + '</p>'
            str += '<div>'
            str += '    <span data-answer="是" data-index="' + i + '" class="opt">A.是</span>'
            str += '    <span data-answer="否" data-index="' + i + '" class="opt">B.否</span>'
            str += '</div>'
            str += '</li>'
        }
        firstElement.innerHTML = str;
    }
    function rendersecond(data) {
        var letters = ["A", "B", "C", "D"];
        var str = '';
        for (var i = 0; i < data.length; i++) {
            var options = data[i].option;
            str += '<li>'
            str += '<p>' + (i + 1) + '. ' + data[i].question + '</p>'
            str += '    <div>'
            for (var j = 0; j < options.length; j++) {
                str += ' <span data-answer="' + letters[j] + '" data-index="' + i + '" class="opt">' + options[j] + '</span>';
            }
            str += '    </div>'
            str += '</li>'
        }
        secondElement.innerHTML = str;
    }
    function renderthird(data) {
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += '<div class="item">'
            str += '    <span>' + (i + 1) + '. ' + data[i].question + ';</span> '
            str += '    在此处填写: <input type="text" disabled>'
            str += '</div>'
        }
        thirdElement.innerHTML = str;
    }
    // 开始考试函数
    function addEventHandler() {
        // 判断题
        firstElement.onclick = function (e) {
            var element = e.target;
            if (element.className.indexOf("opt") > -1) {
                var opts = element.parentElement.children;
                for (var i = 0; i < opts.length; i++) {
                    opts[i].classList.remove("active");
                }
                element.classList.add("active");
                var index = element.getAttribute("data-index");
                var answer = element.getAttribute("data-answer");
                answerFirst[index] = answer;
            }
        }
        // 选择题
        secondElement.onclick = function (e) {
            var element = e.target;
            if (element.className.indexOf("opt") > -1) {
                var opts = element.parentElement.children;
                for (var i = 0; i < opts.length; i++) {
                    opts[i].classList.remove("active");
                }
                element.classList.add("active");
                var index = element.getAttribute("data-index");
                var answer = element.getAttribute("data-answer");
                answerSecond[index] = answer;
            }
        }
        // 填空题
        var inputs = thirdElement.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].removeAttribute("disabled")
            inputs[i].style.cursor = "pointer";
            inputs[i].index = i;
            ; (function (index) {
                var delayer = null;
                inputs[i].oninput = function () {
                    if (delayer) clearTimeout(delayer);
                    var _this = this;
                    delayer = setTimeout(function () {
                        answerThird[index] = _this.value;
                    }, 300)

                }
            })(i)
        }
        submitButton.onclick = function () {
            // 设置按钮的文本 提交按钮
            submitButton.innerText = "分数统计中.."
            // 结束考试
            removeEventHandler();
            // 执行延迟函数
            var delayer = setTimeout(function () {
                // 统计分数，输出成绩
                totalScore();
                clearTimeout(delayer);
            }, 3000)
        }

       
    }
    // 结束考试
    function removeEventHandler() {
        // 解绑事件
        firstElement.onclick = null;
        secondElement.onclick = null;
        submitButton.onclick = null;
        // 获取所有input标签
        var inputs = thirdElement.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            // 禁止输入值
            inputs[i].setAttribute("disabled", true);
            // 设置外观
            inputs[i].style.cursor = "not-allowed";
        }
        // 移除类名
        submitButton.className = "";
    }
    // 格式化时间
    function formatTime(seconds) {
        if (seconds < 0) {
            clearInterval(timer);
            removeEventHandler();
            submitButton.innerHTML = "考试结束！";
            return;
        }
        var h, m, s;
        h = Math.floor(seconds / 3600);
        m = Math.floor(seconds % 3600 / 60);
        s = Math.floor(seconds % 60);
        h = h < 10 ? "0" + h : "" + h;
        m = m < 10 ? "0" + m : "" + m;
        s = s < 10 ? "0" + s : "" + s;
        timeBox.innerHTML = h + ": " + m + " : " + s;
    }
    // 倒计时函数
    function toDownTime() {
        clearInterval(timer);
        timer = setInterval(function () {
            seconds--;
            formatTime(seconds);
        }, 1000)
    }
    // 匹配答案评分的逻辑(公共函数，用户选择的答案和数据的答案进行匹配)
    function calcScore(data, answers) {
        var score = 0;
        for (var i = 0; i < data.length; i++) {
            if (answers[i] === data[i].answer) {
                score += data[i].score;
            }
        }
        return score;
    }
    // 统计分数的逻辑
    function totalScore() {
        // 判断题的分数
        var firstData = data.first;
        var firstToatal = calcScore(firstData, answerFirst);
        // 选择题的分数
        var secondData = data.second;
        var secondTotal = calcScore(secondData, answerSecond);
        // 填空的分数
        var thirdData = data.third;
        var thirdTotal = calcScore(thirdData, answerThird);
        // 总分
        var total = firstToatal + secondTotal + thirdTotal;
        // 跳转页面 并且传递参数
        window.location.href = "./result.html?first=" + firstToatal + "&second=" + secondTotal + "&third=" + thirdTotal + "&total=" + total;
    }
    // 初始化函数
    function init() {
        // 渲染数据
        renderFirst(data.first);
        rendersecond(data.second);
        renderthird(data.third);
        // 初始化的格式化毫秒数
        formatTime(seconds);
        // 点击开始考试
        startButton.onclick = function () {
            // 绑定事件
            addEventHandler();
            // 开始计时
            toDownTime();
            // 设置按钮的样式 开始考试
            startButton.className = "active";
            // 设置按钮的样式 提交试卷
            submitButton.className = "active";
        }
    }
    // 初始化试卷
    init();
})()