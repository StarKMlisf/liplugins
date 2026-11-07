export function withBase(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  const base = import.meta.env.BASE_URL || '/';

  if (base === '/') {
    return normalizedPath;
  }

  return `${base.replace(/\/$/, '')}${normalizedPath}`;
}

