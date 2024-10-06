export { default } from 'next-auth/middleware';

// v14 needs to be in ./src
export const config = { matcher: ['/dashboard:path*', '/dashboard(.*)'] };
