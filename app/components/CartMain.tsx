import {useOptimisticCart} from '@shopify/hydrogen';
import {Link} from 'react-router';
import type {CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';
import {CartLineItem} from '~/components/CartLineItem';
import {CartSummary} from './CartSummary';

export type CartLayout = 'page' | 'aside';

export type CartMainProps = {
  cart: CartApiQueryFragment | null;
  layout: CartLayout;
};

/**
 * The main cart component that displays the cart items and summary.
 * It is used by both the /cart route and the cart aside dialog.
 */
export function CartMain({layout, cart: originalCart}: CartMainProps) {
  // The useOptimisticCart hook applies pending actions to the cart
  // so the user immediately sees feedback when they modify the cart.
  const cart = useOptimisticCart(originalCart);

  const linesCount = Boolean(cart?.lines?.nodes?.length || 0);
  const withDiscount =
    cart &&
    Boolean(cart?.discountCodes?.filter((code) => code.applicable)?.length);
  const className = `cart-main ${withDiscount ? 'with-discount' : ''}`;
  const cartHasItems = cart?.totalQuantity ? cart.totalQuantity > 0 : false;

  return (
    <div className={className}>
      <CartEmpty hidden={linesCount} layout={layout} />
      {cartHasItems && (
        <div className="cart-details">
          <div aria-labelledby="cart-lines" className="mb-xl">
            <h2 className="text-display text-2xl text-charcoal mb-lg px-md">
              {cart?.totalQuantity}{' '}
              {cart?.totalQuantity === 1 ? 'Producto' : 'Productos'}
            </h2>
            <ul className="px-md space-y-0">
              {(cart?.lines?.nodes ?? []).map((line) => (
                <CartLineItem key={line.id} line={line} layout={layout} />
              ))}
            </ul>
          </div>
          <div className="px-md">
            <CartSummary cart={cart} layout={layout} />
          </div>
        </div>
      )}
    </div>
  );
}

function CartEmpty({
  hidden = false,
}: {
  hidden: boolean;
  layout?: CartMainProps['layout'];
}) {
  const {close} = useAside();
  return (
    <div hidden={hidden} className="text-center py-xl">
      <div className="text-6xl mb-lg">🛒</div>
      <p className="text-xl text-charcoal mb-md">Tu carrito está vacío</p>
      <p className="text-base text-stone-gray mb-xl">
        ¡Descubrí nuestros deliciosos productos!
      </p>
      <Link
        to="/collections"
        onClick={close}
        prefetch="viewport"
        className="btn-primary inline-block"
      >
        Ver Productos
      </Link>
    </div>
  );
}
