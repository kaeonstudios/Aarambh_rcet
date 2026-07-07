import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegPath);

const src = 'public/assets/videos/video1.MOV';

console.log('Generating 720p MP4...');
ffmpeg(src)
  .outputOptions([
    '-vf scale=-2:720',
    '-c:v libx264',
    '-preset veryfast',
    '-crf 28',
    '-pix_fmt yuv420p',
    '-profile:v main',
    '-c:a aac',
    '-b:a 128k',
    '-movflags +faststart',
    '-y'
  ])
  .save('public/assets/videos/video1-720p.mp4')
  .on('end', () => {
    console.log('720p MP4 completed.');
    console.log('Generating 480p MP4...');
    ffmpeg(src)
      .outputOptions([
        '-vf scale=-2:480',
        '-c:v libx264',
        '-preset veryfast',
        '-crf 28',
        '-pix_fmt yuv420p',
        '-profile:v main',
        '-c:a aac',
        '-b:a 96k',
        '-movflags +faststart',
        '-y'
      ])
      .save('public/assets/videos/video1-480p.mp4')
      .on('end', () => console.log('480p MP4 completed. Optimization finished!'))
      .on('error', err => console.log('Error:', err));
  })
  .on('error', err => console.log('Error:', err));
