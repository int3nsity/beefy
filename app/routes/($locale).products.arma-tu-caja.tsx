import {useLoaderData} from 'react-router';
import type {Route} from './+types/products.arma-tu-caja';
import {BundleBuilder} from '~/components/BundleBuilder';
import {Analytics} from '@shopify/hydrogen';

export const meta: Route.MetaFunction = ({data}) => {
  return [
    {title: `Beefy | Armá tu Caja de 7 Unidades`},
    {
      name: 'description',
      content:
        'Creá tu caja perfecta eligiendo 7 unidades de tus sabores favoritos de Beefy. ¡Personalizá tu experiencia!',
    },
    {
      rel: 'canonical',
      href: '/products/arma-tu-caja',
    },
  ];
};

export async function loader(args: Route.LoaderArgs) {
  const criticalData = await loadCriticalData(args);
  return criticalData;
}

async function loadCriticalData({context}: Route.LoaderArgs) {
  const {storefront} = context;

  // Intentar varios handles posibles para el producto bundle
  const possibleHandles = [
    'a-la-chilena-merken-power-copy', // Tu producto actual en Shopify
    'arma-tu-caja-7-un',
    'arma-tu-caja',
    'caja-7-unidades',
    'caja-de-7',
    'pack-7',
    'box-7',
  ];

  let bundleProduct = null;
  let usedHandle = '';

  // Intentar cada handle hasta encontrar uno que funcione
  for (const handle of possibleHandles) {
    try {
      const result = await storefront.query(BUNDLE_PRODUCT_QUERY, {
        variables: {handle},
      });
      if (result.product?.id) {
        bundleProduct = result.product;
        usedHandle = handle;
        console.log('✅ Producto bundle encontrado con handle:', usedHandle);
        break;
      }
    } catch (e) {
      // Continuar con el siguiente handle
      continue;
    }
  }

  // Si no se encuentra el producto, listar todos los productos disponibles
  if (!bundleProduct) {
    try {
      const allProductsResult = await storefront.query(ALL_PRODUCTS_QUERY, {
        variables: {first: 50},
      });

      const productsList =
        allProductsResult.products?.nodes
          ?.map((p: any) => `  • "${p.title}" → handle: "${p.handle}"`)
          .join('\n') || 'No hay productos disponibles';

      throw new Response(
        `❌ Producto bundle no encontrado.\n\n` +
          `Handles probados:\n${possibleHandles.map((h) => `  • ${h}`).join('\n')}\n\n` +
          `📦 Productos disponibles en tu tienda:\n${productsList}\n\n` +
          `✏️ Solución: Crea el producto "Arma tu caja (7 un)" en Shopify\n` +
          `O actualiza el handle en: app/routes/($locale).products.arma-tu-caja.tsx (línea 33)`,
        {status: 404, headers: {'Content-Type': 'text/plain; charset=utf-8'}},
      );
    } catch (error) {
      if (error instanceof Response) throw error;
      throw new Response('Error al cargar productos', {status: 500});
    }
  }

  // Obtener TODOS los productos de la tienda como sabores disponibles
  const allProductsResult = await storefront.query(ALL_FLAVORS_QUERY, {
    variables: {
      first: 50, // Ajusta según cuántos productos tengas
    },
  });

  // Filtrar el producto bundle de la lista de sabores
  const availableFlavors =
    allProductsResult.products?.nodes?.filter(
      (product: any) => product.id !== bundleProduct.id,
    ) || [];

  console.log(
    `✅ ${availableFlavors.length} sabores disponibles para el bundle`,
  );

  return {
    bundleProduct,
    availableFlavors,
  };
}

export default function ArmaTuCaja() {
  const {bundleProduct, availableFlavors} = useLoaderData<typeof loader>();

  return (
    <div className="min-h-screen bg-canvas-light mt-2xl">
      {/* Bundle Builder Section */}
      <section className="section-container pb-5xl mb-2xl">
        <BundleBuilder
          bundleProduct={bundleProduct}
          availableFlavors={availableFlavors}
          bundleSize={7}
        />
      </section>

      {/* Info Section */}
      <section className="bg-bone-cream border-t-3 border-midnight py-3xl">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-xl">
            <div className="text-center p-lg">
              <div className="text-5xl mb-md">🎯</div>
              <h3 className="text-display text-2xl text-midnight mb-sm">
                Personalizá
              </h3>
              <p className="text-base text-charcoal">
                Elegí exactamente los sabores que te gustan
              </p>
            </div>

            <div className="text-center p-lg">
              <div className="text-5xl mb-md">💰</div>
              <h3 className="text-display text-2xl text-midnight mb-sm">
                Ahorrá
              </h3>
              <p className="text-base text-charcoal">
                Mejor precio comprando en pack de 7 unidades
              </p>
            </div>

            <div className="text-center p-lg">
              <div className="text-5xl mb-md">🚀</div>
              <h3 className="text-display text-2xl text-midnight mb-sm">
                Disfrutá
              </h3>
              <p className="text-base text-charcoal">
                Recibí tu caja personalizada en tu casa
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Analytics */}
      <Analytics.ProductView
        data={{
          products: [
            {
              id: bundleProduct.id,
              title: bundleProduct.title,
              price: bundleProduct.priceRange?.minVariantPrice?.amount || '0',
              vendor: bundleProduct.vendor,
              variantId: bundleProduct.id,
              variantTitle: bundleProduct.title,
              quantity: 1,
            },
          ],
        }}
      />
    </div>
  );
}

// Query para listar todos los productos (debug)
const ALL_PRODUCTS_QUERY = `#graphql
  query AllProducts($first: Int!) {
    products(first: $first) {
      nodes {
        id
        title
        handle
      }
    }
  }
` as const;

// Query para obtener el producto bundle
const BUNDLE_PRODUCT_QUERY = `#graphql
  query BundleProduct(
    $handle: String!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    product(handle: $handle) {
      id
      title
      handle
      description
      descriptionHtml
      vendor
      priceRange {
        minVariantPrice {
          amount
          currencyCode
        }
        maxVariantPrice {
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
  }
` as const;

// Query para obtener TODOS los productos como sabores disponibles
const ALL_FLAVORS_QUERY = `#graphql
  fragment FlavorProduct on Product {
    id
    handle
    title
    vendor
    featuredImage {
      id
      url
      altText
      width
      height
    }
    priceRange {
      minVariantPrice {
        amount
        currencyCode
      }
      maxVariantPrice {
        amount
        currencyCode
      }
    }
    variants(first: 1) {
      nodes {
        id
        title
        availableForSale
        quantityAvailable
        price {
          amount
          currencyCode
        }
      }
    }
  }

  query AllFlavors(
    $first: Int!
    $country: CountryCode
    $language: LanguageCode
  ) @inContext(country: $country, language: $language) {
    products(first: $first) {
      nodes {
        ...FlavorProduct
      }
    }
  }
` as const;
