# Tech Solution Nepal — Enterprise IT Solutions Website & Headless CMS Platform

A full-stack, production-oriented enterprise technology consultancy website and content management platform built with **Next.js 15 App Router**, **React 19**, **TypeScript**, **Tailwind CSS v4**, **Mongoose / MongoDB Atlas**, and **Zod**.

---

## 1. Architecture & System Overview

The platform is engineered around a unified, database-driven domain architecture:

- **Public Website (`app/*`)**: Server-rendered and dynamically generated pages for all 12 core technology service verticals, 27+ individual service detail pages, verified client case studies, engineering insights blog, leadership & engineering team profiles, career portal with live application pipeline, interactive quote request workflow, global search, and legal compliance pages.
- **Versioned REST API (`app/api/v1/*`)**:
  - `GET / POST / DELETE /api/v1/auth` — Admin authentication, scrypt password verification, HMAC-SHA256 HttpOnly session tokens, and live RBAC persona switching (`super_admin`, `admin`, `editor`, `sales`, `viewer`).
  - `GET / POST / PATCH / DELETE /api/v1/services` — Public service directory filtering and RBAC-protected CRUD for service categories and nested service pages.
  - `GET / POST / PATCH / DELETE /api/v1/projects` — Portfolio case studies with verified KPI metrics, architecture diagrams, and testimonials.
  - `GET / POST / PATCH / DELETE /api/v1/articles` — Engineering blog with structured content blocks, automatic reading-time computation, and XSS sanitization.
  - `GET / POST / PATCH /api/v1/inquiries` — Public quote and contact capture with honeypot spam defense, IP rate limiting, duplicate submission detection, and RBAC lead pipeline management.
  - `GET / POST /api/v1/careers` — Open engineering roles and candidate job application submissions.
  - `GET / POST /api/v1/cms` — Unified Admin CMS snapshot and RBAC-enforced mutations across categories, team, testimonials, FAQs, media library, 301/302 SEO redirects, and site configuration.
  - `GET /api/v1/search` — Full-text cross-collection search across services, case studies, blog articles, team profiles, careers, and FAQs.
  - `GET /api/v1/openapi` — Complete OpenAPI 3.1.0 / Swagger JSON specification.
- **Database & Persistence (`lib/db/*`)**:
  - **Mongoose Schemas (`lib/db/mongoose-models.ts`)**: Strongly typed schemas with compound indexes and unique slug validation for `ServiceCategory`, `ServiceItem`, `ProjectCaseStudy`, `TeamMember`, `BlogArticle`, `LeadInquiry`, `SeoRedirect`, and `AuditLog`.
  - **Hybrid Persistence Engine (`lib/db/store.ts`)**: Connects to MongoDB Atlas when `MONGODB_URI` is provided, while automatically maintaining a synchronized, zero-config disk-persisted JSON store (`.data/cms-store.json`) so all CMS mutations, new service pages, and lead submissions persist immediately in preview and local environments.

---

## 2. The 12 Core Service Categories & Nested Dynamic Pages

Every category (`/services/[categorySlug]`) and individual service (`/services/[categorySlug]/[serviceSlug]`) is database-driven and editable via the Admin CMS (`/admin`):

1. **Web Development** (`/services/web-development`)
   - Custom Web Application Engineering, Next.js & Headless Commerce Platforms, Enterprise CMS & Publishing Systems, Progressive Web Apps (PWA), API & Microservices Architecture
2. **Mobile App Development** (`/services/mobile-app-development`)
   - Native iOS Engineering (Swift), Native Android Engineering (Kotlin), Cross-Platform React Native & Flutter
3. **Desktop & Enterprise Software** (`/services/desktop-enterprise-software`)
   - Cross-Platform Desktop Software (Rust / Tauri / Electron), Legacy Mainframe & Monolith Modernization
4. **AI & Machine Learning** (`/services/ai-machine-learning`)
   - Enterprise RAG & Knowledge Copilots, Autonomous Multi-Agent Workflows, Computer Vision & Predictive MLOps
5. **Business Automation & Integrations** (`/services/business-automation`)
   - Event-Driven ERP/CRM Synchronization, Intelligent Document Processing (IDP)
6. **Cloud, DevOps & Infrastructure** (`/services/cloud-devops`)
   - Multi-Region Kubernetes & GitOps Platforms, Cloud FinOps & High-Availability Migration
7. **Cybersecurity & Compliance** (`/services/cybersecurity`)
   - Zero-Trust Architecture & Penetration Testing, Automated SOC2, HIPAA & ISO 27001 Compliance
8. **Data Analytics & Business Intelligence** (`/services/data-analytics`)
   - Real-Time Lakehouse & Streaming Pipelines, Executive Telemetry & Embedded BI
9. **UI/UX, Graphic Design & Branding** (`/services/design-branding`)
   - Enterprise Design Systems & Tokens, Technical Brand Identity & Product UX
10. **Digital Marketing & SEO** (`/services/digital-marketing-seo`)
    - Programmatic Technical SEO & Core Web Vitals, High-Intent B2B Conversion Engineering
11. **QA, Testing & Maintenance** (`/services/qa-testing`)
    - Automated E2E Playwright & Synthetic Load Testing, 24/7 Site Reliability Engineering (SRE)
12. **IT Consulting & Dedicated Teams** (`/services/it-consulting`)
    - Fractional CTO & Architecture Audits, Dedicated Principal Engineering Squads

---

## 3. Getting Started

### Environment Configuration

Copy `.env.example` to `.env.local` and configure as needed:

```bash
cp .env.example .env.local
```

### Development Server

```bash
npm install
npm run dev
```

Open `http://localhost:3000` for the public website or `http://localhost:3000/admin` for the Enterprise CMS & Lead Pipeline Console.

### Production Build

```bash
npm run build
npm start
```
