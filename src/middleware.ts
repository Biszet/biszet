import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

// Englisch ist jetzt der Standard für die Welt (.com)
let defaultLocale = 'en'
let locales = ['en', 'de']

function getLocale(request: NextRequest) {
    // Fallback auf 'en', falls der Header komplett fehlt
    const acceptedLanguage = request.headers.get('accept-language') ?? 'en'
    let headers = { 'accept-language': acceptedLanguage }
    let languages = new Negotiator({ headers }).languages()

    try {
        return match(languages, locales, defaultLocale)
    } catch (e) {
        return defaultLocale
    }
}

export function middleware(request: NextRequest) {
    const pathname = request.nextUrl.pathname

    // 1. PRÜFUNG: Fehlt die Sprache? (Ihre bestehende Logik)
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect, wenn keine Sprache in der URL ist
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)
        // WICHTIG: pathname startet bereits mit /
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
    }

    // -----------------------------------------------------------------
    // 2. NEUE LOGIC: Rewrite für Knowledge-Bereich
    // Das behebt den 404-Fehler auf Netlify/Vercel
    // -----------------------------------------------------------------
    if (pathname.startsWith('/en/knowledge')) {
        // Wir klonen die URL, um sie zu manipulieren
        const targetUrl = request.nextUrl.clone()

        // Wir ersetzen 'knowledge' durch 'wissen', damit Next.js den echten Ordner findet
        targetUrl.pathname = pathname.replace('/en/knowledge', '/en/wissen')

        // Rewrite: URL bleibt im Browser 'knowledge', Server liefert 'wissen'
        return NextResponse.rewrite(targetUrl)
    }

    // Wenn nichts zutrifft, normal weitermachen
    return NextResponse.next()
}

export const config = {
    matcher: [
        // Wir schließen API, Assets, Next-Interna und explizit 'images' aus
        '/((?!api|assets|images|favicon|_next|.*\\..*).*)',
    ],
}