// ==========   This shows the Panel of the PowerPlant (ix) =================

function ShowPPT(ix){
const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)    
let tbl = document.getElementById("intable");
var s;
var t;
var v;

if(stime > 0 && stime <23) return;

if(document.getElementById("stattable").style.display == "block") {  //If the statistic table is shown, hide it!
   document.getElementById("stattable").style.display = "none";
}

let PPT=PowerPlants[ix];

if(Lang =="Hu") { 
  s = captionshu[37];
  t = captionshu[39];
  v = PPT.url;
} else {
  s = captionsen[37];   //"Are changes saved?" 
  t = captionsen[39];   //"None"
  v = PPT.urlen;        //image src  
}
if(tbl.style.display=="block") {
  if (confirm(s) != true) {
   return; 
  }  
}
// ========  Display the actual values in the panel =============
let MaxNum = PPT.maxNumber;
document.getElementById("inid").value = PPT.id;
if(Lang=="Hu"){
    document.getElementById("innev").value = PPT.namehu;
}
else {
document.getElementById("innev").value = PPT.name;
}
document.getElementById("inmxtelj").value = PPT.max_power;
document.getElementById("inmintelj").value = PPT.min_power;
document.getElementById("inrug").value = PPT.flexibility;
document.getElementById("inbefekt").value = PPT.investment_cost;
document.getElementById("inuzem").value = PPT.running_cost;
document.getElementById("inco2").value = PPT.co2_prod;
if(PPT.max_reserve == 10000) {
  document.getElementById("intarol").value = t;
}
else {
  document.getElementById("intarol").value = PPT.max_reserve;
}
document.getElementById("innumber").style.backgroundColor = "#7fffd4";
document.getElementById("innumber").value = PPT.NoOfUnits;
document.getElementById("innumber").title ="Maximum:"+MaxNum;
document.getElementById("inacttelj").value = PPT.actual_power;
document.getElementById("inactco2").value = PPT.actual_co2;
document.getElementById("inactkltsg").value = PPT.actual_income;
document.getElementById("inacttarolt").value = PPT.actual_capacity;
document.getElementById("inpic").src = v;

if(PPT.automata==true)
{
document.getElementById("incheck").style.visibility ="visible";    
document.getElementById("indiv").style.visibility ="visible"; 
document.getElementById("indiv0").style.visibility ="visible"; 
document.getElementById("incheck").checked = PPT.actauto;
}
else {
document.getElementById("incheck").style.visibility ="hidden";    
document.getElementById("indiv").style.visibility ="hidden";    
document.getElementById("indiv0").style.visibility ="hidden";    
document.getElementById("incheck").checked = false;
}
 tbl.style.position = "fixed";
 tbl.style.top = "55px";
 tbl.style.left = "21em";
 tbl.style.display = "block";
 setSelect();
}
// ====================== Hide the panel =========================
function Elrejt(){
 let tbl = document.getElementById("intable");
 tbl.style.display = "none";
}
//====================== Save the altered parameters =========================
function SaveData(){
 let tbl = document.getElementById("intable");
 let ix = document.getElementById("inid").value;
 let PPlant = PowerPlants[ix];
 let num = document.getElementById("innumber").value;
 if(num>PPlant.maxNumber) {
   if(Lang=="Hu") { 
   alert(captionshu[35]+PPlant.maxNumber);
   } else {
   alert(captionsen[35]+PPlant.maxNumber);  
   }
   return false; 
 }
 PPlant.NoOfUnits = document.getElementById("innumber").value;  
 PPlant.actauto = false;
 
 if(document.getElementById("incheck").checked == true) {
    PPlant.actauto = true;
    } 
 UpdatePP(PPlant);
 tbl.style.display = "none";    // Hide the panel
 DrawCapacity();                // Update the Capacity graph 
}
// ========================== update the Powerplant display ================
function UpdatePP(PPlant){
 var stable = PPlant.name;
 var x;
 x = Number(PPlant.min_power)*Number(PPlant.NoOfUnits);
 if(x ==0) {
    x = (PPlant.max_power*PPlant.NoOfUnits)/2;
 } 
 document.getElementById(stable+"NoUnits").value = PPlant.NoOfUnits;
 document.getElementById(stable+"maxpower").value = dec2(PPlant.NoOfUnits * PPlant.max_power);
 document.getElementById(stable+"actpower").max = dec2(PPlant.NoOfUnits * PPlant.max_power);  
 document.getElementById(stable+"actpower").min = 0;
 document.getElementById(stable+"actpower").min = dec2(PPlant.NoOfUnits * PPlant.min_power);  
 PPlant.actual_capacity = PPlant.NoOfUnits * PPlant.max_reserve/2;   //Fill it up to its half capacity (this is default)
 if (PPlant.id != 6) {
   PPlant.actual_power = dec2(x); //Only for two digits
 } else {
   PPlant.actual_power = 0; 
 }
 document.getElementById(stable+"actpower").value = PPlant.actual_power;    
 document.getElementById(stable+"actpower").readOnly = PPlant.actauto;
 }
// ==================   ==============================  
 function ActPChange(ix,vl){
 let PPlant = PowerPlants[ix];
 PPlant.actual_power = vl; 
 PPlant.actual_co2 = dec2(1000*PPlant.actual_power * PPlant.co2_prod); 
 PPlant.actual_income = dec2(1000*PPlant.actual_power*PPlant.running_cost + PPlant.NoOfUnits*1000*PPlant.max_power*PPlant.investment_cost);   
 //Update also in the powerplant's panel  (perhaps this is not necessary, because this panels hidde during the simulation)
 if (document.getElementById("inid").value == PPlant.id){
    document.getElementById("inacttelj").value = PPlant.actual_power;
    document.getElementById("inactco2").value = PPlant.actual_co2;
    document.getElementById("inactkltsg").value = PPlant.actual_income;
    document.getElementById("inacttarolt").value = PPlant.actual_capacity;
   }
 }
