var earthquakes;

var points;

var mult = 0.05;

function preload() {
  earthquakes = loadStrings("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/2.5_month.csv");

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
    var magnitude = data[4];
    if (!isNaN(parseFloat(latitude)) && !isNaN(parseFloat(longitude))) {
      addPoint(longitude, latitude, magnitude);
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
    var s = pow(10, marker.geometry.mag / 2) * mult;
    el.setAttribute("style", "width:" + s + "px;height:" + s + "px");


    // make a marker for each feature and add to the map
    new mapboxgl.Marker(el)
      .setLngLat(marker.geometry.coordinates)
      .setPopup(new mapboxgl.Popup({
          offset: 3000
        }) // add popups
        .setHTML('<h3>' + marker.properties.title + '</h3><p>' + marker.properties.description + '</p>'))
      .addTo(map);
  });


  function addPoint(lon, lat, m) {
    points.push({
      type: 'Feature',
      geometry: {
        type: 'Point',
        coordinates: [lon, lat],
        mag: m
      },
      properties: {
        title: lat + ", " + lon,
        description: ' '
      }
    });
  }

}
