import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import Link from "next/link"

const Header = () => {
    return (
        <div className="container mx-auto h-[55px]">
            <div className="flex justify-between h-full items-center">
                <h1 className="text-[30px] font-bold">Portolio</h1>
                <div className="flex gap-4 items-center">
                    <Avatar>
                        <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                        <AvatarFallback>icon</AvatarFallback>
                    </Avatar>
                    <Button variant="ghost">
                        <Link href="/mypage">
                            ログイン
                        </Link>
                    </Button>
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}

export default Header
