// Add console.log to check to see if our code is working.
console.log("working");

// We create the tile layer that will be the background of our map.
let streets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

let satelliteStreets = L.tileLayer('https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token={accessToken}', {
attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery (c) <a href="https://www.mapbox.com/">Mapbox</a>',
    maxZoom: 18,
    accessToken: API_KEY
});

//create basemap holding both layers of salellite and street
let baseMaps = {
    "Streets": streets,
    "Satellite" : satelliteStreets
};

//create the center of the map with zoom and layer

let map = L.map('mapid', {
    center :[39.5, -98.5],
    zoom: 3,
    layer: [streets]
});

//add control between layers
L.control.layers(baseMaps).addTo(map);
streets.addTo(map);

//retreive the geoJson data
 d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson").then(function (data) {
    L.geoJson(data, {
    pointToLayer: function(feature, latlng) {
    return L.circleMarker(latlng);
    },
    style: styleInfo   
 }).addTo(map);
});

// This function returns the style data for each of the earthquakes we plot on
// the map. We pass the magnitude of the earthquake into a function
// to calculate the radius.

function styleInfo(feature) {
    return {
    opacity :1,
    fillColor: "#ffae42",
    fillOpacity: 1,
    radius: getRadius(feature.properties.mag),
    color :"#000000",
    stroke: true ,
    weight: 0.5
};
}

function getRadius(magnitude){
    if (magnitude ===0) {
    return 1;
    }
    return magnitude*4;
}