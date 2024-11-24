import { LuLoader2 } from "react-icons/lu"

export function Loader() {
    return (
        <div className="flex justify-center items-center flex-col h-screen">
            <LuLoader2 className="animate-spin h-6 w-6" />
            <h1 className="mt-2 text-center">Asking the spaceship to bake more cookies...</h1>
        </div>
    )
}