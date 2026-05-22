import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const toAbsolute = (p: string) => path.resolve(__dirname, '..', p);

const template = fs.readFileSync(toAbsolute('dist/static/index.html'), 'utf-8');
const { render } = await import(toAbsolute('dist/server/entry-server.js'));

// Determine base URL from GitHub Actions or default
const base = process.env.GITHUB_REPOSITORY ? `/${process.env.GITHUB_REPOSITORY.split('/')[1]}` : '';

const routesToPrerender = [
  '/',
  '/auth',
  '/learn',
  '/encrypt',
  '/cert-chat'
];

(async () => {
  for (const url of routesToPrerender) {
    const { html } = render(url, base);
    
    // We are not extracting the hoisted metadata manually here because React 19 does not natively 
    // expose a simple `renderToString` metadata extractor without a framework stream yet.
    // However, injecting the HTML is enough for basic SSG, and crawlers will still execute the 
    // minimal JS if needed, but the main content is fully present.
    // For full meta extraction, we would need to parse the rendered string or use `react-helmet`.
    // Since we're using React 19 native metadata, `renderToString` does not output the hoisted tags
    // in the root component, so this provides the core HTML shell.
    
    const htmlWithApp = template.replace(`<!--app-html-->`, html).replace(`<div id="root"></div>`, `<div id="root">${html}</div>`);

    const filePath = path.join('dist/static', url === '/' ? 'index.html' : `${url}/index.html`);
    const dir = path.dirname(toAbsolute(filePath));
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    fs.writeFileSync(toAbsolute(filePath), htmlWithApp);
    console.log('pre-rendered:', filePath);
  }
})();
