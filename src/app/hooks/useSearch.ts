import { useState } from 'react';
import { countryFields } from '../types/countries';

// TODO: keys to search
// interface SearchProps {
//   keys: string[];
// }

const useSearch = () => {
  const [results, setResults] = useState<countryFields[]>([]);
  const [resultsMessage, setResultsMessage] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  const searchDataByString = (searchString: string, data: countryFields[]) => {
    // TODO: refine types
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

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return {
    results,
    searchDataByString,
    searchTerm,
    handleSearch,
    resultsMessage,
  };
};

export default useSearch;
