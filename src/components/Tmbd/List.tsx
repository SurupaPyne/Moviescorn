import TvCard from './TvCard';
import './Tmdb.css'

interface ListProps {
  title: string;
  movies: Array<{
    id: number;
    name: string;
    poster_path: string;
    vote_average: number;
    first_air_date: string;
  }>;
  isScrollable?: boolean;
}

const List: React.FC<ListProps> = ({ title, movies, isScrollable }) => {
  return (
    <div className="mb-4">
      <h2 className="h3 m-2" style={{ color: '#F5AD42' }}>{title}</h2>
      {/* Horizontal Scroll Container */}
      <div
        className={`d-flex gap-3 ${isScrollable ? 'overflow-auto' : ''}`}
        style={{ maxWidth: '100%',backgroundColor: '#272727' }}
      >
        {movies.map((movie: any) => (
          <div className="card-container" key={movie.id}>
            <TvCard
              key={movie.id}
              title={movie.name}
              image={`https://image.tmdb.org/t/p/w200${movie.poster_path}`}
              rating={movie.vote_average}
              releaseDate={movie.first_air_date}
              id={movie.id}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
