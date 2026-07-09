import fs from 'fs';
import path from 'path';
import sharp from 'sharp';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from 'ffmpeg-static';

ffmpeg.setFfmpegPath(ffmpegPath);

const IMAGES_DIR = path.join(process.cwd(), 'public', 'assets', 'images');
const VIDEOS_DIR = path.join(process.cwd(), 'public', 'assets', 'videos');

async function optimizeImages(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await optimizeImages(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png', '.webp', '.avif'].includes(ext)) {
        console.log(`Optimizing image: ${fullPath}`);
        const tempPath = fullPath + '.tmp';
        
        try {
          const image = sharp(fullPath);
          const metadata = await image.metadata();
          
          let pipeline = image;
          
          // Resize if width is larger than 1920
          if (metadata.width && metadata.width > 1920) {
            pipeline = pipeline.resize({ width: 1920, withoutEnlargement: true });
          }
          
          // Compress based on format
          if (ext === '.jpg' || ext === '.jpeg') {
            pipeline = pipeline.jpeg({ quality: 80, progressive: true });
          } else if (ext === '.png') {
            pipeline = pipeline.png({ quality: 80, compressionLevel: 8 });
          } else if (ext === '.webp') {
            pipeline = pipeline.webp({ quality: 80 });
          } else if (ext === '.avif') {
            pipeline = pipeline.avif({ quality: 80 });
          }
          
          await pipeline.toFile(tempPath);
          fs.renameSync(tempPath, fullPath);
          console.log(`  -> Done: ${file}`);
        } catch (err) {
          console.error(`  -> Failed to optimize ${file}:`, err.message);
          if (fs.existsSync(tempPath)) {
            fs.unlinkSync(tempPath);
          }
        }
      }
    }
  }
}

async function optimizeVideos(dir) {
  const files = fs.readdirSync(dir);
  
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    
    if (stat.isDirectory()) {
      await optimizeVideos(fullPath);
    } else {
      const ext = path.extname(file).toLowerCase();
      // We process MP4s to ensure faststart. 
      if (['.mp4', '.mov'].includes(ext)) {
        console.log(`Optimizing video: ${fullPath}`);
        const tempPath = fullPath + '.tmp.mp4';
        
        await new Promise((resolve, reject) => {
          ffmpeg(fullPath)
            .outputOptions([
              '-c copy',
              '-movflags +faststart',
              '-y'
            ])
            .save(tempPath)
            .on('end', () => {
              fs.renameSync(tempPath, fullPath);
              console.log(`  -> Done: ${file}`);
              resolve();
            })
            .on('error', (err) => {
              console.error(`  -> Failed to optimize ${file}:`, err.message);
              if (fs.existsSync(tempPath)) {
                fs.unlinkSync(tempPath);
              }
              resolve(); // Don't crash the whole process
            });
        });
      }
    }
  }
}

async function main() {
  console.log('Starting media optimization...');
  if (fs.existsSync(IMAGES_DIR)) {
    console.log('\n--- Optimizing Images ---');
    await optimizeImages(IMAGES_DIR);
  }
  
  if (fs.existsSync(VIDEOS_DIR)) {
    console.log('\n--- Optimizing Videos ---');
    await optimizeVideos(VIDEOS_DIR);
  }
  
  console.log('\nOptimization complete!');
}

main().catch(console.error);
