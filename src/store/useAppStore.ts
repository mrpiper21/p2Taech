interface IAppStore {
    theme: 'light' | 'dark';
}
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { useMemo } from "react";
import {pick} from 'lodash'
import { useShallow } from "zustand/react/shallow";

interface IAppStore {
    theme: 'light' | 'dark';
    setTheme: (value: 'light' | 'dark') => void
}

export const appStore = create(
    persist<IAppStore>(
        (set) => ({
            theme: 'light',
            setTheme: (value: 'light' | 'dark') => set({ theme: value }),
        }),
        {
            name: 'upsl-app',
            storage: createJSONStorage(() => localStorage), // (optional) by default, 'localStorage' is used
        },
    ),
);

const useAppStore = (selector: Array<keyof IAppStore>) => {
    const memo = useMemo(() => selector, [selector]);
    return appStore(
        useShallow((state) => pick(state, memo))
    )
};
export default useAppStore;