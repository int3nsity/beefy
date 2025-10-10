import {useLoaderData, Link} from 'react-router';
import type {Route} from './+types/collections._index';
import {getPaginationVariables, Image} from '@shopify/hydrogen';
import type {CollectionFragment} from 'storefrontapi.generated';
import {PaginatedResourceSection} from '~/components/PaginatedResourceSection';

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
  const paginationVariables = getPaginationVariables(request, {
    pageBy: 4,
  });

  const [{collections}] = await Promise.all([
    context.storefront.query(COLLECTIONS_QUERY, {
      variables: paginationVariables,
    }),
    // Add other queries here, so that they are loaded in parallel
  ]);

  return {collections};
}

/**
 * Load data for rendering content below the fold. This data is deferred and will be
 * fetched after the initial page load. If it's unavailable, the page should still 200.
 * Make sure to not throw any errors here, as it will cause the page to 500.
 */
function loadDeferredData({context}: Route.LoaderArgs) {
  return {};
}

export default function Collections() {
  const {collections} = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-bone-cream via-canvas-light to-bone-cream py-5xl border-b-4 border-midnight overflow-hidden">
        {/* Background Texture */}
        <div className="absolute inset-0 texture-noise opacity-10"></div>

        {/* Decorative Elements */}
        <div className="absolute top-16 left-16 w-24 h-24 bg-ember-orange border-brutal-sm rounded-full animate-rotate-slow opacity-20"></div>
        <div
          className="absolute bottom-16 right-16 w-20 h-20 bg-fire-red border-brutal-sm rounded-full animate-rotate-slow opacity-20"
          style={{animationDirection: 'reverse', animationDuration: '25s'}}
        ></div>
        <div
          className="absolute top-1/2 left-8 w-12 h-12 bg-flame-brown border-brutal-sm rounded-full animate-rotate-slow opacity-15"
          style={{animationDuration: '35s'}}
        ></div>

        <div className="section-container relative z-10">
          {/* Main Content */}
          <div className="text-center mb-2xl">
            <h1 className="text-display text-6xl md:text-7xl lg:text-8xl xl:text-9xl text-fire-red mb-xl leading-tight">
              NUESTRAS COLECCIONES
            </h1>
            <div className="max-w-4xl mx-auto">
              <p className="text-2xl md:text-3xl text-charcoal font-medium leading-relaxed mb-lg">
                Descubre nuestra selección de productos cuidadosamente curados
              </p>
              <p className="text-lg md:text-xl text-stone-gray leading-relaxed">
                Cada colección está diseñada para ofrecerte una experiencia
                única, con productos seleccionados por su calidad excepcional y
                sabores extraordinarios
              </p>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl mb-2xl">
            <div className="text-center p-lg bg-canvas-light border-brutal-sm rounded-xl">
              <div className="text-4xl mb-md">🎯</div>
              <h3 className="text-display text-xl text-midnight mb-sm">
                CURADOS A MANO
              </h3>
              <p className="text-sm text-stone-gray">
                Cada producto seleccionado con cuidado
              </p>
            </div>
            <div className="text-center p-lg bg-canvas-light border-brutal-sm rounded-xl">
              <div className="text-4xl mb-md">🔥</div>
              <h3 className="text-display text-xl text-midnight mb-sm">
                SABORES ÚNICOS
              </h3>
              <p className="text-sm text-stone-gray">
                Experiencias gastronómicas inolvidables
              </p>
            </div>
            <div className="text-center p-lg bg-canvas-light border-brutal-sm rounded-xl">
              <div className="text-4xl mb-md">⭐</div>
              <h3 className="text-display text-xl text-midnight mb-sm">
                CALIDAD PREMIUM
              </h3>
              <p className="text-sm text-stone-gray">
                Solo los mejores ingredientes
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-lg">
            <button className="btn-primary text-lg px-2xl py-lg animate-wiggle">
              ¡Explorar Colecciones!
            </button>
            <div className="flex items-center gap-md text-stone-gray">
              <span className="text-sm font-medium">Más de 50 productos</span>
              <span className="w-2 h-2 bg-ember-orange rounded-full"></span>
              <span className="text-sm font-medium">Envío gratis</span>
              <span className="w-2 h-2 bg-ember-orange rounded-full"></span>
              <span className="text-sm font-medium">
                Satisfacción garantizada
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* Collections Grid Section */}
      <section className="section-container py-3xl">
        <PaginatedResourceSection<CollectionFragment>
          connection={collections}
          resourcesClassName="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-xl"
        >
          {({node: collection, index}) => (
            <CollectionItem
              key={collection.id}
              collection={collection}
              index={index}
            />
          )}
        </PaginatedResourceSection>

        {/* Empty State */}
        {collections.nodes.length === 0 && (
          <div className="text-center py-5xl">
            <div className="text-6xl mb-lg">📦</div>
            <h2 className="text-display text-3xl text-midnight mb-md">
              No hay colecciones disponibles
            </h2>
            <p className="text-lg text-stone-gray mb-xl">
              Pronto agregaremos nuevas colecciones
            </p>
          </div>
        )}
      </section>
    </div>
  );
}

function CollectionItem({
  collection,
  index,
}: {
  collection: CollectionFragment;
  index: number;
}) {
  return (
    <Link
      className="group block bg-canvas-light border-brutal-sm hover-lift rounded-xl overflow-hidden transition-all duration-300"
      key={collection.id}
      to={`/collections/${collection.handle}`}
      prefetch="intent"
    >
      {/* Image Container */}
      <div className="relative aspect-[4/3] overflow-hidden bg-bone-cream">
        {collection?.image && (
          <Image
            alt={collection.image.altText || collection.title}
            aspectRatio="4/3"
            data={collection.image}
            loading={index < 3 ? 'eager' : undefined}
            sizes="(min-width: 1024px) 400px, (min-width: 768px) 50vw, 100vw"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          />
        )}

        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-xl">
          <span className="btn-primary text-sm py-sm px-lg transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
            Explorar Colección
          </span>
        </div>
      </div>

      {/* Collection Info */}
      <div className="p-lg">
        <h3 className="text-display text-2xl text-midnight mb-sm group-hover:text-fire-red transition-colors duration-300">
          {collection.title}
        </h3>

        <p className="text-sm text-stone-gray">Ver productos →</p>
      </div>
    </Link>
  );
}

const COLLECTIONS_QUERY = `#graphql
  fragment Collection on Collection {
    id
    title
    handle
    image {
      id
      url
      altText
      width
      height
    }
  }
  query StoreCollections(
    $country: CountryCode
    $endCursor: String
    $first: Int
    $language: LanguageCode
    $last: Int
    $startCursor: String
  ) @inContext(country: $country, language: $language) {
    collections(
      first: $first,
      last: $last,
      before: $startCursor,
      after: $endCursor
    ) {
      nodes {
        ...Collection
      }
      pageInfo {
        hasNextPage
        hasPreviousPage
        startCursor
        endCursor
      }
    }
  }
` as const;
