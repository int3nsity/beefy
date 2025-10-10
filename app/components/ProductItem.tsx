import {Link} from 'react-router';
import {Image, Money} from '@shopify/hydrogen';
import type {
  ProductItemFragment,
  CollectionItemFragment,
  RecommendedProductFragment,
} from 'storefrontapi.generated';
import {useVariantUrl} from '~/lib/variants';

export function ProductItem({
  product,
  loading,
}: {
  product:
    | CollectionItemFragment
    | ProductItemFragment
    | RecommendedProductFragment;
  loading?: 'eager' | 'lazy';
}) {
  const variantUrl = useVariantUrl(product.handle);
  const image = product.featuredImage;

  // Check for tags to display badges
  const hasTag = (tag: string) => {
    return 'tags' in product && product.tags?.includes(tag);
  };

  return (
    <div className="product-card hover-lift group bg-canvas-light border-brutal-sm rounded-xl overflow-hidden">
      <Link
        key={product.id}
        prefetch="intent"
        to={variantUrl}
        className="block"
      >
        {/* Image Container - Smaller and more elegant */}
        <div className="relative aspect-[4/3] overflow-hidden">
          {image && (
            <Image
              alt={image.altText || product.title}
              data={image}
              loading={loading}
              sizes="(min-width: 45em) 300px, 200px"
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            />
          )}

          {/* Badges */}
          <div className="absolute top-sm left-sm flex flex-col gap-xs">
            {hasTag('new') && (
              <span className="badge bg-ember-orange text-xs">¡Nuevo!</span>
            )}
            {hasTag('sale') && (
              <span className="badge bg-salsa-red text-xs">¡Oferta!</span>
            )}
          </div>

          {/* Hover overlay with elegant animation */}
          <div className="absolute inset-0 bg-gradient-to-t from-midnight/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-end justify-center pb-lg">
            <span className="btn-primary text-sm py-sm px-md transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300">
              Ver Producto
            </span>
          </div>
        </div>

        {/* Product Info */}
        <div className="p-lg">
          <h4 className="text-display text-lg mb-sm text-midnight line-clamp-2 leading-tight">
            {product.title}
          </h4>

          {/* Price with better styling */}
          <div className="flex items-center justify-between">
            <div className="text-ember-orange font-bold text-xl">
              <Money data={product.priceRange.minVariantPrice} />
            </div>

            {/* Stock indicator */}
            <div className="text-xs text-stone-gray">
              {product.availableForSale ? (
                <span className="flex items-center gap-xs">
                  <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                  Disponible
                </span>
              ) : (
                <span className="flex items-center gap-xs text-salsa-red">
                  <span className="w-2 h-2 bg-salsa-red rounded-full"></span>
                  Agotado
                </span>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
