
'use client';
import { useSession, signIn, signOut } from 'next-auth/react';

export default function Header(){
    const { data: session } = useSession();
    console.log('session', session);
  
    return (        <header className="py-4"><h1>Header</h1>
        <div className="flex flex-col">
          {session && session.user ? (
            <button onClick={() => signOut()}>Sign out</button>
          ) : (
            <button onClick={() => signIn()}>Sign in</button>
          )}
        </div>
        </header>)
}