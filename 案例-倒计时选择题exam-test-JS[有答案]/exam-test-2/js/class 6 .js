class Test{
    constructor(){
        this.startButton  =document.getElementById("startButton");//开始按钮
        this.timeBox      =document.getElementById("timeBox");
        this.firstElement =document.getElementById("firstElement");
        this.secondElement=document.getElementById("secondElement");
        this.thirdElement =document.getElementById("thirdElement");
        this.submitButton =document.getElementById("submitButton");
        //记录答案
        this.answerFirst  = [];
        this.answerSecond = [];
        this.answerThird  = [];
        //倒计时
        this.seconds = 7200;//两小时
        //定时器变量
        this.timer = null;
        this.init()
    }
    //渲染代码块
    renderFirst =(data)=>{
        let str = '';
        for(let i=0;i<data.length;i++){
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
    
}
//测试
console.log(data.length)