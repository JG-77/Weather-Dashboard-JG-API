var apiKey = '55a9555759d9fcad973a8dd20ec8edde';
var citySearch = document.getElementById('citySearch');
var searchButton = document.getElementById('searchBtn');
var cityNameHeader = document.getElementById('cityName');
var currentDate = document.getElementById('todayDate');
var temperatureEl = document.getElementById('temperature');
var humidityEl = document.getElementById('humidity');
var windEl = document.getElementById('wind');
var uviEl = document.getElementById('uvi');
var forecastContainer = document.getElementById('forecast-conatiner');
var sidebar = document.getElementById('sidebar');
var clearBtn = document.getElementById('clear');

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
                var weatherIcon = data.current.weather[0].icon;
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
          for(i = 0; i < 33; i = i + 8) {
            var forecastDate = data.list[i].dt_txt.slice(0,10);
            var forecastTemp = data.list[i].main.temp;
            var forecastHum = data.list[i].main.humidity;
            var forecastIcon = data.list[i].weather[0].icon;
            var icon = document.createElement("img");
            icon.src = 'https://openweathermap.org/img/wn/' + forecastIcon + '@2x.png';

            var forecastDiv = document.createElement('div');
            var forecastHeader = document.createElement('h3');
            forecastDiv.classList = 'card-body font-weight-bolder border border-dark d-inline-block text-white bg-primary m-1';
            forecastHeader.textContent = forecastDate;
            forecastContainer.appendChild(forecastDiv);
            forecastDiv.appendChild(forecastHeader);

            var tempInfo = document.createElement('p');
            tempInfo.textContent = 'Temperature: ' + forecastTemp + ' °F';
            forecastDiv.appendChild(tempInfo);

            var humidInfo = document.createElement('p');
            humidInfo.textContent = 'Humidity: ' + forecastHum + '%';
            forecastDiv.appendChild(humidInfo);
            forecastDiv.appendChild(icon);
          }
        })
      }
    })
}

function showHistory() {
  var citySearchValue = citySearch.value;
  var apiLocation = 'https://api.openweathermap.org/data/2.5/weather?q=' + citySearchValue + '&appid=' + apiKey;
    
  fetch(apiLocation)
    .then(function (response) {
      if (response.ok) {
        response.json().then(function (data) {
          var cityName = data.name;
          localStorage.setItem(citySearchValue, cityName);

          var historyEl = document.createElement('li');
          var cityLink = document.createElement('a');
          historyEl.appendChild(cityLink)
          historyEl.classList = 'bg-secondary border border-dark text-white list-group-item';
          cityLink.textContent = localStorage.getItem(citySearchValue);
          cityLink.setAttribute('href', apiLocation);
          cityLink.classList = 'text-white';
          sidebar.appendChild(historyEl);
         
          //localStorage.getItem(citySearchValue, cityName);
          //console.log(data.name);
          //console.log (localStorage.getItem(citySearchValue, cityName));
        })
      }

    })
}

function checkStorage() { // how do I get it to read local storage??
  var citySearchValue = citySearch.value;
  if(localStorage.getItem(citySearchValue)) {
    var historyEl = document.createElement('li');
    var cityLink = document.createElement('a');
    historyEl.appendChild(cityLink)
    historyEl.classList = 'bg-secondary border border-dark text-white list-group-item';
    cityLink.textContent = localStorage.getItem(citySearchValue);
    sidebar.appendChild(historyEl);
  } else {
    console.log('local storage empty');
  }

}
checkStorage();

function runAPIs() {
getData();
fiveDayForecast();
showHistory();
};

searchButton.addEventListener('click', runAPIs); 

