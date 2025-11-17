import SearchBar from './components/SearchBar'
import type { LocationData, WeatherData } from './types'
import { WeatherCard } from './components/WeatherCard'
import './App.css'

function App() {
  const cityName: string = 'Bakersfield';
  const locationData: LocationData[] = [
    {
      day: 'Monday',
      temp: 69,
    },
    {
      day: 'Tuesday',
      temp: 59,
    },
    {
      day: 'Wednesday',
      temp: 62,
    }
  ];

  const weatherData: WeatherData = {
    cityName: cityName,
    locationData: locationData,
  }

  return (
    <>
      <SearchBar />
      <WeatherCard
        weatherData={weatherData}
      />
    </>
  )
}

export default App
