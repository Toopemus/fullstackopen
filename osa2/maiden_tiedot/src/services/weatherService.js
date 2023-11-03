import axios from "axios";

const url = 'https://api.openweathermap.org/data/2.5'
const apiKey = import.meta.env.VITE_WEATHER_API_KEY

const getWeather = (latitude, longitude) => {
  return axios.get(`${url}/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`).then(response => response.data)
}

export default { getWeather }
