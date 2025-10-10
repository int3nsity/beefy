# Design System Migration Guide

This guide helps you migrate existing components to use the new Jerky Brand Design System.

---

## 🎯 Migration Strategy

### Phase 1: Global Styles (✅ Complete)

- ✅ Tailwind CSS v4 with custom design system
- ✅ Google Fonts integration (Bebas Neue, Inter, Permanent Marker)
- ✅ Design tokens and utilities
- ✅ Component patterns

### Phase 2: Component Updates (Your Turn)

- Update existing components to use new design tokens
- Replace inline styles with design system utilities
- Apply brand typography

### Phase 3: Polish & Refinement

- Add animations and interactions
- Optimize for conversion
- A/B test design variations

---

## 🔄 Common Replacements

### Typography

**Before:**

```jsx
<h1 style={{fontSize: '2rem', fontWeight: 'bold'}}>Product Title</h1>
```

**After:**

```jsx
<h1 className="text-display text-4xl">PRODUCT TITLE</h1>
```

---

### Buttons

**Before:**

```jsx
<button
  style={{
    padding: '12px 24px',
    background: '#c73644',
    color: 'white',
    border: 'none',
  }}
>
  Add to Cart
</button>
```

**After:**

```jsx
<button className="btn-primary">Add to Cart</button>
```

---

### Color References

**Before:**

```jsx
<div style={{backgroundColor: '#f5e6d3', color: '#1a1a1a'}}>Content</div>
```

**After:**

```jsx
<div className="bg-bone-cream text-smoke-black">Content</div>
```

---

### Spacing

**Before:**

```jsx
<section style={{padding: '48px 24px', marginBottom: '64px'}}>
```

**After:**

```jsx
<section className="py-2xl px-lg mb-3xl">
```

---

## 📦 Updating Key Components

### Header Component

```jsx
// app/components/Header.tsx

// Replace basic styling with design system
<header className="header bg-bone-cream border-b-2 border-midnight">
  <nav className="section-container">
    <Link to="/" className="text-display text-2xl text-fire-red">
      BEEFY
    </Link>
    {/* ... rest of header */}
  </nav>
</header>
```

---

### Footer Component

```jsx
// app/components/Footer.tsx

<footer className="footer bg-midnight text-canvas-light py-3xl">
  <div className="section-container">
    <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
      {/* Footer columns */}
    </div>
  </div>
</footer>
```

---

### Product Cards

**Before:**

```jsx
<div className="recommended-product">
  <img src={product.image} alt={product.title} />
  <h3>{product.title}</h3>
  <p>${product.price}</p>
</div>
```

**After:**

```jsx
<div className="product-card hover-lift">
  <img src={product.image} alt={product.title} />
  <div className="p-lg">
    {product.tags.includes('new') && <span className="badge mb-sm">New!</span>}
    <h3 className="text-display text-xl mb-sm">{product.title}</h3>
    <p className="text-ember-orange font-bold text-lg">${product.price}</p>
    <button className="btn-primary w-full mt-md">Add to Cart</button>
  </div>
</div>
```

---

### Collection Pages

```jsx
// app/routes/($locale).collections.$handle.tsx

export default function CollectionPage({loaderData}) {
  const {collection} = loaderData;

  return (
    <div className="section-container py-4xl">
      {/* Hero Section */}
      <div className="mb-3xl text-center">
        <h1 className="text-display text-5xl text-fire-red mb-lg">
          {collection.title}
        </h1>
        <p className="text-xl text-charcoal max-w-3xl mx-auto">
          {collection.description}
        </p>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-xl">
        {collection.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
```

---

### Product Detail Pages

```jsx
// app/routes/($locale).products.$handle.tsx

<div className="section-container py-4xl">
  <div className="grid grid-cols-1 lg:grid-cols-2 gap-3xl">
    {/* Images */}
    <div>
      <ProductImage product={product} className="border-brutal" />
    </div>

    {/* Details */}
    <div>
      {product.tags.includes('sale') && (
        <span className="badge bg-salsa-red mb-md">Sale!</span>
      )}

      <h1 className="text-display text-4xl text-midnight mb-lg">
        {product.title}
      </h1>

      <div className="text-3xl text-ember-orange font-bold mb-xl">
        ${product.price}
      </div>

      <div className="prose prose-lg mb-xl">
        <p className="text-base text-charcoal">{product.description}</p>
      </div>

      <ProductForm>
        <button className="btn-primary w-full animate-wiggle">
          Add to Cart
        </button>
      </ProductForm>
    </div>
  </div>
</div>
```

---

## 🎨 Adding Visual Interest

### Sale Banners

Add to homepage or collection pages:

```jsx
<section className="bg-fire-red text-canvas-light py-3xl my-4xl">
  <div className="section-container text-center">
    <h2 className="text-display text-4xl mb-md">FLASH SALE</h2>
    <p className="text-accent text-2xl mb-lg">40% off everything!</p>
    <p className="text-xl mb-xl">
      Use code <strong className="text-ember-orange">FLASH40</strong> at
      checkout
    </p>
    <button className="btn-primary bg-ember-orange border-brutal">
      Shop The Sale
    </button>
  </div>
</section>
```

---

### Trust Badges

Add to homepage or product pages:

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-lg my-3xl">
  <div className="text-center p-lg border-brutal-sm bg-bone-cream">
    <div className="text-4xl mb-md">🚚</div>
    <h3 className="text-display text-lg mb-xs">Free Shipping</h3>
    <p className="text-sm text-stone-gray">On orders over $50</p>
  </div>

  <div className="text-center p-lg border-brutal-sm bg-bone-cream">
    <div className="text-4xl mb-md">✓</div>
    <h3 className="text-display text-lg mb-xs">Quality Guaranteed</h3>
    <p className="text-sm text-stone-gray">100% satisfaction or refund</p>
  </div>

  <div className="text-center p-lg border-brutal-sm bg-bone-cream">
    <div className="text-4xl mb-md">🔒</div>
    <h3 className="text-display text-lg mb-xs">Secure Checkout</h3>
    <p className="text-sm text-stone-gray">Your data is protected</p>
  </div>
</div>
```

---

## 🔍 CSS Variable Access

Access design tokens directly in your styles:

```tsx
// In a component with custom styling needs
<div
  style={{
    backgroundColor: 'var(--color-bone-cream)',
    padding: 'var(--spacing-xl)',
    borderRadius: 'var(--radius-lg)',
    boxShadow: 'var(--shadow-brutal)',
  }}
>
  Custom styled content
</div>
```

---

## ⚠️ Things to Avoid

### ❌ Don't Mix Old and New Styles

```jsx
// Bad - mixing inline styles with design system
<button className="btn-primary" style={{background: 'blue'}}>
```

### ❌ Don't Override Display Font Casing

```jsx
// Bad - display font is designed for uppercase
<h1 className="text-display lowercase">
```

### ❌ Don't Use Display Font for Body Text

```jsx
// Bad - display font is for headlines only
<p className="text-display">Long paragraph text...</p>
```

### ❌ Don't Skip the Section Container

```jsx
// Bad - content touches viewport edges
<section>
  <h2>Title</h2>
  <p>Content</p>
</section>

// Good - proper padding and max-width
<section className="section-container py-4xl">
  <h2>Title</h2>
  <p>Content</p>
</section>
```

---

## ✅ Migration Checklist

### Components to Update

- [ ] Header
- [ ] Footer
- [ ] ProductCard
- [ ] ProductPrice
- [ ] AddToCartButton
- [ ] CartMain
- [ ] SearchForm
- [ ] Home page hero
- [ ] Collection pages
- [ ] Product detail pages
- [ ] About/info pages

### Pages to Review

- [ ] Homepage (`app/routes/($locale)._index.tsx`)
- [ ] Collection pages (`app/routes/($locale).collections.$handle.tsx`)
- [ ] Product pages (`app/routes/($locale).products.$handle.tsx`)
- [ ] Cart page (`app/routes/($locale).cart.tsx`)
- [ ] Account pages

### Testing

- [ ] Test responsive behavior on mobile
- [ ] Verify font loading
- [ ] Check color contrast for accessibility
- [ ] Test hover states and animations
- [ ] Verify cart functionality still works
- [ ] Test checkout flow

---

## 📚 Resources

- **Full Documentation**: `DESIGN_SYSTEM.md`
- **Quick Reference**: `DESIGN_SYSTEM_CHEATSHEET.md`
- **Live Examples**: `/design-system` route
- **Example Component**: `app/components/DesignSystemExample.tsx`

---

## 🆘 Need Help?

If you encounter issues during migration:

1. Check the live examples at `/design-system`
2. Review `DesignSystemExample.tsx` for patterns
3. Inspect existing `app.css` for component-specific styles that may need updating
4. Test incrementally - update one component at a time

---

**Pro Tip**: Start with high-impact pages (homepage, product pages) to see immediate visual improvements, then work through lower-traffic pages.

