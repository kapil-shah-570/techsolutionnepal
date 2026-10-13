import { MetadataRoute } from 'next';
import { getStore } from '@/lib/db/store';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.APP_URL || 'https://techsolutionnepal.com';
  const settings = getStore().siteSettings;

  return {
    rules: [
      {
        userAgent: '*',
        allow: settings.seoDefaults.robotsAllowPublic ? '/' : '',
        disallow: settings.seoDefaults.disallowPaths,
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
