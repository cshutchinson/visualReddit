var urlFirstPart = "https://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22",
    urlSecondPart = "%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys",
    urlBetweenCityState = '%2C%20',
    city  = 'denver',
    state = 'co',
    request = '';


$(document).ready(function(){
  $('#submit').on('click', function(){
    city = $('#city').val();
    state = $('#state').val();
    request = urlFirstPart + city + urlBetweenCityState + state + urlSecondPart;

    $.get(request,  function(data){
      $('div.observationInfo').html('\
        <table class="table table-striped table-condensed table-responsive">\
        </table>');
      $('div.astronomy').html('\
        <table class="astronomy table table-striped table-condensed table-responsive">\
          <tr>\
            <th>Sunrise</th>\
            <th>Sunset</th>\
          </tr>\
          <tr>\
            <td id="sunrise"></td>\
            <td id="sunset"></td>\
          </tr>\
        </table>');
      $('div.atmosphere').html('\
        <table class="atmosphere table table-striped table-condensed table-responsive">\
          <tr>\
            <th>Humidity</th>\
            <th>Pressure</th>\
            <th>Trend</th>\
            <th>Visibility</th>\
          </tr>\
          <tr>\
            <td id="humidity"></td>\
            <td id="bp"></td>\
            <td id="bpt"></td>\
            <td id="vis"></td>\
          </tr>\
        </table>');
      $('div.wind').html('\
        <table class="wind  table table-striped table-condensed table-responsive">\
          <tr>\
            <th>Wind Direction</th>\
            <th>Wind Speeed</th>\
            <th>Wind Chill</th>\
          </tr>\
          <tr>\
            <td id="windDirection"></td>\
            <td id="windSpeed"></td>\
            <td id="windChill"</td>\
          </tr>\
        </table>');
      $('div.condition').html('\
        <table class="condition  table table-striped table-condensed table-responsive">\
          <tr>\
            <th>Temperature</th>\
            <th>Observation</th>\
            <th>Conditions</th>\
          </tr>\
          <tr>\
            <td id="temperature"></td>\
            <td id="observation"></td>\
            <td id="observationText"></td>\
          </tr>\
        </table>');
      $('div.outlook').html('\
        <table class="outlook table table-striped table-condensed table-responsive">\
        </table>');

      var base = data.query.results.channel;

      //observation info
      $('div.observationInfo').append('<td>' + base.lastBuildDate + '</td');
      //astronomy
      $('#sunrise').append(base.astronomy.sunrise);
      $('#sunset').append(base.astronomy.sunset);
      //atomosphere
      $('#humidity').append(base.atmosphere.humidity + '%');
      $('#bp').append(base.atmosphere.pressure + ' ' + base.units.pressure);
      $('#bpt').append(base.atmosphere.rising); //steady (0), rising (1), or falling (2)
      $('#vis').append(base.atmosphere.visibility + ' ' + base.units.distance);
      //wind
      $('#windDirection').append(base.wind.direction);
      $('#windSpeed').append(base.wind.speed + ' ' + base.units.speed);
      $('#windChill').append(base.wind.chill + base.units.temperature);
      //current conditions
      var conditionImageUrl = '"http://l.yimg.com/a/i/us/we/52/' +
        base.item.condition.code + '.gif"';
      $('#temperature').append(base.item.condition.temp + base.units.temperature);
      $('#observation').append("<img src=" + conditionImageUrl + "/>");
      $('#observationText').append(base.item.condition.text);
      //five day outlook
      var outlook = base.item.forecast; //outlook is an array with 5 elements
      var conditionImageUrlPrefix = "http://l.yimg.com/a/i/us/we/52/";
      var imagePrefix = '<img src="' + conditionImageUrlPrefix;
      buildTableRow(outlook, 'day', 1, 'table.outlook', '');
      // buildTableRow(outlook, 'date', 1, 'table.outlook', '');
      buildTableRow(outlook, 'high', 0, 'table.outlook', base.units.temperature);
      buildTableRow(outlook, 'code', 0, 'table.outlook', '', '.gif"', imagePrefix, '/>');
      buildTableRow(outlook, 'low', 0, 'table.outlook', base.units.temperature);
    });
  });
});

function buildTableRow(arr, prop, heading, target, unit, imgType, prefix, postfix){
  //heading should be passed as 0 or 1 for appropriate tag
  imgType = imgType || '';
  prefix = prefix || '';
  postfix = postfix || '';

  var openTag=['<td>', '<th>'];
  var closeTag=['</td>', '</th>'];
  var store = '<tr>';

  arr.forEach(function(elem){
    store += openTag[heading] + prefix + elem[prop] + imgType + postfix + unit + closeTag[heading];
  });

  store += '</tr>';
  return($(target).append(store));
}
