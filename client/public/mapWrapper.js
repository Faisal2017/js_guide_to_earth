var earth;
var options;

var renderMap = function() {
  options = { zoom: 4.0, position: [55.9533, 3.1883] };
  earth = new WE.map('earth_div', options); 
  WE.tileLayer("http://tileserver.maptiler.com/nasa/{z}/{x}/{y}.jpg", {
    minZoom: 0,
    maxZoom: 5,
    attribution: "NASA"
  }).addTo(earth);
  console.log(earth)
  earth.on("click", addMarker)
}

var addMarker = function(evt) {
  if (evt.latitude !== null && evt.longitude !== null) {
    var marker = WE.marker([evt.latitude, evt.longitude]).addTo(earth)
    console.log(evt.latlng) //console logs long and lat
    countriesSearch(evt)
  };
}

var countriesSearch = function(evt) {
  searchCity(evt);

  var geocoder = new google.maps.Geocoder;
  geocoder.geocode({ 'location': evt.latlng}, function(results, status){
    var single = results[results.length - 1];
    console.log(single.formatted_address)
  // display = results[0].formatted_address;
  // split = display.split(",")
  // console.log(split[split.length - 1]);
  });
}

var searchCity = function(evt) {
  // console.log(evt);
  var url = "https://api.teleport.org/api/locations/" + evt.latitude + "," + evt.longitude;
  // var url = "https://api.teleport.org/api/locations/37.77493,-122.41942";
  makeRequest(url, requestComplete);
}

var makeRequest = function(url, callback) {
  var request = new XMLHttpRequest();
  request.addEventListener('load', callback);
  request.open("GET", url);
  request.send();
}

var requestComplete = function() {
  if (this.status !== 200) return;

  var jsonString = this.responseText;
  var nearCity = JSON.parse(jsonString);
  console.log(nearCity._embedded);
}