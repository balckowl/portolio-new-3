
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Twitter } from "lucide-react"


const UserProfile =  () => {

    return (
        <div className="h-[400px] lg:h-[300px]">
            <div className="h-full container flex justify-center border-b-[2px]">
                <div className="w-full sm:w-[80%] flex flex-col lg:flex-row items-end lg:items-center justify-center lg:justify-between">
                    <div className="w-full lg:w-[70%] flex flex-col lg:flex-row items-center gap-8 mb-[15px] lg:mb-0">
                        <Avatar className="w-[100px] h-[100px]">
                            <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
                            <AvatarFallback>CN</AvatarFallback>
                        </Avatar>
                        <div>
                            <div className="flex items-center gap-3">
                                <h2 className="text-[30px] font-bold">yyyyy</h2>
                                <a href={`https://twitter.com/`}>
                                    <Twitter />
                                </a>
                            </div>
                            <p className="text-[13px] sm:text-[16px]">eeeeeeee</p>
                        </div>
                    </div>
                    <Button>
                        編集する
                    </Button>
                </div>
            </div>
        </div>
    )
}

export default UserProfile