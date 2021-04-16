var apiKey = '55a9555759d9fcad973a8dd20ec8edde';
//api.openweathermap.org/data/2.5/weather?q={city name}&appid={API key} -->lon and lat api
//https://api.openweathermap.org/data/2.5/onecall?lat={lat}&lon={lon}&exclude={part}&appid={API key} --> one call api
var citySearch = document.getElementById('citySearch');
var searchButton = document.getElementById('searchBtn');
var cityNameHeader = document.getElementById('cityName');
var currentDate = document.getElementById('todayDate');
var temperatureEl = document.getElementById('temperature');
var humidityEl = document.getElementById('humidity');
var windEl = document.getElementById('wind');
var uviEl = document.getElementById('uvi');

function getData() {
  var citySearchValue = citySearch.value;
  var apiLocation = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearchValue + '&appid=' + apiKey;
    
  fetch(apiLocation)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var lat = data.coord.lat;
          var lon = data.coord.lon;
          var tempKelvin = data.main.temp;  
          var tempFahrenheit = (1.8 * (tempKelvin - 273) +32).toFixed(2); 
          var humidity = data.main.humidity;
          var windSpeed = data.wind.speed;
          var cityName = data.name;
          var currently = moment().format('MMM DD, YYYY');
          
          temperatureEl.textContent = 'Temperature: ' + tempFahrenheit + ' °F';
          humidityEl.textContent = 'Humidity: ' + humidity + '%';
          windEl.textContent = 'Wind Speed: ' + windSpeed + ' MPH';
          cityNameHeader.style.color = 'blue';
          cityNameHeader.textContent = cityName + ' - ' + currently;
          //second API call
          var apiUVI = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat +'&lon=' + lon + '&appid=' + apiKey;
          fetch(apiUVI)
          .then(function (response) {
            if (response.ok) {
              response.json().then(function (data) {
                var uvi = data.current.uvi;
                var weatherIcon = data.current.weather[0].icon; //how do I get icon to display?
                var icon = document.createElement("img");
                icon.src = 'https://openweathermap.org/img/wn/' + weatherIcon + '@2x.png';
                cityNameHeader.append(icon);
                uviEl.textContent = uvi;
              // if statements for uv index condition colors
                if (uvi <= 2) {
                  uviEl.setAttribute('class', 'bg-success text-white');
                  console.log('Weather conditions are favorable.');
                } else if (3 <= uvi && uvi<= 5) {
                  uviEl.setAttribute('class', 'bg-warning text-white');
                  console.log('Weather conditions are moderate.');
                } else {
                  uviEl.setAttribute('class', 'bg-danger text-white');
                  console.log('Weather conditions are severe.');
                }
              }
              )}
            })
            //second call ends here
          });
        } else {
          cityNameHeader.style.color = 'red';
          cityNameHeader.textContent = "Error! (400) Please type in a city name";
          console.error('You need to enter a valid search input value!');
          return;
        }

      })

}

function fiveDayForecast() {
  var citySearchValue = citySearch.value;
  var api5Day = 'https://api.openweathermap.org/data/2.5/forecast?q=' + citySearchValue + '&appid=' + apiKey + '&units=imperial';

  fetch(api5Day)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var day1Forecast = data.list[0].dt_txt
          var day2Forecast = data.list[8].dt_txt
          var day3Forecast = data.list[16].dt_txt
          var day4Forecast = data.list[24].dt_txt
          var day5Forecast = data.list[32].dt_txt

          console.log(data);
          console.log(day1Forecast);
          console.log(day2Forecast);
          console.log(day3Forecast);
          console.log(day4Forecast);
          console.log(day5Forecast);

        })
      }
    })


}

function runAPIs() {
getData();
fiveDayForecast();
};

searchButton.addEventListener('click', runAPIs); 

