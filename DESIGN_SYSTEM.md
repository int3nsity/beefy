# Jerky Brand Design System

A playful, bold, high-converting e-commerce design system built with Tailwind CSS v4.

## 🎨 Overview

This design system provides a comprehensive set of design tokens, utilities, and components specifically crafted for a jerky brand e-commerce store. It features neo-brutalist design patterns, vibrant colors, and engaging animations.

---

## 📐 Design Tokens

### Color Palette

#### Primary Colors

- `--color-flame-brown` (#9d6f4f) - Warm, earthy brown
- `--color-smoke-black` (#1a1a1a) - Deep charcoal
- `--color-fire-red` (#c73644) - Bold brand red

#### Secondary Colors

- `--color-bone-cream` (#f5e6d3) - Light neutral
- `--color-toast-tan` (#d4a574) - Warm tan
- `--color-charcoal` (#2d2d2d) - Dark gray

#### Accent Colors

- `--color-ember-orange` (#e85d2a) - Vibrant orange
- `--color-salsa-red` (#d42e3f) - Punchy red
- `--color-mesa-brown` (#6b4423) - Deep brown

#### Neutral Colors

- `--color-canvas-light` (#faf8f5) - Off-white background
- `--color-smoke-gray` (#8a8a8a) - Mid gray
- `--color-stone-gray` (#5a5a5a) - Dark gray
- `--color-midnight` (#0f0f0f) - Almost black

#### Semantic Colors

- `--color-success` (#4a9d5f) - Success green
- `--color-warning` (#e8a02a) - Warning amber
- `--color-error` (#d42e3f) - Error red
- `--color-info` (#3a7bd5) - Info blue

**Usage with Tailwind:**

```jsx
<div className="bg-flame-brown text-canvas-light">
  <h1 className="text-fire-red">Bold Headline</h1>
  <p className="text-charcoal">Body text</p>
</div>
```

---

### Typography

#### Font Families

- **Display Font**: Bebas Neue - For headlines, CTAs, and impact text
- **Body Font**: Inter - For readable body copy
- **Accent Font**: Permanent Marker - For playful elements

#### Font Sizes (Fluid & Responsive)

- `--font-size-xs` - clamp(0.75rem → 0.875rem)
- `--font-size-sm` - clamp(0.875rem → 1rem)
- `--font-size-base` - clamp(1rem → 1.125rem)
- `--font-size-lg` - clamp(1.125rem → 1.375rem)
- `--font-size-xl` - clamp(1.25rem → 1.75rem)
- `--font-size-2xl` - clamp(1.5rem → 2.25rem)
- `--font-size-3xl` - clamp(2rem → 3.5rem)
- `--font-size-4xl` - clamp(2.5rem → 4.5rem)
- `--font-size-5xl` - clamp(3rem → 6rem)

**Usage:**

```jsx
<h1 className="text-5xl text-display">Massive Headline</h1>
<h2 className="text-3xl text-display">Section Title</h2>
<p className="text-base">Body paragraph</p>
<span className="text-sm text-accent">Playful tag!</span>
```

#### Font Weights

- `--font-weight-normal` (400)
- `--font-weight-medium` (500)
- `--font-weight-semibold` (600)
- `--font-weight-bold` (700)
- `--font-weight-black` (900)

---

### Spacing System

Consistent spacing scale from 8px to 128px:

- `--spacing-xs` (8px)
- `--spacing-sm` (12px)
- `--spacing-md` (16px)
- `--spacing-lg` (24px)
- `--spacing-xl` (32px)
- `--spacing-2xl` (48px)
- `--spacing-3xl` (64px)
- `--spacing-4xl` (96px)
- `--spacing-5xl` (128px)

**Usage:**

```jsx
<div className="p-lg">Padded container</div>
<section className="mt-3xl mb-2xl">Spacious section</section>
```

---

### Border Radius

From sharp to fully rounded:

- `--radius-none` (0)
- `--radius-sm` (4px)
- `--radius-md` (8px)
- `--radius-lg` (12px)
- `--radius-xl` (16px)
- `--radius-2xl` (24px)
- `--radius-full` (9999px)
- `--radius-blob` - Organic blob shape (30% 70% 70% 30% / 30% 30% 70% 70%)

**Usage:**

```jsx
<button className="rounded-md">Button</button>
<img className="rounded-full" />
<div className="blob-shape">Organic shape</div>
```

---

### Shadows

From subtle to dramatic neo-brutalist:

- `--shadow-sm` - Subtle shadow
- `--shadow-base` - Standard shadow
- `--shadow-md` - Medium shadow
- `--shadow-lg` - Large shadow
- `--shadow-xl` - Extra large shadow
- `--shadow-brutal` - 8px 8px hard black shadow
- `--shadow-brutal-sm` - 4px 4px hard black shadow

**Usage:**

```jsx
<div className="shadow-lg">Elevated card</div>
<button className="border-brutal">Neo-brutalist button</button>
```

---

### Animation & Timing

#### Durations

- `--duration-fast` (150ms)
- `--duration-base` (250ms)
- `--duration-slow` (350ms)
- `--duration-slower` (500ms)

#### Easing Functions

- `--ease-in` - Accelerate
- `--ease-out` - Decelerate
- `--ease-in-out` - Smooth start and end
- `--ease-bounce` - Playful bounce effect

---

## 🛠 Custom Utilities

### Text Utilities

#### `.text-display`

Applies display font styling with uppercase, wide letter spacing, and tight line height.

```jsx
<h1 className="text-display text-4xl">BOLD STATEMENT</h1>
```

#### `.text-accent`

Applies playful accent font (Permanent Marker).

```jsx
<span className="text-accent text-lg">Handwritten Style!</span>
```

#### `.text-gradient-fire`

Creates a vibrant orange-to-red gradient text effect.

```jsx
<h2 className="text-gradient-fire text-3xl">Hot Deal!</h2>
```

---

### Border & Shadow Utilities

#### `.border-brutal`

Neo-brutalist style with thick black border and hard shadow.

```jsx
<div className="border-brutal bg-ember-orange p-lg">Bold card design</div>
```

#### `.border-brutal-sm`

Smaller version of neo-brutalist border.

```jsx
<button className="border-brutal-sm">Click Me</button>
```

---

### Animation Utilities

#### `.hover-lift`

Smooth lift effect on hover.

```jsx
<div className="hover-lift">Hover to lift</div>
```

#### `.animate-wiggle`

Subtle wiggle animation (great for CTAs).

```jsx
<button className="animate-wiggle">Limited Time!</button>
```

#### `.animate-rotate-slow`

Slow 360° rotation (20 seconds).

```jsx
<div className="animate-rotate-slow">🔥</div>
```

---

### Shape Utilities

#### `.blob-shape`

Organic, asymmetric border radius.

```jsx
<img src="product.jpg" className="blob-shape" alt="Product" />
```

#### `.texture-noise`

Adds subtle noise texture overlay.

```jsx
<section className="texture-noise bg-bone-cream">Textured background</section>
```

---

## 🧩 Pre-built Components

### Primary Button (`.btn-primary`)

Bold, high-converting CTA button with neo-brutalist styling.

```jsx
<button className="btn-primary">Shop Now</button>
```

**Features:**

- Display font (Bebas Neue)
- Fire red background
- Black brutal border and shadow
- Bounce animation on hover
- Elevated shadow effect

---

### Product Card (`.product-card`)

Branded product card with hover effects.

```jsx
<div className="product-card">
  <img src="product.jpg" alt="Product" />
  <div className="p-lg">
    <h3 className="text-display text-xl">Product Name</h3>
    <p className="text-base">$24.99</p>
    <button className="btn-primary mt-md">Add to Cart</button>
  </div>
</div>
```

**Features:**

- Neo-brutalist border
- Lift animation on hover
- Automatic shadow on hover

---

### Badge (`.badge`)

Attention-grabbing label for sales, new items, etc.

```jsx
<span className="badge">New!</span>
<span className="badge">50% OFF</span>
```

**Features:**

- Accent font (Permanent Marker)
- Ember orange background
- Small brutal shadow
- Pill shape

---

### Section Container (`.section-container`)

Centered, max-width container with responsive padding.

```jsx
<section className="section-container py-4xl">
  <h2 className="text-display text-4xl mb-xl">Featured Products</h2>
  {/* Content */}
</section>
```

**Features:**

- Max-width: 1400px
- Responsive horizontal padding
- Auto-centered

---

## 📱 Responsive Design

### Breakpoints

- `--breakpoint-sm` (640px)
- `--breakpoint-md` (768px)
- `--breakpoint-lg` (1024px)
- `--breakpoint-xl` (1280px)
- `--breakpoint-2xl` (1536px)

### Fluid Design Tokens

- `--container-padding` - clamp(1rem → 3rem)
- `--section-spacing` - clamp(3rem → 8rem)
- `--grid-gap` - clamp(1rem → 2rem)

**Usage:**

```jsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[var(--grid-gap)]">
  {/* Responsive grid */}
</div>
```

---

## 🎯 Usage Examples

### Hero Section

```jsx
<section className="section-container py-5xl texture-noise bg-bone-cream">
  <h1 className="text-display text-5xl text-fire-red mb-lg">
    PREMIUM BEEF JERKY
  </h1>
  <p className="text-xl mb-xl max-w-2xl">
    Handcrafted, bold flavors that pack a punch.
  </p>
  <button className="btn-primary animate-wiggle">Shop Now</button>
</section>
```

### Product Grid

```jsx
<section className="section-container py-4xl">
  <h2 className="text-display text-4xl mb-2xl">Best Sellers</h2>
  <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
    {products.map((product) => (
      <div key={product.id} className="product-card hover-lift">
        <img src={product.image} alt={product.name} />
        <div className="p-lg">
          <span className="badge mb-sm">New!</span>
          <h3 className="text-display text-xl mb-sm">{product.name}</h3>
          <p className="text-ember-orange font-bold text-lg">
            ${product.price}
          </p>
          <button className="btn-primary w-full mt-md">Add to Cart</button>
        </div>
      </div>
    ))}
  </div>
</section>
```

### Call-to-Action Banner

```jsx
<section className="bg-fire-red text-canvas-light py-3xl">
  <div className="section-container text-center">
    <h2 className="text-display text-4xl mb-md">LIMITED TIME OFFER</h2>
    <p className="text-xl mb-xl">Get 25% off your first order!</p>
    <button className="btn-primary bg-ember-orange border-brutal">
      Claim Discount
    </button>
  </div>
</section>
```

---

## 🎨 Color Combinations

### High Contrast (Primary CTAs)

- Background: `fire-red`
- Text: `canvas-light`
- Border: `midnight`

### Warm & Inviting (Product Sections)

- Background: `bone-cream`
- Headings: `flame-brown`
- Accents: `ember-orange`

### Bold & Energetic (Sale Banners)

- Background: `ember-orange`
- Text: `canvas-light`
- Accents: `salsa-red`

### Natural & Earthy (About/Story Sections)

- Background: `canvas-light`
- Headings: `mesa-brown`
- Text: `charcoal`

---

## 🚀 Best Practices

1. **Use Display Font Sparingly**: Reserve Bebas Neue for headlines and CTAs only
2. **Leverage Fluid Typography**: Font sizes automatically scale with viewport
3. **Embrace Neo-brutalism**: Don't shy away from bold borders and hard shadows
4. **Add Motion**: Use `hover-lift` and `animate-wiggle` to create engagement
5. **Maintain Hierarchy**: Use the font size scale consistently (5xl → 4xl → 3xl)
6. **Combine Utilities**: Layer `border-brutal` + `hover-lift` for maximum impact
7. **Use Semantic Colors**: Stick to `success`, `warning`, `error` for UI feedback
8. **Texture Wisely**: Apply `texture-noise` to large background sections

---

## 🔧 Customization

All design tokens are CSS variables, making them easy to override:

```css
/* In your custom CSS or component */
.special-section {
  --color-fire-red: #ff0000; /* Override brand red */
  --spacing-xl: 3rem; /* Adjust spacing */
}
```

---

## 📦 What's Included

- ✅ Comprehensive color system (25+ colors)
- ✅ Fluid responsive typography
- ✅ Spacing & layout tokens
- ✅ Neo-brutalist border & shadow utilities
- ✅ Custom animations (wiggle, lift, rotate)
- ✅ Pre-built components (buttons, cards, badges)
- ✅ Texture overlays
- ✅ Gradient utilities
- ✅ Full Tailwind v4 integration

---

## 🎓 Learning Resources

- [Tailwind CSS v4 Documentation](https://tailwindcss.com/docs/v4-beta)
- [CSS Custom Properties (MDN)](https://developer.mozilla.org/en-US/docs/Web/CSS/--*)
- [Fluid Typography Guide](https://utopia.fyi/type/calculator/)

---

## 🆘 Support

For questions or issues with the design system:

1. Check the examples in this documentation
2. Review the `tailwind.css` file for all available tokens
3. Test in the browser dev tools to inspect computed values

---

**Version**: 1.0.0  
**Last Updated**: October 2025  
**Tailwind Version**: 4.1.6
