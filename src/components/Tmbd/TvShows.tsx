import { useState, useEffect } from "react";
import List from "./List";
import './Tmdb.css';

const MovieList = () => {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  useEffect(() => {
    const fetchTrending = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/tv/day?api_key=8ece0db0fabe683f10cbd7f8364e1a25"
      );
      const data = await response.json();
      setTrending(data.results);
      console.log("trend", data);
    };

    const fetchPopular = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/popular?api_key=8ece0db0fabe683f10cbd7f8364e1a25"
      );
      const data = await response.json();
      setPopular(data.results);
      //console.log("pop",data);
    };

    const fetchTopRated = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/tv/top_rated?api_key=8ece0db0fabe683f10cbd7f8364e1a25"
      );
      const data = await response.json();
      setTopRated(data.results);
      //console.log("top",data);
    };

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
    <div className="pt-0 pb-4" style={{ backgroundColor: '#272727' }}>
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
          placeholder="search for tv series"
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
        <h2 style={{ marginBottom: '20px', color: '#F5AD42' }}>Tv Series</h2>
      </div>
      <div className="pt-0" style={{ backgroundColor: '#272727' }}>
      {filteredMovies.length > 0 ? (
        <List title="Search Results" movies={filteredMovies} isScrollable />
      ) : (
        <>
          <List title="Trending" movies={trending} isScrollable />
          <List title="Popular" movies={popular} isScrollable />
          <List title="Top Rated" movies={topRated} isScrollable />
        </>
        )}
      </div>
    </div>
  );
};

export default MovieList;
