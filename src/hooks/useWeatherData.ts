import axios, { CanceledError } from 'axios';
import { useEffect, useRef, useState } from 'react';

interface Weather {
    base: string;
    main: { temp: string };
    weather: Array<{ description: string }>;
}

export const useWeatherData = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [input, setInput] = useState('');
    const [error, setError] = useState('');
    const [data, setData] = useState<Weather>();
    const inputRef = useRef<HTMLInputElement>(null);
    const abortController = new AbortController();
    useEffect(
        function () {
            if (!input) return;

            setIsLoading(true);
            axios
                .get<Weather>(`https://api.openweathermap.org/data/2.5/weather?q=${input}&appid=${API_key}`, {
                    signal: abortController.signal,
                })
                .then((res) => {
                    setData(res.data);
                    setIsLoading(false);
                })
                .catch((err) => {
                    if (err instanceof CanceledError) return;
                    console.log(err.message);
                    setData(undefined);
                    setIsLoading(false);
                    setError(err.message);
                });

            return () => abortController.abort();
        },
        [input]
    );

    return { inputRef, setInput, setError, error, data, isLoading };
};
