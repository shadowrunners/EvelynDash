import { useCurrentGuild } from "@/hooks";
import { createContext, ReactNode, useContext } from "react";
import { SPAPIGuild } from "@/types";
import { Loader } from "../ui/loading";
import { Error } from "../ui/error";

interface Context {
    data: SPAPIGuild;
}

const GuildContext = createContext<Context | null>(null);

export function GuildProvider({ children }: { children: ReactNode }) {
    const { data, status, error, refetch } = useCurrentGuild();

    if (status === 'error') return (
        <div className="bg-black min-h-full text-white">
            <Error errorMessage={error.message} refetch={refetch} />
        </div>
    )

    if (status === 'pending') return (
        <div className="bg-black min-h-full text-white">
            <Loader />
        </div>
    )

    return (
        <GuildContext.Provider value={{ data }}>{children}</GuildContext.Provider>
    )
}

export const useGuild = (): Context | null => {
    const context = useContext(GuildContext);
    return context;
}