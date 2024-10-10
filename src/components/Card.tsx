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
  const handleClose = () => {
    setShow(false);
  };

  useEffect(() => {
    setShow(open);
  }, [data]);

  // TODO: move css to css file
  return (
    <>
      {show && (
        // TODO: make card more generic & dumb
        <div className='Card'>
          <div className='flex flex-col items-center py-5'>
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
              <dd>
                {data?.currencies &&
                  Object.keys(data.currencies).map((key) => {
                    return (
                      <span key={key}>
                        {data.currencies[key].name}, (
                        {data.currencies[key].symbol})
                      </span>
                    );
                  })}
              </dd>
              <dt>Capital</dt>
              <dd>{data?.capital}</dd>
              <dt>UN Member</dt>
              <dd>{data?.unMember && <div>Yes</div>}</dd>
              <dt>Landlocked</dt>
              <dd>{data?.landlocked && <div>Yes</div>}</dd>
              <dt className='mb-1'>Maps</dt>
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
