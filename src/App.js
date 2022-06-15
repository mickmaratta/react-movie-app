import React, { useState, useEffect }from 'react';
import 'react-bootstrap/dist/react-bootstrap.min.js';
import './App.css';
import MovieList from './components/MovieList/MovieList';
import MovieListHeading from './components/MovieListHeading/MovieListHeading';
import SearchBox from './components/SearchBox/SearchBox';
import AddFavorites from './components/AddFavorites/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites/RemoveFavorites';
import Header from './components/Header/Header';


const App = () => {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);
  const [watchLater, setWatchLater] = useState([]);

  const getMovieRequest = async (searchValue) => {
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=ea56c149`;

    const response = await fetch(url);
    const responseJson = await response.json();

    if(responseJson.Search) {
      setMovies(responseJson.Search)
    }
  };

  useEffect(() => {
    getMovieRequest(searchValue);
  }, [searchValue])

  useEffect(() => {
    const movieFavorites = JSON.parse(localStorage.getItem('react-movie-app-favorites'));
    const watchLater = JSON.parse(localStorage.getItem('react-movie-app-watch-later'));
    movieFavorites ? setFavorites(movieFavorites) : setFavorites([]);
    watchLater ? setWatchLater(watchLater) : setWatchLater([]);

  }, [])

  const saveToLocalStorage = (key, items) => {
    localStorage.setItem(key, JSON.stringify(items))
  }

  const addFavoriteMovie = (movie) => {
    const newFavoriteList = [...favorites, movie]
    if (favorites.includes(movie)) {
      return
    } else {
      setFavorites(newFavoriteList)
      saveToLocalStorage('react-movie-app-favorites', newFavoriteList);
    }
  }

  const removeFavoriteMovie = (movie) => {
    const newFavoriteList = favorites.filter((favorite) => favorite.imdbID !== movie.imdbID)
    setFavorites(newFavoriteList);
    saveToLocalStorage('react-movie-app-favorites', newFavoriteList);
  }

  const addWatchLaterMovie = movie => {
    const newWatchLaterList = [...watchLater, movie]
    if (watchLater.includes(movie)) {
      return
    } else {
      setWatchLater(newWatchLaterList)
      saveToLocalStorage('react-movie-app-watch-later', newWatchLaterList);
    }
  }

  const removeWatchLaterMovie = (movie) => {
    const newWatchLaterList = watchLater.filter((favorite) => favorite.imdbID !== movie.imdbID)
    setWatchLater(newWatchLaterList);
    saveToLocalStorage('react-movie-app-watch-later', newWatchLaterList);
  }

  console.log(movies)
  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center justify-content-center'>
        <Header />
      </div>
      <div className='row d-flex justify-content-center'>
      <SearchBox 
          searchValue={searchValue}
          setSearchValue={setSearchValue}
          />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading 
          heading='MOVIES'
          />
      </div>
      <div className='movie-list row'>
        <MovieList
          movies={movies}
          FavoriteComponent={AddFavorites}
          handleFavoriteClick={addFavoriteMovie}
          handleWatchLaterClick={addWatchLaterMovie} 
          favoriteText='Favorite'
          watchLaterText='To Watch'
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='FAVOURITES' />
      </div>
      <div className='row'>
        <MovieList 
          movies={favorites}
          FavoriteComponent={RemoveFavorites}
          handleFavoriteClick={removeFavoriteMovie}
          handleWatchLaterClick={null}
          favoriteText='Remove'
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <MovieListHeading heading='MOVIES TO WATCH...' />
      </div>
      <div className='row'>
        <MovieList 
          movies={watchLater}
          FavoriteComponent={RemoveFavorites}
          handleFavoriteClick={removeWatchLaterMovie}
          handleWatchLaterClick={null}
          favoriteText='Remove'
        />
      </div>
    </div>
  )
}

export default App;

/* 




        
*/
