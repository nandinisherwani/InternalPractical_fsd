import React, { useState, useEffect } from 'react';
import { Play, Info } from 'lucide-react';
import { Movie } from '../types/movie';
import { tmdbApi } from '../services/tmdbApi';
import { TMDB_IMAGE_BASE_URL, IMAGE_SIZES, MOVIE_CATEGORIES } from '../utils/constants';

interface BannerProps {
  onPlayTrailer?: (movie: Movie) => void;
}

const Banner: React.FC<BannerProps> = ({ onPlayTrailer }) => {
  const [featuredMovie, setFeaturedMovie] = useState<Movie | null>(null);

  useEffect(() => {
    const fetchFeaturedMovie = async () => {
      const movies = await tmdbApi.getMovies(MOVIE_CATEGORIES.trending);
      if (movies.length > 0) {
        const randomMovie = movies[Math.floor(Math.random() * movies.length)];
        setFeaturedMovie(randomMovie);
      }
    };

    fetchFeaturedMovie();
  }, []);

  if (!featuredMovie) {
    return (
      <div className="relative h-[70vh] bg-gradient-to-r from-gray-900 to-gray-800 animate-pulse">
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-red-600 border-t-transparent rounded-full animate-spin"></div>
        </div>
      </div>
    );
  }

  const title = featuredMovie.title || featuredMovie.name || featuredMovie.original_title || featuredMovie.original_name;
  const backdropUrl = featuredMovie.backdrop_path 
    ? `${TMDB_IMAGE_BASE_URL}${IMAGE_SIZES.backdrop.large}${featuredMovie.backdrop_path}`
    : 'https://images.pexels.com/photos/7991579/pexels-photo-7991579.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080';

  return (
    <div className="relative h-[70vh] overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${backdropUrl})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/50 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
      </div>

      {/* Content */}
      <div className="relative h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-xl lg:max-w-2xl">
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 leading-tight">
              {title}
            </h1>
            
            <p className="text-lg md:text-xl text-gray-200 mb-8 leading-relaxed line-clamp-3">
              {featuredMovie.overview}
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button 
                onClick={() => onPlayTrailer?.(featuredMovie)}
                className="flex items-center justify-center gap-3 bg-white text-black px-8 py-3 rounded font-semibold hover:bg-gray-200 transition-colors group"
              >
                <Play className="w-6 h-6 group-hover:scale-110 transition-transform" fill="currentColor" />
                Play
              </button>
              
              <button className="flex items-center justify-center gap-3 bg-gray-700/80 text-white px-8 py-3 rounded font-semibold hover:bg-gray-600/80 transition-colors group">
                <Info className="w-6 h-6 group-hover:scale-110 transition-transform" />
                More Info
              </button>
            </div>

            <div className="flex items-center mt-6 text-sm text-gray-300 space-x-4">
              <span className="flex items-center">
                <span className="text-yellow-400 mr-1">★</span>
                {featuredMovie.vote_average.toFixed(1)}
              </span>
              <span>{featuredMovie.release_date?.split('-')[0] || featuredMovie.first_air_date?.split('-')[0]}</span>
              {featuredMovie.adult && (
                <span className="bg-red-600 px-2 py-0.5 rounded text-xs">18+</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Fade to content */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black to-transparent pointer-events-none" />
    </div>
  );
};

export default Banner;
