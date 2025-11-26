import type { ForecastItem} from "../types"

interface WeatherCardProps {
    weatherData: ForecastItem;
    tempMax?: number;
    tempMin?: number;
    variant?: 'current' | 'daily';
}

export default function WeatherCard({ weatherData, tempMax, tempMin, variant = 'current' }: WeatherCardProps) {
    // TODO: Styling

    const displayTempMax = tempMax ?? weatherData.main.temp_max;
    const displayTempMin = tempMin ?? weatherData.main.temp_max;
    return (
        <div className="flex items-center justify-center">
            <img 
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                alt={weatherData.weather[0].description}
            />
            <div>
                {variant === 'current' ? (
                    <>
                        <div>DateTime: {weatherData.dt_txt}</div>
                        <div>Current: {weatherData.main.temp}°</div>
                    </>
                ) : (
                    <>
                        <div>Date: {weatherData.dt_txt.split(' ')[0]}</div>
                    </>
                )}
                <div>High: {displayTempMax}°</div>
                <div>Low: {displayTempMin}°</div>
                <div>Chance of Rain: {(weatherData.pop * 100).toFixed(0)}%</div>
            </div>
        </div>
    )
}