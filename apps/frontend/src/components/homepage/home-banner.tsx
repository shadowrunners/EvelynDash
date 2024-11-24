import { Button } from "../ui";

export function SupportBanner() {
    return (
        <div className="text-white bg-[#6A5ACD] p-5 rounded-xl flex flex-col sm:flex-row">
            <div className="flex flex-col text-left mr-auto mt-auto mb-auto">
                <h1>We've outlined what Evelyn can do. It's your turn to decide now.</h1>
                <p className="text-sm text-dimWhite">Evelyn is a project empowered by donations. If you like what you see, consider donating to support the project <br /> by clicking the button next to the invite one.</p>
            </div>
            <div className="mt-4">
                <Button className="flex-row">Invite Evelyn</Button>
                <Button className="flex-row ml-1">Support Us</Button>
            </div>
        </div>
    )
}