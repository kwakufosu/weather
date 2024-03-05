import { useWeatherData } from './hooks/useWeatherData';
import Loader from './components/Loader';

const App = () => {
    const { data, error, inputRef, setInput, isLoading, setError } = useWeatherData();
    function handleClick() {
        if (!inputRef.current?.value) return;
        setError('');
        setInput(inputRef.current.value);
    }

    return (
        <main className="flex items-center justify-center h-screen ">
            <div className="container mx-auto max-w-[400px] p-[20px] ">
                <h2 className="text-center font-bold">Weather App</h2>
                <input type="text" placeholder="Enter City" className="p-[15px] outline-none border rounded-md mt-[20px] mr-5" ref={inputRef} />
                <button className="w-[100px] p-4 text-[15px] bg-blue-300 rounded-md" onClick={handleClick}>
                    Search
                </button>
                <img src="/assets/weather.jpg" alt="Weather Icon" className="w-[200px] h-[200px]  my-[10px] ml-14" />
                {error.length === 0 ? (
                    isLoading ? (
                        <Loader />
                    ) : (
                        data && (
                            <p className="text-blue-900 text-center">
                                Temperature:{data.main.temp} Fahrenheit <br /> Weather Description:{data.weather[0].description}
                            </p>
                        )
                    )
                ) : (
                    <p className="text-red-700 text-center">{error}</p>
                )}
            </div>
        </main>
    );
};

export default App;
