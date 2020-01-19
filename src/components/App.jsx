import React from 'react'
import styled from 'styled-components'

import Map from './Map/Map'
import TopBar from './topbar/TopBar'
import BottomWrap from './bottomWrap/BottomWrap'

const AppContainer = styled.div`
	position: relative;
	max-width: 375px;
	width: 100%;
	max-height: 812px;
	height: 100%;
	min-height: 568px;
	margin: 0 auto;
`;

function App (){

	return (
		<AppContainer>
			<TopBar />
			<Map />
			<BottomWrap />
    </AppContainer>
		)
}

export default App
