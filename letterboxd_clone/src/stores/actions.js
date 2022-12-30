import axios from "axios";
import { MOVIEDB_KEY } from "@env";
axios.defaults.baseURL = "https://api.themoviedb.org";

export const fetchTopMovie = () => {
  return (dispatch) => {
    return axios
      .get(`/3/trending/movie/week?api_key=${MOVIEDB_KEY}`)
      .then(({ data }) =>
        dispatch({ type: "movies/fetchTopMovie", payload: data.results })
      )
      .catch((err) => console.log(err));
  };
};

export const fetchMovieDetail = (id) => {
  return (dispatch) => {
    return axios
      .get(
        `/3/movie/${id}?api_key=${MOVIEDB_KEY}&append_to_response=images,credits,alternative_titles,similar`
      )
      .then(({ data }) => {
        dispatch({ type: "movies/fetchMovieDetail", payload: data });
      })
      .catch((err) => console.log(err));
  };
};

export const fetchPopularPeople = () => {
  return (dispatch) => {
    return axios
      .get(`/3/person/popular?api_key=${MOVIEDB_KEY}`)
      .then(({ data }) =>
        dispatch({ type: "people/fetchPopularPeople", payload: data.results })
      )
      .catch((err) => console.log(err));
  };
};

export const fetchPersonDetail = (id) => {
  return async (dispatch) => {
    return axios
      .get(
        `/3/person/${id}?api_key=${MOVIEDB_KEY}&language=en-US&append_to_response=images,movie_credits`
      )
      .then(({ data }) =>
        dispatch({ type: "people/fetchPersonDetail", payload: data })
      )
      .catch((err) => console.log(err));
  };
};
