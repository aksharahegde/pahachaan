import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const publicDir = join(dirname(fileURLToPath(import.meta.url)), "../public");
const svg = readFileSync(join(publicDir, "logo.svg"));

const sizes = [16, 32, 48, 72, 96, 128, 144, 152, 192, 384, 512];

for (const size of sizes) {
  const output = join(publicDir, `icon-${size}x${size}.png`);
  await sharp(svg).resize(size, size).png().toFile(output);

  if (size === 512) {
    await sharp(svg).resize(size, size).png().toFile(join(publicDir, "icon.png"));
  }
}

await sharp(svg).resize(16, 16).png().toFile(join(publicDir, "favicon-16x16.png"));
await sharp(svg).resize(32, 32).png().toFile(join(publicDir, "favicon-32x32.png"));

// Build a PNG-embedded .ico (supported by all modern browsers).
function toIco(entries) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(1, 2); // type: icon
  header.writeUInt16LE(entries.length, 4);
  let offset = 6 + 16 * entries.length;
  const dirs = entries.map(({ size, data }) => {
    const dir = Buffer.alloc(16);
    dir.writeUInt8(size, 0);
    dir.writeUInt8(size, 1);
    dir.writeUInt16LE(1, 4); // planes
    dir.writeUInt16LE(32, 6); // bit depth
    dir.writeUInt32LE(data.length, 8);
    dir.writeUInt32LE(offset, 12);
    offset += data.length;
    return dir;
  });
  return Buffer.concat([header, ...dirs, ...entries.map((e) => e.data)]);
}

const ico = toIco([
  { size: 16, data: readFileSync(join(publicDir, "favicon-16x16.png")) },
  { size: 32, data: readFileSync(join(publicDir, "favicon-32x32.png")) },
]);
writeFileSync(join(publicDir, "favicon.ico"), ico);

console.log(`Generated ${sizes.length + 3} icon files in public/`);
