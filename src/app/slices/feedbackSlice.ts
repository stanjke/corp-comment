import { FeedbackType } from '@corp-comment/lib/types';
import { StateCreator } from 'zustand';

export type FeedbackSliceType = {
  isUpdating: boolean;
  toggleIsUpdating: () => void;
  feedbacks: FeedbackType[] | [];
  addFeedback: (feedback: FeedbackType) => void;
  removeFeedback: (feedback: FeedbackType) => void;
  updateFeedbacks: (feedbacks: FeedbackType[]) => void;
};

export const createFeedbackSlice: StateCreator<FeedbackSliceType> = (set) => ({
  isUpdating: false,
  toggleIsUpdating: () => set((state) => ({ isUpdating: !state.isUpdating })),
  feedbacks: [],
  addFeedback: (feedback: FeedbackType) =>
    set((state) => ({ feedbacks: [...state.feedbacks, feedback] })),
  removeFeedback: (feedback: FeedbackType) =>
    set((state) => ({
      feedbacks: state.feedbacks.filter((f: FeedbackType) => f._id !== feedback._id),
    })),
  updateFeedbacks: (feedbacks: FeedbackType[]) => set(() => ({ feedbacks })),
});
