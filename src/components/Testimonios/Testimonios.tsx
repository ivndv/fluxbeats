// Iconos
import { Star } from "lucide-react";
// Config
import { ASSETS_BASE } from "@/config/assets";
// Store
import { useT } from "@/store/appStore";

// Avatares en el mismo orden que los testimonios del diccionario
const AVATARS = [
	`${ASSETS_BASE}/carlos.jpg`,
	`${ASSETS_BASE}/sofia.jpg`,
	`${ASSETS_BASE}/javi.jpg`,
];

// Sección de testimonios con reseñas de clientes
const Testimonios = () => {
	const t = useT();
	const reviews = t.reviews.items.map((review, index) => ({
		...review,
		avatar: AVATARS[index],
	}));

	return (
		<section
			id="testimonios"
			className="bg-page-bg py-20 sm:py-28 border-t border-border transition-colors duration-300"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				{/* Encabezado */}
				<div className="max-w-2xl scroll-reveal">
					<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
						{t.reviews.eyebrow}
					</p>
					<h2 className="mt-3 text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
						{t.reviews.header}
					</h2>
					<p className="mt-4 text-base leading-7 text-text-muted">
						{t.reviews.subtitle}
					</p>
				</div>

				{/* Citas editoriales */}
				<div className="mt-14 grid grid-cols-1 gap-10 scroll-reveal md:grid-cols-3 md:gap-8">
					{reviews.map((review) => (
						<figure
							key={review.author}
							className="flex flex-col border-t border-border pt-6"
						>
							<div className="flex items-center justify-between">
								<span
									aria-hidden="true"
									className="font-heading text-3xl leading-none text-accent"
								>
									“
								</span>
								<div className="flex gap-x-0.5">
									{[0, 1, 2, 3, 4].map((i) => (
										<Star
											key={i}
											size={12}
											fill={i < review.rating ? "currentColor" : "none"}
											className={
												i < review.rating ? "text-accent" : "text-border"
											}
										/>
									))}
								</div>
							</div>

							<blockquote className="mt-3 text-sm leading-6 text-text-main">
								{review.content}
							</blockquote>

							<figcaption className="mt-6 flex items-center gap-3">
								<img
									className="h-8 w-8 rounded-full bg-surface-card object-cover"
									src={review.avatar}
									alt={`${t.reviews.avatarAlt} ${review.author}`}
								/>
								<div>
									<cite className="block text-sm font-semibold not-italic text-text-main">
										{review.author}
									</cite>
									<p className="font-mono text-[10px] uppercase tracking-wide text-text-muted">
										{review.role}
									</p>
								</div>
							</figcaption>
						</figure>
					))}
				</div>
			</div>
		</section>
	);
};

export default Testimonios;
