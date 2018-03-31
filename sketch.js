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
    if (!isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude))) {
      addPoint(longitude, latitude);
    }
  }

  var geojson = {
    type: 'FeatureCollection',
    features: points
  };

  geojson.features.forEach(function(marker) {

    // create a HTML element for each feature
    var el = document.createElement('div');
    el.className = 'marker';


    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({
          offset: 25
        }) // add popups
        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
      .addTo(map);
  });

  document.getElementsByClassName("marker");


  function addPoint(lon, lat) {
    points.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lon, lat]
      },
      properties: {
        title: lat + ", " + lon,
        description: ' '
      }
    });
  }

}
