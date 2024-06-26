import { create } from 'zustand';
import { LoadingSliceType, createLoadingSlice } from './slices/loadingSlice';
import { UserSliceType, createUserSlice } from './slices/userSlice';

type Store = LoadingSliceType & UserSliceType;

export const useRootStore = create<Store>()((...a) => ({
  ...createLoadingSlice(...a),
  ...createUserSlice(...a),
}));
