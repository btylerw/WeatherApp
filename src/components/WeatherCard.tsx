import type { WeatherData } from "../types"

interface WeatherCardProps { weatherData: WeatherData; }
export const WeatherCard: React.FC<WeatherCardProps> = (props) => {
    return (
        <>
            <div className="text-4xl">{props.weatherData.cityName}</div>
            {props.weatherData.locationData.map(data => (
                <div key={data.day}>
                    <div>{data.day}</div>
                    <div>{data.temp}</div>
                </div>
            ))}
        </>
    )
}