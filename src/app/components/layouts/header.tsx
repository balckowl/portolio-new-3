import { ModeToggle } from "@/components/mode-toggle"
import { Button } from "@/components/ui/button"

const Header = () => {
    return (
        <div className="container mx-auto h-[80px]">
            <div className="flex justify-between h-full items-center">
                <h1 className="text-[40px] font-bold">Portolio</h1>
                <div className="flex gap-4 items-center">
                    <div>アイコン</div>
                    <Button variant="ghost">Login</Button>
                    <ModeToggle/>
                </div>
            </div>
        </div>
    )
}

export default Header