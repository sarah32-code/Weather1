const cities = [
    { name: "Benbrook, TX", latitude: 32.6732, longitude: -97.4606 },
    { name: "Austin, TX", latitude: 30.2672, longitude: -97.7431 },
    { name: "New York, NY", latitude: 40.7128, longitude: -74.0060 },
    { name: "Los Angeles, CA", latitude: 34.0522, longitude: -118.2437 },
    { name: "Chicago, IL", latitude: 41.8781, longitude: -87.6298 },
    { name: "Houston, TX", latitude: 29.7604, longitude: -95.3698 },
    
];
const citySelect = document.getElementById('cities');

window.onload = CitySelect;
// loop for each of the points in the array and add them to the array as they are added to the array
function CitySelect() {
    for (let i = 0; i < cities.length; i++) {
        let option = document.createElement('option');
        option.value = cities[i].name;
        option.textContent = cities[i].name;
        citySelect.appendChild(option);
    }

    citySelect.addEventListener('change', CityChange);
}


// Handle city change event when city selection changes from one city to another city
function CityChange(event) {
    const selectedCityName = event.target.value;
    const selectedCity = cities.find(city => city.name === selectedCityName);

    if (selectedCity) {
        const stationLookupUr = `https://api.weather.gov/points/${selectedCity.latitude},${selectedCity.longitude}`;
        fetch(stationLookupUr)
            .then(response => response.json())
            .then(stationData => {
                const weatherUrl = stationData.properties.forecast;
                getWeather(weatherUrl);
            })
            
        
    }
}

// Fetching weather information from weather service for selected city 
function getWeather(weatherUrl) {
    fetch(weatherUrl)
        .then(response => response.json())
        .then(weatherData => {
            const forecastArray = weatherData.properties.periods;
            displayWeather(forecastArray);
        })
}

// Displaying weather information from weather service for selected city
function displayWeather(forecastArray) {
    const weatherTableBody = document.querySelector('#weatherTable tbody');
    weatherTableBody.innerHTML = '';

    forecastArray.forEach(forecast => {
        const row = `
            <tr>
                <td>${forecast.name}</td>
                <td>${forecast.temperature} ${forecast.temperatureUnit}</td>
                <td>${forecast.windDirection} ${forecast.windSpeed}</td>
                <td>${forecast.shortForecast}</td>
            </tr>
        `;
        weatherTableBody.innerHTML += row;
    });
}
