import { useState, useEffect } from "react";
import Section from "./Section";
import Trailer from "./Trailer";
import './Tmdb.css';

const Trending = () => {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [popular, setPopular] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [id, setId] = useState<any[]>([]);
  const [key, setKey] = useState<string[]>([]);
  //const [thumbnail, setThumbnail] =  useState<any[]>([]);

  useEffect(() => {
    const fetchTrending = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/trending/movie/day?api_key=8ece0db0fabe683f10cbd7f8364e1a25"
      );
      const data = await response.json();
      //console.log(data);
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

    const fetchNowPlaying = async () => {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/now_playing?api_key=8ece0db0fabe683f10cbd7f8364e1a25&language=en-US&page=1"
      );
      const data = await response.json();
      const movie_id = data.results.map((item: any) => {
        return item.id;
      });
      setId(movie_id);
    };
    fetchPopular();
    fetchTrending();
    fetchTopRated();
    fetchNowPlaying();
  }, []);

  useEffect(() => {
    const fetchNowPlayingTrailer = async () => {
      let allKeys: string[] = [];
      for (const movieId of id) {
        try {
          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=8ece0db0fabe683f10cbd7f8364e1a25`
          );

          if (!response.ok) {
            throw new Error(`Failed to fetch movie ${movieId}: ${response.status}`);
          }

          const json_response = await response.json();
          const selected_result = json_response.results || [];

          //console.log("API Response:", json_response);

          const trailer = selected_result.filter((item: any) =>
            ["Official Trailer", "New Trailer", "UK Trailer"].includes(item.name)
          );

          console.log("Filtered Trailer:", trailer);

          if (trailer.length > 0) {
            const youtubeKey = trailer.map((item: any) => {
              return item.key;
            });
            allKeys = [...allKeys, ...youtubeKey];
            //console.log("Filtered key:",youtubeKey);
            // setKey((prevKeys) => [...prevKeys, ...youtubeKey]);
          }
        }
        catch (error) {
          console.error("Error fetching trailer:", error);
        }
      }
      setKey(allKeys);
    };
    fetchNowPlayingTrailer();
  }, [id]);


  const handleSearch = () => {
    if (searchText.trim() === "") {
      setFilteredMovies([]);
      return;
    }
    const allMovies = [...trending, ...topRated];
    const filtered = allMovies.filter((movie:any) => movie?.title.toLowerCase().includes(searchText.toLowerCase()));
    setFilteredMovies(filtered);
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
          placeholder="search for movies series"
          style={{
            padding: '8px 8px 8px 40px',
            width: '100%',
            fontStyle:'italic',
            textAlign: 'left',
            backgroundColor: '#272727',
            border:'none',
            color: "#ffffff",
          }}
        />
      </div>
      <div style={{
        width: '1016px',
        height: '200px',
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
        <h2 style={{ marginBottom: '20px', color: '#F5AD42' }}>Welcome to <strong>MoviesCron</strong></h2>
        <p style={{ fontSize: '12px', color: '#F7BD68' }}>Explore trending, top-rated, and latest movies and series</p>
      </div>

      {filteredMovies.length > 0 ? (
        <Section title="Search Results" movies={filteredMovies} isScrollable />
      ) : (
        <>
          <Section title="Trending" movies={trending} isScrollable />
          <Section title="Popular" movies={popular} isScrollable />
          <Section title="Top Rated" movies={topRated} isScrollable />
          <Trailer title="Latest Trailer" movieKey={key} isScrollable />
        </>
      )}
    </div>
  );
};

export default Trending;
