function DrawPPTs()  //This creates all powerplatns on the HTML page
{
   for (let i = 0; i < PowerPlants.length; i++) {
     powerTable(PowerPlants[i]);
    }
}

function powerTable(PPlant) {               //This creates a powerplant on the HTML page
  var x = document.createElement("TABLE");
  var stable = PPlant.name;
  var destin = document.getElementById('left');
  x.setAttribute("id", stable+"PTable");
  x.className = "ppt";
  destin.appendChild(x);
  var y1 = document.createElement("TR");
  y1.setAttribute("id", stable+"Tr1");
  document.getElementById(stable+"PTable").appendChild(y1);

  var z1 = document.createElement("TD");
  z1.rowSpan = 3; 
  z1.width = "70px";
  z1.onclick = function(){
    ShowPPT(PPlant.id); 
   } 

  var t1 = document.createElement("img");

  var t01 = new Image;
      t01.onload = function() {
      t1.src = t01.src; 
      t1.height = "74"; 
          }
  if(Lang=="Hu") {t01.src = PPlant.url;
  } else {
   t01.src = PPlant.urlen; 
  }
  z1.appendChild(t1);  
  document.getElementById(stable+"Tr1").appendChild(z1);
  
  var z2 = document.createElement("TD");
  z2.onclick = function(){
    ShowPPT(PPlant.id); 
   } 

  var t2 = document.createElement("p");
  t2.className = "ppx";
  if(Lang == "Hu") {
      t2.innerHTML ="Egységek:";
      } else{
      t2.innerHTML ="No. of units:";      
      }
       
  z2.appendChild(t2);
  document.getElementById(stable+"Tr1").appendChild(z2);

  var z3 = document.createElement("TD");
  var t3 = document.createElement("input");
  t3.className = "ppy";
  t3.type ="text";
  t3.value = 0;
  t3.readOnly = true;
  t3.id = stable+"NoUnits";
  z3.appendChild(t3);
  document.getElementById(stable+"Tr1").appendChild(z3);
  
  var y2 = document.createElement("TR");
  y2.setAttribute("id", stable+"Tr2");
  document.getElementById(stable+"PTable").appendChild(y2);

  var z4 = document.createElement("TD");
    z4.onclick = function(){
    ShowPPT(PPlant.id); 
   } 
  var t4 = document.createElement("p");
  t4.className = "ppx"; 
  t4.innerHTML = "Max. GW:";
  z4.appendChild(t4);
  document.getElementById(stable+"Tr2").appendChild(z4);

  var z5 = document.createElement("TD");
    z5.className = "ppy"; 
  var t5 = document.createElement("input");
  t5.id = stable+"maxpower";
  t5.className = "ppy";
  t5.type ="text";
  t5.value = 0;
  t5.readOnly =true;
  z5.appendChild(t5);
  document.getElementById(stable+"Tr2").appendChild(z5);


  var y3 = document.createElement("TR");
  y3.setAttribute("id", stable+"Tr3");
  document.getElementById(stable+"PTable").appendChild(y3);

  var z6 = document.createElement("TD");
  z6.onclick = function(){
    ShowPPT(PPlant.id); 
   } 
  var t6 = document.createElement("p");
   t6.className = "ppx";
   t6.style ="color:white;padding:0px";
   if(Lang=="Hu") {
   t6.innerHTML = "Aktuális GW:";} 
   else {
    t6.innerHTML = "Actual GW:";} 
   z6.appendChild(t6);
  document.getElementById(stable+"Tr3").appendChild(z6);

  var z7= document.createElement("TD");
  var t7 = document.createElement("input");
  t7.className = "ppy";
  t7.id = stable+"actpower";
  if(PPlant.automata==true)
  {
  t7.type ="number";
  t7.value = 0;
  t7.min = 0.0;
  t7.max = 0.0;
  t7.step = 0.05;
  }
  else
  {
  t7.type ="text";
  t7.value = 0;
  }
  t7.readOnly = true;
  // Should be updated for any change
  t7.onchange = function(){
    ActPChange(PPlant.id,t7.value);
    }
  z7.appendChild(t7);
  document.getElementById(stable+"Tr3").appendChild(z7);

document.getElementById("UpDown1").value =100;
document.getElementById("UpDown2").value =100;


if(Lang == "Hu") {
  document.getElementById("lblcoal").innerHTML = NameHu[0];  
  document.getElementById("lblgas").innerHTML = NameHu[1];  
  document.getElementById("lblatom").innerHTML = NameHu[2];  
  document.getElementById("lblwind").innerHTML = NameHu[3];  
  document.getElementById("lblsun").innerHTML = NameHu[4];  
  document.getElementById("lblhydro").innerHTML = NameHu[5];  
  document.getElementById("lblstorage").innerHTML = NameHu[6];
  document.getElementById("lblstdr").innerHTML = NameHu[6];
  document.getElementById("lblconsum").innerHTML = NameHu[7];
  document.getElementById("lblproduct").innerHTML = NameHu[8];
} else {
  document.getElementById("lblcoal").innerHTML = NameEn[0];  
  document.getElementById("lblgas").innerHTML = NameEn[1];  
  document.getElementById("lblatom").innerHTML = NameEn[2];  
  document.getElementById("lblwind").innerHTML = NameEn[3];  
  document.getElementById("lblsun").innerHTML = NameEn[4];  
  document.getElementById("lblhydro").innerHTML = NameEn[5];  
  document.getElementById("lblstorage").innerHTML = NameEn[6];
  document.getElementById("lblstdr").innerHTML = NameEn[6];
  document.getElementById("lblconsum").innerHTML = NameEn[7];
  document.getElementById("lblproduct").innerHTML = NameEn[8];
    
}

// ********* Now the priorities **********

 var zx = document.getElementById("TooFew");
 var zy = document.getElementById("TooMuch");
   for (let i = 0; i < 4; i++) {
  zx.remove(0);  
  zy.remove(0);
   }
  for (let i = 0; i < 4; i++) {
   var option1 = document.createElement("option");
   var option2 = document.createElement("option"); 
   if(Lang =="Hu") {
     option1.text = NameHu[TooFew[i]]; 
     option2.text = NameHu[TooFew[i]]; }
  else {
     option1.text = NameEn[TooMuch[i]]; 
     option2.text = NameEn[TooMuch[i]]; 
  }
  zx.add(option1);
  zy.add(option2);
   }
  zx.selectedIndex = 0;
  zy.selectedIndex = 0;
}
