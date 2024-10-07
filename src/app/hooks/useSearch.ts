import { useState } from "react";
import { countryFields } from "../types/countries";

interface SearchProps {
  keys: string[];
}

const useSearch = ({ keys }: SearchProps) => {
  const [results, setResults] = useState<unknown>([]);
  const [searchTerm, setSearchTerm] = useState<string | undefined>();

  const searchData = (
    searchString: string | undefined,
    data: countryFields[]
  ) => {
    const filteredData = data?.filter((item: unknown) =>
      item.name.common.toLowerCase().includes(searchString?.toLowerCase())
    );

    console.log("filteredData", searchString, filteredData);

    if (filteredData.length > 0) {
      setResults(filteredData);
    }
    if (searchString?.length === 0) {
      setResults(data);
    }
  };

  return { results, searchData, setSearchTerm, searchTerm };
};

export default useSearch;
