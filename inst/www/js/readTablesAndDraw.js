'use strict'


/* Variables */
var productiveTable = document.getElementById("productiveTable");
var publicTable = document.getElementById("publicTable");
var households;
var hhTable = document.getElementById("hhTable");
var productiveTable = document.getElementById("productiveTable");
var hours = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24];
var sunset = document.getElementById("sunset").value;
var sunrise = document.getElementById("sunrise").value;
var day = 0, night = 0;

/*  Goes through all the tables and parses through them calculating hourly electricity usage and draws Load Curve
    based on that */
function drawFromTables(){
    /* Parses through household table and creates hourly usage */
    var householdUsage = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var productiveUsage = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var publicUsage = [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0];
    var householdNU = 0, householdDU = 0;
    var publicNU = 0, publicDU = 0;
    var productiveNU = 0, productiveDU = 0;
    households = parseInt(document.getElementById("households").value);
    $("#hhTable tr").each(function () {
        var wattage = parseFloat($(this).find('#wattage').val());
        var units = parseInt($(this).find('#units').val());
        //console.log("Wattage: " + wattage + ", Units: " + units);
        var buttons = $(this).find('.excelb');
        for (var i = 0; i <= buttons.length - 1; i++){
            var button = buttons[i];
            if(button.style.background == "forestgreen"){
                var tempHour = parseInt(button.id);
                householdUsage[tempHour] = Math.round((householdUsage[tempHour] + (((wattage / 1000) * units) * households)) * 10) / 10;
            }
        }
    })
    //console.log(householdUsage);

    $('#productiveTable tr').each(function(){
        var wattage = parseFloat($(this).find('#wattage').val());
        var units = parseInt($(this).find('#units').val());
        var buttons = $(this).find('.excelb');
        //console.log(buttons);
        for (var i = 0; i <= buttons.length - 1; i++){
            var button = buttons[i];
            console.log(this);
            if(button.style.background == "forestgreen"){
                var tempHour = parseInt(button.id);
                productiveUsage[tempHour] = productiveUsage[tempHour] + (wattage * units);
            }
        }
    })
    /* Parses through public utilities table and creates hourly usage */
    $('#publicTable tr').each(function(){
        var wattage = parseFloat($(this).find('#wattage').val());
        var units = parseInt($(this).find('#units').val());
        var buttons = $(this).find('.excelb');
        for (var i = 0; i <= buttons.length - 1; i++){
            var button = buttons[i];
            if(button.style.background == "forestgreen"){
                var tempHour = parseInt(button.id);
                publicUsage[tempHour] = publicUsage[tempHour] + (wattage * units);
            }
        }
    })

    var totalDay = householdDU + productiveDU + publicDU;
    var totalNight = householdNU + productiveNU + publicNU;
    //console.log(publicUsage);
    /* Calculates total hourly usage */
    var total = [];
    var totalDem = 0;
    for(var i = 0; i <= 23; i++){
        total.push(publicUsage[i] + productiveUsage[i] + householdUsage[i]);
        if( i >= sunrise && i < sunset){
            day = day + publicUsage[i] + productiveUsage[i] + householdUsage[i];
        }
        if( i >= sunset || i < sunrise){
            night = night + publicUsage[i] + productiveUsage[i] + householdUsage[i];
        }
        totalDem = totalDem + publicUsage[i] + productiveUsage[i] + householdUsage[i];
    }
    /* Getting the peak demand and displaying it in the html */
    var peak = 0;
    for(var i = 0; i <= 23; i++){
        if (total[i] > peak ){
            peak = total[i];
        }
    }
    rememberTotal(total);


    /* Creating traces based on the arrays created earlier */
    var householdTrace = {
        type : "scatter",
        mode : "lines",
        name : "Households",
        x: hours,
        y: householdUsage,
        stackgroup: 'one',
        line: {color: '#2eb2ff'}
    }

    var publicTrace = {
        type : "scatter",
        mode : "lines",
        name : "Public utilities",
        x: hours,
        y: publicUsage,
        stackgroup: 'one',
        line: {color: '#f8c972'}
    }

    var productiveTrace = {
        type : "scatter",
        mode : "lines",
        name : "Productive uses",
        x: hours,
        y: productiveUsage,
        stackgroup: 'one',
        line: {color: '#e05a47'}
    }

    var totalTrace = {
        type : "scatter",
        mode : "lines",
        name : "Total",

        x: hours,
        y: total,
        line: {color: 'transparent'}
    }
    
    var graphData = [publicTrace, productiveTrace, householdTrace, totalTrace];

    var layout = {
        width: 320,
        height: 300,
        margin: {
            l: 25,
            r: 5,
            b: 5,
            t: 25,
            pad: 2
        },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        title: 'Electricity demand by hour',
        xaxis: {
          range: Math.max(hours),
          type: 'linear',
          autorange: true
        },
        yaxis: {
          autorange: true,
          range: Math.max(total + 2),
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
      Plotly.newPlot('loadCurve', graphData, layout, {displayModeBar: false});
    /*Plotly.newPlot('hhLC', graphData, layout, {displayModeBar: false});
    Plotly.newPlot('proLC', graphData, layout, {displayModeBar: false});
    Plotly.newPlot('pubLC', graphData, layout, {displayModeBar: false});*/
    /* Sets Values to the infograph */
    document.getElementById("totalDemand").innerHTML = totalDem;
    document.getElementById("totalDay").innerHTML = day;
    document.getElementById("totalNight").innerHTML = night;
    document.getElementById("peakDemand").innerHTML = peak;
    night = 0;
    day = 0;

}

var riceResult = [0,0,0,0,0,0,0,0,0,0,0,0], sugarResult = [0,0,0,0,0,0,0,0,0,0,0,0], maizeResult = [0,0,0,0,0,0,0,0,0,0,0,0];
var riceResultA = [0,0,0,0,0,0,0,0,0,0,0,0], sugarResultA = [0,0,0,0,0,0,0,0,0,0,0,0], maizeResultA = [0,0,0,0,0,0,0,0,0,0,0,0];
var riceResultB = [0,0,0,0,0,0,0,0,0,0,0,0], sugarResultB = [0,0,0,0,0,0,0,0,0,0,0,0], maizeResultB = [0,0,0,0,0,0,0,0,0,0,0,0];
var riceResultC = [0,0,0,0,0,0,0,0,0,0,0,0], sugarResultC = [0,0,0,0,0,0,0,0,0,0,0,0], maizeResultC = [0,0,0,0,0,0,0,0,0,0,0,0];
var riceResultD = [0,0,0,0,0,0,0,0,0,0,0,0], sugarResultD = [0,0,0,0,0,0,0,0,0,0,0,0], maizeResultD = [0,0,0,0,0,0,0,0,0,0,0,0];

/* Produces monthly biomass estimate */
function drawBiomass(rHar, sHar, mHar, rh, rs, stt, sb, mc, ms, mh){
    var months = [1,2,3,4,5,6,7,8,9,10,11,12];
    var rhResult = [0,0,0,0,0,0,0,0,0,0,0,0];
    var rsResult = [0,0,0,0,0,0,0,0,0,0,0,0];
    var sttResult = [0,0,0,0,0,0,0,0,0,0,0,0];
    var sbResult = [0,0,0,0,0,0,0,0,0,0,0,0];
    var mcResult = [0,0,0,0,0,0,0,0,0,0,0,0];
    var msResult = [0,0,0,0,0,0,0,0,0,0,0,0];
    var mhResult = [0,0,0,0,0,0,0,0,0,0,0,0];

    for(var i = 0; i <= rHar.length; i++){
        var harvest = rHar[i] - 1;
        rhResult[harvest] = rh;
        rsResult[harvest] = rs;
        riceResult[harvest] = rs + rh;

    }
    for(var i = 0; i <= sHar.length; i++){
        var harvest = sHar[i] - 1;
        sttResult[harvest] = stt;
        sbResult[harvest] = sb;
        sugarResult[harvest] = stt + sb;
    }
    for(var i = 0; i <= mHar.length; i++){
        var harvest = mHar[i] - 1;
        mcResult[harvest] = mc;
        msResult[harvest] = ms;
        mhResult[harvest] = mh;
        maizeResult[harvest] = mc + ms + mh;
    }
    var riceHusk = {
        type : "bar",
        mode : "lines",
        name : "Rice husk",
        x: months,
        y: rhResult,
        stackgroup: 'Rice'
    }
    var riceStraw = {
        type : "bar",
        mode : "lines",
        name : "Rice straw",
        x: months,
        y: rsResult,
        stackgroup: 'Rice'
    }
    var sugarcaneTT = {
        type : "bar",
        mode : "lines",
        name : "Sugarcane tops & trashes",
        x: months,
        y: sttResult,
        stackgroup: 'Sugarcane'
    }
    var sugarcaneBagasse = {
        type : "bar",
        mode : "lines",
        name : "Sugarcane bagasse",
        x: months,
        y: sbResult,
        stackgroup: 'Sugarcane'
    }
    var maizeCob = {
        type : "bar",
        mode : "lines",
        name : "Maize / Corn cob",
        x: months,
        y: mcResult,
        stackgroup: 'Maize'
    }
    var maizeStalk = {
        type : "bar",
        mode : "lines",
        name : "Maize / Corn stalk",
        x: months,
        y: msResult,
        stackgroup: 'Maize'
    }
    var maizeHusk = {
        type : "bar",
        mode : "lines",
        name : "Maize / Corn husk",
        x: months,
        y: mhResult,
        stackgroup: 'Maize'
    }
    var graphData = [riceHusk, riceStraw, sugarcaneTT, sugarcaneBagasse, maizeCob, maizeStalk, maizeHusk];

    var layout = {
        width: 420,
        height: 400,
        margin: {
            l: 25,
            r: 5,
            b: 5,
            t: 25,
            pad: 2
        },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        title: 'Monthly biomass availability',
        xaxis: {
          range: Math.max(months),
          type: 'linear',
          autorange: true
        },
        yaxis: {
          autorange: true,
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
    Plotly.newPlot('bioGen', graphData, layout, {displayModeBar: false});
}

/* Gets overall biomass result for sankey chart */
function getBio(){
    var bio = [];
    for(var i = 0; i <= riceResult.length; i++){
        bio.push(riceResult[i] + sugarResult[i] + maizeResult[i]);
    }
    console.log(bio);
    return bio
    
}

// NEW stuff this doesnt work proper i am sure...

function recalculateBiomass(rHarA, mHarA,sHarA, rhA, rsA, sttA, sbA, mcA, msA, mhA, rHarB, mHarB, sHarB, rhB, rsB, sttB, sbB, mcB, msB, mhB, rHarC, mHarC,sHarC, rhC, rsC, sttC, sbC, mcC, msC, mhC, rHarD, mHarD,sHarD, rhD, rsD, sttD, sbD, mcD, msD, mhD){
    // Option A
    for(var i = 0; i <= rHarA.length; i++){
        var harvest = rHarA[i] - 1;
        riceResultA[harvest] = rsA + rhA;
    }
    for(var i = 0; i <= sHarA.length; i++){
        var harvest = sHarA[i] - 1;
        sugarResult[harvest] = sttA + sbA;
    }
    for(var i = 0; i <= mHarA.length; i++){
        var harvest = mHarA[i] - 1;
        maizeResultA[harvest] = mcA + msA + mhA;
    }
    // Option B
    for(var i = 0; i <= rHarB.length; i++){
        var harvest = rHarB[i] - 1;
        riceResultB[harvest] = rsB + rhB;
    }
    for(var i = 0; i <= sHarB.length; i++){
        var harvest = sHarB[i] - 1;
        sugarResultB[harvest] = sttB + sbB;
    }
    for(var i = 0; i <= mHarB.length; i++){
        var harvest = mHarB[i] - 1;
        maizeResultB[harvest] = mcB + msB + mhB;
    }
    // Option C
    for(var i = 0; i <= rHarC.length; i++){
        var harvest = rHarC[i] - 1;
        riceResultC[harvest] = rsC + rhC;
    }
    for(var i = 0; i <= sHarC.length; i++){
        var harvest = sHarC[i] - 1;
        sugarResultB[harvest] = sttC + sbC;
    }
    for(var i = 0; i <= mHarC.length; i++){
        var harvest = mHarC[i] - 1;
        maizeResultC[harvest] = mcC + msC + mhC;
    }
    // Option D
    for(var i = 0; i <= rHarD.length; i++){
        var harvest = rHarD[i] - 1;
        riceResultD[harvest] = rsD + rhD;
    }
    for(var i = 0; i <= sHarD.length; i++){
        var harvest = sHarD[i] - 1;
        sugarResultD[harvest] = sttD + sbD;
    }
    for(var i = 0; i <= mHarD.length; i++){
        var harvest = mHarD[i] - 1;
        maizeResultD[harvest] = mcD + msD + mhD;
    }
}

function getBio(option){
    var option = option;
    if(option == "A"){
        var bioA = [];
    for(var i = 0; i <= riceResultA.length; i++){
        bioA.push(riceResultA[i] + sugarResultA[i] + maizeResultA[i]);
    }
    return bioA
    }
    if(option == "B"){
        var bioB = [];
    for(var i = 0; i <= riceResultB.length; i++){
        bioB.push(riceResultB[i] + sugarResultB[i] + maizeResultB[i]);
    }
    return bioB
    }
    if(option == "C"){
        var bioC = [];
    for(var i = 0; i <= riceResultC.length; i++){
        bioC.push(riceResultC[i] + sugarResultC[i] + maizeResultC[i]);
    }
    return bioC
    }
    if(option == "D"){
        var bioD = [];
    for(var i = 0; i <= riceResultD.length; i++){
        bioD.push(riceResultD[i] + sugarResultD[i] + maizeResultD[i]);
    }
    return bioD
    }
    
    
}


