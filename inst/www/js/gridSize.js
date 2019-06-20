'use strict'

/* Sankey chart stuff */
// Variables
var hydro = 100
var bio; 
var savedSolar, savedWind;



var hydro2 = hydro / 2;
var bat = 0;

function initGrid(){
  var night = parseFloat(document.getElementById("totalNight").text);
  var day = parseFloat(document.getElementById("totalDay").text);
  document.getElementById("dtDem").innerHTML = day;
  document.getElementById("ntDem").innerHTML = night;
  console.log("nt: " + night + ", dt: " + day);
  var month = document.getElementById("month").value;
  savedSolar = getSolar();
  savedWind = getWind();
  bio = getBio();

  console.log(savedSolar);
  console.log(savedWind);

  var wind2 = savedWind[month] / 2;
  var bio2 = bio[month] / 2;

    var data = {
        type: "sankey",
        orientation: "h",
        node: {
          pad: 15,
          thickness: 30,
          line: {
            color: "black",
            width: 0.5
          },
         label: ["Micro-Hydro", "Wind", "Solar", "Biomass", "Battery", "Day time generation", "Night time generation"],
         color: ["blue", "blue", "blue", "blue","red","green", "green"]
            },
      
        link: {
          source: [0,0,0,1,1,1,2,2,2,3,3,3,4,4],
          target: [5,6,4,5,6,4,5,6,4,5,6,4,5,6],
          value:  [hydro2,hydro2,0,wind2,wind2,0,savedSolar[month],0,0,bio2,0,bio2,0,bio2],
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
