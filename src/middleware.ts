import { match } from '@formatjs/intl-localematcher'
import Negotiator from 'negotiator'
import { NextRequest, NextResponse } from 'next/server'

let defaultLocale = 'en'
let locales = ['en', 'de']

function getLocale(request: NextRequest) {
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
    const hostname = request.headers.get('host') || ''

    // 1. DOMAIN-CHECK: Ist es eine alte Domain?
    // (Aktiviert den Umzug für .de und Ihre Alias-Domains)
    const isOldDomain = hostname.includes('biszet.de') ||
                        hostname.includes('beauty-fridge') ||
                        hostname.includes('cosmeticfridge');

    // 2. SPRACH-CHECK: Fehlt die Sprache im Pfad?
    const pathnameIsMissingLocale = locales.every(
        (locale) => !pathname.startsWith(`/${locale}/`) && pathname !== `/${locale}`
    )

    // --- NEU: DOMAIN- UND SPRACH-KORREKTUR IN EINEM RUTSCH ---
    if (pathnameIsMissingLocale || isOldDomain) {
        const url = request.nextUrl.clone()

        // Wenn Sprache fehlt, passendes Kürzel in den Pfad einfügen
        if (pathnameIsMissingLocale) {
            const locale = getLocale(request)
            url.pathname = `/${locale}${pathname}`
        }

        // Wenn es die alte Domain ist, hart auf .com umschreiben
        if (isOldDomain) {
            url.hostname = 'biszet.com'
            url.protocol = 'https:'
            url.port = '' // Verhindert Port-Fehler
        }

        // SEO-LOGIK:
        // Domain-Umzug (.de -> .com) = IMMER 301 Permanent!
        // Nur Sprach-Wechsel (bereits auf .com) = 302 Found (Temporär)
        const statusCode = isOldDomain ? 301 : 302;

        return NextResponse.redirect(url, statusCode)
    }

    // -----------------------------------------------------------------
    // 3. Knowledge-Bereich Rewrite (Ihr funktionierender Code)
    // -----------------------------------------------------------------
    if (pathname.startsWith('/en/knowledge')) {
        const targetUrl = request.nextUrl.clone()
        targetUrl.pathname = pathname.replace('/en/knowledge', '/en/wissen')
        return NextResponse.rewrite(targetUrl)
    }

    return NextResponse.next()
}

export const config = {
    matcher: [
        '/((?!api|assets|images|favicon|_next|.*\\..*).*)',
    ],
}