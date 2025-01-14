import { useState, useEffect } from "react";
import Section from "./Section";
import './Tmdb.css'

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchTrending = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=8ece0db0fabe683f10cbd7f8364e1a25"
      );
      const data = await response.json();
      setTrending(data.results);
    };

    const fetchTopRated = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=8ece0db0fabe683f10cbd7f8364e1a25&language=en-US&page=1"
      );
      const data = await response.json();
      setTopRated(data.results);
    };

    fetchTrending();
    fetchTopRated();
  }, []);

  const handleSearch = () => {
    if (searchText.trim() === "") {
      setFilteredMovies([]);
      return;
    }
    const allMovies = [...trending, ...topRated];
    const filtered = allMovies.filter((movie) => movie?.title.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredMovies(filtered);
  };

  return (
    <div className="p-4">
      <div className="d-flex justify-content-between mb-4">
        <div className="d-flex">
          <input
            type="text"
            className="form-control me-2"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
            placeholder="Search for a movie"
          />
          <button
            className="btn btn-dark"
            onClick={() => {
              handleSearch();
            }}
          >
            Search
          </button>
        </div>
      </div>
      {filteredMovies.length > 0 ? (
        <Section title="Search Results" movies={filteredMovies} isScrollable/>
      ) : (
        <>
          <Section title="Trending" movies={trending} isScrollable />
          <Section title="Top Rated" movies={topRated} isScrollable />
        </>
      )}
    </div>
  );
};

export default Trending;
