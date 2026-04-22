import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');

// SVG icon base
const createSvgIcon = (size = 512) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4A665A;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d4a3f;stop-opacity:1" />
    </linearGradient>
  </defs>
  <rect width="${size}" height="${size}" fill="url(#grad1)"/>
  <g transform="translate(${size/2}, ${size/2})">
    <!-- Book pages -->
    <g fill="#FAF8F6">
      <path d="M -${size*0.3} -${size*0.25} L -${size*0.3} ${size*0.25} L -${size*0.08} ${size*0.25} L -${size*0.08} -${size*0.25} Z" stroke="#FAF8F6" stroke-width="${size*0.04}"/>
      <path d="M ${size*0.08} -${size*0.25} L ${size*0.08} ${size*0.25} L ${size*0.3} ${size*0.25} L ${size*0.3} -${size*0.25} Z" stroke="#FAF8F6" stroke-width="${size*0.04}"/>
    </g>
    <!-- Checkmark -->
    <path d="M ${size*0.08} ${size*0.1} L ${size*0.15} ${size*0.2} L ${size*0.3} -${size*0.05}" fill="none" stroke="#A8D5BA" stroke-width="${size*0.05}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

// SVG maskable icon (with circular background)
const createMaskableSvgIcon = (size = 512) => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}">
  <defs>
    <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#4A665A;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#2d4a3f;stop-opacity:1" />
    </linearGradient>
  </defs>
  <circle cx="${size/2}" cy="${size/2}" r="${size*0.45}" fill="url(#grad2)"/>
  <g transform="translate(${size/2}, ${size/2})">
    <!-- Book pages -->
    <g fill="#FAF8F6">
      <path d="M -${size*0.22} -${size*0.18} L -${size*0.22} ${size*0.18} L -${size*0.06} ${size*0.18} L -${size*0.06} -${size*0.18} Z" stroke="#FAF8F6" stroke-width="${size*0.03}"/>
      <path d="M ${size*0.06} -${size*0.18} L ${size*0.06} ${size*0.18} L ${size*0.22} ${size*0.18} L ${size*0.22} -${size*0.18} Z" stroke="#FAF8F6" stroke-width="${size*0.03}"/>
    </g>
    <!-- Checkmark -->
    <path d="M ${size*0.06} ${size*0.08} L ${size*0.12} ${size*0.15} L ${size*0.22} -${size*0.04}" fill="none" stroke="#A8D5BA" stroke-width="${size*0.04}" stroke-linecap="round" stroke-linejoin="round"/>
  </g>
</svg>`;

// Screenshot SVGs
const createScreenshot1 = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 540 720">
  <rect width="540" height="720" fill="#FAF8F6"/>
  <g fill="#4A665A" opacity="0.08">
    <rect x="20" y="80" width="500" height="100" rx="12"/>
    <rect x="20" y="200" width="500" height="120" rx="12"/>
    <rect x="20" y="340" width="500" height="120" rx="12"/>
    <rect x="20" y="480" width="500" height="120" rx="12"/>
  </g>
  <text x="270" y="420" font-size="52" font-weight="bold" fill="#4A665A" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Sci-Daily</text>
  <text x="270" y="480" font-size="24" fill="#4A665A" text-anchor="middle" opacity="0.6" font-family="system-ui, -apple-system, sans-serif">研究与生活记录</text>
</svg>`;

const createScreenshot2 = () => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1280 720">
  <rect width="1280" height="720" fill="#FAF8F6"/>
  <g fill="#4A665A" opacity="0.08">
    <rect x="40" y="80" width="580" height="200" rx="12"/>
    <rect x="660" y="80" width="580" height="200" rx="12"/>
    <rect x="40" y="300" width="580" height="200" rx="12"/>
    <rect x="660" y="300" width="580" height="200" rx="12"/>
  </g>
  <text x="640" y="420" font-size="72" font-weight="bold" fill="#4A665A" text-anchor="middle" font-family="system-ui, -apple-system, sans-serif">Sci-Daily</text>
  <text x="640" y="490" font-size="32" fill="#4A665A" text-anchor="middle" opacity="0.6" font-family="system-ui, -apple-system, sans-serif">研究与生活记录应用</text>
</svg>`;

async function generateIcons() {
  try {
    console.log('🎨 开始生成PWA图标...\n');

    // Generate 192x192 PNG
    await sharp(Buffer.from(createSvgIcon(512)))
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'pwa-192x192.png'));
    console.log('✓ 生成 pwa-192x192.png');

    // Generate 512x512 PNG
    await sharp(Buffer.from(createSvgIcon(512)))
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'pwa-512x512.png'));
    console.log('✓ 生成 pwa-512x512.png');

    // Generate maskable 192x192 PNG
    await sharp(Buffer.from(createMaskableSvgIcon(512)))
      .resize(192, 192)
      .png()
      .toFile(path.join(publicDir, 'pwa-maskable-192x192.png'));
    console.log('✓ 生成 pwa-maskable-192x192.png');

    // Generate maskable 512x512 PNG
    await sharp(Buffer.from(createMaskableSvgIcon(512)))
      .resize(512, 512)
      .png()
      .toFile(path.join(publicDir, 'pwa-maskable-512x512.png'));
    console.log('✓ 生成 pwa-maskable-512x512.png');

    // Generate screenshots
    await sharp(Buffer.from(createScreenshot1()))
      .png()
      .toFile(path.join(publicDir, 'screenshot-1.png'));
    console.log('✓ 生成 screenshot-1.png');

    await sharp(Buffer.from(createScreenshot2()))
      .png()
      .toFile(path.join(publicDir, 'screenshot-2.png'));
    console.log('✓ 生成 screenshot-2.png');

    // Generate Apple touch icon
    await sharp(Buffer.from(createSvgIcon(512)))
      .resize(180, 180)
      .png()
      .toFile(path.join(publicDir, 'apple-touch-icon.png'));
    console.log('✓ 生成 apple-touch-icon.png');

    // Generate favicon
    await sharp(Buffer.from(createSvgIcon(512)))
      .resize(64, 64)
      .png()
      .toFile(path.join(publicDir, 'favicon.png'));
    console.log('✓ 生成 favicon.png');

    console.log('\n✅ 所有PWA图标生成完成！');
  } catch (error) {
    console.error('❌ 生成图标时出错:', error.message);
    process.exit(1);
  }
}

generateIcons();
