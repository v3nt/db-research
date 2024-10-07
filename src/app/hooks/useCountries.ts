import { useState } from "react";
import { countryFields, countryFieldsExtra } from "../types/countries";

interface CountryProps {
  baseUrl: string | undefined;
}

const useCountries = ({ baseUrl }: CountryProps) => {
  const [countries, setCountries] = useState<countryFields[]>([]);
  const [country, setCountry] = useState<countryFieldsExtra[]>([]);
  const [errors, setErrors] = useState<string | undefined>();

  const fetchCountries = async () => {
    try {
      const dataFields =
        "?fields=name,flags,population,cca2,country,currencies,capital,languages";
      const all = `${baseUrl}/all${dataFields}`;
      const response = await fetch(all);
      if (response.ok) {
        const data: countryFields[] = await response.json();
        setCountries(data);
      } else {
        console.error(
          "Promise resolved but HTTP status failed",
          response.status
        );
      }
    } catch (error) {
      setErrors("Failed to fetch countries list. See console for more details");
      console.error("Error fetching countries data:", error);
    }
  };

  const fetchCountry = async (id: string) => {
    try {
      const dataFields =
        "?fields=name,flags,population,cca2,country,currencies,capital,unMember,languages,landlocked,maps";
      const all = `${baseUrl}/name/${id}${dataFields}`;
      const response = await fetch(all);
      if (response.ok) {
        const data: countryFieldsExtra[] = await response.json();
        setCountry(data);
      } else {
        console.error(
          "Promise resolved but HTTP status failed",
          response.status
        );
      }
    } catch (error) {
      setErrors("Failed to fetch country item. See console for more details");
      console.error("Error fetching country data:", error);
    }
  };

  return { fetchCountries, countries, country, errors, fetchCountry };
};

export default useCountries;
