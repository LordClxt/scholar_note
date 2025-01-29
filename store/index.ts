import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

export const useStore = create(
  persist(
    (set, get) => ({
      token:"",
      user:{},
      role:"",
      connexion: (token, user, role) => set(() => ({ token, user, role })),
      deconnexion:()=>set(()=>({token:"", user:{}}))
    }),
    {
      name: 'scholar-note-storage', // name of the item in the storage (must be unique)
      storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
    },
  ),
)