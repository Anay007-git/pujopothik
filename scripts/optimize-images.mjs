import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const dir = path.resolve(process.cwd(), 'public/images');
const files = fs.readdirSync(dir);

console.log(`Analyzing ${files.length} images in ${dir}...`);

let totalOriginalBytes = 0;
let totalOptimizedBytes = 0;

for (const file of files) {
  if (!file.match(/\.(jpe?g|png)$/i)) continue;
  const filePath = path.join(dir, file);
  const stats = fs.statSync(filePath);
  totalOriginalBytes += stats.size;

  try {
    const inputBuffer = fs.readFileSync(filePath);
    const metadata = await sharp(inputBuffer).metadata();
    const needsResize = metadata.width && metadata.width > 1200;
    const isLarge = stats.size > 250 * 1024; // > 250 KB

    if (needsResize || isLarge) {
      let pipeline = sharp(inputBuffer, { failOnError: false });
      if (needsResize) {
        pipeline = pipeline.resize({ width: 1200, withoutEnlargement: true });
      }
      
      const buffer = await pipeline
        .jpeg({ quality: 80, mozjpeg: false })
        .toBuffer();

      if (buffer.length < stats.size) {
        fs.writeFileSync(filePath, buffer);
        totalOptimizedBytes += buffer.length;
        const savedPercent = Math.round((1 - buffer.length / stats.size) * 100);
        console.log(`✓ Optimized ${file}: ${(stats.size / 1024 / 1024).toFixed(2)} MB -> ${(buffer.length / 1024).toFixed(1)} KB (-${savedPercent}%)`);
      } else {
        totalOptimizedBytes += stats.size;
        console.log(`- Kept ${file}: ${(stats.size / 1024).toFixed(1)} KB`);
      }
    } else {
      totalOptimizedBytes += stats.size;
      console.log(`- Skipped ${file}: ${(stats.size / 1024).toFixed(1)} KB (already optimal)`);
    }
  } catch (err) {
    console.error(`Error optimizing ${file}:`, err.message);
    totalOptimizedBytes += stats.size;
  }
}

const origMB = (totalOriginalBytes / 1024 / 1024).toFixed(2);
const optMB = (totalOptimizedBytes / 1024 / 1024).toFixed(2);
const totalSavedPercent = Math.round((1 - totalOptimizedBytes / totalOriginalBytes) * 100);

console.log('\n===========================================');
console.log(`TOTAL BEFORE: ${origMB} MB`);
console.log(`TOTAL AFTER:  ${optMB} MB`);
console.log(`REDUCTION:    -${totalSavedPercent}% (${(origMB - optMB).toFixed(2)} MB saved!)`);
console.log('===========================================');

