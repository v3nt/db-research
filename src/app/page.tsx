"use client";

import Image from "next/image";
import { AgGridReact } from "ag-grid-react"; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the Data Grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the Data Grid
import { useEffect, useState } from "react";

import useCountries from "./hooks/useCountries";
import useSearch from "./hooks/useSearch";
import Input from "@/components/Input";
import { countryFields } from "./types/countries";
import useFilters from "./hooks/useFilters";
 

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_COUNTRIES_BASE_URL;

  const pagination = true;
  // sets 10 rows per page (default is 100)
  const paginationPageSize = 10;
  // allows the user to select the page size from a predefined list of page sizes
  const paginationPageSizeSelector = [10, 20, 50, 100];

  const [colDefs, setColDefs] = useState<{} | undefined>();

  
  const {countries, fetchCountries, fetchCountry} = useCountries({baseUrl})

  const { currencies } = useFilters({data:countries, updateWithDataChange:false});

  const [tableData, setTableData] = useState<countryFields[]>([]);

  const useSearchProps = {data:countries, keys:['name','currencies','languages']};
  const {searchDataByString, results,setSearchTerm,searchTerm,handleSearch} = useSearch(useSearchProps);

  
  useEffect(() => {
    setColDefs([
      { field: "name",        
        valueGetter: ( params ) => {
        return  params.data.name.common;
      } 
     },
      { field: "flags", 
        component: Image,       
        valueGetter: ( params ) => {
        return  params.data.flags.png;
      }  
    },
      { field: "population" },
      { field: "cca2" },
      { field: "currencies",
        valueGetter: (params:any|unknown) => {
          const keyName = Object.keys(params.data.currencies)[0];
          return params.data.currencies[keyName]?.name;
        } 
      },
      { field: "capital" },
    ]);
    fetchCountries();
    fetchCountry("eesti");
    setTableData(countries)

  }, []);

  useEffect(() => {
    setTableData(countries)
  }, [countries]);

  useEffect(() => {
    setTableData(results)
  }, [results]);

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





  useEffect(() => {
    searchDataByString(searchTerm,countries);
  }, [searchTerm]);


  // When user submits the form, save the favorite number to the local storage

  return (
    <>
      <div className="py-4">
        {/* <form onSubmit={handleSubmit}>
          <input
            id="number"
            value={favoriteNumber || ""}
            onChange={(e) => setFavoriteNumber(e.target.value)}
            className="rounded-lg block mb-2 font-medium text-gray-900 dark:text-gray-900 px-5 py-2.5"
          />
          <button type="submit" value="Save" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" >
            Default
          </button>
        </form> */}

        <form onSubmit={handleSubmit}>
          <Input name="my-input" label="Search" onChange={handleSearch} />
          <button type="submit" value="Save" className="text-white bg-primary-700 hover:bg-primary-800 focus:ring-4 focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-primary-600 dark:hover:bg-primary-700 focus:outline-none dark:focus:ring-primary-800" >
            Default
          </button>
        </form>
  
      </div>
   
      <div
        className="ag-theme-quartz w-full" // applying the Data Grid theme
        style={{ height: 500 }} // the Data Grid will fill the size of the parent container
      >
        {tableData && (
          <AgGridReact
            pagination={pagination}
            paginationPageSize={paginationPageSize}
            paginationPageSizeSelector={paginationPageSizeSelector}
            rowData={tableData}
            columnDefs={colDefs}
          />
        )}
      </div>
      <div>
      </div>
      <div>
            {currencies && (<div>
              {currencies.map((item,index) => (<div key={index}>{item?.label} {item?.value}</div>))}
            </div>)}
          </div>
      <ul className="grid grid-cols-4">
        {tableData &&
          tableData.map((country,index) => (
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
