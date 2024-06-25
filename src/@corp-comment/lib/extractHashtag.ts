export const extractHashtag = (text: string) => {
  const hashtagRegex = /#[a-zA-Z0-9]+/g;
  return text.match(hashtagRegex);
};
