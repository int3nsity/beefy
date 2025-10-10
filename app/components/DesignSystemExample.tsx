/**
 * DESIGN SYSTEM EXAMPLE COMPONENT
 *
 * This component demonstrates how to use the Jerky Brand Design System
 * in your React components. Use this as a reference for implementing
 * the design system across your application.
 *
 * @example
 * import {DesignSystemExample} from '~/components/DesignSystemExample';
 *
 * <DesignSystemExample />
 */

export function DesignSystemExample() {
  return (
    <div className="min-h-screen bg-canvas-light">
      {/* Hero Section - Display Font & Gradient Text */}
      <section className="section-container py-5xl texture-noise bg-bone-cream">
        <h1 className="text-display text-5xl text-fire-red mb-lg">
          PREMIUM BEEF JERKY
        </h1>
        <p className="text-xl text-charcoal mb-xl max-w-2xl">
          Handcrafted, bold flavors that pack a punch. Made with 100% premium
          beef.
        </p>
        <button className="btn-primary">Shop Now</button>
      </section>

      {/* Product Grid Section */}
      <section className="section-container py-4xl">
        <div className="flex items-center justify-between mb-2xl">
          <h2 className="text-display text-4xl text-flame-brown">
            Best Sellers
          </h2>
          <span className="badge">Hot! 🔥</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl">
          {/* Product Card 1 */}
          <div className="product-card hover-lift">
            <div className="aspect-square bg-smoke-gray relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="badge bg-salsa-red">Sale!</span>
              </div>
              {/* Product image would go here */}
              <div className="w-full h-full flex items-center justify-center text-6xl">
                🥩
              </div>
            </div>
            <div className="p-lg">
              <h3 className="text-display text-xl mb-sm text-midnight">
                Original Beef
              </h3>
              <p className="text-sm text-stone-gray mb-md">
                Classic recipe with just the right amount of kick
              </p>
              <div className="flex items-center justify-between mb-md">
                <span className="text-ember-orange font-bold text-lg">
                  $24.99
                </span>
                <span className="text-sm text-smoke-gray line-through">
                  $32.99
                </span>
              </div>
              <button className="btn-primary w-full">Add to Cart</button>
            </div>
          </div>

          {/* Product Card 2 */}
          <div className="product-card hover-lift">
            <div className="aspect-square bg-smoke-gray relative overflow-hidden">
              <div className="absolute top-4 right-4">
                <span className="badge bg-ember-orange">New!</span>
              </div>
              <div className="w-full h-full flex items-center justify-center text-6xl">
                🌶️
              </div>
            </div>
            <div className="p-lg">
              <h3 className="text-display text-xl mb-sm text-midnight">
                Spicy Inferno
              </h3>
              <p className="text-sm text-stone-gray mb-md">
                Turn up the heat with our hottest jerky yet
              </p>
              <div className="flex items-center justify-between mb-md">
                <span className="text-ember-orange font-bold text-lg">
                  $26.99
                </span>
              </div>
              <button className="btn-primary w-full">Add to Cart</button>
            </div>
          </div>

          {/* Product Card 3 */}
          <div className="product-card hover-lift">
            <div className="aspect-square bg-smoke-gray relative overflow-hidden">
              <div className="w-full h-full flex items-center justify-center text-6xl">
                🍯
              </div>
            </div>
            <div className="p-lg">
              <h3 className="text-display text-xl mb-sm text-midnight">
                Sweet BBQ
              </h3>
              <p className="text-sm text-stone-gray mb-md">
                Smoky sweetness meets tender perfection
              </p>
              <div className="flex items-center justify-between mb-md">
                <span className="text-ember-orange font-bold text-lg">
                  $24.99
                </span>
              </div>
              <button className="btn-primary w-full">Add to Cart</button>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Banner with Neo-brutalist Design */}
      <section className="bg-fire-red text-canvas-light py-3xl">
        <div className="section-container">
          <div className="border-brutal bg-ember-orange p-2xl text-center blob-shape">
            <h2 className="text-display text-4xl mb-md">LIMITED TIME OFFER</h2>
            <p className="text-accent text-2xl mb-lg">
              Get 25% OFF your first order!
            </p>
            <p className="text-xl mb-xl max-w-2xl mx-auto">
              Use code <span className="font-bold">FIRST25</span> at checkout.
              Valid for new customers only.
            </p>
            <button className="btn-primary bg-midnight border-brutal-sm animate-wiggle">
              Claim Your Discount
            </button>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="section-container py-4xl">
        <h2 className="text-display text-4xl text-center mb-2xl text-flame-brown">
          Why Choose Our Jerky?
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
          <div className="text-center">
            <div className="w-20 h-20 bg-ember-orange border-brutal-sm rounded-full mx-auto mb-md flex items-center justify-center text-4xl">
              ✓
            </div>
            <h3 className="text-display text-xl mb-sm text-midnight">
              100% Premium Beef
            </h3>
            <p className="text-base text-stone-gray">
              Only the finest cuts make it into our jerky
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-salsa-red border-brutal-sm rounded-full mx-auto mb-md flex items-center justify-center text-4xl">
              🔥
            </div>
            <h3 className="text-display text-xl mb-sm text-midnight">
              Bold Flavors
            </h3>
            <p className="text-base text-stone-gray">
              Recipes crafted for maximum taste impact
            </p>
          </div>

          <div className="text-center">
            <div className="w-20 h-20 bg-success border-brutal-sm rounded-full mx-auto mb-md flex items-center justify-center text-4xl">
              🌿
            </div>
            <h3 className="text-display text-xl mb-sm text-midnight">
              All Natural
            </h3>
            <p className="text-base text-stone-gray">
              No artificial preservatives or additives
            </p>
          </div>
        </div>
      </section>

      {/* Gradient Text Section */}
      <section className="section-container py-4xl text-center">
        <h2 className="text-gradient-fire text-display text-5xl mb-lg">
          FIRE UP YOUR SNACK GAME
        </h2>
        <p className="text-xl text-charcoal max-w-3xl mx-auto">
          Join thousands of satisfied customers who've upgraded their snacking
          experience
        </p>
      </section>

      {/* Typography Showcase */}
      <section className="section-container py-4xl bg-bone-cream">
        <h2 className="text-display text-3xl mb-xl text-midnight">
          Typography Examples
        </h2>

        <div className="space-y-lg">
          <div>
            <p className="text-sm text-smoke-gray mb-xs">
              Display Font (Headers)
            </p>
            <h1 className="text-display text-4xl text-midnight">
              THIS IS BEBAS NEUE
            </h1>
          </div>

          <div>
            <p className="text-sm text-smoke-gray mb-xs">Body Font (Content)</p>
            <p className="text-base text-charcoal">
              This is Inter, our clean and readable body font. Perfect for
              product descriptions, blog posts, and all your content needs.
            </p>
          </div>

          <div>
            <p className="text-sm text-smoke-gray mb-xs">
              Accent Font (Playful Elements)
            </p>
            <p className="text-accent text-xl text-ember-orange">
              This is Permanent Marker for fun vibes!
            </p>
          </div>
        </div>
      </section>

      {/* Buttons & Interactive Elements */}
      <section className="section-container py-4xl">
        <h2 className="text-display text-3xl mb-xl text-midnight">
          Interactive Components
        </h2>

        <div className="flex flex-wrap gap-md items-center">
          <button className="btn-primary">Primary CTA</button>

          <button className="btn-primary bg-ember-orange">
            Orange Variant
          </button>

          <button className="btn-primary bg-success">Success Action</button>

          <span className="badge">Badge</span>
          <span className="badge bg-salsa-red">Sale</span>
          <span className="badge bg-success">New</span>
        </div>

        <div className="mt-xl">
          <h3 className="text-display text-xl mb-md text-midnight">
            Hover Effects
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
            <div className="hover-lift bg-bone-cream border-brutal p-lg">
              <p className="text-base text-center">Hover to lift</p>
            </div>
            <div className="bg-ember-orange border-brutal-sm p-lg hover:shadow-brutal transition-shadow">
              <p className="text-base text-center text-canvas-light">
                Hover for shadow
              </p>
            </div>
            <div className="blob-shape bg-toast-tan p-lg hover-lift">
              <p className="text-base text-center">Blob shape + lift</p>
            </div>
          </div>
        </div>
      </section>

      {/* Color Palette */}
      <section className="section-container py-4xl">
        <h2 className="text-display text-3xl mb-xl text-midnight">
          Brand Colors
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-md">
          <div className="text-center">
            <div className="w-full aspect-square bg-flame-brown border-brutal-sm mb-sm"></div>
            <p className="text-xs text-stone-gray">Flame Brown</p>
          </div>
          <div className="text-center">
            <div className="w-full aspect-square bg-fire-red border-brutal-sm mb-sm"></div>
            <p className="text-xs text-stone-gray">Fire Red</p>
          </div>
          <div className="text-center">
            <div className="w-full aspect-square bg-ember-orange border-brutal-sm mb-sm"></div>
            <p className="text-xs text-stone-gray">Ember Orange</p>
          </div>
          <div className="text-center">
            <div className="w-full aspect-square bg-salsa-red border-brutal-sm mb-sm"></div>
            <p className="text-xs text-stone-gray">Salsa Red</p>
          </div>
          <div className="text-center">
            <div className="w-full aspect-square bg-toast-tan border-brutal-sm mb-sm"></div>
            <p className="text-xs text-stone-gray">Toast Tan</p>
          </div>
          <div className="text-center">
            <div className="w-full aspect-square bg-bone-cream border-brutal-sm mb-sm"></div>
            <p className="text-xs text-stone-gray">Bone Cream</p>
          </div>
        </div>
      </section>
    </div>
  );
}

