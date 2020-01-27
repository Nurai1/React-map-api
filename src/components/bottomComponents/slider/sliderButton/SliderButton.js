import styled from 'styled-components';

import Button from '../../../button/Button';

const SliderButton = styled(Button)`
  width: auto;
  padding: 13px 15px 16px;
  font-size: 18px;
  line-height: 21px;
  margin-right: 15px;

  &:first-child{
    margin-left: 20px;
  }

  &:last-child{
    margin-right: 0;
  }

  background: ${(props) => props.theme.secondaryColor};

  ${(props) => {
    if (props.isTextGray) {
      return 'color:#808080';
    }
    return `color:${props.theme.primaryColor}`;
  }}
`;

export default SliderButton;
