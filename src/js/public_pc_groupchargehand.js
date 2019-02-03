//---page-1-------------------------------------------------------------
//---page-2-------------------------------------------------------------
//---page-3-------------------------------------------------------------	
	var student_more=document.getElementsByClassName('student-more');
	var student_sore_block=document.getElementById('student_sore_block');
	var more_colse=document.getElementsByClassName('more_colse')[0];
	var student_face_li=document.getElementsByClassName('student_face_li');
	var student_face=document.getElementsByClassName('student_face');

	for(var i=0;i<2;i++)   //详细 绑定所有的事件
	{
		(function(i){
			student_more[i].addEventListener('click',function(){
			         student_sore_block.style.display="block";
			         console.log(student_more[i].getAttribute('name'));//获取属性 设置属性 .setAttribute("属性","值")
			       },false);
		}(i));      
	}
	more_colse.addEventListener('click',function(){
		 student_sore_block.style.display="none";
	})

	
	for(var i=0;i<3;i++)   //切换几面的详细信息
	{
		(function(i){
			student_face_li[i].addEventListener('click',function(){
			         
			         student_face[i].style.opacity="1";
			         for(var j=0;j<3;j++)
				     {
						if(j!=i)
						{
						 student_face[j].style.opacity="0";
						}
				     }
			       },false);
		}(i));      
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
    var page4_tell=document.getElementsByClassName("page4_tell")[0];
    var page4_all=document.getElementsByClassName("page4_all")[0];
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
    for(var i=0;i<3;i++)   //切换几面的详细信息
	{
		(function(i){
			page4_[i].addEventListener('click',function(){     
			         page4_[i].style.backgroundColor="#00b7a9";	       
			         for(var j=0;j<3;j++)
				     {
						if(j!=i)
						{
						 page4_[j].style.backgroundColor="black";
						}
				     }
			       },false);
		}(i));      
	}