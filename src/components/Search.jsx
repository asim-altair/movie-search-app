import "./search.css";
import { useContext, useState } from "react";
import { AppContext } from "../App";
import Card from "./Card";

const Search = () => {
  const { fetchedResults, imgBaseurl } = useContext(AppContext);

  return (
    <div className="container-search">
      <h1>Results</h1>
      <div className="movies-list">
        {fetchedResults
          ? fetchedResults.results.map((item) => (
              <Card
                img={item.poster_path}
                rating={item.vote_average}
                title={item.title}
                votes={item.vote_count}
                imgBaseurl={imgBaseurl}
                key={item.id}
                num={item.id}
              />
            ))
          : ""}
      </div>
    </div>
  );
};

export default Search;
