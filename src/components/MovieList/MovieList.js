import React from "react";
import "./movieList.css";

const MovieList = ({
  movies,
  FavoriteComponent,
  handleFavoriteClick,
  favoriteText,
}) => {
  return (
    <>
      {movies.map((movie, index) => (
        <div className="image-container d-flex justify-content-start m-3">
          <img src={movie.Poster} alt="movie"></img>
          <div
            className="overlay d-flex align-items-center justify-content-center"
            onClick={() => handleFavoriteClick(movie)}
          >
            <FavoriteComponent text={favoriteText} />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
