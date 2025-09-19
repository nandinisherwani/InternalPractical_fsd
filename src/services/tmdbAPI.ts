import axios from 'axios';
import { TMDB_BASE_URL, TMDB_API_KEY } from '../utils/constants';
import { TMDBResponse, Movie } from '../types/movie';

const api = axios.create({
  baseURL: TMDB_BASE_URL,
  params: {
    api_key: TMDB_API_KEY,
  },
});

export const tmdbApi = {
  getMovies: async (endpoint: string): Promise<Movie[]> => {
    try {
      const response = await api.get<TMDBResponse>(endpoint);
      return response.data.results;
    } catch (error) {
      console.error('Error fetching movies:', error);
      return [];
    }
  },
};
