import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { jwtVerify } from 'jose';

const JWT_SECRET = new TextEncoder().encode(process.env.NEXTAUTH_SECRET || 'supersecretkey-change-this-in-production');

export async function proxy(req: NextRequest) {
    const token = req.cookies.get('auth-token')?.value;

    const isAuthPage = req.nextUrl.pathname.startsWith('/login') || req.nextUrl.pathname.startsWith('/signup');
    const isDashboardPage = req.nextUrl.pathname.startsWith('/dashboard');

    if (!token && isDashboardPage) {
        // Redirect to login if accessing dashboard without a token
        return NextResponse.redirect(new URL('/login', req.url));
    }

    if (token) {
        try {
            await jwtVerify(token, JWT_SECRET);

            // If user is already logged in, redirect away from auth pages
            if (isAuthPage) {
                return NextResponse.redirect(new URL('/dashboard', req.url));
            }
        } catch (error) {
            console.error('JWT verification failed:', error);
            if (isDashboardPage) {
                return NextResponse.redirect(new URL('/login', req.url));
            }
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/dashboard/:path*', '/login', '/signup'],
};
