import React, { useEffect, useState } from 'react';

export const MoviesContext = React.createContext({
  movies: []
});

export default function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [page, setPage] = useState(2);
  
  useEffect(() => {
    fetch('/api/Movies')
      .then(response => response.json())
      .then(data => setMovies(data));


    fetch('/api/Movies/featured')
      .then(response => response.json())
      .then(data => setFeatured(data));

  }, []);

  const fetchFeatured = async () => {
    const res = await fetch(
      '/api/Movies/featured'
    );
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const featuredFormServer = await fetchFeatured();

    setFeatured([...featured, ...featuredFormServer]);
    setPage(page + 1);
  };

  return (
    <MoviesContext.Provider value={{
      movies,
      setMovies,
      featured,
      fetchFeatured,
      fetchData,
      page,
      setPage
    }}>
      {children}
    </MoviesContext.Provider>
  );
}
