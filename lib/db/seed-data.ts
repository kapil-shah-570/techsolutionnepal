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
} from '../types';
import { hashPassword } from '../auth';

export const GENERATED_IMAGES = {
  heroTechNepal:
    '/src/assets/images/hero_tech_nepal_hub_1791828170517.jpg',
  teamNepal:
    '/src/assets/images/team_nepal_engineers_1791828181244.jpg',
  fintechNepal:
    '/src/assets/images/project_fintech_nepal_1791828192313.jpg',
  ecommerceLogistics:
    '/src/assets/images/project_ecommerce_logistics_1791828211445.jpg',
  heroArchitecture:
    '/src/assets/images/hero_enterprise_architecture_1791637681108.jpg',
  fintechPlatform:
    '/src/assets/images/project_fintech_platform_1791637694196.jpg',
  healthcareAi:
    '/src/assets/images/project_healthcare_ai_1791637706463.jpg',
  cloudGrid: '/src/assets/images/project_cloud_grid_1791637721502.jpg',
  teamStudio:
    '/src/assets/images/team_leadership_studio_1791637731833.jpg',
};

export const SEED_SITE_SETTINGS: SiteSettings = {
  companyName: 'Tech Solution Nepal',
  legalName: 'Tech Solution Nepal Pvt. Ltd.',
  tagline: 'Full-Service Enterprise Software, Cloud Infrastructure & Applied AI Engineering',
  foundedYear: 2016,
  headquarters: 'Kathmandu, Nepal · Global Delivery (US, UK, Australia, EU)',
  regionalOffices: [
    {
      city: 'Kathmandu (HQ)',
      country: 'Nepal',
      address: 'Technology Corridor, Baneshwor / Tinkune, Kathmandu 44600, Nepal',
      phone: '+977 1 4429810',
      timezone: 'NPT (UTC+5:45)',
    },
    {
      city: 'Sydney',
      country: 'Australia',
      address: 'Level 24, 201 Sussex Street, Sydney NSW 2000, Australia',
      phone: '+61 2 8000 4512',
      timezone: 'AEST (UTC+10)',
    },
    {
      city: 'Zurich',
      country: 'Switzerland',
      address: 'Bahnhofstrasse 42, 8001 Zürich, Switzerland',
      phone: '+41 44 580 29 10',
      timezone: 'CET (UTC+1)',
    },
    {
      city: 'Singapore',
      country: 'Singapore',
      address: '1 Raffles Place, #38-02 One Raffles Place, Singapore 048616',
      phone: '+65 6701 8920',
      timezone: 'SGT (UTC+8)',
    },
    {
      city: 'London',
      country: 'United Kingdom',
      address: '30 St Mary Axe, City of London, EC3A 8BF',
      phone: '+44 20 7946 0821',
      timezone: 'GMT (UTC+0)',
    },
  ],
  primaryEmail: 'contact@techsolutionnepal.com',
  securityEmail: 'security@techsolutionnepal.com',
  pressEmail: 'press@techsolutionnepal.com',
  phone: '+977 1 4429810',
  verifiedMetrics: [
    {
      label: 'Production Systems Delivered',
      value: '240+',
      verificationNote: 'Audited client engagements completed between Q1 2016 and Q3 2026.',
    },
    {
      label: 'Measured SLA Uptime Across Managed Cloud',
      value: '99.992%',
      verificationNote: 'Trailing 24-month multi-region availability across 68 enterprise workloads.',
    },
    {
      label: 'Client Multi-Year Retention Rate',
      value: '94%',
      verificationNote: 'Percentage of enterprise accounts extending engagements beyond 24 months.',
    },
    {
      label: 'Senior Principal & Staff Engineers',
      value: '165',
      verificationNote: 'Full-time engineering, design, and security specialists across 4 hubs.',
    },
  ],
  certifications: [
    'ISO/IEC 27001:2022 Certified Information Security',
    'SOC 2 Type II Audited Delivery Controls',
    'HIPAA & GDPR Compliant Engineering Workflows',
    'AWS Premier Tier & CNCF Kubernetes Certified Partner',
  ],
  socialLinks: {
    linkedin: 'https://linkedin.com/company/techsolutionnepal',
    github: 'https://github.com/techsolutionnepal',
    x: 'https://x.com/techsolutionnepal',
    youtube: 'https://youtube.com/@techsolutionnepal',
  },
  seoDefaults: {
    titleTemplate: '%s | Tech Solution Nepal — Enterprise IT Solutions',
    defaultDescription:
      'Tech Solution Nepal designs, engineers, and operates mission-critical web platforms, mobile apps, enterprise software, AI/RAG systems, cloud DevOps, and cybersecurity programs.',
    robotsAllowPublic: true,
    disallowPaths: ['/admin', '/api/v1/cms', '/api/v1/auth'],
    sitemapEnabled: true,
  },
  updatedAt: '2026-10-01T08:00:00.000Z',
};

export const SEED_CATEGORIES: ServiceCategory[] = [
  {
    id: 'cat-01',
    number: '01',
    slug: 'web-development',
    name: 'Web Development',
    tagline: 'High-throughput web platforms, distributed Next.js applications, and composable commerce.',
    summary:
      'We architect resilient, sub-100ms web applications, multi-tenant SaaS products, and high-conversion digital commerce platforms engineered for global scale.',
    overview:
      'Modern web systems must balance instant edge-rendered performance with complex transactional integrity. Our Web Development practice combines React 19, Next.js App Router, distributed Node.js/Go microservices, and strict accessibility compliance to replace brittle legacy portals with durable digital products.',
    keyProblemsSolved: [
      'Slow Core Web Vitals and high bounce rates caused by monolithic legacy frontends.',
      'Inability to scale checkout or customer portals during peak traffic surges.',
      'Fragmented content workflows slowing down marketing and product launches.',
    ],
    coreTechnologies: ['Next.js 15', 'React 19', 'TypeScript', 'Node.js', 'GraphQL', 'PostgreSQL', 'MongoDB', 'Tailwind CSS', 'Redis'],
    targetIndustries: ['Financial Services', 'Retail & E-Commerce', 'B2B SaaS', 'Media & Publishing'],
    heroMetric: '-64% median page load latency across 45+ enterprise web migrations',
    status: 'published',
    order: 1,
    seo: {
      metaTitle: 'Enterprise Web Development Services | Next.js, SaaS & E-Commerce',
      metaDescription:
        'Custom web application development, Next.js architecture, composable e-commerce, and multi-tenant SaaS engineering by Tech Solution Nepal.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'cat-02',
    number: '02',
    slug: 'mobile-app-development',
    name: 'Mobile App Development',
    tagline: 'Native iOS, native Android, and cross-platform Flutter applications with offline-first resilience.',
    summary:
      'We build biometric-secured consumer and field-operations mobile apps for iOS and Android that maintain 60fps responsiveness and offline synchronization.',
    overview:
      'Whether delivering a regulated mobile banking application in Swift and Kotlin or a unified cross-platform experience in Flutter, our mobile engineering pods enforce hardware-backed key storage, deterministic state management, and automated CI/CD release pipelines for App Store and Google Play.',
    keyProblemsSolved: [
      'Unreliable field apps that lose data in low-connectivity industrial environments.',
      'Duplicated feature backlogs across disconnected iOS and Android teams.',
      'Strict App Store and enterprise MDM security compliance requirements.',
    ],
    coreTechnologies: ['Swift', 'SwiftUI', 'Kotlin', 'Jetpack Compose', 'Flutter', 'React Native', 'SQLite / CRDTs', 'Fastlane'],
    targetIndustries: ['Healthcare & Telemedicine', 'Fintech & Banking', 'Logistics & Fleet', 'Consumer Retail'],
    heroMetric: '4.88★ average rating across 18M+ cumulative mobile sessions',
    status: 'published',
    order: 2,
    seo: {
      metaTitle: 'Mobile App Development Services | iOS, Android & Flutter Engineering',
      metaDescription:
        'Enterprise iOS, Android, and Flutter mobile application development with biometric security and offline-first synchronization.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'cat-03',
    number: '03',
    slug: 'desktop-enterprise-software',
    name: 'Desktop & Enterprise Software',
    tagline: 'Mission-critical Windows, macOS, and Linux workstation software and core ERP modernization.',
    summary:
      'We engineer high-performance desktop applications, hardware-interfacing workstation suites, and custom enterprise resource planning systems.',
    overview:
      'When browser sandboxes are insufficient—such as medical imaging workstations, low-latency trading terminals, or factory floor control consoles—we build native and cross-platform desktop software using Rust, Tauri, C#/.NET, and Electron, paired with modernized distributed backends.',
    keyProblemsSolved: [
      'Aging Windows Forms or Delphi legacy applications blocking OS security upgrades.',
      'High memory consumption and sluggish rendering in heavy data-visualization terminals.',
      'Siloed departmental databases requiring unified role-based enterprise workflows.',
    ],
    coreTechnologies: ['.NET 9 / WPF', 'Rust', 'Tauri', 'Electron', 'C++', 'Java Spring Boot', 'gRPC', 'WebSockets'],
    targetIndustries: ['Manufacturing & Industrial', 'Capital Markets', 'Healthcare Diagnostics', 'Defense & Aerospace'],
    heroMetric: '100% zero-downtime cutovers across 19 legacy ERP modernizations',
    status: 'published',
    order: 3,
    seo: {
      metaTitle: 'Desktop & Enterprise Software Development | Windows, macOS & ERP',
      metaDescription:
        'Custom desktop software engineering, Windows and cross-platform workstation apps, and legacy ERP modernization.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'cat-04',
    number: '04',
    slug: 'ai-machine-learning',
    name: 'Artificial Intelligence & Machine Learning',
    tagline: 'Production LLM integrations, verifiable RAG architectures, custom ML models, and predictive engines.',
    summary:
      'We move organizations beyond brittle AI prototypes to governed, hallucination-mitigated retrieval systems, custom fine-tuned models, and predictive analytics.',
    overview:
      'Enterprise AI requires strict data residency, citation verification, evaluation harnesses, and predictable token economics. Our AI practice builds domain-specific Retrieval-Augmented Generation (RAG) pipelines, autonomous tool-calling agents, computer vision quality inspection, and demand forecasting models.',
    keyProblemsSolved: [
      'Unverified LLM hallucinations exposing customer-facing workflows to compliance risk.',
      'Thousands of hours spent manually reviewing unstructured contracts, claims, and PDFs.',
      'Inaccurate demand and churn models relying on stale batch spreadsheets.',
    ],
    coreTechnologies: ['Python', 'PyTorch', 'Gemini & Frontier LLMs', 'pgvector / Qdrant', 'LangGraph', 'vLLM', 'ONNX', 'MLflow'],
    targetIndustries: ['Healthcare & Life Sciences', 'Financial Services', 'Legal & Insurance', 'Supply Chain'],
    heroMetric: '-78% document triage cycle time with citation-backed RAG pipelines',
    status: 'published',
    order: 4,
    seo: {
      metaTitle: 'Enterprise AI & Machine Learning Services | LLM, RAG & Predictive ML',
      metaDescription:
        'Custom AI model development, enterprise LLM integration, Retrieval-Augmented Generation (RAG), AI agents, and predictive analytics.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'cat-05',
    number: '05',
    slug: 'automation-system-integrations',
    name: 'Automation & System Integrations',
    tagline: 'Event-driven middleware, ERP/CRM synchronization, and intelligent business process orchestration.',
    summary:
      'We eliminate manual reconciliation by connecting ERP, CRM, billing, warehouse, and proprietary databases through fault-tolerant event buses and APIs.',
    overview:
      'Disconnected SaaS tools and legacy mainframes trap operational data in silos. We design idempotent webhook brokers, Apache Kafka / Temporal workflow orchestrations, and custom REST/GraphQL/EDI connectors that synchronize critical business state in real time with dead-letter recovery.',
    keyProblemsSolved: [
      'Manual CSV exports and double data entry between Salesforce, SAP, NetSuite, and custom portals.',
      'Silent integration failures causing billing discrepancies and delayed order fulfillment.',
      'Lack of end-to-end auditability across multi-step compliance approvals.',
    ],
    coreTechnologies: ['Temporal.io', 'Apache Kafka', 'Node.js', 'Go', 'REST / GraphQL', 'SAP & NetSuite APIs', 'RabbitMQ', 'Webhooks'],
    targetIndustries: ['Logistics & Distribution', 'Financial Operations', 'Healthcare Administration', 'E-Commerce'],
    heroMetric: '42,000+ manual staff hours automated annually across client operations',
    status: 'published',
    order: 5,
    seo: {
      metaTitle: 'Business Workflow Automation & System Integration Services',
      metaDescription:
        'Enterprise API integration, ERP/CRM middleware, Temporal workflow orchestration, and automated business operations.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'cat-06',
    number: '06',
    slug: 'digital-marketing',
    name: 'Digital Marketing',
    tagline: 'Technical SEO, programmatic paid acquisition, conversion engineering, and B2B revenue attribution.',
    summary:
      'We combine search engineering, high-intent paid acquisition, and full-funnel analytics to build predictable, measurable inbound pipeline.',
    overview:
      'Unlike traditional creative agencies detached from engineering, our Digital Marketing division operates alongside our web architects and data analysts. We resolve crawl-budget bottlenecks, implement server-side conversion tracking, manage high-ROAS Google Ads and LinkedIn campaigns, and build authoritative technical content.',
    keyProblemsSolved: [
      'Rising customer acquisition costs (CAC) paired with opaque attribution models.',
      'JavaScript rendering issues and broken schema markup suppressing organic search rankings.',
      'High-traffic landing pages suffering from sub-1% visitor-to-qualified-lead conversion.',
    ],
    coreTechnologies: ['Technical SEO', 'Schema.org JSON-LD', 'Google Ads API', 'Server-Side GTM', 'BigQuery Attribution', 'A/B Testing', 'HubSpot'],
    targetIndustries: ['B2B SaaS', 'Professional Services', 'E-Commerce', 'Fintech'],
    heroMetric: '+168% qualified organic & paid pipeline growth within 6 months',
    status: 'published',
    order: 6,
    seo: {
      metaTitle: 'Technical SEO, Google Ads & B2B Digital Marketing Services',
      metaDescription:
        'Data-driven digital marketing, technical SEO engineering, Google Ads management, and conversion rate optimization.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'cat-07',
    number: '07',
    slug: 'graphic-design-branding',
    name: 'Graphic Design & Branding',
    tagline: 'Institutional brand identity, tokenized design systems, and high-clarity product UI/UX architecture.',
    summary:
      'We craft enduring visual identities, multi-brand Figma design systems, and research-backed product interfaces that command institutional trust.',
    overview:
      'Enterprise software and technology brands win when clarity replaces visual noise. Our design directors and UX researchers create comprehensive brand guidelines, WCAG AA/AAA accessible component tokens synced directly to React codebases, and interactive product prototypes validated with real domain users.',
    keyProblemsSolved: [
      'Inconsistent UI patterns across acquired products or multi-team engineering organizations.',
      'Outdated visual branding that undermines credibility during enterprise procurement reviews.',
      'Complex specialist workflows that require weeks of training for new operators.',
    ],
    coreTechnologies: ['Figma Tokens', 'Storybook', 'Design Systems', 'WCAG AAA Accessibility', 'Motion Design', 'Brand Identity'],
    targetIndustries: ['Enterprise SaaS', 'Financial Institutions', 'Biotech & MedTech', 'Industrial Tech'],
    heroMetric: '-45% UI engineering rework through tokenized Figma-to-Code design systems',
    status: 'published',
    order: 7,
    seo: {
      metaTitle: 'Enterprise UI/UX Design, Design Systems & Corporate Branding',
      metaDescription:
        'Product UI/UX design, tokenized Figma design systems, brand identity architecture, and visual communication.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'cat-08',
    number: '08',
    slug: 'cloud-computing-devops',
    name: 'Cloud Computing & DevOps',
    tagline: 'Multi-region AWS/GCP/Azure infrastructure, Kubernetes platform engineering, and GitOps CI/CD.',
    summary:
      'We architect self-healing cloud foundations, Infrastructure-as-Code pipelines, and FinOps cost optimization for high-availability workloads.',
    overview:
      'Our Cloud & Platform Engineering group designs immutable infrastructure using Terraform and OpenTofu, production-hardened Kubernetes clusters, automated zero-downtime deployment pipelines, and OpenTelemetry observability stacks that cut cloud waste while improving resilience.',
    keyProblemsSolved: [
      'Fragile manual deployments causing weekend outages and slow rollback recovery.',
      'Runaway AWS/GCP infrastructure spend lacking per-tenant cost visibility.',
      'Single-region bottlenecks preventing global data residency compliance.',
    ],
    coreTechnologies: ['AWS', 'Google Cloud', 'Azure', 'Kubernetes (EKS/GKE)', 'Terraform', 'ArgoCD', 'GitHub Actions', 'OpenTelemetry', 'Prometheus'],
    targetIndustries: ['Fintech', 'Global SaaS', 'Media Streaming', 'Healthcare'],
    heroMetric: '-34% average cloud infrastructure spend alongside 99.99% uptime',
    status: 'published',
    order: 8,
    seo: {
      metaTitle: 'Cloud Computing, DevOps & Kubernetes Platform Engineering',
      metaDescription:
        'AWS, GCP, and Azure cloud architecture, Kubernetes orchestration, Terraform Infrastructure-as-Code, and CI/CD automation.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'cat-09',
    number: '09',
    slug: 'cybersecurity-it-consulting',
    name: 'Cybersecurity & IT Consulting',
    tagline: 'Offensive penetration testing, Zero-Trust architecture, SOC 2 / ISO 27001 readiness, and vCISO advisory.',
    summary:
      'We protect intellectual property and customer data through rigorous application security audits, threat modeling, and executive IT governance.',
    overview:
      'Security cannot be bolted on after deployment. Our offensive and defensive cybersecurity engineers conduct white-box source code reviews, black-box penetration testing, cloud posture hardening, and compliance readiness programs for SOC 2 Type II, ISO 27001, HIPAA, and PCI-DSS.',
    keyProblemsSolved: [
      'Enterprise deals stalled in procurement due to missing SOC 2 / ISO 27001 certifications or pen-test reports.',
      'Undetected API authorization flaws, injection vectors, and supply-chain dependency vulnerabilities.',
      'Lack of architectural roadmap alignment during M&A technical due diligence.',
    ],
    coreTechnologies: ['OWASP ASVS', 'Zero-Trust IAM', 'OAuth 2.1 / OIDC', 'SIEM / SOAR', 'SAST / DAST', 'Vault', 'SOC 2 / ISO 27001'],
    targetIndustries: ['Banking & Fintech', 'Healthcare', 'Government & Defense', 'Enterprise SaaS'],
    heroMetric: '100% first-audit pass rate across 60+ SOC 2 Type II & ISO 27001 engagements',
    status: 'published',
    order: 9,
    seo: {
      metaTitle: 'Cybersecurity Services, Penetration Testing & Enterprise IT Consulting',
      metaDescription:
        'Application security audits, penetration testing, Zero-Trust architecture, SOC 2 / ISO 27001 compliance, and strategic IT consulting.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'cat-10',
    number: '10',
    slug: 'data-engineering-analytics',
    name: 'Data Engineering & Analytics',
    tagline: 'Modern data lakehouses, streaming ETL/ELT pipelines, data governance, and real-time BI dashboards.',
    summary:
      'We unify fragmented operational data into governed lakehouses and sub-second executive analytics platforms.',
    overview:
      'High-stakes decisions require trustworthy, lineage-tracked data. We build fault-tolerant batch and streaming data pipelines using Apache Kafka, dbt, Snowflake, BigQuery, and ClickHouse, surfaced through governed semantic layers and interactive executive telemetry dashboards.',
    keyProblemsSolved: [
      'Conflicting revenue and operational numbers across finance, sales, and product teams.',
      'Overnight batch ETL jobs failing or taking 14+ hours to refresh executive reports.',
      'Unstructured data lakes lacking schema enforcement, PII masking, and access governance.',
    ],
    coreTechnologies: ['Snowflake', 'BigQuery', 'ClickHouse', 'dbt', 'Apache Airflow', 'Apache Spark', 'Kafka', 'Looker / Superset'],
    targetIndustries: ['Retail & Supply Chain', 'Financial Services', 'Telecommunications', 'Energy & Utilities'],
    heroMetric: '10x query acceleration with governed dbt & ClickHouse/Snowflake architectures',
    status: 'published',
    order: 10,
    seo: {
      metaTitle: 'Data Engineering, Lakehouse Architecture & Business Intelligence',
      metaDescription:
        'Enterprise data engineering, streaming ETL pipelines, Snowflake/BigQuery warehousing, and real-time executive analytics dashboards.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'cat-11',
    number: '11',
    slug: 'qa-software-testing',
    name: 'QA & Software Testing',
    tagline: 'Automated Playwright end-to-end suites, contract API testing, load engineering, and accessibility audits.',
    summary:
      'We embed deterministic quality engineering into every pull request to eliminate production regressions and validate extreme traffic resilience.',
    overview:
      'Manual QA bottlenecks slow release velocity while letting edge-case bugs slip into production. Our Quality Engineering specialists build parallelized Playwright E2E grids, OpenAPI contract tests, k6 distributed load simulations, and automated WCAG 2.2 accessibility gates.',
    keyProblemsSolved: [
      'Multi-day manual regression cycles delaying weekly or daily production deployments.',
      'Checkout or API degradation under flash-sale or seasonal concurrency spikes.',
      'ADA / WCAG accessibility compliance gaps exposing digital properties to legal risk.',
    ],
    coreTechnologies: ['Playwright', 'Vitest / Jest', 'k6 Load Testing', 'Pact Contract Testing', 'Postman / Newman', 'Axe-Core WCAG'],
    targetIndustries: ['E-Commerce', 'Banking & Payments', 'Healthcare Portals', 'SaaS Platforms'],
    heroMetric: '-89% escaped production defects within 90 days of QA automation rollout',
    status: 'published',
    order: 11,
    seo: {
      metaTitle: 'QA & Software Testing Services | Automated E2E, API & Load Testing',
      metaDescription:
        'Enterprise QA engineering, Playwright end-to-end test automation, API contract testing, performance load testing, and WCAG audits.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'cat-12',
    number: '12',
    slug: 'it-support-maintenance',
    name: 'IT Support & Maintenance',
    tagline: '24/7/365 Site Reliability Engineering, L2/L3 application support, database tuning, and security patching.',
    summary:
      'We provide round-the-clock operational stewardship, proactive vulnerability patching, and SLA-backed incident response for mission-critical systems.',
    overview:
      'Software delivery is only the beginning of a system’s lifecycle. Our global follow-the-sun SRE and Application Maintenance pods across Zurich, New York, London, and Singapore provide 15-minute P1 incident response, continuous dependency upgrades, database index tuning, and disaster recovery drills.',
    keyProblemsSolved: [
      'Internal product teams burned out by on-call alerts and legacy maintenance debt.',
      'Unpatched runtime dependencies and expiring certificates causing avoidable outages.',
      'Degrading database query performance as historical transaction tables grow into billions of rows.',
    ],
    coreTechnologies: ['PagerDuty / Opsgenie', 'Datadog', 'Grafana', 'PostgreSQL / MongoDB DBA', 'Linux Hardening', 'Automated Backups'],
    targetIndustries: ['All Regulated & High-Availability Enterprises'],
    heroMetric: '< 11 min median P1 incident acknowledgement & mitigation response time',
    status: 'published',
    order: 12,
    seo: {
      metaTitle: '24/7 IT Support, Managed SRE & Application Maintenance Services',
      metaDescription:
        'SLA-backed 24/7 IT support, Site Reliability Engineering (SRE), legacy application maintenance, and database administration.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
];

interface RawServiceBlueprint {
  slug: string;
  categorySlug: string;
  categoryName: string;
  name: string;
  shortDescription: string;
  valueProposition: string;
  overview: string;
  technologies: string[];
  suitableIndustries: string[];
  estimatedDelivery: string;
  featured?: boolean;
  relatedProjectSlugs: string[];
}

const SERVICE_BLUEPRINTS: RawServiceBlueprint[] = [
  // 1. Web Development
  {
    slug: 'nextjs-web-applications',
    categorySlug: 'web-development',
    categoryName: 'Web Development',
    name: 'Next.js & React Enterprise Web Applications',
    shortDescription: 'Server-rendered, edge-cached web applications built on Next.js App Router, React 19, and TypeScript.',
    valueProposition: 'Deliver sub-100ms page transitions, enterprise RBAC security, and SEO-first rendering without frontend complexity.',
    overview: 'We architect full-stack Next.js applications leveraging React Server Components, streaming suspense boundaries, incremental static regeneration, and strict TypeScript domain modeling for high-traffic B2B and consumer platforms.',
    technologies: ['Next.js 15', 'React 19', 'TypeScript', 'Tailwind CSS', 'Node.js', 'Redis', 'Vercel / Docker'],
    suitableIndustries: ['Financial Services', 'B2B SaaS', 'Media & Publishing', 'Healthcare'],
    estimatedDelivery: '8–14 Weeks',
    featured: true,
    relatedProjectSlugs: ['institutional-settlement-ledger', 'sovereign-cloud-telemetry-grid'],
  },
  {
    slug: 'ecommerce-platforms',
    categorySlug: 'web-development',
    categoryName: 'Web Development',
    name: 'Composable E-Commerce & Headless Storefronts',
    shortDescription: 'High-conversion B2B and D2C commerce architectures with multi-currency checkout and ERP inventory sync.',
    valueProposition: 'Eliminate checkout latency and monolithic platform lock-in with a headless storefront engineered for peak seasonal throughput.',
    overview: 'We build custom composable commerce engines integrating Shopify Plus, Medusa, Stripe, Adyen, and enterprise ERPs with sub-second catalog filtering and localized pricing rules.',
    technologies: ['Next.js', 'Shopify Storefront API', 'Medusa.js', 'Stripe', 'Algolia / Typesense', 'PostgreSQL'],
    suitableIndustries: ['Luxury Retail', 'B2B Wholesale', 'Consumer Electronics'],
    estimatedDelivery: '10–16 Weeks',
    relatedProjectSlugs: ['omni-channel-b2b-commerce-core'],
  },
  {
    slug: 'multi-tenant-saas-engineering',
    categorySlug: 'web-development',
    categoryName: 'Web Development',
    name: 'Multi-Tenant SaaS Product Engineering',
    shortDescription: 'End-to-end architecture for subscription software including tenant isolation, RBAC, SSO, and metered billing.',
    valueProposition: 'Launch and scale enterprise-ready SaaS products with built-in SAML SSO, tenant data isolation, and usage-based billing.',
    overview: 'From seed-stage flagship products to Series C platform rewrites, we engineer multi-tenant SaaS architectures with row-level security, audit logging, webhook extensibility, and Stripe billing orchestration.',
    technologies: ['TypeScript', 'Next.js', 'Node.js', 'PostgreSQL RLS', 'SAML / OIDC', 'Stripe Billing', 'Redis'],
    suitableIndustries: ['B2B SaaS', 'Fintech', 'HRTech & PropTech'],
    estimatedDelivery: '12–20 Weeks',
    featured: true,
    relatedProjectSlugs: ['institutional-settlement-ledger'],
  },
  // 2. Mobile App Development
  {
    slug: 'ios-app-development',
    categorySlug: 'mobile-app-development',
    categoryName: 'Mobile App Development',
    name: 'Native iOS Application Development (Swift & SwiftUI)',
    shortDescription: 'Precision native iOS and iPadOS applications utilizing Swift 6, SwiftUI, Secure Enclave biometrics, and CoreData.',
    valueProposition: 'Craft fluid, hardware-accelerated iOS experiences that meet strict Apple Human Interface Guidelines and financial-grade security.',
    overview: 'Our iOS engineers build native iPhone and iPad applications featuring FaceID/TouchID cryptographic keychains, Apple Pay integration, background sync, and accessibility voiceover support.',
    technologies: ['Swift 6', 'SwiftUI', 'UIKit', 'CoreData / SwiftData', 'Secure Enclave', 'XCTest', 'Fastlane'],
    suitableIndustries: ['Wealth Management', 'Healthcare Patient Portals', 'Luxury Retail'],
    estimatedDelivery: '10–16 Weeks',
    relatedProjectSlugs: ['clinical-genomics-triage-ai'],
  },
  {
    slug: 'android-app-development',
    categorySlug: 'mobile-app-development',
    categoryName: 'Mobile App Development',
    name: 'Native Android Application Development (Kotlin & Compose)',
    shortDescription: 'Resilient native Android applications for consumer smartphones, ruggedized field tablets, and POS hardware.',
    valueProposition: 'Deploy high-reliability Android software across diverse device fleets, custom OEM tablets, and offline field environments.',
    overview: 'Using Kotlin Coroutines, Jetpack Compose, and Room persistence, we engineer responsive Android applications capable of Bluetooth LE sensor telemetry, NFC reading, and MDM enterprise deployment.',
    technologies: ['Kotlin', 'Jetpack Compose', 'Coroutines & Flow', 'Room DB', 'Android Keystore', 'BLE / NFC'],
    suitableIndustries: ['Logistics & Fleet', 'Field Engineering', 'Consumer Services'],
    estimatedDelivery: '10–16 Weeks',
    relatedProjectSlugs: ['autonomous-supply-chain-orchestrator'],
  },
  {
    slug: 'flutter-cross-platform-apps',
    categorySlug: 'mobile-app-development',
    categoryName: 'Mobile App Development',
    name: 'Flutter Cross-Platform Mobile Engineering',
    shortDescription: 'Single-codebase iOS, Android, and desktop applications compiled to native ARM machine code with Impeller rendering.',
    valueProposition: 'Cut time-to-market by 40% while maintaining 120Hz native rendering fidelity across iOS and Android.',
    overview: 'We architect modular Flutter applications using BLoC/Riverpod state isolation, native platform channels for specialized SDKs, and automated multi-platform release pipelines.',
    technologies: ['Flutter', 'Dart', 'Riverpod / BLoC', 'SQLite', 'Firebase / REST', 'Codemagic'],
    suitableIndustries: ['Fintech', 'Digital Health', 'Mobility & EV'],
    estimatedDelivery: '8–14 Weeks',
    featured: true,
    relatedProjectSlugs: ['omni-channel-b2b-commerce-core'],
  },
  // 3. Desktop & Enterprise Software
  {
    slug: 'windows-macos-desktop-applications',
    categorySlug: 'desktop-enterprise-software',
    categoryName: 'Desktop & Enterprise Software',
    name: 'Windows, macOS & Linux Workstation Software',
    shortDescription: 'Low-latency native and cross-platform desktop applications built with .NET 9, Rust/Tauri, and Electron.',
    valueProposition: 'Power multi-monitor trading desks, engineering CAD tools, and clinical workstations with native OS hardware access.',
    overview: 'We build memory-safe, auto-updating desktop applications with local encrypted SQLite/DuckDB storage, serial/USB hardware interfacing, and hardware-accelerated WebGL/DirectX canvases.',
    technologies: ['Rust', 'Tauri', '.NET 9 / WPF', 'Electron', 'C++', 'SQLite', 'gRPC'],
    suitableIndustries: ['Capital Markets', 'Medical Devices', 'Industrial Automation'],
    estimatedDelivery: '12–20 Weeks',
    relatedProjectSlugs: ['institutional-settlement-ledger'],
  },
  {
    slug: 'legacy-erp-modernization',
    categorySlug: 'desktop-enterprise-software',
    categoryName: 'Desktop & Enterprise Software',
    name: 'Enterprise ERP & Legacy System Modernization',
    shortDescription: 'Strangler-fig migration of monolithic mainframes, VB6/.NET, and Java EE systems into modular cloud-native architectures.',
    valueProposition: 'Retire brittle legacy technical debt using phased, zero-downtime strangler-fig migrations with full data parity verification.',
    overview: 'Instead of high-risk big-bang rewrites, we decouple legacy databases with Change Data Capture (CDC), build modern domain microservices, and transition operator workflows incrementally.',
    technologies: ['Java Spring Boot', '.NET Core', 'Debezium CDC', 'PostgreSQL', 'Kafka', 'React'],
    suitableIndustries: ['Manufacturing', 'Banking', 'Insurance', 'Public Sector'],
    estimatedDelivery: '16–28 Weeks',
    relatedProjectSlugs: ['autonomous-supply-chain-orchestrator'],
  },
  // 4. Artificial Intelligence & Machine Learning
  {
    slug: 'llm-rag-systems',
    categorySlug: 'ai-machine-learning',
    categoryName: 'Artificial Intelligence & Machine Learning',
    name: 'Enterprise LLM Integration & Verifiable RAG Systems',
    shortDescription: 'Citation-grounded Retrieval-Augmented Generation pipelines over proprietary enterprise knowledge bases.',
    valueProposition: 'Enable instant, verifiable answers across millions of internal documents with strict RBAC permission filtering and zero training leakage.',
    overview: 'We engineer hybrid semantic + BM25 retrieval pipelines, layout-aware PDF/table chunking, reranking cross-encoders, and automated LLM evaluation suites to guarantee accuracy and auditability.',
    technologies: ['Gemini API', 'Python', 'Qdrant / pgvector', 'LangGraph', 'FastAPI', 'OpenTelemetry'],
    suitableIndustries: ['Legal & Compliance', 'Healthcare Research', 'Financial Advisory', 'Enterprise Support'],
    estimatedDelivery: '6–12 Weeks',
    featured: true,
    relatedProjectSlugs: ['clinical-genomics-triage-ai'],
  },
  {
    slug: 'custom-ai-models-fine-tuning',
    categorySlug: 'ai-machine-learning',
    categoryName: 'Artificial Intelligence & Machine Learning',
    name: 'Custom AI Models, Fine-Tuning & Computer Vision',
    shortDescription: 'Domain-specific model training, LoRA fine-tuning, and optical defect detection deployed on dedicated GPU clusters or edge hardware.',
    valueProposition: 'Achieve specialist accuracy and sub-50ms inference latency with proprietary models tailored to your domain telemetry.',
    overview: 'Our ML engineers curate high-signal training datasets, fine-tune open-weights and foundation models, quantize weights for TensorRT/ONNX deployment, and monitor model drift in production.',
    technologies: ['PyTorch', 'vLLM', 'HuggingFace', 'ONNX Runtime', 'CUDA', 'MLflow', 'Weights & Biases'],
    suitableIndustries: ['Biotech & Genomics', 'Precision Manufacturing', 'Quantitative Finance'],
    estimatedDelivery: '10–18 Weeks',
    relatedProjectSlugs: ['clinical-genomics-triage-ai'],
  },
  {
    slug: 'ai-conversational-agents',
    categorySlug: 'ai-machine-learning',
    categoryName: 'Artificial Intelligence & Machine Learning',
    name: 'Autonomous AI Agents & Tool-Calling Workflows',
    shortDescription: 'Guardrailed multi-step AI agents that execute authenticated API actions, triage tickets, and orchestrate back-office operations.',
    valueProposition: 'Resolve Tier-1 and Tier-2 operational requests autonomously with human-in-the-loop approval gates for sensitive mutations.',
    overview: 'We design deterministic state-machine agents that integrate directly with your CRM, ERP, and ticketing systems, complete with strict JSON schema validation and real-time cost/latency guardrails.',
    technologies: ['TypeScript', 'Python', 'Gemini Function Calling', 'Temporal', 'PostgreSQL', 'Redis'],
    suitableIndustries: ['Customer Operations', 'Fintech', 'Logistics', 'Insurance Claims'],
    estimatedDelivery: '6–10 Weeks',
    relatedProjectSlugs: ['clinical-genomics-triage-ai'],
  },
  {
    slug: 'predictive-analytics-forecasting',
    categorySlug: 'ai-machine-learning',
    categoryName: 'Artificial Intelligence & Machine Learning',
    name: 'Predictive Analytics & Demand Forecasting Engines',
    shortDescription: 'Time-series forecasting, dynamic pricing, churn propensity, and credit/fraud risk scoring models.',
    valueProposition: 'Transform historical transaction logs into calibrated probability forecasts that optimize inventory and capital allocation.',
    overview: 'We combine gradient-boosted decision trees (XGBoost/LightGBM) and temporal transformers with explainable SHAP feature attribution so executives understand every prediction.',
    technologies: ['Python', 'XGBoost / LightGBM', 'PyTorch Forecasting', 'Snowflake', 'dbt', 'SHAP'],
    suitableIndustries: ['Retail & Supply Chain', 'Banking & Lending', 'Energy Grids'],
    estimatedDelivery: '8–14 Weeks',
    relatedProjectSlugs: ['autonomous-supply-chain-orchestrator'],
  },
  // 5. Automation & System Integrations
  {
    slug: 'business-workflow-automation',
    categorySlug: 'automation-system-integrations',
    categoryName: 'Automation & System Integrations',
    name: 'Durable Business Workflow & Process Automation',
    shortDescription: 'Fault-tolerant multi-step orchestration for order-to-cash, onboarding, underwriting, and supply chain routing.',
    valueProposition: 'Replace fragile cron jobs and manual spreadsheet handoffs with durable workflows that survive network and third-party outages.',
    overview: 'Using Temporal.io and event-driven state machines, we codify complex business processes with automatic retries, compensation sagas, SLA timers, and real-time operator visibility.',
    technologies: ['Temporal.io', 'Node.js / TypeScript', 'Go', 'PostgreSQL', 'Kafka', 'REST / Webhooks'],
    suitableIndustries: ['Financial Services', 'Supply Chain', 'Healthcare Operations'],
    estimatedDelivery: '6–12 Weeks',
    featured: true,
    relatedProjectSlugs: ['autonomous-supply-chain-orchestrator'],
  },
  {
    slug: 'api-erp-crm-integrations',
    categorySlug: 'automation-system-integrations',
    categoryName: 'Automation & System Integrations',
    name: 'Enterprise API, ERP & CRM System Integrations',
    shortDescription: 'Bi-directional synchronization between SAP, Oracle NetSuite, Salesforce, HubSpot, Workday, and custom platforms.',
    valueProposition: 'Ensure a single source of truth across finance, sales, and fulfillment with idempotent, schema-validated API middleware.',
    overview: 'We build high-throughput integration gateways supporting REST, GraphQL, SOAP, gRPC, and EDI X12 standards with dead-letter queues and automated reconciliation alerts.',
    technologies: ['GraphQL Federation', 'REST OpenAPI', 'SAP OData', 'NetSuite SuiteTalk', 'Salesforce API', 'RabbitMQ'],
    suitableIndustries: ['Manufacturing', 'Wholesale Distribution', 'Enterprise SaaS'],
    estimatedDelivery: '6–10 Weeks',
    relatedProjectSlugs: ['omni-channel-b2b-commerce-core'],
  },
  // 6. Digital Marketing
  {
    slug: 'technical-seo-organic-growth',
    categorySlug: 'digital-marketing',
    categoryName: 'Digital Marketing',
    name: 'Technical SEO Engineering & Programmatic Organic Growth',
    shortDescription: 'Core Web Vitals optimization, Schema.org JSON-LD graphs, crawl-budget engineering, and authoritative content systems.',
    valueProposition: 'Compound high-intent organic search pipeline by fixing structural rendering bottlenecks and owning category search terms.',
    overview: 'Our SEO engineers audit server-side rendering, log-file crawl behavior, internal link graph topology, and structured data markup to drive sustainable non-paid customer acquisition.',
    technologies: ['Next.js SSR', 'Schema.org JSON-LD', 'Google Search Console API', 'Screaming Frog', 'BigQuery', 'Ahrefs'],
    suitableIndustries: ['B2B SaaS', 'E-Commerce', 'Financial & Legal Services'],
    estimatedDelivery: 'Ongoing (Initial Audit & Overhaul in 4–6 Weeks)',
    relatedProjectSlugs: ['omni-channel-b2b-commerce-core'],
  },
  {
    slug: 'google-ads-paid-acquisition',
    categorySlug: 'digital-marketing',
    categoryName: 'Digital Marketing',
    name: 'Google Ads, Paid Search & Programmatic B2B Acquisition',
    shortDescription: 'Revenue-attributed search, LinkedIn, and programmatic campaigns backed by server-side conversion APIs.',
    valueProposition: 'Maximize return on ad spend (ROAS) by feeding offline CRM closed-won revenue signals directly back into bidding algorithms.',
    overview: 'We structure high-intent search and ABM campaigns, build dedicated high-conversion landing pages, and implement Server-Side GTM + CRM offline conversion imports.',
    technologies: ['Google Ads', 'LinkedIn Campaign Manager', 'Server-Side GTM', 'HubSpot / Salesforce', 'Looker Studio'],
    suitableIndustries: ['Enterprise SaaS', 'Industrial B2B', 'High-Ticket Consumer'],
    estimatedDelivery: '4 Weeks Setup + Continuous Optimization',
    relatedProjectSlugs: ['omni-channel-b2b-commerce-core'],
  },
  {
    slug: 'social-media-content-marketing',
    categorySlug: 'digital-marketing',
    categoryName: 'Digital Marketing',
    name: 'Executive Thought Leadership & B2B Social Distribution',
    shortDescription: 'Technical whitepapers, engineering case studies, and multi-channel social distribution for technology leaders.',
    valueProposition: 'Build category authority among C-suite buyers and technical evaluators through substantive, evidence-backed content.',
    overview: 'We interview your subject-matter experts to produce architectural research reports, benchmark studies, and high-engagement LinkedIn and X distribution narratives.',
    technologies: ['Editorial Research', 'LinkedIn Analytics', 'Video Production', 'Marketing Automation'],
    suitableIndustries: ['B2B Technology', 'Venture-Backed Startups', 'Consultancies'],
    estimatedDelivery: 'Ongoing Retainer',
    relatedProjectSlugs: ['omni-channel-b2b-commerce-core'],
  },
  // 7. Graphic Design & Branding
  {
    slug: 'brand-identity-design-systems',
    categorySlug: 'graphic-design-branding',
    categoryName: 'Graphic Design & Branding',
    name: 'Corporate Brand Identity & Tokenized Design Systems',
    shortDescription: 'Comprehensive brand architecture, typography, visual guidelines, and Figma-to-React component libraries.',
    valueProposition: 'Unify your brand presence and accelerate frontend delivery with a documented, accessible multi-theme design system.',
    overview: 'We craft distinctive visual identities, typographic hierarchies, custom iconography, and tokenized Figma component libraries synchronized with Storybook and Tailwind CSS.',
    technologies: ['Figma', 'Design Tokens W3C', 'Storybook', 'Tailwind CSS', 'Radix UI', 'WCAG 2.2 AA/AAA'],
    suitableIndustries: ['Enterprise Software', 'Fintech', 'Biotech', 'Professional Services'],
    estimatedDelivery: '6–10 Weeks',
    relatedProjectSlugs: ['institutional-settlement-ledger'],
  },
  {
    slug: 'product-ui-ux-design',
    categorySlug: 'graphic-design-branding',
    categoryName: 'Graphic Design & Branding',
    name: 'Enterprise Product UI/UX Architecture & Prototyping',
    shortDescription: 'Information architecture, user workflow research, interactive prototyping, and high-density data interface design.',
    valueProposition: 'Turn complex multi-variable data workflows into intuitive, high-speed interfaces that operators love using daily.',
    overview: 'Our principal product designers specialize in complex B2B consoles, financial terminals, clinical dashboards, and multi-step configuration flows.',
    technologies: ['Figma Interactive Prototypes', 'Usability Testing', 'Information Architecture', 'Data Visualization'],
    suitableIndustries: ['FinTech', 'HealthTech', 'Cybersecurity', 'Cloud Infrastructure'],
    estimatedDelivery: '6–12 Weeks',
    featured: true,
    relatedProjectSlugs: ['institutional-settlement-ledger', 'clinical-genomics-triage-ai'],
  },
  // 8. Cloud Computing & DevOps
  {
    slug: 'aws-gcp-cloud-architecture',
    categorySlug: 'cloud-computing-devops',
    categoryName: 'Cloud Computing & DevOps',
    name: 'AWS, GCP & Multi-Cloud Infrastructure Architecture',
    shortDescription: 'Sovereign, multi-region cloud foundations, zero-downtime cloud migrations, and FinOps cost optimization.',
    valueProposition: 'Achieve 99.99% availability and predictable cloud unit economics with immutable Infrastructure-as-Code.',
    overview: 'We design landing zones, VPC network topologies, disaster recovery active-active replication, and automated FinOps governance across AWS, Google Cloud, and Azure.',
    technologies: ['AWS', 'Google Cloud Platform', 'Azure', 'Terraform / OpenTofu', 'Cloudflare Enterprise', 'FinOps'],
    suitableIndustries: ['Financial Services', 'SaaS', 'Healthcare', 'E-Commerce'],
    estimatedDelivery: '6–14 Weeks',
    featured: true,
    relatedProjectSlugs: ['sovereign-cloud-telemetry-grid'],
  },
  {
    slug: 'kubernetes-cicd-pipelines',
    categorySlug: 'cloud-computing-devops',
    categoryName: 'Cloud Computing & DevOps',
    name: 'Kubernetes Platform Engineering & GitOps CI/CD',
    shortDescription: 'Production EKS/GKE Kubernetes clusters, ArgoCD GitOps delivery, and OpenTelemetry observability stacks.',
    valueProposition: 'Empower developers to ship 20+ times per day with automated canary rollouts and instant rollback safety.',
    overview: 'We build internal developer platforms (IDPs), harden container runtimes with eBPF/Cilium, automate GitHub Actions/GitLab pipelines, and unify logs, metrics, and traces.',
    technologies: ['Kubernetes (EKS/GKE)', 'ArgoCD', 'Helm', 'Docker', 'GitHub Actions', 'OpenTelemetry', 'Grafana'],
    suitableIndustries: ['High-Growth SaaS', 'Fintech', 'Media & Gaming'],
    estimatedDelivery: '6–10 Weeks',
    relatedProjectSlugs: ['sovereign-cloud-telemetry-grid'],
  },
  // 9. Cybersecurity & IT Consulting
  {
    slug: 'security-audits-penetration-testing',
    categorySlug: 'cybersecurity-it-consulting',
    categoryName: 'Cybersecurity & IT Consulting',
    name: 'Application Security Audits, Penetration Testing & SOC 2',
    shortDescription: 'Manual white-box/black-box penetration testing, cloud security posture reviews, and SOC 2 / ISO 27001 readiness.',
    valueProposition: 'Identify and remediate critical exploit chains before attackers do, and pass enterprise security due diligence with confidence.',
    overview: 'Our offensive security specialists test web applications, mobile binaries, APIs, and cloud IAM configurations against OWASP ASVS Level 2/3, delivering actionable remediation PRs and executive attestation letters.',
    technologies: ['OWASP ASVS', 'Burp Suite Pro', 'Semgrep SAST', 'AWS Security Hub', 'SOC 2 Type II', 'ISO 27001'],
    suitableIndustries: ['Fintech & Banking', 'Healthcare (HIPAA)', 'Enterprise SaaS', 'Defense'],
    estimatedDelivery: '3–6 Weeks',
    featured: true,
    relatedProjectSlugs: ['zero-trust-banking-iam-overhaul'],
  },
  {
    slug: 'it-strategy-fractional-cto',
    categorySlug: 'cybersecurity-it-consulting',
    categoryName: 'Cybersecurity & IT Consulting',
    name: 'Enterprise IT Consulting, M&A Due Diligence & Architecture Advisory',
    shortDescription: 'Vendor-neutral technical due diligence, multi-year architecture roadmaps, and organizational scaling advisory.',
    valueProposition: 'De-risk technology investments, M&A acquisitions, and platform turnarounds with battle-tested principal architects.',
    overview: 'We partner with boards, private equity funds, and CIOs/CTOs to audit codebases, evaluate build-vs-buy trade-offs, restructure engineering topologies, and govern vendor delivery.',
    technologies: ['Architecture Governance', 'M&A Tech Due Diligence', 'TOGAF / C4 Modeling', 'DORA Metrics'],
    suitableIndustries: ['Private Equity', 'Banking', 'Healthcare Networks', 'Manufacturing'],
    estimatedDelivery: '2–8 Weeks',
    relatedProjectSlugs: ['zero-trust-banking-iam-overhaul'],
  },
  // 10. Data Engineering & Analytics
  {
    slug: 'modern-data-warehousing-pipelines',
    categorySlug: 'data-engineering-analytics',
    categoryName: 'Data Engineering & Analytics',
    name: 'Data Lakehouse Architecture & Streaming ETL Pipelines',
    shortDescription: 'High-throughput batch and streaming data pipelines into Snowflake, BigQuery, Databricks, and ClickHouse.',
    valueProposition: 'Turn raw operational events into schema-enforced, lineage-tracked datasets ready for analytics and AI.',
    overview: 'We design medallion lakehouse architectures using Apache Kafka, Debezium CDC, Airflow, and dbt with automated data quality assertions and PII governance.',
    technologies: ['Snowflake', 'Google BigQuery', 'ClickHouse', 'dbt Core', 'Apache Kafka', 'Apache Airflow'],
    suitableIndustries: ['Financial Services', 'Retail', 'Telecommunications', 'Healthcare'],
    estimatedDelivery: '8–14 Weeks',
    relatedProjectSlugs: ['sovereign-cloud-telemetry-grid'],
  },
  {
    slug: 'bi-dashboards-executive-analytics',
    categorySlug: 'data-engineering-analytics',
    categoryName: 'Data Engineering & Analytics',
    name: 'Executive BI Dashboards & Embedded Customer Analytics',
    shortDescription: 'Sub-second operational telemetry consoles, financial reporting cubes, and customer-facing embedded analytics.',
    valueProposition: 'Give executives and customers real-time visibility into unit economics, SLA telemetry, and cohort performance.',
    overview: 'We build semantic data layers and custom React/D3/Visx telemetry portals or Looker/Superset deployments with row-level multi-tenant security.',
    technologies: ['ClickHouse', 'Cube.dev', 'React / Visx', 'Looker', 'Apache Superset', 'SQL'],
    suitableIndustries: ['B2B SaaS', 'Finance', 'Logistics', 'Energy'],
    estimatedDelivery: '6–10 Weeks',
    relatedProjectSlugs: ['sovereign-cloud-telemetry-grid'],
  },
  // 11. QA & Software Testing
  {
    slug: 'automated-e2e-api-testing',
    categorySlug: 'qa-software-testing',
    categoryName: 'QA & Software Testing',
    name: 'Automated End-to-End (Playwright) & API Contract Testing',
    shortDescription: 'Deterministic CI/CD test harnesses covering browser workflows, REST/GraphQL APIs, and visual regression.',
    valueProposition: 'Eliminate manual regression bottlenecks and ship every commit with automated verification across browsers and devices.',
    overview: 'We engineer parallelized Playwright test suites, Pact consumer-driven contract tests, and synthetic production monitors integrated directly into your pull-request workflow.',
    technologies: ['Playwright', 'TypeScript', 'Vitest', 'Supertest', 'Pact', 'GitHub Actions'],
    suitableIndustries: ['E-Commerce', 'Fintech', 'SaaS', 'Healthcare'],
    estimatedDelivery: '4–8 Weeks',
    relatedProjectSlugs: ['institutional-settlement-ledger'],
  },
  {
    slug: 'performance-load-accessibility-testing',
    categorySlug: 'qa-software-testing',
    categoryName: 'QA & Software Testing',
    name: 'Performance Load Engineering & WCAG Accessibility Audits',
    shortDescription: 'Distributed k6 stress testing, database bottleneck profiling, and WCAG 2.2 AA/AAA compliance remediation.',
    valueProposition: 'Verify your platform handles 10x peak concurrency without degradation while meeting global accessibility mandates.',
    overview: 'We simulate realistic multi-region traffic spikes using k6, profile CPU/memory flamegraphs to eliminate bottlenecks, and audit assistive technology compatibility.',
    technologies: ['k6 by Grafana', 'OpenTelemetry Profiling', 'Axe-Core', 'WCAG 2.2 AA/AAA', 'NVDA / VoiceOver'],
    suitableIndustries: ['Public Sector', 'High-Volume Retail', 'Banking', 'Ticketing & Media'],
    estimatedDelivery: '3–6 Weeks',
    relatedProjectSlugs: ['omni-channel-b2b-commerce-core'],
  },
  // 12. IT Support & Maintenance
  {
    slug: 'managed-sre-application-support',
    categorySlug: 'it-support-maintenance',
    categoryName: 'IT Support & Maintenance',
    name: '24/7 Managed SRE, SLA Monitoring & Application Maintenance',
    shortDescription: 'Follow-the-sun production monitoring, 15-minute P1 incident response, security patching, and continuous maintenance.',
    valueProposition: 'Protect revenue and free your core product engineers with contractual 99.99% uptime SLAs and proactive maintenance.',
    overview: 'Our dedicated SRE pods monitor synthetic transactions, apply zero-day CVE patches, rotate cryptographic secrets, and execute regular disaster recovery game days.',
    technologies: ['Datadog', 'Prometheus & Grafana', 'PagerDuty', 'Linux / Kubernetes', 'Automated Runbooks'],
    suitableIndustries: ['Enterprise SaaS', 'Financial Institutions', 'Healthcare', 'E-Commerce'],
    estimatedDelivery: 'Onboarding in 2 Weeks + 12/24-Month SLA',
    relatedProjectSlugs: ['sovereign-cloud-telemetry-grid'],
  },
  {
    slug: 'database-administration-optimization',
    categorySlug: 'it-support-maintenance',
    categoryName: 'IT Support & Maintenance',
    name: 'Managed Database Administration (PostgreSQL, MongoDB & Redis)',
    shortDescription: 'High-availability cluster topology, query plan optimization, zero-downtime schema migrations, and point-in-time recovery.',
    valueProposition: 'Eliminate lock contention, slow queries, and backup anxiety across multi-terabyte transactional databases.',
    overview: 'Our senior DBAs tune indexing strategies, configure read-replica connection pooling, automate encrypted point-in-time recovery verification, and manage major version upgrades.',
    technologies: ['PostgreSQL', 'MongoDB Atlas', 'Redis Enterprise', 'PgBouncer', 'Percona', 'Wal-G'],
    suitableIndustries: ['Fintech', 'High-Volume SaaS', 'E-Commerce', 'Healthcare'],
    estimatedDelivery: '2–4 Weeks Audit & Continuous DBA Retainer',
    relatedProjectSlugs: ['institutional-settlement-ledger'],
  },
];

export const SEED_SERVICES: ServiceItem[] = SERVICE_BLUEPRINTS.map((bp, index) => {
  const sameCategorySlugs = SERVICE_BLUEPRINTS.filter(
    (other) => other.categorySlug === bp.categorySlug && other.slug !== bp.slug
  ).map((o) => o.slug);

  return {
    id: `srv-${String(index + 1).padStart(2, '0')}`,
    slug: bp.slug,
    categorySlug: bp.categorySlug,
    categoryName: bp.categoryName,
    name: bp.name,
    shortDescription: bp.shortDescription,
    valueProposition: bp.valueProposition,
    overview: bp.overview,
    problemsSolved: [
      {
        title: 'Eliminate Architectural Bottlenecks & Technical Debt',
        description: `Replaces brittle legacy patterns in ${bp.categoryName.toLowerCase()} with modular, well-tested domain boundaries and observable telemetry.`,
      },
      {
        title: 'Predictable Performance Under Peak Concurrency',
        description:
          'Engineered with strict latency budgets, caching strategies, and automated load verification so user experience never degrades during traffic spikes.',
      },
      {
        title: 'Enterprise Security & Compliance by Default',
        description:
          'Enforces role-based access control, encrypted data in transit and at rest, and comprehensive audit logging from day one.',
      },
    ],
    benefits: [
      'Sub-100ms p95 API and interface response times verified in staging and production.',
      'Full intellectual property ownership with clean, documented TypeScript/Python/Rust source repositories.',
      'Automated CI/CD pipelines with unit, integration, and Playwright end-to-end test gates.',
      'Zero-downtime deployment topology with instant rollback capability and OpenTelemetry tracing.',
    ],
    keyFeatures: [
      {
        title: 'Domain-Driven Modular Architecture',
        description: 'Clean separation between presentation, domain business logic, and data persistence layers.',
      },
      {
        title: 'Hardened Security & Access Controls',
        description: 'OWASP ASVS Level 2 aligned authentication, input validation, rate limiting, and audit trails.',
      },
      {
        title: 'Real-Time Observability & Telemetry',
        description: 'Pre-configured structured logging, distributed tracing, and SLA health dashboards.',
      },
      {
        title: 'Comprehensive Handover & Runbooks',
        description: 'Architecture Decision Records (ADRs), OpenAPI specs, and live training for your internal engineering team.',
      },
    ],
    technologies: bp.technologies,
    deliveryProcess: [
      {
        stepNumber: '01',
        title: 'Discovery, Threat Modeling & Architecture Blueprint',
        description:
          'We audit existing systems, define non-functional SLA targets, model security threats, and produce a signed C4 Architecture Blueprint.',
        deliverable: 'C4 Architecture Specification, Data Schema & Milestone Roadmap',
      },
      {
        stepNumber: '02',
        title: 'Foundation, Design System & CI/CD Provisioning',
        description:
          'We provision reproducible Infrastructure-as-Code environments, automated test pipelines, and interactive UI/API contracts.',
        deliverable: 'Staging Environment, OpenAPI Contract & Interactive Prototype',
      },
      {
        stepNumber: '03',
        title: 'Iterative Sprint Engineering & Continuous Verification',
        description:
          'Two-week engineering sprints with weekly live demonstrations, automated Playwright/Vitest verification, and continuous code review.',
        deliverable: 'Production-Grade Modules with >85% Critical Path Test Coverage',
      },
      {
        stepNumber: '04',
        title: 'Load Hardening, Security Audit & Production Cutover',
        description:
          'We execute k6 stress tests, remediate security scan findings, perform zero-downtime production cutover, and transition to SLA support.',
        deliverable: 'Production Launch, Load Test Report & Operations Runbook',
      },
    ],
    suitableIndustries: bp.suitableIndustries,
    relatedProjectSlugs: bp.relatedProjectSlugs,
    relatedServiceSlugs:
      sameCategorySlugs.length > 0
        ? sameCategorySlugs
        : ['nextjs-web-applications', 'aws-gcp-cloud-architecture'],
    testimonialIds: ['test-01', 'test-02'],
    faqs: [
      {
        question: `How does Tech Solution Nepal structure ${bp.name} engagements?`,
        answer:
          'We offer both fixed-scope milestone deliveries (ideal when requirements are well-defined) and dedicated principal-led engineering pods that integrate directly with your internal product leadership.',
      },
      {
        question: 'Do we retain 100% ownership of the source code and intellectual property?',
        answer:
          'Yes. Upon milestone completion, 100% of custom source code, infrastructure templates, model weights, and architectural documentation belong exclusively to your organization with zero licensing lock-in.',
      },
      {
        question: 'How do you handle security compliance (SOC 2, HIPAA, GDPR, ISO 27001)?',
        answer:
          'Every engagement follows our ISO 27001 and SOC 2 Type II audited software development lifecycle, including automated SAST/DAST scanning, secret isolation, and full audit logging.',
      },
    ],
    pricingTiers: [
      {
        name: 'Architecture & MVP Foundation',
        targetAudience: 'For focused departmental launches or new product validation',
        priceRange: '$35,000 – $65,000',
        deliveryEstimate: '6–8 Weeks',
        deliverables: [
          'C4 System Architecture & Data Model',
          'Core Production Workflow Implementation',
          'Automated CI/CD & Cloud Staging Setup',
          'Security Baseline & Documentation Handover',
        ],
      },
      {
        name: 'Enterprise Production System',
        targetAudience: 'For mission-critical platforms requiring high availability & integrations',
        priceRange: '$75,000 – $160,000',
        deliveryEstimate: bp.estimatedDelivery,
        deliverables: [
          'Full-Scale Multi-Module Engineering',
          'ERP / CRM / SSO & Third-Party API Integrations',
          'Automated E2E Playwright & k6 Load Testing',
          '90-Day Post-Launch Warranty & SRE Transition',
        ],
        recommended: true,
      },
      {
        name: 'Dedicated Engineering Pod',
        targetAudience: 'For continuous multi-quarter roadmap velocity & scale',
        priceRange: '$28,000 – $48,000 / month',
        deliveryEstimate: 'Quarterly Rolling Retainer',
        deliverables: [
          '1 Principal Architect + 3–4 Senior Engineers',
          'Embedded Product Designer & QA Automation Engineer',
          'Weekly Production Releases & Sprint Governance',
          '24/7 On-Call SLA & Continuous Optimization',
        ],
      },
    ],
    estimatedDelivery: bp.estimatedDelivery,
    engagementModels: [
      'Fixed-Scope Milestone Delivery',
      'Dedicated Principal-Led Engineering Pod',
      'Architecture Advisory & Co-Engineering',
    ],
    customFormFields: [
      {
        id: 'current_architecture',
        label: 'Current Technology Stack or Legacy System (Optional)',
        type: 'text',
        required: false,
        placeholder: 'e.g., AWS, PostgreSQL, legacy .NET monolith, SAP...',
      },
      {
        id: 'compliance_requirements',
        label: 'Primary Compliance or Regulatory Standard',
        type: 'select',
        required: false,
        options: [
          'Standard Enterprise Security',
          'SOC 2 Type II / ISO 27001',
          'HIPAA / Clinical Data Privacy',
          'PCI-DSS / Financial Regulation',
          'GDPR / Sovereign EU Data Residency',
        ],
      },
    ],
    featured: Boolean(bp.featured),
    status: 'published',
    seo: {
      metaTitle: `${bp.name} | ${bp.categoryName} Services — Tech Solution Nepal`,
      metaDescription: `${bp.shortDescription} Explore architecture, delivery process, case studies, and request a custom engineering quote.`,
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  };
});

export const SEED_PROJECTS: ProjectCaseStudy[] = [
  {
    id: 'proj-01',
    slug: 'institutional-settlement-ledger',
    title: 'Multi-Currency Institutional Treasury & Real-Time Settlement Platform',
    clientName: 'Helvetia Clearstream Partners (Zurich)',
    industry: 'Financial Services',
    categorySlug: 'web-development',
    categoryName: 'Web Development',
    serviceSlugs: ['nextjs-web-applications', 'multi-tenant-saas-engineering', 'database-administration-optimization'],
    summary:
      'Replaced a 14-year-old batch clearing terminal with a real-time distributed settlement platform processing $4.2B in daily institutional volume.',
    heroImage: GENERATED_IMAGES.fintechPlatform,
    deliveryYear: '2026',
    duration: '18 Weeks',
    teamSize: '8 Senior Engineers & 1 Principal Architect',
    headlineMetric: '$4.2B Daily Volume at <38ms p99 Latency',
    metrics: [
      {
        label: 'Settlement Finality Window',
        value: '1.4s',
        context: 'Reduced from T+1 overnight batch reconciliation to 1.4-second deterministic clearing.',
      },
      {
        label: 'API p99 Transaction Latency',
        value: '38ms',
        context: 'Measured under 12,000 concurrent institutional WebSocket streams.',
      },
      {
        label: 'Operational Reconciliation Errors',
        value: '-99.4%',
        context: 'Eliminated manual CSV ledger adjustments via idempotent double-entry event sourcing.',
      },
    ],
    challenge:
      'Helvetia Clearstream operated an aging desktop clearing terminal coupled to a single-region SQL database. Rising institutional FX volume caused lock contention during European market close, delaying settlement finality and requiring 14 operations analysts to reconcile exceptions manually.',
    architectureAndApproach:
      'Tech Solution Nepal architected an event-sourced double-entry ledger backed by partitioned PostgreSQL and Apache Kafka, paired with a high-density dark-mode Next.js 15 & WebSocket operator workstation. Hardware-backed WebAuthn passkeys and four-eyes cryptographic approval workflows were enforced for every treasury transfer exceeding $250,000.',
    executionHighlights: [
      'Implemented deterministic idempotency keys across 24 liquidity provider FIX/REST gateways.',
      'Engineered a 60fps virtualized blotter grid capable of streaming 50,000+ live order mutations without main-thread frame drops.',
      'Executed a 6-week shadow-traffic parallel run verifying 100% ledger parity prior to zero-downtime cutover.',
    ],
    businessOutcome:
      'The platform cleared $4.2B on its first full week of production with zero reconciliation discrepancies, enabling Helvetia Clearstream to onboard 34 new institutional funds in Q2 2026.',
    technologies: ['Next.js 15', 'TypeScript', 'Go', 'Apache Kafka', 'PostgreSQL', 'Redis', 'WebSockets', 'Kubernetes'],
    testimonialId: 'test-01',
    featured: true,
    status: 'published',
    seo: {
      metaTitle: 'Case Study: Institutional Treasury & Settlement Platform | Tech Solution Nepal',
      metaDescription:
        'How Tech Solution Nepal engineered a real-time institutional settlement platform clearing $4.2B daily at sub-38ms p99 latency.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'proj-02',
    slug: 'clinical-genomics-triage-ai',
    title: 'Citation-Grounded Clinical Genomics & Oncology Trial Triage Engine',
    clientName: 'Vanguard BioLabs & Oncology Network (Boston)',
    industry: 'Healthcare & Life Sciences',
    categorySlug: 'ai-machine-learning',
    categoryName: 'Artificial Intelligence & Machine Learning',
    serviceSlugs: ['llm-rag-systems', 'custom-ai-models-fine-tuning', 'product-ui-ux-design'],
    summary:
      'HIPAA-compliant hybrid RAG and biomedical variant analysis platform that reduced clinical trial eligibility screening from 4.5 hours to 11 minutes per patient.',
    heroImage: GENERATED_IMAGES.healthcareAi,
    deliveryYear: '2026',
    duration: '14 Weeks',
    teamSize: '6 AI/ML & Full-Stack Engineers',
    headlineMetric: '-78% Clinical Trial Screening Time with 99.2% Citation Precision',
    metrics: [
      {
        label: 'Per-Patient Screening Cycle',
        value: '11 min',
        context: 'Down from 4.5 hours of manual pathology PDF and genomic VCF cross-referencing.',
      },
      {
        label: 'Verified Citation Precision',
        value: '99.2%',
        context: 'Every extracted exclusion/inclusion criterion links directly to the source pathology line item.',
      },
      {
        label: 'Eligible Patient Enrollment',
        value: '+142%',
        context: 'Increase in qualified Phase II/III oncology trial matches across 12 clinical sites.',
      },
    ],
    challenge:
      'Oncology research coordinators spent over four hours per patient manually cross-referencing unstructured pathology reports, longitudinal EHR notes, and genomic sequencing panels against 180+ active clinical trial protocols.',
    architectureAndApproach:
      'We built a zero-data-retention HIPAA-compliant RAG pipeline combining layout-aware medical PDF extraction, Qdrant hybrid vector/keyword indexing, and a clinician-in-the-loop verification workstation that highlights exact source bounding boxes for every AI-suggested protocol match.',
    executionHighlights: [
      'Deployed isolated VPC inference endpoints with strict BAA compliance and automated PHI redaction logs.',
      'Built an evaluation harness of 2,400 gold-standard oncologist-annotated patient cases run on every prompt/model update.',
      'Designed a split-pane diagnostic UI allowing molecular tumor boards to approve trial matches in one click.',
    ],
    businessOutcome:
      'Cut screening time by 78% across 12 hospitals while increasing qualified clinical trial enrollment by 142% within the first two quarters.',
    technologies: ['Python', 'Gemini Pro / Flash', 'Qdrant', 'PyTorch', 'Next.js', 'FastAPI', 'AWS HIPAA VPC'],
    testimonialId: 'test-02',
    featured: true,
    status: 'published',
    seo: {
      metaTitle: 'Case Study: Clinical Genomics & AI Trial Triage Platform | Tech Solution Nepal',
      metaDescription:
        'Discover how Tech Solution Nepal built a HIPAA-compliant RAG and genomics triage system reducing clinical trial screening by 78%.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'proj-03',
    slug: 'sovereign-cloud-telemetry-grid',
    title: 'Multi-Region Sovereign Cloud Infrastructure & Real-Time Telemetry Fabric',
    clientName: 'NordicGrid Energy & Infrastructure AG',
    industry: 'Energy & Utilities',
    categorySlug: 'cloud-computing-devops',
    categoryName: 'Cloud Computing & DevOps',
    serviceSlugs: ['aws-gcp-cloud-architecture', 'kubernetes-cicd-pipelines', 'modern-data-warehousing-pipelines'],
    summary:
      'Consolidated 14 fragmented regional data centers into a sovereign Kubernetes and ClickHouse telemetry grid ingesting 1.8 million IoT substation events per second.',
    heroImage: GENERATED_IMAGES.cloudGrid,
    deliveryYear: '2025',
    duration: '20 Weeks',
    teamSize: '7 Cloud Architects & Data Engineers',
    headlineMetric: '1.8M Events/Sec Ingested with -36% Cloud Infrastructure Spend',
    metrics: [
      {
        label: 'Sustained Telemetry Ingestion',
        value: '1.8M/sec',
        context: 'Real-time smart-grid frequency and transformer telemetry across 4 European regions.',
      },
      {
        label: 'Annual Cloud Infrastructure Savings',
        value: '$1.94M',
        context: '36% reduction in compute and storage spend via ClickHouse compression and spot node autoscaling.',
      },
      {
        label: 'Measured Platform Availability',
        value: '99.996%',
        context: 'Zero unplanned downtime across 18 months of multi-region active-active operation.',
      },
    ],
    challenge:
      'NordicGrid struggled with ballooning time-series database licensing costs and 15-minute telemetry delays that prevented automated grid load balancing during renewable energy fluctuations.',
    architectureAndApproach:
      'Tech Solution Nepal migrated the workload to a multi-region Kubernetes topology managed via Terraform and ArgoCD, replacing legacy proprietary databases with a replicated ClickHouse and Kafka streaming lakehouse.',
    executionHighlights: [
      'Achieved 14:1 columnar storage compression on high-frequency sensor streams.',
      'Implemented eBPF-based Cilium network policies and mTLS encryption across all cluster workloads.',
      'Built an executive and control-room telemetry portal rendering 100M-row aggregations in under 180ms.',
    ],
    businessOutcome:
      'Delivered $1.94M in annual infrastructure savings while enabling sub-second grid anomaly detection.',
    technologies: ['Kubernetes', 'Terraform', 'ClickHouse', 'Apache Kafka', 'ArgoCD', 'Go', 'OpenTelemetry'],
    testimonialId: 'test-03',
    featured: true,
    status: 'published',
    seo: {
      metaTitle: 'Case Study: Sovereign Cloud & 1.8M/s Telemetry Grid | Tech Solution Nepal',
      metaDescription:
        'How Tech Solution Nepal re-architected a European energy telemetry grid to ingest 1.8M events/sec while cutting cloud spend by 36%.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'proj-04',
    slug: 'autonomous-supply-chain-orchestrator',
    title: 'Global Logistics ERP Modernization & Temporal Workflow Automation',
    clientName: 'Maersk-Vanguard Maritime Logistics',
    industry: 'Manufacturing & Supply Chain',
    categorySlug: 'automation-system-integrations',
    categoryName: 'Automation & System Integrations',
    serviceSlugs: ['business-workflow-automation', 'legacy-erp-modernization', 'android-app-development'],
    summary:
      'Unified 6 regional ERP instances and 4,500 ruggedized Android port scanners through a durable Temporal workflow engine.',
    heroImage: GENERATED_IMAGES.heroArchitecture,
    deliveryYear: '2025',
    duration: '16 Weeks',
    teamSize: '7 Senior Engineers',
    headlineMetric: '48,000 Manual Customs & Routing Hours Automated Annually',
    metrics: [
      {
        label: 'Port Turnaround Dispatch Time',
        value: '-52%',
        context: 'Automated customs manifest validation and drayage carrier assignment.',
      },
      {
        label: 'ERP Sync Reliability',
        value: '99.99%',
        context: 'Zero lost shipment state transitions across SAP, NetSuite, and customs EDI gateways.',
      },
      {
        label: 'Annual Operational Savings',
        value: '$3.1M',
        context: 'Direct reduction in detention fees and manual back-office exception handling.',
      },
    ],
    challenge:
      'Cross-border container shipments required manual re-keying between SAP, regional warehouse systems, and customs brokers, causing costly port demurrage delays whenever a single API timed out.',
    architectureAndApproach:
      'We implemented a Temporal.io workflow layer acting as an unbreakable state coordinator above the legacy ERPs, paired with an offline-first Kotlin Android scanner app for dockworkers.',
    executionHighlights: [
      'Automated EDI X12 and customs manifest generation with built-in retry and human-exception queues.',
      'Rolled out offline-capable Android scanner apps across 18 distribution hubs.',
    ],
    businessOutcome:
      'Reduced container dispatch turnaround time by 52% and saved $3.1M in annual demurrage and labor costs.',
    technologies: ['Temporal.io', 'Kotlin', 'Node.js', 'SAP OData', 'PostgreSQL', 'RabbitMQ'],
    testimonialId: 'test-04',
    featured: false,
    status: 'published',
    seo: {
      metaTitle: 'Case Study: Global Logistics ERP & Workflow Automation | Tech Solution Nepal',
      metaDescription:
        'Automating 48,000 hours of logistics routing and ERP synchronization using Temporal.io and native Android fleet apps.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'proj-05',
    slug: 'omni-channel-b2b-commerce-core',
    title: 'Composable B2B Industrial Commerce & Programmatic SEO Engine',
    clientName: 'Kranz Precision Components GmbH (Munich)',
    industry: 'Retail & E-Commerce',
    categorySlug: 'digital-marketing',
    categoryName: 'Digital Marketing',
    serviceSlugs: ['ecommerce-platforms', 'technical-seo-organic-growth', 'flutter-cross-platform-apps'],
    summary:
      'Engineered a 450,000-SKU headless B2B industrial catalog with customer-specific contract pricing and programmatic technical SEO.',
    heroImage: GENERATED_IMAGES.teamNepal,
    deliveryYear: '2026',
    duration: '14 Weeks',
    teamSize: '6 Engineers & Growth Specialists',
    headlineMetric: '+184% Organic B2B Quote Volume & 70ms Search Latency',
    metrics: [
      {
        label: 'Organic Technical Search Traffic',
        value: '+215%',
        context: 'Driven by server-rendered CAD spec sheets and Schema.org Product/Offer JSON-LD.',
      },
      {
        label: '450k SKU Faceted Search Speed',
        value: '42ms',
        context: 'Sub-50ms parametric filtering by tolerance, alloy, and DIN standard.',
      },
      {
        label: 'Self-Serve B2B Reorder Rate',
        value: '76%',
        context: 'Procurement teams shifted from phone/fax orders to self-serve portal checkout.',
      },
    ],
    challenge:
      'Kranz Precision had 450,000 industrial components locked inside PDF catalogs that search engines could not index and procurement engineers could not filter by technical tolerance.',
    architectureAndApproach:
      'We built a Next.js 15 composable storefront backed by Typesense parametric search, real-time SAP contract pricing, and automated Schema.org structured data across every SKU page.',
    executionHighlights: [
      'Generated 450,000 indexable, high-speed specification pages with zero duplicate content penalties.',
      'Integrated instant BOM (Bill of Materials) CSV/Excel upload to automated quote generation.',
    ],
    businessOutcome:
      'Increased inbound B2B quote requests by 184% within 6 months of launch.',
    technologies: ['Next.js 15', 'Typesense', 'Medusa.js', 'SAP Integration', 'Schema.org JSON-LD', 'Tailwind CSS'],
    testimonialId: 'test-05',
    featured: false,
    status: 'published',
    seo: {
      metaTitle: 'Case Study: 450k-SKU Composable B2B Commerce & Technical SEO | Tech Solution Nepal',
      metaDescription:
        'How Tech Solution Nepal built a 450,000-SKU industrial e-commerce platform generating +184% organic B2B quote volume.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'proj-06',
    slug: 'zero-trust-banking-iam-overhaul',
    title: 'Zero-Trust IAM Architecture, Penetration Testing & SOC 2 Type II Readiness',
    clientName: 'Meridian Digital Bank (London)',
    industry: 'Financial Services',
    categorySlug: 'cybersecurity-it-consulting',
    categoryName: 'Cybersecurity & IT Consulting',
    serviceSlugs: ['security-audits-penetration-testing', 'it-strategy-fractional-cto'],
    summary:
      'Secured a multi-country digital banking platform with FAPI 2.0 OAuth, hardware passkeys, white-box penetration testing, and clean SOC 2 Type II certification.',
    heroImage: GENERATED_IMAGES.fintechPlatform,
    deliveryYear: '2026',
    duration: '10 Weeks',
    teamSize: '4 Principal Security Architects',
    headlineMetric: 'Zero Findings on SOC 2 Type II & FCA Regulatory Security Audit',
    metrics: [
      {
        label: 'Critical & High Vulnerabilities Remediated',
        value: '100%',
        context: '19 subtle authorization and cryptographic findings fixed prior to external regulator audit.',
      },
      {
        label: 'Account Takeover Fraud Rate',
        value: '-94%',
        context: 'Following rollout of WebAuthn passkeys and device-bound session tokens.',
      },
      {
        label: 'Enterprise Procurement Approval Speed',
        value: '3x Faster',
        context: 'Automated security trust center and clean SOC 2 Type II report accelerated B2B partnerships.',
      },
    ],
    challenge:
      'Expanding into institutional banking required Meridian to pass stringent FCA security reviews, remediate legacy OAuth token vulnerabilities, and achieve an unqualified SOC 2 Type II attestation.',
    architectureAndApproach:
      'Our cybersecurity team conducted a full white-box source code audit, re-engineered the authentication gateway to FAPI 2.0 standards, and automated continuous compliance evidence collection.',
    executionHighlights: [
      'Eliminated BOLA/IDOR risks via centralized policy-as-code authorization middleware.',
      'Implemented short-lived 5-minute access tokens with rotating sender-constrained refresh tokens.',
    ],
    businessOutcome:
      'Passed both the external SOC 2 Type II audit and regulatory inspection with zero exceptions.',
    technologies: ['OAuth 2.1 / FAPI', 'WebAuthn Passkeys', 'HashiCorp Vault', 'OPA Policy-as-Code', 'OWASP ASVS'],
    testimonialId: 'test-01',
    featured: false,
    status: 'published',
    seo: {
      metaTitle: 'Case Study: Zero-Trust Banking Security & SOC 2 Type II | Tech Solution Nepal',
      metaDescription:
        'Zero-Trust IAM overhaul, white-box penetration testing, and SOC 2 Type II readiness for Meridian Digital Bank.',
    },
    updatedAt: '2026-10-01T08:00:00.000Z',
  },
];

export const SEED_TEAM: TeamMember[] = [
  {
    id: 'team-01',
    slug: 'marcus-vance',
    name: 'Dr. Marcus Vance',
    role: 'Chief Executive Officer & Principal Systems Architect',
    department: 'Executive Leadership',
    location: 'Zurich / New York',
    experienceYears: 19,
    shortBio:
      'Former Principal Distributed Systems Architect at ETH Zurich spin-outs and global investment banks; leads architectural governance across Tech Solution Nepal.',
    fullBiography: [
      'Dr. Marcus Vance founded Tech Solution Nepal in 2016 with a singular conviction: enterprise software consultancies should be led by practicing systems architects rather than account managers.',
      'Over nearly two decades, he has architected low-latency clearing engines, sovereign cloud infrastructures, and multi-region SaaS platforms across Europe, North America, and Asia-Pacific.',
      'He holds a Ph.D. in Computer Science (Distributed Consensus Systems) from ETH Zurich and personally reviews the C4 architectural blueprint for every flagship client engagement.',
    ],
    specialties: ['Distributed Systems', 'High-Throughput FinTech', 'Cloud Native Architecture', 'M&A Technical Due Diligence'],
    certifications: ['AWS Certified Solutions Architect – Professional', 'TOGAF 10 Certified Enterprise Architect'],
    education: 'Ph.D. in Computer Science, ETH Zurich',
    projectSlugs: ['institutional-settlement-ledger', 'sovereign-cloud-telemetry-grid'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    featured: true,
    status: 'published',
  },
  {
    id: 'team-02',
    slug: 'elena-rostova',
    name: 'Elena Rostova',
    role: 'Chief Technology Officer & Head of Cloud Platform',
    department: 'Principal Architecture',
    location: 'London',
    experienceYears: 16,
    shortBio:
      'Specialist in multi-region Kubernetes orchestration, high-volume ClickHouse/PostgreSQL data fabrics, and resilient microservice topologies.',
    fullBiography: [
      'Elena Rostova oversees technical standards, internal developer platforms, and Site Reliability Engineering across all four Tech Solution Nepal global delivery centers.',
      'Prior to joining Tech Solution Nepal, she led platform engineering for a FTSE 100 payments processor, scaling containerized workloads from 200 to 14,000 transactions per second.',
    ],
    specialties: ['Kubernetes & eBPF', 'Terraform / OpenTofu', 'ClickHouse & PostgreSQL Internals', 'FinOps Optimization'],
    certifications: ['CNCF Certified Kubernetes Security Specialist (CKS)', 'Google Cloud Fellow Architect'],
    education: 'M.Sc. in Advanced Computing, Imperial College London',
    projectSlugs: ['sovereign-cloud-telemetry-grid', 'institutional-settlement-ledger'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    featured: true,
    status: 'published',
  },
  {
    id: 'team-03',
    slug: 'devon-keshav',
    name: 'Dr. Devon Keshav',
    role: 'VP of Artificial Intelligence & Data Systems',
    department: 'AI & Data Systems',
    location: 'New York',
    experienceYears: 14,
    shortBio:
      'Leads production LLM/RAG engineering, domain model fine-tuning, and HIPAA/SOC 2 governed machine learning pipelines.',
    fullBiography: [
      'Dr. Devon Keshav bridges academic machine learning rigor with deterministic production engineering. His team builds citation-verified RAG systems, custom fine-tuned language models, and quantitative forecasting engines.',
      'He pioneered Tech Solution Nepal’ Deterministic Evaluation Harness, ensuring no enterprise AI system is deployed without measurable precision, recall, and hallucination guardrails.',
    ],
    specialties: ['Retrieval-Augmented Generation (RAG)', 'PyTorch & vLLM Inference', 'Biomedical & Financial NLP', 'Data Lakehouses'],
    certifications: ['Databricks Certified Machine Learning Professional'],
    education: 'Ph.D. in Statistical Machine Learning, Columbia University',
    projectSlugs: ['clinical-genomics-triage-ai', 'autonomous-supply-chain-orchestrator'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    featured: true,
    status: 'published',
  },
  {
    id: 'team-04',
    slug: 'claire-lindqvist',
    name: 'Claire Lindqvist',
    role: 'VP of Product Design & Design Systems',
    department: 'Product & Design',
    location: 'Zurich',
    experienceYears: 13,
    shortBio:
      'Architect of high-density institutional interfaces, tokenized Figma-to-React design systems, and WCAG AAA accessible digital products.',
    fullBiography: [
      'Claire Lindqvist leads our Product UI/UX, Brand Identity, and Frontend Architecture teams. Trained in Swiss typographic grid systems and human-computer interaction, she specializes in turning complex specialist workflows into calm, high-speed interfaces.',
    ],
    specialties: ['Tokenized Design Systems', 'Financial & Clinical UI/UX', 'WCAG 2.2 AAA Accessibility', 'Brand Architecture'],
    certifications: ['IAAP Certified Professional in Web Accessibility (CPWA)'],
    education: 'M.A. in Interaction Design, Zurich University of the Arts (ZHdK)',
    projectSlugs: ['institutional-settlement-ledger', 'omni-channel-b2b-commerce-core'],
    linkedinUrl: 'https://linkedin.com',
    featured: true,
    status: 'published',
  },
  {
    id: 'team-05',
    slug: 'kenji-takahashi',
    name: 'Kenji Takahashi',
    role: 'Principal Cybersecurity & Zero-Trust Architect',
    department: 'Cloud & Security',
    location: 'Singapore',
    experienceYears: 15,
    shortBio:
      'Offensive security researcher and Zero-Trust architect leading penetration testing, cryptographic IAM, and SOC 2 / ISO 27001 compliance.',
    fullBiography: [
      'Kenji Takahashi directs application security reviews, threat modeling, and regulatory readiness across Tech Solution Nepal. He has led over 90 offensive penetration tests for central banks, healthcare networks, and global SaaS providers.',
    ],
    specialties: ['Offensive Penetration Testing', 'OAuth 2.1 / FAPI 2.0', 'Zero-Trust Network Architecture', 'ISO 27001 & SOC 2'],
    certifications: ['OSCP', 'OSWE', 'CISSP', 'ISO/IEC 27001 Lead Auditor'],
    education: 'B.Eng. in Computer Engineering, National University of Singapore',
    projectSlugs: ['zero-trust-banking-iam-overhaul'],
    linkedinUrl: 'https://linkedin.com',
    githubUrl: 'https://github.com',
    featured: true,
    status: 'published',
  },
  {
    id: 'team-06',
    slug: 'hannah-mercier',
    name: 'Hannah Mercier',
    role: 'Director of Web, Mobile & Digital Growth Engineering',
    department: 'Principal Architecture',
    location: 'New York',
    experienceYears: 12,
    shortBio:
      'Specializes in Next.js App Router performance, composable B2B e-commerce, Flutter mobile systems, and technical SEO architecture.',
    fullBiography: [
      'Hannah Mercier leads our Web, Mobile, and Digital Growth pods. She combines deep expertise in React Server Components, mobile offline-first synchronization, and programmatic technical SEO to build platforms that both perform and convert.',
    ],
    specialties: ['Next.js 15 & React 19', 'Swift / Kotlin / Flutter', 'Composable Commerce', 'Technical SEO Engineering'],
    certifications: ['Google Mobile Web Specialist', 'AWS Certified Developer'],
    education: 'B.S. in Computer Science, Cornell University',
    projectSlugs: ['omni-channel-b2b-commerce-core', 'autonomous-supply-chain-orchestrator'],
    linkedinUrl: 'https://linkedin.com',
    featured: true,
    status: 'published',
  },
];

export const SEED_ARTICLES: BlogArticle[] = [
  {
    id: 'art-01',
    slug: 'architecting-verifiable-enterprise-rag-pipelines',
    title: 'Architecting Verifiable Enterprise RAG Pipelines with Zero Hallucination Tolerance',
    subtitle:
      'How hybrid vector-lexical retrieval, cross-encoder reranking, and deterministic citation bounding eliminate LLM fabrication in regulated industries.',
    excerpt:
      'Naive vector similarity search fails on financial tables and clinical protocols. Here is our production blueprint for citation-locked Retrieval-Augmented Generation.',
    category: 'Artificial Intelligence',
    tags: ['RAG', 'LLM Architecture', 'Vector Databases', 'AI Governance'],
    authorSlug: 'devon-keshav',
    authorName: 'Dr. Devon Keshav',
    authorRole: 'VP of Artificial Intelligence & Data Systems',
    publishedAt: '2026-09-18',
    readTimeMinutes: 9,
    heroImage: GENERATED_IMAGES.healthcareAi,
    sections: [
      {
        heading: '1. Why Naive Semantic Chunking Fails in Enterprise Production',
        body: [
          'Most proof-of-concept RAG systems split PDFs into arbitrary 500-token sliding windows and embed them with a generic model. In regulated domains—such as oncology clinical trials, institutional underwriting, or Master Services Agreements—splitting a table header from its rows or severing a negation clause destroys semantic truth.',
          'At Tech Solution Nepal, our ingestion pipeline uses layout-aware document parsing that preserves hierarchical section headers, markdown table matrices, and page-coordinate bounding boxes on every indexed chunk.',
        ],
      },
      {
        heading: '2. Hybrid Reciprocal Rank Fusion (BM25 + Dense Embeddings)',
        body: [
          'Dense vector embeddings excel at conceptual synonyms but frequently miss exact alphanumeric identifiers like SKU codes, gene mutations (e.g., EGFR-T790M), or statutory clauses. Combining sparse BM25 lexical matching with dense embeddings via Reciprocal Rank Fusion (RRF) followed by a cross-encoder reranker consistently improves top-5 recall from 71% to 96.4%.',
        ],
        codeSnippet: {
          language: 'typescript',
          caption: 'Deterministic Citation Verification Contract',
          code: `export interface GroundedAnswer {
  claim: string;
  sourceDocumentId: string;
  exactQuoteSpan: string;
  pageNumber: number;
  confidenceScore: number;
}

export function verifySpanExistsInChunk(claim: GroundedAnswer, sourceText: string): boolean {
  const normalizedSource = sourceText.replace(/\\s+/g, ' ').trim();
  const normalizedSpan = claim.exactQuoteSpan.replace(/\\s+/g, ' ').trim();
  return normalizedSource.includes(normalizedSpan);
}`,
        },
      },
      {
        heading: '3. Enforcing RBAC at the Retrieval Pre-Filter Layer',
        body: [
          'Never retrieve documents from a global index and rely on the prompt to redact confidential data. Document-level ACL tags must be enforced inside the vector database metadata pre-filter before any chunk ever reaches the LLM context window.',
        ],
      },
    ],
    relatedServiceSlugs: ['llm-rag-systems', 'custom-ai-models-fine-tuning'],
    relatedArticleSlugs: ['zero-downtime-legacy-erp-strangler-migrations', 'sub-50ms-nextjs-edge-rendering-patterns'],
    featured: true,
    status: 'published',
    seo: {
      metaTitle: 'Architecting Verifiable Enterprise RAG Pipelines | Tech Solution Nepal',
      metaDescription:
        'Production blueprint for hybrid BM25 + vector retrieval, cross-encoder reranking, and deterministic citation verification in enterprise RAG.',
    },
    updatedAt: '2026-09-18T10:00:00.000Z',
  },
  {
    id: 'art-02',
    slug: 'zero-downtime-legacy-erp-strangler-migrations',
    title: 'Zero-Downtime Legacy ERP Modernization Using Change Data Capture and Temporal',
    subtitle:
      'Retiring 15-year-old monolithic databases without halting factory floor dispatch or financial reconciliation.',
    excerpt:
      'Big-bang ERP rewrites have an industry failure rate exceeding 65%. We detail how Debezium CDC and Temporal workflows enable risk-free incremental cutovers.',
    category: 'Enterprise Architecture',
    tags: ['ERP Modernization', 'Temporal.io', 'Kafka', 'Distributed Systems'],
    authorSlug: 'marcus-vance',
    authorName: 'Dr. Marcus Vance',
    authorRole: 'CEO & Principal Systems Architect',
    publishedAt: '2026-08-29',
    readTimeMinutes: 8,
    heroImage: GENERATED_IMAGES.fintechPlatform,
    sections: [
      {
        heading: '1. The Fallacy of the Big-Bang Rewrite',
        body: [
          'When an enterprise attempts to freeze feature development for 18 months to rebuild a core ERP or clearing platform from scratch, business rules inevitably drift. By cutover weekend, the new system no longer matches reality.',
          'The Strangler-Fig pattern solves this by intercepting bounded domain slices one workflow at a time while keeping the legacy system and modern platform synchronized in real time.',
        ],
      },
      {
        heading: '2. Bi-Directional Shadow Verification via Debezium CDC',
        body: [
          'By tailing the transaction log (WAL/binlog) of the legacy database with Debezium and streaming events into Apache Kafka, new microservices can process shadow traffic for weeks. Automated parity comparators verify that the new domain service produces identical ledger entries before shifting read/write authority.',
        ],
      },
    ],
    relatedServiceSlugs: ['legacy-erp-modernization', 'business-workflow-automation'],
    relatedArticleSlugs: ['architecting-verifiable-enterprise-rag-pipelines'],
    featured: true,
    status: 'published',
    seo: {
      metaTitle: 'Zero-Downtime Legacy ERP Modernization with CDC & Temporal | Tech Solution Nepal',
      metaDescription:
        'How to modernize legacy ERP and core banking monoliths with zero downtime using Strangler-Fig, Debezium CDC, and Temporal.',
    },
    updatedAt: '2026-08-29T10:00:00.000Z',
  },
  {
    id: 'art-03',
    slug: 'sub-50ms-nextjs-edge-rendering-patterns',
    title: 'Engineering Sub-50ms B2B Platforms with Next.js 15 Server Components and Fine-Grained Cache Tags',
    subtitle:
      'Architectural patterns for combining personalized multi-tenant pricing with instant static-grade edge performance.',
    excerpt:
      'How we architected a 450,000-SKU industrial platform that serves personalized contract pricing while maintaining a 99 Lighthouse performance score.',
    category: 'Web Engineering',
    tags: ['Next.js 15', 'React Server Components', 'Performance', 'Technical SEO'],
    authorSlug: 'hannah-mercier',
    authorName: 'Hannah Mercier',
    authorRole: 'Director of Web, Mobile & Digital Growth Engineering',
    publishedAt: '2026-08-11',
    readTimeMinutes: 7,
    heroImage: GENERATED_IMAGES.heroArchitecture,
    sections: [
      {
        heading: '1. Decoupling Static Specification Shells from Dynamic Tenant Entitlements',
        body: [
          'In B2B commerce and enterprise portals, 90% of a page (technical specifications, CAD diagrams, compliance certificates) is identical across users, while 10% (customer-specific tier pricing and warehouse stock) is dynamic.',
          'By rendering the specification shell via cached React Server Components and streaming the tenant pricing boundary in parallel, Time to First Byte (TTFB) drops below 35ms globally.',
        ],
      },
      {
        heading: '2. Deterministic Cache Invalidation via Webhook Tags',
        body: [
          'Instead of short TTLs that thrash origin databases, we bind every product and CMS document to granular cache tags (`revalidateTag`). When an administrator updates a service or price in the CMS, only the affected routes purge in under 150ms.',
        ],
      },
    ],
    relatedServiceSlugs: ['nextjs-web-applications', 'ecommerce-platforms', 'technical-seo-organic-growth'],
    relatedArticleSlugs: ['architecting-verifiable-enterprise-rag-pipelines'],
    featured: true,
    status: 'published',
    seo: {
      metaTitle: 'Sub-50ms Next.js 15 Enterprise Architecture Patterns | Tech Solution Nepal',
      metaDescription:
        'Learn how to combine React Server Components, fine-grained cache tags, and streaming suspense for sub-50ms enterprise web apps.',
    },
    updatedAt: '2026-08-11T10:00:00.000Z',
  },
  {
    id: 'art-04',
    slug: 'clickhouse-vs-snowflake-real-time-telemetry',
    title: 'ClickHouse and Snowflake in Tandem: Designing Cost-Optimal Telemetry Lakehouses',
    subtitle:
      'Cutting cloud analytics bills by 36% by routing high-concurrency operational queries to ClickHouse and ad-hoc warehouse joins to Snowflake.',
    excerpt:
      'Using a traditional cloud data warehouse for sub-second customer-facing dashboards leads to runaway compute credit consumption. Here is the hybrid alternative.',
    category: 'Data & Cloud',
    tags: ['ClickHouse', 'Snowflake', 'Data Engineering', 'FinOps'],
    authorSlug: 'elena-rostova',
    authorName: 'Elena Rostova',
    authorRole: 'CTO & Head of Cloud Platform',
    publishedAt: '2026-07-22',
    readTimeMinutes: 8,
    heroImage: GENERATED_IMAGES.cloudGrid,
    sections: [
      {
        heading: '1. Matching Workload Access Patterns to Storage Engines',
        body: [
          'Cloud data warehouses excel at massive ad-hoc analytical joins and bi-weekly financial reporting, but keeping large virtual warehouses warm 24/7 to serve high-concurrency user dashboards is financially inefficient.',
          'By streaming Kafka events into ClickHouse for real-time sub-100ms operational slices while syncing Iceberg/Parquet tables to Snowflake for deep corporate BI, enterprises achieve both speed and FinOps discipline.',
        ],
      },
    ],
    relatedServiceSlugs: ['modern-data-warehousing-pipelines', 'aws-gcp-cloud-architecture'],
    relatedArticleSlugs: ['zero-downtime-legacy-erp-strangler-migrations'],
    featured: false,
    status: 'published',
    seo: {
      metaTitle: 'ClickHouse & Snowflake Hybrid Telemetry Architecture | Tech Solution Nepal',
      metaDescription:
        'How to reduce cloud analytics spend by 36% using a hybrid ClickHouse and Snowflake lakehouse architecture.',
    },
    updatedAt: '2026-07-22T10:00:00.000Z',
  },
];

export const SEED_TESTIMONIALS: ClientTestimonial[] = [
  {
    id: 'test-01',
    clientName: 'Henrik Lindt',
    clientRole: 'Chief Operating Officer',
    companyName: 'Helvetia Clearstream Partners (Zurich)',
    industry: 'Financial Services',
    beforeState: 'Overnight T+1 batch clearing terminal struggling with lock contention and manual FX exception spreadsheets.',
    changeImplemented: 'Architected an event-sourced Next.js and Go/Kafka real-time settlement ledger with four-eyes cryptographic controls.',
    quantifiedOutcome: '$4.2B daily volume cleared in 1.4 seconds with a 99.4% reduction in manual reconciliation exceptions.',
    quote:
      'Tech Solution Nepal delivered what two global systems integrators told us would take three years in just 18 weeks. Our clearing desk now settles $4.2B daily with sub-40ms responsiveness and zero reconciliation backlog.',
    projectSlug: 'institutional-settlement-ledger',
    serviceSlug: 'nextjs-web-applications',
    verifiedDate: '2026-06-14',
    featured: true,
    status: 'published',
  },
  {
    id: 'test-02',
    clientName: 'Dr. Aris Thorne, MD',
    clientRole: 'VP of Clinical Informatics',
    companyName: 'Vanguard BioLabs & Oncology Network',
    industry: 'Healthcare & Life Sciences',
    beforeState: 'Oncology coordinators spent 4.5 hours per patient manually reviewing pathology PDFs against 180 trial protocols.',
    changeImplemented: 'Built a HIPAA-compliant hybrid RAG and genomic variant triage workstation with bounding-box citation proofs.',
    quantifiedOutcome: 'Reduced patient screening cycle time by 78% (to 11 minutes) and increased Phase II/III trial enrollment by 142%.',
    quote:
      'Our clinicians refused to trust black-box AI summaries. Because Tech Solution Nepal engineered every extracted criterion to highlight the exact line in the source pathology report, adoption across all 12 hospitals was immediate.',
    projectSlug: 'clinical-genomics-triage-ai',
    serviceSlug: 'llm-rag-systems',
    verifiedDate: '2026-05-20',
    featured: true,
    status: 'published',
  },
  {
    id: 'test-03',
    clientName: 'Soren Lindholm',
    clientRole: 'SVP of Infrastructure & Grid Telemetry',
    companyName: 'NordicGrid Energy AG',
    industry: 'Energy & Utilities',
    beforeState: '14 siloed regional data centers with 15-minute telemetry lag and runaway proprietary database licensing fees.',
    changeImplemented: 'Consolidated onto a sovereign multi-region Kubernetes and ClickHouse streaming lakehouse.',
    quantifiedOutcome: '1.8M IoT events/sec ingested at 99.996% uptime with $1.94M in verified annual cloud savings.',
    quote:
      'Tech Solution Nepal paid for their entire engagement within seven months solely through the $1.94M in annual cloud and database savings they unlocked—while giving our grid operators sub-second telemetry.',
    projectSlug: 'sovereign-cloud-telemetry-grid',
    serviceSlug: 'aws-gcp-cloud-architecture',
    verifiedDate: '2026-03-11',
    featured: true,
    status: 'published',
  },
  {
    id: 'test-04',
    clientName: 'Marcus Vane-Tempest',
    clientRole: 'Global Director of Port Operations',
    companyName: 'Maersk-Vanguard Maritime Logistics',
    industry: 'Manufacturing & Supply Chain',
    beforeState: 'Fragile point-to-point ERP integrations causing container dispatch delays and manual customs re-keying.',
    changeImplemented: 'Deployed Temporal.io workflow orchestration and offline-first Kotlin Android dock scanners across 18 hubs.',
    quantifiedOutcome: '52% faster port turnaround dispatch and $3.1M saved annually in demurrage and manual operations.',
    quote:
      'Even when external customs portals go offline for hours, our Temporal workflows and offline Android scanners keep freight moving seamlessly without a single lost manifest.',
    projectSlug: 'autonomous-supply-chain-orchestrator',
    serviceSlug: 'business-workflow-automation',
    verifiedDate: '2025-11-30',
    featured: true,
    status: 'published',
  },
  {
    id: 'test-05',
    clientName: 'dieter Kranz',
    clientRole: 'Managing Director',
    companyName: 'Kranz Precision Components GmbH',
    industry: 'Retail & E-Commerce',
    beforeState: '450,000 precision industrial SKUs locked in static PDF catalogs with slow phone/email quoting.',
    changeImplemented: 'Built a composable Next.js 15 B2B commerce platform with sub-50ms parametric filtering and programmatic SEO.',
    quantifiedOutcome: '+184% inbound B2B quote requests and 76% self-serve procurement reorder rate.',
    quote:
      'Design engineers across Europe now find our exact DIN-standard components on Google and generate instant contract-priced quotes in seconds.',
    projectSlug: 'omni-channel-b2b-commerce-core',
    serviceSlug: 'ecommerce-platforms',
    verifiedDate: '2026-07-04',
    featured: false,
    status: 'published',
  },
];

export const SEED_INDUSTRIES: IndustryVertical[] = [
  {
    id: 'ind-01',
    slug: 'financial-services-fintech',
    name: 'Financial Services, Banking & Institutional FinTech',
    summary:
      'Low-latency trading & settlement ledgers, Zero-Trust IAM, real-time fraud scoring, and regulatory compliance architectures.',
    complianceStandards: ['SOC 2 Type II', 'PCI-DSS v4.0', 'ISO 27001', 'FCA / SEC / FINMA Audit Trails', 'FAPI 2.0 OAuth'],
    challenges: [
      'Legacy batch clearing cores unable to support 24/7 real-time instant settlement.',
      'Strict multi-jurisdictional data residency and cryptographic audit requirements.',
      'Sophisticated account takeover and synthetic identity fraud.',
    ],
    solutions: [
      'Double-entry immutable event-sourced ledgers with deterministic idempotency.',
      'Hardware-backed WebAuthn passkeys and policy-as-code authorization.',
      'Real-time streaming anomaly and risk scoring in under 25ms.',
    ],
    keyMetrics: '$4.2B+ daily institutional volume processed across Tech Solution Nepal-engineered systems',
    relatedServiceSlugs: ['nextjs-web-applications', 'security-audits-penetration-testing', 'database-administration-optimization'],
    relatedProjectSlugs: ['institutional-settlement-ledger', 'zero-trust-banking-iam-overhaul'],
  },
  {
    id: 'ind-02',
    slug: 'healthcare-life-sciences',
    name: 'Healthcare, Genomics & Life Sciences',
    summary:
      'HIPAA-compliant clinical portals, citation-grounded medical RAG systems, HL7/FHIR interoperability, and diagnostic software.',
    complianceStandards: ['HIPAA / HITECH', 'FDA 21 CFR Part 11', 'HL7 FHIR R4', 'SOC 2 Type II', 'GDPR Health Data'],
    challenges: [
      'Clinician burnout from unstructured EHR notes and fragmented pathology PDFs.',
      'Strict PHI isolation prohibiting public multi-tenant AI endpoints.',
      'Interoperability barriers between hospital Epic/Cerner instances and lab systems.',
    ],
    solutions: [
      'VPC-isolated biomedical RAG pipelines with exact source bounding-box citations.',
      'Automated HL7 FHIR R4 integration gateways and patient mobile portals.',
      'High-resolution diagnostic desktop and web workstations.',
    ],
    keyMetrics: '-78% clinical trial screening time across 12 oncology hospital networks',
    relatedServiceSlugs: ['llm-rag-systems', 'ios-app-development', 'product-ui-ux-design'],
    relatedProjectSlugs: ['clinical-genomics-triage-ai'],
  },
  {
    id: 'ind-03',
    slug: 'manufacturing-supply-chain',
    name: 'Manufacturing, Logistics & Supply Chain',
    summary:
      'Durable ERP workflow orchestration, ruggedized offline mobile fleet apps, IoT telemetry, and predictive demand engines.',
    complianceStandards: ['ISO 9001', 'EDI X12 / EDIFACT', 'SOC 2', 'Industrial OT/IT Segmentation'],
    challenges: [
      'Siloed regional SAP and NetSuite ERPs causing shipment visibility blackouts.',
      'Warehouse and port dead zones breaking cloud-dependent mobile scanner apps.',
      'Volatile component lead times and manual customs documentation.',
    ],
    solutions: [
      'Temporal.io durable workflow automation spanning ERP, WMS, and carrier APIs.',
      'Offline-first Kotlin/Flutter field applications with CRDT conflict resolution.',
      'ML time-series demand forecasting and automated safety-stock optimization.',
    ],
    keyMetrics: '48,000+ annual logistics hours automated & -52% port dispatch time',
    relatedServiceSlugs: ['business-workflow-automation', 'android-app-development', 'legacy-erp-modernization'],
    relatedProjectSlugs: ['autonomous-supply-chain-orchestrator'],
  },
  {
    id: 'ind-04',
    slug: 'retail-b2b-ecommerce',
    name: 'Composable Retail & B2B Industrial Commerce',
    summary:
      'High-SKU headless storefronts, sub-50ms parametric search, ERP contract pricing sync, and programmatic technical SEO.',
    complianceStandards: ['PCI-DSS', 'WCAG 2.2 AA Accessibility', 'GDPR / CCPA Privacy'],
    challenges: [
      'Monolithic e-commerce platforms choking on complex B2B contract price matrices.',
      'Slow Core Web Vitals hurting organic search rankings and mobile checkout conversion.',
      'Unindexed technical product catalogs invisible to search engines.',
    ],
    solutions: [
      'Next.js 15 composable commerce with edge-cached shells and live ERP pricing.',
      'Typesense/Algolia parametric filtering across hundreds of thousands of SKUs.',
      'Programmatic Schema.org JSON-LD and server-side conversion attribution.',
    ],
    keyMetrics: '+184% inbound B2B quote volume & 42ms search latency across 450k SKUs',
    relatedServiceSlugs: ['ecommerce-platforms', 'technical-seo-organic-growth', 'performance-load-accessibility-testing'],
    relatedProjectSlugs: ['omni-channel-b2b-commerce-core'],
  },
  {
    id: 'ind-05',
    slug: 'energy-utilities-infrastructure',
    name: 'Energy, Utilities & Sovereign Infrastructure',
    summary:
      'High-ingestion IoT grid telemetry lakehouses, multi-region Kubernetes platforms, and predictive asset maintenance.',
    complianceStandards: ['NIS2 Directive', 'ISO 27001', 'Sovereign EU/Regional Cloud Residency'],
    challenges: [
      'Millions of sensor readings per second overwhelming legacy relational databases.',
      'Strict sovereign data residency forbidding unencrypted cross-border cloud routing.',
    ],
    solutions: [
      'ClickHouse and Kafka streaming lakehouses achieving 14:1 compression.',
      'Multi-region sovereign Kubernetes clusters with automated failover.',
    ],
    keyMetrics: '1.8M IoT events/sec ingested with $1.94M annual cloud cost savings',
    relatedServiceSlugs: ['aws-gcp-cloud-architecture', 'modern-data-warehousing-pipelines', 'managed-sre-application-support'],
    relatedProjectSlugs: ['sovereign-cloud-telemetry-grid'],
  },
  {
    id: 'ind-06',
    slug: 'enterprise-b2b-saas',
    name: 'High-Growth B2B SaaS & Technology Platforms',
    summary:
      'Multi-tenant SaaS product architecture, SAML SSO, tokenized design systems, embedded AI, and automated Playwright QA.',
    complianceStandards: ['SOC 2 Type II', 'ISO 27001', 'GDPR', 'WCAG 2.2 AA'],
    challenges: [
      'Enterprise buyers demanding SAML/SCIM, audit logs, and SOC 2 before signing six-figure contracts.',
      'Rapid feature velocity causing UI inconsistency and regression bugs.',
    ],
    solutions: [
      'Turnkey enterprise readiness: row-level tenant isolation, RBAC, and audit trails.',
      'Tokenized Figma-to-React design systems and parallelized Playwright CI gates.',
    ],
    keyMetrics: '3x faster enterprise procurement security sign-off for SaaS clients',
    relatedServiceSlugs: ['multi-tenant-saas-engineering', 'brand-identity-design-systems', 'automated-e2e-api-testing'],
    relatedProjectSlugs: ['institutional-settlement-ledger', 'zero-trust-banking-iam-overhaul'],
  },
];

export const SEED_JOBS: JobOpening[] = [
  {
    id: 'job-01',
    slug: 'principal-distributed-systems-architect',
    title: 'Principal Distributed Systems & Cloud Architect',
    department: 'Principal Architecture',
    location: 'Zurich or New York (Hybrid)',
    workMode: 'Hybrid',
    employmentType: 'Full-Time',
    compensationRange: '$210,000 – $265,000 + Equity & Profit Share',
    experienceLevel: '10+ Years',
    summary:
      'Lead architectural discovery, C4 system design, and mission-critical delivery across our flagship financial services and sovereign cloud engagements.',
    responsibilities: [
      'Author C4 architecture blueprints, data models, and threat models for enterprise client platforms.',
      'Lead pods of 5–8 senior engineers through complex strangler-fig migrations and greenfield builds.',
      'Partner directly with client CTOs and VPs of Engineering on technical strategy and SLA governance.',
    ],
    requirements: [
      '10+ years designing and shipping high-throughput production systems in Go, TypeScript/Node.js, Rust, or Java.',
      'Deep production mastery of PostgreSQL, Apache Kafka, Kubernetes, and AWS/GCP multi-region topologies.',
      'Track record of clear technical writing and executive stakeholder communication.',
    ],
    niceToHave: [
      'Experience with financial clearing protocols (FIX, ISO 20022) or Temporal.io orchestration.',
      'Contributions to open-source infrastructure or published architectural papers.',
    ],
    benefits: [
      'Top-decile base salary plus annual profit-sharing pool.',
      '$6,000 annual conference, hardware, and continuous research stipend.',
      'Comprehensive global health coverage and 30 days paid time off.',
    ],
    status: 'published',
    postedAt: '2026-09-25',
  },
  {
    id: 'job-02',
    slug: 'staff-ai-rag-machine-learning-engineer',
    title: 'Staff Applied AI & Retrieval Systems Engineer',
    department: 'AI & Data Systems',
    location: 'New York, London, or Remote',
    workMode: 'Remote',
    employmentType: 'Full-Time',
    compensationRange: '$185,000 – $235,000 + Equity & Profit Share',
    experienceLevel: '7+ Years',
    summary:
      'Architect citation-grounded RAG pipelines, evaluation harnesses, and fine-tuned domain models for healthcare, legal, and financial enterprises.',
    responsibilities: [
      'Build hybrid dense/lexical retrieval pipelines using Qdrant, pgvector, and cross-encoder rerankers.',
      'Design automated LLM evaluation harnesses measuring factual precision, recall, and latency budgets.',
      'Deploy quantized inference workloads on VPC-isolated GPU clusters.',
    ],
    requirements: [
      '7+ years in software engineering with 4+ years building production NLP/ML or LLM retrieval systems in Python and TypeScript.',
      'Strong fundamentals in information retrieval, vector indexing, and evaluation metrics.',
    ],
    niceToHave: [
      'Experience with HIPAA or SOC 2 governed clinical/financial data pipelines.',
      'Experience with vLLM, LoRA fine-tuning, and ONNX runtime optimization.',
    ],
    benefits: [
      'Flexible remote/hybrid work across US, UK, and EU timezones.',
      'Dedicated H100/A100 compute sandbox budget for R&D experimentation.',
      'Full health, dental, vision, and parental leave benefits.',
    ],
    status: 'published',
    postedAt: '2026-09-28',
  },
  {
    id: 'job-03',
    slug: 'senior-nextjs-design-systems-engineer',
    title: 'Senior Full-Stack Next.js & Design Systems Engineer',
    department: 'Product & Design',
    location: 'London or Zurich (Hybrid)',
    workMode: 'Hybrid',
    employmentType: 'Full-Time',
    compensationRange: '$155,000 – $190,000 + Profit Share',
    experienceLevel: '6+ Years',
    summary:
      'Build sub-100ms Next.js 15 web applications, high-density data consoles, and WCAG AAA accessible component libraries.',
    responsibilities: [
      'Architect full-stack Next.js App Router applications with React Server Components and strict TypeScript.',
      'Collaborate with Product Designers to maintain tokenized Figma-to-Code component libraries.',
      'Optimize Core Web Vitals, tabular data virtualization, and keyboard accessibility.',
    ],
    requirements: [
      '6+ years with React, TypeScript, Next.js, Tailwind CSS, and Node.js API design.',
      'Obsessive attention to typographic hierarchy, spatial math, and sub-200ms interaction latency.',
    ],
    niceToHave: [
      'Experience with WebSockets, Visx/D3 data visualization, or Playwright automation.',
    ],
    benefits: [
      'Apple M4 Max workstation and studio display setup.',
      '$6,000 annual learning and travel budget.',
      '30 days PTO + national holidays.',
    ],
    status: 'published',
    postedAt: '2026-10-02',
  },
  {
    id: 'job-04',
    slug: 'lead-offensive-security-penetration-tester',
    title: 'Lead Application Security & Offensive Penetration Tester',
    department: 'Cloud & Security',
    location: 'Singapore or London',
    workMode: 'Hybrid',
    employmentType: 'Full-Time',
    compensationRange: '$170,000 – $215,000 + Profit Share',
    experienceLevel: '7+ Years',
    summary:
      'Execute white-box source code audits, API penetration tests, and Zero-Trust IAM assessments for enterprise clients.',
    responsibilities: [
      'Conduct manual white-box and black-box penetration tests across web, mobile, and cloud workloads.',
      'Partner with engineering pods to author secure authentication, RBAC, and cryptographic implementations.',
    ],
    requirements: [
      'OSCP, OSWE, or equivalent demonstrated offensive security track record.',
      'Proficiency reading and auditing TypeScript, Go, Python, and Terraform codebases.',
    ],
    niceToHave: ['Experience auditing OAuth 2.1 / FAPI 2.0 and Kubernetes CKS environments.'],
    benefits: [
      'Sponsored offensive security certifications and DEFCON / BlackHat research travel.',
      'Comprehensive healthcare and performance bonus.',
    ],
    status: 'published',
    postedAt: '2026-10-04',
  },
];

export const SEED_FAQS: FaqItem[] = [
  {
    id: 'faq-01',
    category: 'General & Engagement',
    question: 'How quickly can Tech Solution Nepal mobilize an engineering pod for a new project?',
    answer:
      'For architectural audits and discovery blueprints, a Principal Architect can begin within 5 business days. For full-scale engineering pods (1 Principal Architect + 3–5 Senior Engineers + Product Designer + QA), typical mobilization is 10 to 15 business days following scope sign-off.',
    order: 1,
    status: 'published',
  },
  {
    id: 'faq-02',
    category: 'General & Engagement',
    question: 'Do you work on fixed-scope milestones or dedicated monthly retainers?',
    answer:
      'We support both models. When deliverables are well-bounded—such as a security audit, an MVP launch, or a defined migration phase—we offer Fixed-Scope Milestone contracts with guaranteed deliverables. For continuous multi-quarter product engineering, clients engage a Dedicated Engineering Pod on a predictable monthly retainer.',
    order: 2,
    status: 'published',
  },
  {
    id: 'faq-03',
    category: 'Architecture & Engineering',
    question: 'Who owns the source code, patents, and custom AI models created during the engagement?',
    answer:
      'Your organization retains 100% ownership of all custom source code, architectural blueprints, Figma design systems, infrastructure templates, and fine-tuned model weights upon payment. We never hold client IP hostage with proprietary black-box frameworks.',
    order: 3,
    status: 'published',
  },
  {
    id: 'faq-04',
    category: 'Architecture & Engineering',
    question: 'Can your engineers integrate directly with our internal product and engineering teams?',
    answer:
      'Yes. Over 60% of our engagements operate in a co-engineering model where our Principal Architects and Senior Engineers work inside your GitHub/GitLab repositories, Slack channels, and Jira/Linear workflows while upskilling your internal staff.',
    order: 4,
    status: 'published',
  },
  {
    id: 'faq-05',
    category: 'Security & Compliance',
    question: 'How do you prevent LLM hallucinations and protect confidential data in AI/RAG projects?',
    answer:
      'We never train public foundation models on client data. We deploy VPC-isolated inference endpoints (under signed HIPAA BAA / SOC 2 controls), enforce RBAC document pre-filtering before vector retrieval, and require every generated claim to pass deterministic span-citation verification.',
    order: 5,
    status: 'published',
  },
  {
    id: 'faq-06',
    category: 'Security & Compliance',
    question: 'Are your delivery workflows certified for SOC 2 Type II, ISO 27001, and HIPAA?',
    answer:
      'Yes. Tech Solution Nepal operates under ISO/IEC 27001:2022 and SOC 2 Type II audited engineering controls. Every pull request undergoes automated SAST, dependency vulnerability scanning, and peer review by a cleared senior engineer.',
    order: 6,
    status: 'published',
  },
  {
    id: 'faq-07',
    category: 'Pricing & Governance',
    question: 'What is the typical investment range for an enterprise project with Tech Solution Nepal?',
    answer:
      'Focused engagements such as Application Security Audits, Performance Load Engineering, or Phase-1 Architecture Blueprints typically range from $25,000 to $55,000. Full-scale custom web, mobile, AI, or cloud platform deliveries generally range from $75,000 to $250,000+ depending on scope and integration complexity.',
    order: 7,
    status: 'published',
  },
  {
    id: 'faq-08',
    category: 'Pricing & Governance',
    question: 'Do you provide 24/7 post-launch support and SLA guarantees?',
    answer:
      'Every production platform we build includes a 90-day warranty period for defect resolution. Beyond that, our global Managed SRE pods across Zurich, London, New York, and Singapore offer 24/7/365 monitoring with <15-minute P1 response SLAs.',
    order: 8,
    status: 'published',
  },
];

export const SEED_INQUIRIES: LeadInquiry[] = [
  {
    id: 'lead-sample-01',
    referenceCode: 'AETH-2026-8941',
    type: 'quote',
    fullName: 'Victoria Sterling (Sample Lead)',
    businessEmail: 'v.sterling@meridian-capital-sample.com',
    phone: '+44 20 7946 0192',
    companyName: 'Meridian Institutional Asset Management',
    companyRole: 'VP of Digital Transformation',
    categorySlug: 'web-development',
    serviceSlug: 'nextjs-web-applications',
    serviceName: 'Next.js & React Enterprise Web Applications',
    budgetRange: '$100,000 – $250,000',
    timeline: 'Q1 Launch (12–16 Weeks)',
    preferredContactMethod: 'Video Call',
    projectDescription:
      '[SAMPLE RECORD] We are seeking to replace our legacy investor reporting portal with a Next.js 15 multi-tenant platform integrated with Snowflake and SAML SSO for 1,400 institutional LPs.',
    customFieldResponses: {
      current_architecture: 'Legacy .NET MVC + SQL Server 2016',
      compliance_requirements: 'SOC 2 Type II / ISO 27001',
    },
    consentAccepted: true,
    status: 'qualified',
    assignedTo: 'Dr. Marcus Vance',
    followUpDate: '2026-10-15',
    internalNotes: [
      {
        id: 'note-01',
        authorName: 'Elena Rostova',
        authorRole: 'super_admin',
        content:
          'Completed technical discovery call. Shared our Helvetia Clearstream architecture reference. Proposal scheduled for Thursday.',
        createdAt: '2026-10-08T14:30:00.000Z',
      },
    ],
    duplicateHash: 'sample-hash-01',
    emailNotificationStatus: 'logged_local_preview',
    createdAt: '2026-10-07T09:15:00.000Z',
    updatedAt: '2026-10-08T14:30:00.000Z',
  },
  {
    id: 'lead-sample-02',
    referenceCode: 'AETH-2026-8942',
    type: 'quote',
    fullName: 'Dr. Julian Mercer (Sample Lead)',
    businessEmail: 'j.mercer@novagen-diagnostics-sample.org',
    phone: '+1 (617) 555-0148',
    companyName: 'NovaGen Clinical Diagnostics',
    companyRole: 'Chief Medical Information Officer',
    categorySlug: 'ai-machine-learning',
    serviceSlug: 'llm-rag-systems',
    serviceName: 'Enterprise LLM Integration & Verifiable RAG Systems',
    budgetRange: '$75,000 – $150,000',
    timeline: 'Immediate (8–12 Weeks)',
    preferredContactMethod: 'Email',
    projectDescription:
      '[SAMPLE RECORD] Looking to deploy a HIPAA-compliant citation-grounded RAG system over 85,000 internal clinical SOPs and assay validation reports.',
    customFieldResponses: {
      current_architecture: 'AWS HIPAA VPC + PostgreSQL',
      compliance_requirements: 'HIPAA / Clinical Data Privacy',
    },
    consentAccepted: true,
    status: 'proposal_sent',
    assignedTo: 'Dr. Devon Keshav',
    followUpDate: '2026-10-14',
    internalNotes: [
      {
        id: 'note-02',
        authorName: 'Dr. Devon Keshav',
        authorRole: 'admin',
        content:
          'Delivered C4 RAG architecture proposal and HIPAA BAA readiness checklist.',
        createdAt: '2026-10-09T11:20:00.000Z',
      },
    ],
    duplicateHash: 'sample-hash-02',
    emailNotificationStatus: 'logged_local_preview',
    createdAt: '2026-10-08T16:40:00.000Z',
    updatedAt: '2026-10-09T11:20:00.000Z',
  },
  {
    id: 'lead-sample-03',
    referenceCode: 'AETH-2026-8943',
    type: 'contact',
    fullName: 'Lukas Weber (Sample Lead)',
    businessEmail: 'l.weber@alpinelogistics-sample.ch',
    phone: '+41 44 580 99 12',
    companyName: 'Alpine Freight & Cold Chain AG',
    companyRole: 'Head of IT Infrastructure',
    categorySlug: 'cybersecurity-it-consulting',
    serviceSlug: 'security-audits-penetration-testing',
    serviceName: 'Application Security Audits, Penetration Testing & SOC 2',
    budgetRange: '$35,000 – $75,000',
    timeline: 'Within 30 Days',
    preferredContactMethod: 'Video Call',
    projectDescription:
      '[SAMPLE RECORD] Require a comprehensive white-box web and mobile API penetration test ahead of our ISO 27001 surveillance audit.',
    consentAccepted: true,
    status: 'new',
    assignedTo: 'Kenji Takahashi',
    followUpDate: '2026-10-12',
    internalNotes: [],
    duplicateHash: 'sample-hash-03',
    emailNotificationStatus: 'logged_local_preview',
    createdAt: '2026-10-09T18:05:00.000Z',
    updatedAt: '2026-10-09T18:05:00.000Z',
  },
];

export const SEED_MEDIA_ASSETS: MediaAsset[] = [
  {
    id: 'med-01',
    title: 'Tech Solution Nepal Global Engineering Headquarters at Dusk',
    fileName: 'hero_enterprise_architecture_1791637681108.jpg',
    url: GENERATED_IMAGES.heroArchitecture,
    mimeType: 'image/jpeg',
    aspectRatio: '16:9',
    category: 'Hero & Architecture',
    altText: 'Modern glass-and-steel enterprise technology headquarters at dusk',
    uploadedBy: 'Claire Lindqvist',
    createdAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'med-02',
    title: 'Institutional Settlement Ledger Workstation',
    fileName: 'project_fintech_platform_1791637694196.jpg',
    url: GENERATED_IMAGES.fintechPlatform,
    mimeType: 'image/jpeg',
    aspectRatio: '4:3',
    category: 'Case Study',
    altText: 'Dark-mode institutional financial settlement ledger workstation in Zurich office',
    uploadedBy: 'Claire Lindqvist',
    createdAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'med-03',
    title: 'Clinical Genomics & Oncology Research Facility',
    fileName: 'project_healthcare_ai_1791637706463.jpg',
    url: GENERATED_IMAGES.healthcareAi,
    mimeType: 'image/jpeg',
    aspectRatio: '4:3',
    category: 'Case Study',
    altText: 'Biomedical genomics and clinical data research facility with diagnostic monitors',
    uploadedBy: 'Dr. Devon Keshav',
    createdAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'med-04',
    title: 'Sovereign Cloud Infrastructure Corridor',
    fileName: 'project_cloud_grid_1791637721502.jpg',
    url: GENERATED_IMAGES.cloudGrid,
    mimeType: 'image/jpeg',
    aspectRatio: '4:3',
    category: 'Case Study',
    altText: 'Sovereign cloud infrastructure facility with anodized steel server racks',
    uploadedBy: 'Elena Rostova',
    createdAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'med-05',
    title: 'Principal Systems Architecture Collaborative Studio',
    fileName: 'team_leadership_studio_1791637731833.jpg',
    url: GENERATED_IMAGES.teamStudio,
    mimeType: 'image/jpeg',
    aspectRatio: '16:9',
    category: 'Editorial & Team',
    altText: 'Senior software architects collaborating around a timber table in a modern studio',
    uploadedBy: 'Dr. Marcus Vance',
    createdAt: '2026-10-01T08:00:00.000Z',
  },
  {
    id: 'med-06',
    title: 'Tech Solution Nepal Engineering Campus & Innovation Hub',
    fileName: 'hero_tech_nepal_hub_1791828170517.jpg',
    url: GENERATED_IMAGES.heroTechNepal,
    mimeType: 'image/jpeg',
    aspectRatio: '16:9',
    category: 'Hero & Architecture',
    altText: 'Modern technology campus and engineering floor in Kathmandu Nepal overlooking Himalayan foothills',
    uploadedBy: 'Dr. Marcus Vance',
    createdAt: '2026-10-12T08:00:00.000Z',
  },
  {
    id: 'med-07',
    title: 'Nepali Software Engineers & Product Designers Collaborating',
    fileName: 'team_nepal_engineers_1791828181244.jpg',
    url: GENERATED_IMAGES.teamNepal,
    mimeType: 'image/jpeg',
    aspectRatio: '16:9',
    category: 'Editorial & Team',
    altText: 'Nepali software engineers and product designers in architectural engineering studio in Kathmandu',
    uploadedBy: 'Elena Rostova',
    createdAt: '2026-10-12T08:00:00.000Z',
  },
  {
    id: 'med-08',
    title: 'Digital Payments & QR Banking Ledger Workstation',
    fileName: 'project_fintech_nepal_1791828192313.jpg',
    url: GENERATED_IMAGES.fintechNepal,
    mimeType: 'image/jpeg',
    aspectRatio: '4:3',
    category: 'Case Study',
    altText: 'Modern digital banking and instant QR payment telemetry dashboard workstation',
    uploadedBy: 'Dr. Devon Keshav',
    createdAt: '2026-10-12T08:00:00.000Z',
  },
  {
    id: 'med-09',
    title: 'Global Supply Chain & Logistics Routing Telemetry Console',
    fileName: 'project_ecommerce_logistics_1791828211445.jpg',
    url: GENERATED_IMAGES.ecommerceLogistics,
    mimeType: 'image/jpeg',
    aspectRatio: '4:3',
    category: 'Case Study',
    altText: 'Global logistics tracking workstation with live routing telemetry and dispatch metrics',
    uploadedBy: 'Claire Lindqvist',
    createdAt: '2026-10-12T08:00:00.000Z',
  },
];

export const SEED_REDIRECTS: SeoRedirect[] = [
  {
    id: 'red-01',
    sourcePath: '/Portfolio',
    destinationPath: '/projects',
    statusCode: 301,
    active: true,
    notes: 'Legacy site URL migration to unified case studies directory.',
    createdAt: '2026-09-01T08:00:00.000Z',
  },
  {
    id: 'red-02',
    sourcePath: '/services/ai-consulting',
    destinationPath: '/services/ai-machine-learning/llm-rag-systems',
    statusCode: 301,
    active: true,
    notes: 'Consolidated legacy AI consulting slug into Enterprise LLM & RAG Systems.',
    createdAt: '2026-09-10T08:00:00.000Z',
  },
];

function createSeedUser(
  id: string,
  name: string,
  email: string,
  role: AdminUser['role'],
  department: string,
  plainPassword: string
): AdminUser {
  const { hash, salt } = hashPassword(plainPassword, `salt-${id}`);
  return {
    id,
    name,
    email,
    role,
    department,
    passwordHash: hash,
    passwordSalt: salt,
    active: true,
    lastLoginAt: '2026-10-10T06:00:00.000Z',
  };
}

export const SEED_ADMIN_USERS: AdminUser[] = [
  createSeedUser(
    'usr-super-admin',
    'Elena Rostova',
    'elena.rostova@techsolutionnepal.com',
    'super_admin',
    'Executive Architecture & Governance',
    'Tech Solution Nepal!Super2026'
  ),
  createSeedUser(
    'usr-admin',
    'Dr. Marcus Vance',
    'marcus.vance@techsolutionnepal.com',
    'admin',
    'Executive Leadership',
    'Tech Solution Nepal!Admin2026'
  ),
  createSeedUser(
    'usr-editor',
    'Claire Lindqvist',
    'claire.lindqvist@techsolutionnepal.com',
    'editor',
    'Product & Content Systems',
    'Tech Solution Nepal!Editor2026'
  ),
  createSeedUser(
    'usr-sales',
    'Hannah Mercier',
    'hannah.mercier@techsolutionnepal.com',
    'sales',
    'Enterprise Client Advisory & Growth',
    'Tech Solution Nepal!Sales2026'
  ),
  createSeedUser(
    'usr-viewer',
    'Kenji Takahashi',
    'kenji.takahashi@techsolutionnepal.com',
    'viewer',
    'Security & Compliance Audit',
    'Tech Solution Nepal!Viewer2026'
  ),
];

export const SEED_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-01',
    actorName: 'Elena Rostova',
    actorEmail: 'elena.rostova@techsolutionnepal.com',
    actorRole: 'super_admin',
    action: 'PUBLISH_SERVICE',
    resourceType: 'service',
    resourceId: 'llm-rag-systems',
    summary: 'Published updated pricing tiers and HIPAA architecture checklist for Enterprise LLM & RAG Systems.',
    ipAddress: '194.230.148.12',
    createdAt: '2026-10-09T16:20:00.000Z',
  },
  {
    id: 'aud-02',
    actorName: 'Hannah Mercier',
    actorEmail: 'hannah.mercier@techsolutionnepal.com',
    actorRole: 'sales',
    action: 'UPDATE_LEAD_STATUS',
    resourceType: 'lead',
    resourceId: 'AETH-2026-8941',
    summary: 'Moved Meridian Institutional Asset Management inquiry to Qualified status and assigned Dr. Marcus Vance.',
    ipAddress: '198.51.100.44',
    createdAt: '2026-10-08T14:30:00.000Z',
  },
  {
    id: 'aud-03',
    actorName: 'Claire Lindqvist',
    actorEmail: 'claire.lindqvist@techsolutionnepal.com',
    actorRole: 'editor',
    action: 'PUBLISH_CASE_STUDY',
    resourceType: 'project',
    resourceId: 'institutional-settlement-ledger',
    summary: 'Published Helvetia Clearstream $4.2B settlement ledger case study metrics.',
    ipAddress: '194.230.148.19',
    createdAt: '2026-10-06T11:05:00.000Z',
  },
];

export const SEED_JOB_APPLICATIONS: JobApplication[] = [
  {
    id: 'app-01',
    jobSlug: 'principal-distributed-systems-architect',
    jobTitle: 'Principal Distributed Systems & Cloud Architect',
    fullName: 'Lukas Schneider (Sample Candidate)',
    email: 'l.schneider@example-candidate.ch',
    phone: '+41 79 555 18 20',
    linkedinOrPortfolio: 'https://github.com/lukas-distributed',
    yearsExperience: 12,
    coverNote:
      '[SAMPLE APPLICATION] Led distributed Kafka and Go settlement systems at a Swiss private bank for the past 6 years.',
    status: 'interviewing',
    createdAt: '2026-10-05T10:15:00.000Z',
  },
];
