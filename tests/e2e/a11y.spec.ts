import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test.describe("E2E: Accesibilidad Web (a11y - WCAG 2.1 AA)", () => {
	test.beforeEach(async ({ page }) => {
		// 1. Navega a la página de inicio y espera a que finalicen animaciones de entrada
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");
		await page.waitForTimeout(600);
	});

	test("la landing principal cumple con las pautas de accesibilidad WCAG 2.1 AA", async ({
		page,
	}) => {
		// 1. Audita la landing completa excluyendo widgets externos de terceros
		const results = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
			.exclude('iframe[src*="challenges.cloudflare.com"]')
			.analyze();

		// 2. Verifica cero violaciones de accesibilidad
		expect(results.violations).toEqual([]);
	});

	test("la interfaz cumple con estándares de accesibilidad en modo claro y oscuro", async ({
		page,
	}) => {
		// 1. Audita la vista en el tema inicial
		const initialResults = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa"])
			.exclude('iframe[src*="challenges.cloudflare.com"]')
			.analyze();
		expect(initialResults.violations).toEqual([]);

		// 2. Alterna al siguiente tema visual y espera la transición de color
		const themeBtn = page.getByRole("button", {
			name: /toggle theme|cambiar tema/i,
		});
		await themeBtn.click();
		await page.waitForTimeout(350);

		// 3. Audita la vista con el nuevo tema aplicado
		const toggledResults = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa"])
			.exclude('iframe[src*="challenges.cloudflare.com"]')
			.analyze();
		expect(toggledResults.violations).toEqual([]);
	});

	test("el reproductor flotante (MiniPlayer) montado cumple con estándares de accesibilidad", async ({
		page,
	}) => {
		// 1. Inicia la reproducción del primer beat
		const firstPlayBtn = page
			.locator(
				'#beats button[aria-label="Play"], #beats button[aria-label="Reproducir"]',
			)
			.first();
		await firstPlayBtn.click({ force: true });

		// 2. Espera a que el MiniPlayer sea visible
		const miniPlayer = page.locator("div.fixed.bottom-0");
		await expect(miniPlayer).toBeVisible();

		// 3. Audita la accesibilidad de los controles del reproductor
		const results = await new AxeBuilder({ page })
			.include("div.fixed.bottom-0")
			.withTags(["wcag2a", "wcag2aa"])
			.analyze();
		expect(results.violations).toEqual([]);
	});

	test("las páginas legales (/terms y /privacy) cumplen con las pautas de accesibilidad", async ({
		page,
	}) => {
		// 1. Audita la página de Términos y Condiciones
		await page.goto("/terms");
		await page.waitForLoadState("domcontentloaded");
		const termsResults = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa"])
			.analyze();
		expect(termsResults.violations).toEqual([]);

		// 2. Audita la página de Política de Privacidad
		await page.goto("/privacy");
		await page.waitForLoadState("domcontentloaded");
		const privacyResults = await new AxeBuilder({ page })
			.withTags(["wcag2a", "wcag2aa"])
			.analyze();
		expect(privacyResults.violations).toEqual([]);
	});
});
