import { useState, useEffect } from "react";
import Section from "./Section";
import './Tmdb.css';

const MovieList = () => {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  // const [searchText, setSearchText] = useState("");
  // const [id, setId] = useState<any[]>([]);
  // const [key, setKey] = useState<string[]>([]);
  //const [thumbnail, setThumbnail] =  useState<any[]>([]);

  useEffect(() => {
    const fetchUpcoming = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/upcoming?api_key=8ece0db0fabe683f10cbd7f8364e1a25"
      );
      const data = await response.json();
      setUpcoming(data.results);
    };

    const fetchTrending = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=8ece0db0fabe683f10cbd7f8364e1a25"
      );
      const data = await response.json();
      setTrending(data.results);
    };

    const fetchPopular = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=8ece0db0fabe683f10cbd7f8364e1a25"
      );
      const data = await response.json();
      setPopular(data.results);
    };

    const fetchTopRated = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/top_rated?api_key=8ece0db0fabe683f10cbd7f8364e1a25"
      );
      const data = await response.json();
      setTopRated(data.results);
    };
    fetchUpcoming();
    fetchPopular();
    fetchTrending();
    fetchTopRated();
  }, []);

  const handleSearch = () => {
    if (searchText.trim() === "") {
      setFilteredMovies([]);
      return;
    }
    const allMovies = [...trending, ...topRated,...popular];
    const filtered = allMovies.filter((movie:any) => movie?.name?.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredMovies(filtered);
    //console.log(filteredMovies);
  };

  return (
    <div className="pt-0" style={{ backgroundColor: '#272727' }}>
      <div style={{ position: "relative", display: "inline-block", width: "50%" }}>
        <i className="bi bi-search"
          style={{
            position: 'absolute',
            left: '15px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#aaa',
            fontSize: '16px'
          }}>
        </i>

        {/* Input Field */}
        <input
          type="text"
          className="form-control"
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
            handleSearch();
          }}
          placeholder="search for movies"
          style={{
            padding: '8px 8px 8px 40px',
            width: '100%',
            fontStyle:'italic',
            textAlign: 'left',
            backgroundColor: '#272727',
            border: 'none',
            color: "#ffffff",
          }}
        />
      </div>
      <div style={{
        width: '1016px',
        height: '100px',
        padding: '0px',
        marginTop: '0px',
        marginBottom: '15px',
        color: '#ffffff',
        backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(https://image.tmdb.org/t/p/original/vYqt6kb4lcF8wwqsMMaULkP9OEn.jpg&quot;)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: 'center'
      }}>
        <h2 style={{ marginBottom: '20px', color: '#F5AD42' }}>Movies</h2>
      </div>
      <div className="pt-0 pb-4" style={{ backgroundColor: '#272727' }}>
      {filteredMovies.length > 0 ? (
        <Section title="Search Results" movies={filteredMovies} isScrollable />
      ) : (
        <>
          <Section title="Upcoming" movies={upcoming} isScrollable />
          <Section title="Trending" movies={trending} isScrollable />
          <Section title="Popular" movies={popular} isScrollable />
          <Section title="Top Rated" movies={topRated} isScrollable />
        </>
        )}
      </div>
    </div>
  );
};

export default MovieList;
