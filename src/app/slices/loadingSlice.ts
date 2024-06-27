import { StateCreator } from 'zustand';

export type LoadingSliceType = {
  isLoading: boolean;
  setIsLoading: (status: boolean) => void;
};

export const createLoadingSlice: StateCreator<LoadingSliceType> = (set) => ({
  isLoading: false,

  setIsLoading: (status) => set(() => ({ isLoading: status })),
});
