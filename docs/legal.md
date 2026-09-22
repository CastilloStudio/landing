# Borrador de aviso legal y privacidad

Textos preparados, **sin publicar**. No hay empresa todavía, así que no hay
titular, NIF ni domicilio que poner, y un aviso legal con huecos es peor que
ninguno.

## Cuándo hacen falta

El artículo 10 de la LSSI-CE obliga a identificar al prestador cuando hay
**actividad económica**. Mientras la web solo presente el estudio y no se
contrate nada por ella, no aplica. En el momento en que te des de alta como
autónomo o constituyas la sociedad, sí:

- Nombre y apellidos o razón social
- NIF
- Domicilio a efectos de notificaciones
- Correo de contacto

Si sigues como persona física, ese domicilio y ese NIF son los tuyos
personales y quedan publicados. Es una razón legítima para no correr.

La política de privacidad sí tiene sentido antes, en cuanto haya formulario:
el `mailto:` actual no recoge datos, los recoge tu bandeja de correo.

## Cómo se activan

Los textos completos están en el historial de git, en el commit que los
introdujo. Para recuperarlos:

```bash
git log --all --diff-filter=A -- src/pages/aviso-legal.astro
git show <commit>:src/pages/aviso-legal.astro
```

`src/layouts/Legal.astro` se queda en el repo, listo para cuando toque.
