export type FeedbackType = {
  author: {
    _id: string;
    login: string;
  };
  companyName: string;
  content: string;
  createdAt: string;
  _id: string;
  rating: number;
  ratedBy: string[];
};
