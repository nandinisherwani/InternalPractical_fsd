import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Banner from './components/Banner';
import MovieRow from './components/MovieRow';
import MovieModal from './components/MovieModal';
import { Movie } from './types/movie';
import { MOVIE_CATEGORIES } from './utils/constants';

function App() {
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handlePlayMovie = (movie: Movie) => {
    setSelectedMovie(movie);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  return (
    <div className="bg-black min-h-screen">
      <Navbar />
      
      <main className="pt-16">
        <Banner onPlayTrailer={handlePlayMovie} />
        
        <div className="pb-20">
          <MovieRow
            title="Trending Now"
            endpoint={MOVIE_CATEGORIES.trending}
            onPlayMovie={handlePlayMovie}
          />
          
          <MovieRow
            title="Top Rated Movies"
            endpoint={MOVIE_CATEGORIES.topRated}
            onPlayMovie={handlePlayMovie}
          />
          
          <MovieRow
            title="Action Movies"
            endpoint={MOVIE_CATEGORIES.action}
            onPlayMovie={handlePlayMovie}
          />
          
          <MovieRow
            title="TV Shows"
            endpoint={MOVIE_CATEGORIES.tvShows}
            onPlayMovie={handlePlayMovie}
          />
        </div>
      </main>

      {selectedMovie && (
        <MovieModal
          movie={selectedMovie}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}

export default App;