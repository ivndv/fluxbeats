import { expect, test } from "@playwright/test";

test.describe("E2E: Regresión Visual (Snapshots de UI)", () => {
	test.beforeEach(async ({ page }) => {
		// 1. Navega a la página de inicio y espera a que cargue la red
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");
	});

	test("captura snapshot de regresión visual del Header y navegación", async ({
		page,
	}) => {
		// 1. Localiza la barra superior del Header
		const header = page.locator("header");
		await expect(header).toBeVisible();

		// 2. Comprueba coincidencia exacta de píxeles con el snapshot de referencia
		await expect(header).toHaveScreenshot("header-nav.png");
	});

	test("captura snapshot de regresión visual del Hero en modo claro y oscuro", async ({
		page,
	}) => {
		// 1. Localiza la sección Hero inicial
		const hero = page.locator("#inicio");
		await expect(hero).toBeVisible();

		// 2. Snapshot del tema por defecto
		await expect(hero).toHaveScreenshot("hero-theme-default.png");

		// 3. Alterna el tema visual
		const themeBtn = page.getByRole("button", {
			name: /toggle theme|cambiar tema/i,
		});
		await themeBtn.click();

		// 4. Snapshot con el tema alternado
		await expect(hero).toHaveScreenshot("hero-theme-toggled.png");
	});

	test("captura snapshot de regresión visual de la sección de licencias comerciales", async ({
		page,
	}) => {
		// 1. Desplaza el viewport hacia la sección de licencias
		const licencias = page.locator("#licencias");
		await licencias.scrollIntoViewIfNeeded();
		await expect(licencias).toBeVisible();

		// 2. Snapshot de las tarjetas de precios y licencias
		await expect(licencias).toHaveScreenshot("licencias-section.png");
	});

	test("captura snapshot de regresión visual del MiniPlayer flotante activo", async ({
		page,
	}) => {
		// 1. Dispara la reproducción del primer beat
		const firstPlayBtn = page
			.locator(
				'#beats button[aria-label="Play"], #beats button[aria-label="Reproducir"]',
			)
			.first();
		await firstPlayBtn.click({ force: true });

		// 2. Localiza el MiniPlayer montado
		const miniPlayer = page.locator("div.fixed.bottom-0");
		await expect(miniPlayer).toBeVisible();

		// 3. Snapshot enmascarando elementos temporales dinámicos (slider y tiempos)
		await expect(miniPlayer).toHaveScreenshot("miniplayer-floating.png", {
			mask: [
				miniPlayer.locator('input[type="range"]'),
				miniPlayer.locator("div.flex.justify-between.text-xs"),
			],
		});
	});
});
