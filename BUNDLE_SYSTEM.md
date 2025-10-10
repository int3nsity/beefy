# Sistema de Cajas Personalizables (7 Unidades) - Beefy

## 📦 Descripción General

Sistema completo para que los clientes armen su propia caja eligiendo 7 unidades de diferentes sabores de Beefy. El sistema incluye:

- ✅ Selector visual de sabores con control de cantidades
- ✅ Validación en tiempo real (exactamente 7 unidades)
- ✅ Indicador de progreso y feedback visual
- ✅ Integración completa con Shopify Cart API
- ✅ Agrupación visual de bundles en el carrito
- ✅ Selección aleatoria de sabores
- ✅ Recordar última caja (localStorage)
- ✅ Diseño responsive con UI moderna
- ✅ Analytics tracking

---

## 🛠️ Configuración en Shopify

### 1. Crear Producto Bundle

En tu Shopify Admin:

1. Ve a **Productos** → **Agregar producto**
2. Configura el producto:
   - **Título**: `Arma tu caja (7 un)`
   - **Handle**: `arma-tu-caja-7-un` (importante: debe coincidir con el código)
   - **Precio**: Define el precio fijo del bundle (ej: $15.990)
   - **Descripción**: Texto descriptivo del bundle
   - **Imágenes**: Sube imágenes atractivas de la caja
3. Guarda el producto

### 2. Crear/Verificar Colección de Sabores

1. Ve a **Productos** → **Colecciones** → **Crear colección**
2. Configura:
   - **Título**: `Sabores` (o el nombre que prefieras)
   - **Handle**: `sabores` (importante: debe coincidir con el código)
   - **Tipo**: Manual o Automática
3. Agrega todos los productos de sabores individuales a esta colección
4. **Importante**: NO agregues el producto "Arma tu caja" a esta colección

### 3. Productos de Sabores Individuales

Asegúrate de que cada sabor tenga:
- ✅ SKU único
- ✅ Tracking de inventario habilitado
- ✅ Precio individual configurado
- ✅ Imagen de producto de calidad
- ✅ Al menos una variante disponible

---

## 📁 Archivos Creados

### Componentes

1. **`app/components/FlavorSelector.tsx`**
   - Selector individual de sabor
   - Botones +/- para controlar cantidad
   - Indicadores de stock disponible
   - Feedback visual cuando está seleccionado

2. **`app/components/BundleBuilder.tsx`**
   - Componente contenedor principal
   - Maneja el estado global de selecciones
   - Validación de 7 unidades exactas
   - Funciones: random, limpiar, recordar última caja
   - Integración con Cart API

3. **`app/components/CartLineItem.tsx`** (modificado)
   - Detecta items que son parte de un bundle
   - Muestra badge visual "📦 Caja de 7"
   - Estilo diferenciado para items del bundle

4. **`app/components/CartMain.tsx`** (modificado)
   - Agrupa items del bundle visualmente
   - Link para editar la caja
   - Separa productos regulares de bundles

### Rutas

5. **`app/routes/($locale).products.arma-tu-caja.tsx`**
   - Página dedicada del bundle builder
   - Queries GraphQL para obtener datos
   - Hero section atractiva
   - Layout responsive

---

## 🔧 Configuración del Código

### Handles Importantes

Si tus productos tienen handles diferentes, actualiza estos valores:

**En `app/routes/($locale).products.arma-tu-caja.tsx`:**

```typescript
// Línea ~31
storefront.query(BUNDLE_PRODUCT_QUERY, {
  variables: {
    handle: 'arma-tu-caja-7-un', // ⬅️ Cambia esto por tu handle real
  },
}),

// Línea ~37
storefront.query(FLAVORS_COLLECTION_QUERY, {
  variables: {
    handle: 'sabores', // ⬅️ Cambia esto por tu handle de colección
    first: 50, // Ajusta según cuántos sabores tengas
  },
}),
```

### Tamaño del Bundle

Para cambiar de 7 a otro número de unidades:

**En `app/routes/($locale).products.arma-tu-caja.tsx` (línea ~109):**

```typescript
<BundleBuilder
  bundleProduct={bundleProduct}
  availableFlavors={availableFlavors}
  bundleSize={7} // ⬅️ Cambia este número
/>
```

---

## 🎨 Personalización de Estilos

Todos los componentes usan el Design System existente de Beefy:

### Colores principales usados:
- `fire-red` - Color principal del brand
- `bone-cream` - Fondo secundario
- `midnight` - Bordes oscuros
- `canvas-light` - Fondo claro

### Clases de utilidad:
- `shadow-brutal-sm/lg` - Sombras neo-brutalistas
- `text-display` - Tipografía Bebas Neue para títulos
- `btn-primary/secondary/outline` - Estilos de botones

---

## 🚀 Características Implementadas

### ✅ Fase 1-7 (Core Features)

1. **Selector de Sabores**
   - Grid responsive (1-4 columnas según pantalla)
   - Botones +/- intuitivos
   - Badge de cantidad visible
   - Indicadores de stock en tiempo real

2. **Validación**
   - Total debe ser exactamente 7 unidades
   - No permite exceder el límite
   - Feedback visual claro (colores, mensajes)
   - Deshabilita botón si no está completo

3. **Progreso Visual**
   - Contador X/7
   - Barra de progreso animada
   - Estados: incompleto, completo, excedido
   - Colores contextuales

4. **Carrito Mejorado**
   - Items del bundle agrupados visualmente
   - Badge "📦 Caja de 7"
   - Link para editar combinación
   - Separación de productos regulares

5. **Features Adicionales**
   - 🎲 **Sorprendeme**: Selección aleatoria de 7 unidades
   - ⏮️ **Repetir última caja**: Carga la última combinación guardada
   - 🗑️ **Limpiar**: Reinicia la selección
   - 💾 **Auto-save**: Guarda automáticamente en localStorage

### 🔄 Funcionalidades Técnicas

- **Optimistic UI**: AddToCartButton con feedback inmediato
- **Tracking de inventario**: Muestra disponibilidad real
- **Atributos personalizados**: Identifica items del bundle en el carrito
- **Bundle ID único**: Agrupa items correctamente
- **Mobile-first**: Sticky footer en mobile para mejor UX

---

## 📊 Estructura de Datos

### Atributos del Carrito

Cada item del bundle incluye estos atributos:

```typescript
attributes: [
  {key: '_bundle', value: 'Caja de 7'},
  {key: '_bundle_id', value: 'bundle-1234567890'},
]
```

Esto permite:
- Identificar items que son parte de un bundle
- Agrupar items del mismo bundle
- Mostrar UI diferenciada en el carrito

### LocalStorage

Se guarda en: `beefy_last_box`

Formato:
```json
{
  "gid://shopify/Product/123": {
    "variantId": "gid://shopify/ProductVariant/456",
    "quantity": 2
  },
  "gid://shopify/Product/789": {
    "variantId": "gid://shopify/ProductVariant/101",
    "quantity": 5
  }
}
```

---

## 🧪 Testing Manual

### Checklist de Pruebas

- [ ] Página carga correctamente en `/products/arma-tu-caja`
- [ ] Se muestran todos los sabores de la colección
- [ ] Botones +/- funcionan correctamente
- [ ] No permite exceder 7 unidades
- [ ] Botón "Agregar al Carrito" se habilita solo con 7 unidades exactas
- [ ] Items se agregan al carrito con atributos correctos
- [ ] Items del bundle se muestran agrupados en el carrito
- [ ] Link "Editar" en el carrito funciona
- [ ] "Sorprendeme" genera selección aleatoria válida
- [ ] "Repetir última caja" carga la selección guardada
- [ ] Responsive funciona en mobile/tablet/desktop
- [ ] Indicadores de stock son precisos

---

## 🔗 URLs y Navegación

### Acceso al Bundle Builder

- **URL directa**: `/products/arma-tu-caja`
- **Desde colecciones**: Agregar link manual en menú o banner
- **Desde home**: Agregar CTA destacado

### Sugerencia de Link en Header

Agrega en `app/components/Header.tsx`:

```tsx
<Link
  to="/products/arma-tu-caja"
  className="btn-primary"
>
  🥩 Armá tu Caja
</Link>
```

---

## 🐛 Troubleshooting

### El bundle no carga / 404

**Problema**: Handle incorrecto en Shopify o código

**Solución**:
1. Verifica el handle del producto en Shopify Admin
2. Actualiza el handle en `($locale).products.arma-tu-caja.tsx` (línea 31)

### No se muestran sabores

**Problema**: Handle de colección incorrecto o colección vacía

**Solución**:
1. Verifica que la colección existe y tiene productos
2. Actualiza el handle en `($locale).products.arma-tu-caja.tsx` (línea 37)
3. Aumenta el `first: 50` si tienes más de 50 sabores

### Items no se agrupan en el carrito

**Problema**: Los atributos no se están enviando correctamente

**Solución**:
1. Verifica que `BundleBuilder` está generando `cartLines` con atributos
2. Revisa la consola del navegador por errores
3. Asegúrate de que `CartMain` está importando correctamente `useMemo`

### "Repetir última caja" no funciona

**Problema**: localStorage bloqueado o datos corruptos

**Solución**:
1. Abre DevTools → Application → Local Storage
2. Busca `beefy_last_box`
3. Elimínalo y prueba de nuevo
4. Verifica que localStorage esté habilitado en el navegador

---

## 📈 Próximas Mejoras (Opcional)

### Fase 8 - Features Avanzadas

- [ ] **Presets**: "Mix Clásico", "Picantes", "Suaves"
- [ ] **Compartir combinación**: Generate shareable URL
- [ ] **Descuentos por bundle**: Aplicar código automático

### Fase 9 - Testing

- [ ] Tests unitarios para validaciones
- [ ] Tests de integración del flujo completo
- [ ] Tests de performance (Lighthouse)

### Fase 10 - Analytics

- [ ] Tracking de sabores más elegidos
- [ ] Combinaciones más populares
- [ ] Tasa de conversión del bundle vs productos individuales
- [ ] Abandono del proceso

---

## 💡 Tips de Marketing

1. **Destacar el Ahorro**: Muestra el precio individual vs bundle
2. **Social Proof**: "Top 5 combinaciones de la semana"
3. **Urgencia**: "Solo quedan X unidades del sabor más popular"
4. **Email**: "Completá tu caja que dejaste sin terminar"
5. **Cross-sell**: Sugerir el bundle en páginas de productos individuales

---

## 🆘 Soporte

Si necesitas ayuda adicional:

1. Revisa los comentarios en el código
2. Consulta el `DESIGN_SYSTEM.md` para estilos
3. Revisa las GraphQL queries en la ruta del bundle
4. Usa las DevTools del navegador para debugging

---

## ✅ Checklist de Implementación

- [x] Componentes creados
- [x] Queries GraphQL implementadas
- [x] Página del bundle configurada
- [x] Integración con carrito
- [x] Visualización mejorada en carrito
- [x] Features avanzadas (random, localStorage)
- [x] Responsive design
- [ ] **Configurar handles en Shopify** ⬅️ PENDIENTE
- [ ] **Probar flujo completo** ⬅️ PENDIENTE
- [ ] **Agregar links de navegación** ⬅️ PENDIENTE

---

**¡El sistema está listo para usar! Solo falta configurar los handles correctos en Shopify y probar el flujo completo.** 🎉

