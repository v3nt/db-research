"use client";

import { Url } from "next/dist/shared/lib/router/router";
import Image from "next/image";

import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid

import { useEffect, useState } from "react";

type name = {
  common: string;
  official: string;
  nativeName: {
    fra: {
      official: string;
      common: string;
    };
  };
};

type flags = {
  png: string;
  svg: string;
  alt: string;
};

type countryFields = {
  name: name;
  flags: flags;
  population: number;
  cca2: string;
  country: string;
  currency: string;
  capital: string[];
};

interface countryFieldsExtra extends countryFields {
  unMember: string;
  altSpellings: string[];
  languages: { string: string };
  landlocked: boolean;
  maps: { string: Url };
}

type JSONResponse = {
  data?: countryFieldsExtra[];
  errors?: Array<{ message: string }>;
};

export default function Home() {
  const [countries, setCountries] = useState<countryFields[] | undefined>([]);
  const [country, setCountry] = useState<countryFieldsExtra[] | undefined>([]);

  // AG grid

  const [colDefs, setColDefs] = useState([
    { field: "name" },
    { field: "flags" },
    { field: "population" },
    { field: "cca2" },
    { field: "country" },
    { field: "currency" },
    { field: "capital" },
  ]);

  const base = process.env.NEXT_PUBLIC_COUNTRIES_BASE_URL;

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const dataFields =
          "?fields=name,flags,population,cca2,country,currency,capital";
        const all = `${base}/all${dataFields}`;
        const response = await fetch(all);
        const data = await response.json();
        setCountries(data);
      } catch (error) {
        console.error("Error fetching countries data:", error);
      }
    };

    fetchCountries();

    const fetchCountry = async (id: string) => {
      try {
        const dataFields =
          "?fields=name,flags,population,cca2,country,currency,capital,unMember,altSpellings,languages,landlocked,maps";
        const all = `${base}/name/${id}${dataFields}`;
        const response = await fetch(all);
        const { data }: JSONResponse = await response.json();
        setCountry(data);
      } catch (error) {
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountry("eesti");
  }, []);
  return (
    <>
      <div
        className="ag-theme-quartz w-full" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        {countries && <AgGridReact rowData={countries} columnDefs={colDefs} />}
      </div>
      <div className="py-6">
        <Image
          className="dark:invert"
          src="https://nextjs.org/icons/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        />
      </div>
      <ul className="grid grid-cols-4">
        {countries &&
          countries.map((country) => (
            <li key={country.cca2} className="">
              <h1 className="text-lg font-bold">{country.name.common}</h1>
              <ul>
                <li>{country.cca2}</li>
              </ul>
            </li>
          ))}
      </ul>
    </>
  );
}
