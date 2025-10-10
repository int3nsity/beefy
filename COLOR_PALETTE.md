# 🎨 Jerky Brand Color Palette

Visual reference for all brand colors with their hex codes and use cases.

---

## Primary Brand Colors

### 🔥 Fire Red

- **Color**: `#c73644`
- **Class**: `bg-fire-red` / `text-fire-red`
- **Use Case**: Primary CTAs, headlines, urgent messaging
- **Contrast**: Use with `canvas-light` or `bone-cream` text

### 🪵 Flame Brown

- **Color**: `#9d6f4f`
- **Class**: `bg-flame-brown` / `text-flame-brown`
- **Use Case**: Secondary headlines, earthy elements, product imagery
- **Contrast**: Use with `canvas-light` or `bone-cream` text

### ⚫ Smoke Black

- **Color**: `#1a1a1a`
- **Class**: `bg-smoke-black` / `text-smoke-black`
- **Use Case**: Text, dark backgrounds, premium feel
- **Contrast**: Use with light text colors

---

## Secondary Brand Colors

### 🌾 Bone Cream

- **Color**: `#f5e6d3`
- **Class**: `bg-bone-cream` / `text-bone-cream`
- **Use Case**: Section backgrounds, cards, soft contrast
- **Contrast**: Use with dark text colors

### 🥖 Toast Tan

- **Color**: `#d4a574`
- **Class**: `bg-toast-tan` / `text-toast-tan`
- **Use Case**: Accents, warm highlights, badges
- **Contrast**: Works with both light and dark text

### 🪨 Charcoal

- **Color**: `#2d2d2d`
- **Class**: `bg-charcoal` / `text-charcoal`
- **Use Case**: Body text, paragraphs, descriptions
- **Contrast**: Use on light backgrounds

---

## Accent Colors

### 🍊 Ember Orange

- **Color**: `#e85d2a`
- **Class**: `bg-ember-orange` / `text-ember-orange`
- **Use Case**: Sale badges, prices, hot deals, attention-grabbing elements
- **Contrast**: Use with light text (canvas-light, bone-cream)

### 🌶️ Salsa Red

- **Color**: `#d42e3f`
- **Class**: `bg-salsa-red` / `text-salsa-red`
- **Use Case**: Sale banners, limited offers, spicy products
- **Contrast**: Use with light text

### 🏜️ Mesa Brown

- **Color**: `#6b4423`
- **Class**: `bg-mesa-brown` / `text-mesa-brown`
- **Use Case**: Rich accents, product categories, footer links
- **Contrast**: Use with light text

---

## Neutral Palette

### ☁️ Canvas Light

- **Color**: `#faf8f5`
- **Class**: `bg-canvas-light` / `text-canvas-light`
- **Use Case**: Page backgrounds, text on dark backgrounds
- **Contrast**: Default page background

### 💨 Smoke Gray

- **Color**: `#8a8a8a`
- **Class**: `bg-smoke-gray` / `text-smoke-gray`
- **Use Case**: Secondary text, muted information, placeholders
- **Contrast**: Use on light backgrounds

### 🪨 Stone Gray

- **Color**: `#5a5a5a`
- **Class**: `bg-stone-gray` / `text-stone-gray`
- **Use Case**: Tertiary text, captions, timestamps
- **Contrast**: Use on light backgrounds

### 🌑 Midnight

- **Color**: `#0f0f0f`
- **Class**: `bg-midnight` / `text-midnight`
- **Use Case**: Deep black for borders, neo-brutalist shadows, footer
- **Contrast**: Use with light text

---

## Semantic Colors

### ✅ Success Green

- **Color**: `#4a9d5f`
- **Class**: `bg-success` / `text-success`
- **Use Case**: Success messages, "Added to cart", confirmations
- **Contrast**: Use with light text

### ⚠️ Warning Amber

- **Color**: `#e8a02a`
- **Class**: `bg-warning` / `text-warning`
- **Use Case**: Warning messages, stock alerts, important notices
- **Contrast**: Use with dark text or light backgrounds

### ❌ Error Red

- **Color**: `#d42e3f`
- **Class**: `bg-error` / `text-error`
- **Use Case**: Error messages, validation errors, sold out
- **Contrast**: Use with light text or light backgrounds

### ℹ️ Info Blue

- **Color**: `#3a7bd5`
- **Class**: `bg-info` / `text-info`
- **Use Case**: Information messages, tooltips, helpful hints
- **Contrast**: Use with light text

---

## Color Combinations

### High-Converting CTA

```tsx
className = 'bg-fire-red text-canvas-light border-midnight border-brutal';
```

**Why it works**: Maximum contrast, attention-grabbing, clear action

---

### Warm Product Card

```tsx
className = 'bg-bone-cream text-charcoal border-flame-brown border-2';
```

**Why it works**: Earthy, inviting, easy on the eyes

---

### Sale/Discount Badge

```tsx
className = 'bg-ember-orange text-canvas-light border-midnight border-2';
```

**Why it works**: Hot, urgent, can't miss it

---

### Premium/Dark Section

```tsx
className = 'bg-midnight text-canvas-light';
```

**Why it works**: Sophisticated, premium feel, dramatic

---

### Playful Banner

```tsx
className = 'bg-salsa-red text-canvas-light';
```

**Why it works**: Bold, energetic, fun

---

## Accessibility Notes

### WCAG Contrast Ratios

**AAA Level (7:1 or higher):**

- `text-midnight` on `bg-canvas-light` ✅
- `text-midnight` on `bg-bone-cream` ✅
- `text-canvas-light` on `bg-midnight` ✅
- `text-canvas-light` on `bg-fire-red` ✅
- `text-canvas-light` on `bg-ember-orange` ✅

**AA Level (4.5:1 or higher):**

- `text-charcoal` on `bg-canvas-light` ✅
- `text-charcoal` on `bg-bone-cream` ✅
- `text-stone-gray` on `bg-canvas-light` ✅

**Use with Caution:**

- Avoid `text-smoke-gray` on `bg-canvas-light` for body text (use for secondary only)
- Don't use `text-toast-tan` on `bg-bone-cream` (low contrast)
- Avoid `text-flame-brown` on `bg-toast-tan` (insufficient contrast)

---

## Usage Guidelines

### Do's ✅

- Use `fire-red` for primary CTAs and urgent actions
- Use `ember-orange` for sale prices and hot deals
- Use `charcoal` for body text on light backgrounds
- Use `bone-cream` for soft section backgrounds
- Use `midnight` for neo-brutalist borders and shadows

### Don'ts ❌

- Don't use too many colors in one section (pick 2-3 max)
- Don't use `flame-brown` and `toast-tan` together (too similar)
- Don't use accent colors for large text blocks
- Don't forget to check contrast for accessibility
- Don't use `smoke-gray` for important information

---

## Color Psychology

### 🔥 Reds (Fire Red, Salsa Red)

- **Emotion**: Energy, passion, urgency
- **Use For**: CTAs, sales, limited time offers

### 🧡 Oranges (Ember Orange)

- **Emotion**: Excitement, enthusiasm, warmth
- **Use For**: Prices, badges, hot items

### 🤎 Browns (Flame Brown, Mesa Brown, Toast Tan)

- **Emotion**: Natural, earthy, authentic
- **Use For**: Product imagery, trust signals, nature themes

### ⚫ Blacks & Grays (Midnight, Charcoal, Stone Gray)

- **Emotion**: Sophistication, premium, reliability
- **Use For**: Text, borders, elegant sections

### 🤍 Creams & Whites (Canvas Light, Bone Cream)

- **Emotion**: Clean, simple, pure
- **Use For**: Backgrounds, breathing room, clarity

---

## Quick Color Picker

Copy and paste these class combinations:

```tsx
// Hero sections
'bg-bone-cream text-charcoal';
'bg-midnight text-canvas-light';

// Product cards
'bg-canvas-light border-midnight border-3';
'bg-bone-cream text-charcoal';

// CTAs
'bg-fire-red text-canvas-light';
'bg-ember-orange text-canvas-light';
'bg-success text-canvas-light';

// Badges
'bg-ember-orange text-canvas-light border-midnight';
'bg-salsa-red text-canvas-light border-midnight';

// Text hierarchy
'text-fire-red'; // H1 headlines
'text-flame-brown'; // H2 subheadings
'text-charcoal'; // Body text
'text-stone-gray'; // Secondary text
'text-smoke-gray'; // Tertiary/metadata
```

---

## Testing Your Colors

Before shipping, test your color combinations:

1. **View in Grayscale**: Check if hierarchy still works
2. **Test at Different Times**: Colors look different in morning vs evening
3. **Check on Mobile**: Colors appear different on various screens
4. **Use Contrast Checker**: [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/)
5. **Get Feedback**: Ask others if colors convey the right emotion

---

**Remember**: Consistent use of this color palette will strengthen your brand identity and improve conversion rates.

---

_Color Palette Version: 1.0.0_  
_Designed for: Beefy V1 - Jerky Brand E-commerce_

