import { Link, useNavigate } from "react-router-dom";
import "../Styles/navBar.css";
import { useState } from "react";
import type { Movie } from "../types";

interface NavBarProps {
  sendDataToParent: (movies: Movie[]) => void;
}

export const NavBar = ({ sendDataToParent }: NavBarProps) => {
  const [movieName, setMovieName] = useState<string>("");
  const codedName = encodeURIComponent(movieName);
  const navigate = useNavigate();
  //getting data after typing the name in the input and hitting enter key
  const getMoviesByName = async (): Promise<void> => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjhhOTk2MzQ4MWU2NzFlZWIwYmE1YjFjODg3NTg2NiIsIm5iZiI6MTc1OTg4NDM4NS4wMzMsInN1YiI6IjY4ZTViNDYxOTAzM2FmMzhlYTg5ZmU4MiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.f_H0jTuuFc0UGzeX1b7oILrYQjCvQWNWYW6CjhmhGBE",
      },
    };
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/search/movie?query=${codedName}`,
        options
      );
      const data = await response.json();
      sendDataToParent(data.results);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <div className="logo">🎬 CineScope</div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/favourites">Favourites</Link>
          <Link to="/signIn">Sign In</Link>
        </div>
      </div>

      <div className="navbar-right">
        <input
          type="text"
          placeholder="Search movies..."
          className="search-input"
          onChange={(e) => setMovieName(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              getMoviesByName();
              navigate("/");
            }
          }}
        />

        <img
          src="https://i.pravatar.cc/31"
          alt="User Avatar"
          className="avatar"
        />
      </div>
    </nav>
  );
};
