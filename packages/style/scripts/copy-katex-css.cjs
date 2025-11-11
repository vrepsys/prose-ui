const fs = require('fs')
const path = require('path')

const DIST_DIR = path.join(__dirname, '..', 'dist')

function ensureDir(dir) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

function copyDir(src, dest) {
  ensureDir(dest)
  const entries = fs.readdirSync(src, { withFileTypes: true })
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)
    if (entry.isDirectory()) {
      copyDir(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}

function copyKatexAssets(katexDistPath) {
  ensureDir(DIST_DIR)

  const cssPath = path.join(katexDistPath, 'katex.min.css')
  if (fs.existsSync(cssPath)) {
    const outputCssPath = path.join(DIST_DIR, 'katex.min.css')
    fs.copyFileSync(cssPath, outputCssPath)
    console.log(`Copied katex.min.css to ${outputCssPath}`)
  }

  const fontsSrcPath = path.join(katexDistPath, 'fonts')
  if (fs.existsSync(fontsSrcPath)) {
    const fontsDestPath = path.join(DIST_DIR, 'fonts')
    copyDir(fontsSrcPath, fontsDestPath)
    console.log(`Copied fonts to ${fontsDestPath}`)
  }
}

try {
  const katexPackagePath = require.resolve('katex/package.json')
  const katexDistPath = path.join(path.dirname(katexPackagePath), 'dist')

  if (fs.existsSync(katexDistPath)) {
    copyKatexAssets(katexDistPath)
    process.exit(0)
  }
} catch (err) {
  console.error('Error: Could not find katex package:', err.message)
  process.exit(1)
}

console.error('Error: Could not find katex assets')
process.exit(1)
