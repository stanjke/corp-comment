import { create } from 'zustand';
import { LoadingSliceType, createLoadingSlice } from './slices/loadingSlice';
import { UserSliceType, createUserSlice } from './slices/userSlice';
import { CompanySliceType, createCompanySlice } from './slices/companySlice';
import { FeedbackSliceType, createFeedbackSlice } from './slices/feedbackSlice';

type Store = LoadingSliceType & UserSliceType & CompanySliceType & FeedbackSliceType;

export const useRootStore = create<Store>()((...a) => ({
  ...createLoadingSlice(...a),
  ...createUserSlice(...a),
  ...createCompanySlice(...a),
  ...createFeedbackSlice(...a),
}));
