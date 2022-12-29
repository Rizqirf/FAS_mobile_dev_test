import axios from "axios";
import { MOVIEDB_KEY } from "@env";
axios.defaults.baseURL = "https://api.themoviedb.org";

export const fetchTopMovie = () => {
  return async (dispatch) => {
    dispatch({ type: "load/true" });
    const { data } = await axios.get(
      `/3/trending/movie/week?api_key=${MOVIEDB_KEY}`
    );
    await dispatch({ type: "movies/fetchTopMovie", payload: data.results });
    await dispatch({ type: "load/false" });
  };
};

export const fetchMovieDetail = (id) => {
  return (dispatch) => {
    dispatch({ type: "load/true" });
    return axios
      .get(
        `/3/movie/${id}?api_key=${MOVIEDB_KEY}&append_to_response=images,credits`
      )
      .then(({ data }) => {
        dispatch({ type: "movies/fetchMovieDetail", payload: data });
      })
      .then((_) => dispatch({ type: "load/false" }))
      .catch((err) => console.log(err));
  };
};
