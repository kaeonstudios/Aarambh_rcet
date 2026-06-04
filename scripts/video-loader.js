const path = require('path');

module.exports = function(content) {
  // Get relative path of the asset from the project root "src" folder
  // e.g. "src/assets/videos/hero-background.mp4" -> "/assets/videos/hero-background.mp4"
  const relativePath = path.relative(path.join(process.cwd(), 'src'), this.resourcePath);
  
  // Format as a public URL path
  const urlPath = '/' + relativePath.replace(/\\/g, '/');
  
  return `export default ${JSON.stringify(urlPath)};`;
};
