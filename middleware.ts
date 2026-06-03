import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyJwt } from '@/lib/auth';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protect Admin API routes except login
  const isAdminApiRoute = pathname.startsWith('/api/admin') && !pathname.startsWith('/api/admin/login');
  
  // Protect GET requests to /api/applications (Admin only)
  const isProtectedGetApplications = pathname === '/api/applications' && request.method === 'GET';

  // Protect Admin Frontend pages except login
  const isAdminPageRoute = pathname.startsWith('/admin') && !pathname.startsWith('/admin/login');

  if (isAdminApiRoute || isProtectedGetApplications || isAdminPageRoute) {
    const sessionCookie = request.cookies.get('admin_session')?.value;

    if (!sessionCookie) {
      if (isAdminPageRoute) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      return NextResponse.json({ error: 'Unauthorized: Missing token' }, { status: 401 });
    }

    const payload = await verifyJwt(sessionCookie);

    if (!payload) {
      if (isAdminPageRoute) {
        return NextResponse.redirect(new URL('/admin/login', request.url));
      }
      return NextResponse.json({ error: 'Unauthorized: Invalid token' }, { status: 401 });
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/api/admin/:path*', '/api/applications', '/admin/:path*'],
};
