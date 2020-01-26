import React, { useState } from 'react'
import styled from 'styled-components'

import TopBar from './topbar/TopBar'
import Map from './Map/Map'
import MainButton from './button/mainButton/MainButton'
import LocationArrow from './bottomComponents/locationArrow/LocationArrow'
import Slider from './bottomComponents/slider/Slider'
import SearchContainer from './searchContainer/SearchContainer'

const AppContainer = styled.div`
	position: relative;
	max-width: 375px;
	width: 100%;
	max-height: 815px;
	height: 100%;
	overflow: hidden;
	margin: 0 auto;
`;

function App (){

	const [coords, setCoords] = useState({address_value:"", "lng": 30.3, "lat": 59.95, "zoom": 10.5});
	const [searchContVisibility, setSearchContVisibility] = useState("none");

	return (

		<AppContainer>
			<TopBar />
			<Map coords={coords} setMapCoords={setCoords} />
			<LocationArrow />
			<MainButton />
			<Slider setVisibility={setSearchContVisibility} coordsAddress={coords}/>
			<SearchContainer  setCoords={setCoords}
				visible={searchContVisibility}
				setSearchContVisibility={setSearchContVisibility} />
    </AppContainer>
		)
}


export default App
