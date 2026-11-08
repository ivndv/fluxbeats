import { expect, test } from "@playwright/test";

test.describe("E2E: Reproductor Continuo de Audio", () => {
	test.beforeEach(async ({ page }) => {
		// 1. Navega a la página de inicio
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");
	});

	test("inicia la reproducción de un beat y activa el MiniPlayer flotante", async ({
		page,
	}) => {
		// 1. Localiza el catálogo de beats
		const beatSection = page.locator("#beats");
		await expect(beatSection).toBeVisible();

		// 2. Hace clic en el primer botón de reproducción
		const firstPlayBtn = beatSection
			.locator('button[aria-label="Play"], button[aria-label="Reproducir"]')
			.first();
		await firstPlayBtn.click({ force: true });

		// 3. Verifica que aparezca el MiniPlayer en la parte inferior
		const miniPlayer = page.locator("div.fixed.bottom-0");
		await expect(miniPlayer).toBeVisible();

		// 4. Verifica que el botón en el MiniPlayer indique estado de reproducción o pausa
		const toggleBtn = miniPlayer.locator('button[aria-label="Pausar"]');
		await expect(toggleBtn).toBeVisible();
	});

	test("pausa y reanuda la pista desde los controles del MiniPlayer", async ({
		page,
	}) => {
		// 1. Inicia la reproducción del primer beat
		const firstPlayBtn = page
			.locator(
				'#beats button[aria-label="Play"], #beats button[aria-label="Reproducir"]',
			)
			.first();
		await firstPlayBtn.click({ force: true });

		// 2. Espera al MiniPlayer
		const miniPlayer = page.locator("div.fixed.bottom-0");
		await expect(miniPlayer).toBeVisible();

		// 3. Pausa la reproducción
		const pauseBtn = miniPlayer.locator('button[aria-label="Pausar"]');
		await pauseBtn.click();

		// 4. Verifica que el botón cambie a Reproducir
		const resumeBtn = miniPlayer.locator('button[aria-label="Reproducir"]');
		await expect(resumeBtn).toBeVisible();

		// 5. Reanuda la reproducción
		await resumeBtn.click();
		await expect(
			miniPlayer.locator('button[aria-label="Pausar"]'),
		).toBeVisible();
	});

	test("cierra el MiniPlayer y detiene la reproducción activa", async ({
		page,
	}) => {
		// 1. Inicia la reproducción
		const firstPlayBtn = page
			.locator(
				'#beats button[aria-label="Play"], #beats button[aria-label="Reproducir"]',
			)
			.first();
		await firstPlayBtn.click({ force: true });

		const miniPlayer = page.locator("div.fixed.bottom-0");
		await expect(miniPlayer).toBeVisible();

		// 2. Hace clic en el botón de cerrar (X)
		const closeBtn = miniPlayer.locator('button[aria-label*="Cerrar"]');
		await closeBtn.click();

		// 3. Verifica que el MiniPlayer se oculte
		await expect(miniPlayer).not.toBeVisible();
	});
});
