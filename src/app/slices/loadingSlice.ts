import { StateCreator } from 'zustand';

export type LoadingSliceType = {
  isUpdating: boolean;
  toggleIsUpdating: () => void;
};

export const createLoadingSlice: StateCreator<LoadingSliceType> = (set) => ({
  isUpdating: false,
  toggleIsUpdating: () => set((state) => ({ isUpdating: !state.isUpdating })),
});
