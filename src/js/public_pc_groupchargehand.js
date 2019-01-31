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