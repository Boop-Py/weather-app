import { Box, Button, Grid, TextField, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import Weather from './Weather';

const Search = () => {
	const lat = 50;
	const long = 50;
	const [location, setLocation] = useState("");

	const searchLocation = async () => {
		const geocodingApiUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
		try {
			const response = await fetch(geocodingApiUrl);
			const data = await response.json();
			setLocation(data);
			console.log(data.results[0].latitude)
			console.log(data.results[0].longitude)
		} catch (error) {
			console.error('Error fetching location data:', error);
		}
	};


	const handleChange = (e) => {
		setLocation(e.target.value);
	}

	const handleSubmit = () => {
		searchLocation(location);
	}

	return (
		<Grid>
			<Box padding={4} sx={{
				width: '90%', maxWidth: '100%'
			}}>
				<TextField
					variant='outlined'
					label='Enter City'
					onChange={handleChange}
					fullWidth>
				</TextField>
				<Button variant="contained" size="large" onClick={handleSubmit}>Search</Button>
			</Box>
			{location && (
				<Box>
					<Weather lat={lat} long={long} />
				</Box>
			)}
		</Grid >
	);
};

export default Search;