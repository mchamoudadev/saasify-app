import { withAuth } from 'next-auth/middleware'
import { NextResponse } from 'next/server'

type User = {
    role: string
}

export const config = {
    matcher: [
        '/dashboard/user/:path*',
        '/dashboard/admin/:path*',
        // '/api/admin/:path*',
    ]
}

export default withAuth(

    async function middleware(req) {

        const url = req.nextUrl.pathname;

        const userRole = (req?.nextauth?.token?.user as User).role;

        if (url?.includes('/admin') && userRole !== 'admin') {
            return NextResponse.redirect(new URL('/', req.url))
        }
        return NextResponse.next();
    },
    {
        callbacks: {
            authorized: ({ token }) => {
                return !!token;
            }
        }
    }
)