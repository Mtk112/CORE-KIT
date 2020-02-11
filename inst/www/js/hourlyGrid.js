'use strict'
/* Function for drawing the hourly comparison chart between demand and electricity generation */
/* Variables */ 
var savedSolarA, savedWindA, bioA;
var savedSolarB, savedWindB, bioB;
var savedSolarC, savedWindC, bioC;
var savedSolarD, savedWindD, bioD;
var sunrise = parseInt(document.getElementById("sunrise").value);
var sunset = parseInt(document.getElementById("sunset").value); 
var sunlight = 0;
var totalUsage = [];
var hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
var yearlyGenA = 0, yearlyGenB = 0, yearlyGenC = 0, yearlyGenD = 0;
var months = [1,2,3,5,6,7,8,9,10,11,12];
var hydroA, hydroB,hydroC,hydroD;

function rememberTotal(total){
    totalUsage = total;
}

function initGrid(){

    var totalDem = parseFloat(document.getElementById("totalDemand").text);
    var month = document.getElementById("month").value;
    savedSolarA = getSolar("A");
    savedWindA = getWind("A");
    bioA = getBio("A");
    savedSolarB = getSolar("B");
    savedWindB = getWind("B");
    bioB = getBio("B");
    savedSolarC = getSolar("C");
    savedWindC = getWind("C");
    bioC = getBio("C");
    savedSolarD = getSolar("D");
    savedWindD = getWind("D");
    bioD = getBio("D");
    hydroA = document.getElementById("hydroTestA").value;
    hydroB = document.getElementById("hydroTestA").value;
    hydroC = document.getElementById("hydroTestA").value;
    hydroD = document.getElementById("hydroTestA").value;
    
    /* Converts wind generation from monthly to hourly */
    var hourlyWindA = [], hourlyWindB = [], hourlyWindC = [], hourlyWindD = [];
    for(var i = 1 ; i <= 24; i++){
        hourlyWindA.push(savedWindA[month] / 24);
        hourlyWindB.push(savedWindB[month] / 24);
        hourlyWindC.push(savedWindC[month] / 24);
        hourlyWindD.push(savedWindD[month] / 24);
    }
    /* Checks how many hours of sunlight there is in a day */
    sunlight = sunset - sunrise;
    /*for(var i = 1; i <= 24; i++){
        if(i >= sunrise && i < sunset){
            sunlight++;
        }
    }*/
    /* Converts monthly solar to hourly solar generation */
    var hourlySolarA = [], hourlySolarB = [], hourlySolarC = [], hourlySolarD = [];
    for(var i = 0 ; i <= 23; i++){
        if(i >= sunrise && i < sunset){
            hourlySolarA.push(savedSolarA[month] / sunlight);
            hourlySolarB.push(savedSolarB[month] / sunlight);
            hourlySolarC.push(savedSolarC[month] / sunlight);
            hourlySolarD.push(savedSolarD[month] / sunlight);
        }
        else{
            hourlySolarA.push(0);
            hourlySolarB.push(0);
            hourlySolarC.push(0);
            hourlySolarD.push(0);
        }
    }
    /* Converts biomass generation to hourly generation for 1 month (Assumes steady conversion throughout the day) */
    var hourlyBioA = [], hourlyBioB = [], hourlyBioC = [], hourlyBioD = [];
    for(var i = 0 ; i <= 23; i++){
        hourlyBioA.push(bioA[month] / 30 / 24);
        hourlyBioB.push(bioB[month] / 30 / 24);
        hourlyBioC.push(bioC[month] / 30 / 24);
        hourlyBioD.push(bioD[month] / 30 / 24);
    }
    /* Converts monthly micro-hydro to hourly generation */
    var hourlyHydroA = [], hourlyHydroB = [], hourlyHydroC = [], hourlyHydroD = [];
        for(var i = 1 ; i <= 24; i++){
            hourlyHydroA.push(hydroA / 24);
            hourlyHydroB.push(hydroB / 24);
            hourlyHydroC.push(hydroC / 24);
            hourlyHydroD.push(hydroD / 24);
        }
    
        
    
    /* Draws monthly (based on the month selected) and yearly generation line for system options A,B,C and D */
    var optionA = [], optionB = [], optionC = [], optionD = [];
    //var yearlyA = [], yearlyB = [], yearlyC = [], yearlyD = [];
    var optionAmonthly = [0,0,0,0,0,0,0,0,0,0,0,0], optionBmonthly = [0,0,0,0,0,0,0,0,0,0,0,0], optionCmonthly = [0,0,0,0,0,0,0,0,0,0,0,0], optionDmonthly = [0,0,0,0,0,0,0,0,0,0,0,0];
    //var tempValueA = 0, tempValueB = 0, tempValueC = 0, tempValueD = 0;

    console.log("Solar A: " + hourlySolarA);
    console.log("Wind A: " + hourlyWindA);
    console.log("Hydro A: " + hourlyHydroA);
    console.log("Bio A: " + hourlyBioA);

    console.log("Solar B: " + hourlySolarB);
    console.log("Wind B: " + hourlyWindB);
    console.log("Hydro B: " + hourlyHydroB);
    console.log("Bio B: " + hourlyBioB);

    for(var i = 0; i<=23;i++){
        optionA.push(hourlySolarA[i] + hourlyWindA[i] + hourlyHydroA[i] + hourlyBioA[i]);
        optionB.push(hourlySolarB[i] + hourlyWindB[i] + hourlyHydroB[i] + hourlyBioB[i]);
        optionC.push(hourlySolarC[i] + hourlyWindC[i] + hourlyHydroC[i] + hourlyBioC[i]);
        optionD.push(hourlySolarD[i] + hourlyWindD[i] + hourlyHydroD[i] + hourlyBioD[i]);
    }
    for( var i = 0; i <= 11; i++){
        optionAmonthly[i] = savedSolarA[i] + savedWindA[i] + (hydroA * 30) + bioA[i];
        optionBmonthly[i] = savedSolarB[i] + savedWindB[i] + (hydroB * 30) + bioB[i];
        optionCmonthly[i] = savedSolarC[i] + savedWindC[i] + (hydroC * 30) + bioC[i];
        optionDmonthly[i] = savedSolarD[i] + savedWindD[i] + (hydroD * 30) + bioD[i];
    }
    console.log(optionA);
    console.log(optionB);
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
    /*
    var totalGenerationA = [], totalGenerationB = [], totalGenerationC = [], totalGenerationD = [];
    var dailyGenerationA, dailyGenerationB, dailyGenerationC, dailyGenerationD = 0;
    var totalDemand = 0;
    for(var i = 0; i <= 23; i++){
        var hourlyGenerationA = hourlyBioA[i] + hourlyHydroA[i] + hourlySolarA[i] + hourlyWindA[i];
        var hourlyGenerationB = hourlyBioB[i] + hourlyHydroB[i] + hourlySolarB[i] + hourlyWindB[i];
        var hourlyGenerationC = hourlyBioC[i] + hourlyHydroC[i] + hourlySolarC[i] + hourlyWindC[i];
        totalDemand = totalDemand + totalUsage[i];
        totalGeneration.push(hourlyGeneration);
        dailyGeneration = dailyGeneration + hourlyGeneration;
    }
    */
    var monthlyDemand = [];
    for(var i = 0; i <=11; i++){
       monthlyDemand.push(totalDemand * 30);
    }

    /* Creating daily traces based on the arrays created earlier */
    var demand = {
        type : "scatter",
        mode : "lines",
        name : "Demand",
        x: hours,
        y: totalUsage,
        line: {color: '#2eb2ff'}
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
        y: monthlyDemand,
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
    var yearlyGraphData = [yearlyDemand, combinationAmonthly, combinationBmonthly, combinationCmonthly, combinationDmonthly];

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
          range: Math.max(combinationAmonthly,combinationBmonthly,combinationDmonthly,combinationCmonthly, yearlyDemand) + 10,
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

      Plotly.newPlot('gridyearly', yearlyGraphData, layout, {displayModeBar: false});

}



