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

  // name, language, or currency
  // don't use AG grids. Mutate the countries array, re-build the table.
  const [searchTerm, setSearchTerm] = useState<{
    term: string;
    field: string;
  }>();

  // pagination hook setup

  // AG grid basic setup

  // enables pagination in the grid
  const pagination = true;

  // sets 10 rows per page (default is 100)
  const paginationPageSize = 10;

  // allows the user to select the page size from a predefined list of page sizes
  const paginationPageSizeSelector = [10, 20, 50, 100];

  const [colDefs, setColDefs] = useState<{} | undefined>([
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

  const [favoriteNumber, setFavoriteNumber] = useState<string | undefined>();

  // local storage
  useEffect(() => {
    let localValue;
    // Get the value from local storage if it exists
    localValue = localStorage.getItem("favoriteNumber") || "";
    setFavoriteNumber(localValue);
  }, []);

  // Set the value received from the local storage to a local state
  const saveToLocalStorage = (e) => {
    e.preventDefault();
    localStorage.setItem("favoriteNumber", favoriteNumber ?? "");
    console.log("saveToLocalStorage", localStorage.getItem("favoriteNumber"));
  };
  // When user submits the form, save the favorite number to the local storage

  return (
    <>
      <div className="py-4">
        <h2>Form</h2>
        <pre>Type in the input...</pre>
        <form onSubmit={saveToLocalStorage}>
          <input
            id="number"
            value={favoriteNumber || ""}
            onChange={(e) => setFavoriteNumber(e.target.value)}
          />
          <input type="submit" value="Save" />
        </form>
        <pre>state: {favoriteNumber}</pre>
      </div>
      <div
        className="ag-theme-quartz w-full" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        {countries && (
          <AgGridReact
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
            rowData={countries}
            columnDefs={colDefs}
          />
        )}
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
