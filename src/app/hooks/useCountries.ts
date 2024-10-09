import { useState } from 'react';
import { countryFields, CountryFieldsExtra } from '../types/countries';

interface CountryProps {
  baseUrl: string | undefined;
  favoriteIds?: string[];
}

const useCountries = ({ baseUrl, favoriteIds }: CountryProps) => {
  const [countries, setCountries] = useState<countryFields[]>([]);
  const [country, setCountry] = useState<CountryFieldsExtra>();
  const [errors, setErrors] = useState<string | undefined>();

  const fetchCountries = async () => {
    try {
      const dataFields =
        '?fields=name,flags,population,cca2,country,currencies,capital,languages';
      const all = `${baseUrl}/all${dataFields}`;
      const response = await fetch(all);
      if (response.ok) {
        const data: countryFields[] = await response.json();
        // add ID & favorite true|false to array.
        setCountries(() =>
          data.map((country) => {
            return {
              ...country,
              id: country.cca2,
              isFavorite: false,
            };
          })
        );
      } else {
        console.error(
          'Promise resolved but HTTP status failed',
          response.status
        );
      }
    } catch (error) {
      setErrors('Failed to fetch countries list. See console for more details');
      console.error('Error fetching countries data:', error);
    }
  };

  const fetchCountry = async (id: string) => {
    try {
      const dataFields =
        '?fields=name,flags,population,cca2,country,currencies,capital,unMember,languages,landlocked,maps';
      const all = `${baseUrl}/name/${id}${dataFields}`;
      const response = await fetch(all);
      if (response.ok) {
        const data: countryFieldsExtra[] = await response.json();
        setCountry(() => data[0]);
      } else {
        console.error(
          'Promise resolved but HTTP status failed',
          response.status
        );
      }
    } catch (error) {
      setErrors('Failed to fetch country item. See console for more details');
      console.error('Error fetching country data:', error);
    }
  };

  return { fetchCountries, countries, country, errors, fetchCountry };
};

export default useCountries;
