# Genius Launchpad

Next.js (TypeScript) starter built to avoid the issues called out in the last review.

## Expectations
- Data fetching: use React Query hooks in `features/*/api`. No `useEffect` data fetching.
- Components: keep files small; split complex UI into subcomponents.
- Icons/SVGs: store SVGs in `public/icons` and render via components.
- Env: never commit `.env` files; use `.env.example`.
- WebSocket: configure `NEXT_PUBLIC_LAUNCHPAD_WS_URL` for launchpad streams.

## Structure
- `app`: Next.js app router entrypoints.
- `features`: domain slices (swap, tokens, etc.).
- `components`: shared UI/layout components.
- `lib`: shared infrastructure (api client, env, query client).

## Quick start
```bash
npm install
npm run dev
```
