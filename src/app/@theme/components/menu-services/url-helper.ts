export function isUrlPathEqual(path, link) {
    const locationPath = getPathPartOfUrl(path);
    return link === locationPath;
  }

  export function isUrlPathContain(path, link) {
    const locationPath = getPathPartOfUrl(path);
    const endOfUrlSegmentRegExp = /\/|^$/;
    return locationPath.startsWith(link) &&
      locationPath.slice(link.length).charAt(0).search(endOfUrlSegmentRegExp) !== -1;
  }

  function getPathPartOfUrl(url): string {
    return url.match(/.*?(?=[?#]|$)/)[0];
  }
