# 🚀 Genius Launchpad

A real-time crypto launchpad tracker built with **Next.js 16**, **React 19**, and **TypeScript**. Browse active token launches with live metrics, filtering, and WebSocket-powered updates.

## Features

- ✨ **Real-time Data**: Live metrics via WebSocket streams
- 🔍 **Advanced Filtering**: Filter launchpads by metrics, status, and network
- 📊 **Multi-Chain Support**: Track launches across different blockchain networks
- 🎨 **Clean UI**: Built with Tailwind CSS and Radix UI components
- ⚡ **Type-Safe**: Full TypeScript support with Zod validation
- 🎯 **Optimized**: React Query for efficient data fetching

## Tech Stack

- **Framework**: Next.js 16 (App Router)
- **UI**: React 19, Tailwind CSS, Radix UI, Lucide icons
- **Data**: React Query, Socket.IO, Zustand (state)
- **Validation**: Zod
- **Language**: TypeScript

## Quick Start

```bash
# Install dependencies
pnpm install

# Start dev server
pnpm dev

# Build for production
pnpm build
pnpm start
```

Open [http://localhost:3000](http://localhost:3000) → Click "Open Launchpads"

## Environment

```bash
# Required
NEXT_PUBLIC_LAUNCHPAD_WS_URL=https://your-ws-server.com
NEXT_PUBLIC_API_BASE_URL=https://your-api.com
```

## Project Structure

```
├── app/                 # Next.js routes (layout, pages)
├── features/            # Domain logic (launchpad, swap, tokens)
│   └── launchpad/
│       ├── api/        # WebSocket & data hooks
│       ├── components/ # UI components
│       ├── hooks/      # Custom hooks
│       └── stores/     # Zustand state
├── components/          # Shared UI components
├── lib/                # Infrastructure (env, API client, React Query)
└── types/              # Shared TypeScript types
```

## Key Conventions

- 📍 **Data Fetching**: Use React Query hooks in `features/*/api` — no `useEffect` data fetching
- 🧩 **Components**: Keep small & split complex UI into subcomponents
- 🎨 **Icons**: Store SVGs in `public/icons`, render via components
- 🔒 **Env**: Never commit `.env` files; use `.env.example`
- 📡 **WebSocket**: Configure `NEXT_PUBLIC_LAUNCHPAD_WS_URL` for live streams
