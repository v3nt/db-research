import { Url } from 'url';

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

export interface CountryFields {
  id: string;
  flags: flags;
  name: name;
  cca2: string;
  capital: string[];
  population: number;
  country: string;
  currencies: currencies;
  isFavorite?: boolean;
}

type currencies = {
  [key: string]: {
    name: string;
    symbol: string;
  };
};

export interface CountryFieldsExtra extends CountryFields {
  unMember: string;
  languages: { string: string };
  landlocked: boolean;
  maps: { string: Url };
}
