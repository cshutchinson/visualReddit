var urlFirstPart = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22"
var urlSecondPart = "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";
var city  = 'florence';

var urlBetweenCityState = '%2C%20';

var state = 'sc';

var urlFinalPart = "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys";


var request = urlFirstPart + city + urlBetweenCityState + state + urlSecondPart;

  $.get(request,  function(data){
    console.log(data);
  });
