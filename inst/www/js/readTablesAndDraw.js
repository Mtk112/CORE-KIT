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
    Plotly.newPlot('hhLC', graphData, layout, {displayModeBar: false});
    Plotly.newPlot('proLC', graphData, layout, {displayModeBar: false});
    Plotly.newPlot('pubLC', graphData, layout, {displayModeBar: false});
    /* Sets Values to the infograph */
    document.getElementById("totalDemand").innerHTML = "Total demand : " + totalDem + " kWh";
    document.getElementById("totalDay").innerHTML = "Daytime demand : " + day + " kWh";
    document.getElementById("totalNight").innerHTML = "Night time demand : " + night + " kWh";
    night = 0;
    day = 0;

}
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
    }
    for(var i = 0; i <= sHar.length; i++){
        var harvest = sHar[i] - 1;
        sttResult[harvest] = stt;
        sbResult[harvest] = sb;
    }
    for(var i = 0; i <= mHar.length; i++){
        var harvest = mHar[i] - 1;
        mcResult[harvest] = mc;
        msResult[harvest] = ms;
        mhResult[harvest] = mh;
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
    var graphData = [riceHusk, riceStraw, sugarcaneTT, sugarcaneBagasse, maizeCob, maizeStalk, maizeStalk];

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
    Plotly.newPlot('bGen', graphData, layout, {displayModeBar: false});
}
