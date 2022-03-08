import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import Card from './Card';

export default function CardContainer() {
  const [loading, setLoading] = useState(true);
  // data
  const store = useSelector(state => state);
  // pagination
  const dataLimit = 15;
  const [page, setPage] = useState(1);
  const [toRender, setToRender] = useState(store.videogames);
  const [pages] = useState(Math.round(toRender.length / dataLimit));
  const pageLimit = Math.ceil(toRender.length / dataLimit);

  useEffect(() => {
    const toIgnore = ['genres', 'platforms', 'videogames'];
    // videogames: [],   x
    // search: [],      o
    // sorted: [],      o
    // filtered: [],    o
    // genres: [],       x
    // platforms: []     x
    const validRender = Object.keys(store).filter(key => !toIgnore.includes(key)).find(entry => store[entry].length);

    if (validRender) {
      setToRender(store[validRender]);
    } else {
      setToRender(store.videogames);
    }

  }, [store]);

  useEffect(() => {
    if (toRender.length) {
      setLoading(false);
    }
  }, [toRender]);

  function nextPage() {
    if (page < pageLimit) {
      setPage(page + 1);
    }
  }

  function previousPage() {
    if (page >= 2) {
      setPage(page - 1);
    }
  }

  function selectPage(event) {
    const number = Number(event.target.textContent);
    setPage(number);
  }

  const getPaginatedData = (arr) => {
    if (arr.length > dataLimit) {
      const startIndex = page * dataLimit - dataLimit;           // page 1 = 1*15-15 = 0
      const endIndex = page === 1 ? 15 : startIndex + dataLimit; // page 1 = 0 + 15 = 15]

      return arr?.slice(startIndex, endIndex);                   // page 1 = arr[0:15]      
    }

    return arr;
  };

  const getPaginationGroup = () => {
    let start = Math.floor((page - 1) / pageLimit) * pageLimit;          // starts at 0
    return new Array(pageLimit).fill().map((_, i) => start + i + 1);     // 1, 2, 3
  };

  if (loading) {
    return (<Loading>Loading...</Loading>);
  }

  return (
    <Wrapper>
      <List>
        {getPaginatedData(toRender)?.map(game => (
          // TODO: separate link from dispatch callback, they can't be together
          <Card key={game.uuid || game.id} game={game} />
        ))}
      </List>
      <Controls itemCount={pageLimit + 2}> {/*Page limit + 2 buttons*/}
        <button onClick={previousPage} className={`${page === 1 ? 'disabled' : null}`}>
          Prev
        </button>
        {getPaginationGroup()?.map((item, index) => (
          <button key={index} onClick={selectPage}>
            <span>{item}</span>
          </button>
        ))}
        <button onClick={nextPage} className={`${page === pages && 'disabled'}`}>
          Next
        </button>
      </Controls>
    </Wrapper>
  );
}

const Loading = styled.div`
  padding: 200px;
  font-weight: bold;
  font-size: 40px;
  text-align: center;
`;

const List = styled.div`
  display: grid;
  grid-template-columns: repeat(5, auto);
  grid-template-rows: repeat(3, auto);
  gap: 24px;
`;

const Wrapper = styled.div`
  margin: 0 auto;  
  max-width: fit-content;
  display: grid;
`;

const Controls = styled.div`
  margin: 0 auto;  
  max-width: fit-content;
  display: grid;
  gap: 2px;
  padding: 40px 0;
  grid-template-columns: repeat(${props => props.itemCount}, auto);
`;