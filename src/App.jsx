import { useEffect, useState } from "react";
import "./App.css";
import sunny from "./images/sun.png";
import rainWithCloud from "./images/rainWithCloud.png";
import rain from "./images/thunder.png";
import haze from "./images/tornado.png";

function App() {
  const [city, setCity] = useState("New Delhi");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const currentDate = new Date();
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
  const month = months[currentDate.getMonth()];
  const day = currentDate.getDate();
  const year = currentDate.getFullYear();

  const formattedDate = `${month} ${day},${year}`;

  const API_KEY = "bcda10ba323e88e96cb486015a104d1d";

  const fetchWeatherData = async () => {
    try {
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );

      const data = await response.json();
      console.log(data);
      setWeatherData(data);
    } catch (error) {
      console.log("Error fetching weather data:", error);
    }
  };
  useEffect(() => {
    fetchWeatherData();
  }, []);
  const handleInputChange = (event) => {
    setCity(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    fetchWeatherData();
  };

  const getWeatherIconUrl = (main) => {
    console.log(main);
    switch (main) {
      case "Clear":
        return sunny; // Path to your sunny weather icon
      case "Clouds":
        return rainWithCloud; // Path to your rainy weather icon
      case "Rain":
        return rain; // Path to your snowy weather icon
      case "Haze":
        return haze; // Path to your haze weather icon
      // Add more cases for other weather conditions as needed
      default:
        return null;
    }
  };
  return (
    <div className="App">
      <div className="container">
        {weatherData && (
          <>
            <h1 className="container_date">{formattedDate}</h1>
            <div className="weather_data">
              <h2 className="container_city">{weatherData.name}</h2>
              <img
                className="container_img"
                src={getWeatherIconUrl(weatherData.weather[0].main)}
                width="100px"
                height="100px"
                alt="icon"
              />
              <div className="main-container">
                <h2 className="container_degree">{weatherData.main.temp}</h2>
                <div className="degree_icon"></div>
                <span>C</span>
              </div>

              <h2 className="country_per">{weatherData.weather[0].main}</h2>
              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  className="input"
                  placeholder="Enter city name"
                  value={city}
                  onChange={handleInputChange}
                  required
                />
                <button type="submit">Get</button>
              </form>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
