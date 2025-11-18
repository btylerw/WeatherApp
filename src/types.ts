export interface Location {
    name: string;
    lat: number;
    lon: number;
    country: string;
    state?: string;
    local_names?: {
        [key: string]: string;
    };
}

export interface ForecastItem {
    dt: number;
    main: {
        temp: number;
        feels_like: number;
        temp_min: number;
        temp_max: number;
        pressure: number;
        humidity: number;
    };
    weather: Array<{
        id: number;
        main: string;
        description: string;
        icon: string;
    }>;
    clouds: {
        all: number;
    };
    wind: {
        speed: number;
        deg: number;
    };
    pop: number; // Rain chance %
    dt_txt: string; // Datetime
}

export interface ForecastData {
    cod: string;
    message: number;
    cnt: number; // # of forecast items -- should always be 40
    list: ForecastItem[];
    city: {
        id: number;
        name: string;
        coord: {
            lat: number;
            lon: number;
        };
        country: string;
        population: number;
        timezone: number;
        sunrise: number;
        sunset: number;
    };
}