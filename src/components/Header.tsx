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
        <li>
          <svg
            height='30'
            width='30'
            xmlns='http://www.w3.org/2000/svg'
            viewBox='1 1 148 148'
          >
            <path
              d='M1 1h148v148H1zm21 21v107h107V22zm68 15h27l-56 77H34z'
              fill='#ffffff'
            />
          </svg>
        </li>
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
