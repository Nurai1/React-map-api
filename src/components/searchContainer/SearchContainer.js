import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes, faLocationArrow, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons';

import Button from '../button/Button';
import SearchBar from './searchBar/SearchBar';

let SearchWrapper = styled.div`
    display: block;
    visibility: visible;
    position: absolute;
    left: 0;
    top: 100%;
    width: 100%;
    max-height: 670px;
    height: 80%;
    background: ${(props) => props.theme.secondaryColor};
    box-sizing: border-box;
    padding: 20px;
    border-radius: 20px 20px 0px 0px;
`;

const getContDown = keyframes`
  from {
    top: 20%;
  }
  50%  { visibility: visible; }
  to {
    top: 100%;
    visibility: hidden;
  }
`;

const getContUp = keyframes`
  from {
    top: 100%;
    visibility: hidden;
  }
  50%  { visibility: visible; }
  to {
    top: 20%;
  }
`;

const CrossWrapper = styled(FontAwesomeIcon)`
  font-size: 25px;
  float: right;
`;

const SearchButton = styled(Button)`
  margin-bottom: 25px;

  ${(props) => {
    if (!props.isActive) {
      return `
        background: ${props.theme.nonActiveColor};
        color: #EEEEEE;`;
    }
  }}
`;

const MapPointer = styled.button`
  font-family: "GTWalsheimPro", sans-serif;
  font-weight: normal;
  font-size: 17px;
  line-height: 19px;
  display: block;
  width: auto;
  margin: 17px auto;
  border: 0;
  color: ${(props) => props.theme.primaryColor};
  background: ${(props) => props.theme.secondaryColor};

  & > .search__lctnIcn{
    margin-right: 10px;
  }

  & > .search__lctnIcn_marker{
    display: none;
  }
`;

function SearchContainer(props) {
  const { visibility } = props;
  if (visibility === 'up') {
    SearchWrapper = styled(SearchWrapper)`
      animation: ${getContUp} 0.5s linear forwards;
    `;
    props.setSearchContVisibility('none');
  } else if (visibility === 'down') {
    SearchWrapper = styled(SearchWrapper)`
      animation: ${getContDown} 0.5s linear forwards;
    `;
    props.setSearchContVisibility('none');
  }

  function searchContainerDown() {
    props.setSearchContVisibility('down');
  }

  const [coordsInner, setCoordsInner] = useState({
    address_value: '',
    lng: 30.3,
    lat: 59.95,
    zoom: [10.5],
  });

  function getCoordinates() {
    props.setCoords({
      address_value: coordsInner.address_value,
      lng: coordsInner.lng,
      lat: coordsInner.lat,
      zoom: [17.5],
    });
  }


  return (
    <SearchWrapper>
      <CrossWrapper
        icon={faTimes}
        onClick={() => { searchContainerDown(); }}
      />
      <SearchBar setCoords={setCoordsInner} />
      <SearchButton
        isActive={false}
        className="search__button"
        onClick={() => {
          getCoordinates();
          searchContainerDown();
        }}
      >
          Доставить сюда
      </SearchButton>
      <MapPointer
        className="search__mapPointer"
        onClick={() => { searchContainerDown(); }}
      >
        <FontAwesomeIcon
          className="search__lctnIcn search__lctnIcn_arrow"
          icon={faLocationArrow}
        />
        <FontAwesomeIcon
          className="search__lctnIcn search__lctnIcn_marker"
          icon={faMapMarkerAlt}
        />
          Выбрать на карте
      </MapPointer>
    </SearchWrapper>
  );
}

export default SearchContainer;
