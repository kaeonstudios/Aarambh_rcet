import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Application from '@/models/Application';
import { appendToGoogleSheet } from '@/lib/sheets';

// ── POST: Submit a new application ─────────────────────────────────────────
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Basic validation
    const required = ['startup_name', 'team_head', 'phone', 'description', 'stage'];
    for (const field of required) {
      if (!body[field]) {
        return NextResponse.json({ error: `Missing field: ${field}` }, { status: 400 });
      }
    }

    await connectDB();

    const application = await Application.create({
      startup_name:     body.startup_name,
      team_head:        body.team_head,
      phone:            body.phone,
      member_count:     body.members?.length ?? 1,
      members:          body.members ?? [],
      description:      body.description,
      stage:            body.stage,
      linkedin_url:     body.linkedin_url  || undefined,
      website_url:      body.website_url   || undefined,
      pitch_video_url:  body.pitch_video_url || undefined,
      pitch_video_path: body.pitch_video_path || undefined,
      starred:          false,
    });

    // Sync to Google Sheets (non-blocking, non-fatal)
    // TODO: Set GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL, GOOGLE_PRIVATE_KEY in .env
    appendToGoogleSheet({
      startup_name:    application.startup_name,
      team_head:       application.team_head,
      phone:           application.phone,
      stage:           application.stage,
      description:     application.description,
      linkedin_url:    application.linkedin_url,
      website_url:     application.website_url,
      pitch_video_url: application.pitch_video_url,
      created_at:      application.created_at,
    });

    return NextResponse.json(
      { message: 'Application submitted successfully', data: application },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting application:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}

// ── GET: Fetch all applications (admin only, guarded by middleware) ─────────
export async function GET() {
  try {
    await connectDB();

    const applications = await Application.find({})
      .sort({ created_at: -1 })
      .lean();

    return NextResponse.json({ data: applications }, { status: 200 });
  } catch (error: any) {
    const isDbError =
      error?.message?.includes('connect') ||
      error?.message?.includes('ECONNREFUSED') ||
      error?.message?.includes('MONGODB_URI');

    if (isDbError) {
      console.warn('[Admin] MongoDB not connected — returning empty list.');
      return NextResponse.json({ data: [] }, { status: 200 });
    }

    console.error('Error fetching applications:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
