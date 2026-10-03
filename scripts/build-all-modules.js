const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const rootDir = path.resolve(__dirname, '..');
const publicDir = path.join(rootDir, 'product-shell', 'public');

const modules = [
  { name: 'module02', dir: 'module2-frontend' },
  { name: 'module03', dir: 'module3-anomaly' },
  { name: 'module04', dir: 'module4-footprint' },
  { name: 'module05', dir: 'module5-trajectory' },
  { name: 'module06', dir: 'module6-probability' },
  { name: 'module07', dir: 'module7-downscaling' },
  { name: 'module08', dir: 'module8-extreme-comparison' },
  { name: 'module09', dir: 'module9-crop-exposure' },
  { name: 'module10', dir: 'module10-growth-stage' },
  { name: 'module11', dir: 'module11-water-soil' },
  { name: 'module12', dir: 'module12-crop-scenario' },
  { name: 'module13', dir: 'module13-yield-risk' },
  { name: 'module14', dir: 'module14-pest-disease' },
  { name: 'module15', dir: 'module15-market-intelligence' },
  { name: 'module16', dir: 'module16-weather-crop-supply-market' },
  { name: 'module17', dir: 'module17-supply-shock' },
  { name: 'module18', dir: 'module18-scenario-simulator' },
  { name: 'module19', dir: 'module19-landing' }
];

function patchNextConfig(configPath, basePathStr) {
  if (!fs.existsSync(configPath)) return false;
  let content = fs.readFileSync(configPath, 'utf8');
  
  if (!content.includes('output:')) {
    content = content.replace(/reactStrictMode:\s*(true|false),/, `reactStrictMode: true,\n  output: 'export',\n  basePath: '${basePathStr}',`);
  }
  
  if (!content.includes('output:')) {
     content = content.replace(/(const nextConfig[^=]*= {)/, `$1\n  output: 'export',\n  basePath: '${basePathStr}',`);
  }

  fs.writeFileSync(configPath, content);
  return true;
}

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir, { recursive: true });
}

for (const mod of modules) {
  const modDir = path.join(rootDir, mod.dir);
  if (!fs.existsSync(modDir)) continue;
  
  console.log(`\n--- Building ${mod.name} in ${mod.dir} ---`);
  
  // Patch config
  const configs = ['next.config.js', 'next.config.ts', 'next.config.mjs'];
  for (const c of configs) {
    patchNextConfig(path.join(modDir, c), `/${mod.name}`);
  }
  
  try {
    execSync('npm install', { stdio: 'inherit', cwd: modDir });
    execSync('npm run build', { stdio: 'inherit', cwd: modDir });
    
    // Copy out to public
    const outDir = path.join(modDir, 'out');
    const targetDir = path.join(publicDir, mod.name);
    if (fs.existsSync(outDir)) {
      if (fs.existsSync(targetDir)) {
        fs.rmSync(targetDir, { recursive: true, force: true });
      }
      fs.cpSync(outDir, targetDir, { recursive: true });
      console.log(`✅ Successfully built and exported ${mod.name}`);
    } else {
      console.warn(`⚠️ No out/ directory found for ${mod.name}`);
    }
  } catch (err) {
    console.error(`❌ Failed to build ${mod.name}`);
  }
}
console.log('\nAll modules built successfully.');
