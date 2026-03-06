# Component Library

A Svelte 5 component library built with TypeScript and Storybook, featuring reusable UI components organized into two sections: custom CSS components and Tailwind CSS components.

## Project Overview

This component library provides production-ready, reusable UI components that can be shared across multiple projects. Components are organized into two main categories:

- **Custom CSS Components** (`src/lib/custom/`) - Hand-crafted components with custom CSS, no framework dependencies
- **Tailwind Components** (`src/lib/tailwind/`) - Components built with Tailwind CSS utility classes

### Tech Stack

- **Svelte 5** (latest with runes)
- **TypeScript** (strict mode)
- **Vite** (build tool)
- **Storybook** (component documentation)
- **Tailwind CSS** (utility-first styling)

## Getting Started

Install dependencies:

```sh
npm install
```

### Build Storybook

Build a static version of Storybook:

```sh
npm run storybook
```

## Development

### Run Development Server

Start the SvelteKit development server:

```sh
npm run dev

# or start the server and open the app in a new browser tab
npm run dev -- --open
```

### Run Storybook

Start Storybook to view and interact with components:

```sh
npm run storybook
```

Storybook will be available at `http://localhost:6006`

### Type Checking

Run TypeScript type checking:

```sh
npm run check
```

Run type checking in watch mode:

```sh
npm run check:watch
```

## Building

### Build Application

To create a production version of the app:

```sh
npm run build
```

Preview the production build:

```sh
npm run preview
```

## Project Structure

```
src/
├── lib/
│   ├── custom/
│   │   ├── auth-v3/
│   │   │   ├── AuthShellV3.svelte       # max-w-[440px] pure-black shell, logo slot + title/subtitle
│   │   │   ├── AuthFieldV3.svelte       # input with inputmode, invalid, password toggle
│   │   │   └── AuthButtonV3.svelte      # dark-with-border (enabled), dark+muted (disabled)
│   │   ├── dashboard-v3/
│   │   │   └── DashboardShellV3.svelte  # pageTitle prop only — no duplicate nav
│   │   ├── table-v3/
│   │   │   ├── TableShellV3.svelte      # title + count badge, dark search, actions slot
│   │   │   └── DataTableV3.svelte       # typed columns, named cell slot (let:row let:col)
│   │   ├── insights-v3/
│   │   │   ├── InsightShellV3.svelte    # title, caption, cols: 4|5
│   │   │   └── InsightCardV3.svelte     # label, value, sub, tone: default|green|yellow|red
│   │   └── campaigns-v3/
│   │       ├── EmailApiStatsV3.svelte   # 2-row card: volume (Attempted/Delivered/Opened/Clicked) + rates
│   │       ├── EmailHealthStatsV3.svelte# 2-row card: counts (Bounced/Failed/Complained) + rates + optional errors link
│   │       └── CampaignErrorLogV3.svelte# inline error log with expandable details, type badges
│   ├── utils/            # Helper functions
│   ├── types/            # TypeScript definitions
│   └── icons/            # Icon components
└── routes/               # Demo pages
```

### V3 Design Tokens
- Background: `#0a0a0a` | Card/surface: `#111111` | Input bg: `#141414`
- Border: `border-white/[0.07]` or `border-white/[0.08]`
- Text primary: `#f5f5f5` | Muted: `#737373` | Very muted: `#525252`
- Accent button: `bg-[#1f1f1f] border border-white/[0.15] text-[#f5f5f5]`
- No lime, no solid white backgrounds in V3

### EmailApiStatsV3 props
```typescript
attempted: number; sent: number; delivered: number; opened: number; clicked: number;
title?: string; caption?: string;
```

### EmailHealthStatsV3 props
```typescript
bounced: number; failed: number; complained: number;
sent: number;      // bounce/complaint denominator
attempted: number; // failed rate denominator
errorsHref?: string | null; title?: string; caption?: string;
```
Color thresholds: bounce ≥5% rose / ≥2% yellow / else green. Complaint ≥0.5% rose / ≥0.1% yellow. Failed >0 yellow.
