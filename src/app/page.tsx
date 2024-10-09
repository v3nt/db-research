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
import useFavorites from './hooks/useFavorites';

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_COUNTRIES_BASE_URL;

  // AG GRID
  const pagination = true;
  // sets 10 rows per page (default is 100)
  const paginationPageSize = 10;
  // allows the user to select the page size from a predefined list of page sizes
  const paginationPageSizeSelector = [10, 50, 100];

  // states
  const [colDefs, setColDefs] = useState<ColDef[] | undefined>();
  const [tableData, setTableData] = useState<countryFields[]>([]);

  // hooks
  const { favorites, addFavorite, removeFavorite, isInArray } = useFavorites();
  const { countries, fetchCountries, fetchCountry } = useCountries({
    baseUrl,
    favoriteIds: favorites,
  });
  const { currencies } = useFilters({
    data: countries,
    updateWithDataChange: false,
  });

  const {
    searchDataByString,
    results,
    searchTerm,
    handleSearch,
    filterDataByCurrency,
  } = useSearch();

  // setup table, fetch countries
  useEffect(() => {
    setColDefs([
      {
        field: 'Favorite',
        width: 100,
        cellRenderer: (params) => {
          // TODO: should be a component
          const [isFavorite, setIsFavorite] = useState(
            isInArray(params.data?.id) ? true : params.data?.isFavorite
          );

          const cellHandler = (action: string | null) => {
            if (action) {
              addFavorite(params.data?.id);
              setIsFavorite(true);
              return;
            }
            removeFavorite(params.data?.id);
            setIsFavorite(false);
          };

          return (
            <div>
              {!isFavorite && (
                <ButtonFavorite
                  onClick={() => cellHandler('add')}
                  label='Add'
                  icon=''
                />
              )}
              {isFavorite && (
                <ButtonFavorite
                  onClick={() => cellHandler(null)}
                  label='Rem'
                  icon=''
                />
              )}
            </div>
          );
        },
      },
      {
        field: 'name',
        valueGetter: (params) => params.data.name.common,
      },
      {
        field: 'flags',
        width: 100,
        valueGetter: (params) => {
          return params.data.flags.png;
        },
        cellRenderer: ({ data }) => (
          <Image
            src={data?.flags.png}
            alt='country flag'
            width={32}
            height={19}
          />
        ),
      },
      { field: 'population' },
      { field: 'cca2', width: 80 },
      {
        field: 'currencies',
        valueGetter: (params: any | unknown) => {
          const keyName = Object.keys(params.data.currencies)[0];
          return params.data.currencies[keyName]?.name;
        },
      },
      { field: 'capital' },
    ]);

    // on initial render only
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

  useEffect(() => {
    searchDataByString(searchTerm, countries);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  };

  const handleFilterChange = (value: string) => {
    filterDataByCurrency(value, countries);
  };

  return (
    <>
      <div className='w-full py-4'>
        <p>
          favorites: {favorites.length} {favorites}
        </p>
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
