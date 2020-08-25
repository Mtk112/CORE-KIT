'use strict'

var lastVillage;
var totalHHdemand;
var lat;
var lng;
var atlasWind = 0;
var atlasSolar = 0;

var atlasMap;
function initAtlas(){

    //Have to duplicate these Layers for the map in modal, else the tilesets will be bugging out on the Location selection map.
    var satellite2 = L.tileLayer.provider('MapBox',{
        maxZoom: 18,
        id: 'mapbox/satellite-v9',
        accessToken: 'pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
    }),
    streets2 = L.tileLayer.provider('MapBox',{
        maxZoom: 18,
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1IjoibWthbGxpbzIiLCJhIjoiY2pyN3Fha2hyMDBxNzN4cW5sYm12MWkwbyJ9.q1pVLHFRx0Cav6vmyACAYw'
    }),
    mapnik2 = L.tileLayer.provider('OpenStreetMap',{
        maxZoom: 18,
    }),
    topomap2 = L.tileLayer.provider('OpenTopoMap',{
        maxZoom: 18
    });

    var solarPotential2 = L.leafletGeotiff('data/solar_potential_kwhperkwp.tif',
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
    var windspeed2 = L.leafletGeotiff('data/wind_potential.tif',
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

    var districtLayer2 = new L.geoJson(districts, {
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

    var townshipLayer2 = new L.GeoJSON(townships, {
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

    var townLayer2 = new L.GeoJSON(city_town, {
    pointToLayer: function (feature, latlng) {
        return new L.circle(latlng, {radius: 5, color: "black"});
    },
    onEachFeature: function(feature, layer){
        layer.on('click', function (e){
        //document.getElementById("content").innerHTML = "Town name: " + e.target.feature.properties.City__Town;
        //hideInputs();
        })}
    });

    var riversLayer2 = new L.GeoJSON(rivers, {
        onEachFeature: function(feature,layer){
            layer.on('click', function (e){
            //showHydro();
            drawRiver(e.target.feature.properties.riverID);
            saveId(e.target.feature.properties.riverID);
            })}
    });

    var villagePoints2 = new L.GeoJSON (village_points, {

        pointToLayer: function (feature, latlng) {
            return new L.circle(latlng, {radius: 5 });
        },
        onEachFeature: function (feature, layer){
            layer.on('click', function (e){
            lastVillage = e.target;
            document.getElementById("atlasVillagePopulation").innerHTML = lastVillage.feature.properties.Population;
            document.getElementById("atlasVillageHouseholds").innerHTML = lastVillage.feature.properties.Village_HH;
            document.getElementById("atlasVillageName").innerHTML = lastVillage.feature.properties.Name;
            })}
    });

    var powerGrid2 = new L.GeoJSON (myanmar_medium_voltage_grid, {
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

    var baseMaps2 = {
        "Satellite": satellite2,
        "Streets": streets2,
        "Mapnik" : mapnik2,
        "TopoMap" : topomap2
    };

    var overlayMaps2 = {
        "Districts" : districtLayer2,
        "Townships": townshipLayer2,     
        "Towns": townLayer2,
        "Rivers": riversLayer2,
        "Villages": villagePoints2,
        "Power Grid": powerGrid2,
        "Windspeed" : windspeed2,
        "Solar Potential kWh / kWp" : solarPotential2
    };

    atlasMap = L.map('atlasMap', {
        center: [20.7888, 97.0337],
        zoom: 7,
        maxZoom: 18,
        minZoom: 6,
        layers: [streets2, villagePoints2]
    });

    atlasMap.on('click', function (e){
        atlasWind = windspeed.getValueAtLatLng(e.latlng.lat,e.latlng.lng).toFixed(1);
        document.getElementById("atlasWindValue").innerHTML = atlasWind;
        atlasSolar = solarPotential.getValueAtLatLng(e.latlng.lat,e.latlng.lng).toFixed(1);
        document.getElementById("atlasSolarValue").innerHTML = atlasSolar;
    });

    atlasMap.on('baselayerchange', function (e){
        console.log("You've just selected " + e.name + " as your currently shown overlay.");
        if(e.name == "Solar Potential kWh / kWp"){
            document.getElementById("atlasVillages").style.display = "none";
            document.getElementById("atlasWind").style.display = "none";
            document.getElementById("atlasSolar").style.display = "block";
        }
        if(e.name == "Windspeed"){
            document.getElementById("atlasVillages").style.display = "none";
            document.getElementById("atlasWind").style.display = "block";
            document.getElementById("atlasSolar").style.display = "none";
        }
        if(e.name == "Villages"){
            document.getElementById("atlasVillages").style.display = "block";
            document.getElementById("atlasWind").style.display = "none";
            document.getElementById("atlasSolar").style.display = "none";
        }
    });

    L.control.layers(baseMaps2).addTo(atlasMap);
    L.control.layers(overlayMaps2).addTo(atlasMap);
}