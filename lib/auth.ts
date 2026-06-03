import { SignJWT, jwtVerify } from 'jose';

// TODO: Add environment variables here (JWT_SECRET)
const getJwtSecretKey = () => {
  const secret = process.env.JWT_SECRET;
  if (!secret || secret.length === 0) {
    // Fallback for development if not provided, but you should always set JWT_SECRET
    return 'super-secret-admin-key-aarambh-hub';
  }
  return secret;
};

export async function signJwt(payload: { username: string }) {
  const secret = new TextEncoder().encode(getJwtSecretKey());
  const alg = 'HS256';

  return new SignJWT(payload)
    .setProtectedHeader({ alg })
    .setIssuedAt()
    .setExpirationTime('1d')
    .sign(secret);
}

export async function verifyJwt(token: string) {
  try {
    const secret = new TextEncoder().encode(getJwtSecretKey());
    const { payload } = await jwtVerify(token, secret);
    return payload;
  } catch (error) {
    return null;
  }
}
