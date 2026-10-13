import { z } from 'zod';

/**
 * Sanitizes plain text and rich content strings by stripping dangerous script tags,
 * inline event handlers, and javascript: URIs.
 */
export function sanitizeString(input: string): string {
  if (!input) return '';
  return input
    .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
    .replace(/on\w+\s*=\s*["'][^"']*["']/gi, '')
    .replace(/javascript\s*:/gi, '')
    .trim();
}

export const seoMetadataSchema = z.object({
  metaTitle: z.string().min(5).max(120).transform(sanitizeString),
  metaDescription: z.string().min(10).max(320).transform(sanitizeString),
  canonicalUrl: z.string().optional(),
  ogImage: z.string().optional(),
  noindex: z.boolean().optional().default(false),
  keywords: z.array(z.string().transform(sanitizeString)).optional().default([]),
});

export const inquiryCreateSchema = z.object({
  type: z.enum(['quote', 'contact', 'consultation']).default('quote'),
  fullName: z
    .string()
    .min(2, 'Full name must be at least 2 characters.')
    .max(100)
    .transform(sanitizeString),
  businessEmail: z
    .string()
    .email('Please provide a valid work email address.')
    .max(150)
    .transform((v) => v.toLowerCase().trim()),
  phone: z
    .string()
    .max(40)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : undefined)),
  companyName: z
    .string()
    .min(2, 'Company or organization name is required.')
    .max(120)
    .transform(sanitizeString),
  companyRole: z
    .string()
    .max(80)
    .optional()
    .transform((v) => (v ? sanitizeString(v) : undefined)),
  categorySlug: z.string().max(100).optional(),
  serviceSlug: z.string().max(100).optional(),
  serviceName: z.string().max(140).optional(),
  budgetRange: z
    .string()
    .min(2, 'Please select an estimated budget range.')
    .max(80)
    .transform(sanitizeString),
  timeline: z
    .string()
    .min(2, 'Please select a target delivery timeline.')
    .max(80)
    .transform(sanitizeString),
  preferredContactMethod: z
    .enum(['Email', 'Video Call', 'Phone'])
    .default('Email'),
  projectDescription: z
    .string()
    .min(20, 'Please provide at least 20 characters describing your objectives.')
    .max(4000)
    .transform(sanitizeString),
  customFieldResponses: z
    .record(z.string(), z.string().transform(sanitizeString))
    .optional(),
  consentAccepted: z.boolean().refine((val) => val === true, {
    message: 'You must accept the privacy and data processing notice.',
  }),
  honeypot: z.string().max(0).optional(), // Spam bot trap
});

export const inquiryUpdateSchema = z.object({
  status: z
    .enum(['new', 'reviewing', 'qualified', 'proposal_sent', 'won', 'archived'])
    .optional(),
  assignedTo: z.string().max(100).optional(),
  followUpDate: z.string().max(40).optional(),
  noteContent: z.string().min(2).max(1500).transform(sanitizeString).optional(),
});

export const serviceUpsertSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/, 'Slug must contain only lowercase letters, numbers, and hyphens.'),
  categorySlug: z.string().min(2).max(100),
  name: z.string().min(3).max(120).transform(sanitizeString),
  shortDescription: z.string().min(10).max(260).transform(sanitizeString),
  valueProposition: z.string().min(10).max(400).transform(sanitizeString),
  overview: z.string().min(20).max(3000).transform(sanitizeString),
  problemsSolved: z
    .array(
      z.object({
        title: z.string().transform(sanitizeString),
        description: z.string().transform(sanitizeString),
      })
    )
    .default([]),
  benefits: z.array(z.string().transform(sanitizeString)).default([]),
  keyFeatures: z
    .array(
      z.object({
        title: z.string().transform(sanitizeString),
        description: z.string().transform(sanitizeString),
      })
    )
    .default([]),
  technologies: z.array(z.string().transform(sanitizeString)).default([]),
  suitableIndustries: z.array(z.string().transform(sanitizeString)).default([]),
  estimatedDelivery: z.string().max(100).default('8–14 Weeks'),
  engagementModels: z
    .array(z.string().transform(sanitizeString))
    .default(['Fixed-Scope Milestone Delivery', 'Dedicated Engineering Pod']),
  featured: z.boolean().default(false),
  status: z.enum(['published', 'draft', 'archived']).default('published'),
  seo: seoMetadataSchema.optional(),
});

export const projectUpsertSchema = z.object({
  slug: z
    .string()
    .min(2)
    .max(100)
    .regex(/^[a-z0-9-]+$/),
  title: z.string().min(4).max(160).transform(sanitizeString),
  clientName: z.string().min(2).max(120).transform(sanitizeString),
  industry: z.string().min(2).max(100).transform(sanitizeString),
  categorySlug: z.string().min(2).max(100),
  summary: z.string().min(15).max(400).transform(sanitizeString),
  headlineMetric: z.string().min(3).max(120).transform(sanitizeString),
  challenge: z.string().min(20).max(3000).transform(sanitizeString),
  architectureAndApproach: z.string().min(20).max(3000).transform(sanitizeString),
  businessOutcome: z.string().min(20).max(2000).transform(sanitizeString),
  technologies: z.array(z.string().transform(sanitizeString)).default([]),
  deliveryYear: z.string().max(10).default('2026'),
  duration: z.string().max(40).default('16 Weeks'),
  teamSize: z.string().max(40).default('6 Senior Engineers'),
  heroImage: z.string().optional(),
  featured: z.boolean().default(false),
  status: z.enum(['published', 'draft', 'archived']).default('published'),
});

export const articleUpsertSchema = z.object({
  slug: z
    .string()
    .min(3)
    .max(120)
    .regex(/^[a-z0-9-]+$/),
  title: z.string().min(5).max(180).transform(sanitizeString),
  subtitle: z.string().min(5).max(240).transform(sanitizeString),
  excerpt: z.string().min(15).max(400).transform(sanitizeString),
  category: z.string().min(2).max(80).transform(sanitizeString),
  tags: z.array(z.string().transform(sanitizeString)).default([]),
  authorSlug: z.string().default('marcus-vance'),
  readTimeMinutes: z.number().int().min(1).max(60).default(7),
  status: z.enum(['published', 'draft', 'archived']).default('published'),
  featured: z.boolean().default(false),
  sections: z
    .array(
      z.object({
        heading: z.string().transform(sanitizeString),
        body: z.array(z.string().transform(sanitizeString)),
      })
    )
    .default([]),
});

export const jobApplicationSchema = z.object({
  jobSlug: z.string().min(2).max(100),
  jobTitle: z.string().min(2).max(140).transform(sanitizeString),
  fullName: z.string().min(2).max(100).transform(sanitizeString),
  email: z.string().email().max(150),
  phone: z.string().min(5).max(40).transform(sanitizeString),
  linkedinOrPortfolio: z.string().min(5).max(250).transform(sanitizeString),
  yearsExperience: z.coerce.number().min(0).max(50),
  coverNote: z.string().min(20).max(3000).transform(sanitizeString),
});

export const redirectCreateSchema = z.object({
  sourcePath: z
    .string()
    .min(2)
    .max(200)
    .regex(/^\//, 'Source path must start with /'),
  destinationPath: z.string().min(1).max(300),
  statusCode: z.union([
    z.literal(301),
    z.literal(302),
    z.literal(307),
    z.literal(308),
  ]),
  notes: z.string().max(240).optional(),
});
