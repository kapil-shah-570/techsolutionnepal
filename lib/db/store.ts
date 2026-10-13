import fs from 'fs';
import path from 'path';
import crypto from 'crypto';
import {
  ServiceCategory,
  ServiceItem,
  ProjectCaseStudy,
  TeamMember,
  BlogArticle,
  ClientTestimonial,
  IndustryVertical,
  JobOpening,
  JobApplication,
  FaqItem,
  LeadInquiry,
  MediaAsset,
  SeoRedirect,
  AdminUser,
  AuditLogEntry,
  SiteSettings,
  PublishStatus,
  AdminRole,
} from '../types';
import {
  SEED_SITE_SETTINGS,
  SEED_CATEGORIES,
  SEED_SERVICES,
  SEED_PROJECTS,
  SEED_TEAM,
  SEED_ARTICLES,
  SEED_TESTIMONIALS,
  SEED_INDUSTRIES,
  SEED_JOBS,
  SEED_JOB_APPLICATIONS,
  SEED_FAQS,
  SEED_INQUIRIES,
  SEED_MEDIA_ASSETS,
  SEED_REDIRECTS,
  SEED_ADMIN_USERS,
  SEED_AUDIT_LOGS,
  GENERATED_IMAGES,
} from './seed-data';
import { connectToMongoIfConfigured, LeadInquiryModel, AuditLogModel } from './mongoose-models';

export interface CmsDatabaseState {
  siteSettings: SiteSettings;
  categories: ServiceCategory[];
  services: ServiceItem[];
  projects: ProjectCaseStudy[];
  team: TeamMember[];
  articles: BlogArticle[];
  testimonials: ClientTestimonial[];
  industries: IndustryVertical[];
  jobs: JobOpening[];
  jobApplications: JobApplication[];
  faqs: FaqItem[];
  inquiries: LeadInquiry[];
  mediaAssets: MediaAsset[];
  redirects: SeoRedirect[];
  adminUsers: AdminUser[];
  auditLogs: AuditLogEntry[];
}

const DATA_DIR = path.join(process.cwd(), '.data');
const DATA_FILE = path.join(DATA_DIR, 'cms-store.json');

declare global {
  // eslint-disable-next-line no-var
  var __TSN_CMS_STATE__: CmsDatabaseState | undefined;
  // eslint-disable-next-line no-var
  var __TSN_RATE_LIMIT__: Map<string, { count: number; resetAt: number }> | undefined;
}

function getInitialSeedState(): CmsDatabaseState {
  return {
    siteSettings: structuredClone(SEED_SITE_SETTINGS),
    categories: structuredClone(SEED_CATEGORIES),
    services: structuredClone(SEED_SERVICES),
    projects: structuredClone(SEED_PROJECTS),
    team: structuredClone(SEED_TEAM),
    articles: structuredClone(SEED_ARTICLES),
    testimonials: structuredClone(SEED_TESTIMONIALS),
    industries: structuredClone(SEED_INDUSTRIES),
    jobs: structuredClone(SEED_JOBS),
    jobApplications: structuredClone(SEED_JOB_APPLICATIONS),
    faqs: structuredClone(SEED_FAQS),
    inquiries: structuredClone(SEED_INQUIRIES),
    mediaAssets: structuredClone(SEED_MEDIA_ASSETS),
    redirects: structuredClone(SEED_REDIRECTS),
    adminUsers: structuredClone(SEED_ADMIN_USERS),
    auditLogs: structuredClone(SEED_AUDIT_LOGS),
  };
}

export function getStore(): CmsDatabaseState {
  if (global.__TSN_CMS_STATE__) {
    return global.__TSN_CMS_STATE__;
  }

  try {
    if (fs.existsSync(DATA_FILE)) {
      const raw = fs.readFileSync(DATA_FILE, 'utf8');
      const parsed = JSON.parse(raw) as CmsDatabaseState;
      if (parsed && Array.isArray(parsed.services) && parsed.services.length > 0) {
        global.__TSN_CMS_STATE__ = parsed;
        return parsed;
      }
    }
  } catch (err) {
    console.warn('Could not read persisted CMS state, initializing from seed data.', err);
  }

  const initial = getInitialSeedState();
  global.__TSN_CMS_STATE__ = initial;
  persistStore(initial);
  return initial;
}

export function persistStore(state: CmsDatabaseState = getStore()): void {
  global.__TSN_CMS_STATE__ = state;
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    fs.writeFileSync(DATA_FILE, JSON.stringify(state, null, 2), 'utf8');
  } catch (err) {
    console.warn('Non-fatal warning writing CMS state to disk:', err);
  }
}

export function checkRateLimit(
  key: string,
  maxRequests = 15,
  windowMs = 60_000
): { allowed: boolean; remaining: number } {
  if (!global.__TSN_RATE_LIMIT__) {
    global.__TSN_RATE_LIMIT__ = new Map();
  }
  const now = Date.now();
  const entry = global.__TSN_RATE_LIMIT__.get(key);
  if (!entry || entry.resetAt < now) {
    global.__TSN_RATE_LIMIT__.set(key, {
      count: 1,
      resetAt: now + windowMs,
    });
    return { allowed: true, remaining: maxRequests - 1 };
  }
  if (entry.count >= maxRequests) {
    return { allowed: false, remaining: 0 };
  }
  entry.count += 1;
  return { allowed: true, remaining: maxRequests - entry.count };
}

export async function appendAuditLog(params: {
  actorName: string;
  actorEmail: string;
  actorRole: AdminRole;
  action: string;
  resourceType: AuditLogEntry['resourceType'];
  resourceId: string;
  summary: string;
  ipAddress?: string;
}): Promise<AuditLogEntry> {
  const store = getStore();
  const entry: AuditLogEntry = {
    id: `aud-${Date.now()}-${Math.random().toString(36).slice(2, 6)}`,
    actorName: params.actorName,
    actorEmail: params.actorEmail,
    actorRole: params.actorRole,
    action: params.action,
    resourceType: params.resourceType,
    resourceId: params.resourceId,
    summary: params.summary,
    ipAddress: params.ipAddress || '127.0.0.1',
    createdAt: new Date().toISOString(),
  };

  store.auditLogs.unshift(entry);
  persistStore(store);

  const mongoReady = await connectToMongoIfConfigured();
  if (mongoReady) {
    try {
      await AuditLogModel.create(entry);
    } catch {
      // Ignore secondary sync errors
    }
  }
  return entry;
}

// ============================================================================
// PUBLIC & ADMIN READ HELPERS
// ============================================================================

const CATEGORY_SLUG_ALIASES: Record<string, string> = {
  'ai-ml': 'ai-machine-learning',
  'ai': 'ai-machine-learning',
  'web': 'web-development',
  'mobile': 'mobile-app-development',
  'cloud': 'cloud-computing-devops',
  'security': 'cybersecurity-it-consulting',
};

const SERVICE_SLUG_ALIASES: Record<string, string> = {
  'custom-ai-model-development': 'custom-ai-models-fine-tuning',
};

export function resolveCategorySlug(slug: string): string {
  return CATEGORY_SLUG_ALIASES[slug] || slug;
}

export function getPublishedCategories(): ServiceCategory[] {
  return getStore()
    .categories.filter((c) => c.status === 'published')
    .sort((a, b) => a.order - b.order);
}

export function getCategoryBySlug(
  slug: string,
  includeDrafts = false
): ServiceCategory | undefined {
  const normalized = resolveCategorySlug(slug);
  return getStore().categories.find(
    (c) =>
      (c.slug === slug || c.slug === normalized) &&
      (includeDrafts || c.status === 'published')
  );
}

export function getServices(options?: {
  categorySlug?: string;
  featuredOnly?: boolean;
  includeDrafts?: boolean;
  search?: string;
}): ServiceItem[] {
  let list = getStore().services;
  if (!options?.includeDrafts) {
    list = list.filter((s) => s.status === 'published');
  }
  if (options?.categorySlug) {
    const normalizedCat = resolveCategorySlug(options.categorySlug);
    list = list.filter(
      (s) =>
        s.categorySlug === options.categorySlug ||
        s.categorySlug === normalizedCat
    );
  }
  if (options?.featuredOnly) {
    list = list.filter((s) => s.featured);
  }
  if (options?.search) {
    const q = options.search.toLowerCase().trim();
    list = list.filter(
      (s) =>
        s.name.toLowerCase().includes(q) ||
        s.shortDescription.toLowerCase().includes(q) ||
        s.categoryName.toLowerCase().includes(q) ||
        s.technologies.some((t) => t.toLowerCase().includes(q))
    );
  }
  return list;
}

export function getServiceBySlug(
  slug: string,
  includeDrafts = false
): ServiceItem | undefined {
  const aliased = SERVICE_SLUG_ALIASES[slug] || slug;
  return getStore().services.find(
    (s) =>
      (s.slug === slug || s.slug === aliased) &&
      (includeDrafts || s.status === 'published')
  );
}

export function getProjects(options?: {
  categorySlug?: string;
  industry?: string;
  featuredOnly?: boolean;
  includeDrafts?: boolean;
}): ProjectCaseStudy[] {
  let list = getStore().projects;
  if (!options?.includeDrafts) {
    list = list.filter((p) => p.status === 'published');
  }
  if (options?.categorySlug && options.categorySlug !== 'all') {
    list = list.filter((p) => p.categorySlug === options.categorySlug);
  }
  if (options?.industry && options.industry !== 'all') {
    list = list.filter((p) => p.industry === options.industry);
  }
  if (options?.featuredOnly) {
    list = list.filter((p) => p.featured);
  }
  return list;
}

export function getProjectBySlug(
  slug: string,
  includeDrafts = false
): ProjectCaseStudy | undefined {
  return getStore().projects.find(
    (p) => p.slug === slug && (includeDrafts || p.status === 'published')
  );
}

export function getTeamMembers(includeDrafts = false): TeamMember[] {
  return getStore().team.filter(
    (m) => includeDrafts || m.status === 'published'
  );
}

export function getTeamMemberBySlug(
  slug: string,
  includeDrafts = false
): TeamMember | undefined {
  return getStore().team.find(
    (m) => m.slug === slug && (includeDrafts || m.status === 'published')
  );
}

export function getArticles(options?: {
  category?: string;
  tag?: string;
  includeDrafts?: boolean;
}): BlogArticle[] {
  let list = getStore().articles;
  if (!options?.includeDrafts) {
    list = list.filter((a) => a.status === 'published');
  }
  if (options?.category && options.category !== 'all') {
    list = list.filter((a) => a.category === options.category);
  }
  if (options?.tag) {
    list = list.filter((a) => a.tags.includes(options.tag!));
  }
  return list.sort((a, b) => b.publishedAt.localeCompare(a.publishedAt));
}

export function getArticleBySlug(
  slug: string,
  includeDrafts = false
): BlogArticle | undefined {
  return getStore().articles.find(
    (a) => a.slug === slug && (includeDrafts || a.status === 'published')
  );
}

export function getTestimonials(includeDrafts = false): ClientTestimonial[] {
  return getStore().testimonials.filter(
    (t) => includeDrafts || t.status === 'published'
  );
}

export function getIndustries(): IndustryVertical[] {
  return getStore().industries;
}

export function getJobs(includeDrafts = false): JobOpening[] {
  return getStore().jobs.filter(
    (j) => includeDrafts || j.status === 'published'
  );
}

export function getJobBySlug(
  slug: string,
  includeDrafts = false
): JobOpening | undefined {
  return getStore().jobs.find(
    (j) => j.slug === slug && (includeDrafts || j.status === 'published')
  );
}

export function getFaqs(includeDrafts = false): FaqItem[] {
  return getStore()
    .faqs.filter((f) => includeDrafts || f.status === 'published')
    .sort((a, b) => a.order - b.order);
}

// ============================================================================
// MUTATION HELPERS (SERVICES, PROJECTS, ARTICLES, INQUIRIES)
// ============================================================================

export function upsertService(input: {
  slug: string;
  categorySlug: string;
  name: string;
  shortDescription: string;
  valueProposition: string;
  overview: string;
  technologies: string[];
  suitableIndustries: string[];
  estimatedDelivery: string;
  featured: boolean;
  status: PublishStatus;
}): ServiceItem {
  const store = getStore();
  const category =
    store.categories.find((c) => c.slug === input.categorySlug) ||
    store.categories[0];

  const existingIndex = store.services.findIndex((s) => s.slug === input.slug);
  const now = new Date().toISOString();

  if (existingIndex >= 0) {
    const existing = store.services[existingIndex];
    const updated: ServiceItem = {
      ...existing,
      ...input,
      categoryName: category.name,
      seo: {
        metaTitle: `${input.name} | ${category.name} — Tech Solution Nepal`,
        metaDescription: input.shortDescription,
      },
      updatedAt: now,
    };
    store.services[existingIndex] = updated;
    persistStore(store);
    return updated;
  }

  const created: ServiceItem = {
    id: `srv-${Date.now()}`,
    slug: input.slug,
    categorySlug: category.slug,
    categoryName: category.name,
    name: input.name,
    shortDescription: input.shortDescription,
    valueProposition: input.valueProposition,
    overview: input.overview,
    problemsSolved: [
      {
        title: 'Eliminate Legacy Bottlenecks & Fragility',
        description: `Modernizes ${category.name.toLowerCase()} workflows with deterministic reliability and clean architecture.`,
      },
      {
        title: 'High Concurrency & Sub-100ms Performance',
        description: 'Engineered for horizontal scale, edge caching, and strict latency budgets.',
      },
    ],
    benefits: [
      '100% client intellectual property ownership and documented repositories.',
      'Automated CI/CD test coverage and security posture verification.',
      'Dedicated Principal Architect oversight from blueprint to cutover.',
    ],
    keyFeatures: [
      {
        title: 'Modular Domain Architecture',
        description: 'Decoupled APIs and clean domain boundaries built for maintainability.',
      },
      {
        title: 'Enterprise Security & Auditability',
        description: 'RBAC, encryption, and structured telemetry included by default.',
      },
    ],
    technologies:
      input.technologies.length > 0
        ? input.technologies
        : category.coreTechnologies.slice(0, 5),
    deliveryProcess: SEED_SERVICES[0].deliveryProcess,
    suitableIndustries:
      input.suitableIndustries.length > 0
        ? input.suitableIndustries
        : category.targetIndustries,
    relatedProjectSlugs: ['institutional-settlement-ledger', 'clinical-genomics-triage-ai'],
    relatedServiceSlugs: store.services
      .filter((s) => s.categorySlug === category.slug)
      .slice(0, 2)
      .map((s) => s.slug),
    testimonialIds: ['test-01'],
    faqs: SEED_SERVICES[0].faqs,
    pricingTiers: SEED_SERVICES[0].pricingTiers,
    estimatedDelivery: input.estimatedDelivery || '8–14 Weeks',
    engagementModels: [
      'Fixed-Scope Milestone Delivery',
      'Dedicated Principal-Led Engineering Pod',
    ],
    customFormFields: SEED_SERVICES[0].customFormFields,
    featured: input.featured,
    status: input.status,
    seo: {
      metaTitle: `${input.name} | ${category.name} — Tech Solution Nepal`,
      metaDescription: input.shortDescription,
    },
    updatedAt: now,
  };

  store.services.unshift(created);
  persistStore(store);
  return created;
}

export function upsertProject(input: {
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  categorySlug: string;
  summary: string;
  headlineMetric: string;
  challenge: string;
  architectureAndApproach: string;
  businessOutcome: string;
  technologies: string[];
  deliveryYear: string;
  duration: string;
  teamSize: string;
  heroImage?: string;
  featured: boolean;
  status: PublishStatus;
}): ProjectCaseStudy {
  const store = getStore();
  const category =
    store.categories.find((c) => c.slug === input.categorySlug) ||
    store.categories[0];
  const existingIndex = store.projects.findIndex((p) => p.slug === input.slug);
  const now = new Date().toISOString();

  if (existingIndex >= 0) {
    const existing = store.projects[existingIndex];
    const updated: ProjectCaseStudy = {
      ...existing,
      ...input,
      categoryName: category.name,
      heroImage: input.heroImage || existing.heroImage || GENERATED_IMAGES.fintechPlatform,
      seo: {
        metaTitle: `Case Study: ${input.title} | Tech Solution Nepal`,
        metaDescription: input.summary,
      },
      updatedAt: now,
    };
    store.projects[existingIndex] = updated;
    persistStore(store);
    return updated;
  }

  const created: ProjectCaseStudy = {
    id: `proj-${Date.now()}`,
    slug: input.slug,
    title: input.title,
    clientName: input.clientName,
    industry: input.industry,
    categorySlug: category.slug,
    categoryName: category.name,
    serviceSlugs: ['nextjs-web-applications'],
    summary: input.summary,
    heroImage: input.heroImage || GENERATED_IMAGES.fintechPlatform,
    deliveryYear: input.deliveryYear,
    duration: input.duration,
    teamSize: input.teamSize,
    headlineMetric: input.headlineMetric,
    metrics: [
      {
        label: 'Verified Impact',
        value: input.headlineMetric,
        context: 'Measured in production post-cutover.',
      },
    ],
    challenge: input.challenge,
    architectureAndApproach: input.architectureAndApproach,
    executionHighlights: [
      'Architected modular domain services with comprehensive automated testing.',
      'Executed zero-downtime production deployment with full observability.',
    ],
    businessOutcome: input.businessOutcome,
    technologies: input.technologies,
    featured: input.featured,
    status: input.status,
    seo: {
      metaTitle: `Case Study: ${input.title} | Tech Solution Nepal`,
      metaDescription: input.summary,
    },
    updatedAt: now,
  };

  store.projects.unshift(created);
  persistStore(store);
  return created;
}

export async function createLeadInquiry(input: {
  type: 'quote' | 'contact' | 'consultation';
  fullName: string;
  businessEmail: string;
  phone?: string;
  companyName: string;
  companyRole?: string;
  categorySlug?: string;
  serviceSlug?: string;
  serviceName?: string;
  budgetRange: string;
  timeline: string;
  preferredContactMethod: 'Email' | 'Video Call' | 'Phone';
  projectDescription: string;
  customFieldResponses?: Record<string, string>;
  consentAccepted: boolean;
}): Promise<{ inquiry: LeadInquiry; duplicateDetected: boolean }> {
  const store = getStore();

  const duplicateHash = crypto
    .createHash('sha256')
    .update(
      `${input.businessEmail.toLowerCase()}|${input.serviceSlug || ''}|${input.projectDescription.slice(0, 100).toLowerCase()}`
    )
    .digest('hex')
    .slice(0, 24);

  const recentDuplicate = store.inquiries.find(
    (inq) =>
      inq.duplicateHash === duplicateHash &&
      Date.now() - new Date(inq.createdAt).getTime() < 1000 * 60 * 60 * 24
  );

  if (recentDuplicate) {
    return { inquiry: recentDuplicate, duplicateDetected: true };
  }

  const matchedService = input.serviceSlug
    ? store.services.find((s) => s.slug === input.serviceSlug)
    : undefined;

  const now = new Date().toISOString();
  const randomCode = Math.floor(1000 + Math.random() * 9000);

  let emailStatus: LeadInquiry['emailNotificationStatus'] = 'logged_local_preview';
  if (process.env.RESEND_API_KEY) {
    try {
      const res = await fetch('https://api.resend.com/emails', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          from: 'Tech Solution Nepal <notifications@techsolutionnepal.com>',
          to: [
            process.env.NOTIFICATION_EMAIL || 'contact@techsolutionnepal.com',
          ],
          subject: `[New ${input.type.toUpperCase()}] ${input.companyName} — ${input.fullName}`,
          text: `Reference: TSN-2026-${randomCode}\nName: ${input.fullName}\nEmail: ${input.businessEmail}\nCompany: ${input.companyName}\nService: ${matchedService?.name || input.serviceName || 'General Enterprise Inquiry'}\nBudget: ${input.budgetRange}\nTimeline: ${input.timeline}\n\nDescription:\n${input.projectDescription}`,
        }),
      });
      emailStatus = res.ok ? 'sent' : 'failed';
    } catch {
      emailStatus = 'failed';
    }
  }

  const inquiry: LeadInquiry = {
    id: `lead-${Date.now()}`,
    referenceCode: `TSN-2026-${randomCode}`,
    type: input.type,
    fullName: input.fullName,
    businessEmail: input.businessEmail,
    phone: input.phone,
    companyName: input.companyName,
    companyRole: input.companyRole,
    categorySlug: input.categorySlug || matchedService?.categorySlug,
    serviceSlug: input.serviceSlug,
    serviceName:
      matchedService?.name || input.serviceName || 'General Enterprise Advisory',
    budgetRange: input.budgetRange,
    timeline: input.timeline,
    preferredContactMethod: input.preferredContactMethod,
    projectDescription: input.projectDescription,
    customFieldResponses: input.customFieldResponses || {},
    consentAccepted: input.consentAccepted,
    status: 'new',
    assignedTo: 'Unassigned (Triage Queue)',
    followUpDate: new Date(Date.now() + 1000 * 60 * 60 * 24 * 2)
      .toISOString()
      .slice(0, 10),
    internalNotes: [],
    duplicateHash,
    emailNotificationStatus: emailStatus,
    createdAt: now,
    updatedAt: now,
  };

  store.inquiries.unshift(inquiry);
  persistStore(store);

  const mongoReady = await connectToMongoIfConfigured();
  if (mongoReady) {
    try {
      await LeadInquiryModel.create(inquiry);
    } catch {
      // Ignore secondary sync error
    }
  }

  return { inquiry, duplicateDetected: false };
}

export interface SearchResultItem {
  id: string;
  type: 'Service' | 'Category' | 'Case Study' | 'Article' | 'Team' | 'Career' | 'FAQ';
  title: string;
  summary: string;
  url: string;
  metadata: string;
}

export function globalSearch(rawQuery: string): SearchResultItem[] {
  const q = rawQuery.toLowerCase().trim();
  if (!q) return [];

  const results: SearchResultItem[] = [];

  for (const cat of getPublishedCategories()) {
    if (
      cat.name.toLowerCase().includes(q) ||
      cat.summary.toLowerCase().includes(q) ||
      cat.coreTechnologies.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        id: cat.id,
        type: 'Category',
        title: `${cat.number}. ${cat.name}`,
        summary: cat.summary,
        url: `/services/${cat.slug}`,
        metadata: `Service Category · ${cat.coreTechnologies.slice(0, 3).join(' · ')}`,
      });
    }
  }

  for (const srv of getServices()) {
    if (
      srv.name.toLowerCase().includes(q) ||
      srv.shortDescription.toLowerCase().includes(q) ||
      srv.overview.toLowerCase().includes(q) ||
      srv.technologies.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        id: srv.id,
        type: 'Service',
        title: srv.name,
        summary: srv.shortDescription,
        url: `/services/${srv.categorySlug}/${srv.slug}`,
        metadata: `${srv.categoryName} · ${srv.estimatedDelivery}`,
      });
    }
  }

  for (const proj of getProjects()) {
    if (
      proj.title.toLowerCase().includes(q) ||
      proj.summary.toLowerCase().includes(q) ||
      proj.clientName.toLowerCase().includes(q) ||
      proj.industry.toLowerCase().includes(q) ||
      proj.technologies.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        id: proj.id,
        type: 'Case Study',
        title: proj.title,
        summary: proj.summary,
        url: `/projects/${proj.slug}`,
        metadata: `${proj.industry} · ${proj.headlineMetric}`,
      });
    }
  }

  for (const art of getArticles()) {
    if (
      art.title.toLowerCase().includes(q) ||
      art.excerpt.toLowerCase().includes(q) ||
      art.tags.some((t) => t.toLowerCase().includes(q))
    ) {
      results.push({
        id: art.id,
        type: 'Article',
        title: art.title,
        summary: art.excerpt,
        url: `/blog/${art.slug}`,
        metadata: `${art.category} · ${art.readTimeMinutes} min read`,
      });
    }
  }

  for (const member of getTeamMembers()) {
    if (
      member.name.toLowerCase().includes(q) ||
      member.role.toLowerCase().includes(q) ||
      member.specialties.some((s) => s.toLowerCase().includes(q))
    ) {
      results.push({
        id: member.id,
        type: 'Team',
        title: member.name,
        summary: member.shortBio,
        url: `/team/${member.slug}`,
        metadata: `${member.role} · ${member.location}`,
      });
    }
  }

  for (const job of getJobs()) {
    if (
      job.title.toLowerCase().includes(q) ||
      job.summary.toLowerCase().includes(q) ||
      job.department.toLowerCase().includes(q)
    ) {
      results.push({
        id: job.id,
        type: 'Career',
        title: job.title,
        summary: job.summary,
        url: `/careers/${job.slug}`,
        metadata: `${job.location} · ${job.compensationRange}`,
      });
    }
  }

  for (const faq of getFaqs()) {
    if (
      faq.question.toLowerCase().includes(q) ||
      faq.answer.toLowerCase().includes(q)
    ) {
      results.push({
        id: faq.id,
        type: 'FAQ',
        title: faq.question,
        summary: faq.answer,
        url: `/faqs`,
        metadata: faq.category,
      });
    }
  }

  return results;
}
