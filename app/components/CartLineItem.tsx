import type {CartLineUpdateInput} from '@shopify/hydrogen/storefront-api-types';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Image, type OptimisticCartLine} from '@shopify/hydrogen';
import {useVariantUrl} from '~/lib/variants';
import {Link} from 'react-router';
import {ProductPrice} from './ProductPrice';
import {useAside} from './Aside';
import type {CartApiQueryFragment} from 'storefrontapi.generated';

type CartLine = OptimisticCartLine<CartApiQueryFragment>;

/**
 * A single line item in the cart. It displays the product image, title, price.
 * It also provides controls to update the quantity or remove the line item.
 */
export function CartLineItem({
  layout,
  line,
}: {
  layout: CartLayout;
  line: CartLine;
}) {
  const {id, merchandise, attributes} = line;
  const {product, title, image, selectedOptions} = merchandise;
  const lineItemUrl = useVariantUrl(product.handle, selectedOptions);
  const {close} = useAside();

  // Detectar si es parte de un bundle
  const bundleAttribute = attributes?.find((attr) => attr.key === '_bundle');
  const isPartOfBundle = !!bundleAttribute;

  return (
    <li
      key={id}
      className={`cart-line border-b border-stone-gray/20 pb-lg mb-lg last:border-b-0 p-md rounded-md ${
        isPartOfBundle
          ? 'bg-fire-red/5 border-2 border-fire-red/30'
          : 'bg-canvas-light'
      }`}
    >
      <div className="flex gap-md min-w-0">
        {image && (
          <div className="flex-shrink-0 relative">
            <Image
              alt={title}
              aspectRatio="1/1"
              data={image}
              height={100}
              loading="lazy"
              width={100}
              className="rounded-md border-2 border-midnight"
            />
            {isPartOfBundle && (
              <div className="absolute -top-2 -right-2 bg-fire-red text-canvas-light text-xs font-bold px-2 py-1 rounded-full shadow-brutal-xs">
                📦
              </div>
            )}
          </div>
        )}

        <div className="flex-1 flex flex-col justify-between min-w-0">
          <div className="min-w-0">
            {isPartOfBundle && (
              <div className="mb-xs">
                <span className="inline-block bg-fire-red text-canvas-light text-xs font-bold px-sm py-xs rounded-md">
                  🥩 {bundleAttribute.value}
                </span>
              </div>
            )}
            <Link
              prefetch="intent"
              to={lineItemUrl}
              onClick={() => {
                if (layout === 'aside') {
                  close();
                }
              }}
              className="hover:text-fire-red transition-colors block cursor-pointer"
            >
              <h3 className="text-display text-lg text-charcoal mb-xs break-words">
                {product.title}
              </h3>
            </Link>

            <div className="mb-sm">
              <ProductPrice price={line?.cost?.totalAmount} />
            </div>

            {selectedOptions.length > 0 && (
              <ul className="flex flex-wrap gap-xs mb-sm">
                {selectedOptions.map((option) => (
                  <li key={option.name} className="flex-shrink-0">
                    <span className="text-xs bg-bone-cream text-charcoal px-sm py-xs rounded-sm border border-stone-gray/30 inline-block">
                      {option.name}: {option.value}
                    </span>
                  </li>
                ))}
              </ul>
            )}
          </div>

          <div className="mt-sm">
            <CartLineQuantity line={line} />
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * Provides the controls to update the quantity of a line item in the cart.
 * These controls are disabled when the line item is new, and the server
 * hasn't yet responded that it was successfully added to the cart.
 */
function CartLineQuantity({line}: {line: CartLine}) {
  if (!line || typeof line?.quantity === 'undefined') return null;
  const {id: lineId, quantity, isOptimistic} = line;
  const prevQuantity = Number(Math.max(0, quantity - 1).toFixed(0));
  const nextQuantity = Number((quantity + 1).toFixed(0));

  return (
    <div className="flex items-center gap-xs w-full">
      <div className="flex items-center gap-sm flex-shrink-0">
        <span className="text-sm text-stone-gray">Cantidad:</span>
        <div className="flex items-center border-2 border-midnight rounded-sm bg-canvas-light">
          <CartLineUpdateButton lines={[{id: lineId, quantity: prevQuantity}]}>
            <button
              aria-label="Disminuir cantidad"
              disabled={quantity <= 1 || !!isOptimistic}
              name="decrease-quantity"
              value={prevQuantity}
              className="px-sm py-xs text-charcoal hover:bg-bone-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-bold text-lg"
            >
              −
            </button>
          </CartLineUpdateButton>

          <span className="px-md py-xs font-semibold text-charcoal min-w-[2rem] text-center border-x-2 border-midnight">
            {quantity}
          </span>

          <CartLineUpdateButton lines={[{id: lineId, quantity: nextQuantity}]}>
            <button
              aria-label="Aumentar cantidad"
              name="increase-quantity"
              value={nextQuantity}
              disabled={!!isOptimistic}
              className="px-sm py-xs text-charcoal hover:bg-bone-cream transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer font-bold text-lg"
            >
              +
            </button>
          </CartLineUpdateButton>
        </div>
      </div>

      <div className="flex-shrink-0">
        <CartLineRemoveButton lineIds={[lineId]} disabled={!!isOptimistic} />
      </div>
    </div>
  );
}

/**
 * A button that removes a line item from the cart. It is disabled
 * when the line item is new, and the server hasn't yet responded
 * that it was successfully added to the cart.
 */
function CartLineRemoveButton({
  lineIds,
  disabled,
}: {
  lineIds: string[];
  disabled: boolean;
}) {
  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesRemove}
      inputs={{lineIds}}
    >
      <button
        disabled={disabled}
        type="submit"
        className="text-error hover:text-salsa-red transition-colors disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer p-xs rounded-md hover:bg-error/10"
        aria-label="Eliminar producto"
      >
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-4 h-4"
        >
          <path d="M18 6L6 18M6 6l12 12" />
        </svg>
      </button>
    </CartForm>
  );
}

function CartLineUpdateButton({
  children,
  lines,
}: {
  children: React.ReactNode;
  lines: CartLineUpdateInput[];
}) {
  const lineIds = lines.map((line) => line.id);

  return (
    <CartForm
      fetcherKey={getUpdateKey(lineIds)}
      route="/cart"
      action={CartForm.ACTIONS.LinesUpdate}
      inputs={{lines}}
    >
      {children}
    </CartForm>
  );
}

/**
 * Returns a unique key for the update action. This is used to make sure actions modifying the same line
 * items are not run concurrently, but cancel each other. For example, if the user clicks "Increase quantity"
 * and "Decrease quantity" in rapid succession, the actions will cancel each other and only the last one will run.
 * @param lineIds - line ids affected by the update
 * @returns
 */
function getUpdateKey(lineIds: string[]) {
  return [CartForm.ACTIONS.LinesUpdate, ...lineIds].join('-');
}
