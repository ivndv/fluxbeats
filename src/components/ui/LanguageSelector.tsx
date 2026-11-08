import { useEffect, useRef, useState } from "react";
import {
	CheckIcono,
	ChevronIcono,
	GloboIcono,
} from "@/components/ui/HeaderIcons";
import { useStore, useT } from "@/store/appStore";

// Props del selector de idioma
interface LanguageSelectorProps {
	align?: "left" | "right";
}

// Selector desplegable de idioma con detección de clic fuera
const LanguageSelector = ({ align = "right" }: LanguageSelectorProps) => {
	const language = useStore((s) => s.language);
	const setLanguage = useStore((s) => s.setLanguage);
	const t = useT();
	const [isOpen, setIsOpen] = useState(false);
	const dropdownRef = useRef<HTMLDivElement>(null);

	const toggleMenu = () => setIsOpen(!isOpen);

	// Cierra el menú al hacer clic fuera
	useEffect(() => {
		// 1. Escucha clics fuera del menú
		const handleClickOutside = (event: MouseEvent) => {
			if (
				dropdownRef.current &&
				!dropdownRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		if (isOpen) {
			document.addEventListener("mousedown", handleClickOutside);
		}

		// 2. Limpia el evento al cerrar o desmontar
		return () => {
			document.removeEventListener("mousedown", handleClickOutside);
		};
	}, [isOpen]);

	return (
		<div className="relative inline-block" ref={dropdownRef}>
			{/* Botón del selector */}
			<button
				type="button"
				onClick={toggleMenu}
				className="inline-flex h-9 items-center gap-1.5 rounded-full border border-border bg-surface-card/70 px-2.5 text-text-muted transition-colors hover:border-accent hover:text-accent"
				aria-label={t.header.changeLanguage}
				aria-haspopup="menu"
				aria-expanded={isOpen}
			>
				<GloboIcono />
				<span className="text-xs font-semibold tracking-wide">
					{language === "es" ? "ES" : "EN"}
				</span>
				<ChevronIcono />
			</button>

			{/* Menú desplegable */}
			<div
				role="menu"
				aria-label={t.header.language}
				className={`absolute top-full mt-2 w-44 rounded-xl border border-border bg-surface-card p-1.5 shadow-xl transition-all duration-200 z-50 ${
					align === "right"
						? "right-0 origin-top-right"
						: "left-0 origin-top-left"
				} ${
					isOpen
						? "opacity-100 visible translate-y-0"
						: "opacity-0 invisible -translate-y-1"
				}`}
			>
				{/* Opción español */}
				<button
					type="button"
					role="menuitemradio"
					aria-checked={language === "es"}
					onClick={() => {
						setLanguage("es");
						setIsOpen(false);
					}}
					className={`
						flex h-9 w-full items-center justify-between rounded-lg px-2.5 text-sm transition-colors
						${
							language === "es"
								? "bg-page-bg text-text-main"
								: "text-text-muted hover:bg-page-bg hover:text-text-main"
						}
					`}
				>
					<span>Espa&#241;ol</span>
					{language === "es" && (
						<CheckIcono className="h-3.5 w-3.5 text-accent" />
					)}
				</button>
				{/* Opción inglés */}
				<button
					type="button"
					role="menuitemradio"
					aria-checked={language === "en"}
					onClick={() => {
						setLanguage("en");
						setIsOpen(false);
					}}
					className={`
						flex h-9 w-full items-center justify-between rounded-lg px-2.5 text-sm transition-colors
						${
							language === "en"
								? "bg-page-bg text-text-main"
								: "text-text-muted hover:bg-page-bg hover:text-text-main"
						}
					`}
				>
					<span>English</span>
					{language === "en" && (
						<CheckIcono className="h-3.5 w-3.5 text-accent" />
					)}
				</button>
			</div>
		</div>
	);
};

export default LanguageSelector;
