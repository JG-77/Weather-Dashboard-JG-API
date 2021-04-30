# Weather-Dashboard-JG-API

Github Repo: https://github.com/JG-77/Weather-Dashboard-JG-API.git

Github Pages URL: https://jg-77.github.io/Weather-Dashboard-JG-API/

![Weather Dash Homepage](https://user-images.githubusercontent.com/76461629/116637357-888a3400-a918-11eb-9382-6f39fbb61f0d.png)

![Weather Dash Screenshot](https://user-images.githubusercontent.com/76461629/115128337-ff771280-9f91-11eb-9f11-d7770a8b7a40.png)

## Description 

The Weather Dash application allows users to search up cities and get the current weather along with a 5-day forecast. The user will be able to see temperatures, humidity, weather icons, the date of forecasts, and the current uv index. User's valid searches will display on the search history under the search bar section, and this history can be cleared with the click of the 'clear' button. All weather information is called using the Open Weather API documentation to help make this functionality possible.

## Technologies

### HTML 

* Header element to display application name and slogan
* Sidebar form for city search-up
* Container elements to display current weather and five-day forecast

### CSS

* Conatiner,header, and sidebar element styling

### Bootstrap

* Button and search form styling for sidebar
* Jumbotron header styling
* Section element styling for containers

### JavaScript

* API fetch for current weather data
* Second API fetch for UV Index information
* If statements for uv index condition colors
* API fetch for 5 day forecast
* Loop for the 5 day forecast cards
* Function for search history items and saves to local storage
* Loop for creating search history button elements
* Function for displaying local storage searches upon page refresh
* Function to clear local storage and history elelements
* Event listeners for search button and clear button

### Moment.JS

* JavaScript variable for displaying current date

## Contact 

Jessie Guadarrama: <jesguadarrama98@gmail.com>

## Licenses

The MIT License (MIT)

Copyright (c) 2011-2018 Twitter, Inc.

Copyright (c) 2011-2018 The Bootstrap Authors

Copyright (c) JS Foundation and other contributors

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
