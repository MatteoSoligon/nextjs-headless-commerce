# Next.js Headless Commerce Boilerplate

A production-ready **Next.js 16** boilerplate featuring internationalization (i18n), accessible UI components built with Radix UI, Tailwind CSS v4 theming, and Atomic Design architecture.

![Next.js](https://img.shields.io/badge/Next.js-16.1.6-black?logo=next.js)
![React](https://img.shields.io/badge/React-19.2.3-61DAFB?logo=react)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?logo=tailwindcss)
![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)

---

## ✨ Features

- **🌍 Internationalization (i18n)** - Built-in multi-language support with `next-intl`
- **♿ Accessible Components** - WCAG-compliant components powered by Radix UI primitives
- **🎨 Tailwind CSS v4** - Modern CSS-first configuration with CSS variables theming
- **🧱 Atomic Design** - Scalable component architecture (Atoms → Blocks → Sections → Templates → Pages)
- **🌓 Dark Mode** - Automatic dark mode support via `prefers-color-scheme`
- **🎭 Multi-Theme** - Switchable brand themes with CSS custom properties
- **📐 Scalable UI** - Master scale control for responsive sizing
- **⚡ Next.js 16 App Router** - Latest features with React 19 support

---

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd nextjs-commerce

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### Development

```bash
# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

### Production Build

```bash
# Build for production
npm run build

# Start production server
npm start
```

---

## 📁 Project Structure

```
nextjs-commerce/
├── app/
│   ├── layout.tsx              # Root layout
│   └── [locale]/               # Locale-based routing
│       ├── layout.tsx          # Locale layout with fonts
│       ├── page.tsx            # Home page
│       ├── services/           # Services page
│       └── ui-kit/             # Component showcase
├── components/
│   ├── atoms/                  # Basic building blocks
│   │   ├── Accordion/
│   │   ├── Badge/
│   │   ├── Button/
│   │   ├── Checkbox/
│   │   ├── Input/
│   │   ├── Label/
│   │   ├── Radio/
│   │   ├── Switch/
│   │   └── Typography/
│   ├── blocks/                 # Composed components
│   │   ├── Card/
│   │   ├── Dialog/
│   │   ├── DropdownMenu/
│   │   ├── Select/
│   │   ├── Tabs/
│   │   └── Tooltip/
│   ├── sections/               # Page sections
│   ├── templates/              # Page templates
│   └── pages/                  # Full page compositions
├── config/
│   └── localeConfig.ts         # Supported locales
├── i18n/
│   ├── messages/               # Translation files
│   │   ├── en.json
│   │   └── de.json
│   ├── navigation.ts           # i18n navigation helpers
│   ├── request.ts              # Request-level i18n
│   └── routing.ts              # Locale routing config
├── lib/
│   ├── utils.ts                # Utility functions (cn, etc.)
│   └── index.ts
├── style/
│   └── globals.css             # Global styles & theme
└── public/                     # Static assets
```

---

## 🧱 Atomic Design Architecture

This project follows **Atomic Design** methodology for scalable component organization:

| Level | Directory | Description | Example |
|-------|-----------|-------------|---------|
| **Atoms** | `components/atoms/` | Basic UI elements | Button, Input, Label, Badge |
| **Blocks** | `components/blocks/` | Composed components | Card, Dialog, Tabs, Select |
| **Sections** | `components/sections/` | Page sections | Hero, Features, Pricing |
| **Templates** | `components/templates/` | Page layouts | MainTemplate, AuthTemplate |
| **Pages** | `components/pages/` | Full pages | HomePage, ProductPage |

### Importing Components

```tsx
// Import atoms
import { Button, Input, Badge } from "@/components/atoms";

// Import blocks
import { Card, Dialog, Tabs } from "@/components/blocks";
```

---

## 🌍 Internationalization (i18n)

Built with [next-intl](https://next-intl-docs.vercel.app/) for seamless internationalization.

### Supported Locales

Configured in `config/localeConfig.ts`:

```typescript
export const locales = ['en', 'de'];
```

### Adding Translations

1. Add translation keys to `i18n/messages/{locale}.json`:

```json
{
  "HomePage": {
    "title": "Welcome",
    "description": "Your description here"
  }
}
```

2. Use in components:

```tsx
import { useTranslations } from 'next-intl';

export function MyComponent() {
  const t = useTranslations('HomePage');
  return <h1>{t('title')}</h1>;
}
```

### URL Structure

- `/en/` - English
- `/de/` - German
- `/en/services` - English services page

---

## 🎨 Theming System

### Tailwind CSS v4

This project uses Tailwind CSS v4 with CSS-first configuration via `globals.css`.

### CSS Variables

All colors use CSS custom properties for easy theming:

```css
:root {
  --background: #ffffff;
  --foreground: #171717;
  --primary: #3b82f6;
  --secondary: #64748b;
  --accent: #f59e0b;
  --destructive: #ef4444;
  --success: #22c55e;
  --warning: #f59e0b;
  --muted: #6b7280;
}
```

### Using Theme Colors

```tsx
// In components
<div className="bg-primary text-foreground">
  Themed content
</div>
```

### Brand Themes

Switch themes by applying CSS classes:

```tsx
// Default theme
<div className="">...</div>

// Brand A (warm amber)
<div className="theme-brand-a">...</div>

// Brand B (purple/violet)
<div className="theme-brand-b">...</div>
```

### Dark Mode

Dark mode is automatic via `prefers-color-scheme: dark`. All theme variables have dark variants.

### Master Scale Control

Adjust the entire UI scale with one variable:

```css
:root {
  --scale: 1;    /* Default */
  --scale: 1.25; /* 25% larger */
  --scale: 0.875; /* 12.5% smaller */
}
```

---

## ♿ Accessibility

All components are built with accessibility as a first-class priority:

### Radix UI Primitives

Components use [Radix UI](https://www.radix-ui.com/) primitives ensuring:

- ✅ Full keyboard navigation
- ✅ Screen reader support
- ✅ Focus management
- ✅ ARIA attributes
- ✅ WAI-ARIA patterns

### Focus Indicators

All interactive elements have visible focus states:

```css
focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary
```

### Component Example

```tsx
<Button
  variant="primary"
  size="lg"
  aria-label="Submit form"
>
  Submit
</Button>
```

---

## 🔧 Component API

### Button

```tsx
import { Button } from "@/components/atoms";

<Button
  variant="primary" | "secondary" | "accent" | "outline" | "ghost" | "link" | "destructive"
  size="xs" | "sm" | "md" | "lg" | "xl" | "icon"
  fullWidth={boolean}
  loading={boolean}
  asChild={boolean}
>
  Click me
</Button>
```

### Input

```tsx
import { Input } from "@/components/atoms";

<Input
  variant="default" | "filled" | "flushed"
  size="sm" | "md" | "lg"
  state="default" | "error" | "success"
  error="Error message"
/>
```

---

## 📦 Key Dependencies

| Package | Version | Purpose |
|---------|---------|---------|
| `next` | 16.1.6 | React framework |
| `react` | 19.2.3 | UI library |
| `next-intl` | 4.8.1 | Internationalization |
| `tailwindcss` | 4.x | Styling |
| `@radix-ui/*` | Various | Accessible primitives |
| `class-variance-authority` | 0.7.1 | Component variants |
| `tailwind-merge` | 3.4.0 | Class merging |
| `clsx` | 2.1.1 | Conditional classes |

---

## 🛠 Utility Functions

### `cn()` - Class Name Merger

Combines `clsx` and `tailwind-merge` for optimal class handling:

```tsx
import { cn } from "@/lib/utils";

<div className={cn(
  "base-class",
  isActive && "active-class",
  className
)} />
```

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## 🚀 Deployment

### Vercel (Recommended)

Deploy instantly with [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new)

### Other Platforms

This is a standard Next.js app and can be deployed to:

- AWS Amplify
- Netlify
- Docker containers
- Self-hosted Node.js

---

## 📚 Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [Tailwind CSS v4](https://tailwindcss.com/blog/tailwindcss-v4)
- [Radix UI](https://www.radix-ui.com/)
- [next-intl](https://next-intl-docs.vercel.app/)
- [Atomic Design](https://atomicdesign.bradfrost.com/)

---

## 📄 License

This project is open source and available under the [MIT License](../LICENSE).
