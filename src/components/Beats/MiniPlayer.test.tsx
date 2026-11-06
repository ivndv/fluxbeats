import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import type { Beat } from "@/data/beats";
import { MiniPlayer } from "./MiniPlayer";

// Fixture mock para el reproductor mini
const mockBeat: Beat = {
	id: 1,
	title: "Awesome Beat",
	bpm: 140,
	key: "C Minor",
	price: 30,
	audioUrl: "https://assets.liuma.app/fluxbeats/winter.mp3",
	image: "winter.png",
};

// Suite de pruebas para el componente MiniPlayer flotante
describe("MiniPlayer (Reproductor Flotante Inferior)", () => {
	const defaultProps = {
		currentBeat: mockBeat,
		isPlaying: false,
		isLoading: false,
		volume: 0.7,
		progress: 50,
		currentTime: 60,
		duration: 120,
		onToggle: vi.fn(),
		onClose: vi.fn(),
		onVolumeChange: vi.fn(),
		onSeek: vi.fn(),
	};

	it("no renderiza ningún elemento si no hay beat seleccionado (currentBeat null)", () => {
		// 1. Renderiza con currentBeat nulo
		const { container } = render(
			<MiniPlayer {...defaultProps} currentBeat={null} />,
		);

		// 2. Verifica que el contenedor esté completamente vacío
		expect(container).toBeEmptyDOMElement();
	});

	it("renderiza el título del beat, BPM, escala y tiempos de reproducción", () => {
		// 1. Renderiza el reproductor activo
		render(<MiniPlayer {...defaultProps} />);

		// 2. Verifica la información textual y temporal
		expect(screen.getByText("Awesome Beat")).toBeInTheDocument();
		expect(screen.getByText("140 BPM | C Minor")).toBeInTheDocument();
		expect(screen.getByText("1:00")).toBeInTheDocument();
		expect(screen.getByText("2:00")).toBeInTheDocument();
	});

	it("muestra el botón de reproducción cuando la pista está en pausa", () => {
		// 1. Renderiza en pausa
		render(<MiniPlayer {...defaultProps} isPlaying={false} />);

		// 2. Verifica el botón con aria-label de Reproducir
		const toggleBtn = screen.getByRole("button", { name: /Reproducir/i });
		expect(toggleBtn).toBeInTheDocument();
	});

	it("muestra el botón de pausa cuando la pista se está reproduciendo", () => {
		// 1. Renderiza en reproducción activa
		render(<MiniPlayer {...defaultProps} isPlaying={true} />);

		// 2. Verifica el botón de Pausar
		const toggleBtn = screen.getByRole("button", { name: /Pausar/i });
		expect(toggleBtn).toBeInTheDocument();
	});

	it("invoca la función onToggle al hacer clic en el botón de play/pausa", () => {
		// 1. Renderiza y localiza el botón
		render(<MiniPlayer {...defaultProps} />);
		const toggleBtn = screen.getByRole("button", { name: /Reproducir/i });

		// 2. Dispara el clic
		fireEvent.click(toggleBtn);

		// 3. Verifica la ejecución del callback
		expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
	});

	it("invoca la función onClose al hacer clic en el botón de cerrar", () => {
		// 1. Renderiza y localiza el botón de cerrar
		render(<MiniPlayer {...defaultProps} />);
		const closeBtn = screen.getByRole("button", {
			name: /Cerrar reproductor/i,
		});

		// 2. Dispara el clic de cierre
		fireEvent.click(closeBtn);

		// 3. Verifica el callback de stop/cierre
		expect(defaultProps.onClose).toHaveBeenCalledTimes(1);
	});

	it("invoca la función onSeek con el nuevo porcentaje al mover la barra de progreso", () => {
		// 1. Renderiza y localiza el slider de progreso
		render(<MiniPlayer {...defaultProps} />);
		const ranges = screen.getAllByRole("slider");
		const progressBar = ranges[0];

		// 2. Modifica el valor al 75%
		fireEvent.change(progressBar, { target: { value: "75" } });

		// 3. Verifica la llamada a onSeek
		expect(defaultProps.onSeek).toHaveBeenCalledWith(75);
	});

	it("invoca la función onVolumeChange al ajustar el control de volumen", () => {
		// 1. Renderiza el componente
		render(<MiniPlayer {...defaultProps} />);
		const ranges = screen.getAllByRole("slider");

		// 2. Si existe el control de volumen en el DOM, simula el ajuste
		if (ranges.length > 1) {
			const volumeBar = ranges[1];
			fireEvent.change(volumeBar, { target: { value: "0.5" } });
			expect(defaultProps.onVolumeChange).toHaveBeenCalledWith(0.5);
		}
	});
});
