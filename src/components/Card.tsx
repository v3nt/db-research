import { useEffect, useState } from 'react';
import Image from 'next/image';
import './Card.css';
import { CountryFieldsExtra } from '@/app/types/countries';
import Link from 'next/link';

interface CardProps {
  data: CountryFieldsExtra | undefined;
  open: boolean;
  loading: boolean;
}

const Card = ({ data, open = true, loading = false }: CardProps) => {
  const [show, setShow] = useState<boolean>(open);
  const handleShow = () => setShow(true);
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setShow(open);
  }, [data]);

  return (
    <>
      {show && (
        <div className='Card col-span-2 xl:col-span-1'>
          <div className='relative flex justify-end px-4 pt-4'>
            <button
              id='card-menu'
              className='CardDropdownButton rounded-lg p-1.5 text-sm text-gray-500 hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-700'
              type='button'
              aria-label='Card menu'
              aria-haspopup='true'
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
              role='menu'
              id='card-menu-dropdown'
              className='top-4 z-10 hidden w-32 list-none divide-y divide-gray-100 rounded-lg bg-white text-base shadow dark:bg-gray-700'
            >
              <ul className='py-2' aria-labelledby='dropdownButton'>
                <li>
                  <button
                    onMouseDown={() => handleClose()}
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Close
                  </button>
                </li>
                <li>
                  <a
                    href='#'
                    className='block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white'
                  >
                    Remove
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
          <div className='flex flex-col items-center pb-5'>
            <div className='relative h-24 w-24 overflow-hidden rounded-full'>
              <Image
                width={120}
                height={50}
                src={data?.flags.png}
                alt={`Flag image`}
                className='left-0 -ml-6 h-24 w-auto max-w-none object-contain'
              />
            </div>
          </div>

          <div className='px-4 pt-4'>
            <h1>{data.name.common}</h1>
            {/* TODO: break down into more components*/}
            <dl>
              <dt>Population</dt>
              <dd>{data?.population}</dd>
              <dt>Language ({Object.keys(data.languages).length})</dt>
              <dd>
                {data?.languages &&
                  Object.keys(data.languages).map((key) => {
                    return <span key={key}>{data.languages[key]}</span>;
                  })}
              </dd>
              <dt>Currency/currencies</dt>
              <dd>{data?.population}</dd>
              <dt>Capital</dt>
              <dd>{data?.population}</dd>
              <dt>UN Member</dt>
              <dd>{data?.population}</dd>
              <dt>Landlocked</dt>
              <dd>{data?.population}</dd>
              <dt>maps</dt>
              <dd>
                {data?.maps &&
                  Object.keys(data.maps).map((key) => {
                    return (
                      <dl key={key}>
                        <dt>{key}</dt>
                        <dd>
                          <Link href={data.maps[key]}>{data.maps[key]}</Link>
                        </dd>
                      </dl>
                    );
                  })}
              </dd>
            </dl>
          </div>
        </div>
      )}
    </>
  );
};

export default Card;
