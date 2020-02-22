import React, { useState } from 'react';
import styled from 'styled-components';

import TopBar from './topbar/TopBar';
import Map from './Map/Map';
import MainButton from './button/mainButton/MainButton';
import LocationArrow from './bottomComponents/locationArrow/LocationArrow';
import Slider from './bottomComponents/slider/Slider';
import SearchContainer from './searchContainer/SearchContainer';

const AppContainer = styled.div`
  position: relative;
  max-width: 480px;
  width: 100%;
  max-height: 815px;
  height: 100%;
  overflow: hidden;
  margin: 0 auto;
`;

function App() {
  const [coords, setCoords] = useState({
    address_value: 'Невский пр., 28',
    lng: 30.3260765,
    lat: 59.9355354,
    zoom: [10.5],
  });

  const [searchContVisibility, setSearchContVisibility] = useState('none');

  return (
    <AppContainer>
      <TopBar />
      <Map coords={coords} setMapCoords={setCoords} />
      <LocationArrow />
      <MainButton />
      <Slider
        setVisibility={setSearchContVisibility}
        coordsAddress={coords}
        setCoordsAddress={setCoords}
      />
      <SearchContainer
        setCoords={setCoords}
        visibility={searchContVisibility}
        setSearchContVisibility={setSearchContVisibility}
      />
    </AppContainer>
  );
}


export default App;
