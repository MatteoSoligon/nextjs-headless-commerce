# 🛒 Next.js Headless Commerce

> A modern, production-ready Next.js boilerplate for building headless commerce experiences with internationalization, accessible UI components, and scalable architecture.
---

## 🎯 Overview

This repository provides a **headless commerce boilerplate** built with modern web technologies, designed to be the foundation for scalable e-commerce applications. It prioritizes developer experience, accessibility, and maintainability.

---


### Prerequisites

- Node.js 18.17 or later
- npm, yarn, pnpm, or bun


## 🚀 Quick Start


```bash
# 1. Clone the repository
git clone https://github.com/your-username/nextjs-headless-commerce.git

# 2. Navigate to json-serve app folder
cd json-server

# 3. Install dependencies
npm install

# 4. Run json server for mock data
npm run dev

# 5. Navigate to the Next.js app
cd nextjs-commerce

# 6. Install dependencies
npm install

# 7. Start development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.
Json server runs on (http://localhost:8000)

---

## TODO

Below is the tracked project todo list. Update statuses here as you make progress.

- [done] Form builder
- [not-started] SEO metadata implementation — central `lib/seo` helpers, Head integration, OpenGraph/Twitter tags
- [doing] Global state — add a lightweight global store (Jotai) for cart and UI state
- [done] Env variables — validate and document required `NEXT_PUBLIC_` vars and `.env.example`
- [done] Listing logic — implement product listing, filtering, pagination & server-side data fetching
- [not-started] Analytics setup — integrate analytics (e.g., Segment/GA4) with an opt-out mechanism
- [not-started] Map component — lightweight map wrapper (Leaflet/Mapbox) for store locators
- [map api] Cache control headers — add `Cache-Control` strategy in `next.config.ts` for assets and APIs
- [doing] Ecommerce generic types — add TypeScript generics for product/cart/order models


