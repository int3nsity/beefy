import type {Route} from './+types/collections.all';
import {useLoaderData} from 'react-router';
import {getPaginationVariables, Image, Money} from '@shopify/hydrogen';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';
import {ProductItem} from '~/components/ProductItem';
import type {CollectionItemFragment} from 'storefrontapi.generated';

export const meta: Route.MetaFunction = () => {
  return [{title: `Hydrogen | Products`}];
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
async function loadCriticalData({context, request}: Route.LoaderArgs) {
  const {storefront} = context;
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 8,
  });

  const [{products}] = await Promise.all([
    storefront.query(CATALOG_QUERY, {
      variables: {...paginationVariables},
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);
  return {products};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Collection() {
  const {products} = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-bone-cream via-canvas-light to-bone-cream py-5xl border-b-4 border-midnight overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 texture-noise opacity-10"></div>

        {/* Decorative Elements */}
        <div className="absolute top-10 left-10 w-20 h-20 bg-ember-orange border-brutal-sm rounded-full animate-rotate-slow opacity-20"></div>
        <div
          className="absolute bottom-20 right-20 w-16 h-16 bg-fire-red border-brutal-sm rounded-full animate-rotate-slow opacity-20"
          style={{animationDirection: 'reverse', animationDuration: '30s'}}
        ></div>

        <div className="section-container relative z-10">
          {/* Main Content */}
          <div className="text-center mb-2xl">
            <h1 className="text-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-fire-red mb-xl leading-tight">
              TODOS LOS PRODUCTOS
            </h1>
            <div className="mx-auto">
              <p className="text-2xl md:text-3xl lg:text-4xl text-charcoal font-medium leading-relaxed mb-2xl">
                Explora toda nuestra gama de productos premium
              </p>
              <p className="text-xl md:text-2xl text-stone-gray leading-relaxed mb-3xl">
                Descubre sabores únicos, ingredientes de la más alta calidad y
                experiencias gastronómicas que deleitarán tu paladar
              </p>
            </div>
          </div>

          {/* Feature highlights */}
          <div className="flex flex-wrap items-center justify-center gap-lg text-stone-gray mb-2xl">
            <span className="text-base font-medium">Productos frescos</span>
            <span className="w-2 h-2 bg-ember-orange rounded-full"></span>
            <span className="text-base font-medium">Envío rápido</span>
            <span className="w-2 h-2 bg-ember-orange rounded-full"></span>
            <span className="text-base font-medium">Calidad premium</span>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="section-container py-3xl">
        {/* Product Count */}
        <div className="mb-2xl pb-lg border-b-2 border-stone-gray">
          <p className="text-lg text-stone-gray text-center">
            <span className="font-bold text-charcoal text-xl">
              {products.nodes.length}
            </span>{' '}
            productos encontrados
          </p>
        </div>

        {/* Products Grid */}
        <PaginatedResourceSection<CollectionItemFragment>
          connection={products}
          resourcesClassName="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-xl"
        >
          {({node: product, index}) => (
            <ProductItem
              key={product.id}
              product={product}
              loading={index < 8 ? 'eager' : undefined}
            />
          )}
        </PaginatedResourceSection>

        {/* Empty State */}
        {products.nodes.length === 0 && (
          <div className="text-center py-5xl">
            <div className="text-6xl mb-lg">📦</div>
            <h2 className="text-display text-3xl text-midnight mb-md">
              No hay productos disponibles
            </h2>
            <p className="text-lg text-stone-gray mb-xl">
              Pronto agregaremos nuevos productos
            </p>
            <a href="/collections" className="btn-primary">
              Ver Colecciones
            </a>
          </div>
        )}
      </section>
    </div>
  );
}

const COLLECTION_ITEM_FRAGMENT = `#graphql
  fragment MoneyCollectionItem on MoneyV2 {
    amount
    currencyCode
  }
  fragment CollectionItem on Product {
    id
    handle
    title
    featuredImage {
      id
      altText
      url
      width
      height
    }
    priceRange {
      minVariantPrice {
        ...MoneyCollectionItem
      }
      maxVariantPrice {
        ...MoneyCollectionItem
      }
    }
  }
` as const;

// NOTE: https://shopify.dev/docs/api/storefront/latest/objects/product
const CATALOG_QUERY = `#graphql
  query Catalog(
    $country: CountryCode
    $language: LanguageCode
    $first: Int
    $last: Int
    $startCursor: String
    $endCursor: String
  ) @inContext(country: $country, language: $language) {
    products(first: $first, last: $last, before: $startCursor, after: $endCursor) {
      nodes {
        ...CollectionItem
      }
      pageInfo {
        hasPreviousPage
        hasNextPage
        startCursor
        endCursor
      }
    }
  }
  ${COLLECTION_ITEM_FRAGMENT}
` as const;
