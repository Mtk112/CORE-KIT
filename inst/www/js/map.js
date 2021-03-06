'use strict'

var lastVillage;
var totalHHdemand;
var lat;
var lng;
var atlasWind = 0;
var atlasSolar = 0;


// Basemap options

var satellite = L.tileLayer.provider('MapBox',{
    maxZoom: 18,
    id: 'mapbox/satellite-v9',
    accessToken: 'pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
}),
streets = L.tileLayer.provider('MapBox',{
    maxZoom: 18,
    id: 'mapbox/streets-v11',
    accessToken: 'pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
}),
mapnik = L.tileLayer.provider('OpenStreetMap',{
    maxZoom: 18,
}),
topomap = L.tileLayer.provider('OpenTopoMap',{
    maxZoom: 18
});

/* TIF layers */

var solarPotential = L.leafletGeotiff('data/solar_potential_kwhperkwp.tif',
    {band: 0,
    opacity: .1,
    renderer: new L.LeafletGeotiff.Plotty({
      colorScale: 'rdbu',
      clampLow: false,
      clampHigh: true,
      displayMin: 3.5,
      displayMax: 6,
        }),
    });
var windspeed = L.leafletGeotiff('data/wind_potential.tif',
    {band: 0,
    opacity: .1,
    renderer: new L.LeafletGeotiff.Plotty({
      colorScale: 'rdbu',
      clampLow: false,
      clampHigh: true,
      displayMin: 0.1,
      displayMax: 6.5,
        })
    });

/* Map interactivity for each layer. */

var districtLayer = new L.geoJson(districts, {
style: {
    stroke: 1,
    fillOpacity: 0,
    color: "black"
},
onEachFeature: function (feature, layer){
    layer.on('click', function (e){
    //document.getElementById("content").innerHTML = e.target.feature.properties.NAME_2 + ", " + e.target.feature.properties.NAME_0;
    //hideInputs();
})}
});  

var townshipLayer = new L.GeoJSON(townships, {
style: {
    stroke: 1,
    fillOpacity: 0,
    color: "red"
},
onEachFeature: function(feature, layer){
    layer.on('click', function (e){
    //document.getElementById("content").innerHTML = "Township of " + e.target.feature.properties.NAME_3;
    //tInput(e.target.feature.properties.NAME_3);
    })}
});     

var townLayer = new L.GeoJSON(city_town, {
pointToLayer: function (feature, latlng) {
    return new L.circle(latlng, {radius: 5, color: "black"});
},
onEachFeature: function(feature, layer){
    layer.on('click', function (e){
    //document.getElementById("content").innerHTML = "Town name: " + e.target.feature.properties.City__Town;
    //hideInputs();
    })}
});

var riversLayer = new L.GeoJSON(rivers, {
    onEachFeature: function(feature,layer){
        layer.on('click', function (e){
        //showHydro();
        drawRiver(e.target.feature.properties.riverID);
        saveId(e.target.feature.properties.riverID);
        })}
});

var villagePoints = new L.GeoJSON (village_points, {

    pointToLayer: function (feature, latlng) {
        return new L.circle(latlng, {radius: 5 });
    },
    onEachFeature: function (feature, layer){
        layer.on('click', function (e){
        lastVillage = e.target;
        document.getElementById("villagePopulation").value = lastVillage.feature.properties.Population;
        document.getElementById("villageHouseholds").value = lastVillage.feature.properties.Village_HH;
        document.getElementById("villageName").value = lastVillage.feature.properties.Name;
        })}
});

var powerGrid = new L.GeoJSON (myanmar_medium_voltage_grid, {
    style: {
        stroke: 1,
        fillOpacity: 0,
        color: "orange"
    },
    onEachFeature: function(feature, layer){
        layer.on('click', function (e){
            console.log("Clicked on power grid!");
        })
    }

    
});

// Basemaps: satellite or street view.
var baseMaps = {
    "Satellite": satellite,
    "Streets": streets,
    "Mapnik" : mapnik,
    "TopoMap" : topomap
};

// Initializing the map
var map = L.map('map', {
    center: [20.7888, 97.0337],
    zoom: 7,
    maxZoom: 17,
    minZoom: 6,
    layers: [streets, villagePoints]
});

map.on('click', function (e){
    console.log(e.latlng);
    lat = e.latlng.lat;
    lng = e.latlng.lng;
    console.log("Lat: " + lat + " Lng: " + lng);
    drawArea(lat,lng);
    console.log("Windspeed at location: " + windspeed.getValueAtLatLng(e.latlng.lat,e.latlng.lng).toFixed(1)+ " m/s.");
    console.log("Solar potential (kwh / kwp) at location: " + solarPotential.getValueAtLatLng(e.latlng.lat,e.latlng.lng).toFixed(1));
});

//Layers
var overlayMaps = {
    "Districts" : districtLayer,
    "Townships": townshipLayer,     
    "Towns": townLayer,
    "Rivers": riversLayer,
    "Villages": villagePoints,
    "Power Grid": powerGrid,
    "Wind Potential" : windspeed,
    "Solar potential kWh / kWp" : solarPotential
};
/* Search control for villages */
var searchControl = new L.Control.Search({
    layer: villagePoints,
    propertyName: 'Name',
    circleLocation: true
});

searchControl.on('search_locationfound', function (e) {

    //demand();
    //d3.select("#temp").empty();
    //totalHHdemand = lastVillage.feature.properties.Village_HH * document.getElementById("hh_kwh").value;
    //drawLoadProfile(load_profiles,totalHHdemand);
    //drawTotalDemand(totalHHdemand);

}).on('search_collapsed', function (e) {
});

//Adds layer and search control to the map.
L.control.layers(baseMaps).addTo(map);
L.control.layers(overlayMaps).addTo(map);
map.addControl(searchControl);

/* Circular area map */
var circleMap;
function initCircleMap(){
    var selectedRadius = parseFloat(document.getElementById("radiusArea").value);
    var fZoom;
    /* Some zoom adjustment to fit the area fully inside the circle map
    larger radius higher than 15ish wont fit but such cases are unlikely. */
    if(selectedRadius >= 10){
        fZoom = 10;
    }
    if(selectedRadius < 10 && selectedRadius >= 4){
        fZoom = 11;
    }
    if(selectedRadius < 4 && selectedRadius >= 2.21){
        fZoom = 12;
    }
    if(selectedRadius < 2.21){
        fZoom = 13;
    }

    circleMap = L.map('areaMap',{
        center: [lat, lng],
        zoom: fZoom,
        maxZoom : fZoom,
        minZoom: fZoom,
        layers: [topomap, riversLayer],
        zoomControl:false
    });
    drawCircleMapArea(lat, lng);
}

/* Copy of the circular map, but with different usage */
var designMap;
var clickNr = 0;
var designCoords = [];
var line;


function initDesignMap(){
    var selectedRadius = parseFloat(document.getElementById("radiusArea").value);
    var fZoom;
    /* Some zoom adjustment to fit the area fully inside the circle map
    larger radius higher than 15ish wont fit but such cases are unlikely. */
    if(selectedRadius >= 10){
        fZoom = 10;
    }
    if(selectedRadius < 10 && selectedRadius >= 4){
        fZoom = 11;
    }
    if(selectedRadius < 4 && selectedRadius >= 2.21){
        fZoom = 12;
    }
    if(selectedRadius < 2.21){
        fZoom = 13;
    }

    designMap = L.map('hydroMap',{
        center: [lat, lng],
        zoom: fZoom,
        maxZoom : 18,
        minZoom: fZoom,
        layers: [topomap, riversLayer],
        zoomControl:false
    });
    drawDesignMapArea(lat, lng);
    // clears map
    function clearMap(){
        //Clears the polylines added by mapclicks.
        for(var i = 0; i<polylineGroup.length; i++){
            designMap.removeLayer(polylineGroup[i]);
        }
        //Clears the circlemarkers added by mapclicks.
        for(var i = 0; i<markerGroup.length; i++){
            designMap.removeLayer(markerGroup[i]);
        }
        designCoords = [];
        clickNr = 0;
    }

    /* Design map onclick */
    var markerGroup = [];
    var polylineGroup = [];
    designMap.on('click', function (e){
        var lat = e.latlng.lat;
        var lng = e.latlng.lng;
        designClicks(lat, lng);
        if(clickNr == 3){
            clearMap(); 
        }
        else{
            if(clickNr <3){
                var marker = new L.circleMarker(e.latlng,{ color: 'gray', radius : 3}).addTo(designMap);
                markerGroup.push(marker);
            }
            if(clickNr != 0){
                var pathLine = new L.polyline(line).setStyle({color: 'gray'}).addTo(designMap);
                polylineGroup.push(pathLine);
            }  
        }
        
        console.log("designMap was clicked");
        clickNr++;
    });
    
}

function designClicks(lat ,lng){
    switch(clickNr){    
        case 0: //first click
        designCoords.push([lat, lng]);
        console.log(designCoords);
        break;

        case 1: //second click
        designCoords.push([lat, lng]);
        line = [designCoords[0], designCoords[1]];
        console.log(designCoords);
        break;

        case 2: //third click
        designCoords.push([lat, lng]);
        line = [designCoords[1], designCoords[2]];
        console.log(designCoords);
        break;

        default:
            console.log("Should not see this.");
        break;
    }
}