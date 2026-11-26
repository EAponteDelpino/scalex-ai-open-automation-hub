# Guía en español

ScaleX AI Open Automation Hub incluye **30 flujos de demostración importables en n8n** y **10 plantillas de agentes de IA**. El objetivo es compartir ejemplos claros, reutilizables y auditables.

## Instalación

1. Instala una versión reciente compatible de n8n en un entorno de pruebas.
2. Importa un archivo JSON desde `workflows/n8n/`.
3. Abre el nodo Webhook y usa su URL de prueba para enviar un JSON mediante POST.
4. Comprueba la respuesta del nodo Respond to Webhook. Verifica la salida y ajusta las reglas al caso real.
5. Antes de activar en producción, añade autenticación, control de errores, límites de solicitudes y monitoreo.

## Alcance

Estos flujos **no** se conectan automáticamente a WhatsApp, GoHighLevel, Shopify, Meta Ads ni servicios de IA. Las plantillas de agentes no están desplegadas. No se prometen conversiones ni resultados comerciales.

## Ejemplo de entrada

```json
{"name":"Ana","email":"ANA@example.com","source":"instagram","consent":true}
```

**Privacidad:** usa datos ficticios en las pruebas, evita almacenar información sensible y consigue autorización antes de contactar personas. Para WhatsApp, comprueba opt-in y políticas de plantillas de Meta.
