import { NextRequest, NextResponse } from 'next/server';
import { globalSearch } from '@/lib/db/store';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const q = searchParams.get('q') || '';
  const typeFilter = searchParams.get('type') || 'all';

  let results = globalSearch(q);
  if (typeFilter && typeFilter !== 'all') {
    results = results.filter(
      (r) => r.type.toLowerCase() === typeFilter.toLowerCase()
    );
  }

  return NextResponse.json({
    success: true,
    query: q,
    count: results.length,
    data: results,
  });
}
