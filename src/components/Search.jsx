import { useEffect, useState } from 'react';
import { Card } from '@mui/material';

const Search = () => {

    const [weatherData, setWeatherData] = useState([])

    const latitude = 50
    const longitude = 50

    const url = "https://api.open-meteo.com/v1/forecast";

    useEffect(() => {
        const getWeatherData = async () => {
            // params for weather code, temperature range & wind speed
            const weatherApi = `${url}?latitude=${latitude}&longitude=${longitude}&hourly=&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=GMT`;
            try {
                const response = await fetch(weatherApi);
                const data = await response.json();
                setWeatherData(data);
                console.log(weatherData)
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getWeatherData();
    }, [latitude, longitude]);
    return (
        <div>
            {weatherData && (
                <Card>
                    {weatherData.time}
                    {weatherData.weatherCode}
                    {weatherData.temperature2mMax}
                    {weatherData.temperature2mMin}

                </Card>
            )
            }
        </div>
    );
};
export default Search;