import { defineConfig } from "vitest/config";
import viteConfig from "./vite.config";

/**
 * Configuración de Vitest para pruebas unitarias de Fluxbeats
 * Extiende la configuración de Vite e incorpora entorno jsdom para simulación de DOM.
 */
export default defineConfig({
	...viteConfig,
	test: {
		// Habilita APIs globales de testing (describe, it, expect) sin necesidad de importarlas
		globals: true,

		// Entorno del DOM simulado para pruebas de componentes React
		environment: "jsdom",

		// Archivo de configuración inicial (matchers de jest-dom y polyfills)
		setupFiles: "./src/test/setup.ts",

		// Patrón de inclusión exclusivo para pruebas unitarias de código fuente y serverless functions
		include: ["src/**/*.test.{ts,tsx}", "functions/**/*.test.ts"],

		// Excluye dependencias, artefactos de build y suites E2E/Smoke de Playwright
		exclude: ["node_modules", "dist", "tests/**"],

		// Cobertura de unitarios sobre frontend y Pages Functions
		coverage: {
			provider: "v8",
			reporter: ["text", "html", "lcov"],
			reportsDirectory: "./coverage",
			include: ["src/**/*.{ts,tsx}", "functions/**/*.ts"],
			exclude: ["**/*.test.*", "**/*.d.ts", "src/test/**", "src/main.tsx"],
		},
	},
});
