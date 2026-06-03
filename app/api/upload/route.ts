import { NextResponse } from 'next/server';

// TODO: Configure storage bucket (Supabase Storage / Cloudinary / AWS S3)

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;

    if (!file) {
      return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
    }

    // Size validation: 100MB max
    const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds the 100MB limit' },
        { status: 400 }
      );
    }

    // Allowed mime types (video)
    if (!file.type.startsWith('video/')) {
      return NextResponse.json(
        { error: 'Invalid file type. Only videos are allowed.' },
        { status: 400 }
      );
    }

    // // TODO: Implement actual upload logic here
    // Example:
    // const buffer = Buffer.from(await file.arrayBuffer());
    // const uploadResult = await supabase.storage
    //   .from('pitch-videos')
    //   .upload(`public/${Date.now()}_${file.name}`, buffer);
    //
    // const fileUrl = supabase.storage.from('pitch-videos').getPublicUrl(uploadResult.data.path).data.publicUrl;

    // Mock response
    const fileUrl = 'https://example.com/mock-video-url.mp4';
    const filePath = `mock-path/${file.name}`;

    return NextResponse.json(
      { 
        message: 'File uploaded successfully', 
        data: { url: fileUrl, path: filePath } 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error handling file upload:', error);
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}
