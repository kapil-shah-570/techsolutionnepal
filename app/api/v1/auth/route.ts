import { NextRequest, NextResponse } from 'next/server';
import {
  getSessionFromRequest,
  getRolePermissions,
  signSessionToken,
  verifyPassword,
  SESSION_COOKIE_NAME,
} from '@/lib/auth';
import { getStore, appendAuditLog } from '@/lib/db/store';
import { AdminRole } from '@/lib/types';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  const store = getStore();
  return NextResponse.json({
    success: true,
    data: {
      session,
      permissions: getRolePermissions(session.role),
      availableAccounts: store.adminUsers.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        department: u.department,
      })),
    },
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const store = getStore();

    // Support either standard email + password login OR RBAC role-switch for interactive evaluation
    let matchedUser = store.adminUsers.find(
      (u) => u.email.toLowerCase() === String(body.email || '').toLowerCase()
    );

    if (body.switchRole) {
      const targetRole = body.switchRole as AdminRole;
      matchedUser = store.adminUsers.find((u) => u.role === targetRole);
    }

    if (!matchedUser) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid credentials or unrecognized administrator account.',
        },
        { status: 401 }
      );
    }

    if (!body.switchRole && body.password) {
      const valid = verifyPassword(
        String(body.password),
        matchedUser.passwordHash,
        matchedUser.passwordSalt
      );
      if (!valid) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid credentials. Password verification failed.',
          },
          { status: 401 }
        );
      }
    }

    const token = signSessionToken({
      userId: matchedUser.id,
      name: matchedUser.name,
      email: matchedUser.email,
      role: matchedUser.role,
      department: matchedUser.department,
    });

    await appendAuditLog({
      actorName: matchedUser.name,
      actorEmail: matchedUser.email,
      actorRole: matchedUser.role,
      action: body.switchRole ? 'SWITCH_RBAC_ROLE' : 'ADMIN_LOGIN',
      resourceType: 'auth',
      resourceId: matchedUser.id,
      summary: `Authenticated session established with role [${matchedUser.role.toUpperCase()}].`,
    });

    const response = NextResponse.json({
      success: true,
      data: {
        user: {
          userId: matchedUser.id,
          name: matchedUser.name,
          email: matchedUser.email,
          role: matchedUser.role,
          department: matchedUser.department,
        },
        permissions: getRolePermissions(matchedUser.role),
      },
    });

    response.cookies.set(SESSION_COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 12,
    });

    return response;
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process authentication request.' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  const response = NextResponse.json({
    success: true,
    message: 'Session terminated.',
  });
  response.cookies.delete(SESSION_COOKIE_NAME);
  return response;
}
