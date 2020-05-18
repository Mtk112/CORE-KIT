'use strict'

/* Variables */
var lastRiverId;
var radius = document.getElementById("radiusArea");
var employmentDropdwn = document.getElementById("employmentItem");
var incomeDropdwn = document.getElementById("incomeItem");
var bioSw = document.getElementById("biomassSwitch");
var solarSw = document.getElementById("solarSwitch");
var windSw = document.getElementById("windSwitch");
var hydroSw = document.getElementById("hydroSwitch");
var hydroCheck = false, bioCheck = false, windCheck = false, solarCheck = false;
var sunrise, sunset;
/* "Pages" */
var welcome = document.getElementById("welcome");
var mapSection = document.getElementById("mapSection");
var community = document.getElementById("community");
var demand = document.getElementById("demand");
var resources = document.getElementById("resources");
var generation = document.getElementById("generation");
var gridSize = document.getElementById("gridSize");
var viability = document.getElementById("viability");
var report = document.getElementById("report");
var firstTime = true;

/* If the radius of the area is changed redraws the circle */
radius.oninput = function(e){
    console.log("Radius is now: " + radius.value);
    redrawArea();
}

/* Checks if other is selected in employment */
employmentDropdwn.onchange = function(e){
    if(employmentDropdwn.value == "custom"){
      document.getElementById("customEmployment").style.display = "inline-block";
    }else{
      document.getElementById("customEmployment").style.display = "none";
    }
}
/* Checks if other is selected in income */
incomeDropdwn.onchange = function(e){
    if(incomeDropdwn.value == "custom"){
      document.getElementById("customIncome").style.display = "inline-block";
    }else{
      document.getElementById("customIncome").style.display = "none";
    }
}
/* Tab control */
function openTab(evt, tabName) {
    //variables
    var i, tabcontent, tablinks;
    // Get all elements with class="tabcontent" and hide them
    tabcontent = document.getElementsByClassName("tabcontent");
    for (i = 0; i < tabcontent.length; i++) {
      tabcontent[i].style.display = "none";
    }
    // Get all elements with class="tablinks" and remove the class "active"
    tablinks = document.getElementsByClassName("tablinks");
    for (i = 0; i < tablinks.length; i++) {
      tablinks[i].className = tablinks[i].className.replace(" active", "");
    }
    // Show the current tab, and add an "active" class to the button that opened the tab
    document.getElementById(tabName).style.display = "block";
    evt.currentTarget.className += " active";
    if(tabName == "hydro"){
        initCircleMap();
    }
    if(tabName == "hydroGen"){
        initDesignMap();
    }
    if(tabName =="gridSize"){
        getAllYields();
        initGrid();
    }
}



/* 30 year flow chart options */
var model = document.getElementById("model");
var mode = document.getElementById("mode");

mode.oninput = function(e) {
    drawRiver(lastRiverId);
}
model.oninput = function(e) {
    drawRiver(lastRiverId);
}

function saveId(id){
    lastRiverId = id;
}

/* Checks what "page" user is on and moves to the next  */
function next(page){
    if(page == "welcome"){
        welcome.style.display = "none";
        mapSection.style.display = "block";
        // rerenders the map (map is faulty if this is not called)
        map.invalidateSize(7);
        document.getElementById("pbWelcome").classList.remove('inprogress');
        document.getElementById("pbWelcome").classList.add('active');
        document.getElementById("pbLocation").classList.remove('undone');
        document.getElementById("pbLocation").classList.add('inprogress');
    }
    if(page == "mapSection"){
        if(hasAreaLayer()){
            mapSection.style.display = "none";
            community.style.display = "block";
            document.getElementById("households").value = document.getElementById("villageHouseholds").value;
            document.getElementById("population").value = document.getElementById("villagePopulation").value;
            document.getElementById("name").value = document.getElementById("villageName").value;
            document.getElementById("customIncome").style.display = "none";
            document.getElementById("customEmployment").style.display = "none";
            document.getElementById("pbLocation").classList.remove('inprogress');
            document.getElementById("pbLocation").classList.add('active');
            document.getElementById("pbCommunity").classList.remove('undone');
            document.getElementById("pbCommunity").classList.add('inprogress');
        }else{
            alert("Please select an area by clicking the map.");
        } 
    }
    if(page == "community"){
        // checks if required information has been inputted.
        if(document.getElementById("population").value != "" && document.getElementById("households").value != "" && document.getElementById("wtp").value != "" && document.getElementById("name").value != ""  && document.getElementById("sunrise").value !="" && document.getElementById("sunset").value !=""){
        community.style.display = "none";
        demand.style.display = "block";
        document.getElementById("household").style.display = "block";
        sunrise = document.getElementById("sunrise").value;
        sunset = document.getElementById("sunset").value;
        document.getElementById("pbCommunity").classList.remove('inprogress');
        document.getElementById("pbCommunity").classList.add('active');
        document.getElementById("pbDemand").classList.remove('undone');
        document.getElementById("pbDemand").classList.add('inprogress');
        }else{
            alert("Please fill in required information.");
        }
    }
    if(page == "demand"){
        demand.style.display = "none";
        resources.style.display = "block";
        document.getElementById("pbDemand").classList.remove('inprogress');
        document.getElementById("pbDemand").classList.add('active');
        document.getElementById("pbResources").classList.remove('undone');
        document.getElementById("pbResources").classList.add('inprogress');
    }
    if(page == "resources"){
        resources.style.display = "none";
        generation.style.display = "block";
        document.getElementById("pbResources").classList.remove('inprogress');
        document.getElementById("pbResources").classList.add('active');
        document.getElementById("pbGeneration").classList.remove('undone');
        document.getElementById("pbGeneration").classList.add('inprogress');
        if(hydroCheck == true){
            document.getElementById("hydroGen").style.display = "block";
            initDesignMap();
        }
        if(windCheck == true){
            document.getElementById("windGen").style.display = "block";
            drawWind();
        }
        if(solarCheck == true){
            document.getElementById("solarGen").style.display = "block";
            drawSolar();
        }
        if(bioCheck == true){
            document.getElementById("bioGen").style.display = "block";
            getYields();
        }
    }
    if(page == "generation"){
        generation.style.display = "none";
        gridSize.style.display = "block";
        document.getElementById("solarPlanA").value = document.getElementById("solarPlan").value;
        document.getElementById("cpA").value = document.getElementById("cp").value;
        document.getElementById("wUnitsA").value = document.getElementById("wUnits").value;
        document.getElementById("bladeA").value = document.getElementById("blade").value;
        document.getElementById("cutinA").value = document.getElementById("cutin").value;
        document.getElementById("conversionRateA").value = document.getElementById("conversionRate").value;
        //document.getElementById("residueTableA") = document.getElementById("residueTable");
        initGrid();
        document.getElementById("pbGeneration").classList.remove('inprogress');
        document.getElementById("pbGeneration").classList.add('active');
        document.getElementById("pbGrid").classList.remove('undone');
        document.getElementById("pbGrid").classList.add('inprogress');
    }
    if(page == "gridSize"){
        gridSize.style.display = "none";
        viability.style.display = "block";
        document.getElementById("pbGrid").classList.remove('inprogress');
        document.getElementById("pbGrid").classList.add('active');
        document.getElementById("pbViability").classList.remove('undone');
        document.getElementById("pbViability").classList.add('inprogress');
        initViability();
    }
    if(page == "viability"){
        viability.style.display = "none";
        report.style.display = "block";
        document.getElementById("pbViability").classList.remove('inprogress');
        document.getElementById("pbViability").classList.add('active');
        document.getElementById("pbReport").classList.remove('undone');
        document.getElementById("pbReport").classList.add('active');
    }
}

function back(page){
    if(page == "mapSection"){
        mapSection.style.display = "none";
        welcome.style.display = "block";
        document.getElementById("pbLocation").classList.remove('inprogress');
        document.getElementById("pbLocation").classList.add('undone');
        document.getElementById("pbWelcome").classList.remove('active');
        document.getElementById("pbWelcome").classList.add('inprogress');
    }
    if (page == "community"){
        community.style.display = "none";
        mapSection.style.display = "block";
        document.getElementById("pbCommunity").classList.remove('inprogress');
        document.getElementById("pbCommunity").classList.add('undone');
        document.getElementById("pbLocation").classList.remove('active');
        document.getElementById("pbLocation").classList.add('inprogress');
    }
    if(page == "demand"){
        demand.style.display = "none";
        community.style.display = "block";
        document.getElementById("pbDemand").classList.remove('inprogress');
        document.getElementById("pbDemand").classList.add('undone');
        document.getElementById("pbCommunity").classList.remove('active');
        document.getElementById("pbCommunity").classList.add('inprogress');
    }
    if(page == "resources"){
        resources.style.display = "none";
        demand.style.display = "block";
        document.getElementById("pbResources").classList.remove('inprogress');
        document.getElementById("pbResources").classList.add('undone');
        document.getElementById("pbDemand").classList.remove('active');
        document.getElementById("pbDemand").classList.add('inprogress');
    }
    if(page == "generation"){
        generation.style.display = "none";
        resources.style.display = "block";
        document.getElementById("pbGeneration").classList.remove('inprogress');
        document.getElementById("pbGeneration").classList.add('undone');
        document.getElementById("pbResources").classList.remove('active');
        document.getElementById("pbResources").classList.add('inprogress');
    }
    if(page == "gridSize"){
        gridSize.style.display = "none";
        generation.style.display = "block";
        document.getElementById("pbGrid").classList.remove('inprogress');
        document.getElementById("pbGrid").classList.add('undone');
        document.getElementById("pbGeneration").classList.remove('active');
        document.getElementById("pbGeneration").classList.add('inprogress');
    }
    if(page == "viability"){
        viability.style.display = "none";
        gridSize.style.display = "block";
        document.getElementById("pbViability").classList.remove('inprogress');
        document.getElementById("pbViability").classList.add('undone');
        document.getElementById("pbGrid").classList.remove('active');
        document.getElementById("pbGrid").classList.add('inprogress');
    }
    if(page == "report"){
        report.style.display = "none";
        viability.style.display = "block";
        document.getElementById("pbReport").classList.remove('active');
        document.getElementById("pbReport").classList.add('undone');
        document.getElementById("pbViability").classList.remove('active');
        document.getElementById("pbViability").classList.add('inprogress');
    }
}

/* Wind inputs - redraws wind potential graph*/
var windCp = document.getElementById("cp");
var windUnits = document.getElementById("wUnits");
var windBlade = document.getElementById("blade");
var windCutin = document.getElementById("cutin");

windCp.oninput = function(e){
    drawWind();
}
windUnits.oninput = function(e){
    drawWind();
}
windBlade.oninput = function(e){
    drawWind();
}
windCutin.oninput = function(e){
    drawWind();
}

/* Solar inputs */
var solarSize = document.getElementById("solarPlan");
//var batterySize = document.getElementById("batterySize");
solarSize.oninput = function(e){
    console.log("calling drawSolar()...");
    drawSolar();
}

/* Residue Table oninput & heat to energy, update biomass potential graph */
var residues = document.getElementById("residueTable");
var residuesA = document.getElementById("residueTableA");
var residuesB = document.getElementById("residueTableB");
var residuesC = document.getElementById("residueTableC");
var residuesD = document.getElementById("residueTableD");
var hteRate = document.getElementById("conversionRate");
var hteRateA = document.getElementById("conversionRateA");
var hteRateB = document.getElementById("conversionRateB");
var hteRateC = document.getElementById("conversionRateC");
var hteRateD = document.getElementById("conversionRateD");

residues.oninput = function(e){
    //console.log("Input registered. Calling getYields.");
    getYields();
}
residuesA.oninput = function(e){
    getYields(A);
}
residuesB.oninput = function(e){
    getYields(B);
}
residuesC.oninput = function(e){
    getYields(C);
}
residuesD.oninput = function(e){
    getYields(D);
}

hteRate.oninput = function(e){
    getYields();
}
hteRateA.oninput = function(e){
    getYields(A);
}
hteRateB.oninput = function(e){
    getYields(B);
}
hteRateC.oninput = function(e){
    getYields(C);
}
hteRateD.oninput = function(e){
    getYields(D);
}

/* Redraws sankey chart when month is changed */
var sankey = document.getElementById("month");

sankey.oninput = function(e) {
    initGrid();
}

function myFunction(){
    initGrid();
}
