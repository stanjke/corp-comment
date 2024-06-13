export const feedbackBeenPosted = (postedDate: string) =>
  Math.floor((Date.now() - Date.parse(postedDate)) / 1000 / 60 / 60 / 24);
