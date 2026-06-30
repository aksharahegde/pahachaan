import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import toIco from "to-ico";

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

const ico = await toIco([
  readFileSync(join(publicDir, "favicon-16x16.png")),
  readFileSync(join(publicDir, "favicon-32x32.png")),
]);
writeFileSync(join(publicDir, "favicon.ico"), ico);

console.log(`Generated ${sizes.length + 3} icon files in public/`);
