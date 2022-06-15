import React from "react";
import './movieList.css';

const MovieList = ({movies, FavoriteComponent, handleFavoriteClick, handleWatchLaterClick, favoriteText, watchLaterText}) => {
    return (
        <>
            {movies.map((movie, index) => 
                <div className="image-container d-flex justify-content-start m-3">
                    <img src={movie.Poster} alt="movie"></img>
                    <div 
                        className="overlay d-flex align-items-center justify-content-center" 
                        onClick={() => handleFavoriteClick(movie)}
                    >
                        <FavoriteComponent text={favoriteText}/>
                    </div> 
                    {handleWatchLaterClick && <div 
                        className="overlay-top d-flex align-items-center justify-content-center" 
                        onClick={() => handleWatchLaterClick(movie)}
                    >
                        <FavoriteComponent text={watchLaterText} />
                    </div> }
                </div>
            )}
        </>
    )
}

export default MovieList;