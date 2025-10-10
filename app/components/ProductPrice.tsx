import {Money} from '@shopify/hydrogen';
import type {MoneyV2} from '@shopify/hydrogen/storefront-api-types';

export function ProductPrice({
  price,
  compareAtPrice,
}: {
  price?: MoneyV2;
  compareAtPrice?: MoneyV2 | null;
}) {
  return (
    <div className="product-price font-semibold">
      {compareAtPrice ? (
        <div className="product-price-on-sale flex items-center gap-sm">
          {price ? (
            <span className="text-lg text-ember-orange">
              <Money data={price} />
            </span>
          ) : null}
          <s className="text-sm text-stone-gray">
            <Money data={compareAtPrice} />
          </s>
        </div>
      ) : price ? (
        <span className="text-lg text-charcoal">
          <Money data={price} />
        </span>
      ) : (
        <span>&nbsp;</span>
      )}
    </div>
  );
}
