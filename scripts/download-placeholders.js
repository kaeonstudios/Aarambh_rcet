const fs = require('fs');
const path = require('path');
const https = require('https');

const assetsToDownload = [
  {
    url: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?q=80&w=800&auto=format&fit=crop',
    dest: 'src/assets/images/investor-anand.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=800&auto=format&fit=crop',
    dest: 'src/assets/images/operations-sarah.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?q=80&w=800&auto=format&fit=crop',
    dest: 'src/assets/images/mentor-vikram.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1000&auto=format&fit=crop',
    dest: 'src/assets/images/keynote-poster.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1559136555-9303baea8ebd?q=80&w=1000&auto=format&fit=crop',
    dest: 'src/assets/images/panel-poster.jpg'
  },
  {
    url: 'https://images.unsplash.com/photo-1591115765373-5207764f72e7?q=80&w=1000&auto=format&fit=crop',
    dest: 'src/assets/images/pitch-poster.jpg'
  },
  {
    url: 'https://videos.pexels.com/video-files/5992517/5992517-hd_1920_1080_30fps.mp4',
    dest: 'src/assets/videos/hero-background.mp4'
  },
  {
    url: 'https://videos.pexels.com/video-files/29641276/12753127_1920_1080_25fps.mp4',
    dest: 'src/assets/videos/conclave-highlights.mp4'
  }
];

function download(url, dest) {
  const destPath = path.resolve(dest);
  if (fs.existsSync(destPath)) {
    console.log(`Already exists: ${dest}`);
    return Promise.resolve();
  }

  // Ensure directory exists
  fs.mkdirSync(path.dirname(destPath), { recursive: true });

  return new Promise((resolve, reject) => {
    console.log(`Downloading ${url} to ${dest}...`);
    const file = fs.createWriteStream(destPath);
    
    const get = (requestUrl) => {
      https.get(requestUrl, (response) => {
        if (response.statusCode === 301 || response.statusCode === 302) {
          get(response.headers.location);
          return;
        }
        
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to get '${requestUrl}' (${response.statusCode})`));
          return;
        }

        response.pipe(file);
        
        file.on('finish', () => {
          file.close();
          console.log(`Completed: ${dest}`);
          resolve();
        });
      }).on('error', (err) => {
        fs.unlink(dest, () => {});
        reject(err);
      });
    };
    
    get(url);
  });
}

async function run() {
  for (const item of assetsToDownload) {
    try {
      await download(item.url, item.dest);
    } catch (e) {
      console.error(`Error downloading ${item.dest}:`, e.message);
    }
  }
  console.log('All downloads finished.');
}

run();
