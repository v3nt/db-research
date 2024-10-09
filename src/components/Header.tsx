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
            viewBox='0 0 1024 1024'
            version='1.1'
            xmlns='http://www.w3.org/2000/svg'
          >
            <path
              d='M224 0h576c123.6 0 224 100.4 224 224v576c0 123.6-100.4 224-224 224H224c-123.6 0-224-100.4-224-224V224C0 100.4 100.4 0 224 0z'
              fill='#FFFFFF'
            />
            <path
              d='M172 852V172h680v680H172z m95.2-95.2h490V265.6H267.2v491.2z m61.6-69.6l244.8-361.2 132.4-2.8-252.8 364H328.8z'
              fill='#FFFFFF'
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
