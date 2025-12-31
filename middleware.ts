import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// ⚠️ MAINTENANCE MODE - nastav na true pro pozastavení webu
const MAINTENANCE_MODE = false;

export function middleware(request: NextRequest) {
    // Pokud je maintenance mode zapnutý
    if (MAINTENANCE_MODE) {
        // Povol přístup na maintenance stránku
        if (request.nextUrl.pathname === '/maintenance') {
            return NextResponse.next();
        }

        // Povol statické soubory (fonty, CSS, JS)
        if (
            request.nextUrl.pathname.startsWith('/_next') ||
            request.nextUrl.pathname.startsWith('/favicon')
        ) {
            return NextResponse.next();
        }

        // Přesměruj vše ostatní na maintenance
        return NextResponse.redirect(new URL('/maintenance', request.url));
    }

    return NextResponse.next();
}

export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - api routes
         * - _next/static (static files)
         * - _next/image (image optimization files)
         * - favicon.ico (favicon file)
         */
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
};
