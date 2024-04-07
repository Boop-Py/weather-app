import { Button, Grid, TextField, Typography } from '@mui/material';
import { useState } from 'react';
import Weather from './Weather';

const Search = () => {
	const [lat, setLat] = useState("");
	const [long, setLong] = useState("");
	const [location, setLocation] = useState("");
	const [cityName, setCityName] = useState("");

	const searchLocation = async () => {
		const geocodingApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
		try {
			const response = await fetch(geocodingApiUrl);
			const data = await response.json();
			setLocation(data);
			setLat(data.results[0].latitude)
			setLong(data.results[0].longitude)
			setCityName(data.results[0].name)
		} catch (error) {
			console.error('Error fetching location data:', error);
		}
		// TODO: add some decent error handling for incorrect searches
		// TODO: also, autocomplete would be cool.
	};

	const handleChange = (e) => {
		setLocation(e.target.value);
	}

	const handleSubmit = () => {
		searchLocation(location);
	}

	return (
		<>
		<Grid container spacing={2}>
			<Grid item xs={12}>
				<TextField
					variant='outlined'
					label='Enter City'
					onChange={handleChange}
					fullWidth
				>
				</TextField>
			</Grid>
			<Grid item>
				<Button variant="contained" size="large" onClick={handleSubmit}>Search</Button>
			</Grid>
		</Grid >
		<Grid container spacing={2}>
			{cityName && (
				<Grid item xs>
					<Typography padding={3} variant="h4">Showing results for {cityName}:</Typography>
					<Weather lat={lat} long={long} />
				</Grid>
			)}
		</Grid >
		</>
	);
};

export default Search;