// middleware.ts
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

    // Prüfen, ob der Pfad schon eine Sprache enthält (z.B. /de/story)
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // Redirect, wenn keine Sprache in der URL ist
    if (pathnameIsMissingLocale) {
        const locale = getLocale(request)

        // Weiterleitung zur richtigen Sprache
        // WICHTIG: pathname startet bereits mit / (z.B. "/story")
        // Daher schreiben wir `/${locale}${pathname}` um "//" zu vermeiden
        return NextResponse.redirect(new URL(`/${locale}${pathname}`, request.url))
    }
}

export const config = {
    matcher: [
        // Wir schließen API, Assets, Next-Interna und explizit 'images' aus
        '/((?!api|assets|images|favicon|_next|.*\\..*).*)',
    ],
}