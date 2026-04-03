const getDomain = (url: string) => {
  try {
    const urlObj = new URL(url);
    return urlObj.hostname;
  } catch {
    const pathSegments = url.split("/");
    return pathSegments[2] || url;
  }
};

export const getFaviconSrc = (url: string, size?: number) => {
  return `https://www.google.com/s2/favicons?domain=${getDomain(url)}&sz=${
    size ?? 32
  }`;
};
