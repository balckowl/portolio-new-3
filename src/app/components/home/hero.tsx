import { Button } from "@/components/ui/button"
import { authOptions } from "@/lib/next-auth/options"
import { getServerSession } from "next-auth"
import Image from "next/image"
import Link from "next/link"

const Hero = async () => {
    const session = await getServerSession(authOptions)

    return (
        <div className="h-[650px] sm:h-[500px] bg-muted">
            <div className="container flex justify-center h-full items-center">
                <div className="w-full sm:w-[80%] flex flex-col sm:flex-row items-center">
                    <div className="sm:w-1/2 space-y-4 order-2 sm:order-1">
                        <h2 className="sm:hidden text-[25px] lg:text-[45px] font-bold">失敗したものだってアピールポイント</h2>
                        <h2 className="text-[25px] lg:text-[45px] font-bold hidden sm:block">失敗したものだって<br />アピールポイント</h2>
                        <p>挫折ポートフォリオ</p>
                        {!session && <Button asChild>
                            <Link href="/auth/login">はじめる</Link>
                        </Button>}
                        {session && <Button asChild>
                            <Link href={`/${session.user.uid}`}>My Protolio へ</Link>
                        </Button>}
                    </div>
                    <div className="w-4/5 sm:w-1/2 order-1 sm:order-2">
                        <Image src="/images/home/hero.png" width={500} height={500} alt="hero" />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
