// Iconos de header con el trazo fino de mxwatch

// Globo con meridianos para el selector de idioma
export function GloboIcono({ className = "h-4 w-4" }: { className?: string }) {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={1.8}
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="9" />
			<path d="M3 12h18M12 3c2.5 2.6 3.8 5.7 3.8 9S14.5 18.4 12 21c-2.5-2.6-3.8-5.7-3.8-9S9.5 5.6 12 3Z" />
		</svg>
	);
}

// Sol para el tema claro
export function SolIcono({ className = "h-4 w-4" }: { className?: string }) {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={1.8}
			aria-hidden="true"
		>
			<circle cx="12" cy="12" r="4" />
			<path
				strokeLinecap="round"
				d="M12 2v2m0 16v2M4.9 4.9l1.4 1.4m11.4 11.4 1.4 1.4M2 12h2m16 0h2M4.9 19.1l1.4-1.4m11.4-11.4 1.4-1.4"
			/>
		</svg>
	);
}

// Luna para el tema oscuro
export function LunaIcono({ className = "h-4 w-4" }: { className?: string }) {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={1.8}
			aria-hidden="true"
		>
			<path
				strokeLinecap="round"
				strokeLinejoin="round"
				d="M21 12.8A8.5 8.5 0 1 1 11.2 3a6.5 6.5 0 0 0 9.8 9.8Z"
			/>
		</svg>
	);
}

// Chevron para los desplegables
export function ChevronIcono({
	className = "h-3 w-3 opacity-60",
}: {
	className?: string;
}) {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2.2}
			aria-hidden="true"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="m6 9 6 6 6-6" />
		</svg>
	);
}

// Check para la opción activa
export function CheckIcono({
	className = "h-3.5 w-3.5",
}: {
	className?: string;
}) {
	return (
		<svg
			className={className}
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
			strokeWidth={2.5}
			aria-hidden="true"
		>
			<path strokeLinecap="round" strokeLinejoin="round" d="m5 13 4 4L19 7" />
		</svg>
	);
}
