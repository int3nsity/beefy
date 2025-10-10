# 🚀 Quick Start - Sistema de Cajas Personalizables

## ⚡ Configuración Rápida (5 minutos)

### 1. En Shopify Admin

**Crear producto bundle:**
- Título: `Arma tu caja (7 un)`
- Handle: `arma-tu-caja-7-un`
- Precio: Define tu precio (ej: $15.990)

**Crear/verificar colección:**
- Título: `Sabores`
- Handle: `sabores`
- Agregar todos los productos de sabores individuales
- ⚠️ NO agregues el producto "Arma tu caja" a esta colección

### 2. Verificar Handles en el Código

Abre `app/routes/($locale).products.arma-tu-caja.tsx` y verifica:

```typescript
// Línea ~31 - Handle del producto bundle
handle: 'arma-tu-caja-7-un', // ⬅️ debe coincidir con Shopify

// Línea ~37 - Handle de la colección
handle: 'sabores', // ⬅️ debe coincidir con Shopify
```

### 3. Probar

Visita: `http://localhost:3000/products/arma-tu-caja`

---

## ✅ Checklist de Verificación

- [ ] Producto "Arma tu caja (7 un)" creado en Shopify
- [ ] Handle del producto es `arma-tu-caja-7-un`
- [ ] Colección "Sabores" existe con productos
- [ ] Handle de colección es `sabores`
- [ ] Handles coinciden en el código
- [ ] Página carga sin errores
- [ ] Se muestran los sabores correctamente
- [ ] Puedo seleccionar exactamente 7 unidades
- [ ] Items se agregan al carrito agrupados

---

## 🎯 Flujo de Usuario

1. Cliente visita `/products/arma-tu-caja`
2. Ve todos los sabores disponibles en un grid
3. Usa botones +/- para seleccionar cantidades (total = 7)
4. Ve progreso en tiempo real (X/7)
5. Click en "Agregar al Carrito" (solo activo con 7 unidades exactas)
6. Items se agregan al carrito agrupados como "📦 Caja de 7"
7. Puede editar desde el carrito con link "✏️ Editar"

---

## 🎨 Features Incluidas

- ✅ Selector visual de sabores
- ✅ Validación de 7 unidades exactas
- ✅ Indicadores de stock en tiempo real
- ✅ Progreso visual con barra animada
- ✅ Botón "🎲 Sorprendeme" (random)
- ✅ Botón "⏮️ Repetir última caja" (localStorage)
- ✅ Botón "🗑️ Limpiar" selección
- ✅ Agrupación visual en carrito
- ✅ Link para editar desde carrito
- ✅ Responsive (mobile/tablet/desktop)
- ✅ Auto-save de última selección

---

## 🛠️ Comandos Útiles

```bash
# Instalar dependencias (si es necesario)
yarn install

# Desarrollo local
yarn dev

# Build para producción
yarn build

# Generar tipos de GraphQL (si cambias queries)
yarn shopify hydrogen typegen
```

---

## 📱 URLs Importantes

- **Bundle Builder**: `/products/arma-tu-caja`
- **Colección de sabores**: `/collections/sabores`
- **Carrito**: `/cart`

---

## 🐛 Problemas Comunes

### 404 en `/products/arma-tu-caja`

**Causa**: Handle del producto no coincide

**Solución**:
1. Ve a Shopify Admin → tu producto
2. Mira el handle en la URL (ej: `/products/arma-tu-caja-7-un`)
3. Actualiza en el código (línea 31 del archivo de ruta)

### No se muestran sabores

**Causa**: Handle de colección no coincide o está vacía

**Solución**:
1. Ve a Shopify Admin → Colecciones
2. Verifica que la colección tenga productos
3. Mira el handle de la colección
4. Actualiza en el código (línea 37)

### Items no se agrupan en carrito

**Causa**: Atributos no se envían correctamente

**Solución**:
1. Limpia el carrito
2. Recarga la página
3. Vuelve a agregar items desde el bundle builder

---

## 📞 Archivos de Referencia

- `BUNDLE_SYSTEM.md` - Documentación completa
- `app/components/FlavorSelector.tsx` - Selector individual
- `app/components/BundleBuilder.tsx` - Lógica principal
- `app/components/CartMain.tsx` - Agrupación en carrito
- `app/routes/($locale).products.arma-tu-caja.tsx` - Página del bundle

---

## 🎉 ¡Listo!

El sistema está completo y funcional. Solo necesitas:
1. ✅ Configurar los handles correctos en Shopify
2. ✅ Verificar que coincidan en el código
3. ✅ Probar el flujo completo

**Si todo funciona, ¡ya puedes empezar a vender cajas personalizadas!** 🥩📦

