const getBaseUrl = (url: string) => {
  const pathSegments = url.split("/");
  const protocol = pathSegments[0];
  const host = pathSegments[2];
  const baseUrl = protocol + "//" + host;
  return baseUrl;
};

export const getFaviconByUrl = (url: string) => {
  return getBaseUrl(url) + "/favicon.ico";
};

export const getFaviconByGoogleApi = (url: string, size?: number) => {
  return `https://www.google.com/s2/favicons?domain=${url}&size=${size || 16}`;
};
