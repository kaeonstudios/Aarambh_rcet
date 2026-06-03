const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '..', 'src', 'assets');
const destDir = path.join(__dirname, '..', 'public', 'assets');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    fs.mkdirSync(src, { recursive: true });
  }
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  
  const entries = fs.readdirSync(src, { withFileTypes: true });
  
  for (let entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      let shouldCopy = true;
      if (fs.existsSync(destPath)) {
        const srcStat = fs.statSync(srcPath);
        const destStat = fs.statSync(destPath);
        if (srcStat.mtime <= destStat.mtime) {
          shouldCopy = false;
        }
      }
      if (shouldCopy) {
        fs.copyFileSync(srcPath, destPath);
        console.log(`Synced: ${entry.name}`);
      }
    }
  }
}

// Ensure the src/assets and subdirectories exist
const subDirs = ['images', 'videos'];
subDirs.forEach(sub => {
  const dir = path.join(srcDir, sub);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    // Write a README placeholder in src/assets/images and src/assets/videos
    fs.writeFileSync(
      path.join(dir, 'README.md'),
      `# Local ${sub} folder\n\nPlace your local ${sub} here. They will be synchronized to public/assets/${sub} automatically at build and startup.`
    );
  }
});

copyDir(srcDir, destDir);
console.log('Assets sync completed successfully.');
