const initialState = {
  videogames: [],
  search: [],
  sorted: [],
  filtered: [],
  genres: [],
  platforms: []
};


export default function reducer(state = initialState, action) {
  switch (action.type) {
    case 'GET_VIDEOGAMES':
      return {
        ...state,
        videogames: action.data
      };

    case 'ADD_VIDEOGAME':
      return {
        ...state,
        videogames: state.videogames.concat(action.data)
      };

    case 'GET_GENRES':
      return {
        ...state,
        genres: action.data
      };

    case 'GET_PLATFORMS':
      return {
        ...state,
        platforms: action.data
      };

    case 'SEARCH_VIDEOGAMES':
      return {
        ...state,
        search: action.data
      };

    case 'CONTROLLED_SORT':
      var { field, order } = action.data;

      return {
        ...state,
        sorted: (field && [...state.videogames].sort((a, b) => {
          const aController = Number(a[field]) || a[field].toLowerCase();
          const bController = Number(b[field]) || b[field].toLowerCase();
          if (aController && bController) {
            if (aController > bController) return (order === 'ascending' && 1) || -1;
            if (bController > aController) return (order === 'descending' && 1) || -1;
          }
          return 0;
        })) || []
      };

    case 'CONTROLLED_FILTER':
      // eslint-disable-next-line
      var { field, value } = action.data;

      return {
        ...state,
        // eslint-disable-next-line
        filtered: (field && state.videogames.filter(videogame => {
          if (field === 'uuid' && videogame.uuid) {
            return videogame;
          }
          if (field === 'genre' && videogame.Genres.find(genre => genre.name === value)) {
            return videogame;
          }
        })) || []
      };

    default: 
      return state;
  }
}
