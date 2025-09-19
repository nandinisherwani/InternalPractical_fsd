export interface Movie {
    id: number;
    title?: string;
    name?: string;
    original_title?: string;
    original_name?: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date?: string;
    first_air_date?: string;
    vote_average: number;
    genre_ids: number[];
    adult: boolean;
    video?: boolean;
    media_type?: 'movie' | 'tv';
  }
  
  export interface MovieDetails extends Movie {
    genres: Genre[];
    runtime?: number;
    episode_run_time?: number[];
    number_of_seasons?: number;
    number_of_episodes?: number;
    videos?: {
      results: Video[];
    };
  }
  
  export interface Genre {
    id: number;
    name: string;
  }
  
  export interface Video {
    id: string;
    key: string;
    name: string;
    site: string;
    type: string;
    official: boolean;
  }
  
  export interface TMDBResponse {
    page: number;
    results: Movie[];
    total_pages: number;
    total_results: number;
  }
