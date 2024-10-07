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
  flags: flags;
  name: name;
  cca2: string;
  capital: string[];
  population: number;
  country: string;
  currencies: string;
};

// "currencies": {
//   "SHP": {
//     "name": "Saint Helena pound",
//     "symbol": "£"
//   }
// },


interface countryFieldsExtra extends countryFields {
  unMember: string;
  languages: { string: string };
  landlocked: boolean;
  maps: { string: Url };
}
 

export default function Home() {

  // pagination hook setup

  // AG grid basic setup

  // enables pagination in the grid
  const pagination = true;

  // sets 10 rows per page (default is 100)
  const paginationPageSize = 10;

  // allows the user to select the page size from a predefined list of page sizes
  const paginationPageSizeSelector = [10, 20, 50, 100];

  const [colDefs, setColDefs] = useState<{} | undefined>();
  const [errors, setErrors] = useState<string | undefined>();


  const [countries, setCountries] = useState<countryFields[]>([]);
  const [country, setCountry] = useState<countryFieldsExtra[]>([]);

  // name, language, or currencies
  // don't use AG grids. Mutate the countries array, re-build the table.
  const [searchTerm, setSearchTerm] = useState<{
    term: string;
    field: string;
  }>();

  
  const base = process.env.NEXT_PUBLIC_COUNTRIES_BASE_URL;

    const fetchCountries = async () => {
      try {
        const dataFields =
          "?fields=name,flags,population,cca2,country,currencies,capital";
        const all = `${base}/all${dataFields}`;
        const response = await fetch(all);
        if (response.ok) {
          const data : countryFields[] = await response.json();
          // prepare the data here?
          setCountries(data);
        }else {
          console.error('Promise resolved but HTTP status failed');
        }

      } catch (error) {
        setErrors('Failed to fetch countries list. See console for more details')
        console.error("Error fetching countries data:", error);
      }
    };

      const fetchCountry = async (id: string) => {
      try {
        const dataFields =
          "?fields=name,flags,population,cca2,country,currencies,capital,unMember,languages,landlocked,maps";
        const all = `${base}/name/${id}${dataFields}`;
        const response = await fetch(all);
        if (response.ok) {
          const data : countryFieldsExtra[] = await response.json();        
        setCountry(data);
        }else {
          console.error('Promise resolved but HTTP status failed');
        }
      } catch (error) {
        setErrors('Failed to fetch country item. See console for more details')
        console.error("Error fetching country data:", error);
      }
    };
 
  
  useEffect(() => {
    setColDefs([
      { field: "name",        
        valueGetter: ( params ) => {
        return  params.data.name.common;
      } 
     },
      { field: "flags",        
        valueGetter: ( params ) => {
        return  params.data.flags.png;
      }  },
      { field: "population" },
      { field: "cca2" },
      { field: "currencies",
        valueGetter: (params:any|unknown) => {
          const keyName = Object.keys(params.data.currencies)[0];
          return params.data.currencies[keyName].name;
        } 
      },
      { field: "capital" },
    ]);
    fetchCountries();
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
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    localStorage.setItem("favoriteNumber", favoriteNumber ?? "");
    console.log("handleSubmit", localStorage.getItem("favoriteNumber"));
  };
  // When user submits the form, save the favorite number to the local storage

  return (
    <>
      <div className="py-4">
        <h2>Form</h2>
        <pre>Type in the input...</pre>
        <form onSubmit={handleSubmit}>
          <input
            id="number"
            value={favoriteNumber || ""}
            onChange={(e) => setFavoriteNumber(e.target.value)}
            className="rounded-lg block mb-2 font-medium text-gray-900 dark:text-gray-900 px-5 py-2.5"
          />
          <button type="submit" value="Save" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" >
            Default
          </button>
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
      <div>
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
