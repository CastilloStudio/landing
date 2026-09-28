---
orden: 4
nombre: Trastienda
titular: Una tienda online que ya sabe vender en España
resumen: >-
  Base propia de comercio electrónico sobre la que se monta la tienda de cada
  cliente: catálogo, carrito, pago y cuenta de cliente, más lo que ningún motor
  trae resuelto para España. IVA con sus tres tipos, textos legales,
  desistimiento en línea y correos, todo en castellano.
sector: Producto propio · Comercio electrónico
aprendizaje: >-
  Lo que es igual en todas las tiendas —impuestos, pedidos, legal— se resuelve
  una vez. Cada cliente paga por lo que tiene de distinto, no por volver a hacer
  lo mismo.
stack:
  - Medusa v2
  - Next.js
  - TypeScript
  - PostgreSQL
  - Stripe
  - Playwright
hitos:
  - dato: 21 · 10 · 4
    pie: Los tres tipos de IVA, con el precio tal como lo paga el cliente
  - dato: 14 días
    pie: Desistimiento en línea, sin cuenta ni llamadas, con acuse por correo
  - dato: Probada
    pie: Cada cambio pasa una compra completa y pruebas de accesibilidad
---

El motor es Medusa, de código abierto: pedidos, devoluciones, promociones e
inventario no se escriben de memoria. Encima va lo que hace falta para abrir en
España: precios con IVA incluido y desglose por tipo, condiciones de venta cuya
versión aceptada queda guardada en cada pedido, aviso legal, privacidad y
cookies, y un formulario de desistimiento que registra la devolución sin que el
cliente tenga que llamar a nadie.

Cada tienda es una copia propia, con su base de datos y su despliegue, y con el
aspecto y los datos del titular en un único fichero. El escaparate cambia de un
cliente a otro; la trastienda, que es lo que no se ve, es la misma en todas.
