import { NextResponse } from 'next/server';

export async function GET() {
  const spec = {
    openapi: '3.1.0',
    info: {
      title: 'Tech Solution Nepal Enterprise CMS & Lead Pipeline API',
      version: '1.0.0',
      description:
        'Versioned REST API powering the Tech Solution Nepal public website, dynamic service catalog, case studies, inquiry pipeline, and RBAC Admin CMS.',
      contact: {
        name: 'Tech Solution Nepal Architecture Group',
        email: 'inquiries@techsolutionnepal.com',
      },
    },
    servers: [
      {
        url: '/api/v1',
        description: 'Version 1 Production & Preview API Gateway',
      },
    ],
    components: {
      securitySchemes: {
        SessionCookieAuth: {
          type: 'apiKey',
          in: 'cookie',
          name: 'techsolutionnepal_admin_session',
          description: 'HMAC-SHA256 signed HttpOnly session token enforcing RBAC permissions.',
        },
        BearerTokenAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'HMAC-Token',
        },
      },
    },
    paths: {
      '/auth': {
        get: {
          summary: 'Inspect current admin session and RBAC permissions',
          tags: ['Authentication & RBAC'],
          responses: { '200': { description: 'Active session and role permissions' } },
        },
        post: {
          summary: 'Authenticate admin user or switch RBAC evaluation persona',
          tags: ['Authentication & RBAC'],
          responses: {
            '200': { description: 'Sets HttpOnly session cookie and logs audit event' },
            '401': { description: 'Invalid credentials' },
          },
        },
        delete: {
          summary: 'Terminate session and clear HttpOnly cookie',
          tags: ['Authentication & RBAC'],
          responses: { '200': { description: 'Session terminated' } },
        },
      },
      '/services': {
        get: {
          summary: 'List published services (or include drafts with content:read permission)',
          tags: ['Services & Categories'],
          parameters: [
            { name: 'categorySlug', in: 'query', schema: { type: 'string' } },
            { name: 'search', in: 'query', schema: { type: 'string' } },
            { name: 'featured', in: 'query', schema: { type: 'boolean' } },
          ],
          responses: { '200': { description: 'Array of ServiceItem objects' } },
        },
        post: {
          summary: 'Create or update a service (requires content:write)',
          tags: ['Services & Categories'],
          security: [{ SessionCookieAuth: [] }],
          responses: {
            '200': { description: 'Upserted ServiceItem' },
            '403': { description: 'RBAC permission denied' },
          },
        },
        patch: {
          summary: 'Publish, unpublish, archive, or feature a service (requires content:write)',
          tags: ['Services & Categories'],
          security: [{ SessionCookieAuth: [] }],
          responses: { '200': { description: 'Updated ServiceItem' } },
        },
        delete: {
          summary: 'Delete a service (requires content:delete)',
          tags: ['Services & Categories'],
          security: [{ SessionCookieAuth: [] }],
          responses: { '200': { description: 'Deleted ServiceItem' } },
        },
      },
      '/projects': {
        get: {
          summary: 'List published case studies and portfolio projects',
          tags: ['Projects & Case Studies'],
          responses: { '200': { description: 'Array of ProjectCaseStudy objects' } },
        },
        post: {
          summary: 'Create or update a project case study (requires content:write)',
          tags: ['Projects & Case Studies'],
          security: [{ SessionCookieAuth: [] }],
          responses: { '200': { description: 'Saved ProjectCaseStudy' } },
        },
      },
      '/articles': {
        get: {
          summary: 'List published engineering blog articles',
          tags: ['Blog & Insights'],
          responses: { '200': { description: 'Array of BlogArticle objects' } },
        },
        post: {
          summary: 'Create or update a blog article (requires content:write)',
          tags: ['Blog & Insights'],
          security: [{ SessionCookieAuth: [] }],
          responses: { '200': { description: 'Saved BlogArticle' } },
        },
      },
      '/inquiries': {
        get: {
          summary: 'List quote requests and contact leads (requires leads:read)',
          tags: ['Lead & Quote Pipeline'],
          security: [{ SessionCookieAuth: [] }],
          responses: { '200': { description: 'Array of LeadInquiry records' } },
        },
        post: {
          summary: 'Submit a new quote request or contact inquiry (rate-limited & duplicate-checked)',
          tags: ['Lead & Quote Pipeline'],
          responses: {
            '200': { description: 'Inquiry persisted and reference code generated' },
            '400': { description: 'Zod validation error or honeypot triggered' },
            '429': { description: 'Rate limit exceeded' },
          },
        },
        patch: {
          summary: 'Update lead status, assignee, follow-up date, or internal notes (requires leads:write)',
          tags: ['Lead & Quote Pipeline'],
          security: [{ SessionCookieAuth: [] }],
          responses: { '200': { description: 'Updated LeadInquiry' } },
        },
      },
      '/careers': {
        get: {
          summary: 'List open career positions',
          tags: ['Careers'],
          responses: { '200': { description: 'Array of JobOpening objects' } },
        },
        post: {
          summary: 'Submit a job application or create a new job opening (admin)',
          tags: ['Careers'],
          responses: { '200': { description: 'Application recorded' } },
        },
      },
      '/cms': {
        get: {
          summary: 'Fetch complete Admin CMS snapshot and audit logs',
          tags: ['Admin CMS'],
          security: [{ SessionCookieAuth: [] }],
          responses: { '200': { description: 'CMS state snapshot' } },
        },
        post: {
          summary: 'Mutate FAQs, Testimonials, Media Assets, SEO Redirects, or Site Settings',
          tags: ['Admin CMS'],
          security: [{ SessionCookieAuth: [] }],
          responses: { '200': { description: 'Mutation result' } },
        },
      },
      '/search': {
        get: {
          summary: 'Full-text search across all published entities',
          tags: ['Search'],
          parameters: [{ name: 'q', in: 'query', required: true, schema: { type: 'string' } }],
          responses: { '200': { description: 'Categorized search matches' } },
        },
      },
    },
  };

  return NextResponse.json(spec);
}
