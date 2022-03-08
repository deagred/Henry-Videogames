import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { H1 } from './styles/TextStyles.jsx';

export default function NotFound() {

  return (

    <Wrapper>
      <H1>404 Page not found</H1>
      <Button to="/">Go back home</Button>
    </Wrapper>

  );

}


const Wrapper = styled.div`
  padding: 220px;
  img{
    max-width: 500px;
    align-self: center;
    justify-self: center;
  }
  display: grid;
  gap: 40px;

  justify-items: center;
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