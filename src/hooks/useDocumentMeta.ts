import { useEffect } from "react";
import { useStore, useT } from "@/store/appStore";

// Sincroniza el título, los metadatos y el lang del documento con el idioma activo
export function useDocumentMeta() {
	const language = useStore((s) => s.language);
	const t = useT();

	useEffect(() => {
		document.documentElement.lang = language;
		document.title = t.seo.title;

		const setMeta = (selector: string, content: string) => {
			const element = document.querySelector<HTMLMetaElement>(selector);
			if (element) element.content = content;
		};

		setMeta('meta[name="description"]', t.seo.description);
		setMeta('meta[name="keywords"]', t.seo.keywords);
		setMeta('meta[property="og:title"]', t.seo.ogTitle);
		setMeta('meta[property="og:description"]', t.seo.ogDescription);
		setMeta('meta[property="og:locale"]', t.seo.locale);
		setMeta('meta[name="twitter:title"]', t.seo.ogTitle);
		setMeta('meta[name="twitter:description"]', t.seo.ogDescription);
	}, [language, t]);
}
