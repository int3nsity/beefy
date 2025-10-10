import {Suspense} from 'react';
import {Await, NavLink} from 'react-router';
import type {FooterQuery, HeaderQuery} from 'storefrontapi.generated';

interface FooterProps {
  footer: Promise<FooterQuery | null>;
  header: HeaderQuery;
  publicStoreDomain: string;
}

export function Footer({
  footer: footerPromise,
  header,
  publicStoreDomain,
}: FooterProps) {
  return (
    <Suspense>
      <Await resolve={footerPromise}>
        {(footer) => (
          <footer className="bg-midnight text-canvas-light mt-auto">
            <div className="section-container py-4xl">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3xl mb-3xl">
                {/* Sobre Nosotros */}
                <div>
                  <h3 className="text-display text-xl mb-lg text-ember-orange">
                    Sobre Nosotros
                  </h3>
                  <p className="text-sm leading-relaxed mb-md">
                    Jerky artesanal chileno hecho con ingredientes 100%
                    naturales. Tradición y calidad en cada bocado.
                  </p>
                  <p className="text-xs text-smoke-gray">
                    Más de 10 años elaborando el mejor jerky de Chile.
                  </p>
                </div>

                {/* Enlaces Rápidos */}
                <div>
                  <h3 className="text-display text-xl mb-lg text-ember-orange">
                    Enlaces Rápidos
                  </h3>
                  <ul className="space-y-sm">
                    <li>
                      <NavLink
                        to="/"
                        className="text-sm hover:text-ember-orange transition-colors"
                      >
                        Inicio
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/collections"
                        className="text-sm hover:text-ember-orange transition-colors"
                      >
                        Tienda
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/pages/about"
                        className="text-sm hover:text-ember-orange transition-colors"
                      >
                        Nosotros
                      </NavLink>
                    </li>
                    <li>
                      <NavLink
                        to="/contacto"
                        className="text-sm hover:text-ember-orange transition-colors"
                      >
                        Contacto
                      </NavLink>
                    </li>
                  </ul>
                </div>

                {/* Atención al Cliente */}
                <div>
                  <h3 className="text-display text-xl mb-lg text-ember-orange">
                    Atención al Cliente
                  </h3>
                  <ul className="space-y-sm text-sm">
                    <li>
                      <a
                        href="tel:+541112345678"
                        className="hover:text-ember-orange transition-colors"
                      >
                        📞 +54 11 1234-5678
                      </a>
                    </li>
                    <li>
                      <a
                        href="mailto:hola@beefy.com.ar"
                        className="hover:text-ember-orange transition-colors"
                      >
                        ✉️ hola@beefy.com.ar
                      </a>
                    </li>
                    <li className="text-smoke-gray">🕒 Lun-Vie: 9:00-18:00</li>
                    <li className="text-smoke-gray">Sáb: 10:00-14:00</li>
                  </ul>
                </div>

                {/* Síguenos */}
                <div>
                  <h3 className="text-display text-xl mb-lg text-ember-orange">
                    Síguenos
                  </h3>
                  <div className="flex gap-md mb-lg">
                    <a
                      href="https://instagram.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-ember-orange hover:bg-fire-red transition-colors rounded-full flex items-center justify-center text-xl"
                      aria-label="Instagram"
                    >
                      📷
                    </a>
                    <a
                      href="https://facebook.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-ember-orange hover:bg-fire-red transition-colors rounded-full flex items-center justify-center text-xl"
                      aria-label="Facebook"
                    >
                      👍
                    </a>
                    <a
                      href="https://wa.me/56912345678"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-ember-orange hover:bg-fire-red transition-colors rounded-full flex items-center justify-center text-xl"
                      aria-label="WhatsApp"
                    >
                      💬
                    </a>
                  </div>
                  <div className="mt-lg">
                    <p className="text-sm mb-sm font-medium">
                      Suscríbete para ofertas exclusivas
                    </p>
                    <form className="flex gap-xs">
                      <input
                        type="email"
                        placeholder="Tu email"
                        className="flex-1 px-md py-sm rounded-md text-charcoal text-sm"
                      />
                      <button
                        type="submit"
                        className="bg-fire-red hover:bg-ember-orange px-md py-sm rounded-md text-sm font-bold transition-colors"
                      >
                        →
                      </button>
                    </form>
                  </div>
                </div>
              </div>

              {/* Footer Bottom */}
              <div className="border-t border-stone-gray pt-lg">
                <div className="flex flex-col md:flex-row justify-between items-center gap-md">
                  <p className="text-sm text-smoke-gray">
                    © 2025 Beefy. Todos los derechos reservados.
                  </p>
                  {footer?.menu && header.shop.primaryDomain?.url && (
                    <FooterMenu
                      menu={footer.menu}
                      primaryDomainUrl={header.shop.primaryDomain.url}
                      publicStoreDomain={publicStoreDomain}
                    />
                  )}
                </div>
              </div>
            </div>
          </footer>
        )}
      </Await>
    </Suspense>
  );
}

function FooterMenu({
  menu,
  primaryDomainUrl,
  publicStoreDomain,
}: {
  menu: FooterQuery['menu'];
  primaryDomainUrl: FooterProps['header']['shop']['primaryDomain']['url'];
  publicStoreDomain: string;
}) {
  const translations: Record<string, string> = {
    'Privacy Policy': 'Privacidad',
    'Refund Policy': 'Devoluciones',
    'Shipping Policy': 'Envíos',
    'Terms of Service': 'Términos',
  };

  return (
    <nav
      className="flex flex-wrap justify-center md:justify-end gap-md text-sm"
      role="navigation"
    >
      {(menu || FALLBACK_FOOTER_MENU).items.map((item) => {
        if (!item.url) return null;
        const url =
          item.url.includes('myshopify.com') ||
          item.url.includes(publicStoreDomain) ||
          item.url.includes(primaryDomainUrl)
            ? new URL(item.url).pathname
            : item.url;
        const isExternal = !url.startsWith('/');
        const translatedTitle = translations[item.title] || item.title;

        return isExternal ? (
          <a
            href={url}
            key={item.id}
            rel="noopener noreferrer"
            target="_blank"
            className="text-smoke-gray hover:text-ember-orange transition-colors"
          >
            {translatedTitle}
          </a>
        ) : (
          <NavLink
            end
            key={item.id}
            prefetch="intent"
            to={url}
            className="text-smoke-gray hover:text-ember-orange transition-colors"
          >
            {translatedTitle}
          </NavLink>
        );
      })}
    </nav>
  );
}

const FALLBACK_FOOTER_MENU = {
  id: 'gid://shopify/Menu/199655620664',
  items: [
    {
      id: 'gid://shopify/MenuItem/461633060920',
      resourceId: 'gid://shopify/ShopPolicy/23358046264',
      tags: [],
      title: 'Privacy Policy',
      type: 'SHOP_POLICY',
      url: '/policies/privacy-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633093688',
      resourceId: 'gid://shopify/ShopPolicy/23358013496',
      tags: [],
      title: 'Refund Policy',
      type: 'SHOP_POLICY',
      url: '/policies/refund-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633126456',
      resourceId: 'gid://shopify/ShopPolicy/23358111800',
      tags: [],
      title: 'Shipping Policy',
      type: 'SHOP_POLICY',
      url: '/policies/shipping-policy',
      items: [],
    },
    {
      id: 'gid://shopify/MenuItem/461633159224',
      resourceId: 'gid://shopify/ShopPolicy/23358079032',
      tags: [],
      title: 'Terms of Service',
      type: 'SHOP_POLICY',
      url: '/policies/terms-of-service',
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
    color: isPending ? 'grey' : 'white',
  };
}
