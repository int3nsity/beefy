/**
 * Contact Page - Spanish
 */

import {Form, useActionData} from 'react-router';
import type {Route} from './+types/contacto';

export const meta: Route.MetaFunction = () => {
  return [{title: 'Contacto - Beefy Charqui Argentino'}];
};

export async function action({request}: Route.ActionArgs) {
  const formData = await request.formData();
  const name = formData.get('name');
  const email = formData.get('email');
  const phone = formData.get('phone');
  const message = formData.get('message');

  // Here you would typically send an email or save to a database
  // For now, we'll just return a success message
  console.log('Contact form submission:', {name, email, phone, message});

  return {
    success: true,
    message: '¡Gracias por tu mensaje! Te responderemos pronto.',
  };
}

export default function ContactPage() {
  const actionData = useActionData<typeof action>();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-bone-cream py-4xl border-b-2 border-midnight">
        <div className="section-container text-center">
          <h1 className="text-display text-5xl text-fire-red mb-md">
            CONTÁCTANOS
          </h1>
          <p className="text-xl text-charcoal max-w-2xl mx-auto">
            ¿Tenés alguna pregunta? Estamos acá para ayudarte. Escribinos y te
            responderemos lo antes posible.
          </p>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="section-container py-5xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4xl">
          {/* Left Column - Contact Form */}
          <div>
            <h2 className="text-display text-3xl text-midnight mb-lg">
              Envianos un Mensaje
            </h2>

            {actionData?.success && (
              <div className="bg-success text-canvas-light p-lg rounded-lg mb-xl border-2 border-midnight">
                <p className="font-bold">{actionData.message}</p>
              </div>
            )}

            <Form method="post" className="space-y-lg">
              <div>
                <label
                  htmlFor="name"
                  className="block text-base font-semibold text-charcoal mb-sm"
                >
                  Nombre completo *
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  required
                  className="w-full px-lg py-md border-2 border-midnight rounded-md text-base focus:outline-none focus:ring-2 focus:ring-fire-red"
                  placeholder="Juan Pérez"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-base font-semibold text-charcoal mb-sm"
                >
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  className="w-full px-lg py-md border-2 border-midnight rounded-md text-base focus:outline-none focus:ring-2 focus:ring-fire-red"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="block text-base font-semibold text-charcoal mb-sm"
                >
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  className="w-full px-lg py-md border-2 border-midnight rounded-md text-base focus:outline-none focus:ring-2 focus:ring-fire-red"
                  placeholder="+54 11 1234-5678"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-base font-semibold text-charcoal mb-sm"
                >
                  Mensaje *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={6}
                  className="w-full px-lg py-md border-2 border-midnight rounded-md text-base focus:outline-none focus:ring-2 focus:ring-fire-red resize-none"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>

              <button type="submit" className="btn-primary w-full">
                Enviar Mensaje
              </button>
            </Form>
          </div>

          {/* Right Column - Contact Info */}
          <div>
            <h2 className="text-display text-3xl text-midnight mb-lg">
              Información de Contacto
            </h2>

            <div className="space-y-xl">
              {/* Address */}
              <div className="border-brutal-sm bg-bone-cream p-xl">
                <div className="text-4xl mb-md">📍</div>
                <h3 className="text-display text-xl text-midnight mb-sm">
                  Dirección
                </h3>
                <p className="text-base text-charcoal">
                  Av. Providencia 1234
                  <br />
                  Providencia, Santiago
                  <br />
                  Chile
                </p>
              </div>

              {/* Phone */}
              <div className="border-brutal-sm bg-bone-cream p-xl">
                <div className="text-4xl mb-md">📞</div>
                <h3 className="text-display text-xl text-midnight mb-sm">
                  Teléfono
                </h3>
                <a
                  href="tel:+56912345678"
                  className="text-base text-ember-orange hover:text-fire-red font-bold"
                >
                  +56 9 1234-5678
                </a>
                <p className="text-sm text-stone-gray mt-xs">
                  Llamadas: Lun-Vie 9:00-18:00
                </p>
              </div>

              {/* Email */}
              <div className="border-brutal-sm bg-bone-cream p-xl">
                <div className="text-4xl mb-md">✉️</div>
                <h3 className="text-display text-xl text-midnight mb-sm">
                  Email
                </h3>
                <a
                  href="mailto:hola@beefy.cl"
                  className="text-base text-ember-orange hover:text-fire-red font-bold"
                >
                  hola@beefy.cl
                </a>
                <p className="text-sm text-stone-gray mt-xs">
                  Te respondemos en 24hs
                </p>
              </div>

              {/* Hours */}
              <div className="border-brutal-sm bg-bone-cream p-xl">
                <div className="text-4xl mb-md">🕒</div>
                <h3 className="text-display text-xl text-midnight mb-sm">
                  Horarios de Atención
                </h3>
                <div className="text-base text-charcoal space-y-xs">
                  <p>Lunes a Viernes: 9:00 - 18:00</p>
                  <p>Sábados: 10:00 - 14:00</p>
                  <p className="text-stone-gray">
                    Domingos y feriados: Cerrado
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div className="border-brutal-sm bg-ember-orange p-xl text-canvas-light">
                <h3 className="text-display text-xl mb-md">
                  Seguinos en Redes
                </h3>
                <div className="flex gap-md">
                  <a
                    href="https://instagram.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-canvas-light hover:bg-bone-cream transition-colors rounded-full flex items-center justify-center text-2xl"
                    aria-label="Instagram"
                  >
                    📷
                  </a>
                  <a
                    href="https://facebook.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-canvas-light hover:bg-bone-cream transition-colors rounded-full flex items-center justify-center text-2xl"
                    aria-label="Facebook"
                  >
                    👍
                  </a>
                  <a
                    href="https://wa.me/5491112345678"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-12 h-12 bg-canvas-light hover:bg-bone-cream transition-colors rounded-full flex items-center justify-center text-2xl"
                    aria-label="WhatsApp"
                  >
                    💬
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="bg-bone-cream py-5xl">
        <div className="section-container">
          <h2 className="text-display text-4xl text-center text-midnight mb-3xl">
            Preguntas Frecuentes
          </h2>

          <div className="max-w-3xl mx-auto space-y-lg">
            <div className="bg-canvas-light p-xl rounded-lg border-2 border-midnight">
              <h3 className="text-display text-lg text-fire-red mb-sm">
                ¿Cuál es el tiempo de entrega?
              </h3>
              <p className="text-base text-charcoal">
                Los pedidos se procesan en 24-48 horas hábiles. El tiempo de
                entrega varía según tu ubicación: CABA 1-2 días, GBA 2-3 días,
                Interior 3-5 días.
              </p>
            </div>

            <div className="bg-canvas-light p-xl rounded-lg border-2 border-midnight">
              <h3 className="text-display text-lg text-fire-red mb-sm">
                ¿El envío es gratis?
              </h3>
              <p className="text-base text-charcoal">
                Sí! Ofrecemos envío gratis en todas las compras superiores a
                $15.000. Para compras menores, el costo de envío se calcula en
                el checkout.
              </p>
            </div>

            <div className="bg-canvas-light p-xl rounded-lg border-2 border-midnight">
              <h3 className="text-display text-lg text-fire-red mb-sm">
                ¿Cómo debo conservar el charqui?
              </h3>
              <p className="text-base text-charcoal">
                Una vez abierto, guardalo en un lugar fresco y seco. Podés
                refrigerarlo para mayor duración. Cerrado dura hasta 6 meses,
                abierto recomendamos consumirlo en 2-3 semanas.
              </p>
            </div>

            <div className="bg-canvas-light p-xl rounded-lg border-2 border-midnight">
              <h3 className="text-display text-lg text-fire-red mb-sm">
                ¿Hacen envíos al interior del país?
              </h3>
              <p className="text-base text-charcoal">
                ¡Sí! Enviamos a todo el país. Utilizamos correo confiable y te
                proporcionamos el número de seguimiento para que rastrees tu
                pedido.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-container py-4xl">
        <div className="bg-fire-red text-canvas-light p-4xl rounded-xl text-center border-brutal">
          <h2 className="text-display text-4xl mb-md">¿Preferís Llamar?</h2>
          <p className="text-xl mb-xl">Hablá directamente con nuestro equipo</p>
          <a href="tel:+56912345678" className="btn-primary bg-midnight">
            +56 9 1234-5678
          </a>
        </div>
      </section>
    </div>
  );
}
