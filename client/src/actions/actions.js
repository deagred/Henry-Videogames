import axios from 'axios';


export function getVideogames() {
  return async (dispatch) => {
    return await axios('http://localhost:3001/videogames')
      .then(res => res.data)
      .then(data => dispatch({ type: 'GET_VIDEOGAMES', data: data }))
      .catch(e => console.warn('Error fetching games:', e));
  };
}


export function getGenres() {
  return async (dispatch) => {
    return await axios('http://localhost:3001/genres')
      .then(res => res.data)
      .then(data => dispatch({ type: 'GET_GENRES', data: data }))
      .catch(e => console.warn('Error fetching genres:', e));
  };
}


export function getPlatforms() {
  return async (dispatch) => {
    return await axios('http://localhost:3001/platforms')
      .then(res => res.data)
      .then(data => dispatch({ type: 'GET_PLATFORMS', data: data }))
      .catch(e => console.warn('Error fetching platforms:', e));
  };
}


export function searchVideogames(name) {
  return async (dispatch) => {
    return (name && await axios(`http://localhost:3001/videogames?name=${encodeURIComponent(name)}`)
      .then(res => res.data)
      .then(data => dispatch({ type: 'SEARCH_VIDEOGAMES', data: data }))
      .catch(e => console.warn(`Error searching for videogames matching name "${name}"`, e))
    ) || dispatch({ type: 'SEARCH_VIDEOGAMES', data: [] });
  };
}


export function addVideogame(game) {
  return async (dispatch) => {
    return await axios.post(`http://localhost:3001/videogame`, { data: game })
      .then(res => res.data)
      .then(data => {
        if (data.success) {
          dispatch({ type: 'ADD_VIDEOGAME', data: data.data });
        } else {
          return data;
        }
      }).catch(err => console.warn('Error posting data:', err));
  };
}


export function controlledSort(field, order) {
  return {
    type: 'CONTROLLED_SORT',
    data: { field, order }
  };
}


export function controlledFilter(field, value) {
  return {
    type: 'CONTROLLED_FILTER',
    data: { field, value }
  };
}