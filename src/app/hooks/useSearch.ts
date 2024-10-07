import { useState } from "react";
import { countryFields } from "../types/countries";

interface SearchProps {
  keys: string[];
}

const useSearch = ({ keys }: SearchProps) => {
  const [results, setResults] = useState<countryFields[]>([]);
  const [resultsMessage, setResultsMessage] = useState<string>();
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  const searchData = (
    searchString: string | undefined,
    data: countryFields[]
  ) => {
    const arr = ["name", "common"];
    const filteredData = data?.filter((item: unknown) =>
      item["name"]["common"].toLowerCase().includes(searchString?.toLowerCase())
    );

    if (filteredData.length > 0) {
      setResults(filteredData);
    }
    if (searchString?.length === 0) {
      setResults(data);
      setResultsMessage("No matching results");
    }
  };

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  return {
    results,
    searchData,
    setSearchTerm,
    searchTerm,
    handleSearch,
    resultsMessage,
  };
};

export default useSearch;
