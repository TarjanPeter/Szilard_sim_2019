// =====================     Draw Capacity ===================
function DrawActCapacity(){      //Draw actual storage reserve  
var canvas2 = document.getElementById("storcap");
var cty = canvas2.getContext("2d");
var orig = 0;
var origy = 0;
var PPlant;
var xsc = 0.5;

cty.fillStyle = "#FFFFFF";
cty.fillRect(0,0,300,20);
 PPlant = PowerPlants[6];  //  Storage
 if(PPlant.NoOfUnits>0) {
 xsc = 300/(PPlant.max_reserve*PPlant.NoOfUnits);
 } else {
  xsc = 0;  
 }
 orig =0;
 origy =xsc * PPlant.actual_capacity;  //because we handle only one day
 cty.fillStyle = PPlant.pcolor;
 cty.fillRect(orig,0,origy,20);
 document.getElementById("tarolasi").value = dec2(PPlant.max_reserve*PPlant.NoOfUnits); 
 if(PPlant.NoOfUnits>0) {
 document.getElementById("capszazalek").value = dec2(100*PPlant.actual_capacity/(PPlant.max_reserve*PPlant.NoOfUnits))+" %"; 
 } else {
 document.getElementById("capszazalek").value = "0.0 %";  
 }
}

function DrawCapacity() {
var canvas1 = document.getElementById("capacity");
var ctx = canvas1.getContext("2d");
var orig = 0;
var origy = 0;
var PPlant;
var Beepitett = 0;
ctx.fillStyle = "#FFFFFF";
ctx.fillRect(0,0,350,20);
let i = 0;
while (i < 6) {
   PPlant =PowerPlants[i];
   Beepitett = Beepitett + (PPlant.NoOfUnits * PPlant.max_power);
   ctx.fillStyle = PPlant.pcolor;
   i++;
   origy = orig + 13.5*(PPlant.NoOfUnits * PPlant.max_power);
   ctx.fillRect(orig,0,origy,20);
   orig = origy;         
}
ctx.fillStyle="white"; //valami miatt törölni kell... (??)
ctx.fillRect(orig,0,origy,20);
document.getElementById("beepitett").value = dec2(Beepitett); 
DrawActCapacity(); 
}
