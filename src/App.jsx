import { useState, createContext } from "react";
import "./app.css";
import Landing from "./components/Landing";
import { Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import Search from "./components/Search";
import Movie from "./components/Movie";

export const AppContext = createContext();

function App() {
  const [fetchedResults, setFetchedResults] = useState();
  const [movieDetail, setMovieDetail] = useState();
  const imgBaseurl = "https://image.tmdb.org/t/p/w300";
  return (
    <AppContext.Provider
      value={{
        fetchedResults,
        setFetchedResults,
        imgBaseurl,
        movieDetail,
        setMovieDetail,
      }}
    >
      <Landing />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<Search />} />
        <Route path="/movie" element={<Movie />} />
      </Routes>
    </AppContext.Provider>
  );
}

export default App;
