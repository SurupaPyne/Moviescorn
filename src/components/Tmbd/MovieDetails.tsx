import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./Tmdb.css";

const MovieDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);
    const [cast, setCast] = useState<any>(null);
    // const [crew, setCrew] = useState<any>(null);
    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}?api_key=8ece0db0fabe683f10cbd7f8364e1a25`
            );
            const result = await response.json();
            // console.log(result);
            setData(result);
        };
        const fetchCastDetails = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/movie/${id}/credits?api_key=8ece0db0fabe683f10cbd7f8364e1a25`
            );
            const result = await response.json();
            // const crew = result.crew.filter((item)=>{

            // })
            console.log(result.cast);
            console.log(result.crew);
            setCast(result.cast.slice(0, 9));
            // setCast(result.cast.slice(0, 9));
        };
        fetchDetails();
        fetchCastDetails();
    }, [id]);

    // Check if data is loaded before rendering
    if (!data) {
        return <p>Loading...</p>;
    }
    return (
        <>
            <div
                className="container-fluid movie-container"
                style={{
                    backgroundImage: data
                        ? `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)),url(https://image.tmdb.org/t/p/original${data.backdrop_path})`
                        : "none"
                }}
            >
                <div className="d-flex flex-row w-100 h-100 p-0 m-0">
                    {/* Left side: Movie poster */}
                    <div className="movie-image">
                        <img
                            src={`https://image.tmdb.org/t/p/original${data.poster_path}`}
                            alt={data.title}
                            className="rounded m-4"
                        />
                    </div>

                    {/* Right side: Movie details */}
                    <div className="d-flex flex-column movie-content m-4">
                        <div className="d-flex movie-heading">
                            <h2>{data.title}</h2>
                            <span>({data.release_date.slice(0, 4)})</span>
                        </div>
                        <div className="d-flex">
                            <ul className="d-flex list-unstyled m-0 p-0 gap-2">
                                <li>{data.genres.map((genre: any) => genre.name).join(", ")}</li>
                                <li className="px-2">•</li>
                                <li>{Math.floor(data.runtime / 60)}h {data.runtime % 60}m</li>
                            </ul>
                        </div>

                        <div>
                            <p className="mt-3 mb-0 font-italic">{data.tagline}</p>
                            <strong>Overview:</strong>
                            <p>{data.overview}</p>
                        </div>
                        <p>
                            <strong>Release Date:</strong> {data.release_date.split("-").reverse().join("/")}
                        </p>
                        <p>
                            <strong>Belongs to Collection:</strong>{" "}
                            {data.belongs_to_collection
                                ? data.belongs_to_collection.name
                                : "N/A"}
                        </p>
                    </div>
                </div>
            </div>

            <div className="container d-flex overflow-auto m-3">
                {
                    cast && cast.map((item: any) => {
                        const imagePath = item.profile_path
                            ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                            : "https://via.placeholder.com/120x120?text=No+Image";
                        return (
                            <>
                                <div className="card flex-shrink-0 m-2 border-0" style={{ width: "120px" }} key={item.id}>
                                    <img className="card-img-top shadow bg-body rounded" src={imagePath} alt={item.name} />
                                    <div className="card-body">
                                        <h6 className="card-title text-center text-wrap fw-bold">{item.name}</h6>
                                        <p className="card-text text-center text-wrap" style={{ fontSize: "12px" }}>{item.character}</p>
                                    </div>
                                </div>
                            </>
                        )

                    })
                }
            </div>
        </>
    );
};

export default MovieDetails;
