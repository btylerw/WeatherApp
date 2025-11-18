import type { ForecastItem} from "../types"

interface WeatherCardProps {
    weatherData: ForecastItem
}
export default function WeatherCard({ weatherData }: WeatherCardProps) {
    // TODO: Styling
    return (
        <div className="flex items-center justify-center">
            <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
            />
            <div>DateTime: {weatherData.dt_txt}</div>
            <div>Current: {weatherData.main.temp}</div>
            <div>High: {weatherData.main.temp_max}</div>
            <div>Low: {weatherData.main.temp_min}</div>
            <div>Chance of Rain: {(weatherData.pop * 100).toFixed(0)}%</div>
        </div>
    )
}