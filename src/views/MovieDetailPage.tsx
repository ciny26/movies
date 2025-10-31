import React, { useEffect, useState } from "react";
import getGenre from "../utilities";
import "../Styles/movieDetailPage.css"; // ⬅️ Don’t forget this
import { useParams } from "react-router-dom";
import type { Movie } from "../types";

interface favListProps {
  favList: Movie[];
  sendDataToParent: (movie: Movie[]) => void;
}

export const MovieDetailPage = ({
  favList,
  sendDataToParent,
}: favListProps) => {
  //variables and states
  const { id } = useParams();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [movie, setMovie] = useState<Movie>();

  //handle toggle movie from favourites
  //getting the list of favs from app.tsx than add the movie in it or delete it 
  const handleToggleFavorites = (movie: Movie) => {
    if (favList.some((m: Movie) => m.id === movie.id)) {
      sendDataToParent(favList.filter((m) => m.id !== movie.id));
    } else {
      sendDataToParent([...favList, movie]);
    }
  };
  //loading handler

  useEffect(() => {
    //fetch the movie with id after clicking it
    const fetchMovie = async () => {
      try {
        const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjhhOTk2MzQ4MWU2NzFlZWIwYmE1YjFjODg3NTg2NiIsIm5iZiI6MTc1OTg4NDM4NS4wMzMsInN1YiI6IjY4ZTViNDYxOTAzM2FmMzhlYTg5ZmU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f_H0jTuuFc0UGzeX1b7oILrYQjCvQWNWYW6CjhmhGBE",
          },
        });

        const data = await res.json();
        setIsLoading(false);
        setMovie(data);
      } catch (err) {
        console.error(err);
      }
    };

    fetchMovie();
  }, [id]);

  return (
    <>
      {isLoading && <div>Loading ...</div>}
      {!isLoading && movie && (
        <div className="movie-page">
          <img
            className="movie-poster"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
          />

          <div className="movie-info">
            <h1 className="movie-title">{movie.title}</h1>
            <p className="movie-overview">{movie.overview}</p>

            <h2 className="section-title">Movie Info</h2>

            <p className="movie-detail">
              <strong>Release date:</strong> {movie.release_date}
            </p>
            <p className="movie-detail">
              <strong>Popularity:</strong> {movie.popularity}
            </p>
            <div className="movie-detail genres">
              <strong>Genres:</strong>
              <div className="movie-genres">
                {movie.genres &&
                  movie.genres.map((genre, index) => (
                    <span key={index} className="genre-tag">
                      {genre.name}
                    </span>
                  ))}
              </div>
            </div>

            <button
              className="fav-button"
              onClick={() => handleToggleFavorites(movie)}
            >
              {/* */}
              {favList.some((m: Movie) => m.id === movie.id)
                ? "Delete from favorites"
                : "Add to favorites"}
            </button>
          </div>
        </div>
      )}
    </>
  );
};
