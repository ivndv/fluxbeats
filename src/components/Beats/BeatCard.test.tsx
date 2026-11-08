import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Beat } from "@/data/beats";
import { BeatCard } from "./BeatCard";

// Fixture mock para la tarjeta de beat
const mockBeat: Beat = {
	id: 1,
	title: "Midnight Vibe",
	bpm: 95,
	key: "F# Minor",
	price: 19.99,
	audioUrl: "https://example.com/midnight.mp3",
	image: "/images/midnight.jpg",
};

// Suite de pruebas para el componente BeatCard
describe("BeatCard (Tarjeta de Beat Individual)", () => {
	const defaultProps = {
		beat: mockBeat,
		isPlaying: false,
		isLoading: false,
		onPlay: vi.fn(),
	};

	it("renderiza el título, BPM, escala musical, precio y botón de compra", () => {
		// 1. Renderiza la tarjeta con los props por defecto
		render(<BeatCard {...defaultProps} />);

		// 2. Verifica la presencia de los datos en pantalla
		expect(screen.getByText("Midnight Vibe")).toBeInTheDocument();
		expect(screen.getByText(/95 BPM/i)).toBeInTheDocument();
		expect(screen.getByText("F# Minor")).toBeInTheDocument();
		expect(screen.getByText("$19.99")).toBeInTheDocument();
		expect(screen.getByText("Comprar")).toBeInTheDocument();
	});

	it("muestra el botón de Play cuando está pausado y ejecuta onPlay al hacer clic", () => {
		const onPlay = vi.fn();

		// 1. Renderiza la tarjeta en estado pausado
		render(<BeatCard {...defaultProps} onPlay={onPlay} isPlaying={false} />);

		// 2. Dispara el evento de clic en el botón de reproducción
		const playBtn = screen.getByRole("button", { name: /play|reproducir/i });
		expect(playBtn).toBeInTheDocument();

		fireEvent.click(playBtn);

		// 3. Verifica que se invoque el callback con los datos del beat
		expect(onPlay).toHaveBeenCalledWith(mockBeat);
	});

	it("muestra el botón de Pause cuando la pista se encuentra en reproducción activa", () => {
		// 1. Renderiza con isPlaying=true
		render(<BeatCard {...defaultProps} isPlaying={true} />);

		// 2. Verifica que el botón cambie a Pause
		const pauseBtn = screen.getByRole("button", { name: /pause|pausar/i });
		expect(pauseBtn).toBeInTheDocument();
	});

	it("deshabilita el botón de reproducción cuando el audio se encuentra cargando", () => {
		// 1. Renderiza en estado de carga (isLoading=true)
		render(<BeatCard {...defaultProps} isLoading={true} />);

		// 2. Verifica que el botón esté deshabilitado
		const btn = screen.getByRole("button", { name: /play|reproducir/i });
		expect(btn).toBeDisabled();
	});
});
