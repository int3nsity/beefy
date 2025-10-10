import type {CartApiQueryFragment} from 'storefrontapi.generated';
import type {CartLayout} from '~/components/CartMain';
import {CartForm, Money, type OptimisticCart} from '@shopify/hydrogen';
import {useEffect, useRef} from 'react';
import {useFetcher} from 'react-router';
import type {FetcherWithComponents} from 'react-router';

type CartSummaryProps = {
  cart: OptimisticCart<CartApiQueryFragment | null>;
  layout: CartLayout;
};

export function CartSummary({cart, layout}: CartSummaryProps) {
  const className =
    layout === 'page' ? 'cart-summary-page' : 'cart-summary-aside';

  return (
    <div
      aria-labelledby="cart-summary"
      className={`${className} bg-bone-cream p-lg rounded-md border-2 border-midnight mt-xl`}
    >
      <h4 className="text-display text-2xl text-charcoal mb-lg">
        Resumen del Pedido
      </h4>

      <dl className="cart-subtotal flex justify-between items-center mb-md pb-md border-b border-stone-gray/30">
        <dt className="text-base text-charcoal">Subtotal</dt>
        <dd className="text-xl font-bold text-charcoal">
          {cart?.cost?.subtotalAmount?.amount ? (
            <Money data={cart?.cost?.subtotalAmount} />
          ) : (
            '-'
          )}
        </dd>
      </dl>

      <CartDiscounts discountCodes={cart?.discountCodes} />
      <CartGiftCard giftCardCodes={cart?.appliedGiftCards} />
      <CartCheckoutActions checkoutUrl={cart?.checkoutUrl} />
    </div>
  );
}

function CartCheckoutActions({checkoutUrl}: {checkoutUrl?: string}) {
  if (!checkoutUrl) return null;

  return (
    <div className="mt-lg">
      <a
        href={checkoutUrl}
        target="_self"
        className="btn-primary w-full text-center block"
      >
        Finalizar Compra →
      </a>
      <p className="text-xs text-stone-gray text-center mt-sm">
        Los gastos de envío se calculan en el checkout
      </p>
    </div>
  );
}

function CartDiscounts({
  discountCodes,
}: {
  discountCodes?: CartApiQueryFragment['discountCodes'];
}) {
  const codes: string[] =
    discountCodes
      ?.filter((discount) => discount.applicable)
      ?.map(({code}) => code) || [];

  return (
    <div className="mb-md">
      {/* Have existing discount, display it with a remove option */}
      <dl hidden={!codes.length} className="mb-md">
        <div>
          <dt className="text-sm text-stone-gray mb-xs">
            Descuentos aplicados
          </dt>
          <UpdateDiscountForm>
            <div className="cart-discount flex items-center justify-between bg-success/10 p-sm rounded-sm border border-success">
              <code className="text-sm text-success font-semibold">
                {codes?.join(', ')}
              </code>
              <button className="text-xs text-error hover:text-salsa-red underline transition-colors">
                Eliminar
              </button>
            </div>
          </UpdateDiscountForm>
        </div>
      </dl>

      {/* Show an input to apply a discount */}
      <UpdateDiscountForm discountCodes={codes}>
        <div className="flex gap-xs min-w-0">
          <input
            type="text"
            name="discountCode"
            placeholder="Código de descuento"
            className="flex-1 px-sm py-xs border-2 border-midnight rounded-sm text-sm focus:outline-none focus:border-fire-red transition-colors min-w-0"
          />
          <button
            type="submit"
            className="px-md py-xs bg-charcoal text-canvas-light border-2 border-midnight rounded-sm hover:bg-midnight transition-colors text-sm font-semibold flex-shrink-0 whitespace-nowrap"
          >
            Aplicar
          </button>
        </div>
      </UpdateDiscountForm>
    </div>
  );
}

function UpdateDiscountForm({
  discountCodes,
  children,
}: {
  discountCodes?: string[];
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.DiscountCodesUpdate}
      inputs={{
        discountCodes: discountCodes || [],
      }}
    >
      {children}
    </CartForm>
  );
}

function CartGiftCard({
  giftCardCodes,
}: {
  giftCardCodes: CartApiQueryFragment['appliedGiftCards'] | undefined;
}) {
  const appliedGiftCardCodes = useRef<string[]>([]);
  const giftCardCodeInput = useRef<HTMLInputElement>(null);
  const giftCardAddFetcher = useFetcher({key: 'gift-card-add'});

  // Clear the gift card code input after the gift card is added
  useEffect(() => {
    if (giftCardAddFetcher.data) {
      giftCardCodeInput.current!.value = '';
    }
  }, [giftCardAddFetcher.data]);

  function saveAppliedCode(code: string) {
    const formattedCode = code.replace(/\s/g, ''); // Remove spaces
    if (!appliedGiftCardCodes.current.includes(formattedCode)) {
      appliedGiftCardCodes.current.push(formattedCode);
    }
  }

  return (
    <div className="mb-md">
      {/* Display applied gift cards with individual remove buttons */}
      {giftCardCodes && giftCardCodes.length > 0 && (
        <dl className="mb-md">
          <dt className="text-sm text-stone-gray mb-xs">
            Tarjetas de regalo aplicadas
          </dt>
          {giftCardCodes.map((giftCard) => (
            <RemoveGiftCardForm key={giftCard.id} giftCardId={giftCard.id}>
              <div className="cart-discount flex items-center justify-between bg-info/10 p-sm rounded-sm border border-info mb-xs">
                <div className="flex items-center gap-sm">
                  <code className="text-sm text-info font-semibold">
                    ***{giftCard.lastCharacters}
                  </code>
                  <span className="text-sm text-charcoal">
                    <Money data={giftCard.amountUsed} />
                  </span>
                </div>
                <button
                  type="submit"
                  className="text-xs text-error hover:text-salsa-red underline transition-colors"
                >
                  Eliminar
                </button>
              </div>
            </RemoveGiftCardForm>
          ))}
        </dl>
      )}

      {/* Show an input to apply a gift card */}
      <UpdateGiftCardForm
        giftCardCodes={appliedGiftCardCodes.current}
        saveAppliedCode={saveAppliedCode}
        fetcherKey="gift-card-add"
      >
        <div className="flex gap-xs min-w-0">
          <input
            type="text"
            name="giftCardCode"
            placeholder="Código de tarjeta regalo"
            ref={giftCardCodeInput}
            className="flex-1 px-sm py-xs border-2 border-midnight rounded-sm text-sm focus:outline-none focus:border-fire-red transition-colors min-w-0"
          />
          <button
            type="submit"
            disabled={giftCardAddFetcher.state !== 'idle'}
            className="px-md py-xs bg-charcoal text-canvas-light border-2 border-midnight rounded-sm hover:bg-midnight transition-colors text-sm font-semibold disabled:opacity-30 disabled:cursor-not-allowed flex-shrink-0 whitespace-nowrap"
          >
            Aplicar
          </button>
        </div>
      </UpdateGiftCardForm>
    </div>
  );
}

function UpdateGiftCardForm({
  giftCardCodes,
  saveAppliedCode,
  fetcherKey,
  children,
}: {
  giftCardCodes?: string[];
  saveAppliedCode?: (code: string) => void;
  fetcherKey?: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      fetcherKey={fetcherKey}
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesUpdate}
      inputs={{
        giftCardCodes: giftCardCodes || [],
      }}
    >
      {(fetcher: FetcherWithComponents<any>) => {
        const code = fetcher.formData?.get('giftCardCode');
        if (code && saveAppliedCode) {
          saveAppliedCode(code as string);
        }
        return children;
      }}
    </CartForm>
  );
}

function RemoveGiftCardForm({
  giftCardId,
  children,
}: {
  giftCardId: string;
  children: React.ReactNode;
}) {
  return (
    <CartForm
      route="/cart"
      action={CartForm.ACTIONS.GiftCardCodesRemove}
      inputs={{
        giftCardCodes: [giftCardId],
      }}
    >
      {children}
    </CartForm>
  );
}
