; (function () {

    function Test() {
        // 添加数据
         // 获取元素
        this.startButton = document.getElementById("startButton");
        this.timeBox = document.getElementById("timeBox");
        this.firstElement = document.getElementById("firstElement");
        this.secondElement = document.getElementById("secondElement");
        this.thirdElement = document.getElementById("thirdElement");
        this.submitButton = document.getElementById("submitButton");
        // 记录答案 
        this.answerFirst = [];
        this.answerSecond = [];
        this.answerThird = [];
        // 倒计时
        this.seconds = 7200;
        // 定时器变量
        this.timer = null;
    }

     // 渲染数据的代码块
     Test.prototype.renderFirst = function  (data) {
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
        this.firstElement.innerHTML = str;
    }
    Test.prototype.rendersecond =  function (data) {
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
        this.secondElement.innerHTML = str;
    }
    Test.prototype.renderthird = function (data) {
        var str = '';
        for (var i = 0; i < data.length; i++) {
            str += '<div class="item">'
            str += '    <span>' + (i + 1) + '. ' + data[i].question + ';</span> '
            str += '    在此处填写: <input type="text" disabled>'
            str += '</div>'
        }
        this.thirdElement.innerHTML = str;
    }

    // 开始考试函数
    Test.prototype.addEventHandler = function () {
        // 记录当前的this
        var _this = this;
        // 判断题
        this.firstElement.onclick = function (e) {
            var element = e.target;
            if (element.className.indexOf("opt") > -1) {
                var opts = element.parentElement.children;
                for (var i = 0; i < opts.length; i++) {
                    opts[i].classList.remove("active");
                }
                element.classList.add("active");
                var index = element.getAttribute("data-index");
                var answer = element.getAttribute("data-answer");
                _this.answerFirst[index] = answer;
            }
        }
        // 选择题
        this.secondElement.onclick = function (e) {
            var element = e.target;
            if (element.className.indexOf("opt") > -1) {
                var opts = element.parentElement.children;
                for (var i = 0; i < opts.length; i++) {
                    opts[i].classList.remove("active");
                }
                element.classList.add("active");
                var index = element.getAttribute("data-index");
                var answer = element.getAttribute("data-answer");
                _this.answerSecond[index] = answer;
            }
        }
        // 填空题
        var inputs = this.thirdElement.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            inputs[i].removeAttribute("disabled")
            inputs[i].style.cursor = "pointer";
            inputs[i].index = i;
            ; (function (index) {
                var delayer = null;
                inputs[i].oninput = function () {
                    if (delayer) clearTimeout(delayer);
                    var _self= this;
                    delayer = setTimeout(function () {
                        _this.answerThird[index] = _self.value;
                    }, 300)
                }
            })(i)
        }
        this.submitButton.onclick = function () {
            // 设置按钮的文本 提交按钮
            _this.submitButton.innerText = "分数统计中.."
            // 结束考试
            _this.removeEventHandler();
            // 执行延迟函数
            var delayer = setTimeout(function () {
                // 统计分数，输出成绩
                _this.totalScore();
                clearTimeout(delayer);
            }, 3000)
        }
    }
    // 结束考试
    Test.prototype.removeEventHandler = function () {
        // 解绑事件
        this.firstElement.onclick = null;
        this.secondElement.onclick = null;
        this.submitButton.onclick = null;
        // 获取所有input标签
        var inputs = thirdElement.getElementsByTagName("input");
        for (var i = 0; i < inputs.length; i++) {
            // 禁止输入值
            inputs[i].setAttribute("disabled", true);
            // 设置外观
            inputs[i].style.cursor = "not-allowed";
        }
        // 移除类名
        this.submitButton.className = "";
    }
    // 格式化时间
    Test.prototype.formatTime = function (seconds) {
        if (seconds < 0) {
            clearInterval( this.timer);
            this.removeEventHandler();
            this.submitButton.innerHTML = "考试结束！";
            return;
        }
        var h, m, s;
        h = Math.floor(seconds / 3600);
        m = Math.floor(seconds % 3600 / 60);
        s = Math.floor(seconds % 60);
        h = h < 10 ? "0" + h : "" + h;
        m = m < 10 ? "0" + m : "" + m;
        s = s < 10 ? "0" + s : "" + s;
        this.timeBox.innerHTML = h + ": " + m + " : " + s;
    }
    // 倒计时函数
    Test.prototype.toDownTime = function () {
        var _this = this;
        clearInterval(this.timer);
        _this.timer = setInterval(function () {
            _this.seconds--;
            _this.formatTime(_this.seconds);
        }, 1000)
    }
    // 匹配答案评分的逻辑(公共函数，用户选择的答案和数据的答案进行匹配)
    Test.prototype.calcScore = function (data, answers) {
        var score = 0;
        for (var i = 0; i < data.length; i++) {
            if (answers[i] === data[i].answer) {
                score += data[i].score;
            }
        }
        return score;
    }
    // 统计分数的逻辑
    Test.prototype.totalScore = function () {
        // 判断题的分数
        var firstData = data.first;
        var firstToatal = this.calcScore(firstData, this.answerFirst);
        // 选择题的分数
        var secondData = data.second;
        var secondTotal = this.calcScore(secondData, this.answerSecond);
        // 填空的分数
        var thirdData = data.third;
        var thirdTotal = this.calcScore(thirdData, this.answerThird);
        // 总分
        var total = firstToatal + secondTotal + thirdTotal;
        // 跳转页面 并且传递参数
        window.location.href = "./result.html?first=" + firstToatal + "&second=" + secondTotal + "&third=" + thirdTotal + "&total=" + total;
    }
    // 初始化函数
    Test.prototype.init = function () {
        // 渲染数据
        this.renderFirst(data.first);
        this.rendersecond(data.second);
        this.renderthird(data.third);
        // 初始化的格式化毫秒数
        this.formatTime(this.seconds);
        // 当前函数作用域的this 
        var _this = this;
        // 点击开始考试
        this.startButton.onclick = function () {
            // 绑定事件
            _this.addEventHandler();
            // 开始计时
            _this.toDownTime();
            // 设置按钮的样式 开始考试
            _this.startButton.className = "active";
            // 设置按钮的样式 提交试卷
            _this.submitButton.className = "active";
        }
    }

    // 创建实例对象
    var app = new Test();
    // 初始化试卷
    app.init();
})()

