// React

// Turnstile
import { Turnstile } from "@marsidev/react-turnstile";
// Iconos
import { Clock, LoaderCircle, Mail, Share2 } from "lucide-react";
import { type FormEvent, useState } from "react";
// API
import { sendContact } from "@/lib/api";
// Store
import { useT } from "@/store/appStore";
// Tipos
import type { ContactFormData } from "./types";

// Sección de formulario de contacto con verificación Turnstile
const Contacto = () => {
	const t = useT();
	const [formData, setFormData] = useState<ContactFormData>({
		name: "",
		email: "",
		message: "",
		turnstileToken: "",
	});
	const [status, setStatus] = useState<
		"idle" | "loading" | "success" | "error"
	>("idle");
	const [errorMessage, setErrorMessage] = useState("");

	// Maneja el envío del formulario
	const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
		// 1. Evita la recarga de la página
		e.preventDefault();
		// 2. Muestra el estado de carga
		setStatus("loading");
		setErrorMessage("");

		try {
			// 3. Envía el mensaje a la API
			await sendContact(formData);
			// 4. Muestra éxito y resetea el formulario
			setStatus("success");
			setFormData({ name: "", email: "", message: "", turnstileToken: "" });

			setTimeout(() => setStatus("idle"), 5000);
		} catch (error) {
			// 5. Captura el error y lo muestra al usuario
			setStatus("error");
			setErrorMessage(
				error instanceof Error ? error.message : t.contact.form.error,
			);
		}
	};

	// Actualiza el campo del formulario según el input
	const handleChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
	) => {
		setFormData((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};

	return (
		<section
			id="contacto"
			className="bg-page-bg py-20 sm:py-28 border-t border-border transition-colors duration-300"
		>
			<div className="mx-auto max-w-7xl px-6 lg:px-8">
				<div className="grid grid-cols-1 gap-12 lg:grid-cols-2 lg:gap-20 scroll-reveal">
					{/* Información de contacto */}
					<div className="flex flex-col justify-center">
						<p className="font-mono text-[11px] uppercase tracking-[0.2em] text-accent">
							{t.contact.eyebrow}
						</p>
						<h2 className="mt-3 text-3xl font-bold tracking-tight text-text-main sm:text-4xl">
							{t.contact.title}
						</h2>
						<p className="mt-4 text-base leading-7 text-text-muted">
							{t.contact.subtitle}
						</p>

						<div className="mt-8 space-y-6">
							{/* Email */}
							<div className="flex items-center gap-x-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-accent">
									<Mail size={18} strokeWidth={1.8} />
								</div>
								<div>
									<span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
										{t.contact.email}
									</span>
									<span className="text-base text-text-main">
										contacto@fluxbeats.com
									</span>
								</div>
							</div>

							{/* Tiempo de respuesta */}
							<div className="flex items-center gap-x-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-accent">
									<Clock size={18} strokeWidth={1.8} />
								</div>
								<div>
									<span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
										{t.contact.response}
									</span>
									<span className="text-base text-text-muted">
										{t.contact.responseTime}
									</span>
								</div>
							</div>

							{/* Redes sociales */}
							<div className="flex items-center gap-x-4">
								<div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-border text-accent">
									<Share2 size={18} strokeWidth={1.8} />
								</div>
								<div>
									<span className="block font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted">
										{t.contact.follow}
									</span>
									<div className="mt-1 flex gap-4">
										<button
											type="button"
											className="text-sm font-medium text-text-muted hover:text-accent transition-colors flex items-center gap-1"
										>
											Instagram
										</button>
										<span className="opacity-30">|</span>
										<button
											type="button"
											className="text-sm font-medium text-text-muted hover:text-accent transition-colors flex items-center gap-1"
										>
											YouTube
										</button>
										<span className="opacity-30">|</span>
										<button
											type="button"
											className="text-sm font-medium text-text-muted hover:text-accent transition-colors flex items-center gap-1"
										>
											Airbit
										</button>
										<span className="opacity-30">|</span>
										<button
											type="button"
											className="text-sm font-medium text-text-muted hover:text-accent transition-colors flex items-center gap-1"
										>
											BeatStars
										</button>
									</div>
								</div>
							</div>
						</div>
					</div>

					{/* Formulario de contacto */}
					<form
						onSubmit={handleSubmit}
						className="lg:border-l lg:border-border lg:pl-10"
					>
						{/* Mensaje de éxito */}
						{status === "success" && (
							<div className="mb-6 rounded-lg bg-green-50 p-4 border border-green-200 dark:bg-green-900/20 dark:border-green-900/50">
								<div className="flex">
									<svg
										className="h-5 w-5 text-green-600 dark:text-green-400"
										fill="currentColor"
										viewBox="0 0 20 20"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
											clipRule="evenodd"
										/>
									</svg>
									<p className="ml-3 text-sm font-medium text-green-800 dark:text-green-300">
										{t.contact.form.success}
									</p>
								</div>
							</div>
						)}

						{/* Mensaje de error */}
						{status === "error" && (
							<div className="mb-6 rounded-lg bg-red-50 p-4 border border-red-200 dark:bg-red-900/20 dark:border-red-900/50">
								<div className="flex">
									<svg
										className="h-5 w-5 text-red-600 dark:text-red-400"
										fill="currentColor"
										viewBox="0 0 20 20"
										aria-hidden="true"
									>
										<path
											fillRule="evenodd"
											d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
											clipRule="evenodd"
										/>
									</svg>
									<p className="ml-3 text-sm font-medium text-red-800 dark:text-red-300">
										{errorMessage}
									</p>
								</div>
							</div>
						)}

						{/* Campos del formulario */}
						<div className="grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-8">
							<div className="sm:col-span-2">
								<label
									htmlFor="name"
									className="block font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted"
								>
									{t.contact.form.name}
								</label>
								<div className="mt-2.5">
									<input
										type="text"
										name="name"
										id="name"
										required
										minLength={2}
										maxLength={100}
										value={formData.name}
										onChange={handleChange}
										disabled={status === "loading"}
										autoComplete="name"
										className="block w-full rounded-none border-b border-border bg-transparent px-0 py-2.5 text-text-main placeholder:text-text-muted focus:border-accent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="email"
									className="block font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted"
								>
									{t.contact.form.email}
								</label>
								<div className="mt-2.5">
									<input
										type="email"
										name="email"
										id="email"
										required
										value={formData.email}
										onChange={handleChange}
										disabled={status === "loading"}
										autoComplete="email"
										className="block w-full rounded-none border-b border-border bg-transparent px-0 py-2.5 text-text-main placeholder:text-text-muted focus:border-accent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
									/>
								</div>
							</div>

							<div className="sm:col-span-2">
								<label
									htmlFor="message"
									className="block font-mono text-[11px] uppercase tracking-[0.16em] text-text-muted"
								>
									{t.contact.form.message}
								</label>
								<div className="mt-2.5">
									<textarea
										name="message"
										id="message"
										required
										minLength={10}
										maxLength={1000}
										rows={4}
										value={formData.message}
										onChange={handleChange}
										disabled={status === "loading"}
										className="block w-full resize-none rounded-none border-b border-border bg-transparent px-0 py-2.5 text-text-main placeholder:text-text-muted focus:border-accent focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
									/>
								</div>
							</div>
						</div>

						{/* Turnstile */}
						<div className="mt-6 flex justify-center sm:justify-start">
							<Turnstile
								siteKey={import.meta.env.VITE_TURNSTILE_SITE_KEY}
								onSuccess={(token) => {
									setFormData((prev) => ({ ...prev, turnstileToken: token }));
								}}
								onExpire={() => {
									setFormData((prev) => ({ ...prev, turnstileToken: "" }));
								}}
							/>
						</div>

						{/* Botón de envío */}
						<div className="mt-8 flex justify-end">
							<button
								type="submit"
								disabled={status === "loading" || !formData.turnstileToken}
								className="inline-flex h-11 w-full items-center justify-center rounded-full bg-accent-solid px-6 text-sm font-semibold text-white transition-colors hover:bg-accent-solid-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed"
							>
								{status === "loading" ? (
									<span className="flex items-center justify-center gap-2">
										<LoaderCircle size={16} className="animate-spin" />
										{t.contact.form.sending}
									</span>
								) : (
									t.contact.form.submit
								)}
							</button>
						</div>
					</form>
				</div>
			</div>
		</section>
	);
};

export default Contacto;
