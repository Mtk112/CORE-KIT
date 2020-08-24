'use strict'

/* Sankey chart stuff */
// Variables
var hydro = 100
var bio; 
var savedSolarA, savedWindA, savedSolarB, savedWindB, savedSolarC, savedWindC, savedSolarD, savedWindD; 
var value1 = [];



var hydro2 = hydro / 2;
var bat = 0;

function initGrid(){
  var night = parseFloat(document.getElementById("totalNight").text);
  var day = parseFloat(document.getElementById("totalDay").text);
  document.getElementById("dtDem").innerHTML = day;
  document.getElementById("ntDem").innerHTML = night;
  var month = document.getElementById("month").value;
  savedSolarA = getSolarABCD('A');
  savedSolarB = getSolarABCD('B');
  savedSolarC = getSolarABCD('C');
  savedSolarD = getSolarABCD('D');
  savedWindA = getWindABCD('A');
  savedWindB = getWindABCD('B');
  savedWindC = getWindABCD('C');
  savedWindD = getWindABCD('D');
  bio = getBio();

  
  
  var wind2 = savedWind[month] / 2;
  /* Biomass used for 1 month */
  var bio2 = bio[month] / 30;
  console.log("Solar: " + savedSolar[month] + " vs Day: " + day);

  /* Generation if daytime demand cannot be met without night battery */
  if(savedSolar[month] + hydro2 + wind2 + bio2 < day){
    console.log("Generation if daytime demand cannot be met without night battery");
    document.getElementById("dtGen").innerHTML = dayGeneration;
    document.getElementById("ntGen").innerHTML = nightGeneration;
    /* Checks if hydro is enough for night */
    if(hydro2 >= night){
      var hydroBat = hydro2 - night;
      var hydroNight = hydro2 - hydroBat;
      document.getElementById("ntMet").innerHTML = "100";
      /* Checks if daytime demand can be met with leftover hydro */
      if(savedSolar[month] + hydro2 + wind2 + bio2 + hydroBat >= day){
        var leftover = savedSolar[month] + hydro2 + wind2 + bio2 + hydroBat - day;
        var batToDay = hydroBat - leftover;
        value1 = [hydro2,hydroNight,hydroBat,wind2,0,wind2,savedSolar[month],0,0,bio2,0,0,batToDay,0];
        document.getElementById("dtMet").innerHTML = "100";
      }
      /* Checks if daytime demand can be met with leftover wind and hydro */
      else if(savedSolar[month] + hydro2 + wind2 + bio2 + wind2 + hydroBat >= day){
        var leftover = savedSolar[month] + hydro2 + wind2 + bio2+ hydroBat + wind2 - day;
        var batToDay = hydroBat + wind2 - leftover;
        value1 = [hydro2,hydroNight,hydroBat,wind2,0,wind2,savedSolar[month],0,0,bio2,0,0,batToDay,0];
        document.getElementById("dtMet").innerHTML = "100";
      } 
    }
    /* Checks if hydro and wind is enough for night */
    else if(hydro2 + wind2 >= night){
      var windBat = hydro2 + wind2 - night;
      var windNight = wind2 - windBat;
      document.getElementById("ntMet").innerHTML = "100";
      /* Checks if daytime demand can be met with leftover wind*/
      if(savedSolar[month] + hydro2 + wind2 + bio2 + windBat >= day){
        var leftover = savedSolar[month] + hydro2 + wind2 + bio2 + windBat - day;
        var batToDay = windBat - leftover;
        value1 = [hydro2,hydro2,0,wind2,windNight,windBat,savedSolar[month],0,0,bio2,0,0,batToDay,0];
        document.getElementById("dtMet").innerHTML = "100";
      }
    }
    else{
      value1 = [hydro2,hydro2,0,wind2,wind2,0,savedSolar[month],0,0,bio2,0,0,0,0];
    }
  }

  /* Generation if solar, hydro, wind and bio is enough for daytime */
  else if(savedSolar[month] + hydro2 + wind2 + bio2 >= day){
    console.log("Generation if solar, hydro, wind and bio is enough for daytime");
    var bioDay = savedSolar[month] + hydro2 + wind2 + bio2 - day;
    var bioBat = bio - bioDay;
    document.getElementById("dtGen").innerHTML = dayGeneration;
    document.getElementById("ntGen").innerHTML = nightGeneration;
    document.getElementById("dtMet").innerHTML = "100";
    /* Checks if leftover bio is enough to fullfill night */
    if(bioBat >= night){
      var bioNightBat = bioBat - night;
      value1 = [hydro2,0,hydro2,wind2,0,wind2,savedSolar[month],0,0,bioDay,0,bioBat,0,bioNightBat]; 
    }
    /* Checks if hydro and leftover bio is enough */
    else if(bioBat + hydro2 >= night){
      var hydroBat = bioBat + hydro2 - night;
      var hydroNight = hydro2 - hydroBatNight;
      value1 = [hydro2,hydroNight,hydroBat,wind2,0,wind2,savedSolar[month],0,0,bioDay,0,bioBat,0,bioBat];
      document.getElementById("ntMet").innerHTML = "100";
    }
    /* Checks if hydro, wind and leftover bio is enough */
    else if(bioBat + hydro2 + wind2 >= night){
      var windBat = bioBat + hydro2 + wind2 - night;
      var windNight = wind2 - windBatNight;
      value1 = [hydro2,hydro2,0,wind2,windNight,windBat,savedSolar[month],0,0,bioDay,0,bioBat,0,bioBat];
      document.getElementById("ntMet").innerHTML = "100";
    }
    /* Checks if hydro, wind and leftover bio is enough */
    else{
      value1 = [hydro2,hydro2,0,windDay,wind2,windDayBat,savedSolar[month],0,0,bioDay,0,bioBat,0,bioBat];
    }
  }

  /* Generation if solar, hydro and wind is enough for daytime */
  else if(savedSolar[month] + hydro2 + wind2 >= day){
    console.log("Generation if solar, hydro and wind is enough for daytime");
    var windDay = wind2 + savedSolar[month] + hydro2 - day;
    var windDayBat = wind2 - windDay;
    document.getElementById("dtGen").innerHTML = dayGeneration;
    document.getElementById("ntGen").innerHTML = nightGeneration;
    document.getElementById("dtMet").innerHTML = "100";
    /* Checks if leftover wind(from day) is enough to fullfill night */
    if(windDayBat >= night){
      var windBat = (windDayBat - night) + wind2;
      value1 = [hydro2,0,hydro2,windDay,0,windBat,savedSolar[month],0,0,0,0,bio2,0,windDayBat];
      document.getElementById("ntMet").innerHTML = "100";
    }
    /* Checks if leftover wind(from day) and hydro is enough */
    else if(windDayBat + hydro2 >= night){
      var hydroBatNight = windDayBat + hydro2 - night;
      var hydroNight = hydro2 - hydroBatNight;
      var windBat = windDayBat + wind2;
      value1 = [hydro2,hydroNight,hydroBat,windDay,0,windBat,savedSolar[month],0,0,0,0,bio2,0,windDayBat];
      document.getElementById("ntMet").innerHTML = "100";
    }
    /* Checks if leftover wind(from day) ,hydro and wind is enough */
    else if(windDayBat + hydro2 + wind2 >= night){
      var windBatNight = windDayBat + hydro2 + wind2 - night;
      var windNight = wind2 - windBatNight;
      var windBat = windBatNight + windDayBat;
      value1 = [hydro2,hydro2,0,windDay,windNight,windBat,savedSolar[month],0,0,0,0,bio2,0,windDayBat];
      document.getElementById("ntMet").innerHTML = "100";
    }
    /* Checks if leftover wind (from day), hydro, wind and bio is enough */
    else if(windDayBat + hydro2 + wind2 + bio2 >= night){
      var bioNight = windDayBat + hydro2 + wind2 + bio2 - night;
      var batToNight = (bio2 - bioNight) + windDayBat; 
      value1 = [hydro2,hydro2,0,windDay,wind2,windDayBat,savedSolar[month],0,0,0,0,bio2,0,batToNight];
      // alternatively if we assume bio is only used when needed and can be converted during night time
      // var bioBat = bio - bioNight;
      // value1 = [hydro2,hydro2,0,windDay,wind2,windDayBat,savedSolar[month],0,0,0,bioNight,bioBat,0,hydroDayBat];
      document.getElementById("ntMet").innerHTML = "100";
    }
    else{
      var batToNight = windDayBat + bio2;
      value1 = [hydro2,hydro2,0,windDay,wind2,windDayBat,savedSolar[month],0,0,0,0,bio2,0,batToNight];
    }
  }

   /* Generation if solar and hydro is enough for daytime */
   else if(savedSolar[month] + hydro2 >= day){
    console.log("Generation if solar and hydro is enough for daytime");
    var hydroDay = day - savedSolar[month];
    var hydroDayBat = hydro - hydroDay;
    document.getElementById("dtGen").innerHTML = dayGeneration;
    document.getElementById("ntGen").innerHTML = nightGeneration;
    document.getElementById("dtMet").innerHTML = "100";
    /* Checks if leftover hydro(from day) is enough to fullfill night */
    if(hydroDayBat >= night){
      var hydroBat = (hydroDayBat - night) + hydro2;
      value1 = [hydroDay,0,hydroBat,0,0,savedWind[month],savedSolar[month],0,0,0,0,bio2,0,hydroDayBat];
      document.getElementById("ntMet").innerHTML = "100"; 
    }
    /* Checks if leftover hydro(from day) and hydro is enough */
    else if(hydroDayBat + hydro2 >= night){
      var hydroBatNight = hydroDayBat + hydro2 - night;
      var hydroNight = hydro2 - hydroBatNight;
      var hydroBat = hydroBatNight + hydroDayBat;
      value1 = [hydroDay,hydroNight,hydroBat,0,0,savedWind[month],savedSolar[month],0,0,0,0,bio2,0,hydroDayBat];
      document.getElementById("ntMet").innerHTML = "100";
    }
    /* Checks if leftover hydro(from day) ,hydro and wind is enough */
    else if(hydroDayBat + hydro2 + wind2 >= night){
      var windBatNight = hydroDayBat + hydro2 + wind2 - night;
      var windNight = wind2 - windBatNight;
      var windBat = windBatNight + wind2;
      value1 = [hydroDay,hydro2,hydroDayBat,0,windNight,windBat,savedSolar[month],0,0,0,0,bio2,0,hydroDayBat];
      document.getElementById("ntMet").innerHTML = "100";
    }
    /* Checks if leftover hydro (from day), hydro, wind and bio is enough */
    else if(hydroDayBat + hydro2 + wind2 + bio2 >= night){
      var bioNight = hydroDayBat + hydro2 + wind2 + bio2 - night;
      var batToNight = (bio2 - bioNight) + hydroDayBat; 
      value1 = [hydroDay,hydro2,hydroDayBat,0,wind2,wind2,savedSolar[month],0,0,0,0,bio2,0,batToNight];
      // alternatively if we assume bio is only used when needed and can be converted during night time
      // var bioBat = bio - bioNight;
      // value1 = [hydroDay,hydro2,hydroDayBat,0,wind2,wind2,savedSolar[month],0,0,0,bioNight,bioBat,0,hydroDayBat];
      document.getElementById("ntMet").innerHTML = "100";
    }
    /* Checks if leftover hydro (from day), hydro, wind, bio and wind(from daytime) is enough */
    else if(hydroDayBat + hydro2 + savedWind[month] + bio2 >= night){
      var wdtn = hydroDayBat + hydro2 + savedWind[month] + bio2 - night;
      var batToNight = (wind2 - wdtn) + hydroDayBat;
      value1 = [hydroDay,hydro2,hydroDayBat,0,wind2,wind2,savedSolar[month],0,0,0,0,bio2,0,batToNight];
      document.getElementById("ntMet").innerHTML = "100";
    }
    else{
      var batToNight = wind2 + hydroDayBat + hydro2 + wind2;
      value1 = [hydroDay,hydro2,hydroDayBat,0,wind2,wind2,savedSolar[month],0,0,0,0,bio2,0,batToNight];
    }
  }

  /* Generation if solar alone is enough for daytime */
  if(savedSolar[month]>= day){
    console.log("Generation if solar alone is enough for daytime");
    var solarBat = savedSolar[month] - day;
    var solarDay = day;
    var dayGeneration = savedSolar[month] + hydro2 + wind2 + bio2;
    var nightGeneration = hydro2 + wind2;
    document.getElementById("dtGen").innerHTML = dayGeneration;
    document.getElementById("ntGen").innerHTML = nightGeneration;
    document.getElementById("dtMet").innerHTML = "100";

    /* Checks if leftover solar is enough to fullfill night */
    if(solarBat >= night){
      var solarBatNight = solarBat - night;
      value1 = [0,0,hydro,0,0,savedWind[month],solarDay,0,solarBat,0,0,bio2,0,solarBatNight];
      document.getElementById("ntMet").innerHTML = "100";
    }
    /* Checks if leftover solar and hydro is enough */
    if(solarBat + hydro2 >= night){
      var hydroBatNight = solarBat + hydro2 - night;
      var hydroNight = hydro2 - hydroBatNight;
      var hydroBat = hydroBatNight + hydro2;
      value1 = [0,hydroNight,hydroBat,0,0,savedWind[month],solarDay,0,solarBat,0,0,bio2,0,solarBat];
      document.getElementById("ntMet").innerHTML = "100";
    }
    /* Checks if leftover solar,hydro and wind is enough */
    if(solarBat + hydro2 + wind2 >= night){
      var windBatNight = solarBat + hydro2 + wind2 - night;
      var windNight = wind2 - windBatNight;
      var windBat = windBatNight + wind2;
      value1 = [0,hydro2,hydro2,0,windNight,windBat,solarDay,0,solarBat,0,0,bio2,0,solarBat];
      document.getElementById("ntMet").innerHTML = "100";
    }
    /* Checks if leftover solar,hydro,wind and bio is enough */
    if(solarBat + hydro2 + wind2 + bio2 >= night){
      var bioNight = solarBat + hydro2 + wind2 + bio2 - night;
      var batToNight = (bio2 - bioNight) + solarBat; 
      value1 = [0,hydro2,hydro2,0,wind2,wind2,solarDay,0,solarBat,0,0,bio2,0,batToNight];
      // alternatively if we assume bio is only used when needed and can be converted during night time
      // var bioBat = bio2 - bioNight;
      // value1 = [0,hydro2,hydro2,0,wind2,wind2,solarDay,0,solarBat,0,bioNight,bioBat,0,solarBat];
      document.getElementById("ntMet").innerHTML = "100";
    }
    /* Checks if leftover solar, hydro, wind, bio and leftover hydro(from daytime) is enough */
    if(solarBat + hydro + wind2 + bio2 >= night){
      // hdtn = amount of hydro leftover from daytime needed to fill night time requirements
      var hdtn = solarBat + hydro + wind2 + bio2 - night;
      var batToNight = (hydro2 - hdtn) + solarBat;
      value1 = [0,hydro2,hydro2,0,wind2,wind2,solarDay,0,solarBat,0,0,bio2,0,batToNight];
      document.getElementById("ntMet").innerHTML = "100";
    }
    /* Checks if leftover solar, hydro, wind, bio, hydro(from daytime) and wind(from daytime) is enough */
    if(solarBat + hydro + savedWind[month] + bio2 >= night){
      var wdtn = solarBat + hydro + savedWind[month] + bio2 - night;
      var batToNight = (wind2 - wdtn) + solarBat + hydro2;
      value1 = [0,hydro2,hydro2,0,wind2,wind2,solarDay,0,solarBat,0,0,bio2,0,batToNight];
      document.getElementById("ntMet").innerHTML = "100";
    }
    else{
      var batToNight = wind2 + solarBat + hydro2 + wind2;
      value1 = [0,hydro2,hydro2,0,wind2,wind2,solarDay,0,solarBat,0,0,bio2,0,batToNight];
    }
  }

    var data = {
        type: "sankey",
        orientation: "h",
        valuesuffix:" kWh",
        node: {
          pad: 15,
          thickness: 30,
          line: {
            color: "black",
            width: 0.5,
          },
         label: ["Micro-Hydro", "Wind", "Solar", "Biomass", "Battery", "Day time generation", "Night time generation"],
         color: ["blue", "blue", "blue", "blue","red","green", "green"]
            },
      
        link: {
          source: [0,0,0,1,1,1,2,2,2,3,3,3,4,4],
          target: [5,6,4,5,6,4,5,6,4,5,6,4,5,6],
          value: value1,
          color: "lightblue"
        }
      }
      
      var data = [data]
      
      var layout = {
        title: "Generation sankey chart",
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        font: {
          size: 10
        }
      }
      
      Plotly.newPlot('grid', data, layout, {displayModeBar: false})

}
