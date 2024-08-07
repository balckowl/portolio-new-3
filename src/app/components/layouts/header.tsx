import { ModeToggle } from "@/components/mode-toggle"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { authOptions } from "@/lib/next-auth/options"
import { getServerSession } from "next-auth"
import Link from "next/link"
import SignOutBtn from "./signOutBtn"
import {
    Sheet,
    SheetContent,
    SheetTrigger,
} from "@/components/ui/sheet"
import { AlignJustify } from "lucide-react"

const Header = async () => {
    const session = await getServerSession(authOptions)

    return (
        <div className="container mx-auto h-[75px]">
            <div className="flex justify-between h-full items-center">
                <h1 className="text-[30px] font-bold tracking-wide">
                    <Link href="/">
                        Port<span className="fuchidori text-white dark:text-black">f</span>olio
                    </Link>
                </h1>
                {!session ? (
                    <>
                        <ModeToggle />
                    </>
                ) : (
                    <>
                        <div className="block lg:hidden">
                            <Sheet>
                                <SheetTrigger>
                                    <AlignJustify />
                                </SheetTrigger>
                                <SheetContent>
                                    <div className="flex items-center gap-5">
                                        <Avatar>
                                            {session?.user?.photoURL && (
                                                <AvatarImage src={session?.user?.photoURL} alt={session?.user?.name ?? ""} />
                                            )}
                                            <AvatarFallback>{session?.user?.name}</AvatarFallback>
                                        </Avatar>
                                        <div>
                                            {session?.user?.name}
                                        </div>
                                    </div>
                                    <div>
                                        <ul className="p-4 flex flex-col gap-5">
                                            <Link href={`/${session?.user?.uid}`}>
                                                <li>My Portolio</li>
                                            </Link>
                                            <Link href={`/profile/edit`}>
                                                <li>プロフィール設定</li>
                                            </Link>
                                            <Link href={`/posts/create`}>
                                                <li>記事を書く</li>
                                            </Link>
                                            <SignOutBtn />
                                        </ul>
                                        <div className="p-4 border-t">
                                            <ModeToggle />
                                        </div>
                                    </div>
                                </SheetContent>
                            </Sheet>
                        </div>
                        <div className="lg:flex items-center gap-10 hidden">
                            <Popover>
                                <PopoverTrigger>
                                    <Avatar>
                                        {session?.user?.photoURL && (
                                            <AvatarImage src={session?.user?.photoURL} alt={session?.user?.name ?? ""} />
                                        )}
                                        <AvatarFallback>{session?.user?.name}</AvatarFallback>
                                    </Avatar>
                                </PopoverTrigger>
                                <PopoverContent className="w-full p-0">
                                    <h2 className="p-4 border-b-[1px] border-[#eee] font-bold">{session?.user?.name}</h2>
                                    <ul className="p-4 flex flex-col gap-3">
                                        <Link href={`/${session?.user?.uid}`}>
                                            <li>My Portolio</li>
                                        </Link>
                                        <Link href={`/profile/edit`}>
                                            <li>プロフィール設定</li>
                                        </Link>
                                        <SignOutBtn />
                                    </ul>
                                </PopoverContent>
                            </Popover>
                            <Button asChild>
                                <Link href="/posts/create">
                                    記事を書く
                                </Link>
                            </Button>
                            <ModeToggle />
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}

export default Header
