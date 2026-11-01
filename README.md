# Fluxbeats (Catálogo de Beats)

## Descripción

Landing page moderna diseñada para exhibir instrumentales y presentar un catálogo musical de beats a clientes. El objetivo es ofrecer a oyentes y artistas una experiencia fluida e inmersiva para escuchar pistas con streaming optimizado, conocer las opciones de licencias disponibles y establecer contacto directo bajo una interfaz rápida, limpia y accesible.

## Características

- **Reproductor de audio continuo**: MiniPlayer global persistente con barra de progreso accesible, control de volumen y reproducción fluida.
- **Streaming de audio de baja latencia**: Catálogo optimizado con streaming de pistas de alta fidelidad servidas desde Cloudflare R2.
- **Licencias y términos claros**: Comparativa detallada de derechos de uso comercial, formatos incluidos (MP3, WAV, Stems) y límites de distribución.
- **Formulario de contacto seguro**: Sistema de mensajería protegido contra bots con Cloudflare Turnstile, rate limiting en memoria edge y envío transaccional vía Resend.
- **Accesibilidad web (WCAG 2.1 AA)**: Interfaz auditada con Axe-core, con contraste de color garantizado, navegación por teclado y etiquetas para lectores de pantalla.
- **Modo oscuro y claro**: Sistema de temas con tokens de alto contraste implementados en Tailwind CSS.
- **Internacionalización**: Soporte bilingüe completo en español e inglés.

## Secciones

1. **Inicio**: Portada interactiva con introducción directa y acceso rápido a las pistas destacadas.
2. **Catálogo de Beats**: Explorador de instrumentales con metadatos (BPM, tonalidad, género), reproductor integrado y selección de licencia.
3. **Licencias y Precios**: Resumen claro que explica los diferentes formatos y derechos comerciales disponibles.
4. **Contacto**: Formulario validado para cotizaciones personalizadas, comisiones y adquisición directa de licencias.

## Uso

- **Visualizar Contenido**: La plataforma ya está activa y puedes explorarla aquí: [Fluxbeats](https://fluxbeats.mgdc.site/).
- **Escuchar Pistas**: Desplázate al catálogo de instrumentales y pulsa reproducir; el reproductor inferior permite pausar, ajustar volumen y adelantar la pista.
- **Adquirir Licencias**: Selecciona el plan adecuado y contacta directamente a través del formulario para coordinar la entrega.
- **Enviar Mensaje**: Completa el formulario de contacto con tu nombre, correo y detalles de tu consulta o solicitud; el sistema valida la seguridad y procesa el envío de inmediato.

## Tecnologías Utilizadas

- **Frontend**: React 19, Vite 8, Tailwind CSS 4, Zustand 5, Lucide React
- **Backend**: Cloudflare Pages Functions (Hono Edge API)
- **Almacenamiento & Streaming**: Cloudflare R2
- **Seguridad**: Cloudflare Turnstile CAPTCHA, Rate Limiting en memoria Edge
- **Servicios**: Resend (email transaccional)
- **Testing**: Vitest (Unitario), Playwright (E2E y Regresión Visual), @axe-core/playwright (Accesibilidad WCAG 2.1 AA)
- **Herramientas**: Bun, Biome, TypeScript
- **Infra & CI/CD**: Cloudflare Pages, GitHub Actions


## Despliegue

La plataforma está construida para ofrecer la máxima velocidad con streaming de baja latencia y se encuentra desplegada de forma global a través de Cloudflare Pages. Puedes usarla directamente aquí: [Fluxbeats](https://fluxbeats.mgdc.site/)

## Licencia

[MIT](LICENSE) © 2026 Ivan Cruz
