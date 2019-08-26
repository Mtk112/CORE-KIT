'use strict'
/* Function for drawing the hourly comparison chart between demand and electricity generation */
/* Variables */ 
var savedSolar, savedWind, bio;
var sunrise = parseInt(document.getElementById("sunrise").value);
var sunset = parseInt(document.getElementById("sunset").value); 
var sunlight = 0;
var totalUsage = [];
var hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];

function rememberTotal(total){
    totalUsage = total;
}

function initGrid(){
    var night = parseFloat(document.getElementById("totalNight").text);
    var day = parseFloat(document.getElementById("totalDay").text);
    var totalDem = parseFloat(document.getElementById("totalDemand").text);
    console.log(night);
    console.log(day);
    console.log(totalDem);
    var month = document.getElementById("month").value;
    savedSolar = getSolar();
    savedWind = getWind();
    bio = getBio();
    /* Converts wind generation from monthly to hourly */
    var hourlyWind = []; 
    for(var i = 1 ; i <= 24; i++){
        hourlyWind.push(savedWind[month] / 24);
    }
    /* Checks how many hours of sunlight there is in a day */
    for(var i = 1; i <= 24; i++){
        if(i >= sunrise && i < sunset){
            sunlight++;
        }
    }
    console.log(sunrise);
    console.log(sunset);
    console.log(sunlight);
    /* Converts monthly solar to hourly solar generation */
    var hourlySolar = [];
    for(var i = 1 ; i <= 24; i++){
        if(i >= sunrise && i < sunset){
            hourlySolar.push(savedSolar[month] / sunlight);
        }
        else{
            hourlySolar.push(0);
        }
    }
    console.log(hourlySolar);
    /* Converts biomass generation to hourly generation for 1 month (Assumes steady conversion throughout the day) */
    var hourlyBio = []; 
    for(var i = 1 ; i <= 24; i++){
        hourlyBio.push(bio[month] / 30 / 24);
    }
    /* Converts monthly micro-hydro to hourly generation */
    var hourlyHydro = []; 
    for(var i = 1 ; i <= 24; i++){
        hourlyHydro.push(100 / 24);
    }
    /* Calculates total hourly generation and total daily generation */
    var totalGeneration = [];
    var dailyGeneration = 0;
    for(var i = 0; i <= 23; i++){
        var hourlyGeneration = hourlyBio[i] + hourlyHydro[i] + hourlySolar[i] + hourlyWind[i];
        totalGeneration.push(hourlyGeneration);
        dailyGeneration = dailyGeneration + hourlyGeneration;
    }
    /* Calculates daily demand met % */
    var demandMet = dailyGeneration / totalDem * 100;
    /* Sets values to the information box */
    document.getElementById("dailyDem").innerHTML = totalDem;
    document.getElementById("dailyGen").innerHTML = dailyGeneration;
    document.getElementById("dailyMet").innerHTML = demandMet;
    document.getElementById("dtDem").innerHTML = day;
    document.getElementById("ntDem").innerHTML = night;

    /* Creating traces based on the arrays created earlier */
    var demand = {
        type : "scatter",
        mode : "lines",
        name : "Demand",
        x: hours,
        y: totalUsage,
        //stackgroup: 'one',
        line: {color: '#2eb2ff'}
    }

    var wind = {
        type : "scatter",
        mode : "lines",
        name : "Wind",
        x: hours,
        y: hourlyWind,
        stackgroup: 'one',
        line: {color: '#f8c972'}
    }

    var solar = {
        type : "scatter",
        mode : "lines",
        name : "Solar",
        x: hours,
        y: hourlySolar,
        stackgroup: 'one',
        line: {color: '#e05a47'}
    }

    var biomass = {
        type : "scatter",
        mode : "lines",
        name : "Biomass",
        x: hours,
        y: hourlyBio,
        stackgroup: 'one',
        line: {color: '#ff7f50'}
    }

    var hydro = {
        type : "scatter",
        mode : "lines",
        name : "Micro-Hydro",
        x: hours,
        y: hourlyHydro,
        stackgroup: 'one',
        line: {color: '#ffd700'}
    }

    var total = {
        type : "scatter",
        mode : "lines",
        name : "Total generation",
        x: hours,
        y: totalGeneration,
        line: {color: '#228b22'}
    }

    var graphData = [demand, solar, wind, hydro, biomass, total];

    var layout = {
        width: 480,
        height: 480,
        margin: {
            l: 25,
            r: 5,
            b: 75,
            t: 25,
            pad: 2
        },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        title: 'Electricity demand and generation by hour',
        xaxis: {
          range: Math.max(hours),
          type: 'linear',
          autorange: true,
          title: "hour"
        },
        yaxis: {
          autorange: true,
          range: Math.max(wind[month] + solar[month] + biomass[month] + hydro[month] + 5),
          type: 'linear',
          title: "kWh"
        },
        legend: {
            orientation: 'h',
                  traceorder: 'reversed',
            x: -0.1,
            y: -0.1
          },
      };

      Plotly.newPlot('grid', graphData, layout, {displayModeBar: false});

    
}

