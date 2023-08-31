//=============================   Drawing ==============================

function DrawProduct() {
  var z = document.getElementById("plot2");  
  var cx = z.getContext("2d"); 
  var xsc =0;
// First clear the picture
 cx.beginPath( ),
 cx.fillStyle = "#000000";
 cx.fillRect(0,0,z.width,z.height);  
 cx.stroke();
 if(document.getElementById("check2max").checked ==true) {
   GetAuto(2); 
 }
 DrawAxis(cx,yMax2);
 if(stime>0){
 if(document.getElementById("consumdraw").checked ==true){
  cx.beginPath();  
  cx.strokeStyle = "yellow";
  for (let i=0; i<=stime; i++) {
    if(i==0)
    {
     cx.moveTo(x00,y00-scy2*AvDemand*Electrdata[0]); //AvDemand*Electrdata is in MW   
    } else {
      cx.lineTo(x00+15*i,y00-scy2*AvDemand*Electrdata[i]);
    }
   } 
  cx.stroke();
  }
 if(document.getElementById("productdraw").checked ==true){
  cx.beginPath();  
  cx.strokeStyle = "fuchsia";
  for (let i=0; i<=stime; i++) {
    if(i==0)
    {
     cx.moveTo(x00,y00-scy2*1000*totalProduction[0]); //1000*totalProduction data will be in MW   
    } else {
      cx.lineTo(x00+15*i,y00-scy2*1000*totalProduction[i]);
    }
   } 
  cx.stroke();
  }
 
 
 if(PowerPlants[6].NoOfUnits>0) {
 xsc = 150/(PowerPlants[6].max_reserve*PowerPlants[6].NoOfUnits);
 } else {
  xsc = 0;  
 }
 if(document.getElementById("storagedraw").checked ==true){
  cx.beginPath();  
  cx.strokeStyle = PowerPlants[6].pcolor;
  for (let i=0; i<=stime; i++) {
    if(i==0)
    {
     cx.moveTo(x00,y00-xsc*actualReserve[0]); //1000*actualReserve will be in MWh, but the display max is 24000, therfore it will be "rescaled" to 6000.   
    } else {
      cx.lineTo(x00+15*i,y00-xsc*actualReserve[i]);
    }
   } 
  cx.stroke();
  }
  }
  cx.beginPath(); 
  cx.strokeStyle = "white";
  cx.moveTo(x00+15*stime,0);
  cx.lineTo(x00+15*stime,y00);
  cx.stroke();
}

function DrawPPlants() {
  var z = document.getElementById("plot1");  
  var cx = z.getContext("2d");
  var PPlant;
  var GraphPower = [];
  var ActPower = [];
// First clear the picture
 cx.beginPath( ),
 cx.fillStyle = "#000000";
 cx.fillRect(0,0,z.width,z.height);  
 cx.stroke();

 if(document.getElementById("check1max").checked ==true) {
   GetAuto(1); 
 }

 DrawAxis(cx,yMax1);

// Now draw the powers
if(stime>0) {  //Only if some time have elapsed already (there are data)
ActGraph =[];
for (var i=0; i<7; i++) {   //prepare for powerplants which should be plotted
  if(GraphSet[i]==true) {ActGraph.push(Graph[i])};     
}

if (ActGraph.length>0) {
    GraphMaxY = 0;     //This will contain the maximal value, will be neded for the "Auto" option          
    for (var i=0; i<ActGraph.length; i++) {  //Draw them, starting with the first
       cx.beginPath();
       cx.strokeStyle = PowerPlants[ActGraph[i]].pcolor;
       cx.fillStyle = PowerPlants[ActGraph[i]].pcolor;  //Will be filled with this color
       cx.moveTo(x00+2,y00-2);   //Start from the bottom left corner
 
       GraphPower = [];  //Clear the array
       for(var j=0; j<=stime; j++) {   // Draw the "upper" line through the hours
       GraphPower[j] = 0;                //Must be initiated first
          for (var k = 0; k<ActGraph.length; k++) { //The productions mut be added
            PPlant = PowerPlants[ActGraph[k]];
            if (k>=i) {                            //But only the "remainings"
                GraphPower[j] += Number(PowerPlants[ActGraph[k]].product[j]);
             }
            if (GraphPower[j]>GraphMaxY) {
                GraphMaxY = Number(GraphPower[j]);
            }  
        }     //End for k 
        cx.lineTo(x00+2+15*j,y00-2-scy1*1000*GraphPower[j]); 
        }  // End for j

      cx.lineTo(x00+2+15*stime,y00-2);  
      cx.closePath;  
      cx.fill();
      cx.stroke();  
    } // End for i
  }  //End if ActGraph.length >0

//  Line... 
  cx.beginPath(); 
  cx.strokeStyle = "white";
  cx.moveTo(x00+2+15*stime,0);
  cx.lineTo(x00+2+15*stime,y00);
  cx.stroke();
 }   // End if(stime>0) 
}
//     -----    Auto scaling --------------
function GetAuto(v) {
var x;
var ym;
var ta;
var GPower;
var yyy;
 if(v==1) {
  ym =0;
  x = document.getElementById("check1max");
  Auto1 =false;
  if (x.checked ==true) {
   Auto1 = true;
   ym = 1000*GraphMaxY;
   yMax1 = 100; //Ez a minimum 
   ta = document.getElementById("plot1max");
   ta.value = yMax1;
   yyy = document.getElementById("UpDown1");
   if (ym>yMax1) {
   while (ym>yMax1) {
    yyy.value = 105;
    setYMax(1);
    } 
    } else {
    while (ym<yMax1) {
    yyy.value = 95;      
    setYMax(1);
   if(yMax1==100) {break};
    } 
    } 
     x.checked = true;  //set back     
   } //End if x.checked == true 
 } 
 else {
  ym =0;
  x = document.getElementById("check2max");
  Auto2 = false;
  if (x.checked ==true) {
    Auto2 = true;
    for (let i=0; i<=stime;i++) {
    if(document.getElementById("consumdraw").checked==true) {
     if(AvDemand*Electrdata[i]>ym) {ym = AvDemand*Electrdata[i]};        
    }
    if(document.getElementById("productdraw").checked==true) {
    if(1000*totalProduction[i]>ym) {ym = 1000*totalProduction[i]};
     }
    if(document.getElementById("storagedraw").checked==true) {
     if(250*actualReserve[i]>ym) {ym = 250*actualReserve[i]};
     }
    } 
   yMax2 =100; //This is the minimum
   ta = document.getElementById("plot2max");
   ta.value = yMax2;
   yyy = document.getElementById("UpDown2");
   if (ym>yMax2) {
   while (ym>yMax2) {
    yyy.value = 105;
    setYMax(2);
    } 
    } else {
    while (ym<yMax2) {
    yyy.value = 95;      
    setYMax(2);
   if(yMax2==100) {break};
    } 
    }
   x.checked = true;  //set back
 }  //End if x.checked == true  
 }  //End if( v == 1) else )
 }

function setSelect() {
var cd =  document.getElementById('innumber');
cd.focus();
cd.setSelectionRange(0, cd.value.length);
}


function  GetGraphSelect() {
 var vv; 
  vv = document.getElementById("storageselect");  
  GetGraphSet(vv,0);  
  vv = document.getElementById("gasselect");  
  GetGraphSet(vv,1);  
  vv = document.getElementById("sunselect");  
  GetGraphSet(vv,2);  
  vv = document.getElementById("windeselect");  
  GetGraphSet(vv,3);  
  vv = document.getElementById("hydroselect");  
  GetGraphSet(vv,4);  
  vv = document.getElementById("coalselect");  
  GetGraphSet(vv,5);  
  vv = document.getElementById("atomselect");  
  GetGraphSet(vv,6);  
}
 
 function GetGraphSet(x,v) {
  var b = false;
  if(x.checked==true){
     b = true
    };
  GraphSet[v] = b;
  DrawPPlants();
 }

 function GetGraph2Set(x,v) {
  var b =false;
  if(x.checked==true){
     b = true
   };
  Graph2Set[v] = b;
  DrawProduct();
 }

function UpMax(ta){            
 var s = ta.value.substr(0,1); //This is the first character
 var m = ta.value.substr(1);  //These are the zeroes after... 
 var s2="";
 if (s=="1") {
     s2="2";
   } else 
      if (s=="2") {
          s2 ="5"; 
        } else 
          if(s=="5"){
            s2 ="1";
            m = m+"0";
          }
 ta.value = s2+m;
}

function DownMax(ta){
 if(ta.value<101) {
    return;
   }
 var s = ta.value.substr(0,1); //This is the first character
 var m = ta.value.substr(1);  //These are the zeroes after...
 var s2 = "";
 if(s=="1"){
      s2=5;
      m = m.substr(1); //...one less zero
    } else 
        if(s == "2"){
          s2 ="1"; 
        } else 
            if (s == "5") {
                 s2 = "2";
            }
 ta.value = s2+m;    
}


function setYMax(v){    //This handles the Up/Down buttons
 var yyy;
 var targ;
 var x1;
 var canvas;
 var ctx;
 var w1;
 if(v==1) {
  yyy = document.getElementById("UpDown1");  //This is the value of Up/Down buttons (usually 100))
  targ = document.getElementById("plot1max"); //This is the value of yMax1
  canvas = document.getElementById("plot1");  //That is the drawing
  ctx = canvas.getContext("2d");
  if (yyy.value >= 100){     //The "Up" button has been pressed
  UpMax(targ);               //Increase yMax1 
  } else {                   //else
  DownMax(targ);             //decrease yMax1
  } 
  yMax1 = targ.value;        //save it
  }
 else
 {
  yyy = document.getElementById("UpDown2");
  targ = document.getElementById("plot2max");
  canvas = document.getElementById("plot2");
  ctx = canvas.getContext("2d");
  if (yyy.value >= 100){
  UpMax(targ);
  } else {
  DownMax(targ);
  }
 yMax2 = targ.value;  
 }
 
 yyy.value =100; //set back the value of the buttons to 100 

 ctx.beginPath();    //This is the text drawing on the graph
 ctx.fillStyle = "#000000";  //Clear its place
 ctx.fillRect(0,0,x00-2,30);
 ctx.strokeStyle = "white";  
 ctx.font = "12px Arial";
 ctx.lineWidth = 1;
 w1 = ctx.measureText(targ.value).width;  
 ctx.strokeText(targ.value, x00-w1-4, 20);  //Write out the value of yMax 
 ctx.stroke();
 if (v ==1) {
   scy1 = (y00-20)/targ.value;  //The scale of the vertical axis at plot1
   document.getElementById("check1max").checked = false;
   DrawPPlants();        //Draw it again, since yMax might have been changed
 } else { 
   scy2 = (y00-20)/targ.value;  //The scale fo the vertical axis at plot2  
   document.getElementById("check2max").checked = false;
   DrawProduct(); //Draw it again, since yMax2 might have been changed  
 }
}

function DrawAxis(canvas, YMax){
  canvas.beginPath(); 
  canvas.strokeStyle = "white";
  canvas.lineWidth = 2;
  canvas.moveTo(x00, 10);
  canvas.lineTo(x00, y00);
  canvas.lineTo(410, y00);
  canvas.stroke();
  
  canvas.beginPath();
  canvas.font = "12px Arial";
  canvas.lineWidth = 1;
  var w1 =canvas.measureText(YMax).width;
  canvas.strokeText(YMax, x00-w1-4, 20);
  for (let i=0; i<13; i++) {
    let h=2*i;
    w1 = canvas.measureText(h).width;
    let x0 = x00+30*i -w1/2;
    canvas.strokeText(h, x0, y00+20);
    canvas.moveTo(x00+30*i, y00);
    canvas.lineTo(x00+30*i, y00+7);
  }
 canvas.stroke(); //now completes the drawing process  
}

function ClearPics(){                               //Clear both pictures
 var canvas1 = document.getElementById("capacity");
 var ctx = canvas1.getContext("2d");
 var canvas2 = document.getElementById("storcap");
 var cty = canvas2.getContext("2d");
//----------------------------------
 var pL1 =document.getElementById("plot1");
 var pL2 =document.getElementById("plot2");
 var ctx1 = pL1.getContext("2d");
 var ctx2 = pL2.getContext("2d");
//-------------------------------
 ctx.fillStyle = "#FFFFFF";
 ctx.fillRect(0,0,canvas1.width,canvas1.height);
 cty.fillStyle = "#FFFFFF";
 cty.fillRect(0,0,canvas2.width,canvas2.height);  
//-----------------------------
 ctx1.beginPath( ),
 ctx1.fillStyle = "#000000";
 ctx1.fillRect(0,0,pL1.width,pL1.height);
 ctx1.stroke();
 ctx2.beginPath( ),
 ctx2.fillStyle = "#000000";
 ctx2.fillRect(0,0,pL2.width,pL2.height);  
 ctx2.stroke();
  //----------------------------------
  DrawAxis(ctx1,yMax1);
  DrawAxis(ctx2,yMax2); 
}
