import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { getUser } from "@/data/user"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faXTwitter } from "@fortawesome/free-brands-svg-icons"
import { Pen } from "lucide-react"
import Link from "next/link"


const UserProfile = async () => {

    const user = await getUser("rocket_peng")

    if (!user) return

    const { id, username, bio, X, photoUrl } = user

    return (
        <div className="h-[400px] lg:h-[300px] bg-muted">
            <div className="h-full container flex justify-center border-b-[2px]">
                <div className="w-full sm:w-[80%] flex flex-col lg:flex-row items-end lg:items-center justify-center lg:justify-between">
                    <div className="w-full lg:w-[70%] flex flex-col lg:flex-row items-center gap-8 mb-[15px] lg:mb-0">
                        {photoUrl && <Avatar className="w-[100px] h-[100px]">
                            <AvatarImage src={photoUrl} alt="@shadcn" />
                            <AvatarFallback>icon</AvatarFallback>
                        </Avatar>}
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-[30px] font-bold">{username}</h2>
                                {X && <a href={`https://x.com/${X}`} target="_blank">
                                    <FontAwesomeIcon icon={faXTwitter} width={20} height={20} />
                                </a>}
                            </div>
                            {bio && <p className="text-[13px] sm:text-[16px]">{bio}</p>}
                        </div>
                    </div>
                    <Button variant="outline">
                        <Link href="/mypage/edit" className="flex items-center gap-2">
                            <Pen width={18} height={18} />
                            <p>編集する</p>
                        </Link>
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UserProfile
