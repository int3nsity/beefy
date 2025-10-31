import {Await, useLoaderData, Link} from 'react-router';
import type {Route} from './+types/_index';
import {Suspense, useState} from 'react';
import {Image} from '@shopify/hydrogen';
import type {
  FeaturedCollectionFragment,
  RecommendedProductsQuery,
} from 'storefrontapi.generated';
import {ProductItem} from '~/components/ProductItem';
import heroBackground from '~/assets/hero-background.png';
import triobeefy from '~/assets/triobeefy.png';
import vacaBeefy from '~/assets/vaca-beefy.svg';
import musleBeefy from '~/assets/musle-beefy.svg';
import manoBeefy from '~/assets/mano-beefy.svg';
import montanaBeefy from '~/assets/montana-beefy.svg';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Beefy - Auténtico Charqui Argentino | Snacks Naturales'}];
};

export async function loader(args: Route.LoaderArgs) {
  // Start fetching non-critical data without blocking time to first byte
  const deferredData = loadDeferredData(args);

  // Await the critical data required to render initial state of the page
  const criticalData = await loadCriticalData(args);

  return {...deferredData, ...criticalData};
}

/**
 * Load data necessary for rendering content above the fold. This is the critical data
 * needed to render the page. If it's unavailable, the whole page should 400 or 500 error.
 */
async function loadCriticalData({context}: Route.LoaderArgs) {
  const [{collections}] = await Promise.all([
    context.storefront.query(FEATURED_COLLECTION_QUERY),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {
    featuredCollection: collections.nodes[0],
  };
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  const recommendedProducts = context.storefront
    .query(RECOMMENDED_PRODUCTS_QUERY)
    .catch((error: Error) => {
      // Log query errors, but don't throw them so the page can still render
      console.error(error);
      return null;
    });

  return {
    recommendedProducts,
  };
}

export default function Homepage() {
  const data = useLoaderData<typeof loader>();
  return (
    <div className="home">
      <HeroSection />
      <ProductShowcaseSection />
      {/* <TrustBadges /> */}
      <FeaturedProducts products={data.recommendedProducts} />
      {/* <SocialProof /> */}
      {/* <CTABanner /> */}
      <FeaturedCollection collection={data.featuredCollection} />
    </div>
  );
}

function HeroSection() {
  return (
    <section className="relative">
      {/* Background Image */}
      <img
        src={heroBackground}
        alt="Beefy Snacks - Authentic Chilean Charqui"
        className="w-full h-auto block"
      />

      {/* Button at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 flex items-end justify-center pb-xl">
        <Link
          to="/collections"
          className="text-display bg-fire-red text-harvest-gold font-bold text-3xl px-lg py-sm hover:bg-salsa-red transition-colors"
          style={{borderRadius: '12px', boxShadow: '3px 3px 0px #000000'}}
        >
          VER PRODUCTOS
        </Link>
      </div>
    </section>
  );
}

function ProductShowcaseSection() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const totalSlides = 3; // For the carousel dots

  const features = [
    {
      icon: vacaBeefy,
      label: 'Vacuno natural',
      alt: 'Icono de vaca - Producto vacuno natural',
    },
    {
      icon: musleBeefy,
      label: 'Alto en proteína',
      alt: 'Icono de músculo - Alto en proteína',
    },
    {
      icon: manoBeefy,
      label: 'Snack funcional',
      alt: 'Icono de puño - Snack funcional',
    },
    {
      icon: montanaBeefy,
      label: 'Producto nacional',
      alt: 'Icono de montañas - Producto nacional',
    },
  ];

  return (
    <section className="bg-canvas-light py-5xl">
      <div className="section-container">
        {/* Product Image Carousel */}
        <div className="mb-3xl px-xl md:px-3xl">
          <img
            src={triobeefy}
            alt="Productos Beefy - Beef Jerky Argentino"
            className="w-full h-auto block"
          />

          {/* Carousel Dots */}
          <div className="flex justify-center gap-sm mt-lg">
            {[...Array(totalSlides)].map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  currentSlide === index ? 'bg-midnight' : 'bg-stone-gray'
                }`}
                aria-label={`Ir a imagen ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* Feature Cards Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-lg">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex flex-col items-center text-center p-lg"
            >
              <div className="w-24 h-24 mb-md flex items-center justify-center">
                <img
                  src={feature.icon}
                  alt={feature.alt}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-display text-base text-midnight">
                {feature.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TrustBadges() {
  return (
    <section className="bg-canvas-light">
      <div className="section-container">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
          <div className="border-brutal-sm bg-bone-cream p-2xl text-center hover-lift">
            <div className="text-5xl mb-md">🚚</div>
            <h3 className="text-display text-xl text-midnight mb-sm">
              ENVÍO GRATIS
            </h3>
            <p className="text-base text-stone-gray">
              En compras superiores a $15.000
            </p>
          </div>

          <div className="border-brutal-sm bg-bone-cream p-2xl text-center hover-lift">
            <div className="text-5xl mb-md">🌿</div>
            <h3 className="text-display text-xl text-midnight mb-sm">
              100% NATURAL
            </h3>
            <p className="text-base text-stone-gray">
              Sin conservantes ni aditivos artificiales
            </p>
          </div>

          <div className="border-brutal-sm bg-bone-cream p-2xl text-center hover-lift">
            <div className="text-5xl mb-md">✋</div>
            <h3 className="text-display text-xl text-midnight mb-sm">
              HECHO A MANO
            </h3>
            <p className="text-base text-stone-gray">
              Proceso artesanal tradicional chileno
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function SocialProof() {
  return (
    <section className="bg-bone-cream">
      <div className="section-container">
        <div className="text-center mb-3xl">
          <h2 className="text-display text-4xl text-midnight mb-md">
            LO QUE DICEN NUESTROS CLIENTES
          </h2>
          <p className="text-xl text-charcoal mb-sm">
            Más de 10,000 clientes satisfechos en toda Chile
          </p>
          <div className="flex justify-center gap-xs text-3xl mb-md">
            ⭐⭐⭐⭐⭐
          </div>
          <p className="text-lg text-stone-gray">
            4.9/5 basado en 1,247 reseñas
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
          <div className="bg-canvas-light p-xl rounded-lg border-brutal-sm hover-lift">
            <div className="flex gap-xs text-xl mb-md">⭐⭐⭐⭐⭐</div>
            <p className="text-base text-charcoal mb-md italic">
              "El mejor jerky que probé en mi vida. Sabor auténtico y calidad
              premium. Ya voy por mi tercera compra!"
            </p>
            <p className="text-sm font-bold text-midnight">- María González</p>
            <p className="text-xs text-stone-gray">Santiago</p>
          </div>

          <div className="bg-canvas-light p-xl rounded-lg border-brutal-sm hover-lift">
            <div className="flex gap-xs text-xl mb-md">⭐⭐⭐⭐⭐</div>
            <p className="text-base text-charcoal mb-md italic">
              "Perfecto para mis entrenamientos. Alto en proteínas, sin
              porquerías. Y el sabor picante es increíble!"
            </p>
            <p className="text-sm font-bold text-midnight">- Carlos Ruiz</p>
            <p className="text-xs text-stone-gray">Valparaíso</p>
          </div>

          <div className="bg-canvas-light p-xl rounded-lg border-brutal-sm hover-lift">
            <div className="flex gap-xs text-xl mb-md">⭐⭐⭐⭐⭐</div>
            <p className="text-base text-charcoal mb-md italic">
              "Envío rápido y producto excelente. Se nota que es artesanal. Lo
              recomiendo 100%."
            </p>
            <p className="text-sm font-bold text-midnight">- Laura Fernández</p>
            <p className="text-xs text-stone-gray">Concepción</p>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTABanner() {
  return (
    <section>
      <div className="section-container">
        <div className="bg-gradient-to-r from-fire-red to-ember-orange text-canvas-light p-4xl rounded-2xl border-brutal text-center relative overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-4 left-4 text-6xl">🥩</div>
            <div className="absolute bottom-4 right-4 text-4xl">🔥</div>
            <div className="absolute top-1/2 left-1/4 text-3xl">⭐</div>
          </div>

          {/* Content */}
          <div className="relative z-10">
            <div className="inline-block bg-midnight px-lg py-sm rounded-md mb-lg">
              <span className="text-accent font-bold text-lg">
                ¡OFERTA ESPECIAL!
              </span>
            </div>

            <h2 className="text-display text-4xl md:text-6xl mb-md leading-tight">
              25% OFF
            </h2>
            <h3 className="text-display text-2xl md:text-3xl mb-lg text-canvas-light">
              EN TU PRIMER PEDIDO
            </h3>

            <p className="text-xl md:text-2xl mb-lg font-bold">
              ¡No te lo pierdas!
            </p>

            <div className="bg-midnight p-lg rounded-xl border-brutal-sm inline-block mb-xl">
              <p className="text-lg mb-sm">Usa el código</p>
              <div className="text-3xl font-bold text-ember-orange mb-sm">
                BEEFY25
              </div>
              <p className="text-sm">en tu primera compra</p>
            </div>

            <Link
              to="/collections"
              className="btn-primary bg-midnight border-brutal-sm text-lg px-3xl py-lg hover-lift"
            >
              COMPRAR AHORA
            </Link>

            <div className="mt-xl text-sm opacity-90 space-y-xs">
              <p>✓ Válido solo para nuevos clientes</p>
              <p>✓ Compra mínima $10.000</p>
              <p>✓ Válido hasta agotar stock</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FeaturedCollection({
  collection,
}: {
  collection: FeaturedCollectionFragment;
}) {
  if (!collection) return null;
  const image = collection?.image;
  return (
    <section className="bg-canvas-light">
      <div className="section-container">
        <Link
          className="block hover-lift"
          to={`/collections/${collection.handle}`}
        >
          <div className="relative rounded-xl overflow-hidden border-brutal">
            {image && (
              <div className="relative aspect-[16/9]">
                <Image
                  data={image}
                  sizes="100vw"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 to-transparent" />
              </div>
            )}
            <div className="absolute bottom-0 left-0 right-0 p-3xl">
              <h2 className="text-display text-4xl md:text-5xl text-canvas-light mb-md">
                {collection.title}
              </h2>
              <button className="btn-primary">Explorar Colección</button>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}

function FeaturedProducts({
  products,
}: {
  products: Promise<RecommendedProductsQuery | null>;
}) {
  return (
    <section className="py-5xl">
      <div className="section-container">
        <div className="mb-3xl">
          <h2 className="text-display text-5xl md:text-6xl text-fire-red leading-tight">
            SNACKS
          </h2>
        </div>
      <Suspense
        fallback={
          <div className="text-center text-lg">Cargando productos...</div>
        }
      >
        <Await resolve={products}>
          {(response) => (
            <>
              {response && response.products.nodes.length > 0 ? (
                <div className="grid grid-cols-2 lg:grid-cols-4 gap-xl mb-2xl">
                  {response.products.nodes.map((product) => (
                    <ProductItem
                      key={product.id}
                      product={product}
                      loading="eager"
                    />
                  ))}
                </div>
              ) : (
                <p className="text-center text-lg text-stone-gray">
                  No hay productos disponibles en este momento.
                </p>
              )}
              <div className="text-center">
                <Link to="/collections" className="btn-primary">
                  Ver Todos los Productos
                </Link>
              </div>
            </>
          )}
        </Await>
      </Suspense>
      </div>
    </section>
  );
}

const FEATURED_COLLECTION_QUERY = `#graphql
  fragment FeaturedCollection on Collection {
    id
    title
    image {
      id
      url
      altText
      width
      height
    }
    handle
  }
  query FeaturedCollection($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    collections(first: 1, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...FeaturedCollection
      }
    }
  }
` as const;

const RECOMMENDED_PRODUCTS_QUERY = `#graphql
  fragment RecommendedProduct on Product {
    id
    title
    handle
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
    }
    featuredImage {
      id
      url
      altText
      width
      height
    }
  }
  query RecommendedProducts ($country: CountryCode, $language: LanguageCode)
    @inContext(country: $country, language: $language) {
    products(first: 4, sortKey: UPDATED_AT, reverse: true) {
      nodes {
        ...RecommendedProduct
      }
    }
  }
` as const;
