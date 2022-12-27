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
