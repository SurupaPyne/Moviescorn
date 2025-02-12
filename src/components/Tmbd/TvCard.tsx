import React from "react";
import './Tmdb.css'
import { Link } from 'react-router-dom';

interface ListCardProps {
  title: string;
  image: string;
  rating: number;
  releaseDate: string;
  id: string;
}

const ListCard: React.FC<ListCardProps> = ({ id, title, image, rating, releaseDate }) => {
  return (
    <div className="card border-0" style={{ width: "162px" }}>
      <Link to={`/tv/${id}`}>
        <div style={{ position: "relative" }}>
          <img
            src={image}
            alt={title}
            className="card-img-top"
            style={{ height: "240px", objectFit: "cover", width: "100%" }}
          />
          <div
            style={{
              position: "absolute",
              width: '40px',
              height: '40px',
              bottom: "-15px",
              right: "10px",
              background: `conic-gradient(
                                        #F5AD42 0% ${Math.round(rating*10)}%, 
                                        #808080 ${Math.round(rating*10)}% 100%
                                    )`,
              borderRadius: '50%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <div
              style={{
                position: 'absolute',
                width: '30px',
                height: '30px',
                color: '#ffffff',
                fontSize: '10px',
                background: '#101010',
                borderRadius: '50%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            ><span>{Math.round(rating*10)}%</span></div>
          </div>
        </div>
      </Link>
      <div className="card-body" style={{ backgroundColor: '#272727' }}>
        <h6 className="card-title text-wrap fw-bolder" style={{ color: '#ffffff',fontSize: '15px' }}>{title}</h6>
        <p className="card-text text-start text-muted" style={{ fontSize: '13px' }}>
          {new Date(releaseDate).toLocaleDateString("en-US", {
            month: "short",
            day: "numeric",
            year: "numeric",
          })}
        </p>
      </div>
    </div>
  );
};

export default ListCard;
