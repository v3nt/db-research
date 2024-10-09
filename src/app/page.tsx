'use client';

import Image from 'next/image';
import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import 'ag-grid-community/styles/ag-grid.css'; // Mandatory CSS required by the Data Grid
import 'ag-grid-community/styles/ag-theme-quartz.css'; // Optional Theme applied to the Data Grid
import type { ColDef, ValueGetterParams } from 'ag-grid-community';

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
  const { countries, country, fetchCountries, fetchCountry } = useCountries({
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
        width: 90,
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
        cellRenderer: (params: ValueGetterParams<any, any>) => {
          return (
            <div className='flex'>
              {params.data.name.common}{' '}
              <button
                onClick={() => fetchCountry(params.data.name.common)}
                className='ml-auto mr-0'
              >
                View
              </button>
            </div>
          );
        },
      },
      {
        field: 'flags',
        width: 100,
        valueGetter: (params) => {
          return params.data.flags.png;
        },
        cellRenderer: ({ data }) => (
          <div className='flex h-full'>
            <Image
              src={data?.flags.png}
              alt='country flag'
              width={32}
              height={19}
              className='mx-auto mb-2 mt-auto'
            />
          </div>
        ),
      },
      { field: 'population', suppressSizeToFit: true },
      { field: 'cca2', width: 80 },
      {
        field: 'currencies',
        valueGetter: (params: any | unknown) => {
          const keyName = Object.keys(params.data.currencies)[0];
          return params.data.currencies[keyName]?.name;
        },
      },
      { field: 'capital', suppressSizeToFit: true },
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
  }, []);

  useEffect(() => {
    searchDataByString(searchTerm, countries);
  }, [searchTerm]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    // no form submit needed
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

      <div className='grid grid-cols-5 gap-6'>
        {country && (
          <div className='Card col-span-2 rounded-lg border border-gray-200 bg-white p-6 shadow hover:bg-gray-100 dark:border-gray-700 dark:bg-gray-800 dark:hover:bg-gray-700'>
            <div className='flex justify-end px-4 pt-4'>
              <button
                id='dropdownButton'
                data-dropdown-toggle='dropdown'
                className='inline-block rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
                type='button'
              >
                <span className='sr-only'>Open dropdown</span>
                <svg
                  className='h-5 w-5'
                  aria-hidden='true'
                  xmlns='http://www.w3.org/2000/svg'
                  fill='currentColor'
                  viewBox='0 0 16 3'
                >
                  <path d='M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z' />
                </svg>
              </button>

              <div
                id='dropdown'
                className='z-10 hidden w-44 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:bg-gray-700'
              >
                <ul className='py-2' aria-labelledby='dropdownButton'>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                    >
                      Close
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                    >
                      remove from favorites
                    </a>
                  </li>
                  <li>
                    <a
                      href='#'
                      className='block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                    >
                      Favorite
                    </a>
                  </li>
                </ul>
              </div>
            </div>
            <div className='flex flex-col items-center pb-10'>
              <img
                className='mb-3 h-24 w-24 rounded-full shadow-lg'
                src='https://flowbite.com/docs/images/people/profile-picture-3.jpg'
                alt='Bonnie image'
              />
            </div>
            <p>{country.name.common}</p>
            <div>
              * name, * flag * basic information like * population, *
              language(s) * currency/currencies. country, currency,
              capital,population. unMember, altSpellings, languages,
              landlocked,maps
            </div>
          </div>
        )}

        {tableData && (
          <div
            className='ag-theme-quartz ag-theme-quartz-dark col-span-3'
            style={{ height: 518 }}
          >
            <AgGridReact
              pagination={pagination}
              paginationPageSize={paginationPageSize}
              paginationPageSizeSelector={paginationPageSizeSelector}
              rowData={tableData}
              columnDefs={colDefs}
            />
          </div>
        )}
      </div>
    </>
  );
}
