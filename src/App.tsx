import { useState, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import type { Location, ForecastData, ForecastItem, DailyForecast, ParsedForecast, CurrentWeather } from './types'
import WeatherCard from './components/WeatherCard'
import './App.css'

function App() {
  // TODO: Write aggregate function to find max/min temp for each day and display info for closest time
  // Try to use user's location data to automatically display current location data
  const [geoData, setGeoData] = useState<Location | null>(null);
  const [parsedForecast, setParsedForecast] = useState<ParsedForecast | null>(null);
  const [units, setUnits] = useState<'metric' | 'imperial' | 'standard'>('imperial');
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
      setParsedForecast(parseWeatherData(data?.list));
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  const parseWeatherData = (forecastItems: ForecastItem[]): ParsedForecast => {
    if (!forecastItems || forecastItems.length === 0) {
      throw new Error('No forecast data available');
    }

    const currentItem = forecastItems[0];
    const current: CurrentWeather = {
      temp: currentItem.main.temp,
      item: currentItem
    };

    const dailyGroups = new Map<string, ForecastItem[]>();

    forecastItems.forEach(item => {
      const date = item.dt_txt.split(' ')[0];

      if (!dailyGroups.has(date)) {
        dailyGroups.set(date, []);
      }
      dailyGroups.get(date)!.push(item);
    });

    const daily: DailyForecast[] = [];

    dailyGroups.forEach((items, date) => {
      const currentDate = currentItem.dt_txt.split(' ')[0];
      if (date === currentDate  && dailyGroups.size > 1) {
        return;
      }

      const temps = items.map(item => item.main.temp);
      const tempMax = Math.max(...temps);
      const tempMin = Math.min(...temps);

      const representativeItem = items.find(item => item.dt_txt.includes('12:00:00')) || items[0];

      daily.push({
        date,
        tempMax,
        tempMin,
        item: representativeItem
      });
    });

    daily.sort((a, b) => a.date.localeCompare(b.date));

    return {
      current,
      daily
    };
  }

  return (
    <>
      <div className="flex items-center justify-center gap-4">
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
          {parsedForecast && (
            <WeatherCard
              weatherData={parsedForecast.current.item}
              variant='current'
            />
          )}

          {parsedForecast?.daily.map(day => (
            <WeatherCard 
              key={day.date}
              weatherData={day.item}
              tempMax={day.tempMax}
              tempMin={day.tempMin}
              variant='daily'
            />
          ))}
        </>
      )
      }
    </>
  )
}

export default App