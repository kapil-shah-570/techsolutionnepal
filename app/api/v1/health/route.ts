import { NextResponse } from 'next/server';
import { getStore } from '@/lib/db/store';
import { connectToMongoIfConfigured } from '@/lib/db/mongoose-models';

export async function GET() {
  const store = getStore();
  const mongoConnected = await connectToMongoIfConfigured();

  return NextResponse.json({
    success: true,
    status: 'healthy',
    timestamp: new Date().toISOString(),
    version: '1.0.0',
    storageEngine: mongoConnected
      ? 'mongodb-atlas-mongoose+local-replica'
      : 'persistent-file-store-with-mongoose-validation',
    counts: {
      categories: store.categories.length,
      services: store.services.length,
      publishedServices: store.services.filter((s) => s.status === 'published').length,
      projects: store.projects.length,
      articles: store.articles.length,
      inquiries: store.inquiries.length,
      auditLogs: store.auditLogs.length,
    },
  });
}
