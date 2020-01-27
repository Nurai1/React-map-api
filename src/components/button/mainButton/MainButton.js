import React from 'react';
import styled from 'styled-components';

import Button from '../Button';

const MainButtonWrapper = styled.div`
  position: absolute;
  bottom: 30px;
  right: 20px;
  left: 20px;
`;

function MainButton() {
  return (
    <MainButtonWrapper>
      <Button>Доставить сюда</Button>
    </MainButtonWrapper>
  );
}

export default MainButton;
