'use strict'
var solarSize;
var months = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
var tempSolar = [], tempSolarABCD = [], tempWindPtp = [], tempWindPtpABCD = [];
var solar = [];
var windPtp = [];
var savedWind = [], savedSolar = [];


function getResources(reverse, radius){
    ocpu.seturl("http://localhost:5656/ocpu/library/corekit/R");
    var req = ocpu.rpc("get_resources", {
      longlat: reverse,
      radius: radius
    },function(output){
       drawSolarWind(output);
    });
    req.fail(function(){
      alert("R returned an error: " + req.responseText);
    });
}
/*  Gets solar and wind data in the area that was selected in step 2
    and creates plotly charts (Solar potential kilowatthours / kilowatt potential 
    & average monthly windspeed (m/s)) */
function drawSolarWind(data){
    windPtp = data[0];
    solar = data[1];

    var solarTrace = {
      type : "scatter",
      mode : "lines",
      name : "Solar",
      x: months,
      y: solar,
      stackgroup: 'one',
      line: {color: '#2eb2ff'}
    }

    var windTrace = {
      type : "scatter",
      mode : "lines",
      name : "Wind",
      x: months,
      y: windPtp,
      stackgroup: 'one',
      line: {color: '#2eb2ff'}
    }

    var graphData = [solarTrace];

      var layout = {
        width: 420,
        height: 360,
        margin: {
            l: 50,
            r: 10,
            b: 60,
            t: 25,
            pad: 2
        },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        title: 'Solar potential in the area',
        xaxis: {
          range: Math.max(months),
          title: "Month",
          autotick: false,
          ticks: 'outside',
          tick0: 1,
          dtick: 1,
          ticklen: 4,
          tickwidth: 4,
          tickcolor: '#000'
        },
        yaxis: {
          autorange: true,
          range: Math.max(solar + 1),
          type: 'linear',
          title: "kWh / kWp"
        },
        legend: {
            orientation: 'h',
                  traceorder: 'reversed',
            x: -0.1,
            y: -0.1
          },
      }; 
    Plotly.newPlot('rSolar', graphData, layout, {displayModeBar: false}); 
    var graphData = [windTrace];

    var layout = {
      width: 420,
      height: 360,
      margin: {
          l: 50,
          r: 10,
          b: 60,
          t: 25,
          pad: 2
      },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      title: 'Average monthly wind speed in the area',
      xaxis: {
        range: Math.max(months),
        title: "Month",
        autotick: false,
        ticks: 'outside',
        tick0: 1,
        dtick: 1,
        ticklen: 4,
        tickwidth: 4,
        tickcolor: '#000'
      },
      yaxis: {
        autorange: true,
        range: Math.max(windPtp + 1),
        type: 'linear',
        title: "m/s"
      },
      legend: {
          orientation: 'h',
                traceorder: 'reversed',
          x: -0.1,
          y: -0.1
        },
    };
    Plotly.newPlot('rWind', graphData, layout, {displayModeBar: false});
}

/* Draws the theoretical wind potential graph */
function drawWind(){
  var units = parseInt(document.getElementById("wUnits").value);
  /* Calculates rotor sweep area based on the radius of the windmill rotor blade */
  var rotorSweepArea = Math.PI * (parseFloat(document.getElementById("blade").value) * parseFloat(document.getElementById("blade").value));
  var cp = parseFloat(document.getElementById("cp").value) / 100;

  var cutoff = parseFloat(document.getElementById("cutoff").value);
  for(var i = 0; i < 12; i++){
    /* Checks if the wind speed is equal or greater than wind cutoff speed */
    if(windPtp[i] >= cutoff){
      tempWindPtp.push((0.5 * 1.225 * rotorSweepArea * (windPtp[i] * windPtp[i] * windPtp[i]) * cp) / 1000 * 24 * units);
    }else{
      tempWindPtp.push(0);
    }
  }
  savedWind = tempWindPtp;


  var windTrace = {
    type : "scatter",
    mode : "lines",
    name : "Wind",
    x: months,
    y: tempWindPtp,
    stackgroup: 'one',
    line: {color: '#2eb2ff'}
  }

  var graphData = [windTrace];

    var layout = {
      width: 320,
      height: 300,
      margin: {
          l: 50,
          r: 5,
          b: 5,
          t: 25,
          pad: 2
      },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      title: 'Theoretical power potential / day',
      xaxis: {
        range: Math.max(months),
        type: 'linear',
        autorange: true
      },
      yaxis: {
        autorange: true,
        range: Math.max(windPtp +1),
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
    Plotly.newPlot('wGen', graphData, layout, {displayModeBar: false});
    tempWindPtp = [];
}

function drawSolar(){
  solarSize = parseFloat(document.getElementById("solarPlan").value);
  for(var i = 0; i < 12; i++){
    tempSolar.push(solar[i] * solarSize);
  }
  savedSolar = tempSolar;
  var solarTrace = {
    type : "scatter",
    mode : "lines",
    name : "Solar",
    x: months,
    y: tempSolar,
    stackgroup: 'one',
    line: {color: '#2eb2ff'}
  }

  var graphData = [solarTrace];

    var layout = {
      width: 320,
      height: 300,
      margin: {
          l: 50,
          r: 5,
          b: 5,
          t: 25,
          pad: 2
      },
      paper_bgcolor: "transparent",
      plot_bgcolor: "transparent",
      title: 'Solar potential in the area',
      xaxis: {
        range: Math.max(months),
        type: 'linear',
        autorange: true
      },
      yaxis: {
        autorange: true,
        range: Math.max(tempSolar + 1),
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
  Plotly.newPlot('solarGen', graphData, layout, {displayModeBar: false});
  tempSolar = [];
}

function getWind(){
  return savedWind;
}

function getSolar(){
  return savedSolar;
}

function getSolar(option){
  tempSolarABCD = [];
  var optionSize = "solarPlan" + option
  var tempSize = parseFloat(document.getElementById(optionSize).value);
  for(var i = 0; i < 12; i++){
    tempSolarABCD.push(solar[i] * tempSize);
  }
  return tempSolarABCD;
}
function getWind(option){
  tempWindPtpABCD = [];
  var unitsOption = "wUnits" + option;
  console.log(unitsOption);
  var units = parseInt(document.getElementById(unitsOption).value);
  console.log(units);
  /* Calculates rotor sweep area based on the radius of the windmill rotor blade */
  var rotorSweepArea = Math.PI * (parseFloat(document.getElementById("blade" + option).value) * parseFloat(document.getElementById("blade" + option).value));
  var cp = parseFloat(document.getElementById("cp" + option).value) / 100;

  var cutoff = parseFloat(document.getElementById("cutoff" + option).value);
  for(var i = 0; i < 12; i++){
    /* Checks if the wind speed is equal or greater than wind cutoff speed */
    if(windPtp[i] >= cutoff){
      tempWindPtpABCD.push((0.5 * 1.225 * rotorSweepArea * (windPtp[i] * windPtp[i] * windPtp[i]) * cp) / 1000 * 24 * units);
    }else{
      tempWindPtpABCD.push(0);
    }
  }
  return tempWindPtpABCD;
}