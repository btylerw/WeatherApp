export interface LocationData {
    day: string,
    temp: number,
}

export interface WeatherData {
    cityName: string,
    locationData: LocationData[],
}