import { useEffect, useState } from 'react';

// interface FavoriteProps {}

// add country ID to array
type Favorites = string[];

const useFavorites = () => {
  //  update from local storage if empty

  // console.log('useFavorites favoritesStartingPoint', favoritesStartingPoint);

  const [favorites, setFavorites] = useState<Favorites>([]);

  const toggleAsFavorite = (id: string): void => {
    console.log(
      'toggleAsFavorite',
      favorites?.find((item) => item === id)?.length,
      `${id}`
    );
    if (favorites && favorites?.find((item) => item === id)?.length) {
      // removeFavorite(id);
    } else {
      // addFavorite(id);
    }
    return;
  };

  // add to favs

  // rm from fav
  // const localValueFavorites = localStorage.getItem('favorites');
  useEffect(() => {
    // localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  // const favoritesStartingPoint = localValueFavorites
  //   ? JSON?.parse(localValueFavorites)
  //   : '';

  return {
    favorites,
    setFavorites,
    toggleAsFavorite,
  };
};

export default useFavorites;
