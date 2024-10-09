import { useEffect, useState } from 'react';

// interface FavoriteProps {}

// add country ID to array
type Favorites = string[];

const useFavorites = () => {
  //  update from local storage if empty

  console.log('useFavorites favoritesStartingPoint');

  const [favorites, setFavorites] = useState<Favorites>([]);
  const myFavorites: Favorites = [];

  const isInArray = (value: string) => {
    const index = myFavorites.indexOf(value);
    return index != -1 ? true : false;
  };

  const addFavorite = async (id: string) => {
    if (!isInArray(id)) {
      myFavorites.push(id);
      setFavorites((prev) => [...myFavorites]);
    }
  };

  const removeFavorite = (id: string) => {
    const index = myFavorites.indexOf(id);
    myFavorites.splice(index, 1);
    setFavorites((prev) => [...myFavorites]);
  };

  // const localValueFavorites = localStorage.getItem('favorites');
  useEffect(() => {
    // localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // const favoritesStartingPoint = localValueFavorites
  //   ? JSON?.parse(localValueFavorites)
  //   : '';

  return {
    isInArray,
    favorites,
    setFavorites,
    addFavorite,
    removeFavorite,
  };
};

export default useFavorites;
