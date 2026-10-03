#!/usr/bin/env bash
# Trae el manual del panel de Trastienda a la web: el texto y sus capturas.
#
#   npm run manual:trastienda                  desde ../trastienda
#   npm run manual:trastienda -- <ruta>        desde otro clon
#
# El manual se escribe en el repositorio de Trastienda (docs/manual/), al lado
# del código que describe, y aquí solo se copia. No se edita en esta copia: la
# siguiente vez que se traiga, se pisa. Se publica en
# /casos/trastienda/manual/ con el próximo despliegue.
set -euo pipefail

raiz="$(cd "$(dirname "$0")/.." && pwd)"
origen="${1:-$raiz/../trastienda}/docs/manual"
destino="$raiz/src/content/manuales/trastienda"

if [[ ! -f "$origen/manual.md" ]]; then
  echo "No encuentro $origen/manual.md. Pásale la ruta del clon de Trastienda." >&2
  exit 1
fi

rm -rf "$destino"
mkdir -p "$destino"
cp "$origen/manual.md" "$destino/manual.md"
cp -R "$origen/imagenes" "$destino/imagenes"

version="$(git -C "$origen" log -1 --format='%h %cs' -- . 2>/dev/null || echo 'sin git')"
echo "Manual traído ($version): $(ls "$destino/imagenes" | wc -l | tr -d ' ') capturas."
echo "Revisa con npm run dev (http://localhost:4321/casos/trastienda/manual/) y haz commit."
