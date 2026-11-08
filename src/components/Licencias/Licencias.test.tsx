import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import Licencias from "./Licencias";

// Suite de pruebas para la sección de Licencias y Precios
describe("Licencias (Planes y Precios Comerciales)", () => {
	it("renderiza el encabezado de la sección y el título explicativo", () => {
		// 1. Renderiza la sección de licencias
		render(<Licencias />);

		// 2. Verifica los textos introductorios
		expect(screen.getByText("Precios transparentes")).toBeInTheDocument();
		expect(
			screen.getByText("Elige la licencia perfecta para tu proyecto"),
		).toBeInTheDocument();
	});

	it("renderiza los 3 niveles de licencias con sus respectivos precios", () => {
		// 1. Renderiza la sección
		render(<Licencias />);

		// 2. Verifica la presencia de cada plan y precio
		expect(screen.getByText("MP3 Lease")).toBeInTheDocument();
		expect(screen.getByText("$4.99")).toBeInTheDocument();

		expect(screen.getByText("WAV Premium")).toBeInTheDocument();
		expect(screen.getByText("$14.99")).toBeInTheDocument();

		expect(screen.getByText("Unlimited Trackout")).toBeInTheDocument();
		expect(screen.getByText("$49.99")).toBeInTheDocument();
	});

	it("destaca visualmente la licencia más popular (Más Vendido)", () => {
		// 1. Renderiza la sección
		render(<Licencias />);

		// 2. Verifica el badge distintivo
		expect(screen.getByText("Más Vendido")).toBeInTheDocument();
	});
});
