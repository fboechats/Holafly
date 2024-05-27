import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'
import { LoginProps, LoginResult, login } from '../services'

export type AuthStore = {
  token: string | null,
  hasHydrated: boolean,
  setHasHydrated: (arg: boolean) => void,
  user: {
    id: string,
    name: string,
  } | null
  login: (props: LoginProps) => Promise<LoginResult>
  logout: () => void
}

export const useAuthStore = create(
  persist<AuthStore>(
    (set) => ({
      user: null,
      token: null,
      hasHydrated: false,
      setHasHydrated: (state) => {
        set({
          hasHydrated: state
        });
      },
      login: async ({ email, password }) => {
        const result = await login({ email, password });

        localStorage.setItem('token', result.token ?? '');

        set({ token: result.token, user: result.user });

        return result;
      },
      logout: () => set({ user: null, token: null })
    }),
    {
      name: 'user-store',
      storage: createJSONStorage(() => localStorage),
      onRehydrateStorage: () => (state) => {
        state?.setHasHydrated?.(true)
      }
    }
  )
)
