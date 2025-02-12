import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import "./Tmdb.css";

const MovieDetails = () => {
    const { id } = useParams();
    const [data, setData] = useState<any>(null);
    const [cast, setCast] = useState<any>(null);
    const [director, setDirector] = useState<any[]>([]);
    const [screenplay, setScreenplay] = useState<any[]>([]);
    const [trailer, setTrailer] = useState<any>(null);
    useEffect(() => {
        const fetchDetails = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/tv/${id}?api_key=8ece0db0fabe683f10cbd7f8364e1a25`
            );
            const result = await response.json();
            console.log("Details", result);
            setData(result);
        };
        const fetchCastDetails = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/tv/${id}/credits?api_key=8ece0db0fabe683f10cbd7f8364e1a25`
            );
            const result = await response.json();
            //console.log(result);
            const director = result.crew.filter((item: any) => {
                return item.known_for_department === 'Directing';
            });
            const uniqueDirectors = Array.from(
                new Map(director.map((item: any) => [item.id, item])).values()
            );

            setDirector(uniqueDirectors);
            const writer = result.crew.filter((item: any) => {
                return item.known_for_department === 'Writing' && (item.job === 'Screenplay' || item.job === 'Story');
            });
            const uniqueWriters = Array.from(
                new Map(writer.map((item: any) => [item.id, item])).values()
            );

            setScreenplay(uniqueWriters);
            //setScreenplay(writer);
            setCast(result.cast.slice(0, 7));
            // setCast(result.cast.slice(0, 9));
        };
        const fetchVideoDetails = async () => {
            const response = await fetch(
                `https://api.themoviedb.org/3/tv/${id}/videos?api_key=8ece0db0fabe683f10cbd7f8364e1a25`
            );
            const json_response = await response.json();
            // console.log(json_response);
            const trailer = json_response.results.find((item: any) => {
                return item.name === 'Official Trailer';
            })
            //console.log(trailer);
            setTrailer(trailer);
        };
        fetchDetails();
        fetchCastDetails();
        fetchVideoDetails();
    }, [id]);
    const percentage = Math.round((data?.vote_average || 0) * 10);
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
                            <h2>{data.name}</h2>
                            <span>({data.first_air_date.slice(0, 4)})</span>
                        </div>
                        <div className="d-flex">
                            <ul className="d-flex list-unstyled m-0 p-0 gap-2">
                                <li>{data.genres.map((genre: any) => genre.name).join(", ")}</li>
                            </ul>
                        </div>
                        <div className="d-flex align-items-center mt-3 mb-3">
                            <span className="mr-2 "><strong>User Score</strong></span>
                            <div
                                style={{
                                    position: 'relative',
                                    width: '60px',
                                    height: '60px',
                                    background: `conic-gradient(
                                        #F5AD42 0% ${percentage}%, 
                                        #808080 ${percentage}% 100%
                                    )`,
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <div
                                    style={{
                                        position: 'absolute',
                                        width: '50px',
                                        height: '50px',
                                        background: '#101010',
                                        borderRadius: '50%',
                                        display: 'flex',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}
                                ><span>{percentage}%</span></div>
                            </div>
                        </div>
                        <div className="d-flex align-items-center">
                            <div
                                style={{
                                    position: 'relative',
                                    width: '30px',
                                    height: '30px',
                                    backgroundColor: '#F5AD42',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}><i className="bi bi-list-ul"></i>
                            </div>
                            <div
                                style={{
                                    position: 'relative',
                                    width: '30px',
                                    height: '30px',
                                    backgroundColor: '#F5AD42',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: '5px'
                                }}><i className="bi bi-heart-fill"></i>
                            </div>
                            <div
                                style={{
                                    position: 'relative',
                                    width: '30px',
                                    height: '30px',
                                    backgroundColor: '#F5AD42',
                                    borderRadius: '50%',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginLeft: '5px'
                                }}><i className="bi bi-bookmark-fill"></i>
                            </div>
                            {trailer && (
                                <Link to={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noopener noreferrer">
                                    <button type="button" style={{ backgroundColor: '#F5AD42', marginLeft: '5px', color: '#000000' }} className="btn btn-secondary"><i className="bi bi-play-fill"></i>Play Trailer</button>
                                </Link>
                            )}
                        </div>
                        <div>
                            <p className="mt-3 mb-2 font-italic">{data.tagline}</p>
                            <strong>Overview</strong>
                            <p>{data.overview}</p>
                        </div>
                        {director.length > 0 && (
                            <>
                                <strong>Director</strong>
                                <p>{director.map((item: any) => item.name).join(", ")}</p>
                            </>
                        )}

                        {screenplay.length > 0 && (
                            <>
                                <strong>Screenplay, Story</strong>
                                <p>{screenplay.map((item: any) => item.name).join(", ")}</p>
                            </>
                        )}
                    </div>
                </div>
            </div>

            <div className="container-fluid m-3">
                <div className="row">
                    <div className="col-12">
                        <h2 className="h3 m-2" style={{ color: '#F5AD42' }}>Top Cast</h2>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <div className="d-flex flex-row">
                            {
                                cast && cast.map((item: any) => {
                                    const imagePath = item.profile_path
                                        ? `https://image.tmdb.org/t/p/w500${item.profile_path}`
                                        : "https://via.placeholder.com/120x120?text=No+Image";
                                    return (
                                        <div className="card flex-shrink-0 m-2 border-0" style={{ width: "120px" }} key={item.id}>
                                            <img className="card-img-top shadow bg-body rounded" src={imagePath} alt={item.name}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "/noImagealt.png";
                                                }} />
                                            <div className="card-body p-1">
                                                <h6 className="card-title text-center text-wrap fw-bold">{item.name}</h6>
                                                <p className="card-text text-center text-wrap" style={{ fontSize: "12px" }}>{item.character}</p>
                                            </div>
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                </div>
            </div>

        </>
    );
};

export default MovieDetails;
