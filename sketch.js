var earthquakes;

var points;

function preload() {
  earthquakes = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.csv");

}

function setup() {
  mapboxgl.accessToken = "pk.eyJ1Ijoicmt1aGwiLCJhIjoiY2pmZWc4ZHZlMm9rajN1bXpnMDFqeWV5diJ9.IsGCAMUslYfZKzOEVjR7Jw";

  points = [];

  /* Map: This represents the map on the page. */
  var map = new mapboxgl.Map({
    container: "map",
    style: "mapbox://styles/mapbox/dark-v9",
    zoom: 0,
    center: [0, 0]
  });


  for (var i = 0; i < earthquakes.length; i++) {
    var data = earthquakes[i].split(/,/);
    var latitude = data[1];
    var longitude = data[2];
    addPoint(longitude, latitude);
  }

  map.on("load", function() {
    /* Image: An image is loaded and added to the map. */
    map.loadImage("Images/earthquake.png", function(error, image) {
      if (error) throw error;
      map.addImage("custom-marker", image);
      /* Style layer: A style layer ties together the source and image and specifies how they are displayed on the map. */
      map.addLayer({
        id: "earthquakes",
        type: "symbol",
        /* Source: A data source specifies the geographic coordinate where the image marker gets placed. */
        source: {
          type: "geojson",
          data: {
            type: "FeatureCollection",
            features: points
          }
        },
        layout: {
          "icon-image": "custom-marker",
        }
      });
    });
  });


  function addPoint(lon, lat) {
    points.push({
      "type": "Feature",
      "geometry": {
        "type": "Point",
        "coordinates": [lon, lat]
      },
      "properties": {
        "title": lon + ", " + lat,
        "description": lon + ", " + lat
      }
    });
  }

}
