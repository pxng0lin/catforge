import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const payload = await request.json().catch(() => null);

  if (!payload) {
    return NextResponse.json({ ok: false, reason: 'Invalid JSON payload' }, { status: 400 });
  }

  // TODO: Verify Echo usage webhook signature and correlate with stored generation data
  return NextResponse.json({ ok: true });
}
