# Design System Quick Reference

A quick cheatsheet for the most commonly used classes and utilities.

---

## 🎨 Colors (with Tailwind)

```jsx
// Backgrounds
bg - fire - red; // Bold brand red
bg - ember - orange; // Vibrant orange
bg - flame - brown; // Warm brown
bg - bone - cream; // Light neutral
bg - canvas - light; // Off-white

// Text
text - fire - red;
text - charcoal;
text - midnight;
text - stone - gray;
text - smoke - gray;
```

---

## 📝 Typography

```jsx
// Font Families
text-display         // Bebas Neue (uppercase + wide spacing)
text-accent          // Permanent Marker (playful)
// Body font is default (Inter)

// Sizes (fluid & responsive)
text-xs   text-sm   text-base   text-lg   text-xl
text-2xl  text-3xl  text-4xl    text-5xl
```

---

## 🎯 Pre-built Components

```jsx
// Primary Button
<button className="btn-primary">Click Me</button>

// Product Card
<div className="product-card">...</div>

// Badge
<span className="badge">New!</span>

// Container
<div className="section-container">...</div>
```

---

## ✨ Effects & Animations

```jsx
// Hover Effects
hover - lift; // Lift on hover
hover: shadow - brutal; // Add shadow on hover

// Animations
animate - wiggle; // Subtle wiggle (great for CTAs)
animate - rotate - slow; // Slow rotation

// Borders & Shadows
border - brutal; // 3px border + hard shadow
border - brutal - sm; // 2px border + small shadow
```

---

## 🎨 Special Effects

```jsx
// Gradient Text
<h1 className="text-gradient-fire">Hot Deal!</h1>

// Organic Shape
<div className="blob-shape">...</div>

// Texture Overlay
<section className="texture-noise bg-bone-cream">...</section>
```

---

## 📐 Spacing

```jsx
// Padding & Margin
p-xs   p-sm   p-md   p-lg   p-xl   p-2xl   p-3xl   p-4xl   p-5xl
m-xs   m-sm   m-md   m-lg   m-xl   m-2xl   m-3xl   m-4xl   m-5xl

// Specific sides: pt-lg, pb-xl, pl-md, pr-sm, px-lg, py-2xl
```

---

## 🔄 Common Patterns

### Hero Section

```jsx
<section className="section-container py-5xl texture-noise bg-bone-cream">
  <h1 className="text-display text-5xl text-fire-red mb-lg">YOUR HEADLINE</h1>
  <p className="text-xl mb-xl">Your subtext</p>
  <button className="btn-primary">CTA Button</button>
</section>
```

### Product Card

```jsx
<div className="product-card hover-lift">
  <img src="..." alt="..." />
  <div className="p-lg">
    <span className="badge mb-sm">New!</span>
    <h3 className="text-display text-xl mb-sm">Product Name</h3>
    <p className="text-ember-orange font-bold text-lg">$24.99</p>
    <button className="btn-primary w-full mt-md">Add to Cart</button>
  </div>
</div>
```

### Sale Banner

```jsx
<section className="bg-fire-red text-canvas-light py-3xl">
  <div className="section-container text-center">
    <h2 className="text-display text-4xl mb-md">LIMITED OFFER</h2>
    <p className="text-xl mb-xl">25% OFF Everything!</p>
    <button className="btn-primary bg-ember-orange">Shop Now</button>
  </div>
</section>
```

### Feature Grid

```jsx
<div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
  <div className="text-center">
    <div className="w-20 h-20 bg-ember-orange border-brutal-sm rounded-full mx-auto mb-md">
      ✓
    </div>
    <h3 className="text-display text-xl mb-sm">Feature Title</h3>
    <p className="text-base text-stone-gray">Description</p>
  </div>
  {/* Repeat for more features */}
</div>
```

---

## 🎨 Color Combinations

**High Impact CTA:**

```jsx
className = 'bg-fire-red text-canvas-light border-brutal';
```

**Sale/Discount:**

```jsx
className = 'bg-ember-orange text-canvas-light border-brutal-sm';
```

**Success State:**

```jsx
className = 'bg-success text-canvas-light';
```

**Neutral/Clean:**

```jsx
className = 'bg-bone-cream text-charcoal';
```

---

## 📱 Responsive Grid

```jsx
// 1 col mobile, 2 tablet, 3 desktop, 4 large
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-xl">
  {/* items */}
</div>
```

---

## 🔗 Quick Links

- Full Documentation: `DESIGN_SYSTEM.md`
- Live Examples: `/design-system` route
- Example Component: `app/components/DesignSystemExample.tsx`

---

## 💡 Pro Tips

1. **Combine for Impact**: `btn-primary animate-wiggle` for urgent CTAs
2. **Layer Effects**: `product-card hover-lift border-brutal`
3. **Use Fluid Spacing**: Let font sizes and spacing scale automatically
4. **Embrace Bold**: Don't be afraid of strong colors and shadows
5. **Keep Hierarchy**: Use display font for headlines only

---

**Need help?** Check the full `DESIGN_SYSTEM.md` for detailed examples and explanations.

