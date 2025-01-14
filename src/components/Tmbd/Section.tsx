// import React from "react";
import './Tmdb.css'
import MovieCard from "./MovieCard"; // Importing MovieCard
interface SectionProps {
  title: string;
  movies: Array<{
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    release_date: string;
  }>;
  isScrollable?: boolean;
}

const Section: React.FC<SectionProps> = ({ title, movies, isScrollable }) => {
  return (
    <div className="mb-4">
      <h2 className="h3 mb-4">{title}</h2>
      {/* Horizontal Scroll Container */}
      <div
        className={`d-flex gap-3 ${isScrollable ? 'overflow-auto' : ''}`}
        style={{ maxWidth: '100%' }}
      >
        {movies.map((movie:any) => (
          <div className="card-container" key={movie.id}>
            <MovieCard
              key={movie.id}
              title={movie.title}
              image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              rating={movie.vote_average}
              releaseDate={movie.release_date}
              id={movie.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Section;
