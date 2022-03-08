import { Link } from 'react-router-dom';
import styled from 'styled-components';
import img from './Image/img.svg';
import { H1 } from './styles/TextStyles';

export default function Main() {

  return (
    <Wrapper>
      <H1>Henry Videogames <br /> Individual Project</H1>
      <Button to="/videogames">Find a Videogame</Button>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  padding: 200px 0;
  display: grid;
  gap: 16px;

  background-image: url(${img});
  background-position: 700px 100px;
  background-repeat: no-repeat;
  background-size: 450px;
`;

const Button = styled(Link)`
  color: white;

  font-size: 24px;
  font-weight: 600;
  font-size: 16px;
  line-height: 130%;
  text-transform: uppercase;

  padding: 4px 16px;

  background-color: #576CA8;
  border-radius: 2px;
  max-width: fit-content;
  transition: 150ms ease-out;

  &:hover{
    background-color: #302b27;
  }
`;