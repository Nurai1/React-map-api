import React from 'react'
import styled from 'styled-components'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLocationArrow } from '@fortawesome/free-solid-svg-icons'

const LocationArrowWrapper = styled.span`
  display: inline-flex;
  justify-content: center;
  align-items: center;
  background: ${props=>props.theme.secondaryColor};
  font-size: 21px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  margin-bottom: 115px;
  float: right;
  &::after{
    display: block;
   content: "";
   clear: both;
  }
`;

function LocationArrow (){
  return (
    <LocationArrowWrapper>
      <FontAwesomeIcon icon={faLocationArrow}></FontAwesomeIcon>
    </LocationArrowWrapper>
  )
}

export default LocationArrow
