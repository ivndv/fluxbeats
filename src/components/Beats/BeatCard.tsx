// Iconos
import { LoaderCircle, Pause, Play } from "lucide-react";
import type { FC } from "react";
// Componentes
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
// Tipos
import type { Beat } from "@/data/beats";
// Store
import { useT } from "@/store/appStore";

// Props del componente BeatCard
interface BeatCardProps {
	beat: Beat;
	isPlaying: boolean;
	isLoading: boolean;
	onPlay: (beat: Beat) => void;
}

// Pieza de catálogo: portada plana, índice y metadatos en mono
export const BeatCard: FC<BeatCardProps> = ({
	beat,
	isPlaying,
	isLoading,
	onPlay,
}) => {
	const t = useT();
	const indice = String(beat.id).padStart(2, "0");

	return (
		<article className="group relative flex min-w-[280px] snap-center flex-col md:min-w-[320px]">
			{/* Portada con reproducción al hover */}
			<div className="relative aspect-square overflow-hidden rounded-sm border border-border bg-surface-card">
				<ResponsiveImage
					src={beat.image.split("/").pop() || ""}
					alt={beat.title}
					className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
					sizes={{ mobile: 280, tablet: 320, desktop: 400 }}
				/>
				<span className="absolute left-3 top-3 font-mono text-[11px] uppercase tracking-[0.18em] text-white mix-blend-difference">
					{indice}
				</span>
				<div className="absolute inset-0 bg-black/0 transition-colors duration-300 group-hover:bg-black/15" />
				<button
					type="button"
					onClick={() => onPlay(beat)}
					disabled={isLoading}
					aria-label={isPlaying ? t.player.pause : t.player.play}
					className={`absolute bottom-3 right-3 flex h-12 w-12 items-center justify-center rounded-full bg-white text-black transition-all duration-300 hover:scale-105 disabled:opacity-50 ${
						isPlaying
							? "opacity-100"
							: "opacity-0 translate-y-1 group-hover:translate-y-0 group-hover:opacity-100"
					}`}
				>
					{isLoading ? (
						<LoaderCircle size={20} className="animate-spin" />
					) : isPlaying ? (
						<Pause size={20} fill="currentColor" />
					) : (
						<Play size={20} fill="currentColor" className="ml-0.5" />
					)}
				</button>
			</div>

			{/* Información del beat */}
			<div className="mt-4 flex items-start justify-between gap-4">
				<div className="min-w-0">
					<h3 className="truncate text-lg font-semibold text-text-main">
						{beat.title}
					</h3>
					<p className="mt-1 flex items-center gap-1.5 font-mono text-[11px] uppercase tracking-wide text-text-muted">
						<span>{beat.bpm} BPM</span>
						<span aria-hidden="true">·</span>
						<span>{beat.key}</span>
					</p>
				</div>
				<span className="shrink-0 font-mono text-sm text-text-main">
					${beat.price}
				</span>
			</div>

			{/* Compra */}
			<div className="mt-3 flex items-center justify-between border-t border-border pt-2">
				<button
					type="button"
					className="text-sm font-semibold text-text-muted transition-colors hover:text-accent"
				>
					{t.beats.buy} <span aria-hidden="true">→</span>{" "}
				</button>
			</div>
		</article>
	);
};
