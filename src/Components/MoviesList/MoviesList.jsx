import { Pagination } from 'antd';
import React, { useEffect, useState } from 'react';
import MovieCard from '../MovieCard/MovieCard';

function MoviesList() {
  const [moviesList, setMoviesList] = useState([]);
  const moviesPerPage = 10;

  const fetchMovies = async (pageNum) => {
    const response = await fetch(`https://yts.mx/api/v2/list_movies.json?minimum_rating=7&limit=${moviesPerPage}&page=${pageNum}`);
    const { movies } = (await response.json()).data;
    setMoviesList(movies);
  };

  useEffect(() => {
    fetchMovies(1);
    document.body.style.backgroundColor = 'black';
  }, []);

  return (
    <section className="gallery">
      <div className="contents">
        {
        moviesList.map((movie) => <MovieCard key={movie.id} movie={movie} />)
      }
      </div>
      <Pagination
        className="pagination"
        defaultCurrent={1}
        pageSize={moviesPerPage}
        total={50}
        onChange={(page) => fetchMovies(page)}
      />
    </section>
  );
}

export default MoviesList;
