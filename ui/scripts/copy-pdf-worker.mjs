import { copyFileSync } from 'fs';

copyFileSync(`node_modules/pdfjs-dist/legacy/build/pdf.worker.min.mjs`, `public/pdf.worker.min.mjs`);
