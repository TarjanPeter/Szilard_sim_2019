function DrawPriority(ix){
 var x;
 var y;
 var s;
 if(ix==1){x =document.getElementById("TooFew");
 y =TooFew;}
 else {x= document.getElementById("TooMuch");
 y =TooMuch;} 
 s = x.value;  //this is the selected
 for (let i = 0; i < 4; i++) {
  x.remove(0);  
    }
 for (let i = 0; i < 4; i++) {
  var option = document.createElement("option");
  if(Lang =="Hu") {
  option.text = NameHu[y[i]]; }
  else {
  option.text = NameEn[y[i]]; 
  }
  x.add(option); 
  if(Lang =="Hu") {
    if(NameHu[y[i]]==s){
    x.selectedIndex=i;
    }
   }else {
    if(NameEn[y[i]]==s){
       x.selectedIndex=i;
     }  
    }
  }  
}

function SetTooFew(v) {                      // v =1  -> up   v = 0  -> down
 var x = document.getElementById("TooFew");  //Select
 var si = x.selectedIndex;
 var y =TooFew;
 var d;
 if(v==1) {              //upwards
   if(si>0) {
   d = y[si-1];          //Save the previous
   y[si-1] = y[si]; 
   y[si] = d;    
   }
 }  else {                //downwards
   if(si<3) {
    d = y[si+1];          //Save the next
    y[si+1] = y[si];
    y[si] =d;
   } 
 }    
 DrawPriority(1);   
}

function SetTooMuch(v) {
 var x = document.getElementById("TooMuch");
 var si = x.selectedIndex;
 var y =TooMuch;
 var d;
 if(v==1) {   //upwards
   if(si>0) {
   d = y[si-1]; //Save the previous
   y[si-1] = y[si]; 
   y[si] = d;    
   }
 }  else {   //downwards
   if(si<3) {
    d = y[si+1];   //save the next
    y[si+1] = y[si];
    y[si] =d;
   } 
 }    
 DrawPriority(0);   
}
