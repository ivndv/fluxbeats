import { defineConfig, devices } from "@playwright/test";

/**
 * Configuración de Playwright para pruebas End-to-End (E2E) de Fluxbeats
 * Simula flujos de usuario reales contra el build de producción levantado en Cloudflare Pages dev.
 */
export default defineConfig({
	// Directorio raíz de las pruebas E2E
	testDir: "./tests/e2e",

	// Tiempo máximo por prueba
	timeout: 60_000,

	// Tiempo de espera para aserciones y configuración de regresión visual
	expect: {
		timeout: 10_000,
		toHaveScreenshot: {
			maxDiffPixelRatio: 0.05,
			animations: "disabled",
		},
	},

	// Ejecución secuencial controlada para evitar condiciones de carrera en wrangler dev
	fullyParallel: false,
	workers: 1,
	retries: 0,

	// Reporter
	reporter: process.env.CI
		? [["list"], ["html", { open: "never" }]]
		: [["list"]],

	// Opciones compartidas del navegador
	use: {
		baseURL: "http://localhost:4321",
		locale: "es-ES",
		trace: "retain-on-failure",
		screenshot: "only-on-failure",
		video: "retain-on-failure",
	},

	// Proyectos de navegadores
	projects: [
		{
			name: "chromium",
			use: { ...devices["Desktop Chrome"] },
		},
	],

	// Servidor web local sobre la carpeta dist/ compilada
	webServer: {
		command: "bunx wrangler pages dev dist/ --port 4321 --ip localhost",
		url: "http://localhost:4321",
		timeout: 60_000,
		reuseExistingServer: !process.env.CI,
	},
});
