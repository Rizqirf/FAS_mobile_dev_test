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
        `/3/movie/${id}?api_key=${MOVIEDB_KEY}&append_to_response=images,credits,alternative_titles`
      )
      .then(({ data }) => {
        dispatch({ type: "movies/fetchMovieDetail", payload: data });
      })
      .catch((err) => console.log(err));
  };
};
