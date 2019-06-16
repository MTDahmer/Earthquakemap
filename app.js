
// Store our API endpoint inside queryUrl
var earthquakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

// Perform a GET request to the query URL
d3.json(earthquakeURL, function(data) {
  // Once we get a response, send the data.features object to the createFeatures function
  createFeatures(data.features);
});

function createFeatures(earthquakeData) {

  // Define a function we want to run once for each feature in the features array
  // Give each feature a popup describing the magnitude, place and time of the earthquake
  // Create a GeoJSON layer containing the features array on the earthquakeData object
  // Run the onEachFeature function once for each piece of data in the array
  var earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +"</h3><h3>Location: "+ feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    },
    
    pointToLayer: function (feature, latlng) {
      var magSize = feature.properties.mag 
      return new L.circle(latlng,
        {radius: getRadius(magSize),
        fillColor: getColor(magSize),
        fillOpacity: .6,
        color: "#000",
        stroke: true,
        weight: .8
    })
  }
  });

  
  // Sending our earthquakes layer to the createMap function
  createMap(earthquakes);
}


function createMap(earthquakes) {

    // Define streetmap and darkmap layers
    var lightmap = L.tileLayer("https://api.mapbox.com/styles/v1/mapbox/light-v9/tiles/256/{z}/{x}/{y}?access_token={accessToken}", {
  attribution: "Map data &copy; <a href=\"http://openstreetmap.org\">OpenStreetMap</a> contributors, <a href=\"http://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"http://mapbox.com\">Mapbox</a>",
  maxZoom: 5,
  id: "mapbox.light",
  accessToken: "pk.eyJ1IjoibXRkYWhtZXIiLCJhIjoiY2p3aDBjY3FsMDFnZTQ0bXhzc3k0d2RvdSJ9.6ZfUR6Si1KXJPRBa2_yAUw"
});
  
    // Define a baseMaps object to hold our base layers
    // Pass in our baseMaps 
    var baseMaps = {
      "lightmap" : lightmap
    };


    // Create our map, giving it the outdoors, earthquakes and tectonic plates layers to display on load
    var myMap = L.map("map-id", {
      center: [
        37.09, -95.71],
      zoom: 3.25,
      layers: [earthquakes]
    }); 

  
    // Add the layer control to the map
    L.control.layers(baseMaps, {
      
    }).addTo(myMap);

  //Create a legend on the bottom left
  var legend = L.control({position: 'bottomleft'});

    legend.onAdd = function(myMap){
      var div = L.DomUtil.create('div', 'info legend'),
        grades = [0, 1, 2, 3, 4, 5],
        labels = [];

  // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < grades.length; i++) {
        div.innerHTML +=
            '<i style="background:' + getColor1(grades[i] + 1) + '"></i> ' +
            grades[i] + (grades[i + 1] ? '&ndash;' + grades[i + 1] + '<br>' : '+');
    }
    return div;
  };

  legend.addTo(myMap);
}
   

  //Create color range for the circle diameter 
  function getColor(magSize){
    return magSize > 5 ? "#cc0a00":
    magSize  > 4 ? "#cc4a00":
    magSize > 3 ? "#cc7700":
    magSize > 2 ? "#c8cc00":
    magSize > 1 ? "#b0cc00":
             "#5bcc00";
  }

  function getColor1(grades){
    return grades > 5 ? "#cc0a00":
    grades  > 4 ? "#cc4a00":
    grades > 3 ? "#cc7700":
    grades > 2 ? "#c8cc00":
    grades > 1 ? "#b0cc00":
             "#5bcc00";
  }

  //Change the maginutde of the earthquake by a factor of 25,000 for the radius of the circle. 
  function getRadius(magSize){
    return magSize*25000
  }