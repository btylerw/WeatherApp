import type { ForecastItem} from "../types"

interface WeatherCardProps {
    weatherData: ForecastItem;
    tempMax?: number;
    tempMin?: number;
    variant?: 'current' | 'daily';
    showDegrees: boolean;
}

export default function WeatherCard({ weatherData, tempMax, tempMin, variant = 'current', showDegrees }: WeatherCardProps) {
    const displayTempMax = tempMax ?? weatherData.main.temp_max;
    const displayTempMin = tempMin ?? weatherData.main.temp_max;

    if (variant === 'current') {
        return (
            <div className="flex flex-col items-center justify-center p-8 bg-gradient-to-br from-blue-400 to-blue-600 rounded-2xl shadow-lg text-white">
                <div className="text-lg font-medium mb-2">{weatherData.dt_txt}</div>
                <img 
                    className="w-32 h-32"
                    src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} 
                    alt={weatherData.weather[0].description}
                />
                <div className="text-6xl font-bold mb-4">{Math.round(weatherData.main.temp)}{showDegrees && '°'}</div>
                <div className="text-xl capitalize mb-4">{weatherData.weather[0].description}</div>
                <div className="flex gap-8 text-lg">
                    <div>High: {Math.round(displayTempMax)}{showDegrees && '°'}</div>
                    <div>Low: {Math.round(displayTempMin)}{showDegrees && '°'}</div>
                </div>
                <div className="mt-2 text-sm">Rain: {(weatherData.pop * 100).toFixed(0)}%</div>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center p-4 bg-white rounded-lg shadow hover:shadow-mg transition-shadow border border-gray-200">
            <div className="text-sm font-medium text-gray-600 mb-1">
                {new Date(weatherData.dt_txt).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric'})}
            </div>
            <img 
                className="w-16 h-16"
                src={`https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`}
                alt={weatherData.weather[0].description}
            />
            <div className="flex gap-2 text-lg font-semibold">
                <span className="text-red-500">H: {Math.round(displayTempMax)}{showDegrees && '°'}</span>
                <span className="text-red-500">L: {Math.round(displayTempMin)}{showDegrees && '°'}</span>
            </div>
            <div className="text-xs text-gray-500 mt-1">
                Rain: {(weatherData.pop * 100).toFixed(0)}%
            </div>
        </div>
    )
}