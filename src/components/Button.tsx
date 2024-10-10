import { FC } from 'react';
import './Button.css';
interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
}

const Button: FC<ButtonProps> = ({ label = 'Button', onClick }) => {
  return (
    <button className='Button' onClick={onClick} aria-label={label}>
      {label}
    </button>
  );
};

export default Button;
