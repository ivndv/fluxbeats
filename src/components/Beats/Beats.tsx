// React

// Iconos
import { ChevronLeft, ChevronRight } from "lucide-react";
import { type FC, useCallback, useRef } from "react";
// Datos
import { beats } from "@/data/beats";
import { useKeyboardNav } from "@/hooks/useKeyboardNav";
// Store
import { useStore, useT } from "@/store/appStore";
import { BeatCard } from "./BeatCard";
// Componentes
import { MiniPlayer } from "./MiniPlayer";

// Sección de beats con desplazamiento horizontal y navegación por teclado
const BeatsSection: FC = () => {
	const t = useT();
	const scrollRef = useRef<HTMLDivElement>(null);
	const currentBeat = useStore((s) => s.currentBeat);
	const isPlaying = useStore((s) => s.isPlaying);
	const isLoading = useStore((s) => s.isLoading);
	const volume = useStore((s) => s.volume);
	const progress = useStore((s) => s.progress);
	const currentTime = useStore((s) => s.currentTime);
	const duration = useStore((s) => s.duration);
	const play = useStore((s) => s.play);
	const stop = useStore((s) => s.stop);
	const setVolume = useStore((s) => s.setVolume);
	const seek = useStore((s) => s.seek);

	// Desplaza el contenedor horizontalmente
	const scroll = useCallback((direction: "left" | "right") => {
		const { current } = scrollRef;
		if (current) {
			const scrollAmount = direction === "left" ? -320 : 320;
			current.scrollBy({ left: scrollAmount, behavior: "smooth" });
		}
	}, []);

	// Navegación por teclado: flechas y espacio
	useKeyboardNav(
		() => scroll("left"),
		() => scroll("right"),
		currentBeat ? () => play(currentBeat) : undefined,
	);

	return (
		<>
			<section
				id="beats"
				className="bg-page-bg py-20 sm:py-28 border-t border-border"
			>
				<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
					{/* Encabezado de la sección */}
					<div className="mb-10 flex items-end justify-between gap-6 scroll-reveal">
						<div>
							<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
								{t.beats.eyebrow}
							</p>
							<h2 className="mt-3 text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
								{t.beats.title}
							</h2>
							<p className="mt-2 text-base leading-7 text-text-muted">
								{t.beats.subtitle}
							</p>
						</div>
						{/* Botones de navegación */}
						<div className="flex shrink-0 gap-2">
							<button
								type="button"
								onClick={() => scroll("left")}
								className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-accent hover:text-accent active:scale-95"
								aria-label={t.beats.prev}
							>
								<ChevronLeft size={20} />
							</button>
							<button
								type="button"
								onClick={() => scroll("right")}
								className="flex h-11 w-11 items-center justify-center rounded-full border border-border text-text-muted transition-colors hover:border-accent hover:text-accent active:scale-95"
								aria-label={t.beats.next}
							>
								<ChevronRight size={20} />
							</button>
						</div>
					</div>

					{/* Lista horizontal de beats */}
					<div
						ref={scrollRef}
						className="flex gap-6 overflow-x-auto pb-6 snap-x snap-mandatory scrollbar-hide"
					>
						{beats.map((beat) => (
							<BeatCard
								key={beat.id}
								beat={beat}
								isPlaying={currentBeat?.id === beat.id && isPlaying}
								isLoading={isLoading && currentBeat?.id === beat.id}
								onPlay={play}
							/>
						))}
					</div>
				</div>
			</section>

			{/* Reproductor mini inferior */}
			<MiniPlayer
				currentBeat={currentBeat}
				isPlaying={isPlaying}
				isLoading={isLoading}
				volume={volume}
				progress={progress}
				currentTime={currentTime}
				duration={duration}
				onToggle={() => {
					if (currentBeat) play(currentBeat);
				}}
				onClose={stop}
				onVolumeChange={setVolume}
				onSeek={seek}
			/>
		</>
	);
};

export default BeatsSection;
