import { useEffect, useState } from 'react';
import { Card, CardContent, Typography } from '@mui/material';
import moment from 'moment';

const Search = () => {

    const [weatherData, setWeatherData] = useState([])

    const latitude = 50
    const longitude = 50

    const url = "https://api.open-meteo.com/v1/forecast";

    useEffect(() => {
        const dailyWeatherBuilder = (data) => {
            const dailyWeatherArray = [];
            for (let i = 0; i < 5; i++) {
                const formattedDate = new Date(data.daily.time[i])
                dailyWeatherArray.push({
                    date: moment(formattedDate).format("Do MMM YY"),
                    dayOfWeek: moment(formattedDate).format('dddd'),
                    weatherCode: data.daily.weather_code[i],
                    minTemp: data.daily.temperature_2m_min[i],
                    maxTemp: data.daily.temperature_2m_max[i],
                    windSpeed: data.daily.wind_speed_10m_max[i]
                })
                setWeatherData(dailyWeatherArray);
            }
            return dailyWeatherArray
        }

        const getWeatherData = async () => {
            // params for weather code, temperature range & wind speed
            const weatherApi = `${url}?latitude=${latitude}&longitude=${longitude}&hourly=&daily=weather_code,temperature_2m_max,temperature_2m_min,wind_speed_10m_max&timezone=GMT`;
            try {
                const response = await fetch(weatherApi);
                const data = await response.json();
                dailyWeatherBuilder(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getWeatherData();
    }, [latitude, longitude]);
    return (
        <div>
            {weatherData && (
                weatherData.map(dailyWeather => (
                    <Card>
                        <CardContent>
                            <Typography>Date: {dailyWeather.date}</Typography>
                            <Typography>Day: {dailyWeather.dayOfWeek}</Typography>
                            <Typography>Weather Code:{dailyWeather.weatherCode}</Typography>
                            <Typography>Temperature Range(C): {dailyWeather.minTemp}-{dailyWeather.maxTemp}</Typography>
                            <Typography>Wind Speed: {dailyWeather.windSpeed}</Typography>
                        </CardContent>
                    </Card>
                ))
            )}
        </div>
    )
}
export default Search;