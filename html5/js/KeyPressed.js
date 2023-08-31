// =========================   Keyboard handling ==========================
 function EnterPressed(myfield,xmi,xma) //If "Enter" has pressed in an inpit field
{
    var s;
 if(Lang =="Hu") {
    s = captionshu[36];
 } else{
    s = captionsen[36];     // "Invalid data" string
 }  
 if (myfield.value<xmi)    //If the entered value is not within the limits
  {
    alert(s);
    myfield.value = xmi;
  }
 if (myfield.value>xma) 
  {
    alert(s);
    myfield.value = xma;
  }
 SaveData(); 
}
//------------------------------------------
function KeyPressed(myfield, e, goods,xmi,xma)  //If any key is pressed in an inpit field
{
var key, keychar;
if (window.event) key = window.event.keyCode;
else if (e) key = e.which;
else return true;
// get character
keychar = String.fromCharCode(key);
keychar = keychar.toLowerCase();
goods = goods.toLowerCase();

// check goodkeys
if (goods.indexOf(keychar) != -1)
	return true;
	
// control keys
if ( key==null || key==0 || key==8 || key==9 || key==27 )
   return true;
if (key == 13)      //If "Enter" key was pressed
{
 EnterPressed(myfield,xmi,xma);
 return false;
} 
else return false;  
}
// ==============================================================
function KeyPr(myfield,e){
 let ix = document.getElementById("inid").value;
 let PPlant = PowerPlants[ix];
 let xmi = 0;
 let xma = PPlant.maxNumber;
 let goods ='0123456789';
 return KeyPressed(myfield,e,goods,xmi,xma);   
}



