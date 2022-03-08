import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { controlledFilter, controlledSort, searchVideogames } from '../actions/actions';
import { BodyMain, Input } from './styles/TextStyles.jsx';

export default function Browser() {

  const [filter, setFilter] = useState({ field: '', value: '' });
  const [sort, setSort] = useState({ field: '', order: 'descending' });
  const [searchQuery, setSearchQuery] = useState('');

  const genres = useSelector(state => state.genres);
  const dispatch = useDispatch();

  const handleOrder = () => {
    setSort({ ...sort, order: sort.order === 'descending' ? 'ascending' : 'descending' });
  };

  const changeFilter = (e) => {
    const value = e.target.value;
    const field = e.target.name; 
    setFilter({ field: field, value: value });
  };

  const changeSort = (e) => {
    const field = e.target.value;
    setSort({ ...sort, field: field });
  };

  const handleSort = (e) => {
    const isOn = e.target.checked;
    if (isOn) {
      dispatch(controlledSort(sort.field, sort.order));
    } else {
      dispatch(controlledSort(''));
    }
  };

  const handleFilter = (e) => {
    const isOn = e.target.checked;
    if (isOn) {
      dispatch(controlledFilter(filter.field, filter.value));  
    } else {
      dispatch(controlledFilter(''));  
    }
  };

  useEffect(() => {
    dispatch(searchVideogames(searchQuery));
  }, [searchQuery]);

  const handleSearch = (e) => {
    const value = e.target.value ?? '';
    if (e.key === 'Enter') {
      setSearchQuery(value);
    }
  };

  return (
    <Wrapper>
      <Search>
        <DropdownContainer>
          <BodyMain>Filter<Input type="checkbox" onClick={handleFilter} /></BodyMain>
          <Select id="type" name="genre" onChange={changeFilter}>
            {genres?.map(genre => <Option key={genre.id} value={genre.name}>{genre.name}</Option>)}
          </Select>
        </DropdownContainer>
        <DropdownContainer>
          <BodyMain>Sort<Input type="checkbox" onClick={handleSort} /></BodyMain>
          <Select id="sort" name="sort" onChange={changeSort}>
            <Option value='title'>title</Option>
            <Option value='rating'>rating</Option>
          </Select>
        </DropdownContainer>
        <BodyMain> Ascending
          <Input type="checkbox" onClick={handleOrder} />
        </BodyMain>
        <Input type="search" onKeyDown={handleSearch} placeholder="Search..." />
      </Search>
      <BodyMain>Database entries only<Input type="checkbox" name='uuid' onClick={changeFilter} /></BodyMain>
    </Wrapper>

  );
}

const Wrapper = styled.div`
  margin: 0 auto;  
  max-width: fit-content;
  padding: 40px;
`;

const DropdownContainer = styled.div`
  display: grid;
  gap: 8px;
  grid-template-columns: auto auto;

  align-items: center;
  justify-items: center;
`;

const Select = styled.select`
  font-size: 16px;
  text-align: center;
  background: transparent;
  border: none;
  border-bottom: 1px solid #fff;
  border-radius: 2px;
  color: #fff;
  padding: 8px 16px;
  margin: 8px;

  &:focus {
    outline:none;
  }
`;

const Option = styled.option`
    color: #22333B;
    background: whitesmoke;
    text-align: center;
`;

const Search = styled.div`
  display: grid;
  grid-template-columns: repeat(4, auto);
  gap: 16px;
  padding: 48px 0;

  align-items: center;
  justify-items: center;

`;