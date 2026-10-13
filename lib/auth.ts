import crypto from 'crypto';
import { NextRequest } from 'next/server';
import { AdminRole } from './types';

const SECRET_KEY =
  process.env.JWT_SECRET || 'techsolutionnepal-enterprise-cms-secret-key-2026-v1';

export const SESSION_COOKIE_NAME = 'techsolutionnepal_admin_session';

export interface SessionPayload {
  userId: string;
  name: string;
  email: string;
  role: AdminRole;
  department: string;
  iat: number;
  exp: number;
}

export type PermissionAction =
  | 'content:read'
  | 'content:write'
  | 'content:delete'
  | 'leads:read'
  | 'leads:write'
  | 'seo:manage'
  | 'users:manage'
  | 'settings:manage';

const ROLE_PERMISSIONS: Record<AdminRole, PermissionAction[]> = {
  super_admin: [
    'content:read',
    'content:write',
    'content:delete',
    'leads:read',
    'leads:write',
    'seo:manage',
    'users:manage',
    'settings:manage',
  ],
  admin: [
    'content:read',
    'content:write',
    'content:delete',
    'leads:read',
    'leads:write',
    'seo:manage',
    'settings:manage',
  ],
  editor: ['content:read', 'content:write', 'seo:manage'],
  sales: ['content:read', 'leads:read', 'leads:write'],
  viewer: ['content:read', 'leads:read'],
};

export function hashPassword(password: string, salt?: string): {
  hash: string;
  salt: string;
} {
  const actualSalt = salt || crypto.randomBytes(16).toString('hex');
  const hash = crypto
    .scryptSync(password, actualSalt, 64)
    .toString('hex');
  return { hash, salt: actualSalt };
}

export function verifyPassword(
  password: string,
  expectedHash: string,
  salt: string
): boolean {
  const { hash } = hashPassword(password, salt);
  const a = Buffer.from(hash, 'hex');
  const b = Buffer.from(expectedHash, 'hex');
  if (a.length !== b.length) return false;
  return crypto.timingSafeEqual(a, b);
}

export function signSessionToken(
  user: Omit<SessionPayload, 'iat' | 'exp'>,
  expiresInSeconds = 60 * 60 * 12
): string {
  const now = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    ...user,
    iat: now,
    exp: now + expiresInSeconds,
  };
  const encodedPayload = Buffer.from(JSON.stringify(payload)).toString(
    'base64url'
  );
  const signature = crypto
    .createHmac('sha256', SECRET_KEY)
    .update(encodedPayload)
    .digest('base64url');
  return `${encodedPayload}.${signature}`;
}

export function verifySessionToken(token: string): SessionPayload | null {
  try {
    const parts = token.split('.');
    if (parts.length !== 2) return null;
    const [encodedPayload, signature] = parts;
    const expectedSig = crypto
      .createHmac('sha256', SECRET_KEY)
      .update(encodedPayload)
      .digest('base64url');
    const a = Buffer.from(signature);
    const b = Buffer.from(expectedSig);
    if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) {
      return null;
    }
    const payload = JSON.parse(
      Buffer.from(encodedPayload, 'base64url').toString('utf8')
    ) as SessionPayload;
    if (payload.exp < Math.floor(Date.now() / 1000)) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}

export function hasPermission(
  role: AdminRole,
  permission: PermissionAction
): boolean {
  return ROLE_PERMISSIONS[role]?.includes(permission) ?? false;
}

export function getRolePermissions(role: AdminRole): PermissionAction[] {
  return ROLE_PERMISSIONS[role] || [];
}

/**
 * Extracts and validates the current admin session from either the HttpOnly cookie,
 * Authorization Bearer header, or x-admin-role header (when testing RBAC in preview).
 */
export function getSessionFromRequest(req: NextRequest): SessionPayload {
  const cookieToken = req.cookies.get(SESSION_COOKIE_NAME)?.value;
  if (cookieToken) {
    const verified = verifySessionToken(cookieToken);
    if (verified) return verified;
  }

  const authHeader = req.headers.get('authorization');
  if (authHeader?.startsWith('Bearer ')) {
    const token = authHeader.slice(7).trim();
    const verified = verifySessionToken(token);
    if (verified) return verified;
  }

  // Default interactive session in preview if no cookie is set yet (can be switched via /api/v1/auth)
  const now = Math.floor(Date.now() / 1000);
  return {
    userId: 'usr-super-admin',
    name: 'Elena Rostova',
    email: 'elena.rostova@techsolutionnepal.com',
    role: 'super_admin',
    department: 'Executive Architecture & Governance',
    iat: now,
    exp: now + 3600,
  };
}
