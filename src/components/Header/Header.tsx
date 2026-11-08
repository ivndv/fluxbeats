// React

// Iconos
import { Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import LanguageSelector from "@/components/ui/LanguageSelector";
// Componentes
import ThemeSelector from "@/components/ui/ThemeSelector";
// Store
import { useT } from "@/store/appStore";

// Barra de navegación fija con menú responsive
const Header = () => {
	const [isMenuOpen, setIsMenuOpen] = useState(false);
	const [isScrolled, setIsScrolled] = useState(false);

	const t = useT();

	// Detecta el scroll para cambiar el estilo del header
	useEffect(() => {
		// 1. Escucha el evento de scroll
		const handleScroll = () => {
			setIsScrolled(window.scrollY > 10);
		};
		window.addEventListener("scroll", handleScroll);
		// 2. Limpia el listener al desmontar
		return () => window.removeEventListener("scroll", handleScroll);
	}, []);

	// Elementos de navegación del menú
	const navItems = [
		{ label: t.header.home, href: "#inicio" },
		{ label: t.header.beats, href: "#beats" },
		{ label: t.header.licenses, href: "#licencias" },
		{ label: t.header.reviews, href: "#testimonios" },
		{ label: t.header.about, href: "#sobre-mi" },
		{ label: t.header.contact, href: "#contacto" },
	];

	const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
	const closeMenu = () => setIsMenuOpen(false);

	return (
		<>
			{/* Barra de navegación superior */}
			<header
				className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
					isScrolled
						? "border-border bg-page-bg/75 backdrop-blur-xl backdrop-saturate-50"
						: "border-transparent bg-transparent"
				}`}
			>
				<nav className="mx-auto max-w-7xl flex h-16 w-full items-center gap-4 px-4 sm:px-6 lg:px-8">
					{/* Logo */}
					<div className="shrink-0 cursor-pointer">
						<h1 className="text-xl font-bold tracking-tight text-text-main">
							<span className="text-accent">Flux</span>
							beats
						</h1>
					</div>

					{/* Enlaces de escritorio */}
					<div className="hidden md:flex flex-1 justify-center">
						<div className="flex items-center gap-8">
							{navItems.map((item) => (
								<a
									key={item.href}
									href={item.href}
									className="text-sm font-medium text-text-muted transition-colors hover:text-text-main underline-offset-4 hover:underline"
								>
									{item.label}
								</a>
							))}
						</div>
					</div>

					<div className="flex-1 md:hidden" />

					{/* Selectores de idioma y tema */}
					<div className="flex items-center gap-2 shrink-0">
						<div className="hidden md:flex items-center gap-1">
							<LanguageSelector />
							<ThemeSelector />
						</div>

						{/* Botón menú móvil */}
						<button
							type="button"
							onClick={toggleMenu}
							className="md:hidden inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-surface-card/70 text-text-muted transition-colors hover:border-accent hover:text-accent"
							aria-label={isMenuOpen ? t.header.closeMenu : t.header.openMenu}
							aria-expanded={isMenuOpen}
						>
							{isMenuOpen ? <X size={24} /> : <Menu size={24} />}
						</button>
					</div>
				</nav>
			</header>

			{/* Menú móvil */}
			<div
				className={`fixed top-16 left-0 z-40 w-full h-[calc(100vh-4rem)] bg-page-bg transform transition-all duration-300 ease-in-out md:hidden overflow-y-auto ${
					isMenuOpen
						? "translate-y-0 opacity-100"
						: "-translate-y-full opacity-0 pointer-events-none"
				}`}
			>
				<div className="p-4 border-b border-border">
					<ul className="flex flex-col space-y-2">
						{navItems.map((item) => (
							<li key={item.href}>
								<a
									href={item.href}
									onClick={closeMenu}
									className="flex min-h-11 items-center rounded-md px-2 text-base font-medium text-text-muted transition-colors hover:bg-surface-card hover:text-accent"
								>
									{item.label}
								</a>
							</li>
						))}

						<li className="border-t border-border my-2" />

						<li className="flex items-center justify-between px-2 pt-2">
							<LanguageSelector align="left" />
							<ThemeSelector />
						</li>
					</ul>
				</div>
			</div>

			{/* Overlay al abrir menú móvil */}
			{isMenuOpen && (
				<div
					onClick={closeMenu}
					className="fixed inset-0 z-30 md:hidden bg-page-bg/50 backdrop-blur-sm dark:bg-black/50"
					aria-hidden="true"
				/>
			)}
		</>
	);
};

export default Header;
