

function IncreaseTerm(demand) {    //This will be called when the overall production should be increased
var PPlant;
var result = 0;
result = demand;
for (var i=0; i<4; i++) {             
   PPlant = PowerPlants[TooFew[i]];    //Array TooFew contains the order of the priorites for increasing the power
   if (PPlant.NoOfUnits > 0) {  
   result = PPlant.changePower(demand);  //Try to increase the power with the selected powerplant    
   if (Math.abs(result)<0.001) {         //exit if successful 
     return true;
   } else {demand = result;}            //if not successful, set the remaining demand for the next in the priority list
  }  
 } // End for   
 return false;                         //If demand still remained then signal the failure
}

function DecreaseTerm(demand) {         //This will be called when the overall production should be decreased
var PPlant;
var result = 0;
result = demand;
for (var i=0; i<4; i++) {
   PPlant = PowerPlants[TooMuch[i]];  //Array TooMuch contains the order of the priorites for decreasing the power
   if (PPlant.NoOfUnits > 0) {
   result = PPlant.changePower(demand);  //Try to decrease the power with the selected powerplant  
   if (Math.abs(result)<0.001) {         //exit if successful  
    return true;
    }  else {demand = result;}          //if not successful, set the remaining demand for the next in the priority list
  }   
 } // End for   
 return false;                         //If demand still remained then signal the failure
}



function cycleStep() {
var ic;
var term;
var fogy; 
var eps;
var PPlant;
var y;
var demand =0;
PowerPlants[6].actual_power = 0.0; // The Sotrage Plant starts with acutal_power = 0 at every step
term = Termeles();                   //Calculate the production with the actual paramteres
fogy = Electrdata[stime];            //Take the electricity demand from the datatable
Production[9][stime]= AvDemand*fogy;
// Now change the variable parameters
demand = Number(AvDemand*fogy)/1000 - Number(term);  
//The "demand" is actually the difference between the real demand (AvDemand*fogy) and the actual production (term) 
//The division by 1000 ocurs because the calculation is made in GW not in MW
//****** Now we try to change the production to fit the demand ********
if (demand != 0) {
if (demand>0) {                    
   IncreaseTerm(demand);   
  } else {
    DecreaseTerm(demand);
  }
}
// Now we get the production (term) again with the actual parameters 
term = Termeles();    
UpdateStorage();
UpdateStat(term); //Updating the statistical parameters
}

function UpdateStat(term) {    //Updating the statistical parameters
 var fogy = Electrdata[stime]; //Take the electricity demand from the datatable

 for(var ic=0; ic<7; ic++) {
    XPPTS =PowerPlants[ic]; 
    XPPTS.P_Update;  //update the screen. (In principle this occured already earlier... )
    Statist[ic] = Number(Statist[ic])+1000*Number(XPPTS.actual_power); //Sum of the total energy produced for every powerplant type
    Statist[7] = Number(Statist[7])+1000*Number(XPPTS.actual_power); //Sum of the total created energy
    Statist[10] = Number(Statist[10])+1000*Number(XPPTS.actual_power)*Number(XPPTS.co2_prod); //Sum of the CO2 production
    Statist[11] = Number(Statist[11])+Number(XPPTS.NoOfUnits)*1000*Number(XPPTS.max_power)*Number(XPPTS.investment_cost)*41.666666; //Sum of the investment cost / MWh (the data are given in M$/GWday units)
    Statist[13] = Number(Statist[13])+1000*Number(XPPTS.actual_power)*Number(XPPTS.running_cost)*41.666666;  //Sum of the running _cost / MWh  (the data are given in M$/GWday units)
  }  //end for cycle
  Statist[8] = Number(Statist[8])+Number(AvDemand*fogy);  //Sum of the total demand
  Statist[9] = Number(Statist[7])-Number(Statist[8]); //This is the difference between the sum of total produced energy and the sum of total demand
  Statist[12] = Number(Statist[12])+Math.abs(Number(AvDemand*fogy-1000*term)); //Sum of the absolute values of the differences (needed later for the deviation) 
}

function UpdateStorage() {
 var PPlant = PowerPlants[6];   //This is the storage plant
 var y = PPlant.actual_power;   //This is energy, since the power is already multiplied by the time (1 hour) 
   if(y>0) {
    y = y/0.9; //If we consume then the decrease is larger than what we gain
   }
   if(y<0) {
    y = 0.9*y; //If we fill it up, the increase of the energy content will be smaller than what was fed in. 
   }
  PPlant.actual_capacity = Number(PPlant.actual_capacity) - Number(y); //This is the change in the actual capacity (incrfease or decrease)
   if(PPlant.actual_capacity<0) {
        PPlant.actual_capacity = 0; //It cannot be smaller than 0
      }
   if(PPlant.actual_capacity>PPlant.NoOfUnits*PPlant.max_reserve) {
        PPlant.actual_capacity = PPlant.NoOfUnits*PPlant.max_reserve;  //It cannot be larger than the maximal value
      }                    
}  //End function UpdateStorage

//    -----------   Production ------------------------
function WindFactor() {
  var wind_min = 3.5;
  var wind_rated = 14;
  var wind_max = 25;
  var x;  
//Weibull distribution --------  
  var a = 5.88;
  var wind_speed;

   rnd = (DateCode)/1000000; //This assures that the random number generator's seed (and so the wind distribution) will be always the same for a give date! 
   for(var i=0; i<=stime;i++) {
      x = myRandom();
   }
   wind_speed = a*Math.sqrt(-Math.log(1-x)); 
// ----------------------   
  if((wind_speed > wind_max) || (wind_speed < wind_min)) {     //The wind speed should remain between the limits
    return 0;
  }
  if(wind_speed > wind_rated) {
    return 1;
  } else {
    x = Number((wind_speed - wind_min))/Number((wind_rated - wind_min));
    return x*x*x;
  }
}

function termelStorage() {       //Production of the storage plant
  var PPlant = PowerPlants[6];
  var x = 0;   
  var max_capacity = 0;  //maximum available capacity to production;
  var max_fill = 0;  //maximum available capacity to fill it up
  var pow = PPlant.actual_power;
  var cap = PPlant.actual_capacity;
  max_capacity = cap;  //  >0 
  max_fill = Number(cap) - PPlant.NoOfUnits*PPlant.max_reserve;  // <0
  x = pow;   //This is just the actual power (can be positive or negative) 
  if(x>cap) {x = cap};  //If we wanted to extract more energy than it contains 
  if (x<max_fill){x = max_fill};
  if (x>PPlant.NoOfUnits*PPlant.max_power) {x = PPlant.NoOfUnits*PPlant.max_power;}
  if (x<PPlant.NoOfUnits*PPlant.min_power) {x = PPlant.NoOfUnits*PPlant.min_power;}
  return x;
}


function Termeles() {   //This is the "Production". (Can be called several times in one hour, since there is no summation inside, and the wind is always the same)
    var x;
    var result = 0.0;  //this will collect the production of the different types of powerplants
    var PPlant;
    var XPPTS;
 for(var i=0; i<7; i++) {    //Loop for all types of powerplants
  PPlant = PowerPlants[i];
  if(PPlant.name=="Wind") {   //This is for WindPP 
     x = WindFactor();  
     PPlant.actual_power = Number(x*PPlant.max_power*PPlant.NoOfUnits);// production of all units of windpower plants
     PPlant.P_Update();
     result = Number(result) + Number(PPlant.actual_power); //Only add to the sum
     Production[i][stime] = 1000*PPlant.actual_power;  //This will be in MW, not in GW
    } 
   else if(PPlant.name=="Solar") {  //This is for Solar Powerplants
        x = SunData[stime];   
        PPlant.actual_power = Number(x*PPlant.max_power*PPlant.NoOfUnits); //production of all units of solar powerplants
        PPlant.P_Update();
        result = Number(result) + Number(PPlant.actual_power); //Add to the sum
        Production[i][stime] = 1000*PPlant.actual_power;  //This will be in MW not in GW 
    } else if(PPlant.name =="Storage") {//Storage powerplants
         x = termelStorage(); 
        PPlant.actual_power = Number(x);// This is the production of storage plants
        PPlant.P_Update();
        result = Number(result) + Number(PPlant.actual_power); //Add to the sum
        Production[i][stime] = 1000*PPlant.actual_power;  
   } 
   else { //For all others the production is already handled 
     result = Number(result) + Number(PPlant.actual_power); //Add to the sum
     Production[i][stime] = 1000*PPlant.actual_power;  //This will be in MW not in GW 
   }  
  }  //end for (i... ))
  if(result<0) {  //The total production cannot be negative!!
    result = 0;
  }           
  Production[10][stime] = 1000*result;  //This variable is also in MW, not in GW 
  return Number(result);
}
// ------------------   End Production --------------