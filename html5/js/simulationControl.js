//================ This is the control of the simulation ================== 

setInterval(myTimer, 100);    //Start the timer

function myTimer() {          //If SRunning is not set, nothing happens... 
 if(SRunning==true) {   
    StepSim();                //Simulaton step
    UpdateAll();              //Update everything after the simulaton. 
 } 
}
// ========================   This is one step of the simulation ================
function StepSim() {
   if (stime < 24) { 
   document.getElementById("ido").value = stime +" h";  //Display the actual time
   cycleStep();

   for (let i=0; i<PowerPlants.length; i++) {    //Loop for the powerplants
    PPlant =PowerPlants[i];
    if(stime ==0) {                             //The very first step must be handled differently (set the "previous" variables)
        PPlant.previous_power = PPlant.actual_power;
        PPlant.previous_capacity = PPlant.actual_capacity
    }
    PPlant.product[stime]= PPlant.actual_power;
    totalProduction[stime] = Number(totalProduction[stime]) + Number(PPlant.actual_power); //Add up the totalProduction fro this hour
    if(PPlant.name == "Storage") {                        //Handling the storage plant
    actualReserve[stime] = Number(PPlant.actual_capacity);
    }
   }
   DrawPPlants();                          //Do the drawings.. 
   DrawProduct(); 
   stime = Number(stime) + 1;              //Step the time 
   if(Nap == true) {return;}               //Dont go forward a day simultion is selected
   } 
//======   Only one step (one hour) simulation selected =====================
    SRunning = false;                       //Stop the simulation  
    if(stime>=24) {                         //If it is not the end of the day...
    StpSim();                               //...perform one simulation step
    document.getElementById("stopBtn").disabled = true;   //update the "Stop" button
    document.getElementById("stopBtn").innerHTML = "Stop";
   } else {
    document.getElementById("stopBtn").disabled = false;
    if (Lang =="Hu") {
    document.getElementById("stopBtn").innerHTML = captionshu[6];}
    else {
    document.getElementById("stopBtn").innerHTML = captionsen[6];
    }
   }   
}
//========================  Preparing procedures for simulation =========================

function ClearAll(){
var PPlant; 
var x;   
  for (let i=0; i<PowerPlants.length; i++) {       //Loop along the powerplants
    PPlant = PowerPlants[i];
    x = PPlant.min_power*PPlant.NoOfUnits;
    if(x ==0) {
       x = Number(PPlant.max_power*PPlant.NoOfUnits)/2; 
    }
    for (let j=0; j<25; j++) {     //Ckear the hourly production array
        PPlant.product[j] = 0;
    }
    PPlant.CO2 = 0;
    if (PPlant.actauto == true) {
      PPlant.actual_power = x;
    }
    if (i==6) {                   //This is the "Storage" plant
        PPlant.actual_capacity = PPlant.NoOfUnits * PPlant.max_reserve/2;   
    if (PPlant.actauto == true) {
        PPlant.actual_power =0;
        } 
    }
  } 
 for (var i=0; i<15; i++) {       //Ckear the array of the overall statistics and Production
    Statist[i] = 0;
    for (var j=0; j<23; j++) {
        Production[i][j] = 0;
    }
  }
    
 stime = 0;  // Set the time to the beginning   
 Production[10][stime] = 1000*Termeles();  //Initiate the production

 for (let i=0; i<24; i++) {
   totalProduction[i] =0;  //Ckear the totalProduction and the actuaReserve arrays
   actualReserve[i] =0; 
 }   
 document.getElementById("ido").value = stime +" h";    //Display the time
 GetGraphSelect();
}
// ****************   Simulation start **************************
function SelectDate() {
 var x = document.getElementById("LastBtn");
  if(x.checked == true) DateCode = Math.floor(Math.random() * 310);
  SDate();
}
//*******************************************************  
function SDate() {
var s;
  rnd = DateCode/1000000;   //This is the random seed 
  if(Nyar == true) {        //If it is summer...  
  SunData = sun_august[DateCode].split(',');
  Electrdata = mavir_august[DateCode].split(','); 
  } else {
   SunData = sun_january[DateCode].split(',');
   Electrdata = mavir_january[DateCode].split(','); 
  }
  s = SunData[25];                                               //The string of the actual date
  ActualDate = s.substr(0,4)+'-'+s.substr(4,2)+'-'+s.substr(6);
  if (Lang == "Hu") 
  {DayOfWeek =DaysOfWeekHu[SunData[24]-1];}
  else {
   DayOfWeek =DaysOfWeekEn[SunData[24]-1]; 
  }
  document.getElementById("adate").innerHTML = ActualDate+"     ("+DayOfWeek+")"; //Display the actual date
}
// *********  Select between "1 day'  and "1 hour" **************
function SetNap(v) {
  if(v==1){
    Nap = true;      // "1 day" is selected
  }
  else {
    Nap = false;
  };  
}
// *********  Select between "August" (summer) and "January" (winter) **************
function SetNyar(v) {
  if(v==1){
    Nyar = true;       //"August" (summer) is selected
  }
  else {
    Nyar = false;
  };  
}

//    ==================   Simulation control buttons ======================
function LastSim(){      //Start simulation without selecting new date  (with the "Last" date)
var stpBtn;
 stpBtn = document.getElementById("stopBtn");
 stpBtn.innerHTML = "Stop"; 
 stpBtn.disabled = true;
 ClearAll(); 
 ContSim();
}
// ==================================================
function StartSim() {  //Start simulation with selecting new date
var stpBtn;
 stpBtn = document.getElementById("stopBtn");
 stpBtn.innerHTML = "Stop"; 
 stpBtn.disabled = true;
 ClearAll(); 
 SelectDate();
 ContSim();
}
// =================================================
function ContSim() {   //Continue the simulation
  SRunning = true;
  document.getElementById("startBtn").disabled = true;
  document.getElementById("contBtn").disabled = true;
  document.getElementById("stopBtn").disabled = false;
  if(Lang =="Hu"){
     document.getElementById("szimul").value = "Szimuláció fut!";
    } else {
      document.getElementById("szimul").value = "Simulation running!";   
    }
}
// ============ Stop simulation, no possibility of continue =================
function StpSim(){       
  SRunning = false;
  stime =Number(stime-1);
  document.getElementById("startBtn").disabled = false;
  if(Lang =="Hu"){
    document.getElementById("szimul").value = captionshu[8];
   } else {
     document.getElementById("szimul").value = captionsen[8];    //"Simulation stopped"
   }    
}

// ============ Stop simulation w possibility of continue ===================
function StopSim() {
var stpBtn;
var stpTxt;
if (Lang =="Hu") {
    stpTxt = captionshu[6];     
} else {
    stpTxt = captionsen[6];    // "Continue" 
}
stpBtn = document.getElementById("stopBtn");
if (stpBtn.innerHTML != "Stop") {
  stpBtn.innerHTML = "Stop"; 
  ContSim();
} else {
  stpBtn.innerHTML = stpTxt; 
  StpSim();
  } 
}
