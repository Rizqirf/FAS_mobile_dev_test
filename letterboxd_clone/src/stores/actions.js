import axios from "axios";
import { MOVIEDB_KEY } from "@env";
axios.defaults.baseURL = "https://api.themoviedb.org";

export const fetchMovies = () => {
  const promise1 = axios.get(`/3/movie/now_playing?api_key=${MOVIEDB_KEY}`);
  const promise2 = axios.get(`/3/movie/top_rated?api_key=${MOVIEDB_KEY}`);
  const promise3 = axios.get(`/3/movie/upcoming?api_key=${MOVIEDB_KEY}`);
  const promise4 = axios.get(`/3/movie/popular?api_key=${MOVIEDB_KEY}`);
  return (dispatch) => {
    return Promise.all([promise1, promise2, promise3, promise4])
      .then(
        ([
          { data: data1 },
          { data: data2 },
          { data: data3 },
          { data: data4 },
        ]) => {
          dispatch({ type: "movies/fetchNowMovie", payload: data1.results });
          dispatch({ type: "movies/fetchTopMovie", payload: data2.results });
          dispatch({
            type: "movies/fetchUpcomingMovie",
            payload: data3.results,
          });
          dispatch({ type: "movies/fetchPopMovie", payload: data4.results });
        }
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
