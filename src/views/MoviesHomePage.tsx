import React, { useEffect, useState } from "react";
import { MovieCard } from "../components/MovieCard";
import "../Styles/moviesView.css";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types";

interface MoviesViewProps {
  moviesProps: Movie[];
  sentDataToParent: (movie: Movie[]) => void;
  currentFavs: Movie[];
  searchedMovs: Movie[];
}

export const MoviesHomePage = ({
  moviesProps,
  sentDataToParent,
  currentFavs,
  searchedMovs,
}: MoviesViewProps) => {
  const [isFavorite, setIsFavourite] = useState<Movie[]>(currentFavs);
  const [moviesToRender, setMoviesToRender] = useState<Movie[]>(moviesProps);

  useEffect(() => {
    if (Array.isArray(searchedMovs) && searchedMovs.length > 0) {
      setMoviesToRender(searchedMovs);
    } else {
      setMoviesToRender(moviesProps);
    }
  }, [searchedMovs, moviesProps]);

  let favouriteMoviesList: Movie[];
  const toggleFavourites = (movie: Movie) => {
    if (isFavorite.some((m) => m.id === movie.id)) {
      favouriteMoviesList = isFavorite.filter((el) => el.id !== movie.id);
    } else {
      favouriteMoviesList = [...isFavorite, movie];
    }
    setIsFavourite(favouriteMoviesList);
    sentDataToParent(favouriteMoviesList);
  };
  //method to get data
  const navigate = useNavigate();

  return (
    <div className="movies-container">
      {moviesToRender.map((movie) => (
        <div
          key={movie.id}
          className="link"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <button
            className={"heart-button"}
            onClick={(e) => {
              e.stopPropagation();
              toggleFavourites(movie);
            }}
          >
            {isFavorite.some((m) => m.id === movie.id) ? "❤️" : "🤍"}
          </button>
          <MovieCard Movie={movie} />
        </div>
      ))}
    </div>
  );
};
