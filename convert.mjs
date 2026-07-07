import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

console.log('Using ffmpeg path:', ffmpegPath);
ffmpeg.setFfmpegPath(ffmpegPath);

console.log('Starting conversion...');
ffmpeg('public/assets/videos/video1.MOV')
  .outputOptions([
    '-c:v libx264',
    '-preset fast',
    '-crf 23',
    '-pix_fmt yuv420p',
    '-profile:v main',
    '-c:a aac',
    '-b:a 128k',
    '-movflags +faststart',
    '-y'
  ])
  .save('public/assets/videos/video1.mp4')
  .on('progress', (progress) => {
    if (progress.percent) {
      console.log(`Processing: ${Math.floor(progress.percent)}% done`);
    } else {
      console.log(`Processing...`);
    }
  })
  .on('end', () => console.log('Finished processing successfully!'))
  .on('error', (err) => console.error('Error:', err));
