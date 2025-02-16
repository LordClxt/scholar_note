/* eslint-disable @typescript-eslint/ban-ts-comment */
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export const useStore = create(
  persist(
    // @ts-ignore
    (set) => ({
      token: "",
      user: {},
      role: "",
      connexion: (token, user, role) => set({ token, user, role }),
      deconnexion: () => set(() => ({ token: "", user: {} })),
      modifier_profil: (nom, prenom, sexe, email) =>
        set((state) => ({
          token: state.token,
          user: {
            ...state.user,
            nom,
            prenom,
            sexe,
            email,
          },
        })),
    }),
    {
      name: "scholar-note-storage", // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    }
  )
);
