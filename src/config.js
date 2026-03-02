const config = {
  corsProxy: import.meta.env.VITE_CORS_PROXY ?? "https://corsproxy.io/?",
  deezerApiBase:
    import.meta.env.VITE_DEEZER_API_BASE ?? "https://api.deezer.com",
};

/**
 * Build a URL that goes through the CORS proxy.
 * Supports proxy format "https://corsproxy.io/?" (append with url= param).
 * @param {string} targetUrl - Full URL to request (e.g. Deezer API URL)
 * @returns {string} Proxied URL
 */
export function getProxiedUrl(targetUrl) {
  const proxy = config.corsProxy;
  if (!proxy) return targetUrl;
  const base = proxy.endsWith("?") ? proxy : proxy.replace(/\?.*$/, "");
  const sep = base.endsWith("?") ? "" : base.endsWith("/") ? "?" : "?";
  return `${base}${sep}url=${encodeURIComponent(targetUrl)}`;
}

/**
 * Encode path segments so dynamic parts (e.g. ids) are safe in the URL.
 * @param {string} path - Path like '/playlist/123/tracks'
 * @returns {string} Path with each segment encoded
 */
function encodePath(path) {
  const normalized = path.startsWith("/") ? path : `/${path}`;
  return normalized
    .split("/")
    .map((segment) => (segment ? encodeURIComponent(segment) : ""))
    .join("/");
}

/**
 * Build a Deezer API URL and optionally proxy it.
 * Frontend encodes path segments and query params, then the full URL for the proxy.
 * @param {string} path - API path (e.g. '/search', '/playlist/123/tracks')
 * @param {Object} [params] - Optional query params (already encoded via URLSearchParams)
 * @returns {string} Full URL (proxied, target URL encoded)
 */
export function deezerUrl(path, params = {}) {
  const base = config.deezerApiBase ?? "https://api.deezer.com";
  const pathEncoded = encodePath(path);
  const search = new URLSearchParams(params).toString();
  const url = search
    ? `${base}${pathEncoded}?${search}`
    : `${base}${pathEncoded}`;
  return getProxiedUrl(url);
}

export default config;
