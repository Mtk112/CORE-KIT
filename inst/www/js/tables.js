'use strict'

/* Adds excel style inputs for an item */
function addAppliance(){
    var table = document.getElementById("hhTable");
    var newRow = table.insertRow(table.rows.length);
    var cell0  = newRow.insertCell(0);
    cell0.innerHTML =   "<select class='excel' id='item'>" +
                        " <option value=''>Choose item</option> " +
                        "<option value='custom'>Custom item</option>" +
                        "<option value='Air Conditioner'> Air Conditioner</option>" +
                        "<option value='Electric Kettle'>Electric Kettle</option> " + 
                        "<option value='Stove'>Stove</option> " +
                        "<option value='Oven'>Oven</option>" + 
                        "<option value='Television'> Television</option> " +
                        "<option value='Radio'>Radio</option>"+
                        "<option value='Fridge'>Fridge</option> " + 
                        "<option value='Freezer'>Freezer</option>"+
                        "<option value='Lighting'>Lighting</option>" +
                        "<option value='Phone Charger'>Phone Charger</option>" +
                        "<option value='Computer'>Computer</option>" +
                        "<option value='Fans'>Fans</option>" + 
                        "</select>";
    var cell1 = newRow.insertCell(1);
    cell1.innerHTML = "<input class='excel' id='wattage' type='number' oninput='calculateItemUsage(this)' placeholder = 'Item usage (w)'>";
    var cell2 = newRow.insertCell(2);
    cell2.innerHTML = "<a class='excel' id='hours'>0<a>";
    var cell3 = newRow.insertCell(3);
    cell3.innerHTML = "<a class='excel' id='dailyUsage'>Undefined</a>";
    var cell4 = newRow.insertCell(4);
    cell4.innerHTML = "<input class='excel' id='units' type='number' oninput='calculateItemUsage(this)' placeholder = 'units'>";
    var cell5 = newRow.insertCell(5);
    cell5.innerHTML = "<button id='0' class='excelb' onclick='tick(this)'>x</button>";
    var cell6 = newRow.insertCell(6);
    cell6.innerHTML = "<button id='01' class='excelb' onclick='tick(this)'>x</button>";
    var cell7 = newRow.insertCell(7);
    cell7.innerHTML = "<button id='02' class='excelb' onclick='tick(this)'>x</button>";
    var cell8 = newRow.insertCell(8);
    cell8.innerHTML = "<button id='03' class='excelb' onclick='tick(this)'>x</button>";
    var cell9 = newRow.insertCell(9);
    cell9.innerHTML = "<button id='04' class='excelb' onclick='tick(this)'>x</button>";
    var cell10 = newRow.insertCell(10);
    cell10.innerHTML = "<button id='05' class='excelb' onclick='tick(this)'>x</button>";
    var cell11 = newRow.insertCell(11);
    cell11.innerHTML = "<button id='06' class='excelb' onclick='tick(this)'>x</button>";
    var cell12 = newRow.insertCell(12);
    cell12.innerHTML = "<button id='07' class='excelb' onclick='tick(this)'>x</button>";
    var cell13 = newRow.insertCell(13);
    cell13.innerHTML = "<button id='08' class='excelb' onclick='tick(this)'>x</button>";
    var cell14 = newRow.insertCell(14);
    cell14.innerHTML = "<button id='09' class='excelb' onclick='tick(this)'>x</button>";
    var cell15 = newRow.insertCell(15);
    cell15.innerHTML = "<button id='10' class='excelb' onclick='tick(this)'>x</button>";
    var cell16 = newRow.insertCell(16);
    cell16.innerHTML = "<button id='11' class='excelb' onclick='tick(this)'>x</button>";
    var cell17 = newRow.insertCell(17);
    cell17.innerHTML = "<button id='12' class='excelb' onclick='tick(this)'>x</button>";
    var cell18 = newRow.insertCell(18);
    cell18.innerHTML = "<button id='13' class='excelb' onclick='tick(this)'>x</button>";
    var cell19 = newRow.insertCell(19);
    cell19.innerHTML = "<button id='14' class='excelb' onclick='tick(this)'>x</button>";
    var cell20 = newRow.insertCell(20);
    cell20.innerHTML = "<button id='15' class='excelb' onclick='tick(this)'>x</button>";
    var cell21 = newRow.insertCell(21);
    cell21.innerHTML = "<button id='16' class='excelb' onclick='tick(this)'>x</button>";
    var cell22 = newRow.insertCell(22);
    cell22.innerHTML = "<button id='17' class='excelb' onclick='tick(this)'>x</button>";
    var cell23 = newRow.insertCell(23);
    cell23.innerHTML = "<button id='18' class='excelb' onclick='tick(this)'>x</button>";
    var cell24 = newRow.insertCell(24);
    cell24.innerHTML = "<button id='19' class='excelb' onclick='tick(this)'>x</button>";
    var cell25 = newRow.insertCell(25);
    cell25.innerHTML = "<button id='20' class='excelb' onclick='tick(this)'>x</button>";
    var cell26 = newRow.insertCell(26);
    cell26.innerHTML = "<button id='21' class='excelb' onclick='tick(this)'>x</button>";
    var cell27 = newRow.insertCell(27);
    cell27.innerHTML = "<button id='22' class='excelb' onclick='tick(this)'>x</button>";
    var cell28 = newRow.insertCell(28);
    cell28.innerHTML = "<button id='23' class='excelb' onclick='tick(this)'>x</button>";
    var cell29 = newRow.insertCell(29);
    cell29.innerHTML = "<button id='remove' class='excel' onclick='removeRow(this)'>Delete</button>";
}
/* Adds excel style inputs for "Productive uses" */
function addProductiveUse(){
    var table = document.getElementById("productiveTable");
    var newRow = table.insertRow(table.rows.length);
    var cell0  = newRow.insertCell(0);
    cell0.innerHTML =   "<select class='excel' id='item'>" +
                        " <option value=''>Choose item</option> " +
                        "<option value='custom'>Custom item</option>" +
                        "<option value='Irrigation Pumps'> Irrigation Pumps</option>" +
                        "<option value='River Pump Station'>River Pump Station</option> " + 
                        "<option value='Drip Irrigation'>Drip Irrigation</option> " +
                        "<option value='Dehydration'>Dehydration</option>" + 
                        "<option value='Cold-Storage (Agricultural)'> Cold-Storage (Agricultural)</option> " +
                        "<option value='Mills'>Mills</option>"+
                        "<option value='Welding'>Welding</option> " + 
                        "<option value='Carpentry'>Carpentry</option>"+
                        "<option value='Pot Making'>Pot Making</option>" +
                        "<option value='Shops & Teashops'>Shops & Teashops</option>" +
                        "<option value='Cold-Storage (Commercial)'>Cold-Storage (Commercial)</option>" +
                        "<option value='Brick Making'>Brick Making</option>" +
                        "<option value='Ice Making'>Ice Making</option>" + 
                        "<option value='Stone Crushing'>Stone Crushing</option>" + 
                        "<option value='Saw Mills'>Saw Mills</option>" + 
                        "<option value='Driers'>Driers</option>" + 
                        "</select>";
    var cell1 = newRow.insertCell(1);
    cell1.innerHTML = "<input class='excel' id='wattage' type='number' oninput='calculateItemUsage(this)' placeholder = 'Item usage (w)'>";
    var cell2 = newRow.insertCell(2);
    cell2.innerHTML = "<a class='excel' id='hours'>0<a>";
    var cell3 = newRow.insertCell(3);
    cell3.innerHTML = "<a class='excel' id='dailyUsage'>Undefined</a>";
    var cell4 = newRow.insertCell(4);
    cell4.innerHTML = "<input class='excel' id='units' type='number' oninput='calculateItemUsage(this)' placeholder = 'units'>";
    var cell5 = newRow.insertCell(5);
    cell5.innerHTML = "<button id='0' class='excelb' onclick='tick(this)'>x</button>";
    var cell6 = newRow.insertCell(6);
    cell6.innerHTML = "<button id='01' class='excelb' onclick='tick(this)'>x</button>";
    var cell7 = newRow.insertCell(7);
    cell7.innerHTML = "<button id='02' class='excelb' onclick='tick(this)'>x</button>";
    var cell8 = newRow.insertCell(8);
    cell8.innerHTML = "<button id='03' class='excelb' onclick='tick(this)'>x</button>";
    var cell9 = newRow.insertCell(9);
    cell9.innerHTML = "<button id='04' class='excelb' onclick='tick(this)'>x</button>";
    var cell10 = newRow.insertCell(10);
    cell10.innerHTML = "<button id='05' class='excelb' onclick='tick(this)'>x</button>";
    var cell11 = newRow.insertCell(11);
    cell11.innerHTML = "<button id='06' class='excelb' onclick='tick(this)'>x</button>";
    var cell12 = newRow.insertCell(12);
    cell12.innerHTML = "<button id='07' class='excelb' onclick='tick(this)'>x</button>";
    var cell13 = newRow.insertCell(13);
    cell13.innerHTML = "<button id='08' class='excelb' onclick='tick(this)'>x</button>";
    var cell14 = newRow.insertCell(14);
    cell14.innerHTML = "<button id='09' class='excelb' onclick='tick(this)'>x</button>";
    var cell15 = newRow.insertCell(15);
    cell15.innerHTML = "<button id='10' class='excelb' onclick='tick(this)'>x</button>";
    var cell16 = newRow.insertCell(16);
    cell16.innerHTML = "<button id='11' class='excelb' onclick='tick(this)'>x</button>";
    var cell17 = newRow.insertCell(17);
    cell17.innerHTML = "<button id='12' class='excelb' onclick='tick(this)'>x</button>";
    var cell18 = newRow.insertCell(18);
    cell18.innerHTML = "<button id='13' class='excelb' onclick='tick(this)'>x</button>";
    var cell19 = newRow.insertCell(19);
    cell19.innerHTML = "<button id='14' class='excelb' onclick='tick(this)'>x</button>";
    var cell20 = newRow.insertCell(20);
    cell20.innerHTML = "<button id='15' class='excelb' onclick='tick(this)'>x</button>";
    var cell21 = newRow.insertCell(21);
    cell21.innerHTML = "<button id='16' class='excelb' onclick='tick(this)'>x</button>";
    var cell22 = newRow.insertCell(22);
    cell22.innerHTML = "<button id='17' class='excelb' onclick='tick(this)'>x</button>";
    var cell23 = newRow.insertCell(23);
    cell23.innerHTML = "<button id='18' class='excelb' onclick='tick(this)'>x</button>";
    var cell24 = newRow.insertCell(24);
    cell24.innerHTML = "<button id='19' class='excelb' onclick='tick(this)'>x</button>";
    var cell25 = newRow.insertCell(25);
    cell25.innerHTML = "<button id='20' class='excelb' onclick='tick(this)'>x</button>";
    var cell26 = newRow.insertCell(26);
    cell26.innerHTML = "<button id='21' class='excelb' onclick='tick(this)'>x</button>";
    var cell27 = newRow.insertCell(27);
    cell27.innerHTML = "<button id='22' class='excelb' onclick='tick(this)'>x</button>";
    var cell28 = newRow.insertCell(28);
    cell28.innerHTML = "<button id='23' class='excelb' onclick='tick(this)'>x</button>";
    var cell29 = newRow.insertCell(29);
    cell29.innerHTML = "<button id='remove' class='excel' onclick='removeRow(this)'>Delete</button>";  
}

/* Adds excel style inputs for "Productive uses" */
function addPublicUtility(){
    var table = document.getElementById("publicTable");
    var newRow = table.insertRow(table.rows.length);
    var cell0  = newRow.insertCell(0);
    cell0.innerHTML =   "<select class='excel' id='item'>" +
                        " <option value=''>Choose item</option> " +
                        "<option value='custom'>Custom item</option>" +
                        "<option value='Water Treatment'> Water Treatment</option>" +
                        "<option value='Water Purification Systems'>Water Purification Systems</option> " + 
                        "<option value='Water Supply Pumps'>Water Supply Pumps</option> " +
                        "<option value='Telecom Towers'>Telecom Towers</option>" + 
                        "<option value='ATMs'> ATMs</option> " +
                        "<option value='Hospitals & Clinics'>Hospitals & Clinics</option>"+
                        "<option value='Medical Cold-chains'>Medical Cold-chains</option> " + 
                        "<option value='Schools'>Schools</option>"+
                        "<option value='Street Lighting'>Street Lighting</option>" +
                        "<option value='Internet Centers'>Internet Centers</option>" +
                        "<option value='Marketplaces & Commercial Hubs'>Marketplaces & Commercial Hubs</option>" +
                        "<option value='Monasteries'>Monasteries</option>" +
                        "</select>";
    var cell1 = newRow.insertCell(1);
    cell1.innerHTML = "<input class='excel' id='wattage' type='number' oninput='calculateItemUsage(this)' placeholder = 'Item usage (w)'>";
    var cell2 = newRow.insertCell(2);
    cell2.innerHTML = "<a class='excel' id='hours'>0<a>";
    var cell3 = newRow.insertCell(3);
    cell3.innerHTML = "<a class='excel' id='dailyUsage'>Undefined</a>";
    var cell4 = newRow.insertCell(4);
    cell4.innerHTML = "<input class='excel' id='units' type='number' oninput='calculateItemUsage(this)' placeholder = 'units'>";
    var cell5 = newRow.insertCell(5);
    cell5.innerHTML = "<button id='0' class='excelb' onclick='tick(this)'>x</button>";
    var cell6 = newRow.insertCell(6);
    cell6.innerHTML = "<button id='01' class='excelb' onclick='tick(this)'>x</button>";
    var cell7 = newRow.insertCell(7);
    cell7.innerHTML = "<button id='02' class='excelb' onclick='tick(this)'>x</button>";
    var cell8 = newRow.insertCell(8);
    cell8.innerHTML = "<button id='03' class='excelb' onclick='tick(this)'>x</button>";
    var cell9 = newRow.insertCell(9);
    cell9.innerHTML = "<button id='04' class='excelb' onclick='tick(this)'>x</button>";
    var cell10 = newRow.insertCell(10);
    cell10.innerHTML = "<button id='05' class='excelb' onclick='tick(this)'>x</button>";
    var cell11 = newRow.insertCell(11);
    cell11.innerHTML = "<button id='06' class='excelb' onclick='tick(this)'>x</button>";
    var cell12 = newRow.insertCell(12);
    cell12.innerHTML = "<button id='07' class='excelb' onclick='tick(this)'>x</button>";
    var cell13 = newRow.insertCell(13);
    cell13.innerHTML = "<button id='08' class='excelb' onclick='tick(this)'>x</button>";
    var cell14 = newRow.insertCell(14);
    cell14.innerHTML = "<button id='09' class='excelb' onclick='tick(this)'>x</button>";
    var cell15 = newRow.insertCell(15);
    cell15.innerHTML = "<button id='10' class='excelb' onclick='tick(this)'>x</button>";
    var cell16 = newRow.insertCell(16);
    cell16.innerHTML = "<button id='11' class='excelb' onclick='tick(this)'>x</button>";
    var cell17 = newRow.insertCell(17);
    cell17.innerHTML = "<button id='12' class='excelb' onclick='tick(this)'>x</button>";
    var cell18 = newRow.insertCell(18);
    cell18.innerHTML = "<button id='13' class='excelb' onclick='tick(this)'>x</button>";
    var cell19 = newRow.insertCell(19);
    cell19.innerHTML = "<button id='14' class='excelb' onclick='tick(this)'>x</button>";
    var cell20 = newRow.insertCell(20);
    cell20.innerHTML = "<button id='15' class='excelb' onclick='tick(this)'>x</button>";
    var cell21 = newRow.insertCell(21);
    cell21.innerHTML = "<button id='16' class='excelb' onclick='tick(this)'>x</button>";
    var cell22 = newRow.insertCell(22);
    cell22.innerHTML = "<button id='17' class='excelb' onclick='tick(this)'>x</button>";
    var cell23 = newRow.insertCell(23);
    cell23.innerHTML = "<button id='18' class='excelb' onclick='tick(this)'>x</button>";
    var cell24 = newRow.insertCell(24);
    cell24.innerHTML = "<button id='19' class='excelb' onclick='tick(this)'>x</button>";
    var cell25 = newRow.insertCell(25);
    cell25.innerHTML = "<button id='20' class='excelb' onclick='tick(this)'>x</button>";
    var cell26 = newRow.insertCell(26);
    cell26.innerHTML = "<button id='21' class='excelb' onclick='tick(this)'>x</button>";
    var cell27 = newRow.insertCell(27);
    cell27.innerHTML = "<button id='22' class='excelb' onclick='tick(this)'>x</button>";
    var cell28 = newRow.insertCell(28);
    cell28.innerHTML = "<button id='23' class='excelb' onclick='tick(this)'>x</button>";
    var cell29 = newRow.insertCell(29);
    cell29.innerHTML = "<button id='remove' class='excel' onclick='removeRow(this)'>Delete</button>";  
}

/* Changes background color of button (to work as a tickmark) */
function tick(currentElement){
    var onOff;
    if(currentElement.style.background != "forestgreen"){
        currentElement.style.background = "forestgreen";
        onOff = true;
    }else{
        currentElement.style.background = "#ccc";
        onOff = false;
    }
    console.log("I was called.");
    updateHours(currentElement, onOff);
}

/* Delete row in the table */
function removeRow(currentElement) {
    $(currentElement).parents("tr").remove();
}

/* Updates hours column */
function updateHours(currentElement, onOff){
    var $row = $(currentElement).closest('tr');
    var current = parseInt($row.find('#hours').text());
    console.log(current);
    if(onOff == true){
        current++;
    }else{
        current--;
    }
    console.log("New Hours: " + current);
    $row.find('#hours').text(parseInt(current));
    calculateItemUsage(currentElement);
}

/* Updates items daily usage when called. */
function calculateItemUsage(currentElement){
    var $row = $(currentElement).closest('tr');
    var id = $(currentElement).closest('table').attr('id');
    console.log(id);
    var hours = parseInt($row.find('#hours').text());
    var wattage = parseFloat($row.find('#wattage').val());
    var units = parseInt($row.find('#units').val());
    if(id == "hhTable"){
        var dailyUsage = Math.round((hours * units * ( wattage / 1000)) * 10) / 10;
    }else{
        var dailyUsage = Math.round(hours * units * wattage);
    }
    $row.find('#dailyUsage').text(dailyUsage);
}

/* Crop table */
function addCrop(){
    var table = document.getElementById("cropTable");
    var newRow = table.insertRow(table.rows.length);
    var cell0  = newRow.insertCell(0);
    cell0.innerHTML =   "<select class='excel' id='crop'>" +
                        "<option value='rice'>Rice</option> " +
                        "<option value='maize'>Maize</option>" +
                        "<option value='sugarcane'> Sugarcane</option>" +
                        "</select>";
    var cell1 = newRow.insertCell(1);
    cell1.innerHTML = "<input class='excel' id='cropArea' type='number' oninput='updateYields(this)' placeholder = 'Area (ha)'>";
    var cell2 = newRow.insertCell(2);
    cell2.innerHTML = "<input class='excel' id='yield' type='number' oninput='updateYields(this)' placeholder = 'Yield per harvest (tons / ha)'>";
    var cell3 = newRow.insertCell(3);
    cell3.innerHTML = "<button id='0' class='excelb' onclick='tickHarv(this)'>x</button>";
    var cell4 = newRow.insertCell(4);
    cell4.innerHTML = "<button id='01' class='excelb' onclick='tickHarv(this)'>x</button>";
    var cell5 = newRow.insertCell(5);
    cell5.innerHTML = "<button id='02' class='excelb' onclick='tickHarv(this)'>x</button>";
    var cell6 = newRow.insertCell(6);
    cell6.innerHTML = "<button id='03' class='excelb' onclick='tickHarv(this)'>x</button>";
    var cell7 = newRow.insertCell(7);
    cell7.innerHTML = "<button id='04' class='excelb' onclick='tickHarv(this)'>x</button>";
    var cell8 = newRow.insertCell(8);
    cell8.innerHTML = "<button id='05' class='excelb' onclick='tickHarv(this)'>x</button>";
    var cell9 = newRow.insertCell(9);
    cell9.innerHTML = "<button id='06' class='excelb' onclick='tickHarv(this)'>x</button>";
    var cell10 = newRow.insertCell(10);
    cell10.innerHTML = "<button id='07' class='excelb' onclick='tickHarv(this)'>x</button>";
    var cell11 = newRow.insertCell(11);
    cell11.innerHTML = "<button id='08' class='excelb' onclick='tickHarv(this)'>x</button>";
    var cell12 = newRow.insertCell(12);
    cell12.innerHTML = "<button id='09' class='excelb' onclick='tickHarv(this)'>x</button>";
    var cell13 = newRow.insertCell(13);
    cell13.innerHTML = "<button id='10' class='excelb' onclick='tickHarv(this)'>x</button>";
    var cell14 = newRow.insertCell(14);
    cell14.innerHTML = "<button id='11' class='excelb' onclick='tickHarv(this)'>x</button>";
    var cell15 = newRow.insertCell(15);
    cell15.innerHTML = "<a id='totalYield' class='excel'>0</a>";
    var cell16 = newRow.insertCell(16);
    cell16.innerHTML = "<button id='remove' class='excel' onclick='removeRow(this)'>Delete</button>"; 
}

function tickHarv(currentElement){
    if(currentElement.style.background != "forestgreen"){
        currentElement.style.background = "forestgreen";
    }else{
        currentElement.style.background = "#ccc";
    }
    console.log("I was called.");
    updateYields(currentElement);
}

function updateYields(currentElement){
    var harvests = 0;
    var $row = $(currentElement).closest('tr');
    var cArea = parseFloat($row.find('#cropArea').val());
    var cYield = parseFloat($row.find('#yield').val());
    var buttons = $row.find('.excelb');
    for (var i = 0; i <= buttons.length - 1; i++){
        var button = buttons[i];
        if(button.style.background == "forestgreen"){
            harvests++;
        }
    }
    var total = cArea * cYield * harvests;
    $row.find('#totalYield').text(total);
}

function getYields(){
    //Residue to energy factors.
    var RPR, AEP, LHV;
    // other variables
    var residueAmount, yields;
    //Residues
    var rh, rs, stt, sb, mc, ms, mh;
    // residue harvest months
    var rHar =[], sHar = [], mHar = [];
    var harvestMonths=[];
    var area;
    var conversionRate = parseFloat(document.getElementById("conversionRate").value) / 100;

    $("#cropTable tr").each(function () {
        var crop = $(this).find('#crop').val();
        console.log("Crop type: "+crop);
        yields = parseFloat($(this).find('#yield').val());
        area = parseFloat($(this).find('#cropArea').val());
        var months = $(this).find('.excelb');
        for (var i = 0; i <= months.length - 1; i++){
            var month = months[i];
            if(month.style.background == "forestgreen"){
                harvestMonths.push(i + 1);
            }
        }
        console.log(harvestMonths);
        if(crop == "rice"){
            $("#residueTable tr").each(function () {
                var currentCrop = $(this).find('#cropType').text();
                //console.log("currently processing: " + currentCrop);
                if(currentCrop == "Rice husk"){
                    //console.log("I am here --- Rice husk");
                    RPR = parseFloat($(this).find('#rhRPR').val());
                    AEP = parseFloat($(this).find('#rhAEP').val());
                    LHV = parseFloat($(this).find('#rhLHV').val());
                    // Annual crop yield * Residue to Product Ratio (tons)
                    residueAmount = yields * RPR;
                    // Residue energy potential = residueAmount (kg) * Availability for energy production % / 100 * LHV
                    rh = (residueAmount * 1000) * (AEP / 100) * LHV * conversionRate; //Mega joules
                    // Convert Mj to kWh and round to 1 decimal
                    rh = Math.round((rh * 0.277778 * area / 10) * 10);
                    console.log("Rice husk: " + rh);
                }
                if(currentCrop == "Rice straw"){
                    //console.log("I am here ---Rice straw");
                    RPR = parseFloat($(this).find('#rsRPR').val());
                    //console.log("RPR: " +RPR);
                    AEP = parseFloat($(this).find('#rsAEP').val());
                    //console.log("AEP: " + AEP);
                    LHV = parseFloat($(this).find('#rsLHV').val());
                    //console.log("LHV: " +LHV);
                    residueAmount = yields * RPR;
                    //console.log("Residue amount: " + residueAmount + " (tons)");
                    rs = (residueAmount * 1000) * (AEP / 100) * LHV * conversionRate; //Mega joules
                   //console.log("Rice straw potential: " + rs + " (MJ)");
                    rs = Math.round((rs * 0.277778 * area / 10) * 10);
                    console.log("Rice straw: " + rs + " kWh");
                }
                
            })
            rHar = harvestMonths;
            harvestMonths = [];
        }
        if(crop == "sugarcane"){
            $("#residueTable tr").each(function () {
                var currentCrop = $(this).find('#cropType').text();
                //console.log("currently processing: " + currentCrop);
                if(currentCrop == "Sugarcane tops & trashes"){
                    RPR = parseFloat($(this).find('#sttRPR').val());
                    AEP = parseFloat($(this).find('#sttAEP').val());
                    LHV = parseFloat($(this).find('#sttLHV').val());
                    // Annual crop yield * Residue to Product Ratio (tons)
                    residueAmount = yields * RPR;
                    // Residue energy potential = residueAmount (kg) * (Surplus Annual Factor + Energy Use Factor) * LHV
                    stt = (residueAmount * 1000) * (AEP / 100) * LHV * conversionRate; //Mega joules
                    // Convert Mj to kWh and round to 1 decimal
                    stt = Math.round((stt * 0.277778 * area / 10) * 10);
                    console.log("Sugarcane tops & trashes: " + stt);
                }
                if(currentCrop == "Sugarcane bagasse"){
                    RPR = parseFloat($(this).find('#sbRPR').val());
                    AEP = parseFloat($(this).find('#sbAEP').val());
                    LHV = parseFloat($(this).find('#sbLHV').val());
                    residueAmount = yields * RPR;
                    sb = (residueAmount * 1000) * (AEP / 100) * LHV * conversionRate; //Mega joules
                    sb = Math.round((sb * 0.277778 * area / 10) * 10);
                    console.log("Sugarcane bagasse: " + sb);
                }
            })
            sHar = harvestMonths;
            harvestMonths = [];
        }
        if(crop == "maize"){
            $("#residueTable tr").each(function () {
                var currentCrop = $(this).find('#cropType').text();
                //console.log("currently processing: " + currentCrop);
                if(currentCrop == "Maize / Corn cob"){
                    console.log("I am here --- Maize Corn cob");
                    RPR = parseFloat($(this).find('#mcRPR').val());
                    AEP = parseFloat($(this).find('#mcAEP').val());
                    LHV = parseFloat($(this).find('#mcLHV').val());
                    // Annual crop yield * Residue to Product Ratio (tons)
                    residueAmount = yields * RPR;
                    // Residue energy potential = residueAmount (kg) * (Surplus Annual Factor + Energy Use Factor) * LHV
                    mc = (residueAmount * 1000) * (AEP / 100) * LHV * conversionRate; //Mega joules
                    // Convert Mj to kWh and round
                    mc = Math.round((mc * 0.277778 * area / 10) * 10);
                    console.log("Maize / Corn cob: " + mc);
                }
                if(currentCrop == "Maize / Corn stalk"){
                    console.log("I am here --- Maize Corn stalk");
                    RPR = parseFloat($(this).find('#msRPR').val());
                    AEP = parseFloat($(this).find('#msAEP').val());
                    LHV = parseFloat($(this).find('#msLHV').val());
                    residueAmount = yields * RPR;
                    ms = (residueAmount * 1000) * (AEP / 100) * LHV * conversionRate; //Mega joules
                    ms = Math.round((ms * 0.277778 * area / 10) * 10);
                    console.log("Maize / Corn stalk: " + ms);
                }
                if(currentCrop == "Maize / Corn husk"){
                    RPR = parseFloat($(this).find('#mhRPR').val());
                    AEP = parseFloat($(this).find('#mhAEP').val());
                    LHV = parseFloat($(this).find('#mhLHV').val());
                    residueAmount = yields * RPR;
                    mh = (residueAmount * 1000) * (AEP / 100) * LHV * conversionRate; //Mega joules
                    mh = Math.round((mh * 0.277778 * area / 10) * 10);
                    console.log("Maize / Corn husk: " + mh);
                }
            })
            mHar = harvestMonths;
            harvestMonths = [];
        }
    })
    drawBiomass(rHar, sHar, mHar, rh, rs, stt, sb, mc, ms, mh);
}

