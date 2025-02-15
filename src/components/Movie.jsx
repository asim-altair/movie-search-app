import { useContext } from "react";
import { AppContext } from "../App";
import "./movie.css";

const Movie = () => {
  const { movieDetail, imgBaseurl } = useContext(AppContext);
  return (
    <div className="movie-details">
      {movieDetail ? (
        <div>
          <h1 className="title">{movieDetail.title}</h1>
          <p>{movieDetail.status}</p>
          <span className="languages">
            {movieDetail.spoken_languages.map((item, index) => (
              <p key={index} className="language">
                {item.english_name}
              </p>
            ))}
          </span>
          <img src={`${imgBaseurl}${movieDetail.poster_path}`} alt="poster" />
          <div className="genres">
            {movieDetail.genres.map((item, index) => (
              <p key={index} className="genre">
                {item.name}
              </p>
            ))}
          </div>
          <div className="rating">
            <i className="fa-solid fa-star"></i>
            <p>{movieDetail.vote_average.toFixed(1)}</p>
            <p>({movieDetail.vote_count})</p>
          </div>
          <p className="overview">{movieDetail.overview}</p>
        </div>
      ) : (
        ""
      )}
    </div>
  );
};

export default Movie;
