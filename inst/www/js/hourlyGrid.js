'use strict'
/* Function for drawing the hourly comparison chart between demand and electricity generation */
/* Variables */ 
var savedSolar, savedWind, bio;
var sunrise = parseInt(document.getElementById("sunrise").value);
var sunset = parseInt(document.getElementById("sunset").value); 
var sunlight = 0;
var totalUsage = [];
var hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
var yearlyGenA = 0, yearlyGenB = 0, yearlyGenC = 0, yearlyGenD = 0;
var months = [1,2,3,5,6,7,8,9,10,11,12];

function rememberTotal(total){
    totalUsage = total;
}

function initGrid(){

    var totalDem = parseFloat(document.getElementById("totalDemand").text);
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
    /* Draws generation line for system option A,B,C and D daily (based on the month selected) and yearly */
    var optionA = [], optionB = [], optionC = [], optionD = [];
    var optionAmonthly = [0,0,0,0,0,0,0,0,0,0,0,0], optionBmonthly = [0,0,0,0,0,0,0,0,0,0,0,0], optionCmonthly = [0,0,0,0,0,0,0,0,0,0,0,0], optionDmonthly = [0,0,0,0,0,0,0,0,0,0,0,0];
    var tempValueA = 0, tempValueB = 0, tempValueC = 0, tempValueD = 0;
    for(var i = 0; i<=23;i++){
        if(document.getElementById("solarCheckA").checked == true){
            tempValueA = tempValueA + hourlySolar[i];
            for( var y = 0; y <= 11; y++){
                optionAmonthly[y] = optionAmonthly[y] + savedSolar[y];
            }
        }
        if(document.getElementById("solarCheckB").checked == true){
            tempValueB = tempValueB + hourlySolar[i];
            for( var y = 0; y <= 11; y++){
                optionBmonthly[y] = optionBmonthly[y] + savedSolar[y];
            }
        }
        if(document.getElementById("solarCheckC").checked == true){
            tempValueC = tempValueC + hourlySolar[i];
            for( var y = 0; y <= 11; y++){
                optionCmonthly[y] = optionCmonthly[y] + savedSolar[y];
            }
        }
        if(document.getElementById("solarCheckD").checked == true){
            tempValueD = tempValueD + hourlySolar[i];
            for( var y = 0; y <= 11; y++){
                optionDmonthly[y] = optionDmonthly[y] + savedSolar[y];
            }
        }
        if(document.getElementById("windCheckA").checked == true){
            tempValueA = tempValueA + hourlyWind[i];
            for( var y = 0; y <= 11; y++){
                optionAmonthly[y] = optionAmonthly[y] + savedWind[y];
            }
        }
        if(document.getElementById("windCheckB").checked == true){
            tempValueB = tempValueB + hourlyWind[i];
            for( var y = 0; y <= 11; y++){
                optionBmonthly[y] = optionBmonthly[y] + savedWind[y];
            }
        }
        if(document.getElementById("windCheckC").checked == true){
            tempValueC = tempValueC + hourlyWind[i];
            for( var y = 0; y <= 11; y++){
                optionCmonthly[y] = optionCmonthly[y] + savedWind[y];
            }
        }
        if(document.getElementById("windCheckD").checked == true){
            tempValueD = tempValueD + hourlyWind[i];
            for( var y = 0; y <= 11; y++){
                optionDmonthly[y] = optionDmonthly[y] + savedWind[y];
            }
        }
        if(document.getElementById("hydroCheckA").checked == true){
            tempValueA = tempValueA + hourlyHydro[i];
            for( var y = 0; y <= 11; y++){
                optionAmonthly[y] = optionAmonthly[y] + hydro * 30;
            }
        }
        if(document.getElementById("hydroCheckB").checked == true){
            tempValueB = tempValueB + hourlyHydro[i];
            for( var y = 0; y <= 11; y++){
                optionBmonthly[y] = optionBmonthly[y] + hydro * 30;
            }
        }
        if(document.getElementById("hydroCheckC").checked == true){
            tempValueC = tempValueC + hourlyHydro[i];
            for( var y = 0; y <= 11; y++){
                optionCmonthly[y] = optionCmonthly[y] + hydro * 30;
            }
        }
        if(document.getElementById("hydroCheckD").checked == true){
            tempValueD = tempValueD + hourlyHydro[i];
            for( var y = 0; y <= 11; y++){
                optionDmonthly[y] = optionDmonthly[y] + hydro * 30;
            }
        }
        if(document.getElementById("bioCheckA").checked == true){
            tempValueA = tempValueA + hourlyBio[i];
            for( var y = 0; y <= 11; y++){
                optionAmonthly[y] = optionAmonthly[y] + bio[y];
            }
        }
        if(document.getElementById("bioCheckB").checked == true){
            tempValueB = tempValueB + hourlyBio[i];
            for( var y = 0; y <= 11; y++){
                optionBmonthly[y] = optionBmonthly[y] + bio[y];
            }
        }
        if(document.getElementById("bioCheckC").checked == true){
            tempValueC = tempValueC + hourlyBio[i];
            for( var y = 0; y <= 11; y++){
                optionCmonthly[y] = optionCmonthly[y] + bio[y];
            }
        }
        if(document.getElementById("bioCheckD").checked == true){
            tempValueD = tempValueD + hourlyBio[i];
            for( var y = 0; y <= 11; y++){
                optionDmonthly[y] = optionDmonthly[y] + bio[y];
            }
        }
        optionA.push(tempValueA);
        optionB.push(tempValueB);
        optionC.push(tempValueC);
        optionD.push(tempValueD);
        tempValueA = 0, tempValueB = 0, tempValueC = 0, tempValueD = 0;
    }

    /* Calculates daily generation for each combination */
    var totalA = 0, totalB = 0, totalC = 0, totalD = 0;
    for(var i = 0; i <= 23; i++){
        totalA = totalA + optionA[i];
        totalB = totalB + optionB[i];
        totalC = totalC + optionC[i];
        totalD = totalD + optionD[i];
    }
    /*Sets daily generation and demand met for each combination. */
    var metA = totalA / totalDem * 100;
    var metB = totalB / totalDem * 100;
    var metC = totalC / totalDem * 100;
    var metD = totalD / totalDem * 100;
    document.getElementById("genA").innerHTML = totalA.toFixed(1);
    document.getElementById("metA").innerHTML = metA.toFixed(1);
    document.getElementById("genB").innerHTML = totalB.toFixed(1);
    document.getElementById("metB").innerHTML = metB.toFixed(1);
    document.getElementById("genC").innerHTML = totalC.toFixed(1);
    document.getElementById("metC").innerHTML = metC.toFixed(1);
    document.getElementById("genD").innerHTML = totalD.toFixed(1);
    document.getElementById("metD").innerHTML = metD.toFixed(1);

    /* Calculates total hourly generation and total daily generation */
    var totalGeneration = [];
    var dailyGeneration = 0;
    var totalDemand = 0;
    for(var i = 0; i <= 23; i++){
        var hourlyGeneration = hourlyBio[i] + hourlyHydro[i] + hourlySolar[i] + hourlyWind[i];
        totalDemand = totalDemand + totalUsage[i];
        totalGeneration.push(hourlyGeneration);
        dailyGeneration = dailyGeneration + hourlyGeneration;
    }

    var yearlyDemand = [];
    for(var i = 0; i <=29; i++){
        yearlyDemand.push(totalDemand[i]);
    }

    /* Creating daily traces based on the arrays created earlier */
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

    var combinationA = {
        type : "scatter",
        mode : "lines",
        name : "Combination A",
        x: hours,
        y: optionA,
        line: {color: 'black'}
    }

    var combinationB = {
        type : "scatter",
        mode : "lines",
        name : "Combination B",
        x: hours,
        y: optionB,
        line: {color: 'pink'}
    }

    var combinationC = {
        type : "scatter",
        mode : "lines",
        name : "Combination C",
        x: hours,
        y: optionC,
        line: {color: 'purple'}
    }

    var combinationD = {
        type : "scatter",
        mode : "lines",
        name : "Combination D",
        x: hours,
        y: optionD,
        line: {color: 'brown'}
    }

    //var graphData = [demand, solar, wind, hydro, biomass, total, combinationA, combinationB,combinationC,combinationD];
    var graphData = [demand, combinationA, combinationB, combinationC, combinationD];

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
        title: 'Daily energy yield',
        xaxis: {
          range: Math.max(hours),
          type: 'linear',
          autorange: true,
          title: "Hours of the day"
        },
        yaxis: {
          autorange: true,
          range: Math.max(wind[month] + solar[month] + biomass[month] + hydro[month] + 5),
          type: 'linear',
          title: "load (kW)"
        },
        legend: {
            orientation: 'h',
                  traceorder: 'reversed',
            x: -0.1,
            y: -0.1
          },
      };

      Plotly.newPlot('grid', graphData, layout, {displayModeBar: false});

    /* Creating yearly traces based on the arrays created earlier */
    var yearlyDemand = {
        type : "scatter",
        mode : "lines",
        name : "Demand",
        x: months,
        y: yearlyDemand,
        //stackgroup: 'one',
        line: {color: '#2eb2ff'}
    }

    var combinationAmonthly = {
        type : "scatter",
        mode : "lines",
        name : "Option A",
        x: months,
        y: optionAmonthly,
        line: {color: 'black'}
    }

    var combinationBmonthly = {
        type : "scatter",
        mode : "lines",
        name : "Option B",
        x: months,
        y: optionBmonthly,
        line: {color: 'pink'}
    }

    var combinationCmonthly = {
        type : "scatter",
        mode : "lines",
        name : "Option C",
        x: months,
        y: optionCmonthly,
        line: {color: 'purple'}
    }

    var combinationDmonthly = {
        type : "scatter",
        mode : "lines",
        name : "Option D",
        x: months,
        y: optionDmonthly,
        line: {color: 'brown'}
    }

    //var graphData = [demand, solar, wind, hydro, biomass, total, combinationA, combinationB,combinationC,combinationD];
    var graphData = [yearlyDemand, combinationAmonthly, combinationBmonthly, combinationCmonthly, combinationDmonthly];

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
        title: 'Yearly energy yield',
        xaxis: {
          range: Math.max(months),
          type: 'linear',
          autorange: true,
          title: "Months"
        },
        yaxis: {
          autorange: true,
          range: Math.max(combinationAmonthly,combinationBmonthly,combinationDmonthly,combinationCmonthly, yearlyDemand + 5),
          type: 'linear',
          title: "load (kW)"
        },
        legend: {
            orientation: 'h',
                  traceorder: 'reversed',
            x: -0.1,
            y: -0.1
          },
      };

      Plotly.newPlot('gridyearly', graphData, layout, {displayModeBar: false});
    
}


