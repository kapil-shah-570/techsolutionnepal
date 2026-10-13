import { NextRequest, NextResponse } from 'next/server';
import {
  getStore,
  persistStore,
  createLeadInquiry,
  checkRateLimit,
  appendAuditLog,
} from '@/lib/db/store';
import { getSessionFromRequest, hasPermission } from '@/lib/auth';
import { inquiryCreateSchema, inquiryUpdateSchema } from '@/lib/validations';

export async function GET(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!hasPermission(session.role, 'leads:read')) {
    return NextResponse.json(
      {
        success: false,
        error: `Forbidden: Role '${session.role}' does not have 'leads:read' permission to view confidential client inquiries.`,
      },
      { status: 403 }
    );
  }

  const { searchParams } = new URL(req.url);
  const statusFilter = searchParams.get('status');
  const store = getStore();
  const list =
    statusFilter && statusFilter !== 'all'
      ? store.inquiries.filter((i) => i.status === statusFilter)
      : store.inquiries;

  return NextResponse.json({
    success: true,
    count: list.length,
    data: list,
  });
}

export async function POST(req: NextRequest) {
  try {
    const ip =
      req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() || '127.0.0.1';
    const rate = checkRateLimit(`inquiry:${ip}`, 10, 60_000);
    if (!rate.allowed) {
      return NextResponse.json(
        {
          success: false,
          error:
            'Rate limit exceeded. Please wait 60 seconds before submitting another inquiry.',
        },
        { status: 429 }
      );
    }

    const body = await req.json();

    // Spam honeypot check
    if (body.honeypot && String(body.honeypot).trim().length > 0) {
      return NextResponse.json(
        { success: false, error: 'Automated spam submission rejected.' },
        { status: 400 }
      );
    }

    const parsed = inquiryCreateSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Please review the highlighted fields and try again.',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const { inquiry, duplicateDetected } = await createLeadInquiry(parsed.data);

    return NextResponse.json({
      success: true,
      duplicateDetected,
      message: duplicateDetected
        ? `We already received an identical inquiry from ${inquiry.businessEmail} within the last 24 hours. Your active reference code is ${inquiry.referenceCode}.`
        : `Your inquiry has been logged under reference ${inquiry.referenceCode}. A Principal Architect will respond within 1 business day.`,
      data: {
        referenceCode: inquiry.referenceCode,
        id: inquiry.id,
        serviceName: inquiry.serviceName,
        emailNotificationStatus: inquiry.emailNotificationStatus,
        createdAt: inquiry.createdAt,
      },
    });
  } catch {
    return NextResponse.json(
      {
        success: false,
        error: 'Unable to process inquiry at this time. Please try again.',
      },
      { status: 500 }
    );
  }
}

export async function PATCH(req: NextRequest) {
  const session = getSessionFromRequest(req);
  if (!hasPermission(session.role, 'leads:write')) {
    return NextResponse.json(
      {
        success: false,
        error: `Forbidden: Role '${session.role}' lacks 'leads:write' permission. Only Super Admin, Admin, or Sales roles can modify lead status or notes.`,
      },
      { status: 403 }
    );
  }

  try {
    const body = await req.json();
    const { id, ...updates } = body;
    if (!id) {
      return NextResponse.json(
        { success: false, error: 'Lead inquiry ID is required.' },
        { status: 400 }
      );
    }

    const parsed = inquiryUpdateSchema.safeParse(updates);
    if (!parsed.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Invalid lead update payload.',
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 }
      );
    }

    const store = getStore();
    const target = store.inquiries.find((i) => i.id === id);
    if (!target) {
      return NextResponse.json(
        { success: false, error: 'Lead inquiry not found.' },
        { status: 404 }
      );
    }

    if (parsed.data.status) {
      target.status = parsed.data.status;
    }
    if (typeof parsed.data.assignedTo === 'string') {
      target.assignedTo = parsed.data.assignedTo;
    }
    if (typeof parsed.data.followUpDate === 'string') {
      target.followUpDate = parsed.data.followUpDate;
    }
    if (parsed.data.noteContent) {
      target.internalNotes.unshift({
        id: `note-${Date.now()}`,
        authorName: session.name,
        authorRole: session.role,
        content: parsed.data.noteContent,
        createdAt: new Date().toISOString(),
      });
    }
    target.updatedAt = new Date().toISOString();
    persistStore(store);

    await appendAuditLog({
      actorName: session.name,
      actorEmail: session.email,
      actorRole: session.role,
      action: 'UPDATE_LEAD_INQUIRY',
      resourceType: 'lead',
      resourceId: target.referenceCode,
      summary: `Updated lead ${target.referenceCode} (${target.companyName}): status=[${target.status}], assignedTo=[${target.assignedTo}].`,
    });

    return NextResponse.json({
      success: true,
      data: target,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: 'Failed to update lead inquiry.' },
      { status: 500 }
    );
  }
}
