export const isHtmlString = (input: string): boolean => {
  const htmlTagPattern = /<\/?[a-z][\s\S]*>/i;
  return htmlTagPattern.test(input);
};

export const convertLinksToAnchorTags = (input: string): string => {
  // Regular expression to check for URLs not already wrapped in <a> tags
  const urlPattern =
    /(?<!<a[^>]*?>)((https?:\/\/|www\.)[^\s/$.?#].[^\s]*)(?!<\/a>)/gi;

  // Replace the URL with an <a> tag
  const result = input.replace(urlPattern, (match, url) => {
    const href = url.startsWith('http') ? url : `https://${url}`;
    return `<a href="${href}" target="_blank">${match}</a>`;
  });

  return result;
};

export const trimSpacing = (input: string): string => {
  return input?.trim();
};

export const truncateString = (input: string, maxLength: number): string => {
  if (input.length > maxLength) {
    return `${input.slice(0, maxLength)}...`;
  }
  return input;
};

export const stripHtmlTags = (input: string): string => {
  const htmlTagPattern = /<\/?[^>]+(>|$)/g;
  return input.replace(htmlTagPattern, '');
};
