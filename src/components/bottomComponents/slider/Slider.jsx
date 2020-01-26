import React from 'react'
import styled from 'styled-components'


import SliderButton from './sliderButton/SliderButton'

const SliderWrapper = styled.div`
  width: auto;
  height: 50px;
  overflow: hidden;
  white-space: nowrap;
  position: absolute;
  bottom: 105px;
  left: 0px;
  right: 0;
`;

 class Slider extends React.Component{

   constructor(props){
     super(props);

     this.state={
       savedAddresses: [
           "пр. Чернышевского, 17 "
       ]
     };

     this.slide = this.slide.bind(this);
   }


   componentDidUpdate(prevProps){
     console.log(this.props.coordsAddress);
     if (this.props.coordsAddress.address_value !== prevProps.coordsAddress.address_value){
       this.setState({
         savedAddresses: [
           this.props.coordsAddress.address_value,
           prevProps.coordsAddress.address_value
         ]
       });
     }
   }

    searchContainerUp (){
      this.props.setVisibility("up")
    }

  slide(event){

     const sliderButtonNode = this.sliderButtonRef;
     let initX;
     if (sliderButtonNode.style.marginLeft===""){
        initX = event.pageX -20;
      }
     else{
        initX = event.pageX-parseInt(sliderButtonNode.style.marginLeft);
     }

     const sliderNode = this.sliderRef;
     let allSliderButtonNodes = sliderNode.children;
     let sliderNodeWidth=0;

     for (let el of allSliderButtonNodes){
       sliderNodeWidth += parseInt(getComputedStyle(el).width) + 15;
     }
     sliderNodeWidth += 5;

     let displayWidth = parseInt(getComputedStyle(sliderNode).width);

     let allowedWidthLeft = 20;
     let allowedWidthRight = displayWidth - sliderNodeWidth;

     moveAt(event.pageX);

     function moveAt(pageX) {
       sliderButtonNode.style.marginLeft = pageX-initX + 'px';

       if (parseInt(sliderButtonNode.style.marginLeft) > allowedWidthLeft)
         sliderButtonNode.style.marginLeft = allowedWidthLeft + 'px';

       else if (parseInt(sliderButtonNode.style.marginLeft) < allowedWidthRight)
         sliderButtonNode.style.marginLeft = allowedWidthRight + 'px';
     }

     function onMove(event) {
       moveAt(event.pageX);
     }

     document.addEventListener('mousemove', onMove);
     document.addEventListener('touchmove', onMove);

     document.body.onmouseup = function() {
      document.removeEventListener('mousemove', onMove);
      document.body.onmouseup = null;
     }

     document.body.ontouchend = function() {
      document.removeEventListener('touchmove', onMove);
      document.body.ontouchend = null;
     }

   }


   render(){
     const savedAddresses = this.state.savedAddresses;
     return (
       <SliderWrapper ref={(div)=>{this.sliderRef = div}}
        onTouchStart={this.slide} onMouseDown={this.slide}>
           <SliderButton isTextGray
             ref={(div)=>{
               this.sliderButtonRef = div;
             }}
             onClick={() => this.searchContainerUp()}
           >Куда доставить?
           </SliderButton>
           {savedAddresses[0] &&
             <SliderButton>{savedAddresses[0]}</SliderButton>
           }
           {savedAddresses[1] &&
             <SliderButton>{savedAddresses[1]}</SliderButton>
           }
       </SliderWrapper>
     )
   }
 }

export default Slider
