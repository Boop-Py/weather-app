import { useState } from 'react';
import { Button, Container } from '@mui/material';
import Search from './Search'
const Main = () => {
	// const latitude = 50
	// const longitude = 50
	return (
		<Container>
			<h2>Weather Watch</h2>
			<p>Enter your location here</p>
			<input type="text" id="search" />
			<h4>Weather Results Placeholder</h4>
			<Search />
		</Container>
	);
}

export default Main; 