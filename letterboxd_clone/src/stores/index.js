import { applyMiddleware, legacy_createStore as createStore } from "redux";
import thunk from "redux-thunk";

const initialValue = {
  topMovies: [],
  allMovies: [],
  movieDetail: {},
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
    case "load/true":
      return { ...state, load: true };
    case "load/false":
      return { ...state, load: false };
    default:
      return state;
  }
}

const middlewares = applyMiddleware(thunk);
let store = createStore(dataReducers, middlewares);

export default store;
