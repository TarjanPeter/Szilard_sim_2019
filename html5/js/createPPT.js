//Construction of PowerPlants

class PowerPlant{

constructor(    
id,
NoOfUnits,
maxNumber,
max_power,
min_power,
flexibility,
Deltaflex,
investment_cost,
running_cost,
co2_prod,
max_reserve,
actual_power,
previous_power,
actual_co2,
actual_income,
actual_capacity,
previous_capacity,
automata,              
name,
url,
urlen,
namehu,
pcolor
) 
{
this.id = id;
this.NoOfUnits = NoOfUnits;
this.maxNumber = maxNumber;
this.max_power = max_power;
this.min_power = min_power;
this.flexibility = flexibility;
this.Deltaflex = Deltaflex;
this.investment_cost = investment_cost;
this.running_cost = running_cost;
this.co2_prod = co2_prod;
this.max_reserve = max_reserve;
this.actual_power = actual_power;
this.previous_power = previous_power;
this.actual_co2 = actual_co2;
this.actual_income = actual_income;
this.actual_capacity = actual_capacity;
this.previous_capacity = previous_capacity;
this.automata = automata;  //automata capability 
this.name = name;
this.url = url;
this.urlen = urlen;
this.namehu = namehu;
this.pcolor = pcolor;
// Initialize actauto
this.actauto =false;
if(this.automata==true) 
   {this.actauto = true;} 
this.product =[];  //array containing the productions during 24 hours
this.CO2 = 0; 

for (let i=0; i<24; i++) {   //Clear the productions during 24 hours
    this.product[i] =0;   
  }  

this.changePower = function(demand) {  //'demand' is the difference between the actual overall production and the overall demand
                                       //'demand' can be positive or negativ =>  increase or decrease the production
                                       //changePower's goal is to set 'demand' to zero. 
 var result;
 var x;
 var y;
 var mx = this.NoOfUnits*this.max_power; //The maximum power of this type of Powerplant
 var mi = this.NoOfUnits*this.min_power; //The minimum power of this type of PowerPlant 
 var cmx = (this.actual_capacity - this.NoOfUnits*this.max_reserve)/0.9; //This much can be still filled in (if storage)
 var cx = 0.9*Number(this.actual_capacity); //This much can be increased because of the reserve (if storage)
 var flexmax = this.NoOfUnits*(this.actual_power+Number(this.flexibility)); //The flexibility lets to increase this much
 var flexmin = this.NoOfUnits*(Number(this.flexibility-this.actual_power)); //The flexibility lets to decrease this much
 if(flexmin>mi) {flexmin = mi;}
 result = demand;
 if(demand ==0) {return 0};  //No change is needed 
 if(this.actauto == false) {return result;}  //If the PP is not automatic
 if(this.NoOfUnits  == 0) { return result;}  //If there are no units
 if(this.flexibility == 0) {return result;}  //If it is not flexible
 
 x = Number(this.actual_power) + Number(demand);  //This much would be after a change (up or down)
 result = 0;  //If this amount of change was made, there would remain nothing from the demand     
 if(demand>0){   // If the power must be increased
 y = Math.min(mx,flexmax,cx);     //This shows how much the power can be increased
  if(x>=y) {  //if only smaller change is allowed
    this.actual_power = y; //Change the actual power as much as allowed
    result = x -y;   //This much remains form the previous 'demand'
    this.P_Update();  
    return result;   
   } else {                    //otherwise the total change can be done
    this.actual_power = x;
    this.P_Update();
    return result;
   }
  }                          //End if demand >0

 if(demand<0){              // If the power should be decreased
 y = Math.max(mi,flexmin, cmx); //This shows how much the power can be decreased
   if(x<y) {                    //if only smaller change is allowed
    this.actual_power = y;      //Change the actual power as much as allowed
    result = x - y;             //This much remains form the previous 'demand'
    this.P_Update();
    return result;
   } else {                     //otherwise the total change can be done
    this.actual_power = x;
    this.P_Update();
    return result;
   }
  }                        //End if demand <0
 }                         //End function changePower

this.P_Update  = function(){
 var stable = this.name;   
 document.getElementById(stable+"actpower").value =dec2(this.actual_power);   
}   //End function P_Update
}   //End constructor
}   //End class PowerPlant

// ======================These are the definition of the Powerplants =====================================================

const CoalPPT = new PowerPlant (
0,
0,
10,
0.6,
0.3,
0.3,
0.1,
0.6,
1.2,
0.9,
10000,
0,
0,
0,
0,
0,
0,
true,
"Coal",
"images/CoalPP.bmp",
"images/CoalPP.jpg",
"Szén",
"gray"
);



const GasPPT = new PowerPlant (
1,
0,
10,
0.5,
0,
0.5,
0.5,
0.3,
2.2,
0.5,
10000,
0,
0,
0,
0,
0,
0,
true,
"Gas",
"images/GasPP.bmp",
"images/GasPP.jpg",
"Gáz",
"fuchsia"
);

const NuclPPT = new PowerPlant (
2,
0,
4,
1,
1,
0,
0,
1.6,
0.25,
0.01,
10000,
0,
0,
0,
0,
0,
0,
false,
"Nuclear",
"images/NuclPP.bmp",
"images/NuclPP.jpg",
"Atom",
"red"
);

const WindPPT = new PowerPlant (
3,
0,
15,
0.3,
0,
0,
0,
1.0,
0.0,
0.01,
10000,
0,
0,
0,
0,
0,
0,
false,
"Wind",
"images/WindPP.bmp",
"images/WindPP.jpg",
"Szél",
"aqua"
);

const SolarPPT = new PowerPlant (
4,
0,
20,
0.2,
0,
0,
0,
0.6,
0.0,
0.04,
10000,
0,
0,
0,
0,
0,
0,
false,
"Solar",
"images/SolarPP.bmp",
"images/SolarPP.jpg",
"Nap",
"yellow"
);

const HydroPPT = new PowerPlant (
5,
0,
3,
0.6,
0.2,
0.6,
0.6,
1.3,
0.0,
0.02,
10000,
0,
0,
0,
0,
0,
0,
true,
"Hydro",
"images/HydroPP.bmp",
"images/HydroPP.jpg",
"Víz",
"blue"
);

const StoragePPT = new PowerPlant (
6,
0,
4,
0.5,
-0.5,
1,
1,
1.3,
0.0,
0.02,
6,
0,
0,
0,
0,
0,
0,
true,
"Storage",
"images/StoragePP.bmp",
"images/StoragePP.jpg",
"Tárolós",
"#80FF80"
);
