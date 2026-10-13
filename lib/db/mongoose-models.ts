import mongoose, { Schema, Model } from 'mongoose';

const SeoSchema = new Schema(
  {
    metaTitle: { type: String, required: true, trim: true },
    metaDescription: { type: String, required: true, trim: true },
    canonicalUrl: { type: String, trim: true },
    ogImage: { type: String, trim: true },
    noindex: { type: Boolean, default: false },
    keywords: [{ type: String, trim: true }],
  },
  { _id: false }
);

const ServiceCategorySchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    number: { type: String, required: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    name: { type: String, required: true, trim: true },
    tagline: { type: String, required: true },
    summary: { type: String, required: true },
    overview: { type: String, required: true },
    keyProblemsSolved: [{ type: String }],
    coreTechnologies: [{ type: String }],
    targetIndustries: [{ type: String }],
    heroMetric: { type: String },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'published',
      index: true,
    },
    order: { type: Number, default: 0, index: true },
    seo: { type: SeoSchema, required: true },
  },
  { timestamps: true }
);

const ServiceItemSchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    categorySlug: { type: String, required: true, index: true },
    categoryName: { type: String, required: true },
    name: { type: String, required: true, trim: true },
    shortDescription: { type: String, required: true },
    valueProposition: { type: String, required: true },
    overview: { type: String, required: true },
    problemsSolved: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    benefits: [{ type: String }],
    keyFeatures: [
      {
        title: { type: String, required: true },
        description: { type: String, required: true },
      },
    ],
    technologies: [{ type: String, index: true }],
    deliveryProcess: [
      {
        stepNumber: { type: String },
        title: { type: String },
        description: { type: String },
        deliverable: { type: String },
      },
    ],
    suitableIndustries: [{ type: String }],
    relatedProjectSlugs: [{ type: String }],
    relatedServiceSlugs: [{ type: String }],
    testimonialIds: [{ type: String }],
    faqs: [
      {
        question: { type: String },
        answer: { type: String },
      },
    ],
    pricingTiers: [
      {
        name: { type: String },
        targetAudience: { type: String },
        priceRange: { type: String },
        deliveryEstimate: { type: String },
        deliverables: [{ type: String }],
        recommended: { type: Boolean, default: false },
      },
    ],
    estimatedDelivery: { type: String, required: true },
    engagementModels: [{ type: String }],
    customFormFields: [
      {
        id: { type: String },
        label: { type: String },
        type: { type: String, enum: ['text', 'select', 'textarea', 'checkbox'] },
        required: { type: Boolean, default: false },
        placeholder: { type: String },
        options: [{ type: String }],
      },
    ],
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'published',
      index: true,
    },
    seo: { type: SeoSchema, required: true },
  },
  { timestamps: true }
);

ServiceItemSchema.index({ categorySlug: 1, slug: 1 }, { unique: true });

const ProjectCaseStudySchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    slug: { type: String, required: true, unique: true, index: true, lowercase: true, trim: true },
    title: { type: String, required: true, trim: true },
    clientName: { type: String, required: true },
    industry: { type: String, required: true, index: true },
    categorySlug: { type: String, required: true, index: true },
    categoryName: { type: String, required: true },
    serviceSlugs: [{ type: String, index: true }],
    summary: { type: String, required: true },
    heroImage: { type: String, required: true },
    deliveryYear: { type: String, required: true },
    duration: { type: String, required: true },
    teamSize: { type: String, required: true },
    headlineMetric: { type: String, required: true },
    metrics: [
      {
        label: { type: String },
        value: { type: String },
        context: { type: String },
      },
    ],
    challenge: { type: String, required: true },
    architectureAndApproach: { type: String, required: true },
    executionHighlights: [{ type: String }],
    businessOutcome: { type: String, required: true },
    technologies: [{ type: String }],
    testimonialId: { type: String },
    liveUrl: { type: String },
    featured: { type: Boolean, default: false, index: true },
    status: {
      type: String,
      enum: ['published', 'draft', 'archived'],
      default: 'published',
      index: true,
    },
    seo: { type: SeoSchema, required: true },
  },
  { timestamps: true }
);

const LeadInquirySchema = new Schema(
  {
    id: { type: String, required: true, unique: true, index: true },
    referenceCode: { type: String, required: true, unique: true, index: true },
    type: { type: String, enum: ['quote', 'contact', 'consultation'], default: 'quote' },
    fullName: { type: String, required: true, trim: true },
    businessEmail: { type: String, required: true, lowercase: true, trim: true, index: true },
    phone: { type: String },
    companyName: { type: String, required: true, trim: true },
    companyRole: { type: String },
    categorySlug: { type: String },
    serviceSlug: { type: String, index: true },
    serviceName: { type: String },
    budgetRange: { type: String, required: true },
    timeline: { type: String, required: true },
    preferredContactMethod: {
      type: String,
      enum: ['Email', 'Video Call', 'Phone'],
      default: 'Email',
    },
    projectDescription: { type: String, required: true },
    customFieldResponses: { type: Map, of: String },
    consentAccepted: { type: Boolean, required: true },
    status: {
      type: String,
      enum: ['new', 'reviewing', 'qualified', 'proposal_sent', 'won', 'archived'],
      default: 'new',
      index: true,
    },
    assignedTo: { type: String },
    followUpDate: { type: String },
    internalNotes: [
      {
        id: { type: String },
        authorName: { type: String },
        authorRole: { type: String },
        content: { type: String },
        createdAt: { type: String },
      },
    ],
    duplicateHash: { type: String, index: true },
    emailNotificationStatus: {
      type: String,
      enum: ['sent', 'logged_local_preview', 'failed'],
      default: 'logged_local_preview',
    },
  },
  { timestamps: true }
);

const AuditLogSchema = new Schema(
  {
    id: { type: String, required: true, unique: true },
    actorName: { type: String, required: true },
    actorEmail: { type: String, required: true, index: true },
    actorRole: { type: String, required: true },
    action: { type: String, required: true, index: true },
    resourceType: { type: String, required: true, index: true },
    resourceId: { type: String, required: true },
    summary: { type: String, required: true },
    ipAddress: { type: String },
    createdAt: { type: String, required: true, index: true },
  },
  { timestamps: false }
);

export const ServiceCategoryModel: Model<any> =
  mongoose.models.ServiceCategory ||
  mongoose.model('ServiceCategory', ServiceCategorySchema);

export const ServiceItemModel: Model<any> =
  mongoose.models.ServiceItem || mongoose.model('ServiceItem', ServiceItemSchema);

export const ProjectCaseStudyModel: Model<any> =
  mongoose.models.ProjectCaseStudy ||
  mongoose.model('ProjectCaseStudy', ProjectCaseStudySchema);

export const LeadInquiryModel: Model<any> =
  mongoose.models.LeadInquiry || mongoose.model('LeadInquiry', LeadInquirySchema);

export const AuditLogModel: Model<any> =
  mongoose.models.AuditLog || mongoose.model('AuditLog', AuditLogSchema);

let isConnected = false;

export async function connectToMongoIfConfigured(): Promise<boolean> {
  const uri = process.env.MONGODB_URI;
  if (!uri || uri.trim() === '') {
    return false;
  }
  if (isConnected && mongoose.connection.readyState === 1) {
    return true;
  }
  try {
    await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 3000,
    });
    isConnected = true;
    return true;
  } catch (err) {
    console.warn('MongoDB Atlas connection unavailable; falling back to local persistent store.', err);
    return false;
  }
}
