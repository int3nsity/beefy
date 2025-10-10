export type FlavorProduct = {
  id: string;
  handle: string;
  title: string;
  vendor?: string;
  featuredImage?: {
    id: string;
    url: string;
    altText?: string | null;
    width?: number;
    height?: number;
  } | null;
  priceRange: {
    minVariantPrice: {
      amount: string;
      currencyCode: string;
    };
    maxVariantPrice: {
      amount: string;
      currencyCode: string;
    };
  };
  variants?: {
    nodes: Array<{
      id: string;
      title: string;
      availableForSale: boolean;
      quantityAvailable?: number | null;
      price: {
        amount: string;
        currencyCode: string;
      };
    }>;
  };
};

export type FlavorSelection = {
  productId: string;
  variantId: string;
  quantity: number;
  title: string;
  price: string;
  image?: string;
};

interface FlavorSelectorProps {
  product: FlavorProduct;
  quantity: number;
  onQuantityChange: (
    productId: string,
    variantId: string,
    newQuantity: number,
  ) => void;
  maxTotal: number;
  currentTotal: number;
  disabled?: boolean;
}

export function FlavorSelector({
  product,
  quantity,
  onQuantityChange,
  maxTotal,
  currentTotal,
  disabled = false,
}: FlavorSelectorProps) {
  const canIncrease = currentTotal < maxTotal;
  const canDecrease = quantity > 0;

  // Usar la primera variante disponible o el ID del producto como fallback
  const primaryVariant = product.variants?.nodes?.[0];
  const variantId = primaryVariant?.id || product.id;
  const isAvailable = primaryVariant?.availableForSale !== false;
  const stockQuantity = primaryVariant?.quantityAvailable;

  const handleIncrease = () => {
    if (canIncrease && !disabled) {
      onQuantityChange(product.id, variantId, quantity + 1);
    }
  };

  const handleDecrease = () => {
    if (canDecrease && !disabled) {
      onQuantityChange(product.id, variantId, quantity - 1);
    }
  };

  return (
    <div
      className={`
        relative
        border-3 border-midnight rounded-lg
        bg-canvas-light
        overflow-hidden
        transition-all duration-200
        ${quantity > 0 ? 'shadow-brutal-sm ring-2 ring-fire-red' : 'hover:shadow-brutal-xs'}
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
    >
      {/* Badge de cantidad */}
      {quantity > 0 && (
        <div className="absolute top-2 right-2 z-10 bg-fire-red text-canvas-light rounded-full w-8 h-8 flex items-center justify-center font-bold text-sm shadow-brutal-xs">
          {quantity}
        </div>
      )}

      {/* Imagen del producto */}
      <div className="relative aspect-square bg-bone-cream">
        {product.featuredImage ? (
          <img
            src={product.featuredImage.url}
            alt={product.featuredImage.altText || product.title}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-6xl">
            🥩
          </div>
        )}
      </div>

      {/* Info del producto */}
      <div className="p-md">
        <h3 className="text-display text-lg text-midnight mb-md line-clamp-2">
          {product.title}
        </h3>

        {/* Indicador de stock */}
        {!isAvailable && (
          <p className="text-xs text-error font-semibold mb-md">❌ Sin stock</p>
        )}
        {isAvailable &&
          stockQuantity !== null &&
          stockQuantity !== undefined &&
          stockQuantity <= 10 &&
          stockQuantity > 0 && (
            <p className="text-xs text-warning font-semibold mb-md">
              ⚠️ ¡Solo quedan {stockQuantity}!
            </p>
          )}
        {isAvailable &&
          (stockQuantity === null ||
            stockQuantity === undefined ||
            stockQuantity > 10) && (
            <p className="text-xs text-success font-semibold mb-md">
              ✓ Disponible
            </p>
          )}

        {/* Botones +/- */}
        <div className="flex items-center justify-between gap-sm">
          <button
            type="button"
            onClick={handleDecrease}
            disabled={!canDecrease || disabled}
            className={`
              flex-1 py-sm px-md
              border-2 border-midnight
              rounded-md
              font-bold text-xl
              transition-all duration-150
              ${
                canDecrease && !disabled
                  ? 'bg-canvas-light hover:bg-bone-cream active:translate-y-0.5'
                  : 'bg-stone-gray/20 cursor-not-allowed'
              }
            `}
            aria-label="Disminuir cantidad"
          >
            −
          </button>

          <div className="flex-shrink-0 text-center min-w-[3rem]">
            <span className="text-2xl font-bold text-midnight">{quantity}</span>
          </div>

          <button
            type="button"
            onClick={handleIncrease}
            disabled={!canIncrease || disabled}
            className={`
              flex-1 py-sm px-md
              border-2 border-midnight
              rounded-md
              font-bold text-xl
              transition-all duration-150
              ${
                canIncrease && !disabled
                  ? 'bg-fire-red text-canvas-light hover:bg-salsa-red active:translate-y-0.5'
                  : 'bg-stone-gray/20 cursor-not-allowed'
              }
            `}
            aria-label="Aumentar cantidad"
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
}
