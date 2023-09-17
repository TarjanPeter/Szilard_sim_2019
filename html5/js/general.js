//  =============== Random number generation with seed  =================

var rndseed = 0.000305; 
var rnd = rndseed; 


function myRandom(){  //gives back real numbers between 0.000000 és 0.999999   
  var a = 2398;
  var c = 8738;
  var m = 1000000;  
  var result;
  result = ((a*m*rnd + c) % m)/m; 
  rnd = result;
  return result;
}

// ============= Rounding to 2 digits ===================================

function dec2(num) {
  return Math.round(100*num)/100;  
}

//======================================================

function UpdateAll(){
 var x = 0;
 var co2 = document.getElementById("CO2");
 var aramar  = document.getElementById("aramar");
 var elteres = document.getElementById("elteres");
 var eltszaz =document.getElementById("eltszazalek");

co2.value = 0;
aramar.value = 0;
elteres.value = 0;

//   ...........Relative deviation ..........
 x = Statist[12]; //Statist[12] is the sum of absolute values of the (production-demand) differences
 elteres.value = dec2(x); 
 if (Number(Statist[8]) != 0) { eltszaz.value = Math.round(10000*x/Number(Statist[8]))/100;}
// ......... CO2 and Cost of electricity .............. 
 if (Number(Statist[7]) != 0) {
co2.value = Math.round(100*1000*Number(Statist[10]) / Number(Statist[7]))/100;
aramar.value = Math.round(100*(Number(Statist[13])+Number(Statist[11]))/Number(Statist[7]))/100;
//eltszaz.value = Math.round(10000*x/Number(Statist[8]))/100;
}

DrawActCapacity();
}

//====================  Initialization =====================================================
function Language() {
 var x;
 const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)    

 if (document.getElementById("LangSelect").value =="English") {Lang="En"};
 if (document.getElementById("LangSelect").value =="Magyar") {Lang="Hu"};  
 document.getElementById("Language").style.display ="none";  //Hide the language window
 document.getElementById("LastBtn").checked = true;  //Switch on the "random" function (for initialization)
 document.getElementById("elteres").value = 0; 
 document.getElementById("eltszazalek").value = 0; 
 Statist[8] = 0,
 Statist[7] =0;
 let tbl =  document.getElementById("MainTable");
 tbl.style.position = "fixed";
 tbl.style.top = "5px";
 tbl.style.left = "10em";
 tbl.style.display = "block";  //Display the main window
 DrawPPTs();                   //Draw the powerplants 
 SetCaptions();                //Set the captions according to the languages
 SelectDate();                 //Generate the firt date for the simulation
 ClearPics();                  //Initiate and clear the pictures
}
// =======================Set captions and language =======================================
function SetCaptions(){
 var z;
 var s;
 var v;
    for (let i=0; i<captionshu.length; i++){
    if (captionsid[i]=="none")
    {
       continue; 
    }
    if(Lang=="Hu") {
        v = captionshu[i];
    } else {
        v = captionsen[i];       
    } 
    if (captionsid[i]=="captions8"){
       s ="szimul";
     } else {
       s = captionsid[i];
     }  
   z = document.getElementById(s)
   if(s=="szimul") {
      z.value = v;
     } else {
      z.innerHTML = v;
     }
     }  
   if(Lang == "Hu")  {
    document.title = "Villamosenergia rendszer";
   } else {
    document.title = "Electrical power system";
   }
}
// =======================Set date =======================================
function ShowDate(){
var x;
var s;
var EDat = [];
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);    
let tbl = document.getElementById("DateSel");
tbl.style.position = "fixed";
tbl.style.top = "55px";
tbl.style.left = "30em";
tbl.style.display = "block";
 x = document.getElementById("DSelect"); 
 for (let i = 0; i < 311; i++) {   //Remove all dates
  x.remove(0);  
    }
var option = document.createElement("option");
    if (Lang == "Hu") {s = captionshu[66];} 
      else {s = captionsen[66];} 
    option.text = s;
    x.add(option);
for (let i = 0; i < 310; i++) {
var option = document.createElement("option");
  if(Nyar == true) {        //If it is summer...    
    EDat = mavir_august[i].split(',') }
    else {
    EDat = mavir_january[i].split(',');
    }  
 let s = EDat[25];
 option.text = s.substr(0,4)+'.'+s.substr(4,2)+'.'+s.substr(6); 
// alert(option.text);
  x.add(option); 
  }
}

function ListDate() {
var x = document.getElementById("DSelect");
var y = document.getElementById("LastBtn");
let i = x.selectedIndex; 
if (i == 0) {
 y.checked = true;
// SelectDate();
} else
 {
 y.checked = false;
 DateCode = i-1;
 SDate();
} 
document.getElementById("DateSel").style.display ="none";
} //End function ListDate