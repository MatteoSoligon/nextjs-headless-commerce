# 🛒 Next.js Headless Commerce

> A modern, production-ready Next.js boilerplate for building headless commerce experiences with internationalization, accessible UI components, and scalable architecture.
---

## 🎯 Overview

This repository provides a **headless commerce boilerplate** built with modern web technologies, designed to be the foundation for scalable e-commerce applications. It prioritizes developer experience, accessibility, and maintainability.

---

## ✨ Features

### 🌍 Internationalization (i18n)
- Multi-language support with `next-intl`
- Locale-based routing (`/en/`, `/de/`, etc.)
- Translation management with JSON files
- SSR/SSG compatible

### ♿ Accessibility First
- All components built on Radix UI primitives
- WCAG 2.1 AA compliant
- Full keyboard navigation
- Screen reader optimized
- Visible focus indicators

### 🎨 Tailwind CSS v4 Theming
- CSS-first configuration
- Design tokens via CSS variables
- Multiple brand themes
- Automatic dark mode
- Master scale control for responsive sizing

### 🧱 Atomic Design
- Scalable component architecture
- Clear separation of concerns
- Consistent naming conventions
- Easy component discovery

---

### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun


## 🚀 Quick Start


```bash
# 1. Clone the repository
git clone https://github.com/your-username/nextjs-headless-commerce.git
cd nextjs-headless-commerce

# 2. Navigate to the Next.js app
cd nextjs-commerce

# 3. Install dependencies
npm install

# 4. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

---

## 🗂 Repository Structure

```
nextjs-headless-commerce/
├── nextjs-commerce/          # Main Next.js application
│   ├── app/                  # App Router pages & layouts
│   ├── components/           # Atomic Design components
│   │   ├── atoms/           # Basic elements (Button, Input, etc.)
│   │   ├── blocks/          # Composed components (Card, Dialog, etc.)
│   │   ├── sections/        # Page sections
│   │   ├── templates/       # Page templates
│   │   └── pages/           # Full page compositions
│   ├── i18n/                # Internationalization
│   ├── lib/                 # Utilities & helpers
│   ├── style/               # Global styles & theming
│   └── config/              # Configuration files
├── LICENSE
└── README.md                 # You are here
```

---

## 🧩 Component Library

### Atoms (Basic Elements)

### Blocks (Composed Resusable Components)

### Sections (Layout structured blocks)

### Templates (Resusable complex layout es: listing, filters)

### Pages (Page template)

---

## 🎨 Theming

### Available Themes

```tsx
// Default theme
<div>...</div>

// Brand A (Warm amber)
<div className="theme-brand-a">...</div>

// Brand B (Purple/violet)
<div className="theme-brand-b">...</div>
```

---

## 🛠 Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 16](https://nextjs.org/) |
| UI Library | [React 19](https://react.dev/) |
| Language | [TypeScript 5](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS v4](https://tailwindcss.com/) |
| Components | [Radix UI](https://www.radix-ui.com/) |
| i18n | [next-intl](https://next-intl-docs.vercel.app/) |
| Utilities | [CVA](https://cva.style/), [clsx](https://github.com/lukeed/clsx), [tailwind-merge](https://github.com/dcastil/tailwind-merge) |

---

## 📝 Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
TODO...

---


## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Radix UI](https://www.radix-ui.com/) - Accessible primitives
- [next-intl](https://next-intl-docs.vercel.app/) - i18n for Next.js
- [Atomic Design](https://atomicdesign.bradfrost.com/) - Design methodology

---
