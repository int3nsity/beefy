import {useState, useMemo, useEffect} from 'react';
import {FlavorSelector, type FlavorProduct} from './FlavorSelector';
import {AddToCartButton} from './AddToCartButton';
import {useAside} from './Aside';

interface BundleBuilderProps {
  bundleProduct: any; // El producto "Arma tu caja (7 un)"
  availableFlavors: FlavorProduct[];
  bundleSize?: number;
}

export function BundleBuilder({
  bundleProduct,
  availableFlavors,
  bundleSize = 7,
}: BundleBuilderProps) {
  const {open} = useAside();

  // Estado: Map de productId -> {variantId, quantity}
  const [selections, setSelections] = useState<
    Record<string, {variantId: string; quantity: number}>
  >({});

  // Calcular total de unidades seleccionadas
  const totalSelected = useMemo(() => {
    return Object.values(selections).reduce(
      (sum, item) => sum + item.quantity,
      0,
    );
  }, [selections]);

  // Calcular progreso
  const progress = (totalSelected / bundleSize) * 100;
  const isComplete = totalSelected === bundleSize;
  const isOverLimit = totalSelected > bundleSize;

  // Handler para cambios de cantidad
  const handleQuantityChange = (
    productId: string,
    variantId: string,
    newQuantity: number,
  ) => {
    // Analytics tracking - track flavor selections
    if (
      typeof window !== 'undefined' &&
      (window as any).gtag &&
      newQuantity > 0
    ) {
      const flavor = availableFlavors.find((f) => f.id === productId);
      if (flavor) {
        (window as any).gtag('event', 'bundle_flavor_selected', {
          event_category: 'Bundle Builder',
          event_label: flavor.title,
          value: newQuantity,
        });
      }
    }

    setSelections((prev) => {
      const updated = {...prev};
      if (newQuantity === 0) {
        delete updated[productId];
      } else {
        updated[productId] = {variantId, quantity: newQuantity};
      }
      return updated;
    });
  };

  // Generar líneas para el carrito con atributos personalizados
  const cartLines = useMemo(() => {
    const lines: Array<{
      merchandiseId: string;
      quantity: number;
      attributes?: Array<{key: string; value: string}>;
    }> = [];

    // Generar un ID único para este bundle
    const bundleId = `bundle-${Date.now()}`;

    Object.entries(selections).forEach(
      ([_productId, {variantId, quantity}]) => {
        if (quantity > 0) {
          lines.push({
            merchandiseId: variantId,
            quantity,
            attributes: [
              {key: '_bundle', value: 'Caja de 7'},
              {key: '_bundle_id', value: bundleId},
            ],
          });
        }
      },
    );

    return lines;
  }, [selections]);

  // Función para selección aleatoria
  const handleRandomSelection = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'bundle_random_selection', {
        event_category: 'Bundle Builder',
        event_label: 'Random Selection',
      });
    }

    const newSelections: Record<string, {variantId: string; quantity: number}> =
      {};
    let remaining = bundleSize;

    // Filtrar sabores disponibles
    const availableForSelection = availableFlavors.filter(
      (flavor) => flavor.variants?.nodes?.[0]?.availableForSale !== false,
    );

    if (availableForSelection.length === 0) return;

    // Crear una copia shuffled de los sabores
    const shuffled = [...availableForSelection].sort(() => Math.random() - 0.5);

    // Distribuir aleatoriamente
    shuffled.forEach((flavor) => {
      if (remaining > 0) {
        const quantity = Math.floor(Math.random() * Math.min(3, remaining + 1));
        if (quantity > 0) {
          const variantId = flavor.variants?.nodes?.[0]?.id || flavor.id;
          newSelections[flavor.id] = {variantId, quantity};
          remaining -= quantity;
        }
      }
    });

    // Si quedaron unidades, asignarlas al azar
    while (remaining > 0) {
      const randomFlavor =
        shuffled[Math.floor(Math.random() * shuffled.length)];
      const variantId =
        randomFlavor.variants?.nodes?.[0]?.id || randomFlavor.id;
      const current = newSelections[randomFlavor.id];
      if (current) {
        newSelections[randomFlavor.id] = {
          variantId: current.variantId,
          quantity: current.quantity + 1,
        };
      } else {
        newSelections[randomFlavor.id] = {variantId, quantity: 1};
      }
      remaining--;
    }

    setSelections(newSelections);
  };

  // Función para limpiar selección
  const handleClearSelection = () => {
    setSelections({});
  };

  // Función para cargar última caja guardada
  const handleLoadLastBox = () => {
    // Analytics tracking
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'bundle_load_last_box', {
        event_category: 'Bundle Builder',
        event_label: 'Load Last Box',
      });
    }

    try {
      const saved = localStorage.getItem('beefy_last_box');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Validar que los productos aún existan
        const validSelections: Record<
          string,
          {variantId: string; quantity: number}
        > = {};
        Object.entries(parsed).forEach(([productId, data]: [string, any]) => {
          if (
            availableFlavors.some((flavor) => flavor.id === productId) &&
            data.variantId &&
            typeof data.quantity === 'number'
          ) {
            validSelections[productId] = data;
          }
        });
        setSelections(validSelections);
      }
    } catch (error) {
      console.error('Error loading saved box:', error);
    }
  };

  // Guardar selección en localStorage cuando cambia
  useEffect(() => {
    if (Object.keys(selections).length > 0) {
      try {
        localStorage.setItem('beefy_last_box', JSON.stringify(selections));
      } catch (error) {
        console.error('Error saving box:', error);
      }
    }
  }, [selections]);

  // Verificar si hay una caja guardada
  const hasSavedBox = (() => {
    try {
      return !!localStorage.getItem('beefy_last_box');
    } catch {
      return false;
    }
  })();

  return (
    <div className="space-y-3xl">
      {/* Header con progreso */}
      <div className="bg-bone-cream border-3 border-midnight rounded-lg p-lg shadow-brutal-sm">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-lg mb-lg">
          <div>
            <h2 className="text-display text-3xl text-midnight mb-xs">
              Armá tu Caja Perfecta
            </h2>
            <p className="text-base text-charcoal">
              Elegí {bundleSize} unidades de tus sabores favoritos
            </p>
          </div>

          <div className="flex gap-sm flex-wrap">
            <button
              type="button"
              onClick={handleRandomSelection}
              className="btn-secondary text-sm"
            >
              🎲 Sorprendeme
            </button>
            {hasSavedBox && totalSelected === 0 && (
              <button
                type="button"
                onClick={handleLoadLastBox}
                className="btn-outline text-sm"
              >
                ⏮️ Repetir última caja
              </button>
            )}
            {totalSelected > 0 && (
              <button
                type="button"
                onClick={handleClearSelection}
                className="btn-outline text-sm"
              >
                🗑️ Limpiar
              </button>
            )}
          </div>
        </div>

        {/* Contador visual */}
        <div className="space-y-sm">
          <div className="flex justify-between items-center">
            <span className="text-display text-2xl font-bold text-midnight">
              {totalSelected} / {bundleSize}
            </span>
            <span
              className={`text-sm font-semibold ${
                isComplete
                  ? 'text-success'
                  : isOverLimit
                    ? 'text-error'
                    : 'text-stone-gray'
              }`}
            >
              {isComplete
                ? '✓ ¡Completado!'
                : isOverLimit
                  ? `⚠️ Te pasaste por ${totalSelected - bundleSize}`
                  : `Faltan ${bundleSize - totalSelected} unidades`}
            </span>
          </div>

          {/* Barra de progreso */}
          <div className="w-full h-4 bg-canvas-light border-2 border-midnight rounded-full overflow-hidden">
            <div
              className={`h-full transition-all duration-300 ${
                isComplete
                  ? 'bg-success'
                  : isOverLimit
                    ? 'bg-error'
                    : 'bg-fire-red'
              }`}
              style={{width: `${Math.min(progress, 100)}%`}}
            />
          </div>
        </div>

        {/* Mensajes de ayuda */}
        {isOverLimit && (
          <div className="mt-md p-md bg-error/10 border-2 border-error rounded-md">
            <p className="text-sm text-error font-semibold">
              ⚠️ Has seleccionado demasiadas unidades. Por favor reduce tu
              selección.
            </p>
          </div>
        )}
      </div>

      {/* Grid de sabores */}
      <div className="flex justify-center items-center">
        <div className="flex flex-wrap justify-center items-center ">
          {availableFlavors.map((flavor) => (
            <div key={flavor.id} className="max-w-80 w-full m-sm">
              <FlavorSelector
                product={flavor}
                quantity={selections[flavor.id]?.quantity || 0}
                onQuantityChange={handleQuantityChange}
                maxTotal={bundleSize}
                currentTotal={totalSelected}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Botón agregar al carrito - Fixed en mobile con mejor espaciado */}
      <div className="sticky bottom-0 left-0 right-0 z-20 bg-canvas-light border-t-3 border-midnight p-xl shadow-brutal-lg lg:static lg:border-0 lg:shadow-none lg:p-0 lg:mt-3xl">
        <div className="w-full mx-auto">
          <div className="bg-bone-cream border-3 border-midnight rounded-lg p-xl shadow-brutal-sm space-y-lg w-full">
            {/* Resumen */}
            <div className="flex justify-between items-center gap-lg">
              <div className="flex-1 min-w-0">
                <p className="text-sm text-stone-gray">Precio total</p>
                <p className="text-display text-3xl text-midnight break-words">
                  ${bundleProduct?.priceRange?.minVariantPrice?.amount || '0'}{' '}
                  {bundleProduct?.priceRange?.minVariantPrice?.currencyCode ||
                    'CLP'}
                </p>
              </div>
              <div className="flex-1 text-right min-w-0">
                <p className="text-sm text-stone-gray">Unidades</p>
                <p className="text-display text-3xl text-midnight">
                  {totalSelected} / {bundleSize}
                </p>
              </div>
            </div>

            {/* Botón */}
            <AddToCartButton
              disabled={!isComplete || isOverLimit}
              onClick={() => {
                // Analytics tracking - bundle completed
                if (typeof window !== 'undefined' && (window as any).gtag) {
                  // Track bundle completion
                  (window as any).gtag('event', 'bundle_completed', {
                    event_category: 'Bundle Builder',
                    event_label: 'Bundle Added to Cart',
                    value:
                      bundleProduct?.priceRange?.minVariantPrice?.amount || 0,
                  });

                  // Track flavor combination
                  const flavorNames = Object.keys(selections)
                    .map((productId) => {
                      const flavor = availableFlavors.find(
                        (f) => f.id === productId,
                      );
                      return flavor
                        ? `${flavor.title} (${selections[productId].quantity})`
                        : null;
                    })
                    .filter(Boolean)
                    .join(', ');

                  (window as any).gtag('event', 'bundle_combination', {
                    event_category: 'Bundle Builder',
                    event_label: flavorNames,
                  });
                }

                open('cart');
              }}
              lines={cartLines}
              className="w-full min-w-0 text-center"
            >
              {!isComplete
                ? `Seleccioná ${bundleSize - totalSelected} más`
                : isOverLimit
                  ? 'Reducí tu selección'
                  : '🛒 Agregar al Carrito'}
            </AddToCartButton>

            {isComplete && !isOverLimit && (
              <p className="text-xs text-center text-stone-gray">
                ✓ Tu caja está lista. ¡Dale click para agregarla!
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
