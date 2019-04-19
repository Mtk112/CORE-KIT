'use strict'
var reverse = [];
var center = [];

var areaLayer;

function drawArea(lat, lng){
    if(map.hasLayer(areaLayer)){
        areaLayer.clearLayers(); 
    }
    center = [lat, lng];
    reverse = [lng, lat];
    var radius = parseFloat(document.getElementById("radiusArea").value);
    var options = {steps: 64, units: 'kilometers'};
    var circle = turf.circle(reverse, radius, options);
    var line = turf.polygonToLine(circle);
    map.setView(center);

    areaLayer = L.geoJSON(line, {
        style: function(feature) {
            return {
                color: "red"
            };
        }
    });
    map.addLayer(areaLayer);
    getResources(reverse, radius);
}

function redrawArea(){
    if(reverse.length == 2){
        var radius = parseFloat(document.getElementById("radiusArea").value);
        areaLayer.clearLayers();
        var options = {steps: 64, units: 'kilometers'};
        var circle = turf.circle(reverse, radius, options);
        var line = turf.polygonToLine(circle);
        map.setView(center);

        areaLayer = L.geoJSON(line, {
            style: function(feature) {
                return {
                    color: "red"
                };
            }
        });
    
        map.addLayer(areaLayer);
        getResources(reverse, radius);
    }
}

/* Checks if there is an area layer on the map*/
function hasAreaLayer(){
    if(map.hasLayer(areaLayer)){
        return true;
    }else{
        return false;
    }
}

/* Draw area to circle map. */
function drawCircleMapArea(lat, lng){
    center = [lat, lng];
    reverse = [lng, lat];
    var radius = parseFloat(document.getElementById("radiusArea").value);
    var options = {steps: 64, units: 'kilometers'};
    var circle = turf.circle(reverse, radius, options);
    var line = turf.polygonToLine(circle);
    map.setView(center);

    areaLayer = L.geoJSON(line, {
        style: function(feature) {
            return {
                color: "red"
            };
        }
    });
    circleMap.addLayer(areaLayer);
}

/* Draw area to circle map. */
function drawDesignMapArea(lat, lng){
    center = [lat, lng];
    reverse = [lng, lat];
    var radius = parseFloat(document.getElementById("radiusArea").value);
    var options = {steps: 64, units: 'kilometers'};
    var circle = turf.circle(reverse, radius, options);
    var line = turf.polygonToLine(circle);
    map.setView(center);

    areaLayer = L.geoJSON(line, {
        style: function(feature) {
            return {
                color: "red"
            };
        }
    });
    designMap.addLayer(areaLayer);
}