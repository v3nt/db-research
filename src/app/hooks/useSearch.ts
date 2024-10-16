import { useState } from 'react';
import { countryFields } from '../types/countries';

// TODO: keys to search
// interface SearchProps {
//   keys: string[];
// }

const useSearch = () => {
  const [results, setResults] = useState<countryFields[]>([]);
  const [resultsMessage, setResultsMessage] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string>('');

  const searchDataByString = (searchString: string, data: countryFields[]) => {
    const filteredData = data?.filter(({ name }: countryFields) =>
      name['common'].toLowerCase().includes(searchString?.toLowerCase())
    );

    if (filteredData.length > 0) {
      setResults(filteredData);
    }
    if (searchString?.length === 0) {
      setResults(data);
      setResultsMessage('No matching results');
    }
  };

  const filterDataByCurrency = (
    currencyValue: string,
    data: countryFields[]
  ) => {
    const filteredData = data.filter(
      (item) => currencyValue in item.currencies
    );

    if (filteredData.length > 0) {
      setResults(filteredData);
    }

    if (currencyValue?.length === 0) {
      setResults(data);
      setResultsMessage('No matching results');
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  return {
    filterDataByCurrency,
    handleSearch,
    results,
    resultsMessage,
    searchDataByString,
    searchTerm,
    setSearchTerm,
  };
};

export default useSearch;
