import React from "react";
import './Tmdb.css'
import {Link} from 'react-router-dom';

interface MovieCardProps {
  title: string;
  image: string;
  rating: number;
  releaseDate: string;
  id: string;
}

const MovieCard: React.FC<MovieCardProps> = ({ id, title, image, rating, releaseDate }) => {
  return (
    <div className="card border-0" style={{ width: "162px" }}>
      <Link to={`/${id}`}>
      <img
        src={image}
        alt={title}
        className="card-img-top shadow bg-body rounded"
        style={{ height: "240px", objectFit: "cover" }}
      />
      </Link>
      <div className="card-body">
        <h6 className="card-title text-wrap">{title}</h6>
        <p className="card-text text-start text-muted">{releaseDate}</p>
        {/* <p className="card-text text-center text-warning">Rating: {rating}</p> */}
      </div>
    </div>
  );
};

export default MovieCard;
