import React from 'react'
import styled from 'styled-components'
import Slider from 'react-slick'
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Button from '../../button/Button'

const SliderButton = styled(Button)`
  width: auto;
  padding: 13px 15px 16px;
  font-size: 18px;
  line-height: 21px;

  &:first-child{
    margin-left: 0;
  }

  &:last-child{
    margin-right: 0;
  }

  background: ${props=>props.theme.secondaryColor};

  ${props=>{
    if (props.isTextGray){
      return "color:#808080";
    }
    else{
      return "color:"+props.theme.primaryColor;
    }
  }}
`;

const SliderWrapper = styled(Slider)`
  width: auto;
  height: 50px;
  //overflow: hidden;
  //white-space: nowrap;
  margin-top: 90px;
`;

class SimpleSlider extends React.Component {
  render() {
    let settings = {
      arrows: false,
      dots: false,
      infinite: false,
      speed: 300,
      slidesToShow: 1,
      slidesToScroll: 1,
      swipeToSlide: true,
      focusOnSelect: true,
      centerMode: false,
      variableWidth: true,
      className:"classclass"
    };
    return (
      <SliderWrapper {...settings}>
        <div className= "sliderComponent sliderComponent-first">
          <SliderButton isTextGray>Куда доставить?</SliderButton>
        </div>
        <div className= "sliderComponent">
          <SliderButton>пр.Чернышевского, 17</SliderButton>
        </div>
        <div className= "sliderComponent">
          <SliderButton>пр.Чернышевского, 11</SliderButton>
        </div>
      </SliderWrapper>
    );
  }
}
{
// function Slider (){
//   return (
//     <SliderWrapper>
//         <SliderButton isTextGray>Куда доставить?</SliderButton>
//         <SliderButton>пр.Чернышевского, 17</SliderButton>
//         <SliderButton>пр.Чернышевского, 11</SliderButton>
//     </SliderWrapper>
//   )
// }
}

export default SimpleSlider
