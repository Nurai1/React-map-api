import React from 'react';
import styled from 'styled-components';


import SliderButton from './sliderButton/SliderButton';

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

class Slider extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      savedAddresses: [
        'пр. Чернышевского, 17 ',
      ],
    };

    this.slide = this.slide.bind(this);
    this.addAddress = this.addAddress.bind(this);
  }

  componentDidUpdate(prevProps) {
    const { coordsAddress } = this.props;

    if (coordsAddress.address_value !== prevProps.coordsAddress.address_value) {
      this.addAddress(coordsAddress.address_value, prevProps.coordsAddress.address_value);
    }
  }

  addAddress(firstStreet, second) {
    this.setState({
      savedAddresses: [
        firstStreet,
        second,
      ],
    });
  }

  searchContainerUp() {
    const { setVisibility } = this.props;
    setVisibility('up');
  }

  slide(event) {
    const sliderButtonNode = this.sliderButtonRef;
    let initX;
    if (sliderButtonNode.style.marginLeft === '') {
      initX = event.pageX - 20;
    } else {
      initX = event.pageX - parseInt(sliderButtonNode.style.marginLeft, 10);
    }

    const sliderNode = this.sliderRef;
    let allSliderButtonNodes = sliderNode.children;
    let sliderNodeWidth = 0;

    allSliderButtonNodes = Array.prototype.slice.call(allSliderButtonNodes);
    allSliderButtonNodes.forEach((btn) => {
      sliderNodeWidth += parseInt(getComputedStyle(btn).width, 10) + 15;
    });
    sliderNodeWidth += 5;

    const displayWidth = parseInt(getComputedStyle(sliderNode).width, 10);

    const allowedWidthLeft = 20;
    const allowedWidthRight = displayWidth - sliderNodeWidth;

    function moveAt(pageX) {
      sliderButtonNode.style.marginLeft = `${pageX - initX}px`;

      if (parseInt(sliderButtonNode.style.marginLeft, 10) > allowedWidthLeft) sliderButtonNode.style.marginLeft = `${allowedWidthLeft}px`;

      else if (parseInt(sliderButtonNode.style.marginLeft, 10) < allowedWidthRight) sliderButtonNode.style.marginLeft = `${allowedWidthRight}px`;
    }

    moveAt(event.pageX);

    function onMove(e) {
      moveAt(e.pageX);
    }

    document.addEventListener('mousemove', onMove);
    document.addEventListener('touchmove', onMove);

    document.body.onmouseup = function removeOnMoveEvent() {
      document.removeEventListener('mousemove', onMove);
      document.body.onmouseup = null;
    };

    document.body.ontouchend = function removeOnMoveEvent() {
      document.removeEventListener('touchmove', onMove);
      document.body.ontouchend = null;
    };
  }


  render() {
    const { savedAddresses } = this.state;
    return (
      <SliderWrapper
        ref={(div) => { this.sliderRef = div; }}
        onTouchStart={this.slide}
        onMouseDown={this.slide}
      >
        <SliderButton
          isTextGray
          ref={(div) => {
            this.sliderButtonRef = div;
          }}
          onClick={() => this.searchContainerUp()}
        >
          Куда доставить?
        </SliderButton>
        {savedAddresses[0]
             && <SliderButton>{savedAddresses[0]}</SliderButton>}
        {savedAddresses[1]
             && <SliderButton>{savedAddresses[1]}</SliderButton>}
      </SliderWrapper>
    );
  }
}

export default Slider;
