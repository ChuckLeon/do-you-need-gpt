import { create } from "zustand";
import { produce } from "immer";

export interface IUser {
  id: string;
  email: string;
  credits: number;
}

type userFromStore = IUser | null;

interface IUserStore {
  user: userFromStore;
  setUser: (value: userFromStore) => void;
  updateUserCredits: (value: number) => void;
}

export const userStore = create<IUserStore>((set) => ({
  user: null,
  setUser: (value: userFromStore) => set({ user: value }),
  updateUserCredits: (newCredits: number) =>
    set(
      produce((state) => {
        if (state.user) {
          state.user.credits = newCredits;
        }
      })
    ),
}));
