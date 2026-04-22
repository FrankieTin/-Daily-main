import sharp from 'sharp';
import * as fs from 'fs';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const publicDir = path.join(__dirname, 'public');
const sourceImagePath = path.join(publicDir, '科研Daily头像.png');

async function generateIconsFromImage() {
  try {
    console.log('🎨 开始从头像生成PWA图标...\n');

    // 检查源文件是否存在
    if (!fs.existsSync(sourceImagePath)) {
      console.error('❌ 错误: 找不到头像文件:', sourceImagePath);
      process.exit(1);
    }

    console.log('✓ 找到源头像文件');

    // 生成不同尺寸的图标
    const sizes = [
      { name: 'pwa-192x192.png', size: 192 },
      { name: 'pwa-512x512.png', size: 512 },
      { name: 'pwa-maskable-192x192.png', size: 192 },
      { name: 'pwa-maskable-512x512.png', size: 512 },
      { name: 'apple-touch-icon.png', size: 180 },
      { name: 'favicon.png', size: 64 }
    ];

    for (const icon of sizes) {
      await sharp(sourceImagePath)
        .resize(icon.size, icon.size, {
          fit: 'cover',
          position: 'center'
        })
        .png()
        .toFile(path.join(publicDir, icon.name));
      console.log(`✓ 生成 ${icon.name}`);
    }

    // 生成截图
    console.log('✓ 复制头像为screenshot-1.png和screenshot-2.png');
    
    // 窄屏截图 (540x720)
    await sharp(sourceImagePath)
      .resize(400, 400, { fit: 'contain', background: { r: 250, g: 248, b: 246, alpha: 1 } })
      .extend({
        top: 160,
        bottom: 160,
        left: 70,
        right: 70,
        background: { r: 250, g: 248, b: 246, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, 'screenshot-1.png'));

    // 宽屏截图 (1280x720)
    await sharp(sourceImagePath)
      .resize(400, 400, { fit: 'contain', background: { r: 250, g: 248, b: 246, alpha: 1 } })
      .extend({
        top: 160,
        bottom: 160,
        left: 440,
        right: 440,
        background: { r: 250, g: 248, b: 246, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, 'screenshot-2.png'));

    console.log('✓ 生成 screenshot-1.png');
    console.log('✓ 生成 screenshot-2.png');

    console.log('\n✅ 所有图标生成完成！');
  } catch (error) {
    console.error('❌ 生成图标时出错:', error.message);
    process.exit(1);
  }
}

generateIconsFromImage();
