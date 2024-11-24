'use client';

import { MdError } from "react-icons/md";
import { Button } from "./button";

export function Error({ errorMessage, refetch }: { errorMessage: string | undefined, refetch: () => void }) {
    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <MdError className="h-6 w-6" />
            <h1 className="mt-2 text-center text-wrap">The spaceship has encountered an error <br /> while attempting to discover your guilds.</h1>
            <Button variant="destructive" className="text-white mt-3" onClick={refetch}>Retry</Button>
            <p className="text-dimWhite text-sm text-center mt-3 text-wrap">If this issue persists, join our Discord server <br /> and provide the following error code: {errorMessage}.</p>
        </div>
    )
}