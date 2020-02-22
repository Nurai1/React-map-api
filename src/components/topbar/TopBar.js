import React from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronLeft, faBars } from '@fortawesome/free-solid-svg-icons';

const TopbarWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${(props) => props.theme.primaryColor};
  background: ${(props) => props.theme.secondaryColor};
`;

const FontAwesomeIconWrapper = styled(FontAwesomeIcon)`

  &.isLeftArrow{
    font-size: 13px;
  }

  &.isBars{
    font-size: 15px;
  }
`;

const Title = styled.h2`
  display: inline-block;
  font-family: GTWalsheimPro;
  font-size: 20px;
  text-transform: uppercase;
`;

function TopBar() {
  return (
    <TopbarWrapper>
      <FontAwesomeIconWrapper icon={faChevronLeft} className="isLeftArrow" />
      <Title>react delivery</Title>
      <FontAwesomeIconWrapper icon={faBars} className="isBars" />
    </TopbarWrapper>
  );
}

export default TopBar;
