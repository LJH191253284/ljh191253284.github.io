let lists=document.querySelectorAll(".typeArea>.nav>.right>ul>li")
let content=document.querySelector(".content")
let ul= document.querySelector(".right-ul")
let mask=document.querySelector(".mask")
let left_ro=document.querySelector(".left-ro")
let right_ro=document.querySelector(".right-ro")

let num=0;
for(let i=0;i<lists.length;i++){
     lists[i].addEventListener("click",function(e){
       
    })

}
left_ro.onclick=function(e){
    num--;
    mask.style.transform=`translateX(${-900*num}px)`;
   if(num<0){
       num=4;
   }
   console.log(num)
}
right_ro.onclick=function(e){
    num++;
    mask.style.transform=`translateX(${-900*num}px)`;
    if(num>2){
        num=-1;
    }
   console.log(num)
}

   
    
