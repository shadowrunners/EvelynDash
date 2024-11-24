'use client';

import { useFeature as fetchFeature } from "@/hooks";
import { createContext, ReactNode, useContext } from "react";
import { Loader } from "../ui/loading";
import { Error as UIError } from "../ui/error";
import { usePathname } from "@/i18n/routing";

interface Context<T> {
    data: T;
}

const FeatureContext = createContext<Context<any> | null>(null);

export function FeatureProvider({ children }: { children: ReactNode }) {
    const feature = usePathname().split('/')[4];
    const { data, status, error, refetch } = fetchFeature(feature);

    if (status === 'error') return (
        <div className="bg-black min-h-full text-white">
            <UIError errorMessage={error.message} refetch={refetch} />
        </div>
    )

    if (status === 'pending') return (
        <div className="bg-black min-h-full text-white">
            <Loader />
        </div>
    )

    return (
        <FeatureContext.Provider value={{ data }}>{children}</FeatureContext.Provider>
    )
}

export function useFeature<T>(): Context<T> | null {
    const context = useContext(FeatureContext);
    if (!context) throw new Error('This hook needs to be used alongside the FeatureContext. You probably forgot to provide it in your layout.tsx file.')

    return context;
}