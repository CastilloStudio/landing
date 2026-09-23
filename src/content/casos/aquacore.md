---
orden: 1
nombre: AquaCore
titular: Del sensor al panel, sin intermediarios
resumen: >-
  Ecosistema IoT para monitorizar y automatizar acuarios. Controladores propios
  basados en ESP32 que hablan por MQTT sobre TLS con una plataforma cloud
  también propia: telemetría en tiempo real, control de calentadores, bombas y
  enchufes, y actualización de firmware en remoto.
sector: Producto propio · IoT
aprendizaje: >-
  Tres capas que normalmente reparten tres proveedores distintos —placa,
  firmware y nube— diseñadas juntas, así que encajan.
stack:
  - ESP32
  - MQTT / TLS
  - PostgreSQL
  - Next.js
  - KiCad
  - CI/CD
hitos:
  - dato: 3 productos
    pie: Lite, Terra y Pro sobre la misma plataforma
  - dato: En remoto
    pie: Los equipos se actualizan solos, sin ir a desmontarlos
  - dato: Desde el móvil
    pie: Se pone en marcha con el teléfono, sin cables ni ordenador
web: https://aquacorelabs.es
---

El hardware se diseña en KiCad y se fabrica a medida; el firmware se publica con
su propio canal de releases; el panel y la web pública comparten monorepo con el
control plane. Un cambio de sensor llega a la gráfica del panel sin pasar por
ninguna integración de terceros.

La consecuencia práctica es el soporte: cuando algo falla, no hay tres empresas
señalándose entre ellas.
