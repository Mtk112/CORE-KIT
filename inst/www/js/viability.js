'use strict'

function initViability(){
    var diesel = parseFloat(document.getElementById("diesel").value);
    var wtp = parseFloat(document.getElementById("wtp").value);
    var totalDem = parseFloat(document.getElementById("totalDemand").text);
    //totalDem = totalDem * 30 * 12;
    totalDem = totalDem.toFixed(1);
    /* Hard-coded values for example (will be changed for estimations when economics will be added) */
    var yA = 0.2;
    var yB = 0.8;
    var yC = 0.6;
    var yD = 0.3;

    var xA = parseFloat(document.getElementById("genA").text);
    var xB = parseFloat(document.getElementById("genB").text);
    var xC = parseFloat(document.getElementById("genC").text);
    var xD = parseFloat(document.getElementById("genD").text);

    var largestX = Math.max(xA,xB,xC,xD,totalDem);
    var largestY = Math.max(yA,yB,yC,yD,wtp,diesel);

    //Combination markers
    var traceA = {
        x: [xA],
        y: [yA],
        mode: 'markers',
        //type: 'scatter',
        name: 'Combination A',
        marker: { size: 12 }
    }

    var traceB = {
        x: [xB],
        y: [yB],
        mode: 'markers',
        //type: 'scatter',
        name: 'Combination B',
        marker: { size: 12 }
    }

    var traceC = {
        x: [xC],
        y: [yC],
        mode: 'markers',
        //type: 'scatter',
        name: 'Combination C',
        marker: { size: 12 }
    }

    var traceD = {
        x: [xD],
        y: [yD],
        mode: 'markers',
        //type: 'scatter',
        name: 'Combination D',
        marker: { size: 12 }

    }

    var data = [traceA, traceB, traceC, traceD];

    var layout = {
        width: 960,
        height: 480,
        margin: {
            l: 76,
            r: 10,
            b: 75,
            t: 30,
            pad: 10
        },
        paper_bgcolor: "transparent",
        plot_bgcolor: "transparent",
        xaxis: {
        range: largestX + 10,
        type: 'linear',
        autorange: true,
        title: 'Generation (kWh)'
        },
        yaxis: {
        range: largestY + 1,
        type: 'linear',
        autorange: true,
        title: 'US $ / kWh'
        },
        title:'System viability chart'
    };

    Plotly.newPlot('viabilityChart', data, layout,{displayModeBar: false});
}



