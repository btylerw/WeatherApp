import { useState, useEffect } from "react"
import type { Location } from "../types";

interface SearchBarProps {
    setGeoData: React.Dispatch<React.SetStateAction<Location | null>>;
}

export default function SearchBar({ setGeoData }: SearchBarProps) {
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
                `https://api.openweathermap.org/geo/1.0/direct?q=${query}&limit=5&appid=${apiKey}`
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
        <div className="flex justify-center mb-4">
            <div className="relative w-80">
                <input
                    className="w-full text-center border border-black rounded-md px-4 py-2"
                    type="text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Search Cities"
                />
                {loading && <p className="text-sm text-gray-600 mt-1">Searching...</p>}
                {isOpen && results.length > 0 && (
                    <ul className="absolute top-full left-0 w-full mt-1 bg-white border border-black rounded-md shadow-lg max-h-60 overflow-y-auto z-10">
                        {results.map((location, index) => (
                            <li 
                                key={index} 
                                onClick={() => handleSelectLocation(location)}
                                className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-left first:rounded-t-md last:rounded-b-md"
                            >
                                {location.name}, {location.state && `${location.state}, `}
                                {location.country}
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}