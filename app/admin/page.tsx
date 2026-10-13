'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  LayoutDashboard,
  Layers,
  Briefcase,
  FileText,
  Inbox,
  Users,
  Image as ImageIcon,
  Globe,
  ShieldAlert,
  Plus,
  ExternalLink,
  CheckCircle2,
  AlertCircle,
  Search,
  Trash2,
  Eye,
  Lock,
} from 'lucide-react';
import {
  ServiceCategory,
  ServiceItem,
  ProjectCaseStudy,
  BlogArticle,
  LeadInquiry,
  TeamMember,
  ClientTestimonial,
  FaqItem,
  JobOpening,
  JobApplication,
  MediaAsset,
  SeoRedirect,
  AuditLogEntry,
  SiteSettings,
  AdminRole,
  LeadStatus,
  PublishStatus,
} from '@/lib/types';
import { ResilientImage } from '@/components/ui/ResilientImage';

type AdminTab =
  | 'overview'
  | 'services'
  | 'projects'
  | 'leads'
  | 'articles'
  | 'company'
  | 'media'
  | 'seo'
  | 'rbac';

interface CmsSnapshot {
  session: {
    userId: string;
    name: string;
    email: string;
    role: AdminRole;
    department: string;
  };
  permissions: string[];
  siteSettings: SiteSettings;
  categories: ServiceCategory[];
  services: ServiceItem[];
  projects: ProjectCaseStudy[];
  team: TeamMember[];
  articles: BlogArticle[];
  testimonials: ClientTestimonial[];
  jobs: JobOpening[];
  jobApplications: JobApplication[];
  faqs: FaqItem[];
  inquiries: LeadInquiry[];
  mediaAssets: MediaAsset[];
  redirects: SeoRedirect[];
  auditLogs: AuditLogEntry[];
}

export default function AdminDashboardPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [cms, setCms] = useState<CmsSnapshot | null>(null);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState<{
    type: 'success' | 'error';
    message: string;
    linkUrl?: string;
    linkLabel?: string;
  } | null>(null);

  // Service Form State
  const [showServiceModal, setShowServiceModal] = useState(false);
  const [serviceSearch, setServiceSearch] = useState('');
  const [serviceCatFilter, setServiceCatFilter] = useState('all');
  const [srvSlug, setSrvSlug] = useState('custom-ai-model-development');
  const [srvCategorySlug, setSrvCategorySlug] = useState('ai-machine-learning');
  const [srvName, setSrvName] = useState(
    'Custom AI Model Development & Domain Fine-Tuning'
  );
  const [srvShortDesc, setSrvShortDesc] = useState(
    'Bespoke foundation model fine-tuning, domain-specific neural architectures, and low-latency GPU inference pipelines.'
  );
  const [srvValueProp, setSrvValueProp] = useState(
    'Deploy proprietary, citation-verified AI models trained on your domain telemetry with zero external data leakage.'
  );
  const [srvOverview, setSrvOverview] = useState(
    'We architect, train, quantize, and operate custom machine learning and large language models for regulated enterprises. From LoRA/QLoRA fine-tuning to dedicated vLLM/TensorRT inference clusters, our engineers deliver deterministic accuracy and predictable token economics.'
  );
  const [srvTechs, setSrvTechs] = useState(
    'PyTorch, vLLM, LoRA Fine-Tuning, ONNX Runtime, CUDA, MLflow, Qdrant'
  );
  const [srvIndustries, setSrvIndustries] = useState(
    'Healthcare & Life Sciences, Financial Services, Precision Manufacturing'
  );
  const [srvDelivery, setSrvDelivery] = useState('8–14 Weeks');
  const [srvStatus, setSrvStatus] = useState<PublishStatus>('published');
  const [srvFeatured, setSrvFeatured] = useState(true);

  // Project Form State
  const [showProjectModal, setShowProjectModal] = useState(false);
  const [projSlug, setProjSlug] = useState('');
  const [projTitle, setProjTitle] = useState('');
  const [projClient, setProjClient] = useState('');
  const [projIndustry, setProjIndustry] = useState('Financial Services');
  const [projCategory, setProjCategory] = useState('web-development');
  const [projMetric, setProjMetric] = useState('');
  const [projSummary, setProjSummary] = useState('');
  const [projChallenge, setProjChallenge] = useState('');
  const [projArch, setProjArch] = useState('');
  const [projOutcome, setProjOutcome] = useState('');
  const [projTech, setProjTech] = useState('Next.js 15, TypeScript, PostgreSQL, Kubernetes');

  // Article Form State
  const [showArticleModal, setShowArticleModal] = useState(false);
  const [artSlug, setArtSlug] = useState('');
  const [artTitle, setArtTitle] = useState('');
  const [artSubtitle, setArtSubtitle] = useState('');
  const [artExcerpt, setArtExcerpt] = useState('');
  const [artCategory, setArtCategory] = useState('Enterprise Architecture');
  const [artBody, setArtBody] = useState('');

  // Lead Management State
  const [leadStatusFilter, setLeadStatusFilter] = useState('all');
  const [selectedLead, setSelectedLead] = useState<LeadInquiry | null>(null);
  const [leadNoteInput, setLeadNoteInput] = useState('');
  const [leadAssigneeInput, setLeadAssigneeInput] = useState('');
  const [leadFollowUpInput, setLeadFollowUpInput] = useState('');

  // Redirect Form State
  const [redSource, setRedSource] = useState('/legacy-ai-service');
  const [redDest, setRedDest] = useState(
    '/services/ai-ml/custom-ai-model-development'
  );
  const [redCode, setRedCode] = useState<301 | 302>(301);

  // FAQ Form State
  const [faqQuestion, setFaqQuestion] = useState('');
  const [faqAnswer, setFaqAnswer] = useState('');

  const showNotification = (
    type: 'success' | 'error',
    message: string,
    linkUrl?: string,
    linkLabel?: string
  ) => {
    setToast({ type, message, linkUrl, linkLabel });
  };

  const fetchSnapshot = useCallback(async () => {
    try {
      const res = await fetch('/api/v1/cms');
      const json = await res.json();
      if (json.success) {
        setCms(json.data);
      }
    } catch {
      showNotification('error', 'Failed to load CMS snapshot.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchSnapshot();
  }, [fetchSnapshot]);

  // Handler: Switch RBAC Role Persona
  async function handleRoleSwitch(targetRole: AdminRole) {
    try {
      const res = await fetch('/api/v1/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ switchRole: targetRole }),
      });
      const json = await res.json();
      if (res.ok && json.success) {
        showNotification(
          'success',
          `Switched active session to ${json.data.user.name} [${targetRole.toUpperCase()}]. Server-side permissions updated.`
        );
        await fetchSnapshot();
      } else {
        showNotification('error', json.error || 'Failed to switch role.');
      }
    } catch {
      showNotification('error', 'Error switching RBAC role.');
    }
  }

  // Handler: Save / Publish Service
  async function handleSaveService(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('/api/v1/services', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          slug: srvSlug.toLowerCase().trim(),
          categorySlug: srvCategorySlug,
          name: srvName,
          shortDescription: srvShortDesc,
          valueProposition: srvValueProp,
          overview: srvOverview,
          technologies: srvTechs
            .split(',')
            .map((t) => t.trim())
            .filter(Boolean),
          suitableIndustries: srvIndustries
            .split(',')
            .map((i) => i.trim())
            .filter(Boolean),
          estimatedDelivery: srvDelivery,
          featured: srvFeatured,
          status: srvStatus,
        }),
      });
      const json = await res.json();
      if (!res.ok || !json.success) {
        showNotification(
          'error',
          json.error || 'Failed to save service (check RBAC permissions).'
        );
        return;
      }

      const liveUrl =
        srvCategorySlug === 'ai-machine-learning' &&
        srvSlug === 'custom-ai-model-development'
          ? '/services/ai-ml/custom-ai-model-development'
          : `/services/${json.data.categorySlug}/${json.data.slug}`;

      showNotification(
        'success',
        `Service "${json.data.name}" saved & ${json.data.status}! Automatically added to navigation & XML sitemap.`,
        liveUrl,
        `Open ${liveUrl} ↗`
      );
      setShowServiceModal(false);
      await fetchSnapshot();
    } catch {
      showNotification('error', 'Network error saving service.');
    }
  }

  async function handleServiceStatusChange(
    slug: string,
    status: PublishStatus
  ) {
    const res = await fetch('/api/v1/services', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ slug, status }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      showNotification('error', json.error || 'Permission denied.');
      return;
    }
    showNotification(
      'success',
      `Updated "${json.data.name}" status to [${status.toUpperCase()}].`
    );
    await fetchSnapshot();
  }

  async function handleDeleteService(slug: string) {
    const res = await fetch(
      `/api/v1/services?slug=${encodeURIComponent(slug)}`,
      {
        method: 'DELETE',
      }
    );
    const json = await res.json();
    if (!res.ok || !json.success) {
      showNotification('error', json.error || 'Delete permission denied.');
      return;
    }
    showNotification('success', `Deleted service "${slug}".`);
    await fetchSnapshot();
  }

  // Handler: Save Project Case Study
  async function handleSaveProject(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/v1/projects', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: projSlug.toLowerCase().trim(),
        title: projTitle,
        clientName: projClient,
        industry: projIndustry,
        categorySlug: projCategory,
        headlineMetric: projMetric,
        summary: projSummary,
        challenge: projChallenge,
        architectureAndApproach: projArch,
        businessOutcome: projOutcome,
        technologies: projTech
          .split(',')
          .map((t) => t.trim())
          .filter(Boolean),
        deliveryYear: '2026',
        duration: '14 Weeks',
        teamSize: '6 Senior Engineers',
        featured: true,
        status: 'published',
      }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      showNotification('error', json.error || 'Failed to save case study.');
      return;
    }
    showNotification(
      'success',
      `Published Case Study "${json.data.title}"!`,
      `/projects/${json.data.slug}`,
      'View Case Study ↗'
    );
    setShowProjectModal(false);
    await fetchSnapshot();
  }

  // Handler: Save Blog Article
  async function handleSaveArticle(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/v1/articles', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        slug: artSlug.toLowerCase().trim(),
        title: artTitle,
        subtitle: artSubtitle,
        excerpt: artExcerpt,
        category: artCategory,
        tags: [artCategory, 'Enterprise Engineering', 'Architecture'],
        authorSlug: 'marcus-vance',
        readTimeMinutes: 7,
        status: 'published',
        featured: true,
        sections: [
          {
            heading: '1. Executive Summary & Architectural Context',
            body: [artExcerpt, artBody],
          },
        ],
      }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      showNotification('error', json.error || 'Failed to save article.');
      return;
    }
    showNotification(
      'success',
      `Published Article "${json.data.title}"!`,
      `/blog/${json.data.slug}`,
      'Read Article ↗'
    );
    setShowArticleModal(false);
    await fetchSnapshot();
  }

  // Handler: Update Lead Inquiry
  async function handleUpdateLead(
    id: string,
    updates: {
      status?: LeadStatus;
      assignedTo?: string;
      followUpDate?: string;
      noteContent?: string;
    }
  ) {
    const res = await fetch('/api/v1/inquiries', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, ...updates }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      showNotification('error', json.error || 'Failed to update lead.');
      return;
    }
    showNotification(
      'success',
      `Updated lead ${json.data.referenceCode} (${json.data.companyName}).`
    );
    setSelectedLead(json.data);
    setLeadNoteInput('');
    await fetchSnapshot();
  }

  // Handler: Add SEO Redirect
  async function handleCreateRedirect(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/v1/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        entity: 'redirect',
        payload: {
          sourcePath: redSource,
          destinationPath: redDest,
          statusCode: redCode,
        },
      }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      showNotification('error', json.error || 'Failed to add redirect.');
      return;
    }
    showNotification(
      'success',
      `Created ${redCode} redirect: ${redSource} → ${redDest}`
    );
    await fetchSnapshot();
  }

  // Handler: Add FAQ
  async function handleCreateFaq(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch('/api/v1/cms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        entity: 'faq',
        payload: {
          category: 'Architecture & Engineering',
          question: faqQuestion,
          answer: faqAnswer,
        },
      }),
    });
    const json = await res.json();
    if (!res.ok || !json.success) {
      showNotification('error', json.error || 'Failed to add FAQ.');
      return;
    }
    setFaqQuestion('');
    setFaqAnswer('');
    showNotification('success', 'Published new FAQ item.');
    await fetchSnapshot();
  }

  if (loading || !cms) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center p-8">
        <div className="space-y-2 text-center">
          <p className="text-xs font-mono tabular-nums text-blue-400">
            INITIALIZING ENTERPRISE CMS WORKSPACE
          </p>
          <p className="text-sm text-slate-400">
            Verifying RBAC session &amp; hydrating database collections...
          </p>
        </div>
      </div>
    );
  }

  const filteredServices = cms.services.filter((s) => {
    const catMatch =
      serviceCatFilter === 'all' || s.categorySlug === serviceCatFilter;
    const qMatch =
      !serviceSearch.trim() ||
      s.name.toLowerCase().includes(serviceSearch.toLowerCase()) ||
      s.slug.toLowerCase().includes(serviceSearch.toLowerCase());
    return catMatch && qMatch;
  });

  const filteredLeads =
    leadStatusFilter === 'all'
      ? cms.inquiries
      : cms.inquiries.filter((i) => i.status === leadStatusFilter);

  const navItems: { id: AdminTab; label: string; icon: React.ReactNode; count?: number }[] = [
    { id: 'overview', label: 'Overview & Telemetry', icon: <LayoutDashboard className="w-4 h-4" /> },
    {
      id: 'services',
      label: 'Services & Categories',
      icon: <Layers className="w-4 h-4" />,
      count: cms.services.length,
    },
    {
      id: 'leads',
      label: 'Quote & Lead Pipeline',
      icon: <Inbox className="w-4 h-4" />,
      count: cms.inquiries.length,
    },
    {
      id: 'projects',
      label: 'Case Studies & Portfolio',
      icon: <Briefcase className="w-4 h-4" />,
      count: cms.projects.length,
    },
    {
      id: 'articles',
      label: 'Blog & Insights CMS',
      icon: <FileText className="w-4 h-4" />,
      count: cms.articles.length,
    },
    {
      id: 'company',
      label: 'Team, FAQs & Careers',
      icon: <Users className="w-4 h-4" />,
      count: cms.team.length + cms.faqs.length,
    },
    {
      id: 'media',
      label: 'Media Asset Library',
      icon: <ImageIcon className="w-4 h-4" />,
      count: cms.mediaAssets.length,
    },
    {
      id: 'seo',
      label: 'SEO, Sitemap & Redirects',
      icon: <Globe className="w-4 h-4" />,
      count: cms.redirects.length,
    },
    {
      id: 'rbac',
      label: 'RBAC Roles & Audit Logs',
      icon: <ShieldAlert className="w-4 h-4" />,
      count: cms.auditLogs.length,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col lg:flex-row">
      {/* 260px Sidebar Navigation (SaaS Dashboard Architecture) */}
      <aside className="w-full lg:w-[265px] bg-slate-950 text-slate-300 border-b lg:border-b-0 lg:border-r border-slate-800 shrink-0 flex flex-col justify-between">
        <div className="p-5 space-y-6">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <Link
                href="/"
                className="text-base font-bold text-white tracking-tight block"
              >
                Tech Solution Nepal CMS
              </Link>
              <span className="text-[11px] font-mono text-slate-400">
                Enterprise Content &amp; Lead Console
              </span>
            </div>
            <Link
              href="/"
              className="px-2.5 py-1 text-[11px] font-semibold text-slate-200 bg-slate-800 hover:bg-slate-700 rounded transition-colors whitespace-nowrap"
            >
              Public Site ↗
            </Link>
          </div>

          {/* Active RBAC Session Card */}
          <div className="p-3.5 rounded-lg bg-slate-900 border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-slate-400">Active Role:</span>
              <span className="font-mono font-bold text-blue-400 uppercase">
                {cms.session.role}
              </span>
            </div>
            <p className="font-semibold text-white truncate">
              {cms.session.name}
            </p>
            <div className="pt-1">
              <label
                htmlFor="rbac-role-select"
                className="block text-[10px] text-slate-400 mb-1"
              >
                Test RBAC Permission Enforcement:
              </label>
              <select
                id="rbac-role-select"
                value={cms.session.role}
                onChange={(e) => handleRoleSwitch(e.target.value as AdminRole)}
                className="w-full px-2 py-1 text-xs bg-slate-950 text-white border border-slate-700 rounded"
              >
                <option value="super_admin">Super Admin (Full Access)</option>
                <option value="admin">Admin (Company Management)</option>
                <option value="editor">Editor (Content &amp; Services Only)</option>
                <option value="sales">Sales / BD (Leads &amp; Quotes Only)</option>
                <option value="viewer">Viewer / Analyst (Read-Only)</option>
              </select>
            </div>
          </div>

          {/* Module Navigation */}
          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setActiveTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition-colors ${
                    active
                      ? 'bg-blue-600 text-white font-semibold'
                      : 'text-slate-400 hover:text-white hover:bg-slate-900'
                  }`}
                >
                  <span className="flex items-center gap-2.5 truncate">
                    {item.icon}
                    <span className="truncate">{item.label}</span>
                  </span>
                  {typeof item.count === 'number' && (
                    <span
                      className={`font-mono tabular-nums text-[11px] ${
                        active ? 'text-blue-100' : 'text-slate-500'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="p-5 border-t border-slate-800 text-[11px] text-slate-500 space-y-1">
          <p className="font-mono tabular-nums">API Gateway: /api/v1/*</p>
          <p>RBAC Enforced Server-Side</p>
        </div>
      </aside>

      {/* Main Content Viewport */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Contextual Header */}
        <header className="h-16 bg-white border-b border-slate-200 px-6 lg:px-8 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-2 text-xs sm:text-sm text-slate-500 truncate">
            <span className="font-semibold text-slate-900">Admin Console</span>
            <span>/</span>
            <span className="text-blue-700 font-semibold capitalize">
              {activeTab}
            </span>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setActiveTab('services');
                setShowServiceModal(true);
              }}
              className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg transition-colors whitespace-nowrap shrink-0"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Create Service Page</span>
            </button>
          </div>
        </header>

        {/* Notification Banner */}
        {toast && (
          <div
            role="status"
            className={`mx-6 lg:mx-8 mt-5 p-4 rounded-xl border flex items-center justify-between gap-4 text-xs ${
              toast.type === 'success'
                ? 'bg-emerald-50 border-emerald-200 text-emerald-900'
                : 'bg-red-50 border-red-200 text-red-900'
            }`}
          >
            <div className="flex items-center gap-2.5">
              {toast.type === 'success' ? (
                <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              ) : (
                <AlertCircle className="w-4 h-4 text-red-600 shrink-0" />
              )}
              <span className="font-medium">{toast.message}</span>
              {toast.linkUrl && (
                <Link
                  href={toast.linkUrl}
                  className="ml-2 font-bold underline text-blue-700 hover:text-blue-900"
                >
                  {toast.linkLabel || 'Open Page ↗'}
                </Link>
              )}
            </div>
            <button
              type="button"
              onClick={() => setToast(null)}
              className="text-slate-500 hover:text-slate-900 font-semibold"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Viewport Content */}
        <div className="p-6 lg:p-8 space-y-8 flex-1 overflow-y-auto">
          {/* ================================================================
              TAB 1: OVERVIEW & TELEMETRY
             ================================================================ */}
          {activeTab === 'overview' && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs text-slate-500">
                    Published Services (12 Categories)
                  </span>
                  <p className="text-3xl font-bold font-mono tabular-nums text-slate-950">
                    {cms.services.filter((s) => s.status === 'published').length}{' '}
                    <span className="text-xs font-normal text-slate-400">
                      / {cms.services.length} total
                    </span>
                  </p>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs text-slate-500">
                    Client Quote &amp; Contact Inquiries
                  </span>
                  <p className="text-3xl font-bold font-mono tabular-nums text-blue-700">
                    {cms.inquiries.length}
                  </p>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs text-slate-500">
                    Published Case Studies &amp; Articles
                  </span>
                  <p className="text-3xl font-bold font-mono tabular-nums text-slate-950">
                    {cms.projects.length + cms.articles.length}
                  </p>
                </div>

                <div className="p-5 bg-white border border-slate-200 rounded-xl space-y-1">
                  <span className="text-xs text-slate-500">
                    Security Audit Log Events
                  </span>
                  <p className="text-3xl font-bold font-mono tabular-nums text-slate-950">
                    {cms.auditLogs.length}
                  </p>
                </div>
              </div>

              {/* Dynamic Service Page Builder Demonstration Card */}
              <div className="p-6 sm:p-8 bg-slate-950 text-white rounded-xl border border-slate-800 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 space-y-3">
                  <p className="text-xs font-mono tabular-nums text-blue-400 font-semibold">
                    ADMIN-MANAGED DYNAMIC SERVICE PAGE SYSTEM
                  </p>
                  <h2 className="text-xl sm:text-2xl font-bold">
                    Create &amp; publish a new service page without modifying source code
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                    Every service created in this dashboard is validated via Zod, persisted in the database, rendered dynamically at{' '}
                    <code className="font-mono text-blue-300">
                      /services/[categorySlug]/[serviceSlug]
                    </code>
                    , and automatically injected into the Header Mega Menu, related service links, and{' '}
                    <code className="font-mono text-blue-300">/sitemap.xml</code>.
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setActiveTab('services');
                        setShowServiceModal(true);
                      }}
                      className="px-4 py-2.5 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
                    >
                      Launch Service Builder Modal
                    </button>
                    <Link
                      href="/services/ai-ml/custom-ai-model-development"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 text-xs font-semibold text-slate-200 border border-slate-700 hover:bg-slate-900 rounded-lg transition-colors"
                    >
                      <span>
                        Test /services/ai-ml/custom-ai-model-development
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>

                <div className="lg:col-span-4 p-5 bg-slate-900 border border-slate-800 rounded-xl space-y-2.5 text-xs font-mono">
                  <p className="text-slate-400">PIPELINE STATUS</p>
                  <p className="text-emerald-400">
                    1. Admin Dashboard → Configured
                  </p>
                  <p className="text-emerald-400">
                    2. REST API + Mongoose → Active
                  </p>
                  <p className="text-emerald-400">
                    3. Dynamic Route → Ready
                  </p>
                  <p className="text-emerald-400">
                    4. Sitemap &amp; Mega Menu → Synced
                  </p>
                </div>
              </div>

              {/* Recent Inquiries & Audit Trail Split */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-950">
                      Recent Client Quote &amp; Contact Inquiries
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('leads')}
                      className="text-xs font-semibold text-blue-700 hover:underline"
                    >
                      Manage Pipeline →
                    </button>
                  </div>

                  {cms.inquiries.length === 0 ? (
                    <p className="text-xs text-slate-500">
                      No inquiries visible for role [{cms.session.role}].
                    </p>
                  ) : (
                    <div className="divide-y divide-slate-200">
                      {cms.inquiries.slice(0, 4).map((inq) => (
                        <div
                          key={inq.id}
                          className="py-3 flex items-center justify-between gap-4 text-xs"
                        >
                          <div>
                            <p className="font-bold text-slate-900">
                              {inq.companyName} — {inq.fullName}
                            </p>
                            <p className="text-slate-500">
                              {inq.serviceName} · {inq.budgetRange}
                            </p>
                          </div>
                          <span className="font-mono tabular-nums text-blue-700 font-semibold uppercase">
                            {inq.status}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-bold text-slate-950">
                      Recent Security Audit Trail
                    </h3>
                    <button
                      type="button"
                      onClick={() => setActiveTab('rbac')}
                      className="text-xs font-semibold text-blue-700 hover:underline"
                    >
                      Full Audit Log →
                    </button>
                  </div>

                  <div className="divide-y divide-slate-200">
                    {cms.auditLogs.slice(0, 4).map((log) => (
                      <div key={log.id} className="py-3 space-y-1 text-xs">
                        <div className="flex items-center justify-between">
                          <span className="font-mono font-semibold text-slate-900">
                            {log.action}
                          </span>
                          <span className="font-mono tabular-nums text-slate-400">
                            {log.createdAt.slice(0, 19).replace('T', ' ')}
                          </span>
                        </div>
                        <p className="text-slate-600">{log.summary}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 2: SERVICES & CATEGORIES BUILDER
             ================================================================ */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white p-5 border border-slate-200 rounded-xl">
                <div className="flex flex-wrap items-center gap-3 flex-1">
                  <div className="relative flex-1 max-w-xs">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="search"
                      value={serviceSearch}
                      onChange={(e) => setServiceSearch(e.target.value)}
                      placeholder="Filter by title or slug..."
                      className="w-full pl-9 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <select
                    value={serviceCatFilter}
                    onChange={(e) => setServiceCatFilter(e.target.value)}
                    className="px-3 py-1.5 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                  >
                    <option value="all">
                      All 12 Categories ({cms.services.length})
                    </option>
                    {cms.categories.map((cat) => (
                      <option key={cat.id} value={cat.slug}>
                        {cat.number}. {cat.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  type="button"
                  onClick={() => setShowServiceModal(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Create New Service Page</span>
                </button>
              </div>

              {showServiceModal && (
                <form
                  onSubmit={handleSaveService}
                  className="p-6 sm:p-8 bg-white border-2 border-blue-700 rounded-xl space-y-5"
                >
                  <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                    <div>
                      <h3 className="text-lg font-bold text-slate-950">
                        Create or Edit Dynamic Service Page
                      </h3>
                      <p className="text-xs text-slate-500">
                        Publishes immediately to{' '}
                        <code className="font-mono text-blue-700">
                          /services/{srvCategorySlug}/{srvSlug}
                        </code>{' '}
                        (and alias{' '}
                        <code className="font-mono text-blue-700">
                          /services/ai-ml/{srvSlug}
                        </code>
                        )
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowServiceModal(false)}
                      className="text-xs font-semibold text-slate-500 hover:text-slate-900"
                    >
                      Close
                    </button>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        Parent Service Category *
                      </label>
                      <select
                        value={srvCategorySlug}
                        onChange={(e) => setSrvCategorySlug(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      >
                        {cms.categories.map((cat) => (
                          <option key={cat.id} value={cat.slug}>
                            {cat.number}. {cat.name} ({cat.slug})
                          </option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        URL Slug (lowercase-hyphenated) *
                      </label>
                      <input
                        type="text"
                        required
                        value={srvSlug}
                        onChange={(e) => setSrvSlug(e.target.value)}
                        className="w-full px-3 py-2 text-xs font-mono bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        Publication Status *
                      </label>
                      <select
                        value={srvStatus}
                        onChange={(e) =>
                          setSrvStatus(e.target.value as PublishStatus)
                        }
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      >
                        <option value="published">Published (Live &amp; Indexed)</option>
                        <option value="draft">Draft (Admin Preview Only)</option>
                        <option value="archived">Archived</option>
                      </select>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        Service Headline / Title *
                      </label>
                      <input
                        type="text"
                        required
                        value={srvName}
                        onChange={(e) => setSrvName(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        Estimated Delivery Range *
                      </label>
                      <input
                        type="text"
                        required
                        value={srvDelivery}
                        onChange={(e) => setSrvDelivery(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Short Summary (for Cards &amp; Meta Description) *
                    </label>
                    <input
                      type="text"
                      required
                      value={srvShortDesc}
                      onChange={(e) => setSrvShortDesc(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Hero Value Proposition *
                    </label>
                    <input
                      type="text"
                      required
                      value={srvValueProp}
                      onChange={(e) => setSrvValueProp(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-slate-800 mb-1">
                      Detailed Service Overview *
                    </label>
                    <textarea
                      rows={3}
                      required
                      value={srvOverview}
                      onChange={(e) => setSrvOverview(e.target.value)}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        Technologies (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={srvTechs}
                        onChange={(e) => setSrvTechs(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-slate-800 mb-1">
                        Suitable Industries (Comma-separated)
                      </label>
                      <input
                        type="text"
                        value={srvIndustries}
                        onChange={(e) => setSrvIndustries(e.target.value)}
                        className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-300 rounded-lg"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-3 border-t border-slate-200">
                    <label className="inline-flex items-center gap-2 text-xs text-slate-700">
                      <input
                        type="checkbox"
                        checked={srvFeatured}
                        onChange={(e) => setSrvFeatured(e.target.checked)}
                      />
                      <span>Feature on Homepage Bento Grid</span>
                    </label>

                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => setShowServiceModal(false)}
                        className="px-4 py-2 text-xs font-semibold text-slate-600 bg-slate-100 rounded-lg"
                      >
                        Cancel
                      </button>
                      <button
                        type="submit"
                        className="px-5 py-2 text-xs font-semibold text-white bg-blue-700 hover:bg-blue-800 rounded-lg"
                      >
                        Validate, Save &amp; Publish Service
                      </button>
                    </div>
                  </div>
                </form>
              )}

              {/* High-Density Services Table */}
              <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                      <th className="py-3 px-4">Service Name</th>
                      <th className="py-3 px-4">Practice Category</th>
                      <th className="py-3 px-4">URL Route</th>
                      <th className="py-3 px-4">Delivery</th>
                      <th className="py-3 px-4">Status</th>
                      <th className="py-3 px-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {filteredServices.map((srv) => (
                      <tr key={srv.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-bold text-slate-950">
                          {srv.name}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {srv.categoryName}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-500">
                          /services/{srv.categorySlug}/{srv.slug}
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums text-slate-600">
                          {srv.estimatedDelivery}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`font-mono uppercase font-semibold ${
                              srv.status === 'published'
                                ? 'text-emerald-700'
                                : srv.status === 'draft'
                                  ? 'text-amber-700'
                                  : 'text-slate-500'
                            }`}
                          >
                            {srv.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right space-x-2 whitespace-nowrap">
                          <Link
                            href={`/services/${srv.categorySlug}/${srv.slug}`}
                            className="inline-flex items-center gap-1 font-semibold text-blue-700 hover:underline"
                          >
                            <Eye className="w-3.5 h-3.5" />
                            <span>Live</span>
                          </Link>
                          <button
                            type="button"
                            onClick={() =>
                              handleServiceStatusChange(
                                srv.slug,
                                srv.status === 'published'
                                  ? 'draft'
                                  : 'published'
                              )
                            }
                            className="px-2 py-1 rounded bg-slate-100 hover:bg-slate-200 text-slate-800 font-medium"
                          >
                            {srv.status === 'published'
                              ? 'Unpublish'
                              : 'Publish'}
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDeleteService(srv.slug)}
                            aria-label={`Delete ${srv.name}`}
                            className="p-1 text-slate-400 hover:text-red-600"
                          >
                            <Trash2 className="w-3.5 h-3.5 inline" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 3: QUOTE & LEAD PIPELINE
             ================================================================ */}
          {activeTab === 'leads' && (
            <div className="space-y-6">
              {!cms.permissions.includes('leads:read') ? (
                <div className="p-12 bg-white border border-slate-200 rounded-xl text-center space-y-2">
                  <Lock className="w-6 h-6 text-red-600 mx-auto" />
                  <p className="text-sm font-bold text-slate-950">
                    Access Restricted by RBAC Policy
                  </p>
                  <p className="text-xs text-slate-500">
                    Your current role ({cms.session.role}) does not include the{' '}
                    <code className="font-mono">leads:read</code> permission. Switch to Super Admin, Admin, or Sales in the sidebar to manage leads.
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
                  <div className="lg:col-span-7 space-y-4">
                    <div className="flex flex-wrap items-center gap-1 p-1 bg-slate-200/70 rounded-lg w-fit">
                      {[
                        'all',
                        'new',
                        'reviewing',
                        'qualified',
                        'proposal_sent',
                        'won',
                      ].map((st) => (
                        <button
                          key={st}
                          type="button"
                          onClick={() => setLeadStatusFilter(st)}
                          className={`px-3 py-1.5 text-xs font-medium rounded-md uppercase transition-colors ${
                            leadStatusFilter === st
                              ? 'bg-white text-slate-900 shadow-sm'
                              : 'text-slate-600 hover:text-slate-900'
                          }`}
                        >
                          {st}
                        </button>
                      ))}
                    </div>

                    <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
                      {filteredLeads.map((lead) => (
                        <button
                          key={lead.id}
                          type="button"
                          onClick={() => {
                            setSelectedLead(lead);
                            setLeadAssigneeInput(lead.assignedTo || '');
                            setLeadFollowUpInput(lead.followUpDate || '');
                          }}
                          className={`w-full text-left p-5 hover:bg-slate-50 transition-colors space-y-2 ${
                            selectedLead?.id === lead.id ? 'bg-blue-50/50' : ''
                          }`}
                        >
                          <div className="flex items-center justify-between text-xs">
                            <span className="font-mono tabular-nums font-bold text-blue-700">
                              {lead.referenceCode}
                            </span>
                            <span className="font-mono uppercase font-semibold text-slate-700">
                              Status: {lead.status}
                            </span>
                          </div>
                          <p className="text-sm font-bold text-slate-950">
                            {lead.companyName} — {lead.fullName}
                          </p>
                          <p className="text-xs text-slate-600">
                            {lead.serviceName} · {lead.budgetRange} ·{' '}
                            {lead.timeline}
                          </p>
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Lead Detail & Triage Inspector */}
                  <div className="lg:col-span-5 bg-white border border-slate-200 rounded-xl p-6 space-y-5">
                    {selectedLead ? (
                      <>
                        <div className="border-b border-slate-200 pb-4 space-y-1">
                          <span className="text-xs font-mono tabular-nums text-blue-700 font-bold">
                            {selectedLead.referenceCode} ·{' '}
                            {selectedLead.preferredContactMethod}
                          </span>
                          <h3 className="text-lg font-bold text-slate-950">
                            {selectedLead.companyName}
                          </h3>
                          <p className="text-xs text-slate-600">
                            {selectedLead.fullName} ({selectedLead.businessEmail})
                          </p>
                        </div>

                        <div className="space-y-2 text-xs">
                          <p className="font-semibold text-slate-900">
                            Project Scope Description:
                          </p>
                          <p className="p-3 bg-slate-50 border border-slate-200 rounded-lg text-slate-700 leading-relaxed">
                            {selectedLead.projectDescription}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 text-xs">
                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">
                              Pipeline Status
                            </label>
                            <select
                              value={selectedLead.status}
                              onChange={(e) =>
                                handleUpdateLead(selectedLead.id, {
                                  status: e.target.value as LeadStatus,
                                })
                              }
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                            >
                              <option value="new">New</option>
                              <option value="reviewing">Reviewing</option>
                              <option value="qualified">Qualified</option>
                              <option value="proposal_sent">Proposal Sent</option>
                              <option value="won">Won</option>
                              <option value="archived">Archived</option>
                            </select>
                          </div>

                          <div>
                            <label className="block font-semibold text-slate-700 mb-1">
                              Assigned Architect
                            </label>
                            <select
                              value={leadAssigneeInput}
                              onChange={(e) => {
                                setLeadAssigneeInput(e.target.value);
                                handleUpdateLead(selectedLead.id, {
                                  assignedTo: e.target.value,
                                });
                              }}
                              className="w-full px-2.5 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                            >
                              <option value="Dr. Marcus Vance">
                                Dr. Marcus Vance
                              </option>
                              <option value="Elena Rostova">Elena Rostova</option>
                              <option value="Dr. Devon Keshav">
                                Dr. Devon Keshav
                              </option>
                              <option value="Kenji Takahashi">
                                Kenji Takahashi
                              </option>
                              <option value="Hannah Mercier">
                                Hannah Mercier
                              </option>
                            </select>
                          </div>
                        </div>

                        <div className="space-y-2 pt-3 border-t border-slate-200 text-xs">
                          <label className="block font-semibold text-slate-800">
                            Internal Triage Notes ({selectedLead.internalNotes.length})
                          </label>
                          <div className="space-y-2 max-h-40 overflow-y-auto">
                            {selectedLead.internalNotes.map((n) => (
                              <div
                                key={n.id}
                                className="p-2.5 bg-slate-50 border border-slate-200 rounded-lg"
                              >
                                <p className="text-slate-800">{n.content}</p>
                                <p className="text-[10px] text-slate-400 mt-1">
                                  {n.authorName} ({n.authorRole}) ·{' '}
                                  {n.createdAt.slice(0, 10)}
                                </p>
                              </div>
                            ))}
                          </div>

                          <div className="flex gap-2 pt-1">
                            <input
                              type="text"
                              value={leadNoteInput}
                              onChange={(e) => setLeadNoteInput(e.target.value)}
                              placeholder="Add internal architect or sales note..."
                              className="flex-1 px-3 py-1.5 bg-slate-50 border border-slate-300 rounded-lg"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                if (leadNoteInput.trim()) {
                                  handleUpdateLead(selectedLead.id, {
                                    noteContent: leadNoteInput,
                                    followUpDate: leadFollowUpInput || undefined,
                                  });
                                }
                              }}
                              className="px-3 py-1.5 font-semibold text-white bg-slate-900 rounded-lg"
                            >
                              Add Note
                            </button>
                          </div>
                        </div>
                      </>
                    ) : (
                      <p className="text-xs text-slate-500">
                        Select any inquiry on the left to inspect scope, assign a Principal Architect, or log internal follow-up notes.
                      </p>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* ================================================================
              TAB 4: CASE STUDIES & PORTFOLIO
             ================================================================ */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-5 border border-slate-200 rounded-xl">
                <div>
                  <h2 className="text-base font-bold text-slate-950">
                    Case Studies &amp; Production Portfolio
                  </h2>
                  <p className="text-xs text-slate-500">
                    Manage audited client case studies and quantified metrics.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowProjectModal(!showProjectModal)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add Case Study</span>
                </button>
              </div>

              {showProjectModal && (
                <form
                  onSubmit={handleSaveProject}
                  className="p-6 bg-white border-2 border-blue-700 rounded-xl space-y-4 text-xs"
                >
                  <h3 className="text-sm font-bold text-slate-950">
                    Create New Case Study
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="URL Slug (e.g. autonomous-grid-ai)"
                      value={projSlug}
                      onChange={(e) => setProjSlug(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg font-mono"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Client Organization Name"
                      value={projClient}
                      onChange={(e) => setProjClient(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Headline Metric (e.g. -65% Latency)"
                      value={projMetric}
                      onChange={(e) => setProjMetric(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Case Study Title"
                      value={projTitle}
                      onChange={(e) => setProjTitle(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Industry (e.g. Financial Services)"
                      value={projIndustry}
                      onChange={(e) => setProjIndustry(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <textarea
                    rows={2}
                    required
                    placeholder="Executive Summary (min 15 chars)"
                    value={projSummary}
                    onChange={(e) => setProjSummary(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <textarea
                    rows={2}
                    required
                    placeholder="Challenge Description (min 20 chars)"
                    value={projChallenge}
                    onChange={(e) => setProjChallenge(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <textarea
                    rows={2}
                    required
                    placeholder="Architecture & Approach (min 20 chars)"
                    value={projArch}
                    onChange={(e) => setProjArch(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <textarea
                    rows={2}
                    required
                    placeholder="Verified Business Outcome (min 20 chars)"
                    value={projOutcome}
                    onChange={(e) => setProjOutcome(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    placeholder="Technologies (comma-separated)"
                    value={projTech}
                    onChange={(e) => setProjTech(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowProjectModal(false)}
                      className="px-4 py-2 bg-slate-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg"
                    >
                      Publish Case Study
                    </button>
                  </div>
                </form>
              )}

              <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                      <th className="py-3 px-4">Case Study Title</th>
                      <th className="py-3 px-4">Client</th>
                      <th className="py-3 px-4">Industry</th>
                      <th className="py-3 px-4">Headline Metric</th>
                      <th className="py-3 px-4 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {cms.projects.map((p) => (
                      <tr key={p.id}>
                        <td className="py-3 px-4 font-bold text-slate-950">
                          {p.title}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {p.clientName}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {p.industry}
                        </td>
                        <td className="py-3 px-4 font-mono tabular-nums text-blue-700 font-semibold">
                          {p.headlineMetric}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <Link
                            href={`/projects/${p.slug}`}
                            className="font-semibold text-blue-700 hover:underline"
                          >
                            View Live ↗
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 5: BLOG & INSIGHTS CMS
             ================================================================ */}
          {activeTab === 'articles' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between bg-white p-5 border border-slate-200 rounded-xl">
                <div>
                  <h2 className="text-base font-bold text-slate-950">
                    Engineering Blog &amp; Research Monographs
                  </h2>
                  <p className="text-xs text-slate-500">
                    Author and publish technical articles with sanitized content blocks.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setShowArticleModal(!showArticleModal)}
                  className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-700 rounded-lg"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Write New Monograph</span>
                </button>
              </div>

              {showArticleModal && (
                <form
                  onSubmit={handleSaveArticle}
                  className="p-6 bg-white border-2 border-blue-700 rounded-xl space-y-4 text-xs"
                >
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <input
                      type="text"
                      required
                      placeholder="Article Slug (e.g. zero-trust-api-gateways)"
                      value={artSlug}
                      onChange={(e) => setArtSlug(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg font-mono"
                    />
                    <input
                      type="text"
                      required
                      placeholder="Category (e.g. Cybersecurity)"
                      value={artCategory}
                      onChange={(e) => setArtCategory(e.target.value)}
                      className="px-3 py-2 border border-slate-300 rounded-lg"
                    />
                  </div>
                  <input
                    type="text"
                    required
                    placeholder="Article Headline"
                    value={artTitle}
                    onChange={(e) => setArtTitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <input
                    type="text"
                    required
                    placeholder="Supporting Subtitle"
                    value={artSubtitle}
                    onChange={(e) => setArtSubtitle(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <textarea
                    rows={2}
                    required
                    placeholder="Executive Excerpt (min 15 chars)"
                    value={artExcerpt}
                    onChange={(e) => setArtExcerpt(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <textarea
                    rows={4}
                    required
                    placeholder="Technical Section Content..."
                    value={artBody}
                    onChange={(e) => setArtBody(e.target.value)}
                    className="w-full px-3 py-2 border border-slate-300 rounded-lg"
                  />
                  <div className="flex justify-end gap-2">
                    <button
                      type="button"
                      onClick={() => setShowArticleModal(false)}
                      className="px-4 py-2 bg-slate-100 rounded-lg"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg"
                    >
                      Publish Monograph
                    </button>
                  </div>
                </form>
              )}

              <div className="bg-white border border-slate-200 rounded-xl divide-y divide-slate-200">
                {cms.articles.map((art) => (
                  <div
                    key={art.id}
                    className="p-5 flex items-center justify-between gap-4 text-xs"
                  >
                    <div className="space-y-1">
                      <p className="text-slate-500">
                        {art.category} · {art.publishedAt} · By {art.authorName}
                      </p>
                      <p className="text-sm font-bold text-slate-950">
                        {art.title}
                      </p>
                    </div>
                    <Link
                      href={`/blog/${art.slug}`}
                      className="font-semibold text-blue-700 hover:underline shrink-0"
                    >
                      Read Live ↗
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 6: TEAM, FAQS & CAREERS
             ================================================================ */}
          {activeTab === 'company' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-950">
                  Add New FAQ Item
                </h3>
                <form onSubmit={handleCreateFaq} className="space-y-3 text-xs">
                  <input
                    type="text"
                    required
                    placeholder="Question..."
                    value={faqQuestion}
                    onChange={(e) => setFaqQuestion(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                  <textarea
                    rows={3}
                    required
                    placeholder="Detailed Answer..."
                    value={faqAnswer}
                    onChange={(e) => setFaqAnswer(e.target.value)}
                    className="w-full px-3 py-2 bg-slate-50 border border-slate-300 rounded-lg"
                  />
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg"
                  >
                    Publish FAQ
                  </button>
                </form>

                <div className="pt-4 border-t border-slate-200 space-y-2">
                  <p className="text-xs font-bold text-slate-800">
                    Published FAQs ({cms.faqs.length})
                  </p>
                  {cms.faqs.slice(0, 5).map((f) => (
                    <div key={f.id} className="text-xs text-slate-600">
                      • {f.question}
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-950">
                  Candidate Job Applications ({cms.jobApplications.length})
                </h3>
                <div className="divide-y divide-slate-200 text-xs">
                  {cms.jobApplications.map((app) => (
                    <div key={app.id} className="py-3 space-y-1">
                      <p className="font-bold text-slate-900">
                        {app.fullName} — {app.jobTitle}
                      </p>
                      <p className="text-slate-500">
                        {app.email} · {app.yearsExperience} yrs exp ·{' '}
                        {app.linkedinOrPortfolio}
                      </p>
                      <p className="text-slate-600">{app.coverNote}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 7: MEDIA ASSET LIBRARY
             ================================================================ */}
          {activeTab === 'media' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {cms.mediaAssets.map((asset) => (
                  <div
                    key={asset.id}
                    className="bg-white border border-slate-200 rounded-xl overflow-hidden flex flex-col justify-between"
                  >
                    <div className="aspect-[16/9] bg-slate-900">
                      <ResilientImage
                        src={asset.url}
                        alt={asset.altText}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div className="p-4 space-y-1 text-xs">
                      <p className="font-bold text-slate-950">{asset.title}</p>
                      <p className="font-mono text-[11px] text-slate-500 truncate">
                        {asset.url}
                      </p>
                      <p className="text-slate-400">
                        {asset.category} · Aspect {asset.aspectRatio}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 8: SEO, SITEMAP & REDIRECTS
             ================================================================ */}
          {activeTab === 'seo' && (
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
              <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-950">
                  Manage 301 / 302 URL Redirect Rules
                </h3>
                <form
                  onSubmit={handleCreateRedirect}
                  className="space-y-3 text-xs"
                >
                  <div className="grid grid-cols-2 gap-3">
                    <input
                      type="text"
                      required
                      value={redSource}
                      onChange={(e) => setRedSource(e.target.value)}
                      placeholder="/old-path"
                      className="px-3 py-2 border border-slate-300 rounded-lg font-mono"
                    />
                    <input
                      type="text"
                      required
                      value={redDest}
                      onChange={(e) => setRedDest(e.target.value)}
                      placeholder="/new-destination"
                      className="px-3 py-2 border border-slate-300 rounded-lg font-mono"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <select
                      value={redCode}
                      onChange={(e) =>
                        setRedCode(Number(e.target.value) as 301 | 302)
                      }
                      className="px-3 py-2 border border-slate-300 rounded-lg font-mono"
                    >
                      <option value={301}>301 Permanent Redirect</option>
                      <option value={302}>302 Temporary Redirect</option>
                    </select>
                    <button
                      type="submit"
                      className="px-4 py-2 bg-blue-700 text-white font-semibold rounded-lg"
                    >
                      Add Redirect Rule
                    </button>
                  </div>
                </form>

                <div className="divide-y divide-slate-200 pt-4 border-t border-slate-200 text-xs font-mono">
                  {cms.redirects.map((r) => (
                    <div
                      key={r.id}
                      className="py-2.5 flex items-center justify-between"
                    >
                      <span>
                        [{r.statusCode}] {r.sourcePath} → {r.destinationPath}
                      </span>
                      <span className="text-emerald-700 font-sans font-semibold">
                        Active
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="lg:col-span-6 bg-white border border-slate-200 rounded-xl p-6 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-950">
                  Indexation, XML Sitemap &amp; OpenAPI Endpoints
                </h3>
                <p className="text-slate-600 leading-relaxed">
                  Public pages are indexed with Schema.org JSON-LD (<code className="font-mono">Organization</code>, <code className="font-mono">Service</code>, <code className="font-mono">Article</code>, <code className="font-mono">FAQPage</code>). Admin and private API routes are disallowed in <code className="font-mono">/robots.txt</code>.
                </p>
                <div className="space-y-2 pt-2">
                  <Link
                    href="/sitemap.xml"
                    className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-blue-700 hover:bg-slate-100"
                  >
                    <span>/sitemap.xml (Dynamic XML Sitemap)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/robots.txt"
                    className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-blue-700 hover:bg-slate-100"
                  >
                    <span>/robots.txt (Crawler Directives)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                  <Link
                    href="/api/v1/openapi"
                    className="flex items-center justify-between p-3 bg-slate-50 border border-slate-200 rounded-lg font-mono text-blue-700 hover:bg-slate-100"
                  >
                    <span>/api/v1/openapi (OpenAPI 3.1.0 Spec)</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            </div>
          )}

          {/* ================================================================
              TAB 9: RBAC ROLES & SECURITY AUDIT LOGS
             ================================================================ */}
          {activeTab === 'rbac' && (
            <div className="space-y-6">
              <div className="bg-white border border-slate-200 rounded-xl p-6 space-y-4">
                <h3 className="text-sm font-bold text-slate-950">
                  Active Session Permissions ({cms.session.role.toUpperCase()})
                </h3>
                <p className="text-xs text-slate-600">
                  Granted scopes:{' '}
                  <span className="font-mono text-blue-700 font-semibold">
                    {cms.permissions.join(' · ')}
                  </span>
                </p>
              </div>

              <div className="bg-white border border-slate-200 rounded-xl overflow-x-auto">
                <table className="w-full text-left border-collapse text-xs">
                  <thead>
                    <tr className="border-b border-slate-200 bg-slate-50 text-slate-600 font-semibold">
                      <th className="py-3 px-4">Timestamp (UTC)</th>
                      <th className="py-3 px-4">Actor</th>
                      <th className="py-3 px-4">Role</th>
                      <th className="py-3 px-4">Action</th>
                      <th className="py-3 px-4">Resource</th>
                      <th className="py-3 px-4">Summary</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-200">
                    {cms.auditLogs.map((log) => (
                      <tr key={log.id} className="hover:bg-slate-50/80">
                        <td className="py-3 px-4 font-mono tabular-nums text-slate-500 whitespace-nowrap">
                          {log.createdAt.slice(0, 19).replace('T', ' ')}
                        </td>
                        <td className="py-3 px-4 font-semibold text-slate-900">
                          {log.actorName}
                        </td>
                        <td className="py-3 px-4 font-mono uppercase text-blue-700">
                          {log.actorRole}
                        </td>
                        <td className="py-3 px-4 font-mono font-semibold text-slate-900">
                          {log.action}
                        </td>
                        <td className="py-3 px-4 font-mono text-slate-600">
                          {log.resourceType}:{log.resourceId}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {log.summary}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
