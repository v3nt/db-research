# Tech test with AG Grid and countries API.

The project is deployed here — 
https://db-research.vercel.app/

Repo is here 
https://github.com/v3nt/db-research (public)

## Notes about the work
- built with react (Nextjs)
- Typed
- I used Tailwind for styling
- TODOs where improvements could be made with more time
- I manually created a filter for currencies insread of just using all of AG Grid's features
- Design is basic and i see as more of a working Wireframe



## Getting Started if you want to run locally

You will need a `.env.local` file with —

```
NEXT_PUBLIC_COUNTRIES_BASE_URL=https://restcountries.com/v3.1
# for sign on functionality
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GITHUB_CLIENT_ID=
GITHUB_CLIENT_SECRET=
NEXTAUTH_URL=
NEXTAUTH_SECRET=
```
(You will need app IDs & secrets)


First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.
