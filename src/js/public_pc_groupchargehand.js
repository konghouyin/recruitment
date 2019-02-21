//---page-1-------------------------------------------------------------
var gonggao={
	"msg":"具体状态",
	"group":"{\"title\":\"通知\"，\"context\":\"hhhh\"}",
    "mian":"{\"title\":\"通知\"，\"context\":\"hhhh\"}"
}
gonggroup=gonggao.group;
gongmain=gonggao.mian;

//var gonggroup1 = Object.keys(JSON.parse(gonggroup));？？？？？？？？？？？？？
 //可以将json字符串转换成json对象 
//var gongmain1 = Object.keys(JSON.parse(gongmain));
//{"title":"通知"，"context":"hhhh"} //可以将json字符串转换成json对象 
//console.log(jsonobj[jsonarr[0]]);  //50 值
//console.log(jsonarr.length);  //2 数组的长度
var zunei=document.getElementsByClassName("zuner")[0];
var quanti=document.getElementsByClassName("quanti")[0];
var page_1=document.getElementById("page-1");
page_1.addEventListener('click',function(){
			         for(var i=0;i<gonggroup1.length;i++)
			         {

					    var chuang=document.createElement('p');   //创建元素节点
					    chuang.innerHTML=gonggroup1.title+":"+gonggroup1.context;
					    chuang.appendChild(dian);  //
					    zunei.appendChild(chuang);  // 
			         }
			         for(var i=0;i<gongmain1.length;i++)
			         {

					    var chuang=document.createElement('p');   //创建元素节点
					    chuang.innerHTML=gongmain1.title+":"+gongmain1.context;
					    chuang.appendChild(dian);  //
					    quanti.appendChild(chuang);  // 
			         }
			         
			       },false);

//---page-2-------------------------------------------------------------
var namenamename=[{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术","banji":
"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术","banji":
"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":0,"pass":0},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术","banji":
"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术","banji":
"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":1,"pass":1},
{"xuehao":4171196,"name":"张银鸽","xueyuan":"计算机学院","zhuanye":"计算机科学与技术",
"banji":"计科1706","xingbie":"女","phoneNum":123,"selfgroup":3,"style":0,"pass":0}]

//[{},{}]                                                    //组别        //状态   //过了几面？？几面0，1，2，3
//一页容纳15个数据
var sect_face=document.getElementById("sect_face");
var face_=document.getElementsByClassName("face_");
var messxuehao=document.getElementsByClassName("messxuehao");
var messname=document.getElementsByClassName("messname");
var messsex=document.getElementsByClassName("messsex");
var messall=document.getElementsByClassName("messall");
var messphone=document.getElementsByClassName("messphone");

var messstate=document.getElementsByClassName("messstate");
var yeshu=document.getElementsByClassName("yeshu")[0];
sect_face.onclick=function(){
	var namename=namenamename.filter(item => item.pass==sect_face.value);  //筛选
	//console.log(namename.length);
	//console.log(namename);
	yeshu.innerHTML="";
	var xiaokuai;
	for(var i=1;i<=(namename.length/15)+1;i++)
	{
	var dian=document.createTextNode(i);   //创建文本节点
    xiaokuai=document.createElement('li');   //创建元素节点
    xiaokuai.setAttribute('state',i); //给标签设置属性
    xiaokuai.setAttribute('class',"zhuanye"); //给标签设置属性
    xiaokuai.appendChild(dian);  //
    yeshu.appendChild(xiaokuai);  // 
	}
	if(namename.length>=15)
		var longlong=15;
	else longlong=namename.length;
	for(var i=0;i<longlong;i++) 
		{
			messxuehao[i].innerHTML=namename[i].xuehao;
			messname[i].innerHTML=namename[i].name;
			messsex[i].innerHTML=namename[i].xingbie;
			messall[i].innerHTML=namename[i].xueyuan+" / "+namename[i].zhuanye+" / "+namename[i].banji;
		    messphone[i].innerHTML=namename[i].phoneNum;
			if(namename[i].style==0)//<p class="student-state" style="color:;">面试中</p>
			messstate[i].innerHTML='<p class="student-state" style="background-color:#7b5cac;">面试中</p>';
			else if(namename[i].style==1)
			messstate[i].innerHTML='<p class="student-state" style="background-color:#ff9103;">打分中</p>';
			else if(namename[i].style==2)
		 	messstate[i].innerHTML='<p class="student-state" style="background-color:#00d037;">已通过</p>';
		    else if(namename[i].style==3)
			messstate[i].innerHTML='<p class="student-state" style="background-color:#f70004;">未通过</p>'; 
		}
		for(var i=longlong;i<15;i++) 
		{
			messxuehao[i].innerHTML=messname[i].innerHTML=messsex[i].innerHTML=messall[i].innerHTML=messphone[i].innerHTML=messstate[i].innerHTML=""
		}
    //console.log(messxuehao);
    var zhuanye=document.getElementsByClassName("zhuanye");  //获取下标元素
    zhuanye[0].style.backgroundColor="#004b9f";
    zhuanye[0].style.opacity=.9;

	for(var r=0;r<(namename.length/15);r++)   //详细 绑定所有的事件
	{
		(function(r){
			zhuanye[r].addEventListener('click',function(){
			         //console.log("1");
			        zhuanye[r].style.backgroundColor="#004b9f"; //改变选项的颜色
    				zhuanye[r].style.opacity=.9;
    				for(var j=0;j<(namename.length/15);j++)
    				{
    					if(j!=r)
    					{
    						zhuanye[j].style.backgroundColor="grey";
    				        zhuanye[j].style.opacity=.7;
    					}
    				}

			         if(namename.length>=(r+1)*15)   //18 15
			        	var longlong=15;
			         else longlong=namename.length-r*15   //3
			        for(var i=0;i<longlong;i++) //15 16 17
					{
						//console.log(i,"00",longlong+r*15);
						messxuehao[i].innerHTML=namename[i+r*15].xuehao;
						messname[i].innerHTML=namename[i+r*15].name;
						messsex[i].innerHTML=namename[i+r*15].xingbie;
						messall[i].innerHTML=namename[i+r*15].xueyuan+" / "+namename[i+r*15].zhuanye+" / "+namename[i+r*15].banji;
					    messphone[i].innerHTML=namename[i+r*15].phoneNum;
						if(namename[i+r*15].style==0)//<p class="student-state" style="color:;">面试中</p>
						messstate[i].innerHTML='<p class="student-state" style="background-color:#7b5cac;">面试中</p>';
						else if(namename[i+r*15].style==1)
						messstate[i].innerHTML='<p class="student-state" style="background-color:#ff9103;">打分中</p>';
						else if(namename[i+r*15].style==2)
					 	messstate[i].innerHTML='<p class="student-state" style="background-color:#00d037;">已通过</p>';
					    else if(namename[i+r*15].style==3)
						messstate[i].innerHTML='<p class="student-state" style="background-color:#f70004;">未通过</p>'; 
					}
					for(var i=longlong;i<15;i++) 
					{
						messxuehao[i].innerHTML=messname[i].innerHTML=messsex[i].innerHTML=messall[i].innerHTML=messphone[i].innerHTML=messstate[i].innerHTML=""
					}
			       },false);
		}(r));      
	}
	
}

//---page-3-------------------------------------------------------------	
	var student_more=document.getElementsByClassName('student-more');
	var student_sore_block=document.getElementById('student_sore_block');
	var more_colse=document.getElementsByClassName('more_colse')[0];
	var student_face_li=document.getElementsByClassName('student_face_li');
	var student_face=document.getElementsByClassName('student_face');

	var studentfen=document.getElementsByClassName('studentfen');
	var studentda=document.getElementsByClassName('studentda');
	var studentjian=document.getElementsByClassName('studentjian');
	var studentji=document.getElementsByClassName('studentji');
	var studentren=document.getElementsByClassName('studentren');
	var studenttime=document.getElementsByClassName('studenttime');
	var onemore=document.getElementsByClassName('onemore');
	var onemore1=document.getElementsByClassName('onemore1')[0];
//请求一个学生的所有面试信息
var studentall=[{"id":2,"xuehao":4171197,"selfgroup":3,"type":1,"time":"2019-02-02T16:46:35.000Z",
"person":"wanjianxin","obj":"{\"C语言\":45,\"沟通能力\":20}","advice":"继续努力","history":"xxxx"},
{"id":7,"xuehao":4171197,"selfgroup":3,"type":2,"time":"2019-02-02T16:48:05.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","history":"xxxx"},
{"id":4,"xuehao":4171197,"selfgroup":3,"type":1,"time":"2019-02-02T16:46:35.000Z",
"person":"wanjianxin","obj":"{\"C语言\":45,\"沟通能力\":19}","advice":"继续努力","history":"xxxx"}]

var dafen='{"C语言":50,"沟通能力":10}'  //获取一面打分准则 {"C语言":50,"沟通能力":10}
var defenarr=Object.values(JSON.parse(dafen)) //[50,10];
	for(var i=0;i<15;i++)   //详细 绑定所有的事件
	{
		(function(i){
			student_more[i].addEventListener('click',function(){
			         student_sore_block.style.display="block";
			         //console.log(student_more[i].getAttribute('name'));//获取属性 设置属性 .setAttribute("属性","值")
			       //接口获得他的学号！！！！
			       s=0;
			       for(var i=0;i<4;i++)
			       {
			       	onemore[i].style.display="none";
			       	console.log("11")
			       }
			       for(var i=0;i<studentall.length;i++)
			       {
			       		if(studentall[i].type==1)
			       		{
			       			var tiqu=(Object.values(JSON.parse(studentall[i].obj)));
			       			var score=0;
			       			console.log(defenarr,tiqu)
			       			for(var j=0;j<tiqu.length;j++)
			       			{
			       				score+=tiqu[j]*defenarr[j];
			       			}

							studentfen[i-s].innerHTML=score;
							studentda[i-s].innerHTML=studentall[i].obj;
							studentjian[i-s].innerHTML=studentall[i].advice;
							studentji[i-s].innerHTML=studentall[i].history;
							studentren[i-s].innerHTML="("+studentall[i].person+")";
							studenttime[i-s].innerHTML=studentall[i].time;
							onemore[i-s].style.display="block";
			       		}
			       		else {
			       			var tiqu=(Object.values(JSON.parse(studentall[i].obj)));
			       			var score=0;
			       			console.log(defenarr,tiqu)
			       			for(var j=0;j<tiqu.length;j++)
			       			{
			       				score+=tiqu[j]*defenarr[j];
			       			}
			       			s=1;
							studentfen[4].innerHTML=score;
							studentda[4].innerHTML=studentall[i].obj;
							studentren[4].innerHTML=="("+studentall[i].person+")";
							studentji[4].innerHTML=studentall[i].history;
							studenttime[4].innerHTML=studentall[i].time;
			       		}
			       }
			       },false);
		}(i));      
	}

	more_colse.addEventListener('click',function(){
		 student_sore_block.style.display="none";
	})

	
	for(var i=0;i<2;i++)   //切换几面的详细信息
	{
		(function(i){
			student_face_li[i].addEventListener('click',function(){
			         
			         student_face[i].style.opacity="1";
			         student_face_li[i].style.backgroundColor="rgb(0, 183, 169)";
			         for(var j=0;j<2;j++)
				     {
						if(j!=i)
						{
						 student_face[j].style.opacity="0";
						 student_face_li[i].style.backgroundColor="#32443c";
						}
				     }
			       },false);
		}(i));      
	}




//要求 打分规则必须对应，学号必须相连！！！
var jilu=[{"id":2,"xuehao":4171197,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4171097,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4171097,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":20,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4171097,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4171297,"selfgroup":3,"type":1,"time":"2019-02-02T17:46:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4171397,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4171497,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4171597,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":20,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4171697,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4171797,"selfgroup":3,"type":1,"time":"2019-02-02T17:46:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4171897,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4171997,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4172097,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":20,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4172197,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4172297,"selfgroup":3,"type":1,"time":"2019-02-02T17:46:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4172397,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4172497,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4172597,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":20,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4172697,"selfgroup":3,"type":1,"time":"2019-02-02T17:47:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"},
{"id":2,"xuehao":4172797,"selfgroup":3,"type":1,"time":"2019-02-02T17:46:35.000Z",
"person":"wanjianxin","obj":"{\"第一题\":10,\"第二题\":10}","advice":"继续努力","history":"xxxx"}]

var dafen='{"C语言":50,"沟通能力":10}'  //获取一面打分准则 {"C语言":50,"沟通能力":10}
var defenarr=Object.values(JSON.parse(dafen)) //[50,10];
var newarr=new Array()
//console.log(defenarr);
var newxuehao=0;
var paiming=0;
var all=0;
//console.log(Object.values(JSON.parse(jilu[i].obj)))
{    //先获取第一个
	var num=1;
	for(var j=0;j<defenarr.length;j++)
    {
    	all=all+defenarr[j]*(Object.values(JSON.parse(jilu[0].obj)))[j]; //[10,10]
    }
    newxuehao=jilu[0].xuehao;
}
//console.log(newxuehao)
for(var i=1;i<jilu.length;i++)
{
	if(jilu[i].xuehao!=newxuehao)
	{
		newarr[paiming]={"xuehao":jilu[i-1].xuehao,"score":all/num}
		paiming++;
		all=0;
		num=1;
	}
    else num++;
    for(var j=0;j<defenarr.length;j++)
    {   	
    	var all=all+defenarr[j]*(Object.values(JSON.parse(jilu[i].obj)))[j]; //[10,10]
    } 
    newxuehao=jilu[i].xuehao;
}
newarr[paiming]={"xuehao":jilu[i-1].xuehao,"score":all}

function sortId(a,b){  
       return b.score-a.score 
    }
newarr.sort(sortId);
console.log(newarr);  //去重拍好序的{xuehao: 4171096, score:600}

var paicha=[{"xuehao":4171197,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4171097,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4171297,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4171397,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4171497,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4171597,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4171697,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4171797,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4171897,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4171997,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4172097,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4172197,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4172297,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4172397,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4172497,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4172597,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4172697,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4172797,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4172897,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4172997,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1},
{"xuehao":4173097,"name":"张三","xueyuan":"计算机学院","zhuanye":"软件工程",
"banji":"软件1702","xingbie":"女","selfgroup":3,"style":1,"pass":1}]

var paimingci=document.getElementsByClassName("paimingci");
var paixuehao=document.getElementsByClassName("paixuehao");
var painame=document.getElementsByClassName("painame");
var paisex=document.getElementsByClassName("paisex");
var paiall=document.getElementsByClassName("paiall");
var paiscore=document.getElementsByClassName("paiscore");
var studentmore=document.getElementsByClassName("student-more");
var chose_ok2=document.getElementsByClassName("chose_ok2");
var paixuan=document.getElementsByClassName("paixuan")[0];
var paimian=document.getElementsByClassName("paimian");
var paidian=document.getElementsByClassName("paidian")[0];  //ul
var paistate=document.getElementsByClassName("paistate");
//paixuan.addEventListener('blur',function(){
//	console.log(paixuan.value);
//})
paixuan.onclick=function(){
	console.log(paixuan.value)  //!!!!!!接口  选择面试排名的类型

	paidian.innerHTML="";
	var xiaokuai;
	for(var i=1;i<=(newarr.length/15)+1;i++)
	{
	var dian=document.createTextNode(i);   //创建文本节点
    xiaokuai=document.createElement('li');   //创建元素节点
    xiaokuai.setAttribute('class',"paichose"); //给标签设置属性
    xiaokuai.appendChild(dian);  //
    paidian.appendChild(xiaokuai);  // 
	}

	if(newarr.length>=15)
		var longlong=15;
	else longlong=newarr.length;
	for(var i=0;i<longlong;i++) 
		{
			for(var j=0;j<paicha.length;j++)
			{
				if(paicha[j].xuehao==newarr[i].xuehao)
				break;
			}
            paimingci[i].innerHTML=i+1;
			paixuehao[i].innerHTML=paicha[j].xuehao;
			painame[i].innerHTML=paicha[j].name;
			paisex[i].innerHTML=paicha[j].xingbie;
			paiall[i].innerHTML=paicha[j].xueyuan+" / "+paicha[j].zhuanye+" / "+paicha[j].banji;
		    paiscore[i].innerHTML=newarr[i].score; 
		    studentmore[i].setAttribute('name',paicha[j].xuehao); //给标签设置属性
		    studentmore[i].innerHTML="+";
		    console.log(paicha[j].style,"11")
		    if(paicha[j].style==0)
		    	paistate[i].innerHTML="面试中";	
		    else if(paicha[j].style==1)
		    	paistate[i].innerHTML="待审核";
		    else if(paicha[j].style==2)
		    	paistate[i].innerHTML="已通过";
		    else if(paicha[j].style==3)
		    	paistate[i].innerHTML="未通过";	
		}
var paichose=document.getElementsByClassName("paichose");
paichose[0].style.backgroundColor="#004b9f";
paichose[0].style.opacity=.7;
		for(var r=0;r<(newarr.length/15);r++)   //详细 绑定所有的事件
	    {
		(function(r){
			paichose[r].addEventListener('click',function(){
			         //console.log("1");
			        paichose[r].style.backgroundColor="#004b9f"; //改变选项的颜色
    				paichose[r].style.opacity=.9;
    				for(var j=0;j<(newarr.length/15);j++)
    				{
    					if(j!=r)
    					{
    						paichose[j].style.backgroundColor="grey";
    				        paichose[j].style.opacity=.7;
    					}
    				}

			         if(newarr.length>=(r+1)*15)   //18 15
			        	var longlong=15;
			         else longlong=newarr.length-r*15   //3
			        for(var i=0;i<longlong;i++) //15 16 17
					{
						//console.log(i,"00",longlong+r*15);
						for(var j=0;j<paicha.length;j++)
			            {
				            if(paicha[j].xuehao==newarr[i].xuehao)
				            break;
			            }
			            paimingci[i].innerHTML=i+r*15+1;
					    paixuehao[i].innerHTML=paicha[j].xuehao;
			            painame[i].innerHTML=paicha[j].name;
			            paisex[i].innerHTML=paicha[j].xingbie;
			            paiall[i].innerHTML=paicha[j].xueyuan+" / "+paicha[j].zhuanye+" / "+paicha[j].banji;
		                paiscore[i].innerHTML=newarr[i+r*15].score; 
		                studentmore[i].setAttribute('name',paicha[j].xuehao); //给标签设置属性
		                studentmore[i].innerHTML="+";
		                if(paicha[j].style==0)
		    	paistate[i].innerHTML="面试中";	
		    else if(paicha[j].style==1)
		    	paistate[i].innerHTML="待审核";
		    else if(paicha[j].style==2)
		    	paistate[i].innerHTML="已通过";
		    else if(paicha[j].style==3)
		    	paistate[i].innerHTML="未通过";
					}
					for(var i=longlong;i<15;i++) 
					{
						paixuehao[i].innerHTML=studentmore[i].innerHTML=paistate[i].innerHTML=paimingci[i].innerHTML=painame[i].innerHTML=paisex[i].innerHTML=paiall[i].innerHTML=paiscore[i].innerHTML=""
					}
			       },false);
		}(r));      
	}
}
//---page-4-------------------------------------------------------------
    var input=document.getElementById('find');   //输入框
             input.onfocus=function(){
                if(this.value=="请输入学号")
                this.value="";
                this.style.color="black";
             }
             input.onblur=function(){  
                if(this.value==""){
                this.value="请输入学号";
                this.style.color="#999"
                }
             }
    //关闭的提示框
    var page4_star=document.getElementsByClassName("page4_star")[0];
    var page_4_left=document.getElementsByClassName("page_4_left")[0];
    var page4_tell=document.getElementsByClassName("page4_tell")[0];
    var page4_all=document.getElementsByClassName("page4_all")[0];
    var yimian=document.getElementsByClassName("yimian")[0];
    var ermian=document.getElementsByClassName("ermian")[0];
    var page_4_add=document.getElementsByClassName("page_4_add")[0];
    var wenbenkuang=document.getElementsByClassName("wenbenkuang");

var chargehand='{"C语言":50,"沟通能力":10,"算法能力":10}';  //!!!!!请求一面得分规则
var chargehand1='{"第一题":50,"第二题":10,"第三题":10}';  //!!!!!请求二面得分规则
var jsonobj=JSON.parse(chargehand); //可以将json字符串转换成json对象 
var jsonarr = Object.keys(jsonobj); 

var jsonobj1=JSON.parse(chargehand1); //可以将json字符串转换成json对象 
var jsonarr1 = Object.keys(jsonobj1);


    page4_star.addEventListener('mouseover',function(){
			      page4_tell.style.display="block"   
			       },false);
    page4_star.addEventListener('mouseout',function(){
			      page4_tell.style.display="none"   
			       },false);
    page4_star.addEventListener('click',function(){
			      page4_all.style.display="none"   
			       },false);

    //选择打分的几面
    var page4_=document.getElementsByClassName("page4_");
    for(var r=0;r<2;r++)   //切换几面的详细信息
	{ 
		(function(r){
			page4_[r].addEventListener('click',function(){     
			         page4_[r].style.backgroundColor="#00b7a9";
			         page_4_left.innerHTML="";

			         if(r==0)
			         {
			         	yimian.style.display="block";
			         	ermian.style.display="none";

			         	for(var i=0;i<jsonarr.length;i++)
				        {
		                var dian=document.createTextNode(jsonarr[i]);   //创建文本节点
					    var chuang=document.createElement('p');   //创建元素节点
					    chuang.setAttribute('class',"daqing"); //给标签设置属性
					    chuang.appendChild(dian);  //
					    page_4_left.appendChild(chuang);  // 


					    var chuang1=document.createElement('input');   //创建元素节点
					    chuang1.setAttribute('class',"daqing1"); //给标签设置属性
					    chuang1.type="text";
					    chuang1.value="";
					    page_4_left.appendChild(chuang1);  // 
					    console.log("1111")
				        }

			         }
			         else {
			         	yimian.style.display="none";
			         	ermian.style.display="block";
			         	for(var i=0;i<jsonarr1.length;i++)
				        {
		                var dian=document.createTextNode(jsonarr1[i]);   //创建文本节点
					    var chuang=document.createElement('p');   //创建元素节点
					    chuang.setAttribute('class',"daqing"); //给标签设置属性
					    chuang.appendChild(dian);  //
					    page_4_left.appendChild(chuang);  // 


					    var chuang1=document.createElement('input');   //创建元素节点
					    chuang1.setAttribute('class',"daqing1"); //给标签设置属性
					    chuang1.type="text";
					    chuang1.value="";
					    page_4_left.appendChild(chuang1);  // 

				        }
			         }	      
			         for(var j=0;j<2;j++)
				     {
						if(j!=r)
						{
						 page4_[j].style.backgroundColor="black";
						}
				     }
			       },false);
		}(r));      
	}

//'{xuehao:123,context:"{\"第一题\":10,\"第二题\":10}",advince:"继续努力",history:"xxxx"}'
(function(i){
			page_4_add.addEventListener('click',function(){   
					var daqing=document.getElementsByClassName("daqing");
					var daqing1=document.getElementsByClassName("daqing1");

			       for(var i=0;i<2;i++)
			       {
			       		if(page4_[i].style.backgroundColor!="black")
			       			break;
			       }
			       //console.log(i);   //!!!!!!选择接口一面打分接口还是二面打分接口
			       if(i==0)  //一面接口
			       {
			       	var content=new Object();
			       	for(var j=0;j<jsonarr.length;j++)
			       	{
			       		content[jsonarr[j]]=daqing1[j].value
			       	}
			       	var chargehand_=new Object();
			       	chargehand_.xuehao=parseInt(input.value);
			       	chargehand_.context=content;
			       	chargehand_.advince=wenbenkuang[0].value;
			       	chargehand_.history=wenbenkuang[1].value;
			       console.log(JSON.stringify(chargehand_));
			       }else{   //二面接口
			       	var content=new Object();
			       	for(var j=0;j<jsonarr1.length;j++)
			       	{
			       		content[jsonarr1[j]]=daqing1[j].value
			       	}
			       	var chargehand_=new Object();
			       	chargehand_.xuehao=parseInt(input.value);
			       	chargehand_.context=content;
			       	chargehand_.advince=wenbenkuang[2].value;
			       console.log(JSON.stringify(chargehand_));
			       }

			       },false);
		}(i)); 
//console.log(jsonarr[0]);  //C语言 属性
//console.log(jsonobj[jsonarr[0]]);  //50 值
//console.log(jsonarr.length);  //2 数组的长度


var dasou=document.getElementsByClassName("dasou")[0];
(function(i){
			dasou.addEventListener('click',function(){     
			        // console.log(input.value);  查询有没有该学号学生 ！！！
			        page4_all.style.display="block";

			     
			       

			       },false);
		}(i)); 



//var xhr = new XMLHttpRequest();  //请求打分规则数据
//xhr.open( 'GET', '/searchrule' , true );
//xhr.onreadystatechange = function () {
//  if (xhr.readyState !== 4 || xhr.status !== 200) {
//    return;
//  }
//  console.log(xhr.responseText);
//};
//xhr.send();