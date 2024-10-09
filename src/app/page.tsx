'use client';

import Image from 'next/image';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid
import type { ColDef } from 'ag-grid-community';

import { useEffect, useState } from 'react';

import useCountries from './hooks/useCountries';
import useSearch from './hooks/useSearch';
import Input from '@/components/Input';
import { countryFields } from './types/countries';
import useFilters from './hooks/useFilters';
import InputSelect from '@/components/InputSelect';
import ButtonFavorite from '@/components/ButtonFavourite';
// import useFavorites from './hooks/useFavorites';

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_COUNTRIES_BASE_URL;

  const pagination = true;
  // sets 10 rows per page (default is 100)
  const paginationPageSize = 10;
  // allows the user to select the page size from a predefined list of page sizes
  const paginationPageSizeSelector = [10, 20, 50, 100];

  const [colDefs, setColDefs] = useState<ColDef[] | undefined>();
  const [tableData, setTableData] = useState<countryFields[]>([]);

  const { countries, fetchCountries, fetchCountry } = useCountries({ baseUrl });
  // const { favorites, setFavorites, toggleAsFavorite } = useFavorites();
  type Favorites = string[];

  const [favorites, setFavorites] = useState<Favorites>([]);
  const myFavorites: Favorites = [];

  const { currencies } = useFilters({
    data: countries,
    updateWithDataChange: false,
  });

  const isInArray = (array, value) => {
    const index = array.indexOf(value);

    return index != -1 ? true : false;
  };

  const addFavorite = async (id: string) => {
    if (!isInArray(myFavorites, id)) {
      myFavorites.push(id);
      setFavorites((prev) => [...myFavorites]);
    }
  };

  const removeFavorite = (id: string) => {
    const index = myFavorites.indexOf(id);
    myFavorites.splice(index, 1);
    setFavorites((prev) => [...myFavorites]);
  };

  const {
    searchDataByString,
    results,
    searchTerm,
    handleSearch,
    filterDataByCurrency,
  } = useSearch();

  useEffect(() => {
    setColDefs([
      {
        field: 'Favorite',
        cellRenderer: ({ data }) => (
          <div>
            <ButtonFavorite
              onClick={() => addFavorite(data?.id)}
              label='Save'
              icon='FAV'
            />
            <ButtonFavorite
              onClick={() => removeFavorite(data?.id)}
              label='Rem'
              icon='FAV'
            />
          </div>
        ),
      },
      {
        field: 'name',
        valueGetter: (params) => params.data.name.common,
      },
      {
        field: 'flags',
        valueGetter: (params) => {
          return params.data.flags.png;
        },
        cellRenderer: ({ data }) => (
          <Image
            src={data?.flags.png}
            alt='country flag'
            width={64}
            height={38}
          />
        ),
      },
      { field: 'population' },
      { field: 'cca2' },
      {
        field: 'currencies',
        valueGetter: (params: any | unknown) => {
          const keyName = Object.keys(params.data.currencies)[0];
          return params.data.currencies[keyName]?.name;
        },
      },
      { field: 'capital' },
    ]);
    fetchCountries();
    fetchCountry('eesti');
    setTableData(countries);
  }, []);

  useEffect(() => {
    setTableData(countries);
  }, [countries]);

  useEffect(() => {
    setTableData(results);
  }, [results]);

  // Set the value received from the local storage to a local state
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleFilterChange = (value: string) => {
    filterDataByCurrency(value, countries);
  };

  useEffect(() => {
    searchDataByString(searchTerm, countries);
  }, [searchTerm]);

  return (
    <>
      <div className='w-full py-4'>
        <p>{favorites}</p>
        <form onSubmit={handleSubmit}>
          <Input
            name='my-input'
            label='Search'
            onChange={handleSearch}
            placeholder='Search by name'
          />
          <InputSelect
            name='filterCurrencies'
            label='Currencies'
            instructions='Choose a currency...'
            options={currencies}
            onChange={(e) => handleFilterChange(e.currentTarget.value)}
          />
          <button
            type='submit'
            value='Save'
            className='mb-2 me-2 rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800'
          >
            Default
          </button>
        </form>
      </div>

      <div className='ag-theme-quartz w-full' style={{ height: 518 }}>
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
    </>
  );
}
