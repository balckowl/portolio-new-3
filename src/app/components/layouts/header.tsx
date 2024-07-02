import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { getUser } from "@/data/user"
import { authOptions } from "@/lib/next-auth/options"
import { getServerSession } from "next-auth"
import Link from "next/link"

const Header = async() => {
    const session = await getServerSession(authOptions)
    if(!session){
        return
    }
    const user = await getUser(session.user.uid)
    return (
        <div className="container mx-auto h-[55px]">
            <div className="flex justify-between h-full items-center">
                <h1 className="text-[30px] font-bold">
                    <Link href="/">
                        Portolio
                    </Link>
                </h1>
                <div className="flex gap-4 items-center">
                    {session && <Popover>
                        <PopoverTrigger>
                            {user?.photoUrl && <Avatar>
                                <AvatarImage src={user.photoUrl} alt="@shadcn" />
                                <AvatarFallback>{user.username}</AvatarFallback>
                            </Avatar>}
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0">
                            <h3 className="border-b border-[#eee] p-3 font-bold">{user?.username}</h3>
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
                    </Popover>}
                    {!session && <Button variant="ghost">
                        <Link href="/auth/login">
                            はじめる
                        </Link>
                    </Button>}
                    <ModeToggle />
                </div>
            </div>
        </div>
    )
}

export default Header
