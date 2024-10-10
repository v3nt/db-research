import { FC, ReactNode } from 'react';
import './Button.css';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  label?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  size?: string;
  children?: ReactNode;
}

const Button: FC<ButtonProps> = ({
  label,
  onClick,
  size = 'small',
  children,
  type = 'button',
}) => {
  return (
    <button
      className={`Button Button--${size}`}
      onClick={onClick}
      aria-label={label}
      type={type}
    >
      {label && label}
      {children}
    </button>
  );
};

export default Button;
