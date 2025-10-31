export interface Genre {
  id: number;
  name: string;
}

export interface Movie {
  adult?: boolean;
  backdrop_path?: string;
  genre_ids?: number[]; // For API list responses
  genres?: Genre[]; // For detailed view
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string; // ✅ Use `string` to match API
  title: string;
  video?: boolean;
  vote_average?: number;
  vote_count?: number;
}
