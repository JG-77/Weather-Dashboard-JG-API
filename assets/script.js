var apiKey = '55a9555759d9fcad973a8dd20ec8edde';
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} -->lon and lat api
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} --> one call api
var citySearch = document.getElementById('citySearch');
var searchButton = document.getElementById('searchBtn');
var temperatureEl = document.getElementById('temperature');
var humidityEl = document.getElementById('humidity');
var windEl = document.getElementById('wind');
var uviEl = document.getElementById('uvi');

console.log(citySearch);

function getLatandLon() {
  var citySearchValue = citySearch.value;
  var apiLocation = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearchValue + '&appid=' + apiKey;
    

  fetch(apiLocation)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var lat = data.coord.lat;
          var lon = data.coord.lon;
          var tempKelvin = data.main.temp;
          var tempFahrenheit = 1.8 * (tempKelvin - 273) +32; 
          var humidity = data.main.humidity;
          var windSpeed = data.wind.speed;
          
          temperatureEl.textContent = 'Temperature: ' + tempFahrenheit;
          humidityEl.textContent = 'Humidity: ' + humidity;
          windEl.textContent = 'Wind Speed: ' + windSpeed;
            console.log(response);
            console.log(data);
            console.log(lat);
            console.log(lon);
            console.log(tempFahrenheit);
            console.log(humidity);
            console.log(windSpeed);
          });
        } 
        
      })

}


searchButton.addEventListener('click', getLatandLon); 

