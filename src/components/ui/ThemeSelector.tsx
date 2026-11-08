import { LunaIcono, SolIcono } from "@/components/ui/HeaderIcons";
import { useStore, useT } from "@/store/appStore";

// Botón que alterna entre tema claro y oscuro
const ThemeSelector = () => {
	const theme = useStore((s) => s.theme);
	const toggleTheme = useStore((s) => s.toggleTheme);
	const t = useT();

	return (
		<button
			type="button"
			onClick={toggleTheme}
			className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-surface-card/70 text-text-muted transition-colors hover:border-accent hover:text-accent"
			aria-label={t.header.toggleTheme}
		>
			{theme === "light" ? <LunaIcono /> : <SolIcono />}
		</button>
	);
};

export default ThemeSelector;
