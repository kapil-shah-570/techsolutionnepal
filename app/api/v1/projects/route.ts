import { NextRequest, NextResponse } from 'next/server';
import {
  getProjects,
  upsertProject,
  getStore,
  persistStore,
  appendAuditLog,
} from '@/lib/db/store';
import { getSessionFromRequest, hasPermission } from '@/lib/auth';
import { projectUpsertSchema } from '@/lib/validations';
import { PublishStatus } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const categorySlug = searchParams.get('categorySlug') || undefined;
  const industry = searchParams.get('industry') || undefined;
  const featuredOnly = searchParams.get('featured') === 'true';
  const includeDraftsParam = searchParams.get('includeDrafts') === 'true';

  let includeDrafts = false;
  if (includeDraftsParam) {
    const session = getSessionFromRequest(req);
    includeDrafts = hasPermission(session.role, 'content:read');
  }

  const projects = getProjects({
    categorySlug,
    industry,
    featuredOnly,
    includeDrafts,
  });

  return NextResponse.json({
    success: true,
    count: projects.length,
    data: projects,
  });
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!hasPermission(session.role, 'content:write')) {
    return NextResponse.json(
      {
        success: false,
        error: `Forbidden: Role '${session.role}' does not have 'content:write' permission.`,
      },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const parsed = projectUpsertSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed for project case study.',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const saved = upsertProject(parsed.data);

    await appendAuditLog({
      actorName: session.name,
      actorEmail: session.email,
      actorRole: session.role,
      action: 'UPSERT_PROJECT',
      resourceType: 'project',
      resourceId: saved.slug,
      summary: `Saved case study '${saved.title}' for ${saved.clientName} [${saved.status}].`,
    });

    return NextResponse.json({
      success: true,
      data: saved,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to save project case study.' },
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
    const { slug, status, featured } = (await req.json()) as {
      slug: string;
      status?: PublishStatus;
      featured?: boolean;
    };

    const store = getStore();
    const project = store.projects.find((p) => p.slug === slug);
    if (!project) {
      return NextResponse.json(
        { success: false, error: 'Project not found.' },
        { status: 404 }
      );
    }

    if (status) project.status = status;
    if (typeof featured === 'boolean') project.featured = featured;
    project.updatedAt = new Date().toISOString();
    persistStore(store);

    await appendAuditLog({
      actorName: session.name,
      actorEmail: session.email,
      actorRole: session.role,
      action: 'UPDATE_PROJECT_STATUS',
      resourceType: 'project',
      resourceId: project.slug,
      summary: `Updated case study '${project.title}' status to [${project.status}].`,
    });

    return NextResponse.json({
      success: true,
      data: project,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update project.' },
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
        error: `Forbidden: Role '${session.role}' lacks 'content:delete' permission.`,
      },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');
  if (!slug) {
    return NextResponse.json(
      { success: false, error: 'Project slug is required.' },
      { status: 400 }
    );
  }

  const store = getStore();
  const idx = store.projects.findIndex((p) => p.slug === slug);
  if (idx === -1) {
    return NextResponse.json(
      { success: false, error: 'Project not found.' },
      { status: 404 }
    );
  }

  const [removed] = store.projects.splice(idx, 1);
  persistStore(store);

  await appendAuditLog({
    actorName: session.name,
    actorEmail: session.email,
    actorRole: session.role,
    action: 'DELETE_PROJECT',
    resourceType: 'project',
    resourceId: slug,
    summary: `Deleted case study '${removed.title}'.`,
  });

  return NextResponse.json({
    success: true,
    data: removed,
  });
}
