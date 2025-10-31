const fs = require('fs');
const path = require('path');

function copyDir(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }
  const entries = fs.readdirSync(src, { withFileTypes: true });
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  }
}

function copyKatexAssets(katexDistPath) {
  // Copy CSS
  const cssPath = path.join(katexDistPath, 'katex.min.css');
  if (fs.existsSync(cssPath)) {
    const outputCssPath = path.join(__dirname, '..', 'katex.min.css');
    fs.copyFileSync(cssPath, outputCssPath);
    console.log(`Copied katex.min.css to ${outputCssPath}`);
  }

  // Copy fonts
  const fontsSrcPath = path.join(katexDistPath, 'fonts');
  if (fs.existsSync(fontsSrcPath)) {
    const fontsDestPath = path.join(__dirname, '..', 'fonts');
    copyDir(fontsSrcPath, fontsDestPath);
    console.log(`Copied fonts to ${fontsDestPath}`);
  }
}

// Try to find katex through react-katex's dependency
try {
  const reactKatexPath = require.resolve('react-katex/package.json');
  const katexDistPath = path.join(path.dirname(reactKatexPath), '..', 'katex', 'dist');
  
  if (fs.existsSync(katexDistPath)) {
    copyKatexAssets(katexDistPath);
    process.exit(0);
  }
} catch (err) {
  // Fall through to fallback
}

// Fallback: search in pnpm store
try {
  const { execSync } = require('child_process');
  const findPath = execSync(
    'find ../../node_modules/.pnpm -path "*katex*/node_modules/katex/dist/katex.min.css" -type f 2>/dev/null | head -1',
    { encoding: 'utf8', cwd: __dirname }
  ).trim();
  
  if (findPath) {
    const katexDistPath = path.dirname(findPath);
    copyKatexAssets(katexDistPath);
    process.exit(0);
  }
} catch (err) {
  // Ignore
}

console.error('Error: Could not find katex assets');
process.exit(1);

