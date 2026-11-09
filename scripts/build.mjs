import { cp, mkdir, readFile, writeFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import { join } from 'node:path';
import { parseEnv } from 'node:util';

const root = fileURLToPath(new URL('../', import.meta.url));
let local = {};
try {
  local = parseEnv(await readFile(join(root, '.env'), 'utf8'));
} catch (error) {
  if (error.code !== 'ENOENT') throw error;
}
const env = { ...local, ...process.env };
const email = (env.PUBLIC_SUPPORT_EMAIL || '').trim();
if (!/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)+$/.test(email)) {
  throw new Error('Set a valid PUBLIC_SUPPORT_EMAIL in .env or the build environment.');
}
const escapeHtml = (value) => value.replace(/[&<>"']/g, (char) => ({
  '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
})[char]);

// Only these public fields can enter the website. Never copy .env to dist.
const publicInfo = {
  supportEmail: `<a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a>`,
  company: escapeHtml((env.PUBLIC_COMPANY_NAME || '').trim()),
  representative: escapeHtml((env.PUBLIC_REPRESENTATIVE || '').trim()),
  registration: escapeHtml((env.PUBLIC_BUSINESS_REGISTRATION || '').trim())
};
const output = join(root, 'dist');
await mkdir(output, { recursive: true });
for (const name of ['index.html', 'privacy.html', 'terms.html']) {
  let html = await readFile(join(root, name), 'utf8');
  html = html.replace(/(<(span|p|dd)\b[^>]*data-site-info="([^"]+)"[^>]*>)[\s\S]*?(<\/\2>)/g,
    (match, opening, tag, key, closing) => publicInfo[key] ? `${opening}${publicInfo[key]}${closing}` : match);
  await writeFile(join(output, name), html, 'utf8');
}
for (const name of ['styles.css', 'script.js', 'robots.txt']) {
  await cp(join(root, name), join(output, name));
}
await cp(join(root, 'assets'), join(output, 'assets'), { recursive: true });
console.log('Built index.html, privacy.html and terms.html into dist with public contact details.');
