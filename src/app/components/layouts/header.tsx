import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import Link from "next/link"

const Header = () => {
    return (
        <div className="container mx-auto h-[55px]">
            <div className="flex justify-between h-full items-center">
                <h1 className="text-[30px] font-bold">
                    <Link href="/">
                        Portolio
                    </Link>
                </h1>
                <div className="flex gap-4 items-center">
                    <Popover>
                        <PopoverTrigger>
                            <Avatar>
                                <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                                <AvatarFallback>icon</AvatarFallback>
                            </Avatar>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <h3 className="border-b border-[#eee] p-3 font-bold">rocket_peng</h3>
                            <ul className="p-3 flex gap-3 flex-col">
                                <li>
                                    <Link href="/mypage">My Portolio</Link>
                                </li>
                                <li>
                                    <Link href="/mypage/edit">プロフィール設定</Link>
                                </li>
                                <li>
                                    <Link href="">ログアウト</Link>
                                </li>
                            </ul>
                        </PopoverContent>
                    </Popover>
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
