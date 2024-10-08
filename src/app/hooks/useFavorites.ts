import { useEffect, useState } from 'react';

interface FavoriteProps {}

// add country ID to array
type Favorites = string[];

const useFavorites = ({}: FavoriteProps) => {
  const [favorites, setFavorites] = useState<Favorites>([]);

  //  update from local storage if empty

  // add to favs
  const addFavorite = (id) => {
    setFavorites((old) => [...old, id]);
    console.log('addFavorite', favorites, id);
  };

  const removeFavorite = (id) => {
    setFavorites((old) => old.filter((s, i) => i != id));
    console.log('removeFavorite', favorites, id);
  };

  useEffect(() => {}, [favorites]);

  return { favorites, addFavorite, removeFavorite };
};

export default useFavorites;
