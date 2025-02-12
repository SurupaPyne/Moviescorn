import "./Tmdb.css";

interface TrailerProps {
  title: string;
  movieKey: string[];
  isScrollable: boolean;
}

const Trailer: React.FC<TrailerProps> = ({ title, movieKey, isScrollable }) => {
  return (
    <div className="mb-0">
      <h2 className="h3 m-2" style={{ color: '#F5AD42' }}>{title}</h2>
      <div
        className={`d-flex gap-3 ${isScrollable ? "overflow-auto" : ""}`}
        style={{ maxWidth: "100%",backgroundColor:'#000000' }}
      >
        {movieKey.length > 0 ? (
          movieKey.map((key, index) => (
            <div key={index}>
              <a href={`https://www.youtube.com/watch?v=${key}`} target="_blank" rel="noopener noreferrer">
                <img src={`https://img.youtube.com/vi/${key}/hqdefault.jpg`} alt="Trailer Thumbnail" width="300" height="250" style={{marginLeft:'10px',backgroundColor:'#00000'}}/>
              </a>
            </div>
          ))
        ) : (
          <p>No trailers available.</p>
        )}
      </div>
    </div>
  );
};

export default Trailer;
