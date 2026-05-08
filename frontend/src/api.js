const rawApiBaseUrl = process.env.REACT_APP_API_URL || '';

export const apiBaseUrl = rawApiBaseUrl.replace(/\/+$/, '');

export const getApiUrl = (path) => {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return apiBaseUrl ? `${apiBaseUrl}${normalizedPath}` : normalizedPath;
};
