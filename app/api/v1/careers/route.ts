import { NextRequest, NextResponse } from 'next/server';
import {
  getJobs,
  getStore,
  persistStore,
  checkRateLimit,
  appendAuditLog,
} from '@/lib/db/store';
import { jobApplicationSchema, sanitizeString } from '@/lib/validations';
import { getSessionFromRequest, hasPermission } from '@/lib/auth';
import { JobApplication, JobOpening } from '@/lib/types';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const includeApplications = searchParams.get('applications') === 'true';

  if (includeApplications) {
    const session = getSessionFromRequest(req);
    if (!hasPermission(session.role, 'content:read')) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }
    const store = getStore();
    return NextResponse.json({
      success: true,
      data: {
        jobs: store.jobs,
        applications: store.jobApplications,
      },
    });
  }

  const jobs = getJobs(false);
  return NextResponse.json({
    success: true,
    count: jobs.length,
    data: jobs,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    // Check if admin is creating a new job opening vs candidate submitting an application
    if (body.action === 'create_job') {
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

      const store = getStore();
      const slug = sanitizeString(body.slug || body.title)
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/(^-|-$)/g, '');

      const newJob: JobOpening = {
        id: `job-${Date.now()}`,
        slug,
        title: sanitizeString(body.title || 'Senior Systems Engineer'),
        department: sanitizeString(body.department || 'Principal Architecture'),
        location: sanitizeString(body.location || 'Zurich / Remote'),
        workMode: body.workMode || 'Hybrid',
        employmentType: 'Full-Time',
        compensationRange: sanitizeString(
          body.compensationRange || '$170,000 – $210,000 + Profit Share'
        ),
        experienceLevel: sanitizeString(body.experienceLevel || '6+ Years'),
        summary: sanitizeString(body.summary || ''),
        responsibilities: [
          'Architect and deliver production-grade distributed systems for enterprise clients.',
          'Write deterministic unit, integration, and end-to-end automated tests.',
        ],
        requirements: [
          '6+ years of production engineering experience in TypeScript, Go, Python, or Rust.',
          'Deep understanding of relational and document databases, cloud security, and CI/CD.',
        ],
        niceToHave: ['Experience with regulated financial or clinical workflows.'],
        benefits: [
          'Top-decile compensation & annual profit sharing.',
          '$6,000 annual hardware and research stipend.',
        ],
        status: 'published',
        postedAt: new Date().toISOString().slice(0, 10),
      };

      store.jobs.unshift(newJob);
      persistStore(store);

      await appendAuditLog({
        actorName: session.name,
        actorEmail: session.email,
        actorRole: session.role,
        action: 'CREATE_JOB_OPENING',
        resourceType: 'career',
        resourceId: newJob.slug,
        summary: `Published career opening '${newJob.title}' (${newJob.location}).`,
      });

      return NextResponse.json({ success: true, data: newJob });
    }

    // Candidate job application submission
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const rate = checkRateLimit(`career:${ip}`, 8, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error: 'Rate limit exceeded. Please wait before submitting again.',
        },
        { status: 429 }
      );
    }

    const parsed = jobApplicationSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please check your application details.',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const store = getStore();
    const application: JobApplication = {
      id: `app-${Date.now()}`,
      ...parsed.data,
      status: 'received',
      createdAt: new Date().toISOString(),
    };

    store.jobApplications.unshift(application);
    persistStore(store);

    return NextResponse.json({
      success: true,
      message: `Thank you, ${application.fullName}. Your application for ${application.jobTitle} has been recorded for review by our engineering talent committee.`,
      data: application,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to process request.' },
      { status: 500 }
    );
  }
}
