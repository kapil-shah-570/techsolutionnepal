import { NextRequest, NextResponse } from 'next/server';
import {
  getServices,
  upsertService,
  getStore,
  persistStore,
  appendAuditLog,
} from '@/lib/db/store';
import { getSessionFromRequest, hasPermission } from '@/lib/auth';
import { serviceUpsertSchema } from '@/lib/validations';
import { PublishStatus } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get('categorySlug') || undefined;
  const search = searchParams.get('search') || undefined;
  const featuredOnly = searchParams.get('featured') === 'true';
  const includeDraftsParam = searchParams.get('includeDrafts') === 'true';

  let includeDrafts = false;
  if (includeDraftsParam) {
    const session = getSessionFromRequest(req);
    includeDrafts = hasPermission(session.role, 'content:read');
  }

  const services = getServices({
    categorySlug,
    search,
    featuredOnly,
    includeDrafts,
  });

  return NextResponse.json({
    success: true,
    count: services.length,
    data: services,
  });
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!hasPermission(session.role, 'content:write')) {
    return NextResponse.json(
      {
        success: false,
        error: `Forbidden: Role '${session.role}' does not have 'content:write' permission to create or edit services.`,
      },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const parsed = serviceUpsertSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed for service payload.',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const saved = upsertService(parsed.data);

    await appendAuditLog({
      actorName: session.name,
      actorEmail: session.email,
      actorRole: session.role,
      action: 'UPSERT_SERVICE',
      resourceType: 'service',
      resourceId: saved.slug,
      summary: `Saved service '${saved.name}' (${saved.categorySlug}/${saved.slug}) with status [${saved.status}].`,
    });

    return NextResponse.json({
      success: true,
      data: saved,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to save service.' },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!hasPermission(session.role, 'content:write')) {
    return NextResponse.json(
      {
        success: false,
        error: `Forbidden: Role '${session.role}' lacks 'content:write' permission.`,
      },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { slug, status, featured } = body as {
      slug: string;
      status?: PublishStatus;
      featured?: boolean;
    };

    const store = getStore();
    const target = store.services.find((s) => s.slug === slug);
    if (!target) {
      return NextResponse.json(
        { success: false, error: 'Service not found.' },
        { status: 404 }
      );
    }

    if (status) target.status = status;
    if (typeof featured === 'boolean') target.featured = featured;
    target.updatedAt = new Date().toISOString();

    persistStore(store);

    await appendAuditLog({
      actorName: session.name,
      actorEmail: session.email,
      actorRole: session.role,
      action: 'UPDATE_SERVICE_STATUS',
      resourceType: 'service',
      resourceId: target.slug,
      summary: `Updated service '${target.name}' status to [${target.status}], featured=${target.featured}.`,
    });

    return NextResponse.json({
      success: true,
      data: target,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update service status.' },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!hasPermission(session.role, 'content:delete')) {
    return NextResponse.json(
      {
        success: false,
        error: `Forbidden: Role '${session.role}' lacks 'content:delete' permission. Only Super Admin or Admin can delete services.`,
      },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  if (!slug) {
    return NextResponse.json(
      { success: false, error: 'Service slug is required.' },
      { status: 400 }
    );
  }

  const store = getStore();
  const idx = store.services.findIndex((s) => s.slug === slug);
  if (idx === -1) {
    return NextResponse.json(
      { success: false, error: 'Service not found.' },
      { status: 404 }
    );
  }

  const [removed] = store.services.splice(idx, 1);
  persistStore(store);

  await appendAuditLog({
    actorName: session.name,
    actorEmail: session.email,
    actorRole: session.role,
    action: 'DELETE_SERVICE',
    resourceType: 'service',
    resourceId: slug,
    summary: `Deleted service '${removed.name}' (${slug}).`,
  });

  return NextResponse.json({
    success: true,
    data: removed,
  });
}
