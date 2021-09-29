import React, { useEffect, useState } from 'react';
//import InfiniteScroll from "react-infinite-scroll-component";

export const MoviesContext = React.createContext({
  movies: []
});

export default function MoviesProvider({ children }) {
  const [movies, setMovies] = useState([]);
  const [featured, setFeatured] = useState([]);
  const [hasMore, sethasMore] = useState(true);
  const [page, setPage] = useState(2);
  
  useEffect(() => {
    fetch('/api/Movies')
      .then(response => response.json())
      .then(data => setMovies(data));


      fetch('/api/Movies/featured?_page=${page}&_limit=10')
      .then(response => response.json())
      .then(data => setFeatured(data));

  }, []);

  const fetchFeatured = async () => {
    const res = await fetch(
      '/api/Movies/featured?_page=${page}&_limit=10'
    );
    const data = await res.json();
    return data;
  };

  const fetchData = async () => {
    const featuredFormServer = await fetchFeatured();

    setFeatured([...featured, ...featuredFormServer]);
    if (featuredFormServer.length === 0 || featuredFormServer.length < 10) {
      sethasMore(false);
    }
    setPage(page + 1);
  };

  return (
    <MoviesContext.Provider value={{
      movies,
      setMovies,
      featured,
      fetchFeatured,
      fetchData,
      hasMore,
      sethasMore,
      page,
      setPage
    }}>
      {children}
    </MoviesContext.Provider>
  );
}
