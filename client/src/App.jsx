import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router';
import styled from 'styled-components';
import { getGenres, getPlatforms, getVideogames } from './actions/actions.js';
import Browser from './components/Browser';
import CardContainer from './components/CardContainer.jsx';
import CardDetail from './components/CardDetail';
import CreateForm from './components/CreateForm';
import background from "./components/Image/background.svg";
import Main from './components/Main';
import NavBar from './components/NavBar';
import NotFound from './components/NotFound';

export default function App() {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getPlatforms());
    dispatch(getVideogames()); // 4 requests every reload...
  }, []);

  return (
    <Wrapper>
      <Content>
        <NavBar />  
        <Routes>
          <Route exact path="/" element={<Main />} />
          <Route path="/create" element={<CreateForm />} />
          <Route path="/videogames" element={<><Browser /><CardContainer /></>} /> 
          <Route path="/videogame/:id" element={<CardDetail />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Content>
    </Wrapper >
  );
}

const Wrapper = styled.div`
  background-image: url(${background});
  background-repeat: repeat-x;
  background-repeat: repeat-y;
  color: #fff;
`;

const Content = styled.div`
  max-width: 1234px;
  margin: 0 auto;
`;