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

const Image = styled.img`
  width: 20vw;
  z-index: 1;
  filter: grayscale(0%);
`;

const Subtitle = styled.h1`
  background-color: #FFF;
  text-transform: uppercase;
  padding: 20px;
  border-radius: 100px;
  position: absolute;
  bottom: 100px;
  left: 0px
  font-family: arial;
  font-size: 2.5vw;
  text-align: center;
  color: #FA1E44;
`;

const Input = styled.input`
  width: 100%;
  background-color: #F5F5F5;
  color: #242424;
  font-weight: 600;
  padding: 10px;
  border-radius: 5px;
`;

const Button = styled.input`
  background-color: #FFF;
  border:1px solid #3B82F6;
  font-weight: 600;
  color: #3B82F6;
  padding: 10px 20px;
  border-radius: 90px;
  cursor: pointer;
  transition: background 1s;
  &:hover {
    background-color: #3B82F6;
    color: #FFF
  }
`;

const ImageBackground = styled.div`
  
  width: 100%;
  flex: 1;

`;
// background-image: url(${'../../images/cinema.png'});
// background-color: #FA1E44;
// &:before {
//   filter: grayscale(60%);
// }
// background-size: cover;
export {
  H1,
  H2,
  Subtitle,
  Input,
  Button,
  ImageBackground,
  Image
}