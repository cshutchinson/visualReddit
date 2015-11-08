var urlFirstPart = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22",
    urlSecondPart = "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    urlBetweenCityState = '%2C%20',
    city  = 'denver',
    state = 'co',
    request = '';


$(document).ready(function(){
  $('#submit').on('click', function(){
    // console.log('click');
    city = $('#city').val();
    state = $('#state').val();
    request = urlFirstPart + city + urlBetweenCityState + state + urlSecondPart;
    // console.log(result);
    $.get(request,  function(data){
      var base = data.query.results.channel;
      console.log(data.query.results.channel);
      //observation info
      $('#observationInfo').append(base.lastBuildDate);
      //astronomy
      $('#sunrise').append(base.astronomy.sunrise);
      $('#sunset').append(base.astronomy.sunset);
      //atomosphere
      $('#humidity').append(base.atmosphere.humidity + '%');
      $('#bp').append(base.atmosphere.pressure + ' ' + base.units.pressure);
      $('#bpt').append(base.atmosphere.rising);
      $('#vis').append(base.atmosphere.visibility + ' ' + base.units.distance);
      //wind
      $('#windDirection').append(base.wind.direction);
      $('#windSpeed').append(base.wind.speed + ' ' + base.units.speed);
      $('#windChill').append(base.wind.chill + base.units.temperature);
    });
  });
});
