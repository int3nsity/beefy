# 🧪 Testing Manual - Sistema de Cajas Personalizables

## ✅ Checklist Completo de Testing

### 1. Configuración Inicial

- [ ] El producto "Arma tu caja (7 un)" existe en Shopify
- [ ] El handle del producto es `arma-tu-caja-7-un`
- [ ] La colección "Sabores" existe y tiene productos
- [ ] El handle de la colección es `sabores`
- [ ] Los handles en el código coinciden con Shopify

### 2. Carga de Página

**URL**: `/products/arma-tu-caja`

- [ ] La página carga sin errores 404
- [ ] Se muestra el título "Armá tu Caja Perfecta"
- [ ] Se muestra el hero section con gradiente rojo
- [ ] Se cargan todos los sabores de la colección
- [ ] Cada sabor muestra: imagen, título, precio
- [ ] El grid es responsive (prueba en diferentes tamaños)

### 3. Selector de Sabores

**Funcionalidad básica:**

- [ ] Los botones +/- son visibles y están habilitados
- [ ] Click en + aumenta la cantidad
- [ ] Click en - disminuye la cantidad
- [ ] La cantidad se muestra correctamente en el centro
- [ ] El badge de cantidad aparece cuando quantity > 0
- [ ] El borde rojo aparece cuando un sabor está seleccionado

**Validaciones:**

- [ ] No puedo agregar más de 7 unidades en total
- [ ] El botón + se deshabilita cuando total = 7
- [ ] El botón - se deshabilita cuando quantity = 0
- [ ] Los indicadores de stock son precisos:
  - [ ] "✓ Disponible" para stock alto
  - [ ] "⚠️ ¡Solo quedan X!" para stock bajo (≤10)
  - [ ] "❌ Sin stock" para productos no disponibles

### 4. Contador de Progreso

**Indicador visual:**

- [ ] Muestra "X / 7" correctamente
- [ ] La barra de progreso se llena proporcionalmente
- [ ] Color verde cuando total = 7
- [ ] Color rojo cuando total > 7
- [ ] Color rojo (fire-red) cuando total < 7

**Mensajes:**

- [ ] "Faltan X unidades" cuando total < 7
- [ ] "✓ ¡Completado!" cuando total = 7
- [ ] "⚠️ Te pasaste por X" cuando total > 7
- [ ] Warning box rojo aparece cuando total > 7

### 5. Botones de Acción

**Sorprendeme (🎲):**

- [ ] Genera una selección aleatoria válida (total = 7)
- [ ] Respeta productos disponibles (no selecciona sin stock)
- [ ] La distribución es variada (no siempre la misma)

**Repetir última caja (⏮️):**

- [ ] Solo aparece si hay una caja guardada
- [ ] Solo aparece cuando totalSelected = 0
- [ ] Carga correctamente la selección guardada
- [ ] Valida que los productos aún existan

**Limpiar (🗑️):**

- [ ] Solo aparece cuando totalSelected > 0
- [ ] Limpia toda la selección
- [ ] El contador vuelve a 0/7

### 6. Agregar al Carrito

**Botón principal:**

- [ ] Está deshabilitado cuando total ≠ 7
- [ ] Está habilitado solo cuando total = 7
- [ ] Muestra "Seleccioná X más" cuando incompleto
- [ ] Muestra "Reducí tu selección" cuando excedido
- [ ] Muestra "🛒 Agregar al Carrito" cuando listo

**Funcionalidad:**

- [ ] Click agrega los 7 items al carrito
- [ ] Abre el aside del carrito automáticamente
- [ ] Los items tienen atributos `_bundle` y `_bundle_id`
- [ ] La cantidad de items en el header se actualiza

### 7. Visualización en Carrito

**Agrupación:**

- [ ] Items del bundle aparecen agrupados
- [ ] Tienen badge "📦 Caja de 7"
- [ ] Están en un contenedor con borde rojo
- [ ] Tienen badge "📦" en la imagen
- [ ] El fondo es diferente (fire-red/5)

**Link de edición:**

- [ ] Aparece el link "✏️ Editar"
- [ ] Click redirige a `/products/arma-tu-caja`
- [ ] La página mantiene el aside abierto

**Items regulares:**

- [ ] Se separan visualmente de los bundles
- [ ] Aparecen debajo de los bundles
- [ ] No tienen el estilo de bundle

### 8. LocalStorage

**Guardar:**

- [ ] La selección se guarda automáticamente
- [ ] Se guarda en `beefy_last_box`
- [ ] El formato es JSON válido
- [ ] Incluye productId, variantId y quantity

**Cargar:**

- [ ] "Repetir última caja" carga la selección
- [ ] Valida que los productos existan
- [ ] Ignora productos que ya no están disponibles
- [ ] Funciona después de cerrar/abrir el navegador

### 9. Responsive Design

**Mobile (< 640px):**

- [ ] Grid muestra 1 columna
- [ ] Botones de acción son táctiles (tamaño adecuado)
- [ ] El footer con precio/botón es sticky
- [ ] No hay scroll horizontal
- [ ] Imágenes cargan correctamente

**Tablet (640px - 1024px):**

- [ ] Grid muestra 2 columnas
- [ ] Layout se ajusta bien
- [ ] Botones tienen buen tamaño

**Desktop (> 1024px):**

- [ ] Grid muestra 3-4 columnas
- [ ] Espaciado es adecuado
- [ ] No hay elementos cortados

### 10. Performance

**Carga inicial:**

- [ ] Página carga en < 3 segundos
- [ ] Imágenes usan lazy loading
- [ ] No hay parpadeos visuales
- [ ] No hay errores en la consola

**Interacciones:**

- [ ] Botones +/- responden instantáneamente
- [ ] Barra de progreso se anima suavemente
- [ ] No hay lag al seleccionar sabores
- [ ] El carrito se actualiza sin recargar la página

### 11. Analytics (si tienes GA configurado)

**Eventos rastreados:**

- [ ] `bundle_flavor_selected` - cuando seleccionas un sabor
- [ ] `bundle_random_selection` - click en "Sorprendeme"
- [ ] `bundle_load_last_box` - click en "Repetir última caja"
- [ ] `bundle_completed` - cuando agregas al carrito
- [ ] `bundle_combination` - combinación de sabores elegida

**Verificar en GA:**

- [ ] Los eventos aparecen en tiempo real
- [ ] Los labels son correctos
- [ ] Los values son precisos

### 12. Edge Cases

**Casos extremos:**

- [ ] Selecciono 0 unidades → botón deshabilitado
- [ ] Selecciono exactamente 7 → botón habilitado
- [ ] Selecciono 8 unidades → warning aparece
- [ ] Todos los sabores sin stock → mensaje apropiado
- [ ] Solo 1 sabor disponible → puedo elegir 7 de ese
- [ ] LocalStorage lleno → maneja el error gracefully
- [ ] Sin conexión → muestra error apropiado

**Navegación:**

- [ ] Back/Forward del navegador funciona
- [ ] Refresh mantiene los datos de Shopify
- [ ] LocalStorage persiste entre sesiones
- [ ] Puedo volver al builder desde el carrito

### 13. Compatibilidad de Navegadores

Probar en:

- [ ] Chrome (última versión)
- [ ] Firefox (última versión)
- [ ] Safari (última versión)
- [ ] Edge (última versión)
- [ ] Safari iOS (iPhone)
- [ ] Chrome Android

### 14. Accesibilidad

**Básico:**

- [ ] Puedo navegar con teclado (Tab)
- [ ] Los botones tienen aria-labels
- [ ] El contraste de texto es adecuado
- [ ] Screen readers pueden leer el contenido

## 🐛 Registro de Bugs

Si encuentras bugs, documéntalos aquí:

### Bug 1
- **Descripción**: 
- **Pasos para reproducir**: 
- **Comportamiento esperado**: 
- **Comportamiento actual**: 
- **Navegador**: 
- **Fecha**: 

---

## ✅ Firma de Aprobación

**Testeado por**: _______________

**Fecha**: _______________

**Resultado**: ☐ Aprobado  ☐ Con issues menores  ☐ Requiere correcciones

**Notas**: _______________________________________________

_______________________________________________

_______________________________________________

