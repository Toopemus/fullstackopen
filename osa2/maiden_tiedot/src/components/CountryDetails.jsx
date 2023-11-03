import { useState, useEffect } from "react"
import weatherService from "../services/weatherService"

const Weather = ({city, latitude, longitude}) => {
  const [weatherData, setWeatherData] = useState(null)

  useEffect(() => {
    weatherService
      .getWeather(latitude, longitude)
        .then(response => setWeatherData(response))
  }, [latitude, longitude])

  if (!weatherData) {
    return null
  }

  return (
    <div>
      <h3>Weather in {city}</h3>
      <div>temperature {weatherData.main.temp} °C (feels like {weatherData.main.feels_like} °C)</div>
      <img src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
      <div>wind speed {weatherData.wind.speed} m/s</div>
    </div>
  )
}

const CountryDetails = ({ country }) => {
  return (
    <div>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital}</div>
      <div>area {country.area} km²</div>
      <div>population {country.population}</div>

      <h3>languages:</h3>
      <ul>
        {Object.values(country.languages).map(language =>
          <li key={language}>{language}</li>
        )}
      </ul>

      <img src={country.flags.png} alt={country.flags.alt} />

      <Weather city={country.capital} latitude={country.capitalInfo.latlng[0]} longitude={country.capitalInfo.latlng[1]}/>
    </div>
  )
}

export default CountryDetails
