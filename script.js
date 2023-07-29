//

const date = new Date();

const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
];
const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
];

const city = "New York";

function dateString() {
    const month = date.getMonth();
    const weekday = date.getDay();
    const day = date.getDate();

    return `${days[weekday]}, ${months[month]} ${day}`;
}

document.querySelector(".date").textContent = dateString();

async function getForecast(city) {
    const response = await fetch(
        `https://api.weatherapi.com/v1/forecast.json?key=7c3dbdd2ab824f158e8153626232907&q=${city}&days=3&aqi=no&alerts=no`
    );

    const weatherData = await response.json();

    const myData = {
        current: {
            temp_c: weatherData.current.temp_c,
            temp_f: weatherData.current.temp_f,
            condition: weatherData.current.condition.text,
            wind_mph: weatherData.current.wind_mph,
            humidity: weatherData.current.humidity,
            daily_chance_of_rain:
                weatherData.forecast.forecastday[0].day.daily_chance_of_rain,
        },

        forecast: {
            forecastday: [
                {
                    maxtemp_c:
                        weatherData.forecast.forecastday[0].day.maxtemp_c,
                    maxtemp_f:
                        weatherData.forecast.forecastday[0].day.maxtemp_f,
                    mintemp_c:
                        weatherData.forecast.forecastday[0].day.mintemp_c,
                    mintemp_f:
                        weatherData.forecast.forecastday[0].day.mintemp_f,
                    condition:
                        weatherData.forecast.forecastday[0].day.condition.text,
                },
                {
                    maxtemp_c:
                        weatherData.forecast.forecastday[1].day.maxtemp_c,
                    maxtemp_f:
                        weatherData.forecast.forecastday[1].day.maxtemp_f,
                    mintemp_c:
                        weatherData.forecast.forecastday[1].day.mintemp_c,
                    mintemp_f:
                        weatherData.forecast.forecastday[1].day.mintemp_f,
                    condition:
                        weatherData.forecast.forecastday[1].day.condition.text,
                },
                {
                    maxtemp_c:
                        weatherData.forecast.forecastday[2].day.maxtemp_c,
                    maxtemp_f:
                        weatherData.forecast.forecastday[2].day.maxtemp_f,
                    mintemp_c:
                        weatherData.forecast.forecastday[2].day.mintemp_c,
                    mintemp_f:
                        weatherData.forecast.forecastday[2].day.mintemp_f,
                    condition:
                        weatherData.forecast.forecastday[2].day.condition.text,
                },
            ],
        },
    };

    // Set temperature
    const bigTemperature = document.querySelector(".temp > h1");
    bigTemperature.textContent = `${myData.current.temp_f} °`;

    // Set condition
    const condition = document.querySelector(".weather-status");
    condition.textContent = myData.current.condition;

    // Set windspeed
    const windSpeed = document.querySelector("#wind-speed");
    windSpeed.textContent = `${myData.current.wind_mph} mph`;

    // Set humidity
    const humidity = document.querySelector("#humidity");
    humidity.textContent = `${myData.current.humidity}%`;

    // Set rain %
    const rainChance = document.querySelector("#rain-chance");
    rainChance.textContent = `${myData.current.daily_chance_of_rain}%`;

    // Set days of week
    document.querySelector("#one-day > .day-week").textContent =
        days[(date.getDay() + 1) % 7];
    document.querySelector("#two-day > .day-week").textContent =
        days[(date.getDay() + 2) % 7];

    // Set temperatures
    const lowTemps = document.querySelectorAll(".temp-low");
    const highTemps = document.querySelectorAll(".temp-high");
    const forecasts = document.querySelectorAll(".forecast");

    const wIcons = document.querySelectorAll(".w-icon");
    wIcons.forEach((icon) => {
        icon.remove();
    });

    for (let i = 0; i < 3; i++) {
        lowTemps[i].textContent =
            Math.floor(myData.forecast.forecastday[i].mintemp_f) + "°";
        highTemps[i].textContent =
            Math.floor(myData.forecast.forecastday[i].maxtemp_f) + "°";

        let conditions = myData.forecast.forecastday[i].condition;

        let newIcon = document.createElement("img");
        newIcon.classList.add("w-icon");

        if (conditions.includes("sun")) {
            newIcon.classList.add("sunny");
            newIcon.src = "./assets/sunny.svg";
        } else if (conditions.includes("cloud")) {
            newIcon.classList.add("cloudy");
            newIcon.src = "./assets/cloudy.svg";
        } else {
            newIcon.classList.add("rainy");
            newIcon.src = "./assets/rainy.svg";
        }

        forecasts[i].append(newIcon);
    }
}

a = getForecast(city);


// Search for new city
const textInput = document.querySelector("#city-input");
textInput.addEventListener("keydown", (event) => {
    if (event.key == "Enter") {
        try {
            getForecast(textInput.value);
        }
        catch(err) {
            console.log("err")
        }
    }
})