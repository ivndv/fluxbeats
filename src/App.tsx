// React
import { useEffect } from "react";
// Router
import { BrowserRouter, Route, Routes } from "react-router-dom";
// Componentes
import Footer from "@/components/Footer/Footer";
import Header from "@/components/Header/Header";
// Hooks
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import Home from "@/pages/Home/Home";
import Privacy from "@/pages/legal/Privacy";
import Terms from "@/pages/legal/Terms";
// Store
import { useStore } from "@/store/appStore";

// Componente raíz con routing, layout y reproductor de audio global
function App() {
	const initAudio = useStore((s) => s.initAudio);

	// Mantiene título, metadatos y lang alineados con el idioma
	useDocumentMeta();

	useEffect(() => {
		// 1. Inicializa el reproductor de audio al montar la aplicación
		initAudio();
	}, [initAudio]);

	return (
		<BrowserRouter>
			{/* Layout principal con header, contenido y footer */}
			<div className="relative min-h-screen w-full font-sans bg-page-bg text-text-main transition-colors duration-300">
				{/* Encabezado de navegación */}
				<Header />

				{/* Contenido de la ruta activa */}
				<main className="relative">
					<Routes>
						<Route path="/" element={<Home />} />
						<Route path="/terms" element={<Terms />} />
						<Route path="/privacy" element={<Privacy />} />
					</Routes>
				</main>

				{/* Pie de página */}
				<Footer />

				{/* Elemento de audio global controlado por el store */}
				{/* biome-ignore lint/a11y/useMediaCaption: global audio element controlled by store */}
				<audio id="global-audio" />
			</div>
		</BrowserRouter>
	);
}

export default App;
