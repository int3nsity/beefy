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
        <NavLink
          end
          prefetch="intent"
          to="/"
          className={({isActive}) =>
            `text-base font-medium transition-colors ${
              isActive
                ? 'text-fire-red font-bold'
                : 'text-charcoal hover:text-fire-red'
            }`
          }
        >
          Inicio
        </NavLink>
        {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
          if (!item.url) return null;

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
      <NavLink
        end
        onClick={close}
        prefetch="intent"
        to="/"
        className={({isActive}) =>
          `text-lg font-medium ${isActive ? 'text-fire-red font-bold' : 'text-charcoal'}`
        }
      >
        Inicio
      </NavLink>
      {(menu || FALLBACK_HEADER_MENU).items.map((item) => {
        if (!item.url) return null;

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
      className="relative text-sm font-medium text-charcoal hover:text-fire-red transition-colors"
    >
      Carrito
      {count !== null && count > 0 && (
        <span className="absolute -top-2 -right-2 bg-fire-red text-canvas-light text-xs font-bold rounded-full w-5 h-5 flex items-center justify-center">
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
