import { create } from "zustand";

export interface IUser {
  id: string;
  email: string;
  credits: number;
}

type userFromStore = IUser | null;

interface IUserStore {
  user: userFromStore;
  setUser: (value: userFromStore) => void;
}

export const userStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (value: userFromStore) => set({ user: value }),
}));
