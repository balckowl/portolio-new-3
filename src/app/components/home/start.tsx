import { Button } from "@/components/ui/button"
import { authOptions } from "@/lib/next-auth/options"
import { getServerSession } from "next-auth"
import Link from "next/link"
import ArrowDown from "./arrowDown"

const Start = async() => {
    const session = await getServerSession(authOptions)

    return (
        <div className="pt-[140px] pb-[140px]">
            <div className="container flex justify-center">
                <div className="w-full lg:w-[80%]">
                    <h3 className="text-center text-[30px] lg:text-[39px] font-[700]">さあ、はじめよう</h3>
                    <ArrowDown/>
                    <div className="text-center">
                        {!session && <Button asChild>
                            <Link href="/auth/login">はじめる</Link>
                        </Button>}
                        {session && <Button asChild>
                            <Link href={`/${session.user.uid}`}>My Protolio へ</Link>
                        </Button>}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Start
