export type PublishStatus = 'published' | 'draft' | 'archived';

export type AdminRole =
  | 'super_admin'
  | 'admin'
  | 'editor'
  | 'sales'
  | 'viewer';

export interface SeoMetadata {
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogImage?: string;
  noindex?: boolean;
  keywords?: string[];
}

export interface CustomFormField {
  id: string;
  label: string;
  type: 'text' | 'select' | 'textarea' | 'checkbox';
  required: boolean;
  placeholder?: string;
  options?: string[];
}

export interface ServicePackageTier {
  name: string;
  targetAudience: string;
  priceRange: string;
  deliveryEstimate: string;
  deliverables: string[];
  recommended?: boolean;
}

export interface ServiceProcessStep {
  stepNumber: string;
  title: string;
  description: string;
  deliverable: string;
}

export interface ServiceFaq {
  question: string;
  answer: string;
}

export interface ServiceCategory {
  id: string;
  number: string;
  slug: string;
  name: string;
  tagline: string;
  summary: string;
  overview: string;
  keyProblemsSolved: string[];
  coreTechnologies: string[];
  targetIndustries: string[];
  heroMetric: string;
  status: PublishStatus;
  order: number;
  seo: SeoMetadata;
  updatedAt: string;
}

export interface ServiceItem {
  id: string;
  slug: string;
  categorySlug: string;
  categoryName: string;
  name: string;
  shortDescription: string;
  valueProposition: string;
  overview: string;
  problemsSolved: {
    title: string;
    description: string;
  }[];
  benefits: string[];
  keyFeatures: {
    title: string;
    description: string;
  }[];
  technologies: string[];
  deliveryProcess: ServiceProcessStep[];
  suitableIndustries: string[];
  relatedProjectSlugs: string[];
  relatedServiceSlugs: string[];
  testimonialIds: string[];
  faqs: ServiceFaq[];
  pricingTiers: ServicePackageTier[];
  estimatedDelivery: string;
  engagementModels: string[];
  customFormFields: CustomFormField[];
  featured: boolean;
  status: PublishStatus;
  seo: SeoMetadata;
  updatedAt: string;
}

export interface ProjectCaseStudy {
  id: string;
  slug: string;
  title: string;
  clientName: string;
  industry: string;
  categorySlug: string;
  categoryName: string;
  serviceSlugs: string[];
  summary: string;
  heroImage: string;
  deliveryYear: string;
  duration: string;
  teamSize: string;
  headlineMetric: string;
  metrics: {
    label: string;
    value: string;
    context: string;
  }[];
  challenge: string;
  architectureAndApproach: string;
  executionHighlights: string[];
  businessOutcome: string;
  technologies: string[];
  testimonialId?: string;
  liveUrl?: string;
  featured: boolean;
  status: PublishStatus;
  seo: SeoMetadata;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  slug: string;
  name: string;
  role: string;
  department: 'Executive Leadership' | 'Principal Architecture' | 'AI & Data Systems' | 'Cloud & Security' | 'Product & Design';
  location: string;
  experienceYears: number;
  shortBio: string;
  fullBiography: string[];
  specialties: string[];
  certifications: string[];
  education: string;
  projectSlugs: string[];
  linkedinUrl?: string;
  githubUrl?: string;
  featured: boolean;
  status: PublishStatus;
}

export interface BlogArticle {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  excerpt: string;
  category: string;
  tags: string[];
  authorSlug: string;
  authorName: string;
  authorRole: string;
  publishedAt: string;
  readTimeMinutes: number;
  heroImage: string;
  sections: {
    heading: string;
    body: string[];
    codeSnippet?: {
      language: string;
      caption: string;
      code: string;
    };
  }[];
  relatedServiceSlugs: string[];
  relatedArticleSlugs: string[];
  featured: boolean;
  status: PublishStatus;
  seo: SeoMetadata;
  updatedAt: string;
}

export interface ClientTestimonial {
  id: string;
  clientName: string;
  clientRole: string;
  companyName: string;
  industry: string;
  beforeState: string;
  changeImplemented: string;
  quantifiedOutcome: string;
  quote: string;
  projectSlug?: string;
  serviceSlug?: string;
  verifiedDate: string;
  featured: boolean;
  status: PublishStatus;
}

export interface IndustryVertical {
  id: string;
  slug: string;
  name: string;
  summary: string;
  complianceStandards: string[];
  challenges: string[];
  solutions: string[];
  keyMetrics: string;
  relatedServiceSlugs: string[];
  relatedProjectSlugs: string[];
}

export interface JobOpening {
  id: string;
  slug: string;
  title: string;
  department: string;
  location: string;
  workMode: 'Hybrid' | 'Remote' | 'On-Site';
  employmentType: 'Full-Time' | 'Contract';
  compensationRange: string;
  experienceLevel: string;
  summary: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave: string[];
  benefits: string[];
  status: PublishStatus;
  postedAt: string;
}

export interface JobApplication {
  id: string;
  jobSlug: string;
  jobTitle: string;
  fullName: string;
  email: string;
  phone: string;
  linkedinOrPortfolio: string;
  yearsExperience: number;
  coverNote: string;
  status: 'received' | 'screening' | 'interviewing' | 'offer' | 'archived';
  createdAt: string;
}

export interface FaqItem {
  id: string;
  category: 'General & Engagement' | 'Architecture & Engineering' | 'Security & Compliance' | 'Pricing & Governance';
  question: string;
  answer: string;
  serviceSlug?: string;
  order: number;
  status: PublishStatus;
}

export type LeadStatus =
  | 'new'
  | 'reviewing'
  | 'qualified'
  | 'proposal_sent'
  | 'won'
  | 'archived';

export interface LeadNote {
  id: string;
  authorName: string;
  authorRole: AdminRole;
  content: string;
  createdAt: string;
}

export interface LeadInquiry {
  id: string;
  referenceCode: string;
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
  status: LeadStatus;
  assignedTo?: string;
  followUpDate?: string;
  internalNotes: LeadNote[];
  duplicateHash: string;
  emailNotificationStatus: 'sent' | 'logged_local_preview' | 'failed';
  createdAt: string;
  updatedAt: string;
}

export interface MediaAsset {
  id: string;
  title: string;
  fileName: string;
  url: string;
  mimeType: string;
  aspectRatio: string;
  category: 'Hero & Architecture' | 'Case Study' | 'Editorial & Team' | 'Brand Asset';
  altText: string;
  uploadedBy: string;
  createdAt: string;
}

export interface SeoRedirect {
  id: string;
  sourcePath: string;
  destinationPath: string;
  statusCode: 301 | 302 | 307 | 308;
  active: boolean;
  notes?: string;
  createdAt: string;
}

export interface AdminUser {
  id: string;
  name: string;
  email: string;
  role: AdminRole;
  department: string;
  passwordHash: string;
  passwordSalt: string;
  active: boolean;
  lastLoginAt: string;
}

export interface AuditLogEntry {
  id: string;
  actorName: string;
  actorEmail: string;
  actorRole: AdminRole;
  action: string;
  resourceType:
    | 'service'
    | 'category'
    | 'project'
    | 'article'
    | 'team'
    | 'lead'
    | 'testimonial'
    | 'faq'
    | 'career'
    | 'media'
    | 'seo'
    | 'settings'
    | 'auth';
  resourceId: string;
  summary: string;
  ipAddress: string;
  createdAt: string;
}

export interface SiteSettings {
  companyName: string;
  legalName: string;
  tagline: string;
  foundedYear: number;
  headquarters: string;
  regionalOffices: {
    city: string;
    country: string;
    address: string;
    phone: string;
    timezone: string;
  }[];
  primaryEmail: string;
  securityEmail: string;
  pressEmail: string;
  phone: string;
  verifiedMetrics: {
    label: string;
    value: string;
    verificationNote: string;
  }[];
  certifications: string[];
  socialLinks: {
    linkedin: string;
    github: string;
    x: string;
    youtube: string;
  };
  seoDefaults: {
    titleTemplate: string;
    defaultDescription: string;
    robotsAllowPublic: boolean;
    disallowPaths: string[];
    sitemapEnabled: boolean;
  };
  updatedAt: string;
}
