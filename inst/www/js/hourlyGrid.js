'use strict'
/* Variables */
var hydro = 100 / 24; // Currently hardcoded. Estimation will be added later!
var bio; 
var savedSolar, savedWind;
var night = parseFloat(document.getElementById("totalNight").text);
var day = parseFloat(document.getElementById("totalDay").text);
document.getElementById("dtDem").innerHTML = day;
document.getElementById("ntDem").innerHTML = night;

function initGridSize(){
    var month = document.getElementById("month").value;
    savedSolar = getSolar();
    savedWind = getWind();
    bio = getBio();

    var hourlyWind = savedWind[month] / 24;
    var hourlySolar = savedSolar[month] / 24;
    var hourlyBio = bio[month] / 30 / 24;

    
}

