import { FC } from 'react';

interface ButtonProps {
  label: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  icon?: string;
}

const ButtonFavorite: FC<ButtonProps> = ({
  label = 'Button',
  onClick,
  icon,
}) => {
  return (
    <button onClick={onClick}>
      {label}
      {icon && <span>{icon}</span>}
    </button>
  );
};

export default ButtonFavorite;
