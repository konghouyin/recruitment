function opens(obj) {              //页面的切换
   for (var i=1;i<=6; i++) {
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
 