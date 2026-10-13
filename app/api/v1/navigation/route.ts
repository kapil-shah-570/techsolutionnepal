import { NextResponse } from 'next/server';
import { getPublishedCategories, getServices, getStore } from '@/lib/db/store';

export async function GET() {
  const categories = getPublishedCategories();
  const services = getServices();
  const settings = getStore().siteSettings;

  const menuGroups = categories.map((cat) => ({
    id: cat.id,
    number: cat.number,
    name: cat.name,
    slug: cat.slug,
    items: services
      .filter((s) => s.categorySlug === cat.slug)
      .map((s) => ({
        id: s.id,
        name: s.name,
        slug: s.slug,
        estimatedDelivery: s.estimatedDelivery,
      })),
  }));

  return NextResponse.json({
    success: true,
    data: {
      companyName: settings.companyName,
      menuGroups,
      totalCategories: categories.length,
      totalPublishedServices: services.length,
    },
  });
}
