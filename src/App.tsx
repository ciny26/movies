import { useEffect, useState } from "react";
import "./App.css";
import { MoviesHomePage } from "./views/MoviesHomePage";
import { NavBar } from "./components/NavBar";
import { Route, Routes, useLocation } from "react-router-dom";
import { MovieDetailPage } from "./views/MovieDetailPage";
import { FavouriteMoviesView } from "./views/FavouriteMoviesView";
import type { Movie } from "./types";
import { SignIn } from "./views/SignIn";

//total Pges 52885
function App() {
  //variables and states
  const [moviesList, setMoviesList] = useState([]);
  const [favoriteMovies, setFavoriteMovies] = useState<Movie[]>([]);
  const [searchedMovies, setSearchedMovies] = useState<Movie[]>([]);
  let [page, setPage] = useState<number>(1);
  const max = 52885;
  const location = useLocation(); // ← useLocation here

  //get Searched Movies

  const getSearchedMovies = (movies: Movie[]) => {
    setSearchedMovies(movies);
  };

  //Get data
  useEffect(() => {
    getData();
  }, [page]);

  const getData = async (): Promise<void> => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjhhOTk2MzQ4MWU2NzFlZWIwYmE1YjFjODg3NTg2NiIsIm5iZiI6MTc1OTg4NDM4NS4wMzMsInN1YiI6IjY4ZTViNDYxOTAzM2FmMzhlYTg5ZmU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f_H0jTuuFc0UGzeX1b7oILrYQjCvQWNWYW6CjhmhGBE",
      },
    };

    fetch(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=en-US&page=${page}&sort_by=popularity.desc`,
      options
    )
      .then((res) => res.json())
      .then((data) => setMoviesList(data.results))
      .catch((err) => console.error(err));
  };
  //handling next page and recent page
  const handleNextAndRecentPage = (event: string) => {
    if (event === "next" && page < max) {
      setPage((page) => page + 1);
    } else if (event === "recent" && page > 1) {
      setPage((page) => page - 1);
    }
  };

  //get favourite movie list

  const getFavorites = (favMoviesList: Movie[]) => {
    setFavoriteMovies(favMoviesList);
  };

  return (
    <>
      <NavBar sendDataToParent={getSearchedMovies}></NavBar>
      <Routes>
        <Route
          path="/"
          element={
            <MoviesHomePage
              moviesProps={moviesList}
              sentDataToParent={getFavorites}
              currentFavs={favoriteMovies}
              searchedMovs={searchedMovies}
            />
          }
        />
        <Route
          path="/movie/:id"
          element={
            <MovieDetailPage
              favList={favoriteMovies}
              sendDataToParent={getFavorites}
            />
          }
        />
        <Route
          path="/favourites"
          element={<FavouriteMoviesView favList={favoriteMovies} />}
        />

        <Route path="/signIn" element={<SignIn />} />
      </Routes>
      {location.pathname === "/" && (
        <>
          <button onClick={() => handleNextAndRecentPage("next")}>
            Next Page
          </button>
          <button onClick={() => handleNextAndRecentPage("recent")}>
            Recent Page
          </button>
        </>
      )}
    </>
  );
}

export default App;
