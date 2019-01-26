 	function opens(obj) {
  for (var i=1;i<=4; i++) {
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

//---page-4-------------------------------------------------------------
    var input=document.getElementById('find');
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