//Global variables

const PowerPlants = [CoalPPT, GasPPT, NuclPPT, WindPPT, SolarPPT, HydroPPT, StoragePPT]; 
var TooFew =[0,1,5,6];
var TooMuch = [0,1,5,6];
var NameHu = ["Szén","Gáz","Atom","Szél","Nap","Víz","Tározós","Fogyasztás","Termelés"]; 
var NameEn = ["Coal","Gas","Nuclear","Wind","Solar","Hydro","Storage","Consumption","Production"];
var SRunning = false;
var Nyar = true;
var Nap = true;
var DateCode;
var SunData =[];
var Electrdata =[];
var ActualDate;
var DaysOfWeekHu =["Hétfő","Kedd","Szerda","Csütörtök","Péntek","Szombat","Vasárnap"];
var DaysOfWeekEn =["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
var DayofWeek;
var Graph = [6,1,4,3,5,0,2];
var ActGraph =[];  //actual graph 
var GraphSet =[true, true, true, true, true, true, true];
var Auto1 =true;
var Auto2 = true;
var yMax1 = 10000;
var yMax2 = 10000;
var Graph2Set =[true,true,true];
var GraphMaxY;
var SRunning =false;
var x00 = 50; //Plot origo
var y00 = 250;
var stime =0;  //Number of the hours: 0 .. 23
var scy1 =0.01;   //The scale of the vertical axis for plot1
var scy2 = 0.01;   //Ths scale for the vertical axis for plot2
var totalProduction =[];  //Array for the totalProduction for every hour [0..23]
var actualReserve =[];    //Array for the total reserve for every hour [0..23]
var DPower = 0.01; //This is the DeltaPower (the step for changing the power - obsolate)
var AvDemand = 6500; //This is the average overall demand
var Production =[];  // Initiate and clear the Production[i,j] array
   for (var i=0; i<15; i++) {
      Production[i] =[];
      for (var j=0; j<23; j++) {
        Production[i][j] = 0;
    }
}
var Statist =[];               //Initiate and clear the Statist[i] array
  for (var i = 0; i<15; i++) {
     Statist[i] = 0;
  }
