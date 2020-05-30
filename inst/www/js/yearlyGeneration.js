'use strict'

/*function yearlyGeneration(){
    var solar = getSolar();
    var wind = getWind();
    var bio = getBio();

    var totalSolar = 0, totalWind = 0, totalBio = 0;
    // hydro is hardcoded for now (using same numbers as in hourlyGrid.js)
    var totalHydro = 3000 * 12;
    for(var i=0; i <= 11; i++){
        totalSolar = totalSolar + solar[i];
        totalWind = totalWind + wind[i];
        totalBio = totalBio + bio[i];
    }
    var tempValueA = 0, tempValueB = 0, tempValueC = 0, tempValueD = 0;
    if(document.getElementById("solarCheckA").checked == true){
        tempValueA = tempValueA + totalSolar;
    }
    if(document.getElementById("solarCheckB").checked == true){
        tempValueB = tempValueB + totalSolar;
    }
    if(document.getElementById("solarCheckC").checked == true){
        tempValueC = tempValueC + totalSolar;
    }
    if(document.getElementById("solarCheckD").checked == true){
        tempValueD = tempValueD + totalSolar;
    }
    if(document.getElementById("windCheckA").checked == true){
        tempValueA = tempValueA + totalWind;
    }
    if(document.getElementById("windCheckB").checked == true){
        tempValueB = tempValueB + totalWind;
    }
    if(document.getElementById("windCheckC").checked == true){
        tempValueC = tempValueC + totalWind;
    }
    if(document.getElementById("windCheckD").checked == true){
        tempValueD = tempValueD + totalWind;
    }
    if(document.getElementById("hydroCheckA").checked == true){
        tempValueA = tempValueA + totalHydro;
    }
    if(document.getElementById("hydroCheckB").checked == true){
        tempValueB = tempValueB + totalHydro;
    }
    if(document.getElementById("hydroCheckC").checked == true){
        tempValueC = tempValueC + totalHydro;
    }
    if(document.getElementById("hydroCheckD").checked == true){
        tempValueD = tempValueD + totalHydro;
    }
    if(document.getElementById("bioCheckA").checked == true){
        tempValueA = tempValueA + totalBio;
    }
    if(document.getElementById("bioCheckB").checked == true){
        tempValueB = tempValueB + totalBio;
    }
    if(document.getElementById("bioCheckC").checked == true){
        tempValueC = tempValueC + totalBio;
    }
    if(document.getElementById("bioCheckD").checked == true){
        tempValueD = tempValueD + totalBio;
    }
    var abcd = [tempValueA,tempValueB, tempValueC, tempValueD];
    return abcd;
}*/