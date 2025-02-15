import Card from "./Card";
import "./popular.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { useState, useEffect } from "react";

const Popular = () => {
  const apiKey = import.meta.env.VITE_TMDB_API_KEY;
  const imgBaseurl = "https://image.tmdb.org/t/p/w300/";

  const [popularMovies, setPopulerMovies] = useState();
  const [upComingMovies, setUpComingMovies] = useState();

  const getPopularMovies = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
    )
      .then((response) => {
        if (!response.ok) {
          return;
        }
        return response.json();
      })
      .then((data) => {
        setPopulerMovies(data);
      });
  };

  const getUpComing = () => {
    fetch(
      `https://api.themoviedb.org/3/movie/upcoming?api_key=${apiKey}&language=en-US&page=1`
    )
      .then((response) => {
        if (!response.ok) {
          throw new Error("404");
        }
        return response.json();
      })
      .then((data) => {
        setUpComingMovies(data);
      });
  };

  useEffect(() => {
    getPopularMovies();
    getUpComing();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 710,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <div>
      <div className="movies-container">
        <Slider {...settings}>
          {popularMovies
            ? popularMovies.results.map((item, index) => {
                return (
                  <Card
                    key={index}
                    img={item.poster_path}
                    rating={item.vote_average}
                    title={item.title}
                    votes={item.vote_count}
                    imgBaseurl={imgBaseurl}
                    num={item.id}
                  />
                );
              })
            : ""}
        </Slider>
      </div>
      <div className="movies-container">
        <Slider {...settings}>
          {upComingMovies
            ? upComingMovies.results.map((item, index) => {
                return (
                  <Card
                    key={index}
                    img={item.poster_path}
                    rating={item.vote_average}
                    title={item.title}
                    votes={item.vote_count}
                    imgBaseurl={imgBaseurl}
                    num={item.id}
                  />
                );
              })
            : ""}
        </Slider>
      </div>
    </div>
  );
};

export default Popular;
