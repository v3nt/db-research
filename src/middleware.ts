export { default } from 'next-auth/middleware';

// v14 needs to be in ./src
// '/*' protects all routes & require auth login
export const config = { matcher: ['/dashboard:path*', '/dashboard(.*)'] };
