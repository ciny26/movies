import { MovieCard } from "../components/MovieCard";
import { useNavigate } from "react-router-dom";
import type { Movie } from "../types";

interface favListProps {
  favList: Movie[];
}

export const FavouriteMoviesView = ({ favList }: favListProps) => {
  const navigate = useNavigate();
  return (
    <div className="movies-container">
      {favList.map((movie) => (
        <div
          key={movie.id}
          className="link"
          onClick={() => navigate(`/movie/${movie.id}`)}
        >
          <MovieCard Movie={movie} />
        </div>
      ))}
    </div>
  );
};
