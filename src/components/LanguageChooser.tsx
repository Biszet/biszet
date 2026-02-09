'use client'
import Nav from "react-bootstrap/Nav";
import classNames from "classnames";
import {usePathname, useParams} from "next/navigation";

type LanguageChooserProps = {
    current: string;
    className?: string;
    slugMap?: Record<string, string>; // Hier kommt die Übersetzungs-Tabelle an
}

export const LanguageChooser = ({current, className, slugMap}: LanguageChooserProps) => {
    const pathname = usePathname();
    const params = useParams(); // Zugriff auf URL-Parameter (z.B. der aktuelle Slug)

    const getTargetUrl = (targetLang: string) => {
        if (!pathname) return `/${targetLang}`;

        // 1. Basis-Sprache tauschen (z.B. /en/... -> /de/...)
        let newPath = pathname.replace(`/${current}`, `/${targetLang}`);

        // 2. Statische Ordner übersetzen
        if (targetLang === 'de') {
            // Wechsel zu Deutsch: knowledge -> wissen
            newPath = newPath.replace('/knowledge', '/wissen');
        } else {
            // Wechsel zu Englisch: wissen -> knowledge
            newPath = newPath.replace('/wissen', '/knowledge');
        }

        // 3. Dynamische Artikel-Slugs übersetzen
        // Wir holen den aktuellen Slug aus den Parametern
        const currentSlug = params?.slug;
        const slugString = Array.isArray(currentSlug) ? currentSlug[0] : currentSlug;

        // Wenn wir einen Slug haben UND eine Übersetzung dafür existiert -> Tauschen!
        if (slugString && slugMap && slugMap[slugString]) {
            newPath = newPath.replace(slugString, slugMap[slugString]);
        }

        return newPath;
    };

    return (
        <Nav className={classNames(className)}>
            <Nav.Item>
                <Nav.Link
                    href={getTargetUrl('de')}
                    className={classNames(current === 'de' ? 'text-black' : 'text-muted')}
                >
                    DE
                </Nav.Link>
            </Nav.Item>
            <div className="align-self-center text-muted mx-1">|</div>
            <Nav.Item>
                <Nav.Link
                    href={getTargetUrl('en')}
                    className={classNames(current === 'en' ? 'text-black' : 'text-muted')}
                >
                    EN
                </Nav.Link>
            </Nav.Item>
        </Nav>
    );
};