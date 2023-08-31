// ==========================  Statistics panel ==================================== 
function StatistR() {
const vxw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0)    
var x =0;
var y =0;
var z ="instat";
var ActualBuild = 0;
var PPlant;
if (stime ==0) {return;}
for(var i=0;i<7;i++) {
 PPlant = PowerPlants[i];  
 ActualBuild = Number(ActualBuild) + Number(PPlant.NoOfUnits*PPlant.max_power);  //The built-in maximal power 
}
let tbl = document.getElementById("stattable");   //Definition of the position and the attributes of the panel
tbl.style.position = "fixed";
tbl.style.top = "55px";
tbl.style.left = "21em";
tbl.style.display = "block";

x = Statist[12];    //  Statist[12] is the sum of absolute values of the production-demand differences (see cycle.js)

document.getElementById("instat01").value = dec2(Statist[7]);  //1   ok
document.getElementById("instat02").value = dec2(Statist[8]);  //2   ok 
document.getElementById("instat03").value = dec2(x);           //13  ok     This is the square root of the sum of squared differences
document.getElementById("instat031").value = 0.0;              //22  ok     This is the "realtive value" 
document.getElementById("instat04").value = dec2(Statist[9]);  //3   ok     This is the export/import absolute value
document.getElementById("instat041").value = 0.0;              //21  ok     This is the export/import relative value 
document.getElementById("instat05").value = 0.0;               //4   ok     This is the sum of the CO2 production
document.getElementById("instat06").value = 0.0;               //5   ok     This is the cost
document.getElementById("instat07").value = dec2(Statist[0]);  //6   ok     This is the sum of the coal-fired plants' production
document.getElementById("instat071").value = 0.0;              //14  ok     coal-fired plants' production "relative"
document.getElementById("instat08").value = dec2(Statist[1]);  //7   ok     This is the sum of the gas-fired plants' production
document.getElementById("instat081").value = 0.0;              //15  ok           "relative"
document.getElementById("instat09").value = dec2(Statist[2]);  //8   ok     This is the sum of the nuclear plants' production
document.getElementById("instat091").value = 0.0;              //16  ok           "relative"
document.getElementById("instat10").value = dec2(Statist[3]);  //9   ok     This is the sum of the wind-energy plants' production
document.getElementById("instat101").value = 0.0;              //17  ok           "relative"
document.getElementById("instat11").value = dec2(Statist[4]);  //10  ok     This is the sum of the solar plants' production 
document.getElementById("instat111").value = 0.0;              //18  ok           "relative"
document.getElementById("instat12").value = dec2(Statist[5]);   //11 ok     This is the sum of the hydro plants' production
document.getElementById("instat121").value = 0.0;               //19 ok           "relative"
document.getElementById("instat13").value = dec2(Statist[6]);   //12 ok     This is the sum of the storage plants' production
document.getElementById("instat131").value = 0.0;               //20 ok           "relative"
document.getElementById("instat14").value = 0.0;                //23 ok     Total utilization factor
document.getElementById("instat15").value = 0.0;                //24 ok     Utilization factor of coal-fired plants 
document.getElementById("instat16").value = 0.0;                //25 ok     Utilization factor of gas-fired plants
document.getElementById("instat17").value = 0.0;                //26 ok     Utilization factor of nuclear plants
document.getElementById("instat18").value = 0.0;                //27 ok     Utilization factor of wind-energy plants
document.getElementById("instat19").value = 0.0;                //28 ok     Utilization factor of solar plants
document.getElementById("instat20").value = 0.0;                //29 ok     Utilization factor of hydro plants
y = Number(stime)*ActualBuild; 

if(y != 0) {
  y = Number(y)+ActualBuild;  //because there is stime+1 hour in the [0,stime] interval!  
  document.getElementById("instat14").value = dec2((0.1*Statist[7])/y);                //23  Total utilization factor
}

for(var i=0;i<6;i++) {            //Loop along the powerplants for the utilization factors
 PPlant = PowerPlants[i];
  if(PPlant.NoOfUnits>0) {
    y = (0.1*Statist[i])/((Number(stime)+1)*PPlant.NoOfUnits*PPlant.max_power);
    z ="instat"+(15+i);
    document.getElementById(z).value = dec2(y);
  }
 } // End for 

if(Statist[8] != 0) {                                                //Normalization to the total demand
 y = 100/Statist[8];   
 document.getElementById("instat031").value = dec2(y*x);             //x was the sum of absolute values of the production-deman differences
 document.getElementById("instat041").value = dec2(y*Statist[9]);
 document.getElementById("instat071").value = dec2(y*Statist[0]);   
 document.getElementById("instat081").value = dec2(y*Statist[1]);   
 document.getElementById("instat091").value = dec2(y*Statist[2]);   
 document.getElementById("instat101").value = dec2(y*Statist[3]);   
 document.getElementById("instat111").value = dec2(y*Statist[4]);   
 document.getElementById("instat121").value = dec2(y*Statist[5]);   
 document.getElementById("instat131").value = dec2(y*Statist[6]); 
 document.getElementById("instat05").value =  dec2(10*y*Statist[10]); 
 x = Number(Statist[11]) +  Number(Statist[13]);
 document.getElementById("instat06").value = dec2(0.01*y*x); 
} 
 
} // End function StatistR
// =========================  Hide the Statistics panel ========================
function StatRejt() {
let tbl = document.getElementById("stattable");
 tbl.style.display = "none";  
}
