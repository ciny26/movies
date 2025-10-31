import React, { useEffect, useState } from "react";
import getGenre from "../utilities";
import "../Styles/movieCard.css";
import type { Genre, Movie } from "../types";

interface MovieCardProps {
  Movie: Movie;
}

export const MovieCard = ({ Movie }: MovieCardProps) => {
  return (
    <div className="movie-card">
      <img
        src={`https://image.tmdb.org/t/p/w500${Movie.backdrop_path}`}
        alt={Movie.original_title}
      />
      <strong>{Movie.title}</strong>
      <div className="genre">
        {Movie.genre_ids &&
          Movie.genre_ids.map((element: number, index: number) => (
            <p key={index}>{getGenre(element)}</p>
          ))}
        {Movie.genres &&
          Movie.genres.map((element: Genre, index: number) => (
            <p key={index}>{element.name}</p>
          ))}
      </div>
    </div>
  );
};

/* 
adult:  false
backdrop_path :  "/2LhyQkd5uD1kxNRtdCpPtcaapxJ.jpg"
genre_ids :  [27]
id :  1038392
original_language :  "en"
original_title :  "The Conjuring: Last Rites"
overview :  "Paranormal investigators Ed and Lorraine Warren take on one last terrifying case involving mysterious entities they must confront."
popularity :  424.9408
poster_path :  "/7JzOmJ1fIU43I3gLHYsY8UzNzjG.jpg"
release_date :  "2025-09-03"
title :  "The Conjuring: Last Rites"
video :  false
vote_average :  6.774
vote_count :  596

*/
