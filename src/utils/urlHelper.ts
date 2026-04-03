export function normalizeQuery(query: string): string {
  return query.trim().replace(/\s+/g, " ");
}

export function replaceUrl(params: URLSearchParams) {
  const newUrl = params.toString();
  window.history.replaceState(
    null,
    "",
    newUrl ? `?${newUrl}` : window.location.pathname,
  );
}

export function readPathFromUrl(): string | null {
  try {
    const params = new URLSearchParams(window.location.search);
    return params.get("path");
  } catch {
    return null;
  }
}

export function readSearchFromUrl(): string | null {
  try {
    const params = new URLSearchParams(window.location.search);
    const raw = params.get("q");
    if (raw === null) return null;

    const normalized = normalizeQuery(raw);
    if (normalized !== raw) params.set("q", normalized);
    params.delete("path");
    replaceUrl(params);
    return normalized;
  } catch {
    return null;
  }
}

export function setPathInUrl(path?: string) {
  const params = new URLSearchParams(window.location.search);
  if (path?.length) params.set("path", path);
  else params.delete("path");
  replaceUrl(params);
}
