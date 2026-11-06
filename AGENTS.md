# AGENTS.md — Fluxbeats

Guía operativa y técnica para agentes de Inteligencia Artificial que colaboren en el desarrollo, mantenimiento y optimización de **Fluxbeats**.

## 1. Visión general

**Fluxbeats** es una landing page interactiva diseñada para la exhibición, streaming y presentación del catálogo de beats y licencias a clientes.

- **Propósito:** ofrecer a productores, artistas y clientes un catálogo interactivo con reproductor de audio continuo, tabla comparativa de licencias comerciales y un formulario de contacto seguro protegido contra spam para consultas y cotizaciones directas.
- **Dominio en producción:** [https://fluxbeats.mgdc.site](https://fluxbeats.mgdc.site)
- **CDN de assets (Cloudflare R2):** `https://assets.mgdc.site/fluxbeats`

## 2. Antes de tocar código

**CodeGraph** (índice de símbolos del repo): usa `codegraph_explore` (`query`, `maxFiles`, `projectPath`) antes de un grep masivo o de leer varios archivos; devuelve fuente verbatim, rutas de llamada e impacto.

- `codegraph sync /home/ivan/software-dev/fluxbeats` tras editar, pull o cambiar de rama (incremental, uso normal).
- `codegraph index /home/ivan/software-dev/fluxbeats` solo al crear el índice, tras `codegraph upgrade` o si `status` avisa `built by vX` (rebuild completo).
- `codegraph status /home/ivan/software-dev/fluxbeats` para comprobar el estado.

## 3. Stack tecnológico

| Capa | Tecnología | Versión / Detalle |
| :--- | :--- | :--- |
| **Runtime & Gestor** | **Bun** | `v1.3.x` (`bun.lock`) |
| **Lenguaje** | **TypeScript** | `^7.0.2` (Modo estricto con `tsconfig.app.json`) |
| **Frontend** | **React 19** | `react ^19.2.8`, `react-dom ^19.2.8` |
| **Bundler** | **Vite 8** | `vite ^8.2.2`, `@vitejs/plugin-react-swc ^4.3.3` |
| **Enrutador** | **React Router 7** | `react-router-dom ^7.18.3` |
| **Estilos** | **Tailwind CSS 4** | `@tailwindcss/vite ^4.3.3`, `tailwindcss ^4.3.3` |
| **Estado Global** | **Zustand 5** | `zustand ^5.0.15` (Slices modulares: `audioSlice.ts` y `uiSlice.ts`) |
| **Audio** | **react-use-audio-player** | `react-use-audio-player ^4.0.2` |
| **Backend / Edge** | **Hono** en Cloudflare Pages Functions | `hono ^4.13.5`, `@hono/zod-validator ^0.9.1` |
| **Validación & Anti-Spam** | **Zod 4** + **Cloudflare Turnstile** | `zod ^4.5.4`, `@marsidev/react-turnstile ^1.6.1` |
| **Servicio de Email** | **Resend** | `resend ^6.26.0` |
| **Linter & Formatter** | **Biome** | `@biomejs/biome ^2.5.12` |
| **Pruebas Unitarias** | **Vitest** + **Testing Library** | `vitest ^5.0.0` (80 tests unitarios y de componentes) |
| **Pruebas E2E & Smoke** | **Playwright** | `@playwright/test ^1.62.1` |
| **Accesibilidad (A11y)** | **@axe-core/playwright** | `@axe-core/playwright ^4.13.0` (WCAG 2.1 AA) |
| **Regresión Visual** | **Playwright Visual Snapshots** | Comparación de capturas de pantalla píxel por píxel |
| **Seguridad de Deps** | **Snyk** | `snyk ^1.1307.0` |
| **Infra & Edge** | **Cloudflare Pages, Workers & R2** | `wrangler ^4.129.0` (`wrangler.jsonc`) |
| **CI/CD** | **GitHub Actions** | Workflows modulares y composite actions en `.github/` |

## 4. Estructura del código

```plaintext
fluxbeats/
├── functions/                     → Backend Serverless (Pages Functions)
│   ├── _controllers/              → Controladores desacoplados de peticiones
│   │   └── contactController.ts   → Orquestador de contacto (rate limit, turnstile, email)
│   ├── _services/                 → Servicios con inyección de dependencias y tests
│   │   ├── EmailService.ts        → Envío con Resend (+ test)
│   │   ├── RateLimiter.ts         → Rate limit por IP en memoria (+ test)
│   │   └── TurnstileValidator.ts  → Verificación anti-bot (+ test)
│   ├── _shared/                   → Tipos e interfaces comunes
│   │   ├── contactSchema.ts       → Esquema Zod (+ test)
│   │   └── types.ts               → Interfaces DI y contratos de API
│   └── api/
│       └── [[route]].ts           → Entry point Hono (POST /api/contact) (+ test)
│
├── src/                           → Frontend React 19 SPA
│   ├── assets/                    → Recursos locales estáticos
│   ├── components/                → Componentes modulares por sección
│   │   ├── Beats/                 → Catálogo, BeatCard, MiniPlayer (+ tests)
│   │   ├── Contacto/              → Formulario con Turnstile (+ tests)
│   │   ├── Header/                → Navegación, logo y accesibilidad (+ test)
│   │   ├── Hero/                  → Sección principal con CTA (+ test)
│   │   ├── Licencias/             → Comparativa de licencias (+ test)
│   │   ├── SobreMi/               → Información del productor (+ test)
│   │   ├── Testimonios/           → Reseñas de artistas
│   │   ├── ui/                    → AuraBackground, LanguageSelector, ResponsiveImage, ThemeSelector
│   │   └── Footer/                → Enlaces y pie de página (+ test)
│   ├── config/                    → Configuración centralizada de assets R2
│   ├── data/                      → Datos estáticos (beats.ts)
│   ├── email/                     → Plantilla HTML de contacto (contact-template.ts)
│   ├── hooks/                     → Custom hooks (useKeyboardNav, etc.)
│   ├── i18n/                      → Diccionarios de traducción (ES / EN)
│   ├── pages/                     → Vistas principales (Home) y legales (Privacy, Terms)
│   ├── store/                     → Store Zustand compuesto (appStore.ts) y slices
│   ├── test/                      → Setup y utilidades para Vitest
│   ├── utils/                     → Formateadores de audio, moneda y texto
│   ├── App.tsx                    → Layout principal, rutas y audio element global
│   └── main.tsx                   → Punto de entrada React 19
│
├── tests/                         → Suites de Pruebas Automatizadas
│   ├── e2e/                       → Pruebas E2E completas con Playwright
│   │   ├── a11y.spec.ts           → Accesibilidad WCAG 2.1 AA con Axe-core
│   │   ├── audio.spec.ts          → Reproducción continua y MiniPlayer
│   │   ├── contacto.spec.ts       → Envío y validación de formulario
│   │   ├── i18n-theme.spec.ts     → Cambio de idioma y tema
│   │   ├── navegacion.spec.ts     → Navegación por anclas y rutas legales
│   │   ├── visual.spec.ts         → Pruebas de regresión visual
│   │   └── visual.spec.ts-snapshots/ → Baselines visuales de Chromium Linux
│   └── smoke/                     → Pruebas de humo de CI
│       └── smoke.spec.ts          → Carga rápida de páginas y estado HTTP 200
│
├── public/                        → Archivos públicos estáticos
│   └── _headers                   → Cabeceras de seguridad (CSP, HSTS) y cache
│
├── playwright.config.ts           → Configuración principal de Playwright
├── playwright.smoke.config.ts     → Configuración de pruebas smoke
└── wrangler.jsonc                 → Configuración de Cloudflare Pages
```

## 5. Arquitectura y flujo de datos

### 5.1 Frontend

- SPA React 19 con Vite; `App.tsx` monta el layout principal, las rutas y el elemento de audio global.
- Estado global con Zustand: `appStore.ts` compone los slices `audioSlice.ts` y `uiSlice.ts`.
- Los componentes se agrupan por sección y los recursos se sirven desde el CDN de R2.

### 5.2 Backend

- `functions/api/[[route]].ts` es el entry point de Hono y expone `POST /api/contact`.
- `contactController.ts` orquesta la validación Zod, el rate limiter por IP, la verificación Turnstile y el envío con Resend mediante inyección de dependencias.
- La lógica de negocio reside en `functions/_services/` e implementa interfaces de `functions/_shared/types.ts`.

## 6. Variables de entorno

`.env.example` declara los nombres de las variables. No se documentan valores.

- **Frontend:** `VITE_TURNSTILE_SITE_KEY`.
- **Pages Functions:** `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `CONTACT_EMAIL`, `TURNSTILE_SECRET_KEY`.

## 7. Comandos

Todos los comandos se ejecutan con **Bun**:

```bash
# Desarrollo local (Frontend Vite)
bun run dev

# Desarrollo Fullstack (Build + Wrangler Pages Functions en puerto 4321)
bun run dev:full

# Compilación TypeScript y Vite
bun run build

# Verificación y formateo con Biome
bun run check

# Linter con Biome
bun run lint

# Formateo con Biome
bun run format

# Pruebas unitarias (Vitest - 80 tests)
bun run test:unit

# Interfaz de Vitest
bun run test:ui

# Pruebas de humo (Playwright)
bun run test:smoke

# Pruebas End-to-End (Playwright)
bun run test:e2e

# Pruebas de accesibilidad WCAG 2.1 AA (Axe-core)
bun run test:a11y

# Pruebas de regresión visual (Playwright)
bun run test:visual

# Actualizar baselines visuales
bun run test:visual:update

# Auditoría de seguridad (Snyk)
bun run snyk:test
```

## 8. Convenciones y reglas críticas

### 8.1 Regla de oro en ejecución de tests

- **NO ejecutar comandos de test de forma reactiva tras cada pequeño cambio.** Realiza todos los cambios de código primero y acumúlalos; corre las suites de pruebas únicamente al final, cuando todo el conjunto esté listo y verificado.

### 8.2 Estilo de código y comentarios

- **Lenguaje:** todo el código, comentarios y documentación deben escribirse en **español**.
- **Comentarios de una sola línea:** concisos, directos y explicativos del *por qué*, sin bloques redundantes ni tecnicismos innecesarios.
- **Tipado estricto:** prohibido el uso de `any`; define interfaces explícitas para props, estados y modelos de datos.
- **Imports limpios:** utiliza siempre el alias `@/` configurado para módulos bajo `src/`.

### 8.3 Accesibilidad web (WCAG 2.1 AA)

- Todos los elementos interactivos (botones, sliders, selectores) deben poseer un `aria-label` descriptivo o texto oculto para lectores de pantalla (`<span className="sr-only">`).
- Mantener un contraste de color superior a **4.5:1** tanto en modo oscuro como en modo claro (ej. `--accent-hover: #60a5fa` sobre fondos oscuros).
- En tests de Axe-core, permitir que las animaciones de CSS terminen de renderizarse antes de disparar el análisis (`waitForTimeout(600)`) para evitar falsos positivos de contraste.

## 9. Flujo de Git y despliegue

- **PROHIBIDO realizar commits o push sin la aprobación explícita del usuario.**
- **Flujo de trabajo:** todo desarrollo o refactorización se realiza en la rama `develop` y se mergea hacia `main` mediante fast-forward una vez validado y aprobado.
- **Mensajes de commit:** seguir *Conventional Commits* en minúsculas y español (ej. `feat: ...`, `fix: ...`, `refactor: ...`, `test: ...`, `docs: ...`).
- **Documentación:** el directorio `docs/` se mantiene estrictamente en `.gitignore`; la documentación pública vive en Notion o en `README.md`.
- **Despliegue:** Cloudflare Pages, Workers y R2; la configuración vive en `wrangler.jsonc`.
