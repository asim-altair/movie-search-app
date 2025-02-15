import { useEffect, useState, useContext } from "react";
import { AppContext } from "../App";
import { useNavigate } from "react-router-dom";
import "./landing.css";

const Landing = () => {
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState(query);
  const [inputActive, setInputActive] = useState(false);
  const [searchResults, setSearchResults] = useState();
  const navigate = useNavigate();
  const { fetchedResults, setFetchedResults } = useContext(AppContext);

  const imgUrl = "https://image.tmdb.org/t/p/w300";

  const handleInput = (e) => {
    setQuery(e.target.value);
  };
  const handleInputSelect = (e) => {
    if (!inputActive) {
      setInputActive(true);
    }
  };

  const handleInputBlur = () => {
    if (inputActive) {
      setInputActive(false);
      if (debouncedQuery === "") {
        setSearchResults("");
      }
    }
  };

  const handleEnter = (e) => {
    if (e.key === "Enter") {
      setFetchedResults(searchResults);
      e.target.blur();
      navigate("/search");
    }
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(query);
    }, 500);

    return () => clearTimeout(timer);
  }, [query]);

  const getSearchData = () => {
    if (debouncedQuery.trim() !== "") {
      fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=${
          import.meta.env.VITE_TMDB_API_KEY
        }&query=${debouncedQuery}&page=1`
      )
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network request failed");
          }
          return response.json();
        })
        .then((data) => {
          setSearchResults(data);
        })
        .catch((error) => {
          console.error("Error:", error);
        });
    }
  };

  useEffect(() => {
    if (debouncedQuery) {
      getSearchData();
    }
  }, [debouncedQuery]);

  return (
    <div className="landing">
      <h1>Movies</h1>
      <input
        type="text"
        placeholder="type to search"
        onChange={handleInput}
        onFocus={handleInputSelect}
        onBlur={handleInputBlur}
        onKeyDown={handleEnter}
        value={query}
      />
      <div className={inputActive ? "results" : "none"}>
        {searchResults
          ? searchResults.results.slice(0, 5).map((item) => (
              <div key={item.id} className="result">
                <>
                  <img src={`${imgUrl}${item.poster_path}`} alt="Poster" />
                </>
                <div>
                  <h4>{item.title}</h4>
                  <p>{item.release_date}</p>
                </div>
              </div>
            ))
          : ""}
      </div>
    </div>
  );
};

export default Landing;
