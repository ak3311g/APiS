import getWeather from "../api/weather/getweather";
import { useState, useEffect } from "react";
import Clouds from "../components/clouds";
import Humidity from "../components/humidity";

export default function Weather() {
    const [city, setCity] = useState("New Delhi");
    const [weather, setWeather] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        const delay = setTimeout(() => {
            if(city === "") return setLoading(false);
            getWeather(city).then((data) => {
                if(data.error) return alert("City not found");
                setWeather(data);
                setLoading(false);
                console.log(data);
            });
        }, 3000);

        return () => {
            clearTimeout(delay);
        }
    }, [city]);

    const clouds = Math.ceil(weather?.current.cloud / 8);

    return (
        <div className="pt-20">
            <div className="flex flex-col items-center justify-center">
                <div className="sm:w-full md:w-1/3 justify-center items-center sm:right-0 flex flex-col lg:flex-row-reverse md:absolute top-20 right-4">
                    <div className="sm:w-full">
                        <div className="sm:w-full lg:w-full flex flex-col justify-center items-center border-[2px] border-black rounded-md p-3 m-4">
                            <p className="sm:text-lg text-3xl font-semibold">Date</p>
                            <p className="sm:text-sm text-xl font-semibold">{weather?.forecast.forecastday[0].date}</p>
                        </div>
                        <div className="sm:w-full w-full flex flex-col justify-center items-center border-[2px] border-black rounded-md p-3 m-4">
                            <p className="sm:text-lg text-3xl font-semibold">Last Updated</p>
                            <p className="sm:text-sm text-xl font-semibold">{weather?.current.last_updated}</p>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center justify-center">
                    <h1 className="text-4xl font-semibold text-center sm:text-xl">Weather App</h1>
                    <input type="text" className="border-[2px] border-gray-950 rounded-md p-2 m-2" value={city} onChange={(e) => setCity(e.target.value)} />
                </div>
                {loading ? (
                    <h1 className="text-2xl font-semibold text-center sm:text-xl">Loading...</h1>
                ) : (
                    <>
                        <div className="w-4/5 sm:w-4/5 lg:w-full flex justify-center items-center sm:m-1 lg:m-10">
                            <Clouds count={clouds} />
                        </div>

                        <div className="w-4/5 flex flex-col md:flex-row justify-around items-center border-[2px] border-black rounded-md m-10">
                            <div className="flex flex-col md:flex-row justify-around items-center w-4/5 sm:w-4/5 lg:w-full border-2 rounded-lg m-4 border-black">
                                <Humidity humidity={weather?.current.humidity} />
                                <div>
                                    <div className="flex flex-col justify-center items-center">
                                        <img src={weather?.current.condition.icon} alt="" className="w-32" />
                                        <p className="text-xl font-semibold">{weather?.current.condition.text}</p>
                                    </div>
                                </div>
                            </div>
                            <div className="w-4/5 sm:w-4/5 lg:w-full flex flex-col md:flex-row justify-around border-2 rounded-lg m-4 border-black">
                                <div className="flex flex-col justify-center items-center">
                                    <p className="sm:text-xl lg:text-3xl font-semibold">Temperature</p>
                                    <p className="sm:text-lg lg:text-xl font-semibold">{weather?.current.temp_c}°C</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="sm:text-xl lg:text-3xl font-semibold">Feels Like</p>
                                    <p className="sm:text-lg lg:text-xl font-semibold">{weather?.current.feelslike_c}°C</p>
                                </div>
                            </div>
                        </div>

                        <div className="w-4/5 sm:w-4/5 lg:w-full flex flex-col md:flex-row justify-between items-center border-[2px] border-black rounded-md m-10">
                            <div className="w-4/5 sm:w-4/5 lg:w-full border-2 rounded-lg m-4 border-black">
                                <div className="flex flex-col justify-center items-center m-5">
                                    <p className="sm:text-xl lg:text-3xl font-semibold">Wind Speed</p>
                                    <p className="sm:text-lg lg:text-xl font-semibold">{weather?.current.wind_kph}°C</p>
                                </div>
                                <div className="flex flex-col justify-center items-center m-5">
                                    <p className="sm:text-xl lg:text-3xl font-semibold">Wind Direction</p>
                                    <p className="sm:text-lg lg:text-xl font-semibold">{weather?.current.wind_dir}°C</p>
                                </div>
                            </div>
                            <div className="w-4/5 sm:w-4/5 lg:w-full flex flex-col justify-center items-center border-2 rounded-lg sm:m-1 lg:m-4 border-black">
                                <p className="sm:text-xl lg:text-3xl font-semibold">Precipitation(in mm)</p>
                                <p className="sm:text-lg lg:text-xl font-semibold">{weather?.current.precip_mm}mm</p>
                            </div>
                            <div className="w-4/5 sm:w-4/5 lg:w-full flex justify-around border-2 rounded-lg m-4 border-black">
                                <div className="flex flex-col justify-center items-center">
                                    <p className="sm:text-xl lg:text-3xl font-semibold">Sunrise</p>
                                    <p className="sm:text-lg lg:text-xl font-semibold">{weather?.forecast.forecastday[0].astro.sunrise}</p>
                                </div>
                                <div className="flex flex-col justify-center items-center">
                                    <p className="sm:text-xl lg:text-3xl font-semibold">sunset</p>
                                    <p className="sm:text-lg lg:text-xl font-semibold">{weather?.forecast.forecastday[0].astro.sunset}</p>
                                </div>
                            </div>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}