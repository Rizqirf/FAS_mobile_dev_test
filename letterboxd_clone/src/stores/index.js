import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

const initialValue = {
  topMovies: [],
  allMovies: [],
  movieDetail: {},
  popularPeople: [],
  personDetail: {},
  load: true,
};

function dataReducers(state = initialValue, action) {
  switch (action.type) {
    case "movies/fetchTopMovie":
      return { ...state, topMovies: action.payload };
    case "movies/fetchAllMovie":
      return { ...state, allMovies: action.payload };
    case "movies/fetchMovieDetail":
      return { ...state, movieDetail: action.payload };
    case "people/fetchPopularPeople":
      return { ...state, popularPeople: action.payload };
    case "people/fetchPersonDetail":
      return { ...state, personDetail: action.payload };
    default:
      return state;
  }
}

const middlewares = applyMiddleware(thunk);
let store = createStore(dataReducers, middlewares);

export default store;
