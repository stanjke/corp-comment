import { StateCreator } from 'zustand';

export type UserSliceType = {
  token: string;
  userId: string;
  addToken: (newToken: string) => void;
  addUserId: (userId: string) => void;
};

export const createUserSlice: StateCreator<UserSliceType> = (set) => ({
  token: '',
  userId: '',
  addToken: (newToken: string) => set(() => ({ token: newToken })),
  addUserId: (userId: string) => set(() => ({ userId })),
});
