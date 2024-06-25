import { create } from 'zustand';

type Store = {
  token: string;
  addToken: (newToken: string) => void;
};

export const useStore = create<Store>((set) => ({
  token: '',
  addToken: (newToken: string) => set(() => ({ token: newToken })),
}));
