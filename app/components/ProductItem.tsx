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
    <div className="product-card bg-canvas-light overflow-hidden">
      <Link
        key={product.id}
        prefetch="intent"
        to={variantUrl}
        className="block"
      >
        {/* Image Container - Square aspect ratio */}
        <div className="relative aspect-square overflow-hidden">
          {image && (
            <Image
              alt={image.altText || product.title}
              data={image}
              loading={loading}
              sizes="(min-width: 45em) 300px, 200px"
              className="w-full h-full object-cover"
            />
          )}

          {/* BEST SELLER Badge - Top Right */}
          {hasTag('bestseller') && (
            <div className="absolute top-sm right-sm">
              <span className="badge bg-fire-red text-xs font-bold text-canvas-light">
                BEST SELLER
              </span>
            </div>
          )}
        </div>

        {/* Product Info */}
        <div>
          <h4 className="text-display text-lg mb-sm text-midnight font-bold line-clamp-2 leading-tight">
            {product.title}
          </h4>

          {/* Price */}
          <div className="text-midnight font-bold text-base">
            <Money data={product.priceRange.minVariantPrice} />
          </div>
        </div>
      </Link>
    </div>
  );
}
