import { MetadataRoute } from 'next';
import {
  getPublishedCategories,
  getServices,
  getProjects,
  getArticles,
  getTeamMembers,
  getJobs,
} from '@/lib/db/store';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.APP_URL || 'https://techsolutionnepal.com';
  const now = new Date();

  const staticRoutes = [
    '',
    '/about',
    '/our-story',
    '/mission-vision',
    '/team',
    '/services',
    '/industries',
    '/process',
    '/projects',
    '/case-studies',
    '/testimonials',
    '/blog',
    '/careers',
    '/contact',
    '/quote',
    '/faqs',
    '/search',
    '/privacy',
    '/terms',
    '/cookies',
    '/accessibility',
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: route === '' ? 1.0 : 0.8,
  }));

  const categoryRoutes = getPublishedCategories().map((cat) => ({
    url: `${baseUrl}/services/${cat.slug}`,
    lastModified: new Date(cat.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.9,
  }));

  const serviceRoutes = getServices().map((srv) => ({
    url: `${baseUrl}/services/${srv.categorySlug}/${srv.slug}`,
    lastModified: new Date(srv.updatedAt),
    changeFrequency: 'weekly' as const,
    priority: 0.85,
  }));

  const projectRoutes = getProjects().map((proj) => ({
    url: `${baseUrl}/projects/${proj.slug}`,
    lastModified: new Date(proj.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));

  const articleRoutes = getArticles().map((art) => ({
    url: `${baseUrl}/blog/${art.slug}`,
    lastModified: new Date(art.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.75,
  }));

  const teamRoutes = getTeamMembers().map((member) => ({
    url: `${baseUrl}/team/${member.slug}`,
    lastModified: now,
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  const careerRoutes = getJobs().map((job) => ({
    url: `${baseUrl}/careers/${job.slug}`,
    lastModified: now,
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }));

  return [
    ...staticRoutes,
    ...categoryRoutes,
    ...serviceRoutes,
    ...projectRoutes,
    ...articleRoutes,
    ...teamRoutes,
    ...careerRoutes,
  ];
}
