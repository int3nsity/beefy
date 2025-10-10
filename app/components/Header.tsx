import {Suspense} from 'react';
import {Await, NavLink, useAsyncValue} from 'react-router';
import {
  type CartViewPayload,
  useAnalytics,
  useOptimisticCart,
} from '@shopify/hydrogen';
import type {HeaderQuery, CartApiQueryFragment} from 'storefrontapi.generated';
import {useAside} from '~/components/Aside';

interface HeaderProps {
  header: HeaderQuery;
  cart: Promise<CartApiQueryFragment | null>;
  isLoggedIn: Promise<boolean>;
  publicStoreDomain: string;
}

type Viewport = 'desktop' | 'mobile';

export function Header({
  header,
  isLoggedIn,
  cart,
  publicStoreDomain,
}: HeaderProps) {
  const {shop, menu} = header;
  return (
    <header className="bg-bone-cream border-b-2 border-midnight sticky top-0 z-[var(--z-sticky)]">
      <div className="section-container py-md">
        <div className="flex items-center justify-between">
          <NavLink
            prefetch="intent"
            to="/"
            end
            className="text-display text-2xl text-fire-red hover:text-ember-orange transition-colors"
          >
            {shop.name}
          </NavLink>
          <HeaderMenu
            menu={menu}
            viewport="desktop"
            primaryDomainUrl={header.shop.primaryDomain.url}
            publicStoreDomain={publicStoreDomain}
          />
          <HeaderCtas isLoggedIn={isLoggedIn} cart={cart} />
        </div>
      </div>
    </header>
  );
}

export function HeaderMenu({
  menu,
  primaryDomainUrl,
  viewport,
  publicStoreDomain,
}: {
  menu: HeaderProps['header']['menu'];
  primaryDomainUrl: HeaderProps['header']['shop']['primaryDomain']['url'];
  viewport: Viewport;
  publicStoreDomain: HeaderProps['publicStoreDomain'];
}) {
  const {close} = useAside();

  // Spanish translations for menu items
  const translations: Record<string, string> = {
    Home: 'Inicio',
    Collections: 'Tienda',
    Blog: 'Blog',
    Policies: 'Políticas',
    About: 'Nosotros',
    Contact: 'Contacto',
  };

  if (viewport === 'desktop') {
    return (
      <nav className="hidden lg:flex items-center gap-xl" role="navigation">
        {/* CTA destacado para Armá tu Caja */}
        <NavLink
          prefetch="intent"
          to="/products/arma-tu-caja"
          className="bg-fire-red text-canvas-light px-lg py-sm rounded-md font-bold text-base hover:bg-salsa-red transition-all hover:shadow-brutal-xs border-2 border-midnight"
        >
          🥩 Armá tu Caja
        </NavLink>

        {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
          if (!item.url) return null;

          // Skip if it's a Home or Contact item (we have custom ones)
          if (
            item.title === 'Home' ||
            item.title === 'Contact' ||
            item.title === 'Contacto'
          ) {
            return null;
          }

          const url =
            item.url.includes('myshopify.com') ||
            item.url.includes(publicStoreDomain) ||
            item.url.includes(primaryDomainUrl)
              ? new URL(item.url).pathname
              : item.url;

          const translatedTitle = translations[item.title] || item.title;

          return (
            <NavLink
              end
              key={item.id}
              prefetch="intent"
              to={url}
              className={({isActive}) =>
                `text-base font-medium transition-colors ${
                  isActive
                    ? 'text-fire-red font-bold'
                    : 'text-charcoal hover:text-fire-red'
                }`
              }
            >
              {translatedTitle}
            </NavLink>
          );
        })}
        <NavLink
          prefetch="intent"
          to="/contacto"
          className={({isActive}) =>
            `text-base font-medium transition-colors ${
              isActive
                ? 'text-fire-red font-bold'
                : 'text-charcoal hover:text-fire-red'
            }`
          }
        >
          Contacto
        </NavLink>
      </nav>
    );
  }

  return (
    <nav className="flex flex-col gap-lg p-lg" role="navigation">
      {/* CTA destacado para Armá tu Caja en mobile */}
      <NavLink
        onClick={close}
        prefetch="intent"
        to="/products/arma-tu-caja"
        className="bg-fire-red text-canvas-light px-lg py-md rounded-md font-bold text-lg text-center hover:bg-salsa-red transition-all border-2 border-midnight shadow-brutal-sm"
      >
        🥩 Armá tu Caja (7 un)
      </NavLink>

      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

        // Skip if it's a Home or Contact item (we have custom ones)
        if (
          item.title === 'Home' ||
          item.title === 'Contact' ||
          item.title === 'Contacto'
        ) {
          return null;
        }

        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;

        const translatedTitle = translations[item.title] || item.title;

        return (
          <NavLink
            end
            key={item.id}
            onClick={close}
            prefetch="intent"
            to={url}
            className={({isActive}) =>
              `text-lg font-medium ${isActive ? 'text-fire-red font-bold' : 'text-charcoal'}`
            }
          >
            {translatedTitle}
          </NavLink>
        );
      })}
      <NavLink
        onClick={close}
        prefetch="intent"
        to="/contacto"
        className={({isActive}) =>
          `text-lg font-medium ${isActive ? 'text-fire-red font-bold' : 'text-charcoal'}`
        }
      >
        Contacto
      </NavLink>
    </nav>
  );
}

function HeaderCtas({
  isLoggedIn,
  cart,
}: Pick<HeaderProps, 'isLoggedIn' | 'cart'>) {
  return (
    <nav className="flex items-center gap-md" role="navigation">
      <HeaderMenuMobileToggle />
      <SearchToggle />
      <NavLink
        prefetch="intent"
        to="/account"
        className="hidden md:block text-sm font-medium text-charcoal hover:text-fire-red transition-colors"
      >
        <Suspense fallback="Cuenta">
          <Await resolve={isLoggedIn} errorElement="Iniciar Sesión">
            {(isLoggedIn) => (isLoggedIn ? 'Cuenta' : 'Iniciar Sesión')}
          </Await>
        </Suspense>
      </NavLink>
      <CartToggle cart={cart} />
    </nav>
  );
}

function HeaderMenuMobileToggle() {
  const {open} = useAside();
  return (
    <button
      className="lg:hidden text-2xl text-charcoal hover:text-fire-red transition-colors"
      onClick={() => open('mobile')}
      aria-label="Abrir menú"
    >
      ☰
    </button>
  );
}

function SearchToggle() {
  const {open} = useAside();
  return (
    <button
      className="text-sm font-medium text-charcoal hover:text-fire-red transition-colors"
      onClick={() => open('search')}
    >
      Buscar
    </button>
  );
}

function CartBadge({count}: {count: number | null}) {
  const {open} = useAside();
  const {publish, shop, cart, prevCart} = useAnalytics();

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        open('cart');
        publish('cart_viewed', {
          cart,
          prevCart,
          shop,
          url: window.location.href || '',
        } as CartViewPayload);
      }}
      className="relative text-charcoal hover:text-fire-red transition-colors p-sm rounded-md hover:bg-bone-cream"
      aria-label="Abrir carrito"
    >
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-6 h-6"
      >
        <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-2 2H9a2 2 0 01-2-2v-6m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v4.01" />
      </svg>
      {count !== null && count > 0 && (
        <span className="absolute -top-1 -right-1 bg-fire-red text-canvas-light text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center border-2 border-canvas-light">
          {count}
        </span>
      )}
    </button>
  );
}

function CartToggle({cart}: Pick<HeaderProps, 'cart'>) {
  return (
    <Suspense fallback={<CartBadge count={null} />}>
      <Await resolve={cart}>
        <CartBanner />
      </Await>
    </Suspense>
  );
}

function CartBanner() {
  const originalCart = useAsyncValue() as CartApiQueryFragment | null;
  const cart = useOptimisticCart(originalCart);
  return <CartBadge count={cart?.totalQuantity ?? 0} />;
}

const FALLBACK_HEADER_MENU = {
  id: 'gid://shopify/Menu/199655587896',
  items: [
    {
      id: 'gid://shopify/MenuItem/461609500728',
      resourceId: null,
      tags: [],
      title: 'Collections',
      type: 'HTTP',
      url: '/collections',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609533496',
      resourceId: null,
      tags: [],
      title: 'Blog',
      type: 'HTTP',
      url: '/blogs/journal',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609566264',
      resourceId: null,
      tags: [],
      title: 'Policies',
      type: 'HTTP',
      url: '/policies',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461609599032',
      resourceId: 'gid://shopify/Page/92591030328',
      tags: [],
      title: 'About',
      type: 'PAGE',
      url: '/pages/about',
      items: [],
    },
  ],
};

function activeLinkStyle({
  isActive,
  isPending,
}: {
  isActive: boolean;
  isPending: boolean;
}) {
  return {
    fontWeight: isActive ? 'bold' : undefined,
    color: isPending ? 'grey' : 'black',
  };
}
