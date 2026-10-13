import { NextRequest, NextResponse } from 'next/server';
import {
  getArticles,
  getStore,
  persistStore,
  appendAuditLog,
} from '@/lib/db/store';
import { getSessionFromRequest, hasPermission } from '@/lib/auth';
import { articleUpsertSchema } from '@/lib/validations';
import { BlogArticle, PublishStatus } from '@/lib/types';
import { GENERATED_IMAGES } from '@/lib/db/seed-data';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const category = searchParams.get('category') || undefined;
  const tag = searchParams.get('tag') || undefined;
  const includeDraftsParam = searchParams.get('includeDrafts') === 'true';

  let includeDrafts = false;
  if (includeDraftsParam) {
    const session = getSessionFromRequest(req);
    includeDrafts = hasPermission(session.role, 'content:read');
  }

  const articles = getArticles({ category, tag, includeDrafts });
  return NextResponse.json({
    success: true,
    count: articles.length,
    data: articles,
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
    const parsed = articleUpsertSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed for article.',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const store = getStore();
    const author =
      store.team.find((m) => m.slug === parsed.data.authorSlug) ||
      store.team[0];

    const existingIdx = store.articles.findIndex(
      (a) => a.slug === parsed.data.slug
    );
    const now = new Date().toISOString();

    const article: BlogArticle = {
      id: existingIdx >= 0 ? store.articles[existingIdx].id : `art-${Date.now()}`,
      slug: parsed.data.slug,
      title: parsed.data.title,
      subtitle: parsed.data.subtitle,
      excerpt: parsed.data.excerpt,
      category: parsed.data.category,
      tags: parsed.data.tags,
      authorSlug: author.slug,
      authorName: author.name,
      authorRole: author.role,
      publishedAt: now.slice(0, 10),
      readTimeMinutes: parsed.data.readTimeMinutes,
      heroImage: GENERATED_IMAGES.heroArchitecture,
      sections:
        parsed.data.sections.length > 0
          ? parsed.data.sections
          : [
              {
                heading: '1. Architectural Context & Problem Statement',
                body: [parsed.data.excerpt],
              },
            ],
      relatedServiceSlugs: ['nextjs-web-applications', 'llm-rag-systems'],
      relatedArticleSlugs: [],
      featured: parsed.data.featured,
      status: parsed.data.status,
      seo: {
        metaTitle: `${parsed.data.title} | Tech Solution Nepal Insights`,
        metaDescription: parsed.data.excerpt,
      },
      updatedAt: now,
    };

    if (existingIdx >= 0) {
      store.articles[existingIdx] = article;
    } else {
      store.articles.unshift(article);
    }
    persistStore(store);

    await appendAuditLog({
      actorName: session.name,
      actorEmail: session.email,
      actorRole: session.role,
      action: 'UPSERT_ARTICLE',
      resourceType: 'article',
      resourceId: article.slug,
      summary: `Saved technical article '${article.title}' [${article.status}].`,
    });

    return NextResponse.json({
      success: true,
      data: article,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to save article.' },
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
    const { slug, status } = (await req.json()) as {
      slug: string;
      status: PublishStatus;
    };
    const store = getStore();
    const article = store.articles.find((a) => a.slug === slug);
    if (!article) {
      return NextResponse.json(
        { success: false, error: 'Article not found.' },
        { status: 404 }
      );
    }
    article.status = status;
    article.updatedAt = new Date().toISOString();
    persistStore(store);

    await appendAuditLog({
      actorName: session.name,
      actorEmail: session.email,
      actorRole: session.role,
      action: 'UPDATE_ARTICLE_STATUS',
      resourceType: 'article',
      resourceId: slug,
      summary: `Updated article '${article.title}' status to [${status}].`,
    });

    return NextResponse.json({ success: true, data: article });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update article.' },
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
  const store = getStore();
  const idx = store.articles.findIndex((a) => a.slug === slug);
  if (idx === -1) {
    return NextResponse.json(
      { success: false, error: 'Article not found.' },
      { status: 404 }
    );
  }

  const [removed] = store.articles.splice(idx, 1);
  persistStore(store);

  await appendAuditLog({
    actorName: session.name,
    actorEmail: session.email,
    actorRole: session.role,
    action: 'DELETE_ARTICLE',
    resourceType: 'article',
    resourceId: slug || '',
    summary: `Deleted article '${removed.title}'.`,
  });

  return NextResponse.json({ success: true, data: removed });
}
