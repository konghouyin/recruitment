function opens(obj) {              //页面的切换
   for (var i=1;i<=5; i++) {
    if (i===obj){
      document.getElementById("page-" + i).style.display = "block"; 
      document.getElementsByClassName("choose-1")[i-1].style.backgroundColor = "#00b7a9";
      document.getElementsByClassName("choose-1")[i-1].style.color = "white";
    }else
      {
      document.getElementById("page-" + i).style.display = "none";
      document.getElementsByClassName("choose-1")[i-1].style.backgroundColor = "#303c36";
      document.getElementsByClassName("choose-1")[i-1].style.color = "#959a9a";
      }
      
  }   
}
//---page-1-------------------------------------------------------------

//---page-2-------------------------------------------------------------

//---page-3-------------------------------------------------------------

//---page-4-------------------------------------------------------------
//---page-5-------------------------------------------------------------
var grouphand_add=document.getElementsByClassName("grouphand_add")[0];
var grouphand_tell=document.getElementsByClassName("grouphand_tell")[0];
grouphand_add.addEventListener('mousemove',function(){    //添加提交框的提示信息
			         grouphand_tell.style.display="block"; 
			       },false);
grouphand_add.addEventListener('mouseout',function(){
			         grouphand_tell.style.display="none"; 
			       },false);

//一面打分规则
var chargehand='{"C语言":50,"沟通能力":10,"算法能力":10}';
var jsonobj=JSON.parse(chargehand); //可以将json字符串转换成json对象 
var jsonarr = Object.keys(jsonobj); 

//console.log(jsonarr[0]);  //C语言 属性
//console.log(jsonobj[jsonarr[0]]);  //50 值
//console.log(jsonarr.length);  //2 数组的长度

var newmessage=document.getElementsByClassName("new-message");
var newsmessage=document.getElementsByClassName("news-message");
for(var i=0;i<jsonarr.length;i++)
{
	newmessage[i].value=jsonarr[i];
	newsmessage[i].value=jsonobj[jsonarr[i]];
}

grouphand_add.addEventListener('click',function(){  //提交更改好的一面打分规则
	var chargehand_="'{";
			        for(var i=0;i<11;i++)
			        {
			        	//console.log(i,newmessage[i].value);
			        	if(newmessage[i].value!="")
			        	{
			        		//console.log(i,newmessage[i].value);
                          chargehand_=chargehand_+'"'+newmessage[i].value+'":'+newsmessage[i].value+","
			            }
			         }
			         chargehand_ = chargehand_.substr(0,chargehand_.length-1);
			        chargehand_+="}'"
   console.log(chargehand_); 最后更新的字符串
},false);

//message={title:"111",context:"22233"}发布公告
var charge_tell=document.getElementById("charge_tell");
var telltitle=document.getElementsByClassName("telltitle")[0];
var tellgong=document.getElementsByClassName("tellgong")[0];
var tellbutton=document.getElementsByClassName("tellbutton")[0];

             telltitle.onfocus=function(){
                if(this.value=="公告主题")
                this.value="";
                this.style.color="black";
             }
             telltitle.onblur=function(){  
                if(this.value==""){
                this.value="公告主题";
                this.style.color="#999";
                }
            }

           var tell=new Object();
			tellbutton.addEventListener('click',function(){     
			        
			        tell.title=telltitle.value;
			        tell.context=tellgong.value;
			        console.log(JSON.stringify(tell));
			       },false);


//---page-6-------------------------------------------------------------
 