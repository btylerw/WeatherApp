import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import type { Location, ForecastData, ForecastItem } from './types'
import WeatherCard from './components/WeatherCard'
import './App.css'

function App() {
  // TODO: Write aggregate function to find max/min temp for each day and display info for closest time
  // Try to use user's location data to automatically display current location data
  const [geoData, setGeoData] = useState<Location | null>(null);
  const [weatherData, setWeatherData] = useState<ForecastData | null>(null);
  const [units, setUnits] = useState<'metric' | 'imperial' | 'standard'>('metric');
  const [loading, setLoading] = useState<boolean>(true);
  const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

  useEffect(() => {
    if (!geoData) {
      return;
    }

    getWeatherData(geoData.lat, geoData.lon);
  }, [geoData, units]);

  const getWeatherData = async (lat: number, lon: number) => {
    try {
      setLoading(true);
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${apiKey}`
      );
      const data: ForecastData = await response.json();
      // Check for closest time to display that first
      //const date = Math.floor(Date.now() / 1000);
      const date = new Date().getTime();
      const apiDate = new Date(data.list[0].dt_txt).getTime();
      console.log("Our datetime: ", date)
      console.log("API datetime: ", apiDate)
      setWeatherData(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  // TODO: Write function to parse data from API to split up data into separate days appropriately.
  // data.list[0] will always be the most recent weather info
  const parseWeatherData = (data: ForecastData) => {
    
  }

  return (
    <>
      <div className="flex items-center justify-center gap-4">
        <button
          onClick={() => setUnits('metric')}
          className={`px-4 py-2 rounded ${
            units === 'metric' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          °C
        </button>

        <button
          onClick={() => setUnits('imperial')}
          className={`px-4 py-2 rounded ${
            units === 'imperial' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          °F
        </button>

        <button
          onClick={() => setUnits('standard')}
          className={`px-4 py-2 rounded ${
            units === 'standard' 
              ? 'bg-blue-600 text-white' 
              : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
          }`}
        >
          K
        </button>
      </div>

      <SearchBar 
        setGeoData={setGeoData}
      />

      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <h1 className='text-4xl'>
            {geoData?.name}, {geoData?.state? `${geoData.state}` : `${geoData?.country}`}
          </h1>
          {weatherData?.list.map((item: ForecastItem, index) => (
            <WeatherCard
              key={index}
              weatherData={item}
            />
          ))}
        </>
      )
      }
    </>
  )
}

export default App