'use client';
import { useSession, signIn, signOut } from 'next-auth/react';
import { FC } from 'react';

interface HeaderProps {
  onShowFavorites: React.MouseEventHandler<HTMLButtonElement>;
  favoriteTotal: number;
  countriesTotal: number;
  onShowAll: React.MouseEventHandler<HTMLButtonElement>;
}
const Header: FC<HeaderProps> = ({
  onShowFavorites,
  favoriteTotal,
  countriesTotal,
  onShowAll,
}) => {
  const { data: session } = useSession();

  return (
    <header className='py-4'>
      <ul className='flex space-x-4'>
        <li>LOGO</li>
        <li>
          <button onClick={(e) => onShowFavorites(e)}>
            My Favorites <sup>{favoriteTotal}</sup>
          </button>
        </li>
        <li>
          <button onClick={(e) => onShowAll(e)}>
            List all countries <sup>{countriesTotal}</sup>
          </button>
        </li>
        <li>
          {session && session.user ? (
            <button onClick={() => signOut()}>Sign out</button>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </li>
      </ul>
    </header>
  );
};

export default Header;
