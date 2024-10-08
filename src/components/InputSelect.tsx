import { FC, InputHTMLAttributes } from 'react';
import './Input.css';
import { InputSelectList } from '@/app/types/base';

interface InputProps extends InputHTMLAttributes<HTMLSelectElement> {
  name: string;
  label: string;
  options: InputSelectList[] | undefined;
}

const InputSelect: FC<InputProps> = ({
  name,
  label,
  onChange,
  value,
  options,
}) => {
  return (
    <div className='light mb-2'>
      <label htmlFor={`${name}`} className='Label'>
        {label}
      </label>

      <select
        id={name}
        className='InputSelect'
        value={value}
        onChange={onChange}
      >
        {options?.length &&
          options.map((item: InputSelectList, index: number) => {
            return (
              <option value={item?.value} key={index}>
                {item?.label}
              </option>
            );
          })}
      </select>
    </div>
  );
};

export default InputSelect;
