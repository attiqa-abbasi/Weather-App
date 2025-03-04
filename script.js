const apiKey = "e3cf5022c27eda1b396f8ff3cbb3b6ea";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchCity = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

const weatherIcons = {
    Clouds: "images/clouds.png",
    Rain: "images/rain.png",
    Clear: "images/clear.png",
    Drizzle: "images/drizzle.png",
    Mist: "images/mist.png",
    Smoke: "images/smoke.png",
    Haze: "images/smoke.png",
    Snow: "images/snow.png"
};

async function checkWeather(city) {
    if (!city) {
        alert("Please enter a city name.");
        return;
    }

    try {
        const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);

        if (!response.ok) {
            throw new Error("City not found");
        }

        const data = await response.json();

        document.querySelector(".city").textContent = data.name;
        document.querySelector(".temp").textContent = Math.round(data.main.temp) + "°C";
        document.querySelector(".humidity").textContent = data.main.humidity + "%";
        document.querySelector(".wind").textContent = data.wind.speed + " km/h";

        weatherIcon.src = weatherIcons[data.weather[0].main] || "images/default.png";
        console.log(data.weather[0].main);

        document.querySelector(".error").style.display = "none";
        document.querySelector(".weather").style.display = "block";
    } catch (error) {
        document.querySelector(".error").style.display = "block";
        document.querySelector(".weather").style.display = "none";
    }
}

searchBtn.addEventListener("click", () => checkWeather(searchCity.value));

searchCity.addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
        checkWeather(searchCity.value);
    }
});
