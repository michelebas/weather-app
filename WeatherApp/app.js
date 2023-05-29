
const weatherLocation = document.querySelector('.location-timezone');
const weatherTemperature = document.querySelector('.temperature-degree');
const weatherIcon = document.querySelector('.weather-icon');
const weatherDescription = document.querySelector('.temperature-description')

const rootElement = document.documentElement;


window.navigator.geolocation.getCurrentPosition(onSuccess, onError);

function onError(error) {
    console.error(error);
    weatherLocation.innerText = 'Devi attivare la geolocalizazione';
  }
  


function onSuccess(position){
    console.log(position);
  
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const apiKey = '448b6156311cc251dd6d69795d309187';
    const language = 'it';
    const units = 'metric';
    const endpoint = 'https://api.openweathermap.org/data/2.5/weather';
  
  
    const api = `${endpoint}?lon=${longitude}&lat=${latitude}&units=${units}&lang=${language}&appid=${apiKey}`;

    fetch(api)
    .then(function (response) {

      const data = response.json();
      return data;
    })
    .then(function (data) {
      console.log(data);


      const locationName = data.name;
      const temperature = Math.floor(data.main.temp);
      const description = data.weather[0].description;
      const iconCode = data.weather[0].icon;

      
      weatherLocation.innerText = locationName;
      weatherTemperature.innerText = `${temperature}°`;
      weatherIcon.src = `images/${iconCode}.png`;
      weatherDescription.innerHTML = description;

      rootElement.classList.remove('js-loading');
    })
}

function getDescription(iconCode) {
  const description = {
  }

  return description[iconCode];
}
    