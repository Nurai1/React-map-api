import styled from 'styled-components';

const Button = styled.button`
  width: 100%;
  height: 50px;
  color: ${(props) => props.theme.secondaryColor};
  background: ${(props) => props.theme.primaryColor};
  font-family: GTWalsheimPro;
  font-style: normal;
  font-weight: 500;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  border: 0;
  border-radius: 45.5px;
  cursor: pointer;
`;

export default Button;
