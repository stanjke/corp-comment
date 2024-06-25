export type FeedbackType = {
  upvoteCount: number;
  companyName: string;
  text: string;
  daysAgo: number;
  author: {
    _id: string;
    login: string;
  };
  postId: string;
};
