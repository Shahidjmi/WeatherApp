const apiKey = "5ac1e8d9f8db3ca86b702b15790d8c46"

// const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`

const weatherDataEl = document.getElementById("weatherData")

const cityInputEl = document.getElementById("city-input")

const formEl = document.querySelector("form")

formEl.addEventListener("submit", (event) =>{
    event.preventDefault();
    const city = cityInputEl.value;
    getWeatherData(city)
})

async function getWeatherData(city) {
    try {
        const response = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`)
        if(!response.ok){
            throw new Error("something went wrong")
           
        }
        const data = await response.json();
        console.log(data)
        const temprature = Math.round(data.main.temp)
        const description = data.weather[0].description
        const icon = data.weather[0].icon
        const details = [
            `Feels like : ${Math.round(data.main.feels_like)}`,
            `Humidity : ${data.main.humidity} %`,
            `Wind Speed : ${data.wind.speed} m/s`
        ]

        weatherDataEl.querySelector(".icon").innerHTML = `<img src="http://openweathermap.org/img/wn/${icon}.png" alt="weatherIcon">`
        weatherDataEl.querySelector(".temprature").textContent = `${temprature}°C`;
        weatherDataEl.querySelector(".description").textContent = `${description}`;
        weatherDataEl.querySelector(".details").innerHTML = details.map(detail => `<div>${detail}</div>`).join("")

    
    } catch (error) {
       
        weatherDataEl.querySelector(".icon").innerHTML =""
        weatherDataEl.querySelector(".temprature").textContent = "";
        weatherDataEl.querySelector(".description").textContent = "An error occurred, Please try again";
        weatherDataEl.querySelector(".details").innerHTML = ""

    }
}