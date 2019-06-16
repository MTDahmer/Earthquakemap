d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(infoRes) {

    var magTrack = infoRes.features;
    console.log("test")
    console.log[magTrack];
});

// Initialize all of the LayerGroups we'll be using
var layers = {
    zeroMag: new L.LayerGroup(),
    oneMag: new L.LayerGroup(), 
    twoMag: new L.LayerGroup(),
    threeMag: new L.LayerGroup(),
    fourMag: new L.LayerGroup(),
    fiveMag: new L.LayerGroup()
  };
  
  // Create the map with our layers
  var map = L.map("map-id", {
    center: [40.73, -74.0059],
    zoom: 12,
    layers: [
      layers.zeroMag,
      layers.oneMag,
      layers.twoMag,
      layers.threeMag,
      layers.fourMag,
      layers.fiveMag
    ]
  });
  
  // Add our 'lightmap' tile layer to the map
  lightmap.addTo(map);
  
  // Create an overlays object to add to the layer control
  var overlays = {
    "0-1": layers.zeroMag,
    "1-2": layers.oneMag,
    "2-3": layers.twoMag,
    "3-4": layers.threeMag,
    "4-5": layers.fourMag,
    "5+": layers.fiveMag
  };
  
  // Create a control for our layers, add our overlay layers to it
  L.control.layers(null, overlays).addTo(map);
  
  // Create a legend to display information about our map
  var info = L.control({
    position: "bottomright"
  });
  
  // When the layer control is added, insert a div with the class of "legend"
  info.onAdd = function() {
    var div = L.DomUtil.create("div", "legend");
    return div;
  };
  // Add the info legend to the map
  info.addTo(map);
  
  // Initialize an object containing icons for each layer group
  var icons = {
    zeroMag: L.ExtraMarkers.icon({
      markerColor: "green",
      shape: "cirlce"
    }),
    oneMag: L.ExtraMarkers.icon({
      markerColor: "light-yellow",
      shape: "circle"
    }),
    
    twoMag: L.ExtraMarkers.icon({
      markerColor: "yellow",
      shape: "circle"
    }),
    threeMag: L.ExtraMarkers.icon({
      markerColor: "orange",
      shape: "circle"
    }),
    fourMag: L.ExtraMarkers.icon({
      markerColor: "orange-red",
      shape: "circle"
    }),
    fiveMag: L.ExtraMarkers.icon({
        markerColor: "red",
        shape: "circle"
    })
    
  };

var magTrack = infoRes.features
    console.log[magTrack]


    // Create an object to keep of the number of markers in each layer
    var quakeCount = {
      zeroMag: 0,
      oneMag: 0,
      twoMag: 0,
      threeMag: 0,
      fourMag: 0
    };

    // Initialize a quakeMag, which will be used as a key to access the appropriate layers, icons, and station count for layer group
    var quakeMag;

    // Loop through the stations (they're the same size and have partially matching data)
    for (var i = 0; i < magTrack.length; i++) {
      
       

      // Create a new station object with properties of both station objects
      var earthquake = Object.assign({}, magTrack[i]);
      // If a station is listed but not installed, it's coming soon
      if (earthquake.mag <= 1) {
        quakeMag = "zeroMag";
      }
      // If a station has no bikes available, it's oneMag
      else if (earthquake.mag <= 2) {
        quakeMag = "oneMag";
      }
      // If a station is installed but isn't renting, it's out of order
      else if (earthquake.mag <= 3) {
        quakeMag = "twoMag";
      }
      // If a station has less than 5 bikes, it's status is low
      else if (earthquake.mag <= 4) {
        quakeMag = "threeMag";
      }

      else if (earthquake.mag <= 5) {
        quakeMag = "fourMag";
      }
      // Otherwise the station is normal
      else {
        quakeMag = "fiveMag";
      }

      // Update the station count
      quakeCount[quakeMag]++;
      // Create a new marker with the appropriate icon and coordinates
      var newMarker = L.marker([earthquake.geometry[1][0], earthquake.geometry[1][0]], {
        icon: icons[quakeMag]
      });

      // Add the new marker to the appropriate layer
      newMarker.addTo(layers[quakeMag]);

      // Bind a popup to the marker that will  display on click. This will be rendered as HTML
      newMarker.bindPopup(earthquake.title);
    }

    // Call the updateLegend function, which will... update the legend!
    updateLegend(updatedAt, quakeCount);
  });

  var oneMag = {
    radius: 1,
    fillColor: "#7CFC00",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var twoMag = {
    radius: 2,
    fillColor: "#ADFF2F",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var threeMag = {
    radius: 3,
    fillColor: "#FFFF00",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var fourMag = {
    radius: 4,
    fillColor: "#FF4500",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};
var fiveMag = {
    radius: 5,
    fillColor: "#FF0000",
    color: "#000",
    weight: 1,
    opacity: 1,
    fillOpacity: 0.8
};

function onEachFeature(feature, layer) {
    if ((features.properties.mag) <= 1) {
        return oneMag;
    }
    else if ((features.properties.mag) <= 2) {
        return twoMag;
    }
    else if ((features.properties.mag) <= 3) {
        return threeMag;
    }
    else if ((features.properties.mag) <= 4) {
        return fourMag;
    }
    else{
        return fiveMag;
    }
}
// Perform an API call to the Citi Bike Station Information endpoint
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(infoRes) {
    var geojsonFeature = infoRes;
    L.geoJSON(geojsonFeature, {
        onEachFeature: onEachFeature
    }).addTo(map);
});

var layers = {
  zeroMag: new L.LayerGroup()
};
var map = L.map("map-id", {
  center: [40.73, -74.0059],
  zoom: 12,
  layers: [
    layers.zeroMag
  ]
}); 
d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson", function(infoRes) {
    var geojsonFeature = infoRes;
    L.geoJSON(geojsonFeature, {
    onEachFeature: function(feature, layer) {
      layer.bindPopup("<h3>Magnitude: " + feature.properties.mag +"</h3><h3>Location: "+ feature.properties.place +
        "</h3><hr><p>" + new Date(feature.properties.time) + "</p>");
    },
    
    pointToLayer: function (feature, latlng) {
      return new L.circle(latlng,
        {radius: getRadius(feature.properties.mag),
        fillColor: getColor(feature.properties.mag),
        fillOpacity: .6,
        color: "#000",
        stroke: true,
        weight: .8
    })
  }
  }).addTo(map);
});
function getColor(d){
    return d > 5 ? "#a54500":
    d  > 4 ? "#cc5500":
    d > 3 ? "#ff6f08":
    d > 2 ? "#ff9143":
    d > 1 ? "#ffb37e":
             "#ffcca5";
  }

  //Change the maginutde of the earthquake by a factor of 25,000 for the radius of the circle. 
  function getRadius(value){
    return value*25000
  }