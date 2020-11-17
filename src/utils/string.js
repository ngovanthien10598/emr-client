export function getQueryString(queryObj) {
  if (!queryObj) return "";
  return Object.keys(queryObj).map(key => `${key}=${queryObj[key]}`).join('&');
}