// React

// Iconos
import {
	LoaderCircle,
	Pause,
	Play,
	Volume1,
	Volume2,
	VolumeX,
	X,
} from "lucide-react";
import type { FC } from "react";
// Tipos
import type { Beat } from "@/data/beats";
// Store
import { useT } from "@/store/appStore";
// Utilidades
import { formatTime } from "@/utils/time";

// Props del reproductor mini
interface MiniPlayerProps {
	currentBeat: Beat | null;
	isPlaying: boolean;
	isLoading: boolean;
	volume: number;
	progress: number;
	currentTime: number;
	duration: number;
	onToggle: () => void;
	onClose: () => void;
	onVolumeChange: (volume: number) => void;
	onSeek: (progress: number) => void;
}

// Icono de volumen según el nivel
const VolumeIcon = ({ volume }: { volume: number }) => {
	// 1. Sin volumen, muestra mute
	if (volume === 0) return <VolumeX size={20} />;
	// 2. Volumen bajo, muestra icono reducido
	if (volume < 0.5) return <Volume1 size={20} />;
	// 3. Volumen alto, muestra icono completo
	return <Volume2 size={20} />;
};

// Reproductor mini fijo en la parte inferior
export const MiniPlayer: FC<MiniPlayerProps> = ({
	currentBeat,
	isPlaying,
	isLoading,
	volume,
	progress,
	currentTime,
	duration,
	onToggle,
	onClose,
	onVolumeChange,
	onSeek,
}) => {
	const t = useT();

	if (!currentBeat) return null;

	return (
		<div className="fixed bottom-0 left-0 w-full z-[100] border-t border-border bg-surface-card/95 backdrop-blur-md transition-colors duration-300">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
				{/* Barra de progreso */}
				<div className="mb-3">
					<input
						type="range"
						min="0"
						max="100"
						value={progress}
						aria-label={t.player.progress}
						onChange={(e) => onSeek(Number(e.target.value))}
						className="w-full h-1 bg-border rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:bg-accent-hover"
						style={{
							background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${progress}%, var(--border) ${progress}%, var(--border) 100%)`,
						}}
					/>
					<div className="mt-1 flex justify-between font-mono text-[11px] text-text-muted">
						<span>{formatTime(currentTime)}</span>
						<span>{formatTime(duration)}</span>
					</div>
				</div>

				{/* Controles de reproducción */}
				<div className="flex items-center justify-between gap-4">
					<div className="flex items-center gap-4 min-w-0 flex-1">
						<button
							type="button"
							onClick={onToggle}
							disabled={isLoading}
							className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent-solid text-white transition-transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
							aria-label={isPlaying ? t.player.pause : t.player.play}
						>
							{isLoading ? (
								<LoaderCircle size={20} className="animate-spin" />
							) : isPlaying ? (
								<Pause size={20} fill="currentColor" />
							) : (
								<Play size={20} fill="currentColor" className="ml-0.5" />
							)}
						</button>
						<div className="min-w-0 flex-1">
							<p className="text-sm font-semibold text-text-main truncate">
								{currentBeat.title}
							</p>
							<p className="font-mono text-[11px] uppercase tracking-wide text-text-muted">
								{currentBeat.bpm} BPM | {currentBeat.key}
							</p>
						</div>
					</div>

					{/* Volumen y botón cerrar */}
					<div className="flex items-center gap-4 shrink-0">
						<div className="hidden md:flex items-center gap-2">
							<VolumeIcon volume={volume} />
							<input
								type="range"
								min="0"
								max="1"
								step="0.01"
								value={volume}
								aria-label={t.player.volume}
								onChange={(e) => onVolumeChange(Number(e.target.value))}
								className="w-20 h-1 bg-border rounded-lg appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-3 [&::-webkit-slider-thumb]:h-3 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:bg-accent [&::-webkit-slider-thumb]:cursor-pointer hover:[&::-webkit-slider-thumb]:bg-accent-hover"
							/>
						</div>

						<button
							type="button"
							onClick={onClose}
							className="flex h-10 w-10 items-center justify-center rounded-full text-text-muted transition-colors hover:text-text-main"
							aria-label={t.player.close}
						>
							<X size={20} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};
