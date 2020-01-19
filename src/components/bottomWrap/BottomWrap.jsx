import React from 'react'
import styled from 'styled-components'

import Button from './../button/Button'
import LocationArrow from './locationArrow/LocationArrow'
import Slider from './slider/Slider'

const BottomWrapper = styled.div`
  height: 215px;
  position: absolute;
  bottom: 30px;
  left: 0;
  right: 0;
`;

const BottomWrapperInner = styled.div`
  position: absolute;
  bottom: 0;
  left: 20px;
  right: 20px;
`;

function BottomWrap (){
  return (
    <BottomWrapper>
      <BottomWrapperInner>
        <LocationArrow />
        <Button>Доставить сюда</Button>
      </BottomWrapperInner>
      <Slider />
    </BottomWrapper>
  )
}
export default BottomWrap
