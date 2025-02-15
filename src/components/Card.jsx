import { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import "./card.css";
import { AppContext } from "../App";

const Card = ({ img, rating, title, votes, imgBaseurl, num }) => {
  const [movieId, setMovieId] = useState("");
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`;
  const { movieDetail, setMovieDetail } = useContext(AppContext);
  const navigate = useNavigate();

  const handleClick = () => {
    setMovieId(num);
    navigate("/movie");
  };

  const getCurrentMovie = () => {
    if (movieId !== "") {
      fetch(url)
        .then((response) => {
          if (!response.ok) {
            throw new Error("404");
          }
          return response.json();
        })
        .then((data) => {
          setMovieDetail(data);
          console.log(data);
        });
    }
  };

  useEffect(() => {
    getCurrentMovie();
  }, [movieId]);
  return (
    <div
      className="card"
      onClick={() => {
        handleClick();
      }}
    >
      <img src={`${imgBaseurl}${img}`} alt="poster" />
      <div className="details">
        <p>
          <i className="fa-solid fa-star"></i> {rating.toFixed(1)} ({votes})
        </p>
        <h4>{title}</h4>
      </div>
    </div>
  );
};

export default Card;
