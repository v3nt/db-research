import { FC, InputHTMLAttributes } from 'react';
import './Input.css';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  name: string;
  label: string;
}

const Input: FC<InputProps> = ({
  placeholder,
  name,
  label,
  onChange,
  value,
  ...rest
}) => {
  return (
    <div className='light mb-2'>
      <label htmlFor={`${name}`} className='Label'>
        {label}
      </label>
      <input
        type='text'
        id={name}
        className='Input'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
