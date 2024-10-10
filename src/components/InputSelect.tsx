import { FC, InputHTMLAttributes } from 'react';
import './InputSelect.css';
import { InputSelectList } from '@/app/types/base';

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  instructions?: string;
  options: InputSelectList[] | undefined;
}

const InputSelect: FC<InputProps> = ({
  name,
  label,
  onChange,
  value,
  options,
  instructions,
}) => {
  return (
    <div>
      <label htmlFor={`${name}`} className='Label'>
        {label} ({options?.length && options?.length})
      </label>

      <select
        id={name}
        className='InputSelect'
        value={value}
        onChange={onChange}
      >
        <option value=''>{instructions}</option>
        {options?.length &&
          options.map((item: InputSelectList, index: number) => {
            if ((item && item.label !== '') || (item && item.value !== '')) {
              return (
                <option value={item?.value} key={`${index}-${item?.value}`}>
                  {item?.label} {item?.value}
                </option>
              );
            }
          })}
      </select>
    </div>
  );
};

export default InputSelect;
