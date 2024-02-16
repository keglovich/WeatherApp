const container = document.querySelector('.container');
const search = document.querySelector('.search-box button');
const weatherBox = document.querySelector('.weather-box');
const weatherDetails = document.querySelector('.weather-details');
const error404 = document.querySelector('.not-found');

search.addEventListener('click', clickHandle);
document.addEventListener('keyup', keyHandle);

function clickHandle() {
   fetchData();
}

function keyHandle(event) {
   if (event.key === 'Enter') {
      fetchData();
   }
}

function fetchData() {
   const APIKey = '1bbefdb523b44d4cb212e857775024ff';
   const city = document.querySelector('.search-box input').value;

   if (city === '') {
      resetApp();
      return;
   }

   fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${APIKey}`
   )
      .then((response) => response.json())
      .then((json) => {
         if (json.cod === '404') {
            showError();
            return;
         }

         updateWeather(json);
      });
}

function showError() {
   resetApp();
   container.style.height = '400px';
   weatherBox.style.display = 'none';
   weatherDetails.style.display = 'none';
   error404.style.display = 'block';
   error404.classList.add('fadeIn');
}

function updateWeather(json) {
   resetApp();
   error404.style.display = 'none';
   error404.classList.remove('fadeIn');

   const image = document.querySelector('.weather-box img');
   const temperature = document.querySelector('.weather-box .temperature');
   const description = document.querySelector('.weather-box .description');
   const humidity = document.querySelector('.weather-details .humidity span');
   const wind = document.querySelector('.weather-details .wind span');

   switch (json.weather[0].main) {
      case 'Clear':
         image.src = 'images/clear.png';
         break;
      case 'Rain':
         image.src = 'images/rain.png';
         break;
      case 'Snow':
         image.src = 'images/snow.png';
         break;
      case 'Clouds':
         image.src = 'images/cloud.png';
         break;
      case 'Haze':
         image.src = 'images/mist.png';
         break;
      default:
         image.src = '';
   }

   temperature.innerHTML = `${parseInt(json.main.temp)}<span>°C</span>`;
   description.innerHTML = `${json.weather[0].description}`;
   humidity.innerHTML = `${json.main.humidity}%`;
   wind.innerHTML = `${parseInt(json.wind.speed)} Km/h`;

   weatherBox.style.display = '';
   weatherDetails.style.display = '';
   weatherBox.classList.add('fadeIn');
   weatherDetails.classList.add('fadeIn');
   container.style.height = '590px';
}

function resetApp() {
   container.style.height = '';
   weatherBox.style.display = 'none';
   weatherDetails.style.display = 'none';
   error404.style.display = 'none';
}
