// Componentes
import { ResponsiveImage } from "@/components/ui/ResponsiveImage";
// Store
import { useT } from "@/store/appStore";

// Sección sobre el productor con estadísticas e imagen
const SobreMi = () => {
	const t = useT();

	// Estadísticas del productor
	const stats = [
		{ label: t.about.stats.years, value: "3+" },
		{ label: t.about.stats.catalog, value: "50+" },
		{ label: t.about.stats.clients, value: "10+" },
		{ label: t.about.stats.quality, value: "24-bit" },
	];

	return (
		<section
			id="sobre-mi"
			className="bg-page-bg py-20 sm:py-28 border-t border-border transition-colors duration-300"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-12 scroll-reveal lg:grid-cols-2 lg:items-start lg:gap-20">
					{/* Texto de presentación */}
					<div>
						<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
							{t.about.title}
						</p>
						<h2 className="mt-3 max-w-lg text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
							{t.about.headline}
						</h2>
						<p className="mt-6 max-w-lg text-base leading-7 text-text-muted">
							{t.about.p1}
						</p>
						<p className="mt-4 max-w-lg text-base leading-7 text-text-muted">
							{t.about.p2}
						</p>
						<p className="mt-4 max-w-lg text-base leading-7 text-text-muted">
							{t.about.p3}
						</p>

						{/* Estadísticas como lista editorial */}
						<dl className="mt-10 grid max-w-lg grid-cols-2 gap-x-8 gap-y-6">
							{stats.map((stat) => (
								<div key={stat.label} className="border-t border-border pt-3">
									<dd className="font-heading text-2xl font-bold tracking-tight text-text-main">
										{stat.value}
									</dd>
									<dt className="mt-1 font-mono text-[11px] uppercase tracking-wide text-text-muted">
										{stat.label}
									</dt>
								</div>
							))}
						</dl>
					</div>

					{/* Imagen del estudio */}
					<div className="lg:pt-8">
						<ResponsiveImage
							src="about-me-studio.jpg"
							alt={t.about.imageAlt}
							className="h-auto w-full rounded-sm border border-border bg-surface-card object-cover"
							width={1000}
							height={1000}
						/>
						<p className="mt-4 border-l-2 border-accent pl-4 text-sm italic text-text-muted">
							{t.about.quote}
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};

export default SobreMi;
