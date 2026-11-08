// Iconos
import { Check } from "lucide-react";
// Store
import { useT } from "@/store/appStore";

// Planes de licencia disponibles
const Licencias = () => {
	const t = useT();

	// Opciones de licencia con precios y características
	const licenses = [
		{
			name: t.licenses.options.basic.name,
			price: 4.99,
			description: t.licenses.options.basic.desc,
			features: t.licenses.options.basic.features,
			cta: t.licenses.options.basic.cta,
			popular: false,
		},
		{
			name: t.licenses.options.premium.name,
			price: 14.99,
			description: t.licenses.options.premium.desc,
			features: t.licenses.options.premium.features,
			cta: t.licenses.options.premium.cta,
			popular: true,
		},
		{
			name: t.licenses.options.unlimited.name,
			price: 49.99,
			description: t.licenses.options.unlimited.desc,
			features: t.licenses.options.unlimited.features,
			cta: t.licenses.options.unlimited.cta,
			popular: false,
		},
	];

	return (
		<section
			id="licencias"
			className="bg-page-bg py-20 sm:py-28 border-t border-border transition-colors duration-300"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{/* Encabezado de la sección */}
				<div className="max-w-3xl scroll-reveal">
					<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
						{t.licenses.header}
					</p>
					<h2 className="mt-3 text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
						{t.licenses.title}
					</h2>
					<p className="mt-4 text-base leading-7 text-text-muted">
						{t.licenses.subtitle}
					</p>
				</div>

				{/* Columnas comparativas */}
				<div className="mt-14 grid grid-cols-1 scroll-reveal lg:grid-cols-3">
					{licenses.map((tier) => (
						<div
							key={tier.name}
							className="flex flex-col border-t border-border py-8 first:border-t-0 first:pt-0 lg:border-t-0 lg:border-l lg:py-0 lg:pl-8 lg:first:border-l-0 lg:first:pl-0"
						>
							<div className="flex flex-wrap items-center gap-x-3 gap-y-1">
								<h3
									className={`text-lg font-semibold ${tier.popular ? "text-accent" : "text-text-main"}`}
								>
									{tier.name}
								</h3>
								{tier.popular && (
									<span className="rounded-full border border-accent/30 bg-accent-muted px-2 py-0.5 font-mono text-[10px] uppercase tracking-[0.14em] text-accent">
										{t.licenses.popular}
									</span>
								)}
							</div>
							<p className="mt-3 text-sm leading-6 text-text-muted">
								{tier.description}
							</p>

							<p className="mt-6 flex items-baseline gap-1">
								<span className="font-mono text-4xl tracking-tight text-text-main">
									${tier.price}
								</span>
								<span className="font-mono text-xs uppercase tracking-wide text-text-muted">
									{t.licenses.perBeat}
								</span>
							</p>

							{/* Lista de características */}
							<ul className="mt-8 flex-1 space-y-2.5 text-sm leading-6 text-text-muted">
								{tier.features.map((feature) => (
									<li key={feature} className="flex gap-3">
										<Check
											size={16}
											className={`mt-0.5 flex-none ${tier.popular ? "text-accent" : "text-text-muted/60"}`}
										/>
										{feature}
									</li>
								))}
							</ul>

							{/* Botón de selección */}
							<button
								type="button"
								className={`mt-8 inline-flex h-11 items-center justify-center rounded-full px-6 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent ${
									tier.popular
										? "bg-accent-solid text-white hover:bg-accent-solid-hover"
										: "border border-border text-text-main hover:border-accent hover:text-accent"
								}`}
							>
								{tier.cta}
							</button>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Licencias;
