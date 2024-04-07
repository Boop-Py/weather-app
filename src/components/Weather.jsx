import { useEffect, useState } from 'react';
import { Card, CardContent, CardMedia, Grid, Typography } from '@mui/material';
import * as weatherIcons from 'weather-icons-react';
import { WiThermometer, WiStrongWind } from 'weather-icons-react';
import moment from 'moment';

const Weather = (props) => {
    const [weatherData, setWeatherData] = useState([])
    const latitude = JSON.stringify(props.lat)
    const longitude = JSON.stringify(props.long)
    const url = "https://api.open-meteo.com/v1/forecast";


    // TODO: ran out of time to get the items displaying :( 
    const weatherCodes = [
        { "weatherCode": 0, "description": "Clear sky", "icon": weatherIcons.WiDaySunny },
        { "weatherCode": 1, "description": "Mainly clear", "icon": weatherIcons.WiDaySunnyOvercast },
        { "weatherCode": 2, "description": "Partly cloudy", "icon": weatherIcons.WiDayCloudyHigh },
        { "weatherCode": 3, "description": "Overcast", "icon": weatherIcons.WiCloudy },
        { "weatherCode": 45, "description": "Fog", "icon": weatherIcons.WiFog },
        { "weatherCode": 48, "description": "Depositing rime fog", "icon": weatherIcons.WiFog },
        { "weatherCode": 51, "description": "Light drizzle", "icon": weatherIcons.WiDayShowers },
        { "weatherCode": 53, "description": "Moderate drizzle", "icon": weatherIcons.WiDayRain },
        { "weatherCode": 55, "description": "Drizzle: Dense", "icon": weatherIcons.WiDayRainMix },
        { "weatherCode": 56, "description": "Light freezing drizzle", "icon": weatherIcons.WiDaySleet },
        { "weatherCode": 57, "description": "Dense freezing drizzle", "icon": weatherIcons.WiDaySleet },
        { "weatherCode": 61, "description": "Slight rain", "icon": weatherIcons.WiRainMix },
        { "weatherCode": 63, "description": "Moderate rain", "icon": weatherIcons.WiRain },
        { "weatherCode": 65, "description": "Heavy Rain", "icon": weatherIcons.WiRain },
        { "weatherCode": 66, "description": "Freezing Rain: Light", "icon": weatherIcons.WiDayHail },
        { "weatherCode": 67, "description": "Freezing Rain: Heavy", "icon": weatherIcons.WiDayHail },
        { "weatherCode": 71, "description": "Snow fall: Slight", "icon": weatherIcons.WiDaySnow },
        { "weatherCode": 73, "description": "Snow fall: Moderate", "icon": weatherIcons.WiDaySnow },
        { "weatherCode": 75, "description": "Snow fall: Heavy", "icon": weatherIcons.WiDaySnow },
        { "weatherCode": 77, "description": "Snow grains", "icon": weatherIcons.WiDaySnow },
        { "weatherCode": 80, "description": "Slight rain", "icon": weatherIcons.WiDayRain },
        { "weatherCode": 81, "description": "Moderate rain: ", "icon": weatherIcons.WiDayRain },
        { "weatherCode": 82, "description": "Violent rain: ", "icon": weatherIcons.WiDayRain },
        { "weatherCode": 85, "description": "Snow showers: Slighty", "icon": weatherIcons.WiDaySnowWind },
        { "weatherCode": 86, "description": "Snow showers: Heavy", "icon": weatherIcons.WiDaySnowWind },
        { "weatherCode": 95, "description": "Thunderstorm: Slight", "icon": weatherIcons.WiDayThunderstorm },
        { "weatherCode": 96, "description": "Thunderstorm with slight hail", "icon": weatherIcons.WiDaySleetStorm },
        { "weatherCode": 99, "description": "Thunderstorm with heavy hail", "icon": weatherIcons.WiDayThunderstorm }
    ];


    useEffect(() => {
        const dailyWeatherBuilder = (data) => {
            const dailyWeatherArray = [];

            // uses the weather code from API to find a matching icon and description
            const weatherCodeHelper = (code) => {
                return weatherCodes.find(item => item.weatherCode === code)
            }

            // loop through 5 days of weather and turn it into an array
            for (let i = 0; i < 5; i++) {

                // format date into a Date object so that 'moment' can use it
                const formattedDate = new Date(data.daily.time[i])

                //const icon =  weatherIconHelper(data.dailyWeather.weatherCode)
                const conditionData = weatherCodeHelper(data.daily.weather_code[i])
                console.log(typeof (conditionData.icon))
                dailyWeatherArray.push({
                    date: moment(formattedDate).format("dddd Do MMMM"),
                    weatherCode: data.daily.weather_code[i],
                    weatherDescription: conditionData.description,
                    // TODO: get icon to display
                    weatherIcon: conditionData.icon,
                    maxTemp: Math.round(data.daily.temperature_2m_max[i]),
                    windSpeed: Math.round(data.daily.wind_speed_10m_max[i])
                })
                setWeatherData(dailyWeatherArray);
            }
            return dailyWeatherArray;
        }

        const getWeatherData = async () => {
            // params for weather code, temperature & wind speed
            const weatherApiUrl = `${url}?latitude=${latitude}&longitude=${longitude}&hourly=&daily=weather_code,temperature_2m_max,wind_speed_10m_max&timezone=GMT`;
            try {
                const response = await fetch(weatherApiUrl);
                const data = await response.json();
                dailyWeatherBuilder(data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
        getWeatherData();
    }, [latitude, longitude]);

    return (
        <Grid container spacing={4} alignItems="stretch">
            {weatherData && (
                weatherData.map(dailyWeather => (
                    <Grid item xs key={dailyWeather.date}>
                        <Card style={{ textAlign: "center", display: 'flex', justifyContent: 'space-between', flexDirection: 'column' }}>
                            <CardContent>
                                <Typography variant="h5" padding={2}>{dailyWeather.date}</Typography>
                                <CardMedia
                                    height="100"
                                    image={dailyWeather.icon}
                                    alt={dailyWeather.description}
                                />

                                <Typography variant="h6" padding={2}>{dailyWeather.weatherDescription}</Typography>
                                <Typography variant="subtitle1" padding={2}><WiThermometer size={30} />{dailyWeather.maxTemp}°C</Typography>
                                <Typography variant="subtitle1"><WiStrongWind size={30} /> Wind: {dailyWeather.windSpeed}kmh</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))
            )}
        </Grid>
    )
};
export default Weather;