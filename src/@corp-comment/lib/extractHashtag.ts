export const extractHashtag = (text: string): string[] | null => {
  const hashtagRegex = /#[a-zA-Z0-9]+/g;
  return text.match(hashtagRegex);
};
