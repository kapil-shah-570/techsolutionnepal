import { sanitizeString, sanitizeSlug, quoteInquirySchema, serviceUpsertSchema } from '../lib/validations';
import { hasPermission, signSessionToken, verifySessionToken } from '../lib/auth';

/**
 * Automated verification suite for CMS security, input sanitization, RBAC enforcement,
 * and schema validation.
 */
export function runSecurityAndValidationTests() {
  const results: { test: string; passed: boolean }[] = [];

  // 1. XSS Sanitization Test
  const dirtyHtml = `<script>alert("xss")</script><p onclick="steal()">Enterprise Architecture</p>`;
  const cleaned = sanitizeString(dirtyHtml);
  results.push({
    test: 'Sanitizes <script> tags and inline event handlers',
    passed: !cleaned.includes('<script>') && !cleaned.includes('onclick='),
  });

  // 2. Slug Normalization Test
  const rawSlug = 'Custom AI Model Development & Fine-Tuning!!';
  const normalizedSlug = sanitizeSlug(rawSlug);
  results.push({
    test: 'Normalizes arbitrary titles into URL-safe lowercase slugs',
    passed: normalizedSlug === 'custom-ai-model-development-fine-tuning',
  });

  // 3. RBAC Matrix Enforcement Test
  results.push({
    test: 'Enforces RBAC permissions across Viewer, Sales, Editor, and Super Admin roles',
    passed:
      !hasPermission('viewer', 'services:write') &&
      !hasPermission('sales', 'services:write') &&
      hasPermission('sales', 'leads:write') &&
      hasPermission('editor', 'services:write') &&
      hasPermission('super_admin', 'rbac:manage'),
  });

  // 4. Session Token Signature Integrity Test
  const token = signSessionToken({
    userId: 'usr-1',
    email: 'elena.vance@techsolutionnepal.com',
    name: 'Elena Vance',
    role: 'super_admin',
    exp: Date.now() + 60_000,
  });
  const verified = verifySessionToken(token);
  const tampered = verifySessionToken(token + 'tampered');
  results.push({
    test: 'Verifies valid HMAC-SHA256 session tokens and rejects tampered tokens',
    passed: verified?.role === 'super_admin' && tampered === null,
  });

  // 5. Quote Request Zod Schema Validation Test
  const validQuote = quoteInquirySchema.safeParse({
    type: 'quote',
    fullName: 'Marcus Vance',
    email: 'marcus@enterprise.io',
    company: 'Enterprise Corp',
    serviceCategory: 'ai-machine-learning',
    budgetRange: '$100,000 – $250,000',
    timeline: 'Q3 Launch',
    projectSummary: 'We need an air-gapped enterprise RAG platform with SOC2 compliance.',
    consentAccepted: true,
    honeypot: '',
  });
  results.push({
    test: 'Validates complete quote inquiry payloads with Zod schema',
    passed: validQuote.success,
  });

  // 6. Service Upsert Schema Validation Test
  const invalidService = serviceUpsertSchema.safeParse({
    slug: 'ab',
    categorySlug: '',
    name: 'Short',
  });
  results.push({
    test: 'Rejects incomplete or malformed service creation payloads',
    passed: !invalidService.success,
  });

  return results;
}
