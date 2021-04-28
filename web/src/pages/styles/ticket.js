import styled from 'styled-components';

const H1 = styled.h1`
  text-transform: uppercase;
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #FFF;
  float: right;
  text-align: start;
  font-weight: bold;
  font-size: 3.5vw;
  text-align: center;
  z-index: 3;
`;

const H2 = styled.h2`
  -webkit-text-stroke-width: 1px;
  -webkit-text-stroke-color: #FFF;
  text-align: start;
  font-weight: bold;
  font-size: 2.5vw;
  text-align: center;
  z-index: 2;
`;

const Subtitle = styled.h1`
  font-family: arial;
  font-size: 2.5em;
  text-align: center;
`;

const Button = styled.button`
  background-color: #FFF;
  border:1px solid #FA1E44;
  font-weight: 600;
  color: #FA1E44;
  padding: 10px;
  border-radius: 90px;
  cursor: pointer;
  transition: background 1s;
  &:hover {
    background-color: #FA1E44;
    color: #FFF
  }
`;

const ExcludeButton = styled.button`
  background-color: #E76D6F;
  font-weight: 600;
  color: #FFFFFF;
  padding: 25px;
  border-radius: 90px;
  cursor: pointer;
  transition: background 1s;
  width: 100%;
  display: flex;
  justify-content: center;
  &:hover {
    background-color: #FA1E44;
    color: #FFF
  }
`;

export {
  H1,
  H2,
  Subtitle,
  Button,
  ExcludeButton
}