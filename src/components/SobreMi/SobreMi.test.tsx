import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import SobreMi from "./SobreMi";

// Suite de pruebas para la sección Sobre Mí
describe("SobreMi (Sección Sobre el Productor)", () => {
	it("renderiza el título, titular, párrafos descriptivos y estadísticas", () => {
		// 1. Renderiza la sección
		render(<SobreMi />);

		// 2. Verifica los textos de la biografía
		expect(screen.getByText("Prod. Flux")).toBeInTheDocument();
		expect(
			screen.getByText(/Más que solo música, creando atmósferas/i),
		).toBeInTheDocument();
		expect(screen.getByText(/Hola, soy Flux/i)).toBeInTheDocument();

		// 3. Verifica las estadísticas
		expect(screen.getByText("3+")).toBeInTheDocument();
		expect(screen.getByText("50+")).toBeInTheDocument();
		expect(screen.getByText("10+")).toBeInTheDocument();
		expect(screen.getByText("24-bit")).toBeInTheDocument();
	});

	it("renderiza la imagen del estudio fotográfico con su texto alternativo", () => {
		// 1. Renderiza la sección
		render(<SobreMi />);

		// 2. Verifica la presencia de la imagen
		const img = screen.getByAltText("Estudio de Prod Flux");
		expect(img).toBeInTheDocument();
		expect(img).toHaveAttribute(
			"src",
			"https://assets.liuma.app/fluxbeats/about-me-studio.jpg",
		);
	});
});
