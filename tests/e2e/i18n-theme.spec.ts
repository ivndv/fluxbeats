import { expect, test } from "@playwright/test";

test.describe("E2E: Internacionalización (i18n) y Tema Visual", () => {
	test.beforeEach(async ({ page }) => {
		// 1. Navega a la página de inicio
		await page.goto("/");
		await page.waitForLoadState("domcontentloaded");
	});

	test("cambia dinámicamente el idioma de la interfaz a Inglés", async ({
		page,
	}) => {
		// 1. Abre el selector de idioma
		const langBtn = page.getByRole("button", {
			name: /change language|cambiar idioma/i,
		});
		await langBtn.click();

		// 2. Selecciona la opción English
		const enOption = page.getByRole("menuitemradio", { name: "English" });
		await enOption.click();

		// 3. Comprueba que los textos clave hayan cambiado a inglés
		await expect(
			page.getByRole("heading", { name: /recent catalog/i }),
		).toBeVisible();
		await expect(
			page.getByRole("heading", {
				name: /choose the perfect license/i,
			}),
		).toBeVisible();
	});

	test("alterna entre tema claro y tema oscuro (Dark Mode)", async ({
		page,
	}) => {
		// 1. Comprueba el estado inicial de la etiqueta html
		const html = page.locator("html");

		// 2. Hace clic en el botón de alternar tema
		const themeBtn = page.getByRole("button", {
			name: /toggle theme|cambiar tema/i,
		});
		await themeBtn.click();

		// 3. Comprueba que se agregue la clase .dark
		await expect(html).toHaveClass(/dark/);

		// 4. Hace clic nuevamente para volver al tema claro
		await themeBtn.click();
		await expect(html).not.toHaveClass(/dark/);
	});
});
