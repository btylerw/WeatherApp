import { useState, useEffect } from "react"
import type { Location } from "../types";

export interface SearchBarProps {
    setGeoData: React.Dispatch<React.SetStateAction<Location | null>>;
}

export default function SearchBar({ setGeoData }: SearchBarProps) {
    // TODO: Styling. Update props maybe to get rid of the dropdown whenever a city is selected
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [results, setResults] = useState<Location[]>([]);
    const [isOpen, setIsOpen] = useState<boolean>(true);
    const [loading, setLoading] = useState<boolean>(false);
    const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

    useEffect(() => {
        if (searchTerm.length < 3) {
            setResults([]);
            return;
        }

        const timeoutId = setTimeout(() => {
            searchLocations(searchTerm);
        }, 500);

        return () => clearTimeout(timeoutId);
    }, [searchTerm]);

    const searchLocations = async (query: string): Promise<void> => {
        setLoading(true);
        setIsOpen(true);
        try {
            const response = await fetch(
                `http://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
            );
            const data: Location[] = await response.json();
            setResults(data);
        } catch (err) {
            console.error(`Error fetching locations: ${err}`);
        } finally {
            setLoading(false);
        }
    };

    const handleSelectLocation = (location: Location) => {
        setGeoData(location);
        setIsOpen(false);
        setSearchTerm('');
    };

    return (
        <div>
            <input
                className="text-center"
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search Cities"
            />
            {loading && <p>Searching...</p>}
            {isOpen &&
                <ul>
                    {results.map((location, index) => (
                        <li key={index} onClick={() => handleSelectLocation(location)}>
                            {location.name}, {location.state && `${location.state}, `}
                            {location.country}
                        </li>
                    ))}
                </ul>
            }
        </div>
    );
}