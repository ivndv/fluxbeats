// React
import type { FC } from "react";
// Router
import { Link } from "react-router-dom";
// Store
import { useT } from "@/store/appStore";

// Página de términos y condiciones legales
const Terms: FC = () => {
	const t = useT();

	return (
		<div className="min-h-screen bg-page-bg pt-28 pb-16 transition-colors duration-300">
			<div className="mx-auto max-w-3xl px-6 lg:px-8">
				{/* Enlace para volver al inicio */}
				<Link
					to="/"
					className="text-sm font-medium text-accent hover:text-accent-hover mb-8 inline-block"
				>
					&larr; {t.footer.backToHome}
				</Link>
				<h1 className="text-3xl font-bold tracking-tight text-text-main mb-8 sm:text-4xl">
					{t.legalPages.terms.title}
				</h1>
				{/* Secciones de términos legales */}
				<div className="prose prose-slate dark:prose-invert max-w-none text-text-muted space-y-6">
					<section>
						<h2 className="text-2xl font-semibold text-text-main">
							{t.legalPages.terms.s1.title}
						</h2>
						<p>{t.legalPages.terms.s1.content}</p>
					</section>
					<section>
						<h2 className="text-2xl font-semibold text-text-main">
							{t.legalPages.terms.s2.title}
						</h2>
						<p>{t.legalPages.terms.s2.content}</p>
					</section>
					<section>
						<h2 className="text-2xl font-semibold text-text-main">
							{t.legalPages.terms.s3.title}
						</h2>
						<p>{t.legalPages.terms.s3.content}</p>
					</section>
					<section>
						<h2 className="text-2xl font-semibold text-text-main">
							{t.legalPages.terms.s4.title}
						</h2>
						<p>{t.legalPages.terms.s4.content}</p>
					</section>
				</div>
			</div>
		</div>
	);
};

export default Terms;
