import { useEffect, useState } from 'react';
import { countryFields } from '../types/countries';
import { InputSelectList } from '../types/base';

interface FilterProps {
  data: countryFields[];
  updatedData?: string[];
  updateWithDataChange: boolean;
}

const useFilters = ({
  data = [],
  updateWithDataChange = false,
  updatedData = [],
}: FilterProps) => {
  const [currencies, setCurrencies] = useState<InputSelectList[] | undefined>(
    []
  );

  const itemsCurrency = () => {
    const dataToUse = updateWithDataChange ? updatedData : data;
    const items = dataToUse.length
      ? data
          .map((item) => {
            const keyName = Object.keys(item.currencies)[0];
            if (keyName && item.currencies[keyName]?.name !== '') {
              return { label: item.currencies[keyName]?.name, value: keyName };
            }
          })
          .sort((a, b) => a.label.localeCompare(b.label))
      : [];

    const itemsUnique = items.reduce((accumulator, current) => {
      if (
        !accumulator.find(
          (item: InputSelectList) => item?.label === current?.label
        )
      ) {
        accumulator.push(current);
      }
      return accumulator;
    }, []);
    setCurrencies(itemsUnique);
    return itemsUnique;
  };

  useEffect(() => {
    itemsCurrency();
  }, [data]);

  return { currencies, itemsCurrency };
};

export default useFilters;
