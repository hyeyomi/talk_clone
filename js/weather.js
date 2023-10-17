const API_KEY = 'b6a13fedb553fba629313191fb403b0e';

function onWeater(position) {
  const lat = position.coords.latitude;
  const lon = position.coords.longitude;
  const url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      const weather = document.querySelector('#weather');
      weather.innerText = `${data.weather[0].main}`;
      const temp = document.querySelector('#temp');
      temp.innerText = `${Math.floor(data.main.temp)}℃`;
      const weatherIcon = document.querySelector('#icon');
// Cloud, Clear, Rain
      const weather_icon = weather.innerText;
      if (weather_icon == 'Clouds') {
        weatherIcon.className = 'fa-solid fa-cloud fa-lg';
      }
      else if(weather_icon == 'Rain'){
        weatherIcon.className = "fa-solid fa-cloud-rain";
      }
      else if(weather_icon == 'Clear'){
        weatherIcon.className = "fa-solid fa-sun";
      }
      
      
    });
}

function onWeatherError() {
  console.log('ERROR');
}

//getCurrentPosition 메서드는 위치 조회에 동의했다면 position 객체를 반환함. position객체를 통해서 위치정보를 사용할 수 있다.
navigator.geolocation.getCurrentPosition(onWeater, onWeatherError);
