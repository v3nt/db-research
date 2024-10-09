'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header() {
  const { data: session } = useSession();
  console.log('session', session);

  return (
    <header className='py-4'>
      <h1>Header</h1>
      <ul className='flex space-x-4'>
        <li>LOGO</li>
        <li>
          Favorites <sup>5</sup>
        </li>
        <li>All countries</li>
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
}
