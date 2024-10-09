import { useEffect, useState } from 'react';
import { countryFields } from '../types/countries';
type Favorites = string[];

const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorites>([]);

  const [favoriteItems, setFavoriteItems] = useState<countryFields[]>([]);

  const myFavorites: Favorites = [];

  const isInArray = (value: string) => {
    const index = myFavorites.indexOf(value);
    return index != -1 ? true : false;
  };

  const addFavorite = async (id: string) => {
    if (!isInArray(id)) {
      myFavorites.push(id);
      setFavorites(() => [...myFavorites]);
      updateLocalStorage();
    }
  };

  const removeFavorite = (id: string) => {
    const index = myFavorites.indexOf(id);
    myFavorites.splice(index, 1);
    setFavorites(() => [...myFavorites]);
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem('myFavorites', JSON.stringify(myFavorites));
  };

  useEffect(() => {
    // a lot of checks to ensure local storage is used once at the beginning of the session.
    const localValueFavorites = localStorage.getItem('myFavorites');
    const localValueFavoritesParsed =
      localValueFavorites != null ? JSON?.parse(localValueFavorites) : [];
    if (
      localValueFavoritesParsed &&
      localValueFavoritesParsed.length &&
      !myFavorites.length
    ) {
      localValueFavoritesParsed?.map((id: string) => myFavorites.push(id));
    }
    setFavorites(() => [...myFavorites]);
  }, []);

  const listMyFavorites = (items: countryFields[]) => {
    const myFavoritesDetails = favorites.map((id: string) => {
      return items.filter((item) => item.id === id)[0];
    });
    console.log(myFavoritesDetails);
    setFavoriteItems(myFavoritesDetails);

    return myFavoritesDetails;
  };

  return {
    isInArray,
    favorites,
    favoriteItems,
    setFavorites,
    addFavorite,
    removeFavorite,
    listMyFavorites,
  };
};

export default useFavorites;
