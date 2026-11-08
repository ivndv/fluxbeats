// Iconos
import { LoaderCircle, Pause, Play } from "lucide-react";
// Componentes
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
// Datos
import { beats } from "@/data/beats";
// Store
import { useStore, useT } from "@/store/appStore";

// Sección hero principal: titular editorial y portada destacada
const Hero = () => {
	const t = useT();
	const currentBeat = useStore((state) => state.currentBeat);
	const isPlaying = useStore((state) => state.isPlaying);
	const isLoading = useStore((state) => state.isLoading);
	const play = useStore((state) => state.play);

	// Moon es la pista destacada del hero
	const featured = beats.find((beat) => beat.title === "Moon") ?? beats[0];
	const posicion = String(
		beats.findIndex((beat) => beat.id === featured.id) + 1,
	).padStart(2, "0");
	const esEste = currentBeat?.id === featured.id;
	const reproduciendo = esEste && isPlaying;
	const cargando = esEste && isLoading;

	return (
		<div
			id="inicio"
			className="relative isolate bg-page-bg px-6 pt-16 lg:px-8 overflow-hidden min-h-screen flex flex-col justify-center"
		>
			{/* Auras difuminadas de fondo */}
			<div
				aria-hidden="true"
				className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
			>
				<div className="absolute -left-32 -top-40 h-[520px] w-[520px] rounded-full bg-accent/10 blur-[100px] animate-drift" />
				<div
					className="absolute -bottom-40 -right-32 h-[640px] w-[640px] rounded-full bg-accent/5 blur-[120px] animate-drift"
					style={{ animationDelay: "-8s" }}
				/>
			</div>

			<div className="relative z-10 mx-auto w-full max-w-7xl grid grid-cols-1 items-center gap-14 py-16 lg:grid-cols-[1.1fr_0.9fr] lg:gap-20 lg:py-24">
				{/* Texto principal */}
				<div className="animate-fade-in-up">
					<p className="font-mono text-xs uppercase tracking-[0.2em] text-accent">
						{t.hero.kicker}
					</p>
					<h1 className="mt-6 max-w-2xl text-5xl font-bold leading-[0.98] tracking-tight text-text-main sm:text-6xl text-balance">
						{t.hero.title}
					</h1>
					<p className="mt-6 max-w-md text-xl text-text-muted">
						{t.hero.subtitle}
					</p>

					<div className="mt-10 flex flex-wrap items-center gap-6">
						<a
							href="#beats"
							className="inline-flex h-11 items-center gap-2 rounded-full bg-accent-solid px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-solid-hover"
						>
							{t.hero.cta1}
							<span aria-hidden="true">→</span>
						</a>
						<a
							href="#licencias"
							className="border-b border-border pb-1 text-sm font-semibold text-text-main transition-colors hover:border-accent hover:text-accent"
						>
							{t.hero.cta2}
						</a>
					</div>

					{/* Datos del estudio */}
					<dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-border pt-6">
						<div>
							<dt className="font-mono text-[11px] uppercase tracking-wide text-text-muted">
								{t.hero.tracks}
							</dt>
							<dd className="mt-1 font-mono text-sm text-text-main">
								{String(beats.length).padStart(2, "0")}
							</dd>
						</div>
						<div>
							<dt className="font-mono text-[11px] uppercase tracking-wide text-text-muted">
								{t.hero.bpm}
							</dt>
							<dd className="mt-1 font-mono text-sm text-text-main">78–95</dd>
						</div>
						<div>
							<dt className="font-mono text-[11px] uppercase tracking-wide text-text-muted">
								{t.hero.audio}
							</dt>
							<dd className="mt-1 font-mono text-sm text-text-main">24-bit</dd>
						</div>
					</dl>
				</div>

				{/* Portada destacada */}
				<div className="animate-fade-in">
					<div className="relative aspect-square overflow-hidden rounded-sm border border-border bg-surface-card">
						<ResponsiveImage
							src={featured.image.split("/").pop() || ""}
							alt={featured.title}
							className="h-full w-full object-cover"
							sizes={{ mobile: 400, tablet: 520, desktop: 640 }}
						/>
						<div className="absolute inset-0 bg-linear-to-t from-black/60 via-black/10 to-transparent" />
						<div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
							<div>
								<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/70">
									{t.hero.featured}
								</p>
								<p className="mt-1 text-2xl font-bold text-white">
									{featured.title}
								</p>
								<p className="font-mono text-xs text-white/70">
									{featured.bpm} BPM · {featured.key}
								</p>
							</div>
							<button
								type="button"
								onClick={() => play(featured)}
								disabled={cargando}
								aria-label={
									reproduciendo
										? t.player.pause
										: `${t.player.play} ${featured.title}`
								}
								className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white text-black transition-transform hover:scale-105 disabled:opacity-50"
							>
								{cargando ? (
									<LoaderCircle size={20} className="animate-spin" />
								) : reproduciendo ? (
									<Pause size={20} fill="currentColor" />
								) : (
									<Play size={20} fill="currentColor" className="ml-0.5" />
								)}
							</button>
						</div>
					</div>
					<p className="mt-3 font-mono text-[11px] uppercase tracking-[0.2em] text-text-muted">
						{posicion} / {String(beats.length).padStart(2, "0")} —{" "}
						{t.hero.catalog}
					</p>
				</div>
			</div>

			{/* Marquee de géneros y formatos */}
			<div className="relative z-10 border-y border-border py-3 overflow-hidden">
				<div className="flex w-max animate-marquee">
					{[0, 1].map((copia) => (
						<div
							key={copia}
							className="flex shrink-0 items-center gap-10 pr-10 font-mono text-xs uppercase tracking-[0.3em] text-text-muted"
						>
							{t.hero.marquee.map((termino) => (
								<span key={`${copia}-${termino}`}>{termino}</span>
							))}
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Hero;
