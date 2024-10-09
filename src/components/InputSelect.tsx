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
    <div className='light mb-2'>
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
            return (
              <option value={item?.value} key={index}>
                {item?.label}, {item?.value}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default InputSelect;
