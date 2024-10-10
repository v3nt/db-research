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
import { CountryFields } from './types/countries';
import useFilters from './hooks/useFilters';
import InputSelect from '@/components/InputSelect';
import ButtonFavorite from '@/components/ButtonFavorite';
import useFavorites from './hooks/useFavorites';
import Card from '@/components/Card';
import Header from '@/components/Header';
import Button from '@/components/Button';
import Alert from '@/components/Alert';

export default function Home() {
  const baseUrl = process.env.NEXT_PUBLIC_COUNTRIES_BASE_URL;

  // AG GRID
  const pagination = true;
  // sets 10 rows per page (default is 100)
  const paginationPageSize = 20;
  // allows the user to select the page size from a predefined list of page sizes
  const paginationPageSizeSelector = [20, 50, 100];

  // states
  const [colDefs, setColDefs] = useState<ColDef[] | undefined>();
  const [tableData, setTableData] = useState<CountryFields[]>([]);

  // hooks
  const { favorites, addFavorite, removeFavorite, isInArray, listMyFavorites } =
    useFavorites();
  const {
    countries,
    countriesLoading,
    country,
    errors,
    countryLoading,
    fetchCountries,
    fetchCountry,
  } = useCountries({
    baseUrl,
  });
  const { currencies } = useFilters({
    data: countries,
    updateWithDataChange: false,
  });

  const {
    filterDataByCurrency,
    handleSearch,
    results,
    searchDataByString,
    searchTerm,
    setSearchTerm,
  } = useSearch();

  // setup table, fetch countries
  useEffect(() => {
    setColDefs([
      {
        field: '',
        width: 70,
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
            <div className='flex h-full'>
              {!isFavorite && (
                <ButtonFavorite
                  onClick={() => cellHandler('add')}
                  label='Add'
                  icon=''
                  isFavorite={false}
                />
              )}
              {isFavorite && (
                <ButtonFavorite
                  onClick={() => cellHandler(null)}
                  label='Rem'
                  icon=''
                  isFavorite={true}
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
            <div className='grid grid-cols-5'>
              <div className='col-span-4 pr-2'>{params.data.name.common}</div>
              <div className='col col-span-1 ml-auto mr-0'>
                <Button
                  label='VIEW'
                  onClick={() => fetchCountry(params.data.name.common)}
                />
              </div>
            </div>
          );
        },
      },
      {
        field: 'flags',
        width: 90,
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
      { field: 'population', width: 120 },
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
    // no form submit needed
    e.preventDefault();
  };

  const handleFilterChange = (value: string) => {
    filterDataByCurrency(value, countries);
  };
  const handleClearFilters = () => {
    filterDataByCurrency('', countries);
    setSearchTerm('');
  };
  const handelShowFavorites = () => {
    setTableData(listMyFavorites(countries));
  };
  const handelShowCountries = () => {
    setTableData(countries);
  };

  return (
    <>
      <Header
        onShowFavorites={handelShowFavorites}
        favoriteTotal={favorites.length}
        countriesTotal={countries.length}
        onShowAll={handelShowCountries}
      />
      <div className='w-full py-4'>
        {/* TODO: move to form component */}
        <form onSubmit={handleSubmit} className='grid grid-cols-5 gap-6'>
          <div className='col-span-2 xl:col-span-1'>
            <Input
              name='searchByName'
              label='Search'
              onChange={handleSearch}
              placeholder='Search by name'
            />
          </div>
          <div className='col-span-2 xl:col-span-1'>
            <InputSelect
              name='filterCurrencies'
              label='Currencies'
              instructions='Choose a currency...'
              options={currencies}
              onChange={(e) => handleFilterChange(e.currentTarget.value)}
            />
          </div>
          <div className='col-span-1 flex items-end'>
            <div className='mb-1'>
              <Button
                onClick={(e) => handleClearFilters()}
                size='large'
                type='reset'
              >
                Clear filters
              </Button>
            </div>
          </div>
        </form>
      </div>
      <div className='grid h-full grid-cols-5 gap-6'>
        {errors && (
          <div className='col-span-5'>
            <Alert type='error'>{errors}</Alert>
          </div>
        )}

        <div className='col-span-5 md:col-span-2'>
          {country && (
            <Card data={country} open={true} loading={countryLoading} />
          )}
          {!country && (
            <div>
              <p>Select a country from the table to view its details</p>
            </div>
          )}
        </div>
        <div className='col-span-5 md:col-span-3'>
          <div
            className='ag-theme-quartz ag-theme-quartz-dark'
            style={{ height: '700px' }}
          >
            {countriesLoading && <Alert type='info'>Loading...</Alert>}

            <AgGridReact
              pagination={pagination}
              paginationPageSize={paginationPageSize}
              paginationPageSizeSelector={paginationPageSizeSelector}
              rowData={tableData}
              columnDefs={colDefs}
            />
          </div>
        </div>
      </div>
    </>
  );
}
