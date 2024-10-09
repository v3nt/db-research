import { useEffect, useState } from 'react';
type Favorites = string[];

const useFavorites = () => {
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
      updateLocalStorage();
    }
  };

  const removeFavorite = (id: string) => {
    const index = myFavorites.indexOf(id);
    myFavorites.splice(index, 1);
    setFavorites((prev) => [...myFavorites]);
    updateLocalStorage();
  };

  const updateLocalStorage = () => {
    localStorage.setItem('myFavorites', JSON.stringify(myFavorites));
  };

  const localValueFavorites = localStorage.getItem('myFavorites');
  const localValueFavoritesParsed =
    localValueFavorites != null ? JSON?.parse(localValueFavorites) : [];
  if (
    localValueFavoritesParsed &&
    localValueFavoritesParsed.length &&
    !myFavorites.length
  ) {
    localValueFavoritesParsed?.map((id) => myFavorites.push(id));
    console.log('myFavorites', myFavorites);
    //
  }
  useEffect(() => {
    setFavorites((prev) => [...myFavorites]);
  }, []);

  return {
    isInArray,
    favorites,
    setFavorites,
    addFavorite,
    removeFavorite,
  };
};

export default useFavorites;
