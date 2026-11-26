# Manual en español — GHL Developer Toolkit

## Alcance real
15 soluciones de ejemplo para páginas y embudos de GoHighLevel (HighLevel). Incluye HTML/CSS/JavaScript para usar en bloques Custom Code y guías de integración. **No se importan como snapshot ni se instalan como plugin oficial.**

## Instalación
1. Usa una subcuenta de pruebas. En Sites → Funnels → paso del embudo, agrega un elemento **Custom HTML / Code**.
2. Pega el archivo `index.html` del módulo deseado.
3. Añade el contenido de `assets/scalex.css` y `assets/scalex.js` en la cabecera/código personalizado de la página, según la configuración disponible.
4. Sustituye URLs de ejemplo, planes de demostración y teléfonos ficticios.
5. Prueba en escritorio y móvil, con el paso siguiente del embudo, formularios reales y automatizaciones configuradas.

## Prioridades de integración
- El código HTML por sí solo **no registra contactos** en el CRM de GHL.
- Para guardar datos de un formulario real, utiliza formulario nativo, campos personalizados y workflows de GHL; consulta la guía `forms/custom-fields-manager/`.
- Los códigos de checkout **no comprueban pagos**, solo redirigen a un enlace HTTPS configurado.
- Jamás uses mensajes masivos de WhatsApp sin consentimiento verificable.
- No se solicita información bancaria en nuestros componentes.

## Diferencia respecto de una solución completa
Estos son componentes abiertos y ajustables; compatibilidad exacta depende de la versión del editor, reglas de CSP, planes, permisos y configuración de GHL/Bold. No han sido ensayados contra una cuenta GHL real en esta publicación.

Consulta [catálogo](COMPONENTS.md), [seguridad](SECURITY.md) y [ejemplos](../examples/).
