import { FC, ReactNode } from 'react';
import './Alert.css';

interface AlertProps {
  label?: string;
  size?: string;
  type?: string;
  children?: ReactNode;
}

const Alert: FC<AlertProps> = ({
  label,
  size = 'base',
  children,
  type = 'info',
}) => {
  return (
    <div className={`Alert ${size} ${type}`} aria-label={label}>
      {children}
    </div>
  );
};

export default Alert;
