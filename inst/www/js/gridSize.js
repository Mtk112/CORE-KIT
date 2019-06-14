'use strict'
var hydro = 100, wind = 50, solar = 100, bio = 25;
var night = document.getElementById("totalNight").value;
var dat = document.getElementById("totalDay").value;

var hydro2 = hydro / 2;
var wind2 = wind / 2;
var solar2 = solar / 2;
var bat = solar2 + bio;

function initGrid(){

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
         label: ["Micro-Hydro", "Wind", "Solar", "Biomass", "Battery", "Day time demand", "Night time demand"],
         color: ["blue", "paige", "yellow", "brown","red","green", "pink"]
            },
      
        link: {
          source: [0,0,0,1,1,1,2,2,2,3,3,3,4,4],
          target: [5,6,4,5,6,4,5,6,4,5,6,4,5,6],
          value:  [hydro2,hydro2,0,wind2,wind2,0,solar2,0,solar2,bio,0,bio,0,bat]
        }
      }
      
      var data = [data]
      
      var layout = {
        title: "Generation compared to demand",
        font: {
          size: 10
        }
      }
      
      Plotly.newPlot('grid', data, layout, {displayModeBar: false})

}
