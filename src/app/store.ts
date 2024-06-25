import { create } from 'zustand';

type Store = {
  token: string;
  userId: string;
  addToken: (newToken: string) => void;
  addUserId: (userId: string) => void;
};

export const useStore = create<Store>((set) => ({
  token: '',
  userId: '',
  addToken: (newToken: string) => set(() => ({ token: newToken })),
  addUserId: (userId: string) => set(() => ({ userId })),
}));
