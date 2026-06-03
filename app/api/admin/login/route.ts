import { NextResponse } from 'next/server';
import { signJwt } from '@/lib/auth';

// TODO: Set admin usernames and passwords securely via environment variables
// This is a simple implementation for internal auth with multiple credentials
const ADMIN_CREDENTIALS = {
  [process.env.ADMIN_USER_1 || 'admin1']: process.env.ADMIN_PASS_1 || 'password1',
  [process.env.ADMIN_USER_2 || 'admin2']: process.env.ADMIN_PASS_2 || 'password2',
};

export async function POST(request: Request) {
  try {
    const { username, password } = await request.json();

    if (!username || !password) {
      return NextResponse.json(
        { error: 'Username and password are required' },
        { status: 400 }
      );
    }

    const expectedPassword = ADMIN_CREDENTIALS[username];

    if (!expectedPassword || expectedPassword !== password) {
      return NextResponse.json(
        { error: 'Invalid credentials' },
        { status: 401 }
      );
    }

    // Sign the JWT
    const token = await signJwt({ username });

    // Create the response and set the cookie
    const response = NextResponse.json(
      { message: 'Logged in successfully' },
      { status: 200 }
    );

    // Set cookie
    response.cookies.set('admin_session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1 day
    });

    return response;
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
