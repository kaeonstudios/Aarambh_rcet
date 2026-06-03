import { NextResponse } from 'next/server';
import { connectDB } from '@/lib/mongodb';
import Application from '@/models/Application';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    await connectDB();

    // 1. Total applications
    const totalApplications = await Application.countDocuments();

    // 2. Applications per stage
    const applicationsPerStageRaw = await Application.aggregate([
      {
        $group: {
          _id: '$stage',
          count: { $sum: 1 },
        },
      },
    ]);
    
    const applicationsPerStage = applicationsPerStageRaw.map((item) => ({
      stage: item._id,
      count: item.count,
    }));

    // 3. Recent submissions (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

    const recentSubmissions = await Application.countDocuments({
      created_at: { $gte: sevenDaysAgo },
    });

    return NextResponse.json({
      data: {
        totalApplications,
        applicationsPerStage,
        recentSubmissions,
      },
    }, { status: 200 });
  } catch (error) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
