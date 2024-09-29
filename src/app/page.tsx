"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type countryFields = {
  name: string;
  flags: string;
  population: string;
  cca2: string;
  country: string;
  currency: string;
  capital: string;
};

interface countryFieldsExtra extends countryFields {
  unMember: string;
  altSpellings: string;
  languages: string;
  landlocked: string;
  maps: string;
}

type JSONResponse = {
  data?: countryFieldsExtra[];
  errors?: Array<{ message: string }>;
};

export default function Home() {
  const [countries, setCountries] = useState<countryFields[] | undefined>([]);
  const [country, setCountry] = useState<countryFieldsExtra[] | undefined>([]);
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
        console.log(response);
        console.log(response.error);
        const { data }: JSONResponse = await response.json();
        setCountry(data);
      } catch (error) {
        // error is the message
        console.error("Error fetching country data:", error);
      }
    };

    fetchCountry("eesti");
  }, []);
  return (
    <>
      <Image
        className="dark:invert"
        src="https://nextjs.org/icons/next.svg"
        alt="Next.js logo"
        width={180}
        height={38}
        priority
      />
      <ul>
        {countries.map((country) => (
          <li key={country.cca2}>
            <h1 className="text-lg font-bold">{country.name.common}</h1>
            <ul>
              <li>{country.cca2}</li>
            </ul>
          </li>
        ))}
      </ul>

      <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
        <li className="mb-2">
          Get started by editing{" "}
          <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
            src/app/page.tsx
          </code>
          .
        </li>
        <li>Save and see your changes instantly.</li>
      </ol>

      <div className="flex gap-4 items-center flex-col sm:flex-row">
        <a
          className="rounded-full border border-solid border-black/[.08] dark:border-white/[.145] transition-colors flex items-center justify-center hover:bg-[#f2f2f2] dark:hover:bg-[#1a1a1a] hover:border-transparent text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5 sm:min-w-44"
          href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Read our docs
        </a>
      </div>
    </>
  );
}
