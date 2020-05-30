'use strict'

function initViability(){
    var diesel = parseFloat(document.getElementById("diesel").value);
    var wtp = parseFloat(document.getElementById("wtp").value);
    var totalDem = parseFloat(document.getElementById("totalDemand").text);
    totalDem = totalDem * 30 * 12;
    totalDem = totalDem.toFixed(1);
    /* Hard-coded values for example (will be changed for estimations when economics will be added) */
    var yA = 0.2;
    var yB = 0.8;
    var yC = 0.6;
    var yD = 0.3;

    var abcd = yearlyGeneration();

    var xA = abcd[0];
    var xB = abcd[1];
    var xC = abcd[2];
    var xD = abcd[3];
    console.log("A: " + xA + ", B: " + xB + ", C: " + xC + ", D: " + xD);

    var largestX = Math.max(xA,xB,xC,xD,totalDem);
    var largestY = Math.max(yA,yB,yC,yD,wtp,diesel);

    //Combination markers
    var traceA = {
        x: [xA],
        y: [yA],
        mode: 'markers',
        //type: 'scatter',
        name: 'Option A',
        marker: { size: 12 }
    }

    var traceB = {
        x: [xB],
        y: [yB],
        mode: 'markers',
        //type: 'scatter',
        name: 'Option B',
        marker: { size: 12 }
    }

    var traceC = {
        x: [xC],
        y: [yC],
        mode: 'markers',
        //type: 'scatter',
        name: 'Option C',
        marker: { size: 12 }
    }

    var traceD = {
        x: [xD],
        y: [yD],
        mode: 'markers',
        //type: 'scatter',
        name: 'Option D',
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
        title: 'Annual energy generated (kWh / yr)'
        },
        yaxis: {
        range: largestY + 1,
        type: 'linear',
        autorange: true,
        title: 'Levelised Cost of Energy (LCOE) USD / kWh'
        },
        title:'Cost of energy (kW)'
    };

    Plotly.newPlot('viabilityChart', data, layout,{displayModeBar: false});
}



