// React
import { type FC, type FormEvent, type ReactNode, useState } from "react";
// Router
import { Link } from "react-router-dom";
// Store
import { useT } from "@/store/appStore";

// Props del icono de red social
interface SocialIconProps {
	href: string;
	label: string;
	children: ReactNode;
}

// Icono de red social con estilo circular
const SocialIcon: FC<SocialIconProps> = ({ href, label, children }) => (
	<a
		href={href}
		aria-label={label}
		className="flex h-10 w-10 items-center justify-center rounded-full bg-surface-card text-text-muted hover:bg-accent-solid hover:text-white transition-all duration-300"
	>
		{children}
		<span className="sr-only">{label}</span>
	</a>
);

// Pie de página con navegación, redes sociales y newsletter
const Footer: FC = () => {
	const t = useT();
	const currentYear = new Date().getFullYear();
	const [newsletterEmail, setNewsletterEmail] = useState("");
	const [newsletterStatus, setNewsletterStatus] = useState<
		"idle" | "error" | "success"
	>("idle");

	// Maneja el envío del formulario de newsletter
	const handleNewsletterSubmit = (e: FormEvent<HTMLFormElement>) => {
		// 1. Evita recargar la página
		e.preventDefault();
		// 2. Valida que el email tenga formato básico
		if (!newsletterEmail.includes("@") || newsletterEmail.length < 5) {
			setNewsletterStatus("error");
			return;
		}
		// 3. Muestra éxito y resetea
		setNewsletterStatus("success");
		setNewsletterEmail("");
		setTimeout(() => setNewsletterStatus("idle"), 3000);
	};

	return (
		<footer className="bg-page-bg border-t border-border pt-14 pb-8 transition-colors duration-300">
			<div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 scroll-reveal">
				<div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
					{/* Marca y descripción */}
					<div className="space-y-4">
						<h2 className="text-xl font-bold tracking-tight text-text-main">
							<span className="text-accent dark:text-accent-hover">Flux</span>
							beats
						</h2>
						<p className="text-sm text-text-muted leading-relaxed">
							{t.footer.about}
						</p>

						{/* Redes sociales */}
						<div className="flex space-x-4 pt-2">
							<SocialIcon href="https://github.com/tu-usuario" label="GitHub">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0 3 1.5-2.64-.5-5.36.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
									<path d="M9 18c-4.51 2-5-2-7-2" />
								</svg>
							</SocialIcon>
							<SocialIcon href="#" label="YouTube">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
									<polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
								</svg>
							</SocialIcon>
							<SocialIcon href="#" label="Instagram">
								<svg
									xmlns="http://www.w3.org/2000/svg"
									width="20"
									height="20"
									viewBox="0 0 24 24"
									fill="none"
									stroke="currentColor"
									strokeWidth="2"
									strokeLinecap="round"
									strokeLinejoin="round"
									aria-hidden="true"
								>
									<rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
									<path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
									<line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
								</svg>
							</SocialIcon>
						</div>
					</div>

					{/* Navegación */}
					<div>
						<h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
							{t.footer.navigation}
						</h3>
						<ul className="space-y-3">
							{[
								{ label: t.header.home, href: "#" },
								{ label: t.header.beats, href: "#" },
								{ label: t.header.licenses, href: "#" },
								{ label: t.header.about, href: "#" },
							].map((item) => (
								<li key={item.label}>
									<Link
										to={item.href}
										className="text-sm text-text-muted hover:text-accent hover:underline transition-colors"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Enlaces legales */}
					<div>
						<h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
							{t.footer.legalTitle}
						</h3>
						<ul className="space-y-3">
							{[
								{ label: t.footer.legal.terms, href: "/terms" },
								{ label: t.footer.legal.privacy, href: "/privacy" },
							].map((item) => (
								<li key={item.label}>
									<Link
										to={item.href}
										className="text-sm text-text-muted hover:text-accent hover:underline transition-colors"
									>
										{item.label}
									</Link>
								</li>
							))}
						</ul>
					</div>

					{/* Newsletter */}
					<div>
						<h3 className="mb-4 font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
							{t.footer.newsletter.title}
						</h3>
						<form
							onSubmit={handleNewsletterSubmit}
							className="flex flex-col gap-2"
						>
							<input
								type="email"
								value={newsletterEmail}
								onChange={(e) => {
									setNewsletterEmail(e.target.value);
									setNewsletterStatus("idle");
								}}
								placeholder={t.footer.newsletter.placeholder}
								required
								className="w-full rounded-none border-b border-border bg-transparent px-0 py-2.5 text-sm text-text-main placeholder:text-text-muted focus:border-accent focus:outline-none"
							/>
							{newsletterStatus === "error" && (
								<p className="text-xs text-red-500">
									{t.footer.newsletter.invalid}
								</p>
							)}
							{newsletterStatus === "success" && (
								<p className="text-xs text-green-500">
									{t.footer.newsletter.success}
								</p>
							)}
							<button
								type="submit"
								className="inline-flex h-11 w-full items-center justify-center rounded-full bg-accent-solid px-4 text-sm font-semibold text-white transition-colors hover:bg-accent-solid-hover"
							>
								{t.footer.newsletter.button}
							</button>
						</form>
					</div>
				</div>

				{/* Pie inferior */}
				<div className="mt-14 border-t border-border pt-8 flex flex-col items-center gap-6">
					<div className="flex flex-col items-center gap-4">
						<p className="text-sm font-medium text-text-muted">
							{t.footer.developedBy}{" "}
							<span className="font-bold text-text-main">Sinx</span>
						</p>
						<div className="flex flex-wrap justify-center gap-2">
							{["React", "Vite", "Tailwind", "Hono", "Cloudflare"].map(
								(tech) => (
									<span
										key={tech}
										className="rounded-full border border-border px-3 py-1 font-mono text-[10px] uppercase tracking-wide text-text-muted"
									>
										{tech}
									</span>
								),
							)}
						</div>
					</div>
					<p className="text-center text-xs text-text-muted/60">
						&copy; {currentYear} Fluxbeats. {t.footer.rights}
					</p>
				</div>
			</div>
		</footer>
	);
};

export default Footer;
