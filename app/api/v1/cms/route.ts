import { NextRequest, NextResponse } from 'next/server';
import { getStore, persistStore, appendAuditLog } from '@/lib/db/store';
import {
  getSessionFromRequest,
  hasPermission,
  getRolePermissions,
} from '@/lib/auth';
import { redirectCreateSchema, sanitizeString } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!hasPermission(session.role, 'content:read')) {
    return NextResponse.json(
      { success: false, error: 'Unauthorized access to CMS snapshot.' },
      { status: 403 }
    );
  }

  const store = getStore();
  const canReadLeads = hasPermission(session.role, 'leads:read');

  return NextResponse.json({
    success: true,
    data: {
      session,
      permissions: getRolePermissions(session.role),
      siteSettings: store.siteSettings,
      categories: store.categories,
      services: store.services,
      projects: store.projects,
      team: store.team,
      articles: store.articles,
      testimonials: store.testimonials,
      industries: store.industries,
      jobs: store.jobs,
      jobApplications: store.jobApplications,
      faqs: store.faqs,
      inquiries: canReadLeads ? store.inquiries : [],
      mediaAssets: store.mediaAssets,
      redirects: store.redirects,
      adminUsers: store.adminUsers.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        role: u.role,
        department: u.department,
        active: u.active,
        lastLoginAt: u.lastLoginAt,
      })),
      auditLogs: store.auditLogs.slice(0, 60),
    },
  });
}

export async function POST(req: NextRequest) {
  const session = getSessionFromRequest(req);
  try {
    const body = await req.json();
    const { entity, payload } = body;
    const store = getStore();

    if (entity === 'redirect') {
      if (!hasPermission(session.role, 'seo:manage')) {
        return NextResponse.json(
          {
            success: false,
            error: `Forbidden: Role '${session.role}' lacks 'seo:manage' permission.`,
          },
          { status: 403 }
        );
      }

      const parsed = redirectCreateSchema.safeParse(payload);
      if (!parsed.success) {
        return NextResponse.json(
          {
            success: false,
            error: 'Invalid redirect rule.',
            details: parsed.error.flatten().fieldErrors,
          },
          { status: 400 }
        );
      }

      const created = {
        id: `red-${Date.now()}`,
        sourcePath: parsed.data.sourcePath,
        destinationPath: parsed.data.destinationPath,
        statusCode: parsed.data.statusCode,
        active: true,
        notes: parsed.data.notes ? sanitizeString(parsed.data.notes) : undefined,
        createdAt: new Date().toISOString(),
      };

      store.redirects.unshift(created);
      persistStore(store);

      await appendAuditLog({
        actorName: session.name,
        actorEmail: session.email,
        actorRole: session.role,
        action: 'CREATE_SEO_REDIRECT',
        resourceType: 'seo',
        resourceId: created.id,
        summary: `Added ${created.statusCode} redirect from ${created.sourcePath} to ${created.destinationPath}.`,
      });

      return NextResponse.json({ success: true, data: created });
    }

    if (entity === 'faq') {
      if (!hasPermission(session.role, 'content:write')) {
        return NextResponse.json(
          {
            success: false,
            error: `Forbidden: Role '${session.role}' lacks 'content:write' permission.`,
          },
          { status: 403 }
        );
      }

      const created = {
        id: `faq-${Date.now()}`,
        category: payload.category || 'General & Engagement',
        question: sanitizeString(payload.question || ''),
        answer: sanitizeString(payload.answer || ''),
        order: store.faqs.length + 1,
        status: 'published' as const,
      };

      store.faqs.push(created);
      persistStore(store);

      await appendAuditLog({
        actorName: session.name,
        actorEmail: session.email,
        actorRole: session.role,
        action: 'CREATE_FAQ',
        resourceType: 'faq',
        resourceId: created.id,
        summary: `Created FAQ: '${created.question}'.`,
      });

      return NextResponse.json({ success: true, data: created });
    }

    if (entity === 'testimonial') {
      if (!hasPermission(session.role, 'content:write')) {
        return NextResponse.json(
          {
            success: false,
            error: `Forbidden: Role '${session.role}' lacks 'content:write' permission.`,
          },
          { status: 403 }
        );
      }

      const created = {
        id: `test-${Date.now()}`,
        clientName: sanitizeString(payload.clientName || ''),
        clientRole: sanitizeString(payload.clientRole || ''),
        companyName: sanitizeString(payload.companyName || ''),
        industry: sanitizeString(payload.industry || 'Financial Services'),
        beforeState: sanitizeString(payload.beforeState || ''),
        changeImplemented: sanitizeString(payload.changeImplemented || ''),
        quantifiedOutcome: sanitizeString(payload.quantifiedOutcome || ''),
        quote: sanitizeString(payload.quote || ''),
        verifiedDate: new Date().toISOString().slice(0, 10),
        featured: true,
        status: 'published' as const,
      };

      store.testimonials.unshift(created);
      persistStore(store);

      await appendAuditLog({
        actorName: session.name,
        actorEmail: session.email,
        actorRole: session.role,
        action: 'CREATE_TESTIMONIAL',
        resourceType: 'testimonial',
        resourceId: created.id,
        summary: `Added verified client testimonial from ${created.clientName} (${created.companyName}).`,
      });

      return NextResponse.json({ success: true, data: created });
    }

    if (entity === 'media') {
      if (!hasPermission(session.role, 'content:write')) {
        return NextResponse.json(
          {
            success: false,
            error: `Forbidden: Role '${session.role}' lacks 'content:write' permission.`,
          },
          { status: 403 }
        );
      }

      const created = {
        id: `med-${Date.now()}`,
        title: sanitizeString(payload.title || 'Enterprise Visual Asset'),
        fileName: sanitizeString(payload.fileName || 'custom-asset.jpg'),
        url: sanitizeString(
          payload.url ||
            '/src/assets/images/hero_enterprise_architecture_1791637681108.jpg'
        ),
        mimeType: 'image/jpeg',
        aspectRatio: payload.aspectRatio || '16:9',
        category: payload.category || 'Hero & Architecture',
        altText: sanitizeString(payload.altText || payload.title || 'Asset'),
        uploadedBy: session.name,
        createdAt: new Date().toISOString(),
      };

      store.mediaAssets.unshift(created);
      persistStore(store);

      await appendAuditLog({
        actorName: session.name,
        actorEmail: session.email,
        actorRole: session.role,
        action: 'REGISTER_MEDIA_ASSET',
        resourceType: 'media',
        resourceId: created.id,
        summary: `Registered media asset '${created.title}'.`,
      });

      return NextResponse.json({ success: true, data: created });
    }

    if (entity === 'settings') {
      if (!hasPermission(session.role, 'settings:manage')) {
        return NextResponse.json(
          {
            success: false,
            error: `Forbidden: Role '${session.role}' lacks 'settings:manage' permission. Only Super Admin or Admin can update global site settings.`,
          },
          { status: 403 }
        );
      }

      store.siteSettings = {
        ...store.siteSettings,
        companyName: sanitizeString(
          payload.companyName || store.siteSettings.companyName
        ),
        tagline: sanitizeString(payload.tagline || store.siteSettings.tagline),
        primaryEmail: sanitizeString(
          payload.primaryEmail || store.siteSettings.primaryEmail
        ),
        phone: sanitizeString(payload.phone || store.siteSettings.phone),
        seoDefaults: {
          ...store.siteSettings.seoDefaults,
          titleTemplate: sanitizeString(
            payload.titleTemplate ||
              store.siteSettings.seoDefaults.titleTemplate
          ),
          defaultDescription: sanitizeString(
            payload.defaultDescription ||
              store.siteSettings.seoDefaults.defaultDescription
          ),
          robotsAllowPublic:
            typeof payload.robotsAllowPublic === 'boolean'
              ? payload.robotsAllowPublic
              : store.siteSettings.seoDefaults.robotsAllowPublic,
          sitemapEnabled:
            typeof payload.sitemapEnabled === 'boolean'
              ? payload.sitemapEnabled
              : store.siteSettings.seoDefaults.sitemapEnabled,
        },
        updatedAt: new Date().toISOString(),
      };

      persistStore(store);

      await appendAuditLog({
        actorName: session.name,
        actorEmail: session.email,
        actorRole: session.role,
        action: 'UPDATE_SITE_SETTINGS',
        resourceType: 'settings',
        resourceId: 'global-settings',
        summary: 'Updated global company & SEO configuration settings.',
      });

      return NextResponse.json({
        success: true,
        data: store.siteSettings,
      });
    }

    return NextResponse.json(
      { success: false, error: 'Unsupported CMS entity operation.' },
      { status: 400 }
    );
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to execute CMS mutation.' },
      { status: 500 }
    );
  }
}
