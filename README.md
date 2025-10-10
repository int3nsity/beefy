# Beefy V1 - Jerky Brand E-commerce

A high-converting e-commerce store built with Shopify Hydrogen and React Router, featuring a bold, playful design system perfect for a jerky brand.

## 🎨 Design System

This project features a comprehensive **Jerky Brand Design System** built with Tailwind CSS v4, including:

- 🎨 **25+ Brand Colors** - Carefully curated palette (flame brown, fire red, ember orange, etc.)
- 📝 **Typography System** - Three font families (Bebas Neue, Inter, Permanent Marker) with fluid scaling
- ⚡ **Neo-Brutalist Components** - Bold borders, hard shadows, and high-impact designs
- 🎭 **Custom Animations** - Wiggle, lift, rotate effects for engagement
- 📦 **Pre-built Components** - Buttons, cards, badges, and more
- 📱 **Fully Responsive** - Fluid typography and spacing that scales beautifully

### Quick Start with Design System

1. **View Live Examples**: Visit `/design-system` in your browser
2. **Read Documentation**: Check `DESIGN_SYSTEM.md` for comprehensive guide
3. **Quick Reference**: See `DESIGN_SYSTEM_CHEATSHEET.md` for common patterns

### Example Usage

```jsx
// Bold hero section
<section className="section-container py-5xl bg-bone-cream texture-noise">
  <h1 className="text-display text-5xl text-fire-red mb-lg">
    PREMIUM BEEF JERKY
  </h1>
  <button className="btn-primary animate-wiggle">
    Shop Now
  </button>
</section>

// Product card
<div className="product-card hover-lift">
  <img src="product.jpg" alt="Product" />
  <div className="p-lg">
    <span className="badge">New!</span>
    <h3 className="text-display text-xl">Product Name</h3>
    <button className="btn-primary w-full">Add to Cart</button>
  </div>
</div>
```

## What's included

- React Router v7
- Hydrogen
- Oxygen
- Vite
- Shopify CLI
- ESLint
- Prettier
- GraphQL generator
- TypeScript
- **Tailwind CSS v4** with custom design system
- Comprehensive component library

## Getting started

**Requirements:**

- Node.js version 18.0.0 or higher

```bash
npm create @shopify/hydrogen@latest
```

## Building for production

```bash
npm run build
```

## Local development

```bash
npm run dev
```

## Setup for using Customer Account API (`/account` section)

Follow step 1 and 2 of <https://shopify.dev/docs/custom-storefronts/building-with-the-customer-account-api/hydrogen#step-1-set-up-a-public-domain-for-local-development>
