import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { marked } from 'marked';
import { allDocs, getDocSet, type DocEntry } from '@/data/docs';

export interface WikiHeading {
  depth: number;
  id: string;
  text: string;
}

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const sourceDirectories = new Map([
  ['liskills', path.resolve(currentDirectory, '../../content/liskills')],
  ['liemc', path.resolve(currentDirectory, '../../content/liemc')],
  ['lwe', path.resolve(currentDirectory, '../../content/lwe')],
  ['liseasons', path.resolve(currentDirectory, '../../content/liseasons')],
  ['lidungeon', path.resolve(currentDirectory, '../../content/lidungeon')],
  ['lititle', path.resolve(currentDirectory, '../../content/lititle')],
  ['lirealenchant', path.resolve(currentDirectory, '../../content/lirealenchant')],
  ['enderdragon', path.resolve(currentDirectory, '../../content/enderdragon')],
  ['lishop', path.resolve(currentDirectory, '../../content/lishop')],
  ['lianimalscale', path.resolve(currentDirectory, '../../content/lianimalscale')],
  ['lipet', path.resolve(currentDirectory, '../../content/lipet')],
  ['lichqian', path.resolve(currentDirectory, '../../content/lichqian')],
  ['liskin', path.resolve(currentDirectory, '../../content/liskin')],
  ['jisseechessgames', path.resolve(currentDirectory, '../../content/jisseechessgames')],
  ['blockcraft', path.resolve(currentDirectory, '../../content/blockcraft')],
]);

function normalizeWikiPath(file: string) {
  return path.posix.normalize(file.replaceAll('\\', '/')).replace(/^\.\//, '');
}

function rewriteWikiLinks(markdown: string, doc: DocEntry) {
  const docSet = getDocSet(doc.project);
  const fileToSlug = new Map(docSet?.docs.map((entry) => [normalizeWikiPath(entry.file), entry.slug]));
  const wikiTargetToSlug = new Map(docSet?.docs.map((entry) => [
    normalizeWikiPath(entry.file).replace(/\.md$/i, '').toLowerCase(),
    entry.slug,
  ]));
  const withWikiLinks = markdown.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, (_match, label: string, target: string) => {
    const normalizedTarget = normalizeWikiPath(target).replace(/\.md$/i, '').toLowerCase();
    const slug = wikiTargetToSlug.get(normalizedTarget);
    return slug ? `[${label}](../${slug}/)` : label;
  });
  const withMarkdownLinks = withWikiLinks.replace(/\(([^)#?]+?\.md)(#[^)]+)?\)/g, (_match, file: string, hash = '') => {
    let decodedFile = file;
    try {
      decodedFile = decodeURIComponent(file);
    } catch {
      // 非法 URL 转义保留原始路径，避免构建被单个文档链接中断。
    }
    const resolvedFile = normalizeWikiPath(path.posix.join(path.posix.dirname(doc.file), decodedFile));
    const slug = fileToSlug.get(resolvedFile);
    return slug ? `(../${slug}/${hash})` : `(${file}${hash})`;
  });
  if (doc.project !== 'blockcraft') {
    return withMarkdownLinks;
  }
  const base = import.meta.env.BASE_URL === '/' ? '' : import.meta.env.BASE_URL.replace(/\/$/, '');
  return withMarkdownLinks
    .replace(/\(images\/([^)]+)\)/g, `(${base}/images/blockcraft/$1)`)
    .replace(/(["'])images\/([^"']+)\1/g, `$1${base}/images/blockcraft/$2$1`)
    .replace(/(["'])videos\/([^"']+)\1/g, `$1${base}/videos/blockcraft/$2$1`);
}

export function readWikiSource(doc: DocEntry) {
  const sourceDirectory = sourceDirectories.get(doc.project);
  if (!sourceDirectory) {
    throw new Error(`未知文档项目：${doc.project}`);
  }
  return fs.readFileSync(path.join(sourceDirectory, doc.file), 'utf8').replace(/^\uFEFF/, '');
}

export function renderWikiDocument(doc: DocEntry) {
  const source = readWikiSource(doc);
  let rawHtml = String(marked.parse(rewriteWikiLinks(source, doc), {
    gfm: true,
    breaks: false,
  }));
  // 页面标题由文档布局统一渲染，移除 Markdown 自带的首个一级标题，避免重复 H1。
  rawHtml = rawHtml.replace(/^\s*<h1>[\s\S]*?<\/h1>\s*/, '');
  const leadingParagraph = rawHtml.match(/^\s*<p>([\s\S]*?)<\/p>/);
  if (leadingParagraph) {
    const leadingText = leadingParagraph[1].replace(/<[^>]+>/g, '').trim();
    if (leadingText === doc.summary) {
      rawHtml = rawHtml.replace(leadingParagraph[0], '');
    }
  }
  const headings: WikiHeading[] = [];
  const usedIds = new Map<string, number>();
  const html = rawHtml.replace(/<h([23])>([\s\S]*?)<\/h\1>/g, (_match, depthText: string, innerHtml: string) => {
    const text = innerHtml
      .replace(/<[^>]+>/g, '')
      .replace(/&amp;/g, '&')
      .replace(/&lt;/g, '<')
      .replace(/&gt;/g, '>')
      .replace(/&quot;/g, '"')
      .trim();
    const baseId = text
      .normalize('NFKC')
      .toLowerCase()
      .replace(/[^\p{L}\p{N}\s-]/gu, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .replace(/^-|-$/g, '') || `section-${headings.length + 1}`;
    const duplicateCount = usedIds.get(baseId) ?? 0;
    usedIds.set(baseId, duplicateCount + 1);
    const id = duplicateCount === 0 ? baseId : `${baseId}-${duplicateCount + 1}`;
    const depth = Number(depthText);
    headings.push({ depth, id, text });
    return `<h${depth} id="${id}">${innerHtml}</h${depth}>`;
  });

  return { source, html, headings };
}

export function buildSearchIndex() {
  return allDocs.map((doc) => ({
    title: doc.title,
    summary: doc.summary,
    slug: doc.slug,
    group: doc.group,
    project: doc.project,
    projectName: getDocSet(doc.project)?.name ?? doc.project,
    content: readWikiSource(doc)
      .replace(/```[\s\S]*?```/g, ' ')
      .replace(/[#>*_`|\[\]()]/g, ' ')
      .replace(/\s+/g, ' ')
      .trim(),
  }));
}
